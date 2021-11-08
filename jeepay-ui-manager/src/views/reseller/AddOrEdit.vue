<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'修改订单'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
    class="drawer-width"

  >
    <a-form-model v-if="visible" ref="infoFormModel" :model="saveObject" layout="vertical" :rules="rules">
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="订单号" prop="orderNo">
            <a-input
              placeholder="请输入订单号"
              v-model="saveObject.orderNo"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="订单金额" prop="amount">
            <a-input
              placeholder="请输入订单金额"
              v-model="saveObject.amount"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="充值账号" prop="chargeAccount">
            <a-input
              placeholder="请输入充值账号"
              v-model="saveObject.chargeAccount"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="核销商id" prop="resellerId">
            <a-input
              placeholder="请输入核销商id"
              v-model="saveObject.resellerId"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="平台支付订单号" prop="matchOutTradeNo">
            <a-input
              placeholder="请输入平台支付订单号"
              v-model="saveObject.matchOutTradeNo"
            >
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="查询标志" prop="queryFlag">
            <a-input
              placeholder="请输入查询标志"
              v-model="saveObject.queryFlag"
            >
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row justify="space-between" type="flex">
        <a-col :span="12" style="position:relative">
          <a-form-model-item label="商户类型" prop="chargeAccountType">
            <!-- 商户类型 气泡弹窗 -->
            <a-radio-group v-model="saveObject.chargeAccountType">
              <a-radio :value="'MOBILE'">
                手机号
              </a-radio>
              <a-radio :value="'PLATFORM_ACCOUNT'">
                他方平台账号
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="充值产品类型" prop="productType">
            <a-radio-group v-model="saveObject.productType">
              <a-radio :value="'JD_E_CARD'">
                京东E卡
              </a-radio>
              <a-radio :value="'CTRIP'">
                携程任我行
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row justify="start" type="flex">
        <a-col :span="18" style="position:relative">
          <a-form-model-item label="订单状态" prop="orderStatus">
            <!-- 商户类型 气泡弹窗 -->
            <a-radio-group v-model="saveObject.orderStatus">
              <a-radio :value="'PAYING'">
                支付中
              </a-radio>
              <a-radio :value="'WAITING_PAY'">
                待支付
              </a-radio>
              <a-radio :value="'FINISH'">
                支付成功
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="创建时间" prop="gmtCreate">
            <a-input
              placeholder="请输入创建时间"
              v-model="saveObject.gmtCreate"
              :disabled="true"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="更新时间" prop="gmtUpdate">
            <a-input
              placeholder="请输入更新时间"
              v-model="saveObject.gmtUpdate"
              :disabled="true"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <div class="drawer-btn-center" >
      <a-button icon="close" :style="{ marginRight: '8px' }" @click="onClose" style="margin-right:8px">
        取消
      </a-button>
      <a-button type="primary" icon="check" @click="handleOkFunc" :loading="btnLoading">
        保存
      </a-button>
    </div>
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
      resetIsShow: false, // 重置密码是否展现
      btnLoading: false,
      saveObject: {}, // 数据对象
      recordId: null, // 更新对象ID
      isAdd: true, // 新增 or 修改
      visible: false, // 是否显示弹层/抽屉
      rules: {
        orderNo: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入订单金额', trigger: 'blur' }],
        chargeAccount: [{ required: true, message: '请输入充值账号', trigger: 'blur' }]
      }
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
      that.recordId = recordId
      req.getById(API_URL_RESELLER_ORDER_LIST, recordId).then(res => {
        that.saveObject = res
        if (that.saveObject.amount) {
          const amount = that.saveObject.amount / 100
          that.saveObject.amount = amount
        }
      })
      this.visible = true
    },
    handleOkFunc: function () { // 点击【确认】按钮事件
        const that = this
        this.$refs.infoFormModel.validate(valid => {
          if (valid) { // 验证通过
            // 请求接口
            that.saveObject.amount = that.saveObject.amount * 100
            req.updateById(API_URL_RESELLER_ORDER_LIST, that.recordId, that.saveObject).then(res => {
              that.$message.success('修改成功')
              that.visible = false
              that.callbackFunc() // 刷新列表
              that.btnLoading = false
            }).catch(res => {
              that.btnLoading = false
            })
          }
        })
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
