<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'支付类型维护'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
    class="drawer-width"

  >
    <a-form-model v-if="visible" ref="infoFormModel" :model="saveObject" layout="vertical" :rules="rules">
      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="产品类型" prop="productType">
            <a-select v-model="saveObject.productType" placeholder="产品类型" default-value="">
              <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
              <a-select-option value="CTRIP">携程任我行</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="产品名称" prop="productName">
            <a-input
              placeholder="请输入产品名称"
              v-model="saveObject.productName"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-form-model-item label="状态" prop="status">
            <a-radio-group v-model="saveObject.status">
              <a-radio :value="'ENABLE'">
                启用
              </a-radio>
              <a-radio :value="'DISABLE'">
                停用
              </a-radio>
            </a-radio-group>
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
    import { API_URL_PRETENDER_PRODUCT_LIST, req } from '@/api/manage'
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
                  productType: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
                  productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
                  status: [{ required: true, message: '请选择启用状态', trigger: 'blur' }]
                }
            }
        },
        created () {
        },
        methods: {
            show: function (recordId) { // 弹层打开事件
              if (!recordId) {
                this.visible = true
                return
              }
                if (this.$refs.infoFormModel !== undefined) {
                    this.$refs.infoFormModel.resetFields()
                }
                const that = this
                that.recordId = recordId
                req.getById(API_URL_PRETENDER_PRODUCT_LIST, recordId).then(res => {
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
                  that.btnLoading = true
                  if (that.saveObject.id && that.saveObject.id !== '') {
                    // 请求接口
                    req.updateById(API_URL_PRETENDER_PRODUCT_LIST, that.recordId, that.saveObject).then(res => {
                      that.$message.success('修改成功')
                      that.visible = false
                      that.callbackFunc() // 刷新列表
                      that.btnLoading = false
                    }).catch(res => {
                      that.btnLoading = false
                    })
                  } else {
                    // 请求接口
                    req.add(API_URL_PRETENDER_PRODUCT_LIST, that.saveObject).then(res => {
                      that.$message.success('新增成功')
                      that.visible = false
                      that.callbackFunc() // 刷新列表
                      that.btnLoading = false
                    }).catch(res => {
                      that.btnLoading = false
                    })
                  }
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
