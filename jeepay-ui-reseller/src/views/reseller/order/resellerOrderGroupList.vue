<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'订单号'" :msg="searchData.resellerNo" v-model="searchData.resellerNo" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
                <a-select-option value="CTRIP">携程任我行</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'充值账号'" :msg="searchData.chargeAccount" v-model="searchData.chargeAccount" />
            <a-input-number :placeholder="'充值金额'" v-model="searchData.amountSearch" :min="1" :max="9999999999999" style="margin-right: 15px;"/>
            <jeepay-text-up :placeholder="'查询标志'" :msg="searchData.queryFlag" v-model="searchData.queryFlag" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.orderStatus" placeholder="订单状态" default-value="">
                <a-select-option value="WAITING_PAY">等待支付</a-select-option>
                <a-select-option value="PAYING">支付中</a-select-option>
                <a-select-option value="FINISH">订单完成</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'上游订单号'" :msg="searchData.matchOutTradeNo" v-model="searchData.matchOutTradeNo" />
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
            <span class="table-page-search-submitButtons" style="margin-left: 20px;">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
        <div>
          <a-button icon="plus" v-if="$access('ENT_RESELLER_ORDER_GROUP_IMPORT')" type="primary" @click="importOrder" class="mg-b-30">导入核销订单</a-button>
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
        <template slot="id" slot-scope="{record}"><b>{{ record.id.toString() }}</b></template> <!-- 自定义插槽 -->
        <template slot="orderNo" slot-scope="{record}"><b>{{ record.orderNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}">
          <b v-if="record.productType ==='JD_E_CARD'">京东E卡</b>
          <b v-if="record.productType ==='CTRIP'">携程任我行</b>
        </template> <!-- 自定义插槽 -->
        <template slot="chargeAccount" slot-scope="{record}"><b>{{ record.chargeAccount }}</b></template> <!-- 自定义插槽 -->
        <template slot="amount" slot-scope="{record}"><b>{{ '￥'+record.amount / 100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccountType" slot-scope="{record}">
          <b v-if="record.chargeAccountType ==='MOBILE'">手机号</b>
          <b v-if="record.chargeAccountType ==='PLATFORM_ACCOUNT'">平台账号</b>
        </template> <!-- 自定义插槽 -->
        <template slot="orderStatus" slot-scope="{record}">
          <b v-if="record.orderStatus ==='WAITING_PAY'">等待支付</b>
          <b v-if="record.orderStatus ==='PAYING'">支付中</b>
          <b v-if="record.orderStatus ==='FINISH'">订单完成</b>
        </template> <!-- 自定义插槽 -->
        <template slot="matchOutTradeNo" slot-scope="{record}"><b>{{ record.matchOutTradeNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtPayingStart" slot-scope="{record}"><b>{{ record.gmtPayingStart }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button type="link" v-if="$access('ENT_RESELLER_ORDER_GROUP_VIEW')" @click="detailFunc(record.id)">详情</a-button>
          </JeepayTableColumns>
        </template>
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
    import { API_URL_RESELLER_ORDER_LIST, req } from '@/api/manage'
    import moment from 'moment'
    import Detail from '@/views/reseller/order/Detail'
    import Upload from '@/views/reseller/order/Upload'
    const tableColumns = [

        { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
        { key: 'orderNo', width: '200px', title: '订单号', scopedSlots: { customRender: 'orderNo' } },
        { key: 'resellerNo', width: '200px', title: '核销商ID', scopedSlots: { customRender: 'resellerNo' } },
        { key: 'productType', width: '200px', title: '业务类型', scopedSlots: { customRender: 'productType' } },
        { key: 'chargeAccount', width: '200px', title: '充值账号', scopedSlots: { customRender: 'chargeAccount' } },
        { key: 'amount', width: '200px', title: '充值金额', scopedSlots: { customRender: 'amount' } },
        { key: 'queryFlag', width: '200px', title: '查询标志', scopedSlots: { customRender: 'queryFlag' } },
        { key: 'chargeAccountType', width: '200px', title: '充值账号类型', scopedSlots: { customRender: 'chargeAccountType' } },
        { key: 'orderStatus', width: '200px', title: '订单状态', scopedSlots: { customRender: 'orderStatus' } },
        { key: 'matchOutTradeNo', width: '200px', title: '上游订单号', scopedSlots: { customRender: 'matchOutTradeNo' } },
        { key: 'gmtPayingStart', width: '200px', title: '匹配时间', scopedSlots: { customRender: 'gmtPayingStart' } },
        { key: 'gmtCreate', width: '150px', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } },
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
                return req.list(API_URL_RESELLER_ORDER_LIST, params)
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
