<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'支付类型详情'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
    class="drawer-width"

  >
    <a-form-model v-if="visible" ref="infoFormModel" :model="detailData" layout="vertical">
      <a-row justify="space-between" type="flex">
        <a-col :span="20">
          <a-descriptions>
            <a-descriptions-item label="ID">
              {{ detailData.id }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="产品类型">
              <span v-if="detailData.productType == 'JD_E_CARD'">
                {{ '京东E卡' }}
              </span>
              <span v-if="detailData.productType == 'CTRIP'">
                {{ '携程任我行' }}
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="产品名称">
              {{ detailData.productName }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="状态">

              <a-tag :color="detailData.status === 'ENABLE'?'blue':'volcano'">
                {{ detailData.status === 'enable'?'启用':'停用' }}
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
    import { API_URL_PRETENDER_PRODUCT_LIST, req } from '@/api/manage'
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
                if (this.$refs.infoFormModel !== undefined) {
                    this.$refs.infoFormModel.resetFields()
                }
                const that = this
                that.resetIsShow = true // 展示重置密码板块
                that.recordId = recordId
                req.getById(API_URL_PRETENDER_PRODUCT_LIST, recordId).then(res => {
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
