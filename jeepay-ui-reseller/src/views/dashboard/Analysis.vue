<template>
  <div id="chart-card">
    <div class="chart-top">
      <div class="chart-item" style="background: white;">
        <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }" />
        <a-descriptions title="今日财务统计">
          <a-descriptions-item label="今日订单金额">
            {{'￥'+todayStat.allAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="今日回款金额">
            {{'￥'+todayStat.recoveriesAllAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="今日完成金额">
            {{'￥'+todayStat.finishedAllAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="今日待支付金额">
            {{'￥'+todayStat.waitAllAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="今日分润金额">
            {{'￥'+todayStat.shareAllAmount / 100}}
          </a-descriptions-item>
        </a-descriptions>
        <hr/>
        <a-descriptions title="总财务统计">
          <a-descriptions-item label="总订单金额">
            {{'￥'+allStat.allAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="总回款金额">
            {{'￥'+allStat.recoveriesAllAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="总完成金额">
            {{'￥'+allStat.finishedAllAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="总待支付金额">
            {{'￥'+allStat.waitAllAmount / 100}}
          </a-descriptions-item>
          <a-descriptions-item label="总分润金额">
            {{'￥'+allStat.shareAllAmount / 100}}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <!--      <div class="chart-item top-left">-->
      <!--        <div class="chart-data" style="position:relative">-->
      <!--          &lt;!&ndash; 骨架屏与图表有冲突，故不使用内嵌方式。 因为内边距的原因，采取v-if的方式 &ndash;&gt;-->
      <!--          <a-skeleton active :loading="true" v-if="skeletonIsShow" style="padding:20px" :paragraph="{ rows: 6 }" />-->
      <!--          <div v-show="!skeletonIsShow">-->
      <!--            <div class="analy-title" style="padding:20px;box-sizing:border-box;padding-bottom:10px">-->
      <!--              <span>今日订单金额：{{todayStat.allAmount}}</span>-->
      <!--              <span>总订单金额：{{allStat.allAmount}}</span>-->
      <!--            </div>-->
      <!--            <div class="analy-title" style="padding:20px;box-sizing:border-box;padding-bottom:10px">-->
      <!--              <span>今日回款金额：{{todayStat.recoveriesAllAmount}}</span>-->
      <!--              <span>总回款金额：{{allStat.recoveriesAllAmount}}</span>-->
      <!--            </div>-->
      <!--            <div class="analy-title" style="padding:20px;box-sizing:border-box;padding-bottom:10px">-->
      <!--              <span>今日完成金额：{{todayStat.finishedAllAmount}}</span>-->
      <!--              <span>总完成金额：{{allStat.finishedAllAmount}}</span>-->
      <!--            </div>-->
      <!--            <div class="analy-title" style="padding:20px;box-sizing:border-box;padding-bottom:10px">-->
      <!--              <span>今日待支付金额：{{todayStat.waitAllAmount}}</span>-->
      <!--              <span>总待支付金额：{{allStat.waitAllAmount}}</span>-->
      <!--            </div>-->
      <!--            <div class="analy-title" style="padding:20px;box-sizing:border-box;padding-bottom:10px">-->
      <!--              <span>今日分润金额：{{todayStat.shareAllAmount}}</span>-->
      <!--              <span>总分润金额：{{allStat.shareAllAmount}}</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
  </div>
</template>

<script>
  import { statByToday, statByAll } from '@/api/manage'
  export default {
    data () {
      return {
        skeletonIsShow: true, // 骨架屏是否显示
        skeletonReqNum: 0, // 当所有数据请求完毕后关闭骨架屏（共四个请求）
        todayStat: {
          allAmount: 0,
          recoveriesAllAmount: 0,
          finishedAllAmount: 0,
          waitAllAmount: 0,
          shareAllAmount: 0
        },
        allStat: {
          allAmount: 0,
          recoveriesAllAmount: 0,
          finishedAllAmount: 0,
          waitAllAmount: 0,
          shareAllAmount: 0
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        const that = this
        // 今日统计
        if (this.$access('ENT_RESELLER_MAIN_FUN_TODAY')) {
          // 周总交易金额
          statByToday().then(res => {
            this.todayStat.allAmount = res.allAmount
            this.todayStat.recoveriesAllAmount = res.recoveriesAllAmount
            this.todayStat.finishedAllAmount = res.finishedAllAmount
            this.todayStat.waitAllAmount = res.waitAllAmount
            this.todayStat.shareAllAmount = res.shareAllAmount
            that.skeletonClose(that)
          }).catch(err => {
            console.log(err)
            that.skeletonClose(that)
          })
        } else {
          this.ispayAmount = false
          that.skeletonClose(that)
        }
        // 总计
        if (this.$access('ENT_RESELLER_MAIN_FUN_ACCOUNT')) {
          // 周总交易金额
          statByAll().then(res => {
            this.allStat.allAmount = res.allAmount
            this.allStat.recoveriesAllAmount = res.recoveriesAllAmount
            this.allStat.finishedAllAmount = res.finishedAllAmount
            this.allStat.waitAllAmount = res.waitAllAmount
            this.allStat.shareAllAmount = res.shareAllAmount
            that.skeletonClose(that)
          }).catch(err => {
            console.log(err)
            that.skeletonClose(that)
          })
        } else {
          this.ispayAmount = false
          that.skeletonClose(that)
        }
      },
      // getUserInfo () {
      //   const that = this
      //   getMainUserInfo().then(res => {
      //     that.userInfo = res
      //   })
      // },
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
