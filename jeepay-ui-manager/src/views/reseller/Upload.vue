<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'上传订单'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
    class="drawer-width"

  >
    <a-form-model v-if="visible" ref="infoFormModel" :model="saveObject" layout="vertical" :rules="rules">
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="状态" prop="productType">
            <a-radio-group v-model="saveObject.productType">
              <a-radio :value="'JD_E_CARD'">
                京东E卡
              </a-radio>
              <a-radio :value="'CTRIP'">
                携程任我行
              </a-radio>
              <a-radio :value="'SINOPEC'">
                石化
              </a-radio>
              <a-radio :value="'APPLE_STORE'">
                苹果商店
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="上传文件">
        <a-upload
          :file-list="fileList"
          :remove="handleRemove"
          :before-upload="beforeUpload"
        >
          <a-button> <a-icon type="upload" /> Select File </a-button>
        </a-upload>
      </a-form-model-item>
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
      fileList: [],
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
    show: function () { // 弹层打开事件
      this.saveObject = { productType: 'JD_E_CARD' } // 数据清空
      this.fileList = []
      if (this.$refs.infoFormModel !== undefined) {
        this.$refs.infoFormModel.resetFields()
      }
      this.visible = true
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleOkFunc: function () { // 点击【确认】按钮事件
      const that = this
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      req.add(API_URL_RESELLER_ORDER_LIST + '/' + this.saveObject.productType + '/', formData).then(res => {
        that.$message.success('添加成功')
        that.visible = false
        that.btnLoading = false
      }).catch(res => {
        that.btnLoading = false
      })
    },
    onClose () {
      this.visible = false
      this.resetPassEmpty(this)
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
