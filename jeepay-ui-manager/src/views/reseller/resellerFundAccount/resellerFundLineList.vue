<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'核销商号'" :msg="searchData.resellerNo" v-model="searchData.resellerNo" />
            <jeepay-text-up :placeholder="'产品类型'" :msg="searchData.productType" v-model="searchData.productType" />
            <jeepay-text-up :placeholder="'产品订单号'" :msg="searchData.productOrderNo" v-model="searchData.productOrderNo" />
            <a-form-item label="" class="table-head-layout" style="max-width:350px;min-width:300px">
              <a-range-picker
                @change="onChange"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
              >
                <a-icon slot="suffixIcon" type="sync" />
              </a-range-picker>
            </a-form-item>
            <a-form-item label="金额起止">
              <a-input-number v-model="searchData.amountStartSearch" placeholder="请输入" :min="1" :max="9999999999999" />
              -
              <a-input-number v-model="searchData.amountEndSearch" placeholder="请输入" :min="1" :max="9999999999999" />
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
      </div>

      <!-- 列表渲染 -->
      <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :reqTableDataFunc="reqTableDataFunc"
        :tableColumns="tableColumns"
        :searchData="searchData"
        :scrollX="1100"
        rowKey="id"
      >
        <template slot="id" slot-scope="{record}"><b>{{ record.id.toString() }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerName" slot-scope="{record}"><b>{{ record.resellerName}}</b></template> <!-- 自定义插槽 -->
        <template slot="beforeRecoveriesAmount" slot-scope="{record}"><b>{{ '￥'+record.beforeRecoveriesAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="changeRecoveriesAmount" slot-scope="{record}"><b>{{ '￥'+record.changeRecoveriesAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="afterRecoveriesAmount" slot-scope="{record}"><b>{{ '￥'+record.afterRecoveriesAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}"><b>{{ record.productType }}</b></template> <!-- 自定义插槽 -->
        <template slot="productOrderNo" slot-scope="{record}"><b>{{ record.productOrderNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="orderAmount" slot-scope="{record}"><b>{{ '￥'+record.orderAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerShareAmount" slot-scope="{record}"><b>{{ '￥'+record.resellerShareAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button type="link" v-if="$access('ENT_PRETENDER_ORDER_GROUP_VIEW')" @click="detailFunc(record.id)">详情</a-button>
          </JeepayTableColumns>
        </template>
      </JeepayTable>
    </a-card>
    <Detail ref="detailInfo"></Detail>
  </page-header-wrapper>
</template>
<script>
    import JeepayTable from '@/components/JeepayTable/JeepayTable'
    import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
    import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
    // import Detail from './Detail'
    // eslint-disable-next-line camelcase
    import { API_URL_RESELLER_FUNDLINE_LIST, req } from '@/api/manage'
    import moment from 'moment'
    import Detail from '@/views/reseller/resellerFundAccount/LineDetail'
    const tableColumns = [

        { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
        { key: 'resellerNo', width: '200px', title: '核销商号', scopedSlots: { customRender: 'resellerNo' } },
        { key: 'resellerName', width: '200px', title: '核销商名', scopedSlots: { customRender: 'resellerName' } },
        { key: 'beforeRecoveriesAmount', width: '200px', title: '变更前回款金额', scopedSlots: { customRender: 'beforeRecoveriesAmount' } },
        { key: 'changeRecoveriesAmount', width: '200px', title: '变更金额', scopedSlots: { customRender: 'changeRecoveriesAmount' } },
        { key: 'afterRecoveriesAmount', width: '200px', title: '变更后回款金额', scopedSlots: { customRender: 'afterRecoveriesAmount' } },
        { key: 'productType', width: '200px', title: '产品类型', scopedSlots: { customRender: 'productType' } },
        { key: 'productOrderNo', width: '200px', title: '产品订单号', scopedSlots: { customRender: 'productOrderNo' } },
        { key: 'orderAmount', width: '200px', title: '订单金额', scopedSlots: { customRender: 'orderAmount' } },
        { key: 'resellerShareAmount', width: '200px', title: '手续费', scopedSlots: { customRender: 'resellerShareAmount' } },
        { key: 'gmtCreate', width: '150px', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } },
        { key: 'op', title: '操作', width: '160px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
    ]

    export default {
        name: 'OrderList',
        // eslint-disable-next-line standard/object-curly-even-spacing
        components: { JeepayTable, JeepayTableColumns, JeepayTextUp, Detail },
        data () {
            return {
                btnLoading: false,
                tableColumns: tableColumns,
                searchData: {}
            }
        },
        mounted () {
        },
        methods: {
            disabledDate (current) { // 今日之后日期不可选
                return current && current > moment().endOf('day')
            },
            onChange (date, dateString) {
                this.searchData.startDate = dateString[0] // 开始时间
                this.searchData.endDate = dateString[1] // 结束时间
            },
            queryFunc () {
                this.btnLoading = true
                if (this.searchData.amountStartSearch && this.searchData.amountStartSearch !== '') {
                    this.searchData.amountStart = ''
                    this.searchData.amountStart = this.searchData.amountStartSearch * 100
                }
                if (this.searchData.amountEndSearch && this.searchData.amountEndSearch !== '') {
                    this.searchData.amountEnd = ''
                    this.searchData.amountEnd = this.searchData.amountEndSearch * 100
                }
                this.$refs.infoTable.refTable(true)
            },
            // 请求table接口数据
            reqTableDataFunc: (params) => {
                return req.list(API_URL_RESELLER_FUNDLINE_LIST, params)
            },
            // delFunc: function (recordId) {
            //     const that = this
            //     this.$infoBox.confirmDanger('确认删除？', '该操作将删除该账号', () => {
            //         req.delById(API_URL_RESELLER_FUNDACCOUNT_LIST, recordId).then(res => {
            //             that.$refs.infoTable.refTable(false)
            //             this.$message.success('删除成功')
            //         })
            //     })
            // },
            // addFunc: function () { // 业务通用【新增】 函数
            //     this.$refs.uploadInfo.show()
            // },
            searchFunc: function () { // 点击【查询】按钮点击事件
              if (this.searchData.amountStartSearch && this.searchData.amountStartSearch !== '') {
                this.searchData.amountStart = ''
                this.searchData.amountStart = this.searchData.amountStartSearch * 100
              }
              if (this.searchData.amountEndSearch && this.searchData.amountEndSearch !== '') {
                this.searchData.amountEnd = ''
                this.searchData.amountEnd = this.searchData.amountEndSearch * 100
              }
                this.$refs.infoTable.refTable(true)
            },
            detailFunc: function (recordId) { // 业务通用【详情】 函数
                this.$refs.detailInfo.show(recordId)
            }
        }
    }
</script>
