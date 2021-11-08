<template>
  <div id="chart-card">
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" style="max-width:350px;min-width:300px">
              <a-range-picker
                @change="onChange"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
              >
                <a-icon slot="suffixIcon" type="sync" />
              </a-range-picker>
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;margin-top: 4px">
              <a-button type="primary" icon="search" @click="queryJdFunc" :loading="btnLoading">搜索</a-button>
              <!--              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>-->
            </span>
          </div>
        </a-form>
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }" />
        <a-descriptions title="京东E卡">
          <a-descriptions-item label="总订单金额">
            {{ '￥'+jd_currentStat.allOrderAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="支付中订单金额">
            {{ '￥'+jd_currentStat.allPayingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="完成订单金额">
            {{ '￥'+jd_currentStat.allFinishAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="充值中订单金额">
            {{ '￥'+jd_currentStat.allRechargingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{ '￥'+jd_currentStat.allReturnedAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理订单金额">
            {{ '￥'+jd_currentStat.allPendingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待匹配订单金额">
            {{ '￥'+jd_currentStat.allWaitingMatchAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="过期订单金额">
            {{ '￥'+jd_currentStat.allNullifyAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="匹配中订单金额">
            {{ '￥'+jd_currentStat.allMatchingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{ '￥'+jd_currentStat.allSleepAmount / 100 }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>

    <JeepayTable
      @btnLoadClose="btnLoading=false"
      ref="jdInfoTable"
      :initData="true"
      :showPage="false"
      :reqTableDataFunc="jd_reqTableDataFunc"
      :tableColumns="tableColumns"
      :searchData="searchData"
      :scrollX="1100"
      rowKey="id"
    >
      <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥'+record.faceAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allAmount" slot-scope="{record}"><b>{{ '￥'+record.allAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="pendingCount" slot-scope="{record}"><b>{{ record.pendingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="pendingAllAmount" slot-scope="{record}"><b>{{ '￥'+record.pendingAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="payAllAmount" slot-scope="{record}"> <b>{{ '￥'+record.payAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥'+record.finishAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥'+record.sleepAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="rechargingCount" slot-scope="{record}"><b>{{ record.rechargingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="rechargingAllAmount" slot-scope="{record}"><b>{{ '￥'+record.rechargingAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitingMatchCount" slot-scope="{record}"><b>{{ record.waitingMatchCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitingMatchAllAmount" slot-scope="{record}"><b>{{ '￥'+record.waitingMatchAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="matchingCount" slot-scope="{record}"><b>{{ record.matchingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="matchingAllAmount" slot-scope="{record}"><b>{{ '￥'+record.matchingAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="nullifyCount" slot-scope="{record}"><b>{{ record.nullifyCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="nullifyAllAmount" slot-scope="{record}"><b>{{ '￥'+record.nullifyAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
    <hr/>
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" style="max-width:350px;min-width:300px">
              <a-range-picker
                @change="onCtripChange"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
              >
                <a-icon slot="suffixIcon" type="sync" />
              </a-range-picker>
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;margin-top: 4px">
              <a-button type="primary" icon="search" @click="queryCtripFunc" :loading="btnLoading">搜索</a-button>
              <!--              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>-->
            </span>
          </div>
        </a-form>
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }" />
        <a-descriptions title="携程任我行">
          <a-descriptions-item label="总订单金额">
            {{ '￥'+jd_currentStat.allOrderAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="支付中订单金额">
            {{ '￥'+jd_currentStat.allPayingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="完成订单金额">
            {{ '￥'+jd_currentStat.allFinishAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="充值中订单金额">
            {{ '￥'+jd_currentStat.allRechargingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{ '￥'+jd_currentStat.allReturnedAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理订单金额">
            {{ '￥'+jd_currentStat.allPendingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待匹配订单金额">
            {{ '￥'+jd_currentStat.allWaitingMatchAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="过期订单金额">
            {{ '￥'+jd_currentStat.allNullifyAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="匹配中订单金额">
            {{ '￥'+jd_currentStat.allMatchingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{ '￥'+jd_currentStat.allSleepAmount / 100 }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <JeepayTable
      @btnLoadClose="btnLoading=false"
      ref="ctripInfoTable"
      :initData="true"
      :showPage="false"
      :reqTableDataFunc="xc_reqTableDataFunc"
      :tableColumns="tableColumns"

      :scrollX="1100"
      rowKey="id"
    >
      <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥'+record.faceAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allAmount" slot-scope="{record}"><b>{{ '￥'+record.allAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="pendingCount" slot-scope="{record}"><b>{{ record.pendingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="pendingAllAmount" slot-scope="{record}"><b>{{ '￥'+record.pendingAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="payAllAmount" slot-scope="{record}"> <b>{{ '￥'+record.payAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥'+record.finishAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥'+record.sleepAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="rechargingCount" slot-scope="{record}"><b>{{ record.rechargingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="rechargingAllAmount" slot-scope="{record}"><b>{{ '￥'+record.rechargingAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitingMatchCount" slot-scope="{record}"><b>{{ record.waitingMatchCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="waitingMatchAllAmount" slot-scope="{record}"><b>{{ '￥'+record.waitingMatchAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="matchingCount" slot-scope="{record}"><b>{{ record.matchingCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="matchingAllAmount" slot-scope="{record}"><b>{{ '￥'+record.matchingAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="nullifyCount" slot-scope="{record}"><b>{{ record.nullifyCount }}</b></template> <!-- 自定义插槽 -->
      <template slot="nullifyAllAmount" slot-scope="{record}"><b>{{ '￥'+record.nullifyAllAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
    <hr/>
    <a-descriptions title="京东E卡-子核销订单资金统计"></a-descriptions>
    <JeepayTable
      @btnLoadClose="btnLoading=false"
      ref="jdChildInfoTable"
      :initData="true"
      :showPage="false"
      :reqTableDataFunc="jd_reqTableDataFunc_child"
      :tableColumns="tableColumns_child"
      :scrollX="1100"
      rowKey="id"
    >
      <template slot="queryFlag" slot-scope="{record}"> <b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
      <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥'+record.allOrderAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥'+record.allWaitAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥'+record.allFinishAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥'+record.allReturnedAmount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥'+record.allPayAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥'+record.allSleepAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allPayingAmount" slot-scope="{record}"><b>{{ '￥'+record.allPayingAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allRechargingAmount" slot-scope="{record}"><b>{{ '￥'+record.allRechargingAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
      <template slot="allWaitingMatchAmount" slot-scope="{record}"><b>{{ '￥'+record.allWaitingMatchAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allNullifyAmount" slot-scope="{record}"><b>{{ '￥'+record.allNullifyAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allMatchingAmount" slot-scope="{record}"><b>{{ '￥'+record.allMatchingAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
    <hr/>
    <a-descriptions title="携程任我行-子核销订单资金统计"></a-descriptions>
    <JeepayTable
      @btnLoadClose="btnLoading=false"
      ref="ctripChildInfoTable"
      :initData="true"
      :showPage="false"
      :reqTableDataFunc="xc_reqTableDataFunc_child"
      :tableColumns="tableColumns_child"
      :scrollX="1100"
      rowKey="id"
    >
      <template slot="queryFlag" slot-scope="{record}"> <b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
      <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥'+record.allOrderAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥'+record.allWaitAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥'+record.allFinishAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥'+record.allReturnedAmount }}</b></template> <!-- 自定义插槽 -->
      <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥'+record.allPayAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥'+record.allSleepAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allPayingAmount" slot-scope="{record}"><b>{{ '￥'+record.allPayingAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allRechargingAmount" slot-scope="{record}"><b>{{ '￥'+record.allRechargingAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
      <template slot="allWaitingMatchAmount" slot-scope="{record}"><b>{{ '￥'+record.allWaitingMatchAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allNullifyAmount" slot-scope="{record}"><b>{{ '￥'+record.allNullifyAmount / 100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="allMatchingAmount" slot-scope="{record}"><b>{{ '￥'+record.allMatchingAmount / 100 }}</b></template> <!-- 自定义插槽 -->
    </JeepayTable>
  </div>
</template>

<script>
import { xcstatByCurrentUser, jdstatByCurrentUser, jdoverallResellerCount, xcoverallResellerCount, orderFundOverallViewByChildReseller } from '@/api/manage'
  import JeepayTable from '@/components/JeepayTable/JeepayTable'
  import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
  import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import moment from 'moment'

  const tableColumns = [
    { key: 'faceAmount', width: '200px', title: '订单面值', scopedSlots: { customRender: 'faceAmount' } },
    { key: 'allCount', width: '200px', title: '订单总数', scopedSlots: { customRender: 'allCount' } },
    { key: 'allAmount', width: '200px', title: '订单总金额', scopedSlots: { customRender: 'allAmount' } },
    { key: 'pendingCount', width: '200px', title: '订单待处理总数', scopedSlots: { customRender: 'pendingCount' } },
    { key: 'pendingAllAmount', width: '200px', title: '订单待处理总金额', scopedSlots: { customRender: 'pendingAllAmount' } },
    { key: 'payingCount', width: '200px', title: '订单支付中总数', scopedSlots: { customRender: 'payingCount' } },
    { key: 'payAllAmount', width: '150px', title: '订单支付中总金额', scopedSlots: { customRender: 'payAllAmount' } },
    { key: 'finishCount', width: '150px', title: '订单完成数', scopedSlots: { customRender: 'finishCount' } },
    { key: 'finishAllAmount', width: '150px', title: '订单完成总金额', scopedSlots: { customRender: 'finishAllAmount' } },
    { key: 'sleepCount', width: '150px', title: '休眠订单总数', scopedSlots: { customRender: 'sleepCount' } },
    { key: 'sleepAllAmount', width: '150px', title: '休眠订单总金额', scopedSlots: { customRender: 'sleepAllAmount' } },
    { key: 'rechargingCount', width: '150px', title: '充值中订单数', scopedSlots: { customRender: 'rechargingCount' } },
    { key: 'rechargingAllAmount', width: '150px', title: '充值中订单金额', scopedSlots: { customRender: 'rechargingAllAmount' } },
    { key: 'waitingMatchAllAmount', width: '150px', title: '待匹配订单金额 ', scopedSlots: { customRender: 'waitingMatchAllAmount' } },
    { key: 'waitingMatchCount', width: '150px', title: '待匹配订单数', scopedSlots: { customRender: 'waitingMatchCount' } },
    { key: 'matchingCount', width: '150px', title: '匹配中订单数量', scopedSlots: { customRender: 'matchingCount' } },
    { key: 'matchingAllAmount', width: '150px', title: '匹配中订单总金额', scopedSlots: { customRender: 'matchingAllAmount' } },
    { key: 'nullifyCount', width: '150px', title: '过期订单数量', scopedSlots: { customRender: 'nullifyCount' } },
    { key: 'nullifyAllAmount', width: '150px', title: '过期订单金额 ', scopedSlots: { customRender: 'nullifyAllAmount' } }
  ]
  const tableColumnsChild = [
    { key: 'queryFlag', width: '200px', title: '子核销商名称', scopedSlots: { customRender: 'queryFlag' } },
    { key: 'allOrderAmount', width: '200px', title: '总订单金额', scopedSlots: { customRender: 'allOrderAmount' } },
    { key: 'allPendingAmount', width: '200px', title: '总待处理金额', scopedSlots: { customRender: 'allPendingAmount' } },
    { key: 'allFinishAmount', width: '200px', title: '总完成金额', scopedSlots: { customRender: 'allFinishAmount' } },
    { key: 'allReturnedAmount', width: '200px', title: '总回款金额', scopedSlots: { customRender: 'allReturnedAmount' } },
    { key: 'allPayingAmount', width: '200px', title: '总支付中金额', scopedSlots: { customRender: 'allPayingAmount' } },
    { key: 'allSleepAmount', width: '200px', title: '总休眠金额', scopedSlots: { customRender: 'allSleepAmount' } },
    { key: 'allRechargingAmount', width: '200px', title: '充值中订单金额', scopedSlots: { customRender: 'allRechargingAmount' } },
    { key: 'resellerNo', width: '200px', title: '核销商户号', scopedSlots: { customRender: 'resellerNo' } },
    { key: 'allWaitingMatchAmount', width: '200px', title: '待匹配订单金额', scopedSlots: { customRender: 'allWaitingMatchAmount' } },
    { key: 'allNullifyAmount', width: '200px', title: '过期订单金额', scopedSlots: { customRender: 'allNullifyAmount' } },
    { key: 'allMatchingAmount', width: '200px', title: '匹配中订单金额', scopedSlots: { customRender: 'allMatchingAmount' } }
  ]
  export default {
    components: { JeepayTable, JeepayTableColumns, JeepayTextUp },
    data () {
      return {
        skeletonIsShow: true, // 骨架屏是否显示
        skeletonReqNum: 0, // 当所有数据请求完毕后关闭骨架屏（共四个请求）
        tableColumns: tableColumns,
        tableColumns_child: tableColumnsChild,
        searchData: {},
        ctripSearchData: {},
        jd_currentStat: {
          allPayingAmount: 0,
          pendingAllAmount: 0,
          rechargingCount: 0,
          allRechargingAmount: 0,
          allPendingAmount: 0,
          allReturnedAmount: 0,
          waitingMatchAllAmount: 0,
          allWaitingMatchAmount: 0,
          allNullifyAmount: 0,
          allMatchingAmount: 0,
          allSleepAmount: 0,
          allCount: '',
          matchingCount: 0,
          matchingAllAmount: 0,
          faceAmount: 0,
          resellerNo: ''
        },
        xc_currentStat: {
          allPayingAmount: 0,
          pendingAllAmount: 0,
          rechargingCount: 0,
          allRechargingAmount: 0,
          allPendingAmount: 0,
          allReturnedAmount: 0,
          waitingMatchAllAmount: 0,
          allWaitingMatchAmount: 0,
          allNullifyAmount: 0,
          allMatchingAmount: 0,
          allSleepAmount: 0,
          allCount: '',
          matchingCount: 0,
          matchingAllAmount: 0,
          faceAmount: 0,
          resellerNo: ''
        }
      }
    },
    mounted () {
      this.xc_OverallView()
      this.jd_OverallView()
    },
    methods: {
      queryJdFunc () {
        this.btnLoading = true
        this.$refs.jdInfoTable.refTable(true)
        this.$refs.jdChildInfoTable.refTable(true)
        this.jd_OverallView()
      },
      queryCtripFunc () {
        this.btnLoading = true
        this.$refs.ctripInfoTable.refTable(true)
        this.$refs.ctripChildInfoTable.refTable(true)
        this.xc_OverallView()
      },
      // 请求table接口数据
      xc_reqTableDataFunc: function (params) {
        params = {
          productType: 'CTRIP',
          createdStart: this.ctripSearchData.createdStart,
          createdEnd: this.ctripSearchData.createdEnd
        }
        return jdoverallResellerCount(params)
      },
      // 请求table接口数据
      jd_reqTableDataFunc: function (params) {
        params = {
          productType: 'JD_E_CARD',
          createdStart: this.ctripSearchData.createdStart,
          createdEnd: this.ctripSearchData.createdEnd
        }
        return xcoverallResellerCount(params)
      },
      xc_reqTableDataFunc_child: function (params) {
        params = {
          productType: 'JD_E_CARD',
          createdStart: this.searchData.createdStart,
          createdEnd: this.searchData.createdEnd
        }
        return orderFundOverallViewByChildReseller(params)
      },
      // 请求table接口数据
      jd_reqTableDataFunc_child: function (params) {
        params = {
          productType: 'JD_E_CARD',
          createdStart: this.searchData.createdStart,
          createdEnd: this.searchData.createdEnd
        }
        return orderFundOverallViewByChildReseller(params)
      },
      disabledDate (current) { // 今日之后日期不可选
        return current && current > moment().endOf('day')
      },
      onChange (date, dateString) {
        this.searchData.createdStart = dateString[0] // 开始时间
        this.searchData.createdEnd = dateString[1] // 结束时间
      },
      onCtripChange (date, dateString) {
        this.ctripSearchData.createdStart = dateString[0] // 开始时间
        this.ctripSearchData.createdEnd = dateString[1] // 结束时间
      },
      jd_OverallView () {
        const that = this
        // 周总交易金额
        const params = {
          createdStart: this.searchData.createdStart,
          createdEnd: this.searchData.createdEnd,
          productType: 'JD_E_CARD'
        }
        jdstatByCurrentUser(params).then(res => {
          this.jd_currentStat.allPayingAmount = res.allPayingAmount
          this.jd_currentStat.allOrderAmount = res.allOrderAmount
          this.jd_currentStat.resellerName = res.resellerName
          this.jd_currentStat.allFinishAmount = res.allFinishAmount
          this.jd_currentStat.allRechargingAmount = res.allRechargingAmount
          this.jd_currentStat.resellerNo = res.resellerNo
          this.jd_currentStat.allReturnedAmount = res.allReturnedAmount
          this.jd_currentStat.allPendingAmount = res.allPendingAmount
          this.jd_currentStat.allWaitingMatchAmount = res.allWaitingMatchAmount
          this.jd_currentStat.allNullifyAmount = res.allNullifyAmount
          this.jd_currentStat.allPendingAmount = res.allPendingAmount
          this.jd_currentStat.allMatchingAmount = res.allMatchingAmount
          this.jd_currentStat.allSleepAmount = res.allSleepAmount
          this.skeletonClose()
        }).catch(err => {
          console.log(err)
          that.skeletonClose()
        })
      },
      xc_OverallView () {
        // 周总交易金额
        const that = this
        const paramsxc = {
          productType: 'CTRIP',
          createdStart: this.ctripSearchData.createdStart,
          createdEnd: this.ctripSearchData.createdEnd
        }
        xcstatByCurrentUser(paramsxc).then(res => {
          this.xc_currentStat.allPayingAmount = res.allPayingAmount
          this.xc_currentStat.allOrderAmount = res.allOrderAmount
          this.xc_currentStat.resellerName = res.resellerName
          this.xc_currentStat.allFinishAmount = res.allFinishAmount
          this.xc_currentStat.allRechargingAmount = res.allRechargingAmount
          this.xc_currentStat.resellerNo = res.resellerNo
          this.xc_currentStat.allReturnedAmount = res.allReturnedAmount
          this.xc_currentStat.allPendingAmount = res.allPendingAmount
          this.xc_currentStat.allWaitingMatchAmount = res.allWaitingMatchAmount
          this.xc_currentStat.allNullifyAmount = res.allNullifyAmount
          this.xc_currentStat.allPendingAmount = res.allPendingAmount
          this.xc_currentStat.allMatchingAmount = res.allMatchingAmount
          this.xc_currentStat.allSleepAmount = res.allSleepAmount
          this.skeletonClose()
        }).catch(err => {
          console.log(err)
          that.skeletonClose()
        })
      },
      skeletonClose () {
        // 每次请求成功，skeletonReqNum + 1,当大于等于4时， 取消骨架屏展示
        this.skeletonReqNum++
        this.skeletonReqNum >= 2 ? this.skeletonIsShow = false : this.skeletonIsShow = true
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
