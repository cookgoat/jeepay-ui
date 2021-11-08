<template>
  <div id="chart-card">
<!--    京东E卡-->
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" style="max-width:350px;min-width:300px">
              <a-range-picker
                  @change="onChange"
                  format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  v-model="jdDate"
              >
                <a-icon slot="suffixIcon" type="sync"/>
              </a-range-picker>
            </a-form-item>
            <a-form-item label="核销商">
              <a-select @change="selectJdOnChange" style="width: 150px;" placeholder="请选择核销商">
                <a-select-option v-for="(i, index) in reSellerList" :key="index" :value="i.resellerNo">{{
                    i.resellerName
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;margin-top: 4px">
              <a-button type="primary" icon="search" @click="queryJdFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="resetFormData('jd')">重置</a-button>
            </span>
          </div>
        </a-form>
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }"/>
        <a-descriptions title="京东E卡">
          <a-descriptions-item label="总订单金额">
            {{ '￥' + jd_currentStat.allOrderAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="支付中订单金额">
            {{ '￥' + jd_currentStat.allPayingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="完成订单金额">
            {{ '￥' + jd_currentStat.allFinishAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="充值中订单金额">
            {{ '￥' + jd_currentStat.allRechargingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{ '￥' + jd_currentStat.allReturnedAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理订单金额">
            {{ '￥' + jd_currentStat.allPendingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待匹配订单金额">
            {{ '￥' + jd_currentStat.allWaitingMatchAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="过期订单金额">
            {{ '￥' + jd_currentStat.allNullifyAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="匹配中订单金额">
            {{ '￥' + jd_currentStat.allMatchingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{ '￥' + jd_currentStat.allSleepAmount / 100 }}
          </a-descriptions-item>
        </a-descriptions>
        <JeepayTable
            @btnLoadClose="btnLoading=false"
            ref="jdInfoTable"
            :initData="true"
            :showPage="false"
            :reqTableDataFunc="jd_reqTableDataFunc"
            :tableColumns="tableColumns"
            :searchData="jdSearchData"
            :scrollX="1100"
            rowKey="id"
        >
          <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥' + record.faceAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="allAmount" slot-scope="{record}"><b>{{ '￥' + record.allAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="pendingCount" slot-scope="{record}"><b>{{ record.pendingCount / 100 }}</b></template> <!-- 自定义插槽 -->
          <template slot="pendingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.pendingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="payAllAmount" slot-scope="{record}"><b>{{ '￥' + record.payAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥' + record.finishAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥' + record.sleepAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingCount" slot-scope="{record}"><b>{{ record.rechargingCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.rechargingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="waitingMatchCount" slot-scope="{record}"><b>{{ record.waitingMatchCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="waitingMatchAllAmount" slot-scope="{record}"><b>{{ '￥' + record.waitingMatchAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="matchingCount" slot-scope="{record}"><b>{{ record.matchingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="matchingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.matchingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="nullifyCount" slot-scope="{record}"><b>{{ record.nullifyCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="nullifyAllAmount" slot-scope="{record}"><b>{{ '￥' + record.nullifyAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
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
          <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
          <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥' + record.allOrderAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPendingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPendingAmount / 100 }}</b></template>

          <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥' + record.allFinishAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥' + record.allReturnedAmount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥' + record.allSleepAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayingAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allRechargingAmount" slot-scope="{record}"><b>{{ '￥' + record.allRechargingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
          <template slot="allWaitingMatchAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitingMatchAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allNullifyAmount" slot-scope="{record}"><b>{{ '￥' + record.allNullifyAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allMatchingAmount" slot-scope="{record}"><b>{{ '￥' + record.allMatchingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
        </JeepayTable>
      </div>
    </div>
<!--    携程-->
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" style="max-width:350px;min-width:300px">
              <a-range-picker
                  @change="onCtripChange"
                  format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  v-model="ctripDate"
              >
                <a-icon slot="suffixIcon" type="sync"/>
              </a-range-picker>
            </a-form-item>
            <a-form-item>
              <a-select style="width: 150px;" @change="selectXcOnChange" placeholder="请选择核销商">
                <a-select-option v-for="(item, index) in reSellerList" :key="index" :value="item.resellerNo">
                  {{ item.resellerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;margin-top: 4px">
              <a-button type="primary" icon="search" @click="queryCtripFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="resetFormData('ctrip')">重置</a-button>
            </span>
          </div>
        </a-form>
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }"/>
        <a-descriptions title="携程任我行">
          <a-descriptions-item label="总订单金额">
            {{ '￥' + jd_currentStat.allOrderAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="支付中订单金额">
            {{ '￥' + jd_currentStat.allPayingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="完成订单金额">
            {{ '￥' + jd_currentStat.allFinishAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="充值中订单金额">
            {{ '￥' + jd_currentStat.allRechargingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{ '￥' + jd_currentStat.allReturnedAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理订单金额">
            {{ '￥' + jd_currentStat.allPendingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待匹配订单金额">
            {{ '￥' + jd_currentStat.allWaitingMatchAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="过期订单金额">
            {{ '￥' + jd_currentStat.allNullifyAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="匹配中订单金额">
            {{ '￥' + jd_currentStat.allMatchingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{ '￥' + jd_currentStat.allSleepAmount / 100 }}
          </a-descriptions-item>
        </a-descriptions>
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
          <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥' + record.faceAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="allAmount" slot-scope="{record}"><b>{{ '￥' + record.allAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="pendingCount" slot-scope="{record}"><b>{{ record.pendingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="pendingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.pendingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="payAllAmount" slot-scope="{record}"><b>{{ '￥' + record.payAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥' + record.finishAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥' + record.sleepAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingCount" slot-scope="{record}"><b>{{ record.rechargingCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.rechargingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="waitingMatchCount" slot-scope="{record}"><b>{{ record.waitingMatchCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="waitingMatchAllAmount" slot-scope="{record}"><b>{{ '￥' + record.waitingMatchAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="matchingCount" slot-scope="{record}"><b>{{ record.matchingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="matchingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.matchingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="nullifyCount" slot-scope="{record}"><b>{{ record.nullifyCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="nullifyAllAmount" slot-scope="{record}"><b>{{ '￥' + record.nullifyAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
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
          <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
          <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥' + record.allOrderAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPendingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPendingAmount / 100 }}</b></template>

          <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥' + record.allFinishAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥' + record.allReturnedAmount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥' + record.allSleepAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayingAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allRechargingAmount" slot-scope="{record}"><b>{{ '￥' + record.allRechargingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
          <template slot="allWaitingMatchAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitingMatchAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allNullifyAmount" slot-scope="{record}"><b>{{ '￥' + record.allNullifyAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allMatchingAmount" slot-scope="{record}"><b>{{ '￥' + record.allMatchingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
        </JeepayTable>
      </div>
    </div>

<!--    中石化-->
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" style="max-width:350px;min-width:300px">
              <a-range-picker
                  @change="onSINOPECChange"
                  format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  v-model="SINOPECDate"
              >
                <a-icon slot="suffixIcon" type="sync"/>
              </a-range-picker>
            </a-form-item>
            <a-form-item>
              <a-select style="width: 150px;" @change="selectSINOPECOnChange" placeholder="请选择核销商">
                <a-select-option v-for="(item, index) in reSellerList" :key="index" :value="item.resellerNo">
                  {{ item.resellerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;margin-top: 4px">
              <a-button type="primary" icon="search" @click="querySINOPECFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="resetFormData('SINOPEC')">重置</a-button>
            </span>
          </div>
        </a-form>
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }"/>
        <a-descriptions title="中石化">
          <a-descriptions-item label="总订单金额">
            {{ '￥' + jd_currentStat.allOrderAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="支付中订单金额">
            {{ '￥' + jd_currentStat.allPayingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="完成订单金额">
            {{ '￥' + jd_currentStat.allFinishAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="充值中订单金额">
            {{ '￥' + jd_currentStat.allRechargingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{ '￥' + jd_currentStat.allReturnedAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理订单金额">
            {{ '￥' + jd_currentStat.allPendingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待匹配订单金额">
            {{ '￥' + jd_currentStat.allWaitingMatchAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="过期订单金额">
            {{ '￥' + jd_currentStat.allNullifyAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="匹配中订单金额">
            {{ '￥' + jd_currentStat.allMatchingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{ '￥' + jd_currentStat.allSleepAmount / 100 }}
          </a-descriptions-item>
        </a-descriptions>
        <JeepayTable
            @btnLoadClose="btnLoading=false"
            ref="SINOPECInfoTable"
            :initData="true"
            :showPage="false"
            :reqTableDataFunc="SINOPECReqTableDataFunc"
            :tableColumns="tableColumns"

            :scrollX="1100"
            rowKey="id"
        >
          <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥' + record.faceAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="allAmount" slot-scope="{record}"><b>{{ '￥' + record.allAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="pendingCount" slot-scope="{record}"><b>{{ record.pendingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="pendingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.pendingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="payAllAmount" slot-scope="{record}"><b>{{ '￥' + record.payAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥' + record.finishAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥' + record.sleepAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingCount" slot-scope="{record}"><b>{{ record.rechargingCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.rechargingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="waitingMatchCount" slot-scope="{record}"><b>{{ record.waitingMatchCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="waitingMatchAllAmount" slot-scope="{record}"><b>{{ '￥' + record.waitingMatchAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="matchingCount" slot-scope="{record}"><b>{{ record.matchingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="matchingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.matchingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="nullifyCount" slot-scope="{record}"><b>{{ record.nullifyCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="nullifyAllAmount" slot-scope="{record}"><b>{{ '￥' + record.nullifyAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
        </JeepayTable>
        <hr/>
        <a-descriptions title="中石化-子核销订单资金统计"></a-descriptions>
        <JeepayTable
            @btnLoadClose="btnLoading=false"
            ref="SINOPECChildInfoTable"
            :initData="true"
            :showPage="false"
            :reqTableDataFunc="SINOPECReqTableDataFunc_child"
            :tableColumns="tableColumns_child"
            :scrollX="1100"
            rowKey="id"
        >
          <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
          <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥' + record.allOrderAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPendingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPendingAmount / 100 }}</b></template>

          <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥' + record.allFinishAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥' + record.allReturnedAmount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥' + record.allSleepAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayingAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allRechargingAmount" slot-scope="{record}"><b>{{ '￥' + record.allRechargingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
          <template slot="allWaitingMatchAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitingMatchAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allNullifyAmount" slot-scope="{record}"><b>{{ '￥' + record.allNullifyAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allMatchingAmount" slot-scope="{record}"><b>{{ '￥' + record.allMatchingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
        </JeepayTable>
      </div>
    </div>
<!--    中石油-->
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" style="max-width:350px;min-width:300px">
              <a-range-picker
                  @change="onPETROChange"
                  format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  v-model="PETRODate"
              >
                <a-icon slot="suffixIcon" type="sync"/>
              </a-range-picker>
            </a-form-item>
            <a-form-item>
              <a-select style="width: 150px;" @change="selectPETROOnChange" placeholder="请选择核销商">
                <a-select-option v-for="(item, index) in reSellerList" :key="index" :value="item.resellerNo">
                  {{ item.resellerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <span class="table-page-search-submitButtons" style="margin-left: 20px;margin-top: 4px">
              <a-button type="primary" icon="search" @click="queryPETROFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="resetFormData('PETRO')">重置</a-button>
            </span>
          </div>
        </a-form>
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }"/>
        <a-descriptions title="中石油">
          <a-descriptions-item label="总订单金额">
            {{ '￥' + jd_currentStat.allOrderAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="支付中订单金额">
            {{ '￥' + jd_currentStat.allPayingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="完成订单金额">
            {{ '￥' + jd_currentStat.allFinishAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="充值中订单金额">
            {{ '￥' + jd_currentStat.allRechargingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="回款金额">
            {{ '￥' + jd_currentStat.allReturnedAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理订单金额">
            {{ '￥' + jd_currentStat.allPendingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="待匹配订单金额">
            {{ '￥' + jd_currentStat.allWaitingMatchAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="过期订单金额">
            {{ '￥' + jd_currentStat.allNullifyAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="匹配中订单金额">
            {{ '￥' + jd_currentStat.allMatchingAmount / 100 }}
          </a-descriptions-item>
          <a-descriptions-item label="休眠订单金额">
            {{ '￥' + jd_currentStat.allSleepAmount / 100 }}
          </a-descriptions-item>
        </a-descriptions>
        <JeepayTable
            @btnLoadClose="btnLoading=false"
            ref="PETROInfoTable"
            :initData="true"
            :showPage="false"
            :reqTableDataFunc="PETROReqTableDataFunc"
            :tableColumns="tableColumns"

            :scrollX="1100"
            rowKey="id"
        >
          <template slot="faceAmount" slot-scope="{record}"><b>{{ '￥' + record.faceAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allCount" slot-scope="{record}"><b>{{ record.allCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="allAmount" slot-scope="{record}"><b>{{ '￥' + record.allAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="pendingCount" slot-scope="{record}"><b>{{ record.pendingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="pendingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.pendingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="payingCount" slot-scope="{record}"><b>{{ record.payingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="payAllAmount" slot-scope="{record}"><b>{{ '￥' + record.payAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="finishAllAmount" slot-scope="{record}"><b>{{ '￥' + record.finishAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="sleepCount" slot-scope="{record}"><b>{{ record.sleepCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="sleepAllAmount" slot-scope="{record}"><b>{{ '￥' + record.sleepAllAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingCount" slot-scope="{record}"><b>{{ record.rechargingCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="rechargingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.rechargingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="waitingMatchCount" slot-scope="{record}"><b>{{ record.waitingMatchCount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="waitingMatchAllAmount" slot-scope="{record}"><b>{{ '￥' + record.waitingMatchAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="matchingCount" slot-scope="{record}"><b>{{ record.matchingCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="matchingAllAmount" slot-scope="{record}"><b>{{ '￥' + record.matchingAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="nullifyCount" slot-scope="{record}"><b>{{ record.nullifyCount }}</b></template> <!-- 自定义插槽 -->
          <template slot="nullifyAllAmount" slot-scope="{record}"><b>{{ '￥' + record.nullifyAllAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
        </JeepayTable>
        <hr/>
        <a-descriptions title="中石油-子核销订单资金统计"></a-descriptions>
        <JeepayTable
            @btnLoadClose="btnLoading=false"
            ref="PETROChildInfoTable"
            :initData="true"
            :showPage="false"
            :reqTableDataFunc="PETROReqTableDataFunc_child"
            :tableColumns="tableColumns_child"
            :scrollX="1100"
            rowKey="id"
        >
          <template slot="queryFlag" slot-scope="{record}"><b>{{ record.queryFlag }}</b></template> <!-- 自定义插槽 -->
          <template slot="allOrderAmount" slot-scope="{record}"><b>{{ '￥' + record.allOrderAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPendingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPendingAmount / 100 }}</b></template>

          <template slot="allWaitAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allFinishAmount" slot-scope="{record}"><b>{{ '￥' + record.allFinishAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allReturnedAmount" slot-scope="{record}"><b>{{ '￥' + record.allReturnedAmount }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allSleepAmount" slot-scope="{record}"><b>{{ '￥' + record.allSleepAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allPayingAmount" slot-scope="{record}"><b>{{ '￥' + record.allPayingAmount / 100 }}</b></template>
          <!-- 自定义插槽 -->
          <template slot="allRechargingAmount" slot-scope="{record}"><b>{{ '￥' + record.allRechargingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
          <template slot="allWaitingMatchAmount" slot-scope="{record}"><b>{{ '￥' + record.allWaitingMatchAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allNullifyAmount" slot-scope="{record}"><b>{{ '￥' + record.allNullifyAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
          <template slot="allMatchingAmount" slot-scope="{record}"><b>{{ '￥' + record.allMatchingAmount / 100 }}</b>
          </template> <!-- 自定义插槽 -->
        </JeepayTable>
      </div>
    </div>
  </div>
</template>

<script>
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import moment from 'moment'
import { getChildOrderData, getOrderOverallResellerCount, homeData } from '../../api/home'
import { accountList } from '../../api/account'

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
  {
    key: 'rechargingAllAmount',
    width: '150px',
    title: '充值中订单金额',
    scopedSlots: { customRender: 'rechargingAllAmount' }
  },
  {
    key: 'waitingMatchAllAmount',
    width: '150px',
    title: '待匹配订单金额 ',
    scopedSlots: { customRender: 'waitingMatchAllAmount' }
  },
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
  {
    key: 'allRechargingAmount',
    width: '200px',
    title: '充值中订单金额',
    scopedSlots: { customRender: 'allRechargingAmount' }
  },
  { key: 'resellerNo', width: '200px', title: '核销商户号', scopedSlots: { customRender: 'resellerNo' } },
  {
    key: 'allWaitingMatchAmount',
    width: '200px',
    title: '待匹配订单金额',
    scopedSlots: { customRender: 'allWaitingMatchAmount' }
  },
  { key: 'allNullifyAmount', width: '200px', title: '过期订单金额', scopedSlots: { customRender: 'allNullifyAmount' } },
  { key: 'allMatchingAmount', width: '200px', title: '匹配中订单金额', scopedSlots: { customRender: 'allMatchingAmount' } }
]
export default {
  name: 'ResellerDetailGroup',
  components: { JeepayTable, JeepayTableColumns, JeepayTextUp },
  data () {
    return {
      skeletonIsShow: true, // 骨架屏是否显示
      skeletonReqNum: 0, // 当所有数据请求完毕后关闭骨架屏（共四个请求）
      tableColumns: tableColumns,
      tableColumns_child: tableColumnsChild,
      jdSearchData: {},
      ctripSearchData: {},
      SINOPECSearchData: {},
      PETROSearchData: {},
      jd_currentStat: {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      },
      xc_currentStat: {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      },
      PETROCurrentStat: {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      },
      SINOPECCurrentStat: {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      },
      btnLoading: false,
      reSellerList: [],
      formJDResellerNo: '',
      formXcResellNo: '',
      formSINOPECResellerNo: '',
      formPETROResellerNo: '',
      jdDate: [],
      ctripDate: [],
      SINOPECDate: [],
      PETRODate: []
    }
  },
  mounted () {
    this.getReSeller()
    this.xc_OverallView()
    this.jd_OverallView()
    this.SINOPECOverallView()
    this.PETROOverallView()
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

    selectJdOnChange (value) {
      this.formJDResellerNo = value
    },
    selectXcOnChange (value) {
      this.formXcResellNo = value
    },
    selectSINOPECOnChange (value) {
      this.formSINOPECResellerNo = value
    },
    selectPETROOnChange (value) {
      this.formPETROResellerNo = value
    },
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

    querySINOPECFunc () {
      this.btnLoading = true
      this.$refs.SINOPECInfoTable.refTable(true)
      this.$refs.SINOPECChildInfoTable.refTable(true)
      this.SINOPECOverallView()
    },

    queryPETROFunc () {
      this.btnLoading = true
      this.$refs.PETROInfoTable.refTable(true)
      this.$refs.PETROChildInfoTable.refTable(true)
      this.PETROOverallView()
    },

    // 重置表单
    resetFormData (type) {
      if (type === 'jd') {
        this.jdSearchData = {}
        this.jdDate = []
        this.queryJdFunc()
      } else if (type === 'ctrip') {
        this.ctripSearchData = {}
        this.ctripDate = []
        this.queryCtripFunc()
      } else if (type === 'SINOPEC') {
        this.SINOPECSearchData = {}
        this.SINOPECDate = []
        this.querySINOPECFunc()
      } else {
        this.PETROSearchData = {}
        this.PETRODate = []
        this.queryPETROFunc()
      }
    },

    // 请求table接口数据
    xc_reqTableDataFunc: function (params) {
      params = {
        productType: 'CTRIP',
        createdStart: this.ctripSearchData.createdStart,
        createdEnd: this.ctripSearchData.createdEnd,
        resellerNo: this.formXcResellNo
      }
      return getOrderOverallResellerCount(params)
    },
    // 请求table接口数据
    jd_reqTableDataFunc: function (params) {
      params = {
        productType: 'JD_E_CARD',
        createdStart: this.jdSearchData.createdStart,
        createdEnd: this.jdSearchData.createdEnd,
        resellerNo: this.formJDResellerNo
      }
      return getOrderOverallResellerCount(params)
    },

    SINOPECReqTableDataFunc (params) {
      params = {
        productType: 'SINOPEC',
        createdStart: this.SINOPECSearchData.createdStart,
        createdEnd: this.SINOPECSearchData.createdEnd,
        resellerNo: this.formSINOPECResellerNo
      }
      return getOrderOverallResellerCount(params)
    },

    PETROReqTableDataFunc (params) {
      params = {
        productType: 'PETRO',
        createdStart: this.PETROSearchData.createdStart,
        createdEnd: this.PETROSearchData.createdEnd,
        resellerNo: this.formPETROResellerNo
      }
      return getOrderOverallResellerCount(params)
    },

    xc_reqTableDataFunc_child: function (params) {
      params = {
        productType: 'JD_E_CARD',
        createdStart: this.ctripSearchData.createdStart,
        createdEnd: this.ctripSearchData.createdEnd,
        resellerNo: this.formXcResellNo
      }
      return getChildOrderData(params)
    },
    // 请求table接口数据
    jd_reqTableDataFunc_child: function (params) {
      params = {
        productType: 'JD_E_CARD',
        createdStart: this.jdSearchData.createdStart,
        createdEnd: this.jdSearchData.createdEnd,
        resellerNo: this.formJDResellerNo
      }
      return getChildOrderData(params)
    },

    SINOPECReqTableDataFunc_child (params) {
      params = {
        productType: 'SINOPEC',
        createdStart: this.SINOPECSearchData.createdStart,
        createdEnd: this.SINOPECSearchData.createdEnd,
        resellerNo: this.formSINOPECResellerNo
      }
      return getChildOrderData(params)
    },

    PETROReqTableDataFunc_child (params) {
      params = {
        productType: 'PETRO',
        createdStart: this.PETROSearchData.createdStart,
        createdEnd: this.PETROSearchData.createdEnd,
        resellerNo: this.formJPETROResellerNo
      }
      return getChildOrderData(params)
    },

    disabledDate (current) { // 今日之后日期不可选
      return current && current > moment().endOf('day')
    },

    onChange (date, dateString) {
      this.jdSearchData.createdStart = dateString[0] // 开始时间
      this.jdSearchData.createdEnd = dateString[1] // 结束时间
    },

    onCtripChange (date, dateString) {
      this.ctripSearchData.createdStart = dateString[0] // 开始时间
      this.ctripSearchData.createdEnd = dateString[1] // 结束时间
    },

    onSINOPECChange (date, dateString) {
      this.SINOPECSearchData.createdStart = dateString[0]
      this.SINOPECSearchData.createdEnd = dateString[1]
    },

    onPETROChange (date, dateString) {
      this.PETROSearchData.createdStart = dateString[0]
      this.PETROSearchData.createdEnd = dateString[1]
    },

    jd_OverallView () {
      const that = this
      // 周总交易金额
      const params = {
        createdStart: this.jdSearchData.createdStart,
        createdEnd: this.jdSearchData.createdEnd,
        productType: 'JD_E_CARD',
        resellerNo: this.formJDResellerNo
      }
      this.jd_currentStat = {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      }
      homeData(params).then(res => {
        if (res.records && res.records.length) {
          res.records.forEach(item => {
            this.jd_currentStat.allPayingAmount += item.allPayingAmount
            this.jd_currentStat.allOrderAmount += item.allOrderAmount
            this.jd_currentStat.allFinishAmount += item.allFinishAmount
            this.jd_currentStat.allRechargingAmount += item.allRechargingAmount
            this.jd_currentStat.allReturnedAmount += item.allReturnedAmount
            this.jd_currentStat.allPendingAmount += item.allPendingAmount
            this.jd_currentStat.allWaitingMatchAmount += item.allWaitingMatchAmount
            this.jd_currentStat.allNullifyAmount += item.allNullifyAmount
            this.jd_currentStat.allMatchingAmount += item.allMatchingAmount
            this.jd_currentStat.allSleepAmount += item.allSleepAmount
          })
        }
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
        createdEnd: this.ctripSearchData.createdEnd,
        resellerNo: this.formXcResellNo
      }
      this.xc_currentStat = {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      }
      homeData(paramsxc).then(res => {
        if (res.records && res.records.length) {
          res.records.forEach(item => {
            this.xc_currentStat.allPayingAmount += item.allPayingAmount
            this.xc_currentStat.allOrderAmount += item.allOrderAmount
            this.xc_currentStat.allFinishAmount += item.allFinishAmount
            this.xc_currentStat.allRechargingAmount += item.allRechargingAmount
            this.xc_currentStat.allReturnedAmount += item.allReturnedAmount
            this.xc_currentStat.allPendingAmount += item.allPendingAmount
            this.xc_currentStat.allWaitingMatchAmount += item.allWaitingMatchAmount
            this.xc_currentStat.allNullifyAmount += item.allNullifyAmount
            this.xc_currentStat.allMatchingAmount += item.allMatchingAmount
            this.xc_currentStat.allSleepAmount += item.allSleepAmount
          })
        }
        this.skeletonClose()
      }).catch(err => {
        console.log(err)
        that.skeletonClose()
      })
    },

    SINOPECOverallView () {
      // 周总交易金额
      const that = this
      const paramsxc = {
        productType: 'SINOPEC',
        createdStart: this.SINOPECSearchData.createdStart,
        createdEnd: this.SINOPECSearchData.createdEnd,
        resellerNo: this.formSINOPECResellerNo
      }
      this.SINOPECCurrentStat = {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      }
      homeData(paramsxc).then(res => {
        if (res.records && res.records.length) {
          res.records.forEach(item => {
            this.SINOPECCurrentStat.allPayingAmount += item.allPayingAmount
            this.SINOPECCurrentStat.allOrderAmount += item.allOrderAmount
            this.SINOPECCurrentStat.allFinishAmount += item.allFinishAmount
            this.SINOPECCurrentStat.allRechargingAmount += item.allRechargingAmount
            this.SINOPECCurrentStat.allReturnedAmount += item.allReturnedAmount
            this.SINOPECCurrentStat.allPendingAmount += item.allPendingAmount
            this.SINOPECCurrentStat.allWaitingMatchAmount += item.allWaitingMatchAmount
            this.SINOPECCurrentStat.allNullifyAmount += item.allNullifyAmount
            this.SINOPECCurrentStat.allMatchingAmount += item.allMatchingAmount
            this.SINOPECCurrentStat.allSleepAmount += item.allSleepAmount
          })
        }
        this.skeletonClose()
      }).catch(err => {
        console.log(err)
        that.skeletonClose()
      })
    },

    PETROOverallView () {
      // 周总交易金额
      const that = this
      const paramsxc = {
        productType: 'PETRO',
        createdStart: this.PETROSearchData.createdStart,
        createdEnd: this.PETROSearchData.createdEnd,
        resellerNo: this.formPETROResellerNo
      }
      this.PETROCurrentStat = {
        allPayingAmount: 0,
        allOrderAmount: 0,
        allFinishAmount: 0,
        allRechargingAmount: 0,
        allReturnedAmount: 0,
        allPendingAmount: 0,
        allWaitingMatchAmount: 0,
        allNullifyAmount: 0,
        allMatchingAmount: 0,
        allSleepAmount: 0
      }
      homeData(paramsxc).then(res => {
        if (res.records && res.records.length) {
          res.records.forEach(item => {
            this.PETROCurrentStat.allPayingAmount += item.allPayingAmount
            this.PETROCurrentStat.allOrderAmount += item.allOrderAmount
            this.PETROCurrentStat.allFinishAmount += item.allFinishAmount
            this.PETROCurrentStat.allRechargingAmount += item.allRechargingAmount
            this.PETROCurrentStat.allReturnedAmount += item.allReturnedAmount
            this.PETROCurrentStat.allPendingAmount += item.allPendingAmount
            this.PETROCurrentStat.allWaitingMatchAmount += item.allWaitingMatchAmount
            this.PETROCurrentStat.allNullifyAmount += item.allNullifyAmount
            this.PETROCurrentStat.allMatchingAmount += item.allMatchingAmount
            this.PETROCurrentStat.allSleepAmount += item.allSleepAmount
          })
        }
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
@import '../dashboard/index.less'; // 响应式布局
.chart-top {
  margin-bottom: 10px !important;
  border-radius: 5px;
  .chart-item {
    border-radius: 10px;
  }
}
</style>
