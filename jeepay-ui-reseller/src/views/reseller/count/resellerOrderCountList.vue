<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
                <a-select-option value="CTRIP">携程任我行</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'充值账号'" :msg="searchData.chargeAccount" v-model="searchData.chargeAccount" />
            <jeepay-text-up :placeholder="'子核销名称'" :msg="searchData.queryFlag" v-model="searchData.queryFlag" />

            <span class="table-page-search-submitButtons" style="margin-left: 20px;">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
        <div>
          <a-button icon="plus" v-if="$access('ENT_RESELLER_ORDER_EXPORT_COUNT')" type="primary" @click="importOrder" class="mg-b-30">导出报表</a-button>
        </div>
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
        <template slot="resellerName" slot-scope="{record}"><b>{{ record.resellerName }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}"><b>{{ record.productType }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccount" slot-scope="{record}"><b>{{ record.chargeAccount }}</b></template> <!-- 自定义插槽 -->
        <template slot="orderAllAmount" slot-scope="{record}"><b>{{ '￥'+record.orderAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥'+record.finishAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="orderStatus" slot-scope="{record}"> <b>{{ record.orderStatus }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccount" slot-scope="{record}"><b>{{ record.chargeAccount }}</b></template> <!-- 自定义插槽 -->
        <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
      </JeepayTable>
    </a-card>
    <Detail ref="detailInfo"></Detail>
    <Upload ref="uploadInfo"></Upload>
  </page-header-wrapper>
</template>

<script>
    import JeepayTable from '@/components/JeepayTable/JeepayTable'
    import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
    import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
    // eslint-disable-next-line camelcase
    import { API_URL_RESELLER_ORDER_COUNT_LIST, req } from '@/api/manage'
    import moment from 'moment'
    import Detail from '@/views/reseller/order/Detail'
    import Upload from '@/views/reseller/order/Upload'
    const tableColumns = [

        { key: 'resellerName', width: '200px', title: '核销商名称', scopedSlots: { customRender: 'resellerName' } },
        { key: 'resellerNo', width: '200px', title: '核销商ID', scopedSlots: { customRender: 'resellerNo' } },
        { key: 'productType', width: '200px', title: '业务类型', scopedSlots: { customRender: 'productType' } },
        { key: 'chargeAccount', width: '200px', title: '充值账号', scopedSlots: { customRender: 'chargeAccount' } },
        { key: 'orderStatus', width: '200px', title: '订单状态', scopedSlots: { customRender: 'orderStatus' } },
        { key: 'orderAllAmount', width: '200px', title: '订单总金额', scopedSlots: { customRender: 'orderAllAmount' } },
        { key: 'finishAllAmount', width: '150px', title: '已充值到账总金额', scopedSlots: { customRender: 'finishAllAmount' } },
        { key: 'queryFlag', width: '150px', title: '子核销名称', scopedSlots: { customRender: 'queryFlag' } },
        { key: 'op', title: '操作', width: '160px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
    ]

    export default {
        name: 'OrderList',
        // eslint-disable-next-line standard/object-curly-even-spacing
        components: { JeepayTable, JeepayTableColumns, JeepayTextUp, Detail, Upload },
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
            importOrder () {
              this.$refs.uploadInfo.show()
            },
            disabledDate (current) { // 今日之后日期不可选
                return current && current > moment().endOf('day')
            },
            onChange (date, dateString) {
                this.searchData.createdStart = dateString[0] // 开始时间
                this.searchData.createdEnd = dateString[1] // 结束时间
            },
            queryFunc () {
              if (this.searchData.amountSearch) {
                this.searchData.amount = ''
                this.searchData.amount = this.searchData.amountSearch * 100
              }
              this.btnLoading = true
              this.$refs.infoTable.refTable(true)
            },
            // 请求table接口数据
            reqTableDataFunc: (params) => {
                return req.list(API_URL_RESELLER_ORDER_COUNT_LIST, params)
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
              if (this.searchData.amountSearch) {
                this.searchData.amount = ''
                this.searchData.amount = this.searchData.amountSearch * 100
              }
                this.$refs.infoTable.refTable(true)
            },
            detailFunc: function (recordId) { // 业务通用【详情】 函数
                this.$refs.detailInfo.show(recordId)
            }
        }
    }
</script>
