<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'新增核销商'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
  >
    <a-form-model ref="infoFormModel" :model="saveObject" layout="vertical" :rules="rules">
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="手机号" prop="contactTel">
            <a-input
              placeholder="请输入手机号"
              v-model="saveObject.contactTel"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="核销商名字" prop="resellerName">
            <a-input
              placeholder="请输入核销商名字"
              v-model="saveObject.resellerName"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="登录名" prop="loginUserName">
            <a-input
              placeholder="请输入登录名"
              v-model="saveObject.loginUserName"
            />
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
import { API_URL_RESELLER_LIST, req } from '@/api/manage'
export default {

  props: {
    callbackFunc: { type: Function }
  },

  data () {
    return {
      btnLoading: false,
      saveObject: {}, // 数据对象
      recordId: null, // 更新对象ID
      visible: false, // 是否显示弹层/抽屉
      rules: {
        resellerName: [ { required: true, message: '请输入核销商名字', trigger: 'blur' } ],
        contactTel: [ { required: true, message: '请输入手机号', trigger: 'blur' } ],
        loginUserName: [{ required: true, message: '请输入登录名', trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
    show: function (recordId) { // 弹层打开事件
      this.saveObject = { 'state': 1 } // 数据清空

      if (this.$refs.infoFormModel !== undefined) {
        this.$refs.infoFormModel.resetFields()
      }

      this.visible = true // 立马展示弹层信息
    },

    handleOkFunc: function () { // 点击【确认】按钮事件
        const that = this
        this.$refs.infoFormModel.validate(valid => {
          if (valid) { // 验证通过
            that.btnLoading = true
            // 请求接口
            req.add(API_URL_RESELLER_LIST, that.saveObject).then(res => {
              that.$message.success('新增成功')
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
