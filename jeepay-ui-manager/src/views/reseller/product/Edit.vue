<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'编辑产品' "
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
  >
    <a-form-model ref="infoFormModel" :model="saveObject" layout="vertical" :rules="rules">
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="核销商户号" prop="resellerNo">
            <a-input
              placeholder="请输入核销商户号"
              :disabled="true"
              v-model="saveObject.resellerNo"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="产品类型" prop="productTypeName">
            <a-input
              placeholder="请输入产品类型"
              :disabled="true"
              v-model="this.showProductName"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-form-model-item label="利率" prop="feeRate">
            <a-input
              placeholder="利率"
              v-model="saveObject.feeRate"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="信用金" prop="creditAmount">
            <a-input
              placeholder="请输入信用金"
              v-model="saveObject.creditAmount"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10" style="position:relative">
          <a-form-model-item label="状态" prop="status">
            <!-- 商户类型 气泡弹窗 -->
            <a-radio-group v-model="saveObject.status">
              <a-radio :value="'ENABLE'">
                开启
              </a-radio>
              <a-radio :value="'DISABLE'">
                关闭
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <div class="drawer-btn-center">
      <a-button icon="close" @click="onClose" style="margin-right:8px">
        取消
      </a-button>
      <a-button type="primary" style="margin-right:8px" icon="check" @click="handleOkFunc" :loading="btnLoading">
        保存
      </a-button>
    </div>
  </a-drawer>

</template>

<script>
import { updateProduct } from '@/api/manage'
export default {

  props: {
    callbackFunc: { type: Function }
  },

  data () {
    return {
      // eslint-disable-next-line no-undef
      showProductName: '',
      btnLoading: false,
      saveObject: {}, // 数据对象
      visible: false, // 是否显示弹层/抽屉
      rules: {
      }
    }
  },
  created () {
  },
  methods: {
    show: function (record) { // 弹层打开事件
      this.saveObject = record
      this.saveObject.creditAmount = this.saveObject.creditAmount / 100
      this.showProductName = this.saveObject.productType === 'JD_E_CARD' ? '京东E卡' : this.saveObject.productType === 'CTRIP' ? '携程任我行' : '未知'
      if (this.$refs.infoFormModel !== undefined) {
        this.$refs.infoFormModel.resetFields()
      }
      this.visible = true
    },

    handleOkFunc: function () { // 点击【确认】按钮事件
      const that = this
      if (this.saveObject.status === 'ENABLE' && (this.saveObject.feeRate <= 0 || this.saveObject.feeRate >= 1)) {
          this.$message.error('利率必须大于0小于1')
          return
        }
        that.saveObject.creditAmount = that.saveObject.creditAmount * 100
        this.$refs.infoFormModel.validate(valid => {
          if (valid) { // 验证通过
            that.btnLoading = true
            updateProduct(that.saveObject).then(res => {
              that.$message.success('保存成功')
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
