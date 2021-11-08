<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'渠道订单详情'"
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
            <a-descriptions-item label="业务类型">
              <span v-if="detailData.bizType == 'PROPERTY_CREDIT'">
                {{ '资和信' }}
              </span>

            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="小号id">
              {{ detailData.pretenderAccountId }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="支付方式">
              <a-tag :color="detailData.payWay === 'ALI_WAP'?'green':detailData.payWay === 'WX_H5'?'orange':'volcano'">
                {{ detailData.payWay === 'ALI_WAP'?'支付宝网页':detailData.payWay === 'WX_H5'?'微信H5':'未知' }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="订单号">
              {{ detailData.outTradeNo }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-col :span="10">
            <a-descriptions>
              <a-descriptions-item label="金额">
                {{ detailData.amount/100 }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>

        </a-col>

      </a-row>
      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="状态">

              <a-tag :color="detailData.status === 'PAYING'?'blue':detailData.status === 'OVER_TIME'?'orange':detailData.status === 'FINISH'?'green':'volcano'">
                {{ detailData.status === 'PAYING'?'支付中':detailData.status === 'OVER_TIME'?'超时':detailData.status === 'FINISH'?'完成支付':'未知' }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="伪装小号ID">
              {{ detailData.pretenderAccountId }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="扩展字段">
              {{ detailData.ext }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="核销商订单">
              {{ detailData.matchResellerOrderNo }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

      </a-row>

      <a-row justify="space-between" type="flex">

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

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label=" 过期时间">
              {{ detailData.gmtExpired }}
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
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="回调时间">
              {{ detailData.gmtNotify }}
            </a-descriptions-item>
          </a-descriptions>

        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="40">
          <a-descriptions>
            <a-descriptions-item label="生成的URL连接">
              {{ detailData.payUrl }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

    </a-form-model>
  </a-drawer>
</template>

<script>
import { API_URL_PRETENDER_ORDER_LIST, req } from '@/api/manage'
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
      req.getById(API_URL_PRETENDER_ORDER_LIST, recordId).then(res => {
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
