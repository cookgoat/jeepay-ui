<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'核销订单详情'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
    class="drawer-width"

  >
    <a-form-model v-if="visible" ref="infoFormModel" :model="detailData" layout="vertical">
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="ID">
              {{ detailData.id }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="订单号">
              <a-tag color="purple">
              {{ detailData.orderNo }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="订单金额">
              <a-tag color="green">
              {{ detailData.amount/100 }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions v-if="detailData.chargeAccountType === 'MOBILE'">
            <a-descriptions-item label="商户类型">
              {{ '手机号' }}
            </a-descriptions-item>
          </a-descriptions>
          <a-descriptions v-if="detailData.chargeAccountType === 'PLATFORM_ACCOUNT'">
            <a-descriptions-item label="商户类型">
              {{ '他方平台账号' }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="充值账号">
              {{ detailData.chargeAccount }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions v-if="detailData.productType === 'JD_E_CARD'">
            <a-descriptions-item label="充值产品类型">
              {{ '京东E卡' }}
            </a-descriptions-item>
          </a-descriptions>
          <a-descriptions v-if="detailData.productType === 'CTRIP'">
            <a-descriptions-item label="充值产品类型">
              {{ '携程任我行' }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="核销商id">
              {{ detailData.resellerId }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="平台支付订单号">
              {{ detailData.matchOutTradeNo }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="查询标志">
              {{ detailData.queryFlag }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="开始支付时间">
              {{ detailData.gmtPayingStart }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

      </a-row>
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="订单状态">

              <a-tag :color="detailData.orderStatus === 'PAYING'?'blue':detailData.orderStatus === 'WAITING_PAY'?'orange':detailData.orderStatus === 'FINISH'?'green':'volcano'">
                {{ detailData.orderStatus === 'PAYING'?'支付中':detailData.orderStatus === 'WAITING_PAY'?'待支付':detailData.orderStatus === 'FINISH'?'支付成功':'未知' }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="创建时间">
              {{ detailData.gmtCreate }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="更新时间">
              {{ detailData.gmtUpdate }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-form-model>
  </a-drawer>
</template>

<script>
import { API_URL_RESELLER_ORDER_LIST, req } from '@/api/manage'
export default {

  props: {
    callbackFunc: { type: Function }
  },

  data () {
    return {
      btnLoading: false,
      detailData: {}, // 数据对象
      recordId: null, // 更新对象ID
      visible: false // 是否显示弹层/抽屉
    }
  },
  created () {
  },
  methods: {
    show: function (recordId) { // 弹层打开事件
      console.log(recordId)
      if (this.$refs.infoFormModel !== undefined) {
        this.$refs.infoFormModel.resetFields()
      }
      const that = this
      console.log(555)
      that.resetIsShow = true // 展示重置密码板块
      that.recordId = recordId
      req.getById(API_URL_RESELLER_ORDER_LIST, recordId).then(res => {
        that.detailData = res
      })
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    }
  }
}
</script>
<style lang="less">
  .typePopover {
    position: absolute;
    top: 0;
    left:62px;
  }
</style>
