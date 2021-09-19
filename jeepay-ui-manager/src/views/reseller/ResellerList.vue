<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'订单号'" :msg="searchData.orderNo" v-model="searchData.orderNo" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.orderStatus" placeholder="订单状态" default-value="">
                <a-select-option value="PAYING">支付中</a-select-option>
                <a-select-option value="WAITING_PAY">待支付</a-select-option>
                <a-select-option value="FINISH">支付成功</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'核销商ID'" :msg="searchData.resellerId" v-model="searchData.resellerId" />
            <jeepay-text-up :placeholder="'充值账号'" :msg="searchData.chargeAccount" v-model="searchData.chargeAccount" />
            <jeepay-text-up :placeholder="'支付订单号'" :msg="searchData.matchOutTradeNo" v-model="searchData.matchOutTradeNo" />
            <jeepay-text-up :placeholder="'查询标志'" :msg="searchData.queryFlag" v-model="searchData.queryFlag" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="充值产品类型" default-value="">
                <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
                <a-select-option value="CTRIP">携程任我行</a-select-option>
              </a-select>
            </a-form-item>
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
        <div>
          <a-button icon="plus" v-if="$access('ENT_ISV_INFO_ADD')" type="primary" @click="addFunc" class="mg-b-30">添加</a-button>
        </div>
      </div>

      <!-- 列表渲染 -->
      <JeepayTableExpand
        @btnLoadClose="btnLoading=false"
        @getAction="getAction"
        ref="infoTable"
        :initData="true"
        :reqTableDataFunc="reqTableDataFunc"
        :tableColumns="tableColumns"
        :table-columns2="tableColumns2"
        :searchData="searchData"
        :childern="childern"
        :scrollX="1100"
        rowKey="orderNo"
      >
        <template slot="orderNo" slot-scope="{record}"><b>{{ record.orderNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="id" slot-scope="{record}"><b>{{ record.id.toString() }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccountType" slot-scope="{record}" >
          <span v-if="record.chargeAccountType === 'MOBILE'">{{ '手机号' }}</span>
          <span v-if="record.chargeAccountType === 'PLATFORM_ACCOUNT'">{{ '他方平台账号' }}</span>
        </template> <!-- 自定义插槽 -->
        <template slot="orderStatus" slot-scope="{record}" >
          <a-tag :color="record.orderStatus === 'PAYING'?'blue':record.orderStatus === 'WAITING_PAY'?'orange':record.state === 'FINISH'?'green':'volcano'">
            {{ record.orderStatus === 'PAYING'?'支付中':record.orderStatus === 'WAITING_PAY'?'待支付':record.orderStatus === 'FINISH'?'支付成功':'未知' }}
          </a-tag>
        </template> <!-- 自定义插槽 -->
        <template slot="amount" slot-scope="{record}"><b>{{ '￥'+record.amount/100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerId" slot-scope="{record}"><b>{{ record.resellerId }}</b></template> <!-- 自定义插槽 -->
        <template slot="matchOutTradeNo" slot-scope="{record}"><b>{{ record.matchOutTradeNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}">
          <b v-if="record.productType ==='JD_E_CARD'">京东E卡</b>
          <b v-if="record.productType ==='CTRIP'">携程任我行</b>
        </template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtUpdate" slot-scope="{record}"><b>{{ record.gmtUpdate }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccount" slot-scope="{record}"><b>{{ record.chargeAccount }}</b></template> <!-- 自定义插槽 -->
        <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->

        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button type="link" v-if="$access('ENT_ISV_INFO_EDIT')" @click="detailFunc(record.id)">详情</a-button>
            <a-button type="link" v-if="$access('ENT_ISV_INFO_EDIT')" @click="editFunc(record.id)">修改</a-button>
            <a-button type="link" v-if="$access('ENT_ISV_INFO_DEL')" style="color: red" @click="delFunc(record.id)">删除</a-button>
          </JeepayTableColumns>
        </template>
      </JeepayTableExpand>
    </a-card>
    <!--    &lt;!&ndash; 新增页面组件  &ndash;&gt;-->
    <InfoAddOrEdit ref="infoAddOrEdit" :callbackFunc="searchFunc"/>
    <Upload ref="uploadInfo"></Upload>
    <Detail ref="detailInfo"></Detail>
    <!--    &lt;!&ndash; 支付参数配置页面组件  &ndash;&gt;-->
    <!--    <IsvPayIfConfigList ref="isvPayIfConfigList" />-->
  </page-header-wrapper>
</template>
<script>
import JeepayTableExpand from '@/components/JeepayTable/JeepayTableExpand'
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import { API_URL_RESELLER_ORDER_LIST, API_URL_PRETENDER_ORDER_SEARCH, req } from '@/api/manage'
import moment from 'moment'
import InfoAddOrEdit from './AddOrEdit'
import Upload from '@/views/reseller/Upload'
import Detail from './Detail'
// import IsvPayIfConfigList from './IsvPayIfConfigList'

// eslint-disable-next-line no-unused-vars
const tableColumns = [

  { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
  { key: 'orderNo', width: '200px', title: '订单号', scopedSlots: { customRender: 'orderNo' } },
  { key: 'amount', width: '150px', title: '金额', scopedSlots: { customRender: 'amount' } },
  { key: 'orderStatus', width: '150px', title: '订单状态', scopedSlots: { customRender: 'orderStatus' } },
  { key: 'chargeAccountType', width: '150px', title: '账号类型', scopedSlots: { customRender: 'chargeAccountType' } },
  { key: 'resellerId', width: '150px', title: '核销商ID', scopedSlots: { customRender: 'resellerId' } },
  { key: 'matchOutTradeNo', width: '200px', title: '平台支付订单号', scopedSlots: { customRender: 'matchOutTradeNo' } },
  { key: 'productType', width: '150px', title: '产品类型 ', scopedSlots: { customRender: 'productType' } },
  { key: 'chargeAccount', width: '150px', title: '充值账号', scopedSlots: { customRender: 'chargeAccount' } },
  { key: 'queryFlag', width: '150px', title: '查询标志', scopedSlots: { customRender: 'queryFlag' } },
  { key: 'gmtCreate', width: '150px', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } },
  { key: 'gmtUpdate', width: '150px', title: '更新日期', scopedSlots: { customRender: 'gmtUpdate' } },
  { key: 'op', title: '操作', width: '260px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

const tableColumns2 = [

  { key: 'id', width: '200px', dataIndex: 'id', title: 'ID', scopedSlots: { customRender: 'id' } },
  { key: 'bizType', width: '200px', dataIndex: 'bizType', title: '业务类型', customRender: (text, record, index) => { return record.bizType === 'PROPERTY_CREDIT' ? '资和信' : '未知' } },
  { key: 'outTradeNo', width: '150px', dataIndex: 'outTradeNo', title: '订单号', scopedSlots: { customRender: 'outTradeNo' } },
  { key: 'status', width: '150px', dataIndex: 'status', title: '状态', customRender: (text, record, index) => { return record.status === 'PAYING' ? '支付中' : record.status === 'OVER_TIME' ? '超时' : record.status === 'FINISH' ? '完成支付' : '未知' } },
  { key: 'pretenderAccountId', dataIndex: 'pretenderAccountId', width: '150px', title: '伪装小号ID', scopedSlots: { customRender: 'pretenderAccountId' } },
  { key: 'amount', width: '150px', dataIndex: 'amount', title: '金额', customRender: (text, record, index) => { return '￥' + record.amount / 100 } },
  { key: 'payWay', width: '150px', dataIndex: 'payWay', title: '支付方式', customRender: (text, record, index) => { return record.payWay === 'ALI_WAP' ? '支付宝网页' : record.payWay === 'WX_H5' ? '微信H5' : '未知' } },
  // { key: 'payUrl', width: '150px', title: 'URL连接', scopedSlots: { customRender: 'payUrl' } },
  { key: 'gmtNotify', width: '150px', dataIndex: 'gmtNotify', title: '回调时间', scopedSlots: { customRender: 'gmtNotify' } },
  { key: 'matchResellerOrderNo', dataIndex: 'matchResellerOrderNo', width: '150px', title: '核销商订单', scopedSlots: { customRender: 'matchResellerOrderNo' } },
  { key: 'ext', width: '150px', dataIndex: 'ext', title: '扩展字段', scopedSlots: { customRender: 'ext' } },
  { key: 'productType', width: '150px', dataIndex: 'productType', title: '产品类型', customRender: (text, record, index) => { return record.productType === 'JD_E_CARD' ? '京东E卡' : record.productType === 'CTRIP' ? '携程任我行' : '未知' } },
  { key: 'gmtExpired', width: '150px', dataIndex: 'gmtExpired', title: '过期时间', scopedSlots: { customRender: 'gmtExpired' } },
  { key: 'gmtCreate', width: '150px', dataIndex: 'gmtCreate', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } }
]

export default {
  name: 'ResellerList',
  components: { JeepayTableExpand, JeepayTableColumns, JeepayTextUp, InfoAddOrEdit, Upload, Detail },

  data () {
    // const data = []
    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: i,
    //     date: '2014-12-24 23:12:00',
    //     name: 'This is production name',
    //     upgradeNum: 'Upgraded: 56'
    //   })
    // }
    return {
      btnLoading: false,
      tableColumns: tableColumns,
      tableColumns2: tableColumns2,
      searchData: {},
      childern: []

    }
  },
  mounted () {
  },
  methods: {
    getAction (record) {
      const that = this
      that.childern = []
      if (record.orderStatus !== 'FINISH') {
        that.$message.error('该核销订单不存在关联支付渠道订单')
        return
      }
      req.list(API_URL_PRETENDER_ORDER_SEARCH + '/' + record.orderNo).then(res => {
        that.childern.push(res)
      })
    },
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
      return req.list(API_URL_RESELLER_ORDER_LIST, params)
    },
    delFunc: function (recordId) {
      const that = this
      this.$infoBox.confirmDanger('确认删除？', '该操作将删除该核销订单', () => {
        req.delById(API_URL_RESELLER_ORDER_LIST, recordId).then(res => {
          that.$refs.infoTable.refTable(false)
          this.$message.success('删除成功')
        })
      })
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    addFunc: function () { // 业务通用【新增】 函数
      this.$refs.uploadInfo.show()
    },
    editFunc: function (recordId) { // 业务通用【修改】 函数
      this.$refs.infoAddOrEdit.show(recordId)
    },
    detailFunc: function (recordId) { // 业务通用【详情】 函数
      this.$refs.detailInfo.show(recordId)
    }
  }
}
</script>
