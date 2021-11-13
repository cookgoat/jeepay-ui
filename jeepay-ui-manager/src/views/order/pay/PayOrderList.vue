<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'商户订单号'" :msg="searchData.mchOrderNo" v-model="searchData.mchOrderNo"/>
            <jeepay-text-up :placeholder="'官方单号'" :msg="searchData.channelOrderNo" v-model="searchData.channelOrderNo"/>
            <jeepay-text-up :placeholder="'充值账号'" :msg="searchData.chargeAccount " v-model="searchData.chargeAccount "/>
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.amount" placeholder="订单金额">
                <a-select-option v-for="(item, index) in moneyList" :value="item.value" :key="index">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.state" placeholder="支付状态" default-value="">
                <a-select-option value="0">订单生成</a-select-option>
                <a-select-option value="1">支付中</a-select-option>
                <a-select-option value="2">支付成功</a-select-option>
                <a-select-option value="3">支付失败</a-select-option>
                <a-select-option value="4">已撤销</a-select-option>
                <a-select-option value="5">已退款</a-select-option>
                <a-select-option value="6">订单关闭</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.notifyState" placeholder="支付回调">
                <a-select-option value="1">已发送</a-select-option>
                <a-select-option value="0">未发送</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.resellerNotifyStatus" placeholder="核销回调">
                <a-select-option value="WAIT_NOTIFY">待回调</a-select-option>
                <a-select-option value="NOTIFY_SUCCESS">已发送</a-select-option>
                <a-select-option value="NOTIFY_FAILED">未发送</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'核销单号'" :msg="searchData.resellerOrderNo  "
                            v-model="searchData.resellerOrderNo  "/>
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.resellerNo" placeholder="请选择核销商">
                <a-select-option v-for="item in reSellerList" :key="item.resellerNo" :value="item.resellerNo">
                  {{ item.resellerName }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.resellerOrderStatus" placeholder="核销状态" default-value="">
                <a-select-option v-for="(item, index) in orderStatus" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option v-for="(item, index) in productTypeList" :key="index" :value="item.value">{{
                    item.name
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout" style="max-width:350px;min-width:300px">
              <a-range-picker @change="onChange" v-model="daterange"></a-range-picker>
            </a-form-item>
            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="resetFormData">重置</a-button>
              <a-button style="margin-left: 8px; background-color: #CD853F; color: white; border: 0;"
                        @click="batchCallback">一键回调</a-button>
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
        rowKey="payOrderId"
        :scrollX="1550"
      >
        <template slot="mchName" slot-scope="{record}"><b>{{ record.mchName }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}">
          {{
            record.productType === 'JD_E_CARD' ? '京东E卡' : record.productType === 'SINOPEC' ? '中国石化' : record.productType === 'PETRO' ? '中国石油' : record.productType === 'CTRIP' ? '携程任我行' : '测试产品'
          }}
        </template>
        <template slot="stateSlot" slot-scope="{record}">
          <a-tag
            :key="record.state"
            :color="record.state === 0?'blue':
            record.state === 1?'orange':
            record.state === 2?'green':
            record.state === 3 ? 'pink' :
            record.state === 5 ? 'blue' : 'violet'"
          >
            {{
              record.state === 0 ? '订单生成' :
              record.state === 1 ? '支付中' :
              record.state === 2 ? '支付成功' :
              record.state === 3 ? '支付失败' :
              record.state === 4 ? '已撤销' :
              record.state === 5 ? '已退款' :
              record.state === 6 ? '订单关闭' : ''
            }}
          </a-tag>
        </template>
        <template slot="resellerOrderStatus" slot-scope="{record}">
          {{ record.resellerOrderStatus }}
        </template>
        <!--        支付回调-->
        <template slot="notifyState" slot-scope="{record}">
          <template v-if="record.notifyState === 0">
            <span style="color: red;">未发送</span>
          </template>
          <template v-if="record.notifyState === 1">
            <span style="color: green;">已发送</span>
          </template>
        </template>
        <!--        核销回调-->
        <template slot="resellerNotifyStatus" slot-scope="{record}">
          <template v-if="record.resellerNotifyStatus === 'WAIT_NOTIFY'">
            <span>待回调</span>
          </template>
          <template v-if="record.resellerNotifyStatus === 'NOTIFY_SUCCESS'">
            <span style="color: forestgreen;">已发送</span>
          </template>
          <template v-if="record.resellerNotifyStatus === 'NOTIFY_FAILED'">
            <span style="color: red;">未发送</span>
          </template>
        </template>
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <a-button type="link" @click="searchOrder(record.channelOrderNo)">查单</a-button>
          <a-button type="link" v-if="$access('ENT_PAY_ORDER_VIEW')"
                    @click="concatOrder(record.payOrderId, record.state)">补单
          </a-button>
          <a-button type="link" v-if="$access('ENT_PAY_ORDER_VIEW')" @click="detailFunc(record.payOrderId)">详情
          </a-button>
          <a-button type="link" v-if="$access('ENT_PAY_ORDER_VIEW')" @click="detailFunc(record.payOrderId)">日志
          </a-button>
        </template>
      </JeepayTable>
    </a-card>
    <!-- 退款弹出框 -->
    <refund-modal ref="refundModalInfo" :callbackFunc="searchFunc"></refund-modal>
    <Detail ref="orderDetail"></Detail>
    <!-- 日志详情抽屉 -->
    <template>
      <a-drawer
        width="50%"
        placement="right"
        :closable="true"
        :visible="visible"
        :title="visible === true? '订单详情':''"
        @close="onClose"
      >
        <a-row justify="space-between" type="flex">
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="所属系统">
                {{ detailData.mchType === 1 ? '普通商户' : detailData.mchType === 2 ? '特约商户' : '未知' }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="服务商号">
                {{ detailData.isvNo }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="支付订单号">
                <a-tag color="purple">
                  {{ detailData.payOrderId }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="商户号">
                {{ detailData.mchNo }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="商户订单号">
                {{ detailData.mchOrderNo }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="商户名称">
                {{ detailData.mchName }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="支付金额">
                <a-tag color="green">
                  {{ detailData.amount / 100 }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="手续费">
                <a-tag color="pink">{{ detailData.mchFeeAmount / 100 }}</a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="商家费率">{{ (detailData.mchFeeRate * 100).toFixed(2) }}%</a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="订单状态">
                <a-tag
                  :color="detailData.state === 0?'blue':detailData.state === 1?'orange':detailData.state === 2?'green':'volcano'">
                  {{
                    detailData.state === 0 ? '订单生成' : detailData.state === 1 ? '支付中' : detailData.state === 2 ? '支付成功' : detailData.state === 3 ? '支付失败' : detailData.state === 4 ? '已撤销' : detailData.state === 5 ? '已退款' : detailData.state === 6 ? '订单关闭' : '未知'
                  }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="回调状态">
                <a-tag :color="detailData.notifyState === 1?'green':'volcano'">
                  {{ detailData.notifyState === 0 ? '未发送' : detailData.notifyState === 1 ? '已发送' : '未知' }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="应用APPID">
                {{ detailData.appId }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="支付错误码">
                {{ detailData.errCode }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="支付错误描述">
                {{ detailData.errMsg }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="订单失效时间">
                {{ detailData.expiredTime }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="支付成功时间">
                {{ detailData.successTime }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="创建时间">
                {{ detailData.createdAt }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="更新时间">
                {{ detailData.updatedAt }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-divider/>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="商品标题">
                {{ detailData.subject }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="商品描述">
                {{ detailData.body }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="接口代码">
                {{ detailData.ifCode }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="货币代码">
                {{ detailData.currency }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="支付方式">
                {{ detailData.wayCode }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="客户端IP">
                {{ detailData.clientIp }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="用户标识">
                {{ detailData.channelUser }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="渠道订单号">
                {{ detailData.channelOrderNo }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="异步通知地址">
                {{ detailData.notifyUrl }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="页面跳转地址">
                {{ detailData.returnUrl }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="退款状态">
                <a-tag
                  :color="detailData.refundState === 0?'blue':detailData.refundState === 1?'orange':detailData.refundState === 2?'green':'volcano'">
                  {{
                    detailData.refundState === 0 ? '未发起' : detailData.refundState === 1 ? '部分退款' : detailData.refundState === 2 ? '全额退款' : '未知'
                  }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="退款次数">
                {{ detailData.refundTimes }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="退款总额">
                <a-tag color="cyan" v-if="detailData.refundAmount">
                  {{ detailData.refundAmount / 100 }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-divider/>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="订单分账模式">
                <span v-if="detailData.divisionMode == 0">该笔订单不允许分账</span>
                <span v-else-if="detailData.divisionMode == 1">支付成功按配置自动完成分账</span>
                <span v-else-if="detailData.divisionMode == 2">商户手动分账(解冻商户金额)</span>
                <span v-else>未知</span>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="分账状态">
                <a-tag color="blue" v-if="detailData.divisionState == 0">未发生分账</a-tag>
                <a-tag color="orange" v-else-if="detailData.divisionState == 1">待分账</a-tag>
                <a-tag color="red" v-else-if="detailData.divisionState == 2">分账处理中</a-tag>
                <a-tag color="green" v-else-if="detailData.divisionState == 3">任务已结束</a-tag>
                <a-tag color="#f50" v-else>未知</a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :sm="12">
            <a-descriptions>
              <a-descriptions-item label="最新分账发起时间">{{ detailData.divisionLastTime }}</a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
        <a-divider/>
        <a-row justify="start" type="flex">
          <a-col :sm="24">
            <a-form-model-item label="扩展参数">
              <a-input
                type="textarea"
                disabled="disabled"
                style="height: 100px;color: black"
                v-model="detailData.extParam"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-drawer>
    </template>
  </page-header-wrapper>
</template>
<script>
import RefundModal from './RefundModal' // 退款弹出框
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import {
  API_URL_PAY_ORDER_LIST,
  API_URL_PAYWAYS_LIST,
  req,
  conectOrder,
  getConfigs
} from '@/api/manage'
import moment from 'moment'
import axios from 'axios'
import Detail from './searchOrderDetail'
import { batchResend, getChannelDetail, getOrderDetail, getPayOrderList } from '../../../api/order'
import { accountList } from '../../../api/account'

// eslint-disable-next-line no-unused-vars
const tableColumns = [
  { key: 'mchOrderNo', title: '商户单号', dataIndex: 'mchOrderNo', width: '210px', align: 'center' },
  { key: 'resellerOrderNo', title: '核销单号', dataIndex: 'resellerOrderNo', width: '225px', align: 'center' },
  { key: 'resellerName', title: '核销商名称', dataIndex: 'resellerName', ellipsis: true, width: '120px' },
  { key: 'productType', title: '产品类型', width: '120px', scopedSlots: { customRender: 'productType' }, align: 'center' },
  { key: 'wayName', title: '支付方式', width: '120px', dataIndex: 'wayName', align: 'center' },
  // { key: 'wayName', title: '充值账号', width: '120px', dataIndex: 'wayName', align: 'center' },
  {
    key: 'amount',
    title: '订单金额',
    dataIndex: 'amount',
    ellipsis: true,
    width: '100px',
    customRender: (text) => {
      if (text) {
        return text / 100
      }
    }
  },
  // { key: 'amount', title: '运营商', dataIndex: 'amount', ellipsis: true, width: '100px' },
  // { key: 'amount', title: '地区', dataIndex: 'amount', ellipsis: true, width: '100px' },
  { key: 'state', title: '支付状态', scopedSlots: { customRender: 'stateSlot' }, width: 100 },
  {
    key: 'resellerOrderStatus',
    title: '核销状态',
    scopedSlots: { customRender: 'resellerOrderStatus' },
    width: 100,
    customRender: (text, record) => {
      switch (text.resellerOrderStatus) {
        case 'PENDING':
          return '待处理'
        case 'WAITING_MATCH':
          return '待匹配'
        case 'MATCHING':
          return '匹配中'
        case 'PAYING':
          return '待支付'
        case 'RECHARGING':
          return '充值中'
        case 'FINISH':
          return '已到账'
        case 'SLEEP':
          return '休眠'
        case 'NULLIFY':
          return '已经作废'
      }
    }
  },
  { key: 'channelOrderNo', title: '官方单号', dataIndex: 'channelOrderNo', width: '180px' },
  { key: 'notifyState', title: '支付回调', scopedSlots: { customRender: 'notifyState' }, width: 100 },
  { key: 'resellerNotifyStatus', title: '核销回调', scopedSlots: { customRender: 'resellerNotifyStatus' }, width: 100 },
  { key: 'createdAt', title: '下单时间', dataIndex: 'createdAt', width: 180 },
  { key: 'gmtMatch', title: '匹配时间', dataIndex: 'gmtMatch', width: 180 },
  { key: 'op', title: '操作', width: '280px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

export default {
  name: 'IsvListPage',
  components: { JeepayTable, JeepayTableColumns, JeepayTextUp, RefundModal, Detail },
  data () {
    return {
      btnLoading: false,
      tableColumns: tableColumns,
      searchData: {},
      daterange: [],
      createdStart: '', // 选择开始时间
      createdEnd: '', // 选择结束时间
      visible: false,
      detailData: {},
      payWayList: [],
      groupKey: 'applicationConfig',
      orderDetail: {},
      configData: {},
      reSellerList: []
    }
  },
  computed: {},
  mounted () {
    if (this.$access('ENT_PAY_ORDER_SEARCH_PAY_WAY')) {
      this.initPayWay()
    }
    this.getReSeller()
  },
  methods: {
    // 获取核销商列表
    getReSeller () {
      accountList({ pageNumber: 1, pageSize: 9999 }).then(res => {
        this.reSellerList = res.records.map(item => {
          return {
            resellerName: item.resellerName,
            resellerNo: item.resellerNo
          }
        })
      })
    },
    queryFunc () {
      if (this.searchData.amountSearch && this.searchData.amountSearch !== '') {
        this.searchData.amount = ''
        this.searchData.amount = this.searchData.amountSearch * 100
      }
      this.btnLoading = true
      this.$refs.infoTable.refTable(true)
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return getPayOrderList(params)
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      if (this.searchData.amountSearch && this.searchData.amountSearch !== '') {
        this.searchData.amount = ''
        this.searchData.amount = this.searchData.amountSearch * 100
      }
      this.$refs.infoTable.refTable(true)
    },

    // 打开退款弹出框
    openFunc (record, recordId) {
      if (record.refundState === 2) {
        return this.$infoBox.modalError('订单无可退款金额', '')
      }
      this.$refs.refundModalInfo.show(recordId)
    },
    detailFunc: function (recordId) {
      const that = this
      getOrderDetail(recordId).then(res => {
        that.detailData = res
      })
      this.visible = true
    },
    searchOrder (channelOrderNo) {
      if (!channelOrderNo) {
        this.$message.error('官方单号不存在')
        return false
      }
      const that = this
      // getChannelDetail(channelOrderNo).then(res => {
      //   console.log(res)
      // })
      getConfigs(that.groupKey).then(res => {
        let configUrl = ''
        res.forEach(item => {
          if (item.configKey === 'paySiteUrl') {
            configUrl = item.configVal
          }
        })
        if (configUrl !== '') {
          axios.get(configUrl + '/api/pay/query/' + channelOrderNo)
            .then(function (response) {
              that.$refs.orderDetail.show(response.data)
            })
            .catch(function (error) {
              console.log(error)
              that.$refs.orderDetail.onClose()
            })
        }
      })
    },
    concatOrder (payOrderId, state) {
      if (state === 2) {
        return this.$infoBox.modalWarning('订单无法补单', '')
      }
      conectOrder(payOrderId).then(res => {
        this.$infoBox.modalSuccess('补单成功', '')
      }).catch(res => {
        this.$infoBox.modalError(res.msg, '')
      })
    },
    moment,
    onChange (date, dateString) {
      this.searchData.createdStart = dateString[0] // 开始时间
      this.searchData.createdEnd = dateString[1] // 结束时间
    },
    disabledDate (current) { // 今日之后日期不可选
      return current && current > moment().endOf('day')
    },
    onClose () {
      this.visible = false
    },
    initPayWay: function () {
      const that = this
      req.list(API_URL_PAYWAYS_LIST, { 'pageSize': -1 }).then(res => { // 支付方式下拉列表
        that.payWayList = res.records
      })
    },
    // 一键回调
    batchCallback () {
      batchResend().then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
        }
      })
    },
    // 重置
    resetFormData () {
      this.searchData = {}
      this.daterange = []
      this.$nextTick(() => {
        this.searchFunc()
      })
    }
  }
}
</script>
