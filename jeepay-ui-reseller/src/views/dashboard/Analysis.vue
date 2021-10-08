<template>
  <div id="chart-card">
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }" />
        <a-descriptions title="京东E卡">
          <a-descriptions-item label="总订单金额">
            {{'￥'+jd_currentStat.allOrderAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="完成金额">
            {{'￥'+jd_currentStat.allFinishAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{'￥'+jd_currentStat.allReturnedAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="支付中金额">
            {{'￥'+jd_currentStat.allPayAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{'￥'+jd_currentStat.allSleepAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="等待支付订单金额">
            {{'￥'+jd_currentStat.allWaitAmount / 100}}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>

    <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :showPage="false"
        :reqTableDataFunc="jd_reqTableDataFunc"
        :tableColumns="tableColumns"
        :scrollX="1100"
        rowKey="id"
    >
      <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥'+record.faceAmount  / 100}}</b></template> <!-- 自定义插槽 -->
      <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allAmount" slot-scope="{record}"><b>{{ '￥'+record.allAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitCount" slot-scope="{record}"><b>{{ record.waitCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitAllAmount" slot-scope="{record}"><b>{{ '￥'+record.waitAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="payAllAmount" slot-scope="{record}"> <b>{{ '￥'+record.payAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥'+record.finishAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥'+record.sleepAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
    <hr/>
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }" />
        <a-descriptions title="携程任我行">
          <a-descriptions-item label="总订单金额">
            {{'￥'+xc_currentStat.allOrderAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="完成金额">
            {{'￥'+xc_currentStat.allFinishAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{'￥'+xc_currentStat.allReturnedAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="支付中金额">
            {{'￥'+xc_currentStat.allPayAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{'￥'+xc_currentStat.allSleepAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="等待支付订单金额">
            {{'￥'+xc_currentStat.allWaitAmount / 100}}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :showPage="false"
        :reqTableDataFunc="xc_reqTableDataFunc"
        :tableColumns="tableColumns"
        :scrollX="1100"
        rowKey="id"
    >
      <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥'+record.faceAmount  / 100}}</b></template> <!-- 自定义插槽 -->
      <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allAmount" slot-scope="{record}"><b>{{ '￥'+record.allAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitCount" slot-scope="{record}"><b>{{ record.waitCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitAllAmount" slot-scope="{record}"><b>{{ '￥'+record.waitAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="payAllAmount" slot-scope="{record}"> <b>{{ '￥'+record.payAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥'+record.finishAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥'+record.sleepAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
    <hr/>
    <a-descriptions title="京东E卡-子核销订单资金统计"></a-descriptions>
    <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :showPage="false"
        :reqTableDataFunc="jd_reqTableDataFunc_child"
        :tableColumns="tableColumns_child"
        :scrollX="1100"
        rowKey="id"
    >
      <template slot="queryFlag" slot-scope="{record}"> <b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
      <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥'+record.allOrderAmount  / 100}}</b></template> <!-- 自定义插槽 -->
      <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥'+record.allWaitAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥'+record.allFinishAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥'+record.allReturnedAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥'+record.allPayAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥'+record.allSleepAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
    <hr/>
    <a-descriptions title="携程任我行-子核销订单资金统计"></a-descriptions>
    <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :showPage="false"
        :reqTableDataFunc="xc_reqTableDataFunc_child"
        :tableColumns="tableColumns_child"
        :scrollX="1100"
        rowKey="id"
    >
      <template slot="queryFlag" slot-scope="{record}"> <b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
      <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥'+record.allOrderAmount  / 100}}</b></template> <!-- 自定义插槽 -->
      <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥'+record.allWaitAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥'+record.allFinishAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥'+record.allReturnedAmount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥'+record.allPayAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥'+record.allSleepAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
  </div>
</template>

<script>
import { xcstatByCurrentUser, jdstatByCurrentUser, jdoverallResellerCount, xcoverallResellerCount, orderFundOverallViewByChildReseller } from '@/api/manage'
  import JeepayTable from '@/components/JeepayTable/JeepayTable'
  import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
  import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'

  const tableColumns = [
    { key: 'faceAmount', width: '200px', title: '订单面值', scopedSlots: { customRender: 'faceAmount' } },
    { key: 'allCount', width: '200px', title: '订单总数', scopedSlots: { customRender: 'allCount' } },
    { key: 'allAmount', width: '200px', title: '订单总金额', scopedSlots: { customRender: 'allAmount' } },
    { key: 'waitCount', width: '200px', title: '订单待处理总数', scopedSlots: { customRender: 'waitCount' } },
    { key: 'waitAllAmount', width: '200px', title: '订单待处理总金额', scopedSlots: { customRender: 'waitAllAmount' } },
    { key: 'payingCount', width: '200px', title: '订单支付中总数', scopedSlots: { customRender: 'payingCount' } },
    { key: 'payAllAmount', width: '150px', title: '订单支付中总金额', scopedSlots: { customRender: 'payAllAmount' } },
    { key: 'finishCount', width: '150px', title: '订单完成数', scopedSlots: { customRender: 'finishCount' } },
    { key: 'finishAllAmount', width: '150px', title: '订单完成总金额', scopedSlots: { customRender: 'finishAllAmount' } },
    { key: 'sleepCount', width: '150px', title: '休眠订单总数', scopedSlots: { customRender: 'sleepCount' } },
    { key: 'sleepAllAmount', width: '150px', title: '休眠订单总金额', scopedSlots: { customRender: 'sleepAllAmount' } }
  ]
  const tableColumnsChild = [
    { key: 'queryFlag', width: '200px', title: '子核销商名称', scopedSlots: { customRender: 'queryFlag' } },
    { key: 'allOrderAmount', width: '200px', title: '总订单金额', scopedSlots: { customRender: 'allOrderAmount' } },
    { key: 'allWaitAmount', width: '200px', title: '总待处理金额', scopedSlots: { customRender: 'allWaitAmount' } },
    { key: 'allFinishAmount', width: '200px', title: '总完成金额', scopedSlots: { customRender: 'allFinishAmount' } },
    { key: 'allReturnedAmount', width: '200px', title: '总回款金额', scopedSlots: { customRender: 'allReturnedAmount' } },
    { key: 'allPayAmount', width: '200px', title: '总支付中金额', scopedSlots: { customRender: 'allPayAmount' } },
    { key: 'allSleepAmount', width: '200px', title: '总休眠金额', scopedSlots: { customRender: 'allSleepAmount' } }
  ]
  export default {
    components: { JeepayTable, JeepayTableColumns, JeepayTextUp },
    data () {
      return {
        skeletonIsShow: true, // 骨架屏是否显示
        skeletonReqNum: 0, // 当所有数据请求完毕后关闭骨架屏（共四个请求）
        tableColumns: tableColumns,
        tableColumns_child: tableColumnsChild,
        jd_currentStat: {
          allReturnedAmount: 0,
          allPayAmount: 0,
          allOrderAmount: 0,
          resellerName: '',
          allFinishAmount: 0,
          allSleepAmount: 0,
          allWaitAmount: 0,
          resellerNo: ''
        },
        xc_currentStat: {
          allReturnedAmount: 0,
          allPayAmount: 0,
          allOrderAmount: 0,
          resellerName: '',
          allFinishAmount: 0,
          allSleepAmount: 0,
          allWaitAmount: 0,
          resellerNo: ''
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      queryFunc () {
        this.btnLoading = true
        this.$refs.infoTable.refTable(true)
      },
      // 请求table接口数据
      xc_reqTableDataFunc: (params) => {
        params = {
          productType: 'CTRIP'
        }
        return jdoverallResellerCount(params)
      },
      // 请求table接口数据
      jd_reqTableDataFunc: (params) => {
        params = {
          productType: 'JD_E_CARD'
        }
        return xcoverallResellerCount(params)
      },
      xc_reqTableDataFunc_child: (params) => {
        params = {
          productType: 'CTRIP'
        }
        return orderFundOverallViewByChildReseller(params)
      },
      // 请求table接口数据
      jd_reqTableDataFunc_child: (params) => {
        params = {
          productType: 'JD_E_CARD'
        }
        return orderFundOverallViewByChildReseller(params)
      },
      init () {
        const that = this
        // 周总交易金额
        const params = {
          productType: 'JD_E_CARD'
        }
        jdstatByCurrentUser(params).then(res => {
          this.jd_currentStat.allReturnedAmount = res.allReturnedAmount
          this.jd_currentStat.allPayAmount = res.allPayAmount
          this.jd_currentStat.allOrderAmount = res.allOrderAmount
          this.jd_currentStat.resellerName = res.resellerName
          this.jd_currentStat.allFinishAmount = res.allFinishAmount
          this.jd_currentStat.allSleepAmount = res.allSleepAmount
          this.jd_currentStat.allWaitAmount = res.allWaitAmount
          this.jd_currentStat.resellerNo = res.resellerNo
          that.skeletonClose(that)
        }).catch(err => {
          console.log(err)
          that.skeletonClose(that)
        })
        // 周总交易金额
        const paramsxc = {
          productType: 'CTRIP'
        }
        xcstatByCurrentUser(paramsxc).then(res => {
          this.xc_currentStat.allReturnedAmount = res.allReturnedAmount
          this.xc_currentStat.allPayAmount = res.allPayAmount
          this.xc_currentStat.allOrderAmount = res.allOrderAmount
          this.xc_currentStat.resellerName = res.resellerName
          this.xc_currentStat.allFinishAmount = res.allFinishAmount
          this.xc_currentStat.allSleepAmount = res.allSleepAmount
          this.xc_currentStat.allWaitAmount = res.allWaitAmount
          this.xc_currentStat.resellerNo = res.resellerNo
          that.skeletonClose(that)
        }).catch(err => {
          console.log(err)
          that.skeletonClose(that)
        })
      },
      skeletonClose (that) {
        // 每次请求成功，skeletonReqNum + 1,当大于等于4时， 取消骨架屏展示
        that.skeletonReqNum++
        that.skeletonReqNum >= 2 ? that.skeletonIsShow = false : that.skeletonIsShow = true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less'; // 响应式布局
  .user-greet {
    font-size: 19px;
    font-weight: 500;

    .quick-start {
      box-sizing: border-box;
      padding-top: 20px;

      .quick-start-title {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        margin-bottom:0;
      }
      .quick-start-ul {
        font-size: 13px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        padding: 0;
        margin-bottom:0;

        li {
          margin-right: 20px;
          margin-top: 10px;
          text-align: left;

          :hover {
            color: @jee-inside-link
          }
        }
        li:hover {
          cursor:pointer;
        }
      }
    }
  }

  .user-greet-title{
    box-sizing:border-box;
    padding-bottom:20px;
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid #ddd;

    .user-greet-all {
      display:flex;
      flex-direction:row;

      .user-greet-img {
        width:60px;
        height:60px;
        border-radius:50%;
        overflow:hidden;
        background:#ddd;
        margin-right:10px;
        img{
          width:60px;
          height:60px;
          border:1px solid rgba(0,0,0,0.08)
        }
      }
      .user-greet-all {
        display:flex;
        flex-direction:column;
        justify-content: space-around;
      }
    }
  }
  .analy-title {
    display:flex;
    justify-content:space-between;
    padding-bottom:0;
    align-items: center;
  }
  .there-spot:hover {
    cursor:pointer;
  }
  .ant-calendar-picker-input {
    border:none !important
  }
  .payAmountSpan {
   display:flex;
   justify-content:space-between;
   width: 100%;
   box-sizing: border-box;
   position: absolute;
   bottom:20px;
   padding:0 20px;
   box-sizing: border-box;
  }

  .chart-data {
    padding:20px;
    box-sizing: border-box;
  }

  .top-left {

    .chart-data {
      padding:0;
    }
  }

  .pay-count-title {
    display:flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items:center;
    .pay-count-date{
      display:flex;
      justify-content:space-around;
    }
  }

  .pay-amount-text {
    display: flex;
padding: 0 20px 0 16px;
    box-sizing: border-box;
    height: 33px;
    line-height: 33px;
    align-items: baseline;
    margin-bottom: 10px;
    .pay-amount {
      font-size: 33px;
      margin-right: 10px;
    }
  }
  .chart-padding {
    box-sizing: border-box;
    max-width:330px;
    min-width:260px;
    flex-grow: 1;
    flex-shrink:1;
    margin-bottom: 20px;
  }
  .change-date-layout {
    padding-left: 11px;
    align-items: center;
    display:flex;
    justify-content:space-between;

    .change-date-icon {
      width:50px;
      height:36px;
      display:flex;
      align-items:center;
      justify-content:center;
    }
  }

  .chart-title {
    font-size: 16px;
    font-weight: 500;
    margin-right:20px;
    margin-bottom:20px;
  }
</style>
