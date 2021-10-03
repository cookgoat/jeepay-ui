<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'订单号'" :msg="searchData.outTradeNo" v-model="searchData.outTradeNo" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.bizType" placeholder="业务类型" default-value="">
                <a-select-option value="PROPERTY_CREDIT">资和信</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
                <a-select-option value="CTRIP">携程任我行</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.status" placeholder="状态" default-value="">
                <a-select-option value="PAYING">支付中</a-select-option>
                <a-select-option value="FINISH">完成支付</a-select-option>
                <a-select-option value="OVER_TIME">超时</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.payWay" placeholder="支付方式" default-value="">
                <a-select-option value="ALI_WAP">支付宝网页</a-select-option>
                <a-select-option value="WX_H5">微信H5</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'ID'" :msg="searchData.id" v-model="searchData.id" />
            <jeepay-text-up :placeholder="'小号id'" :msg="searchData.pretenderAccountId" v-model="searchData.pretenderAccountId" />
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
            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
<!--        <div>-->
<!--          <a-button icon="plus" v-if="$access('ENT_ISV_INFO_ADD')" type="primary" @click="addFunc" class="mg-b-30">添加</a-button>-->
<!--        </div>-->
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
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="bizType" slot-scope="{record}">
          <b v-if="record.bizType ==='PROPERTY_CREDIT'">资和信</b>
        </template> <!-- 自定义插槽 -->
        <template slot="outTradeNo" slot-scope="{record}"><b>{{ record.outTradeNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="status" slot-scope="{record}">
          <b v-if="record.status ==='PAYING'">支付中</b>
          <b v-if="record.status ==='FINISH'">完成支付</b>
          <b v-if="record.status ==='OVER_TIME'">超时</b>
        </template> <!-- 自定义插槽 -->
        <template slot="pretenderAccountId" slot-scope="{record}"><b>{{ record.pretenderAccountId }}</b></template> <!-- 自定义插槽 -->
        <template slot="amount" slot-scope="{record}"><b>{{ '￥'+record.amount/100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="payWay" slot-scope="{record}">
          <b v-if="record.payWay ==='ALI_WAP'">支付宝网页</b>
          <b v-if="record.payWay ==='WX_H5'">微信H5</b>
        </template> <!-- 自定义插槽 -->
        <template slot="payUrl" slot-scope="{record}"><b>{{ record.payUrl }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtNotify" slot-scope="{record}"><b>{{ record.gmtNotify }}</b></template> <!-- 自定义插槽 -->
        <template slot="matchResellerOrderNo" slot-scope="{record}"><b>{{ record.matchResellerOrderNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="ext" slot-scope="{record}"><b>{{ record.ext }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}">
          <b v-if="record.productType ==='JD_E_CARD'">京东E卡</b>
          <b v-if="record.productType ==='CTRIP'">携程任我行</b></template> <!-- 自定义插槽 -->
        <template slot="gmtExpired" slot-scope="{record}"><b>{{ record.gmtExpired }}</b></template> <!-- 自定义插槽 -->
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
import { API_URL_PRETENDER_ORDER_LIST, req } from '@/api/manage'
import moment from 'moment'
import Detail from '@/views/pretender/order/Detail'
const tableColumns = [

  { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
  { key: 'bizType', width: '200px', title: '业务类型', scopedSlots: { customRender: 'bizType' } },
  { key: 'productType', width: '150px', title: '产品类型', scopedSlots: { customRender: 'productType' } },
  { key: 'outTradeNo', width: '150px', title: '订单号', scopedSlots: { customRender: 'outTradeNo' } },
  { key: 'status', width: '150px', title: '状态', scopedSlots: { customRender: 'status' } },
  { key: 'pretenderAccountId', width: '150px', title: '伪装小号ID', scopedSlots: { customRender: 'pretenderAccountId' } },
  { key: 'amount', width: '150px', title: '金额', scopedSlots: { customRender: 'amount' } },
  { key: 'payWay', width: '150px', title: '支付方式', scopedSlots: { customRender: 'payWay' } },
  // { key: 'payUrl', width: '150px', title: 'URL连接', scopedSlots: { customRender: 'payUrl' } },
  { key: 'gmtNotify', width: '150px', title: '回调时间', scopedSlots: { customRender: 'gmtNotify' } },
  { key: 'matchResellerOrderNo', width: '150px', title: '核销商订单', scopedSlots: { customRender: 'matchResellerOrderNo' } },
  { key: 'ext', width: '150px', title: '扩展字段', scopedSlots: { customRender: 'ext' } },
  { key: 'gmtExpired', width: '150px', title: '过期时间', scopedSlots: { customRender: 'gmtExpired' } },
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
      this.searchData.createdStart = dateString[0] // 开始时间
      this.searchData.createdEnd = dateString[1] // 结束时间
    },
    queryFunc () {
      this.btnLoading = true
      this.$refs.infoTable.refTable(true)
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return req.list(API_URL_PRETENDER_ORDER_LIST, params)
    },
    delFunc: function (recordId) {
      const that = this
      this.$infoBox.confirmDanger('确认删除？', '该操作将删除该账号', () => {
        req.delById(API_URL_PRETENDER_ORDER_LIST, recordId).then(res => {
          that.$refs.infoTable.refTable(false)
          this.$message.success('删除成功')
        })
      })
    },
    addFunc: function () { // 业务通用【新增】 函数
      this.$refs.uploadInfo.show()
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    detailFunc: function (recordId) { // 业务通用【详情】 函数
      this.$refs.detailInfo.show(recordId)
    }
  }
}
</script>
