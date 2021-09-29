<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'核销商流水详情'"
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
            <a-descriptions-item label="核销商号">
              {{ detailData.resellerNo }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="6">
          <a-descriptions>
            <a-descriptions-item label="变更前回款金额">
              {{ '￥'+detailData.beforeRecoveriesAmount }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="6">
          <a-descriptions>
            <a-descriptions-item label="变更金额">
              {{ '￥'+detailData.changeRecoveriesAmount }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="6">
          <a-descriptions>
            <a-descriptions-item label="变更后回款金额">
              {{ '￥'+detailData.afterRecoveriesAmount }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="产品类型">
              {{ detailData.productType }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="产品订单号">
              {{ detailData.productOrderNo }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="订单金额">
              {{ '￥'+detailData.orderAmount }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="手续费">
              {{ '￥'+detailData.resellerShareAmount }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="创建人uid">
              {{ detailData.createUid }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="创建人">
              {{ detailData.createName }}
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
    import { API_URL_RESELLER_FUNDLINE_LIST, req } from '@/api/manage'
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
                that.recordId = recordId
                req.getById(API_URL_RESELLER_FUNDLINE_LIST, recordId).then(res => {
                    that.detailData = res
                    // 金额部分 / 100
                  that.detailData.beforeRecoveriesAmount = that.detailData.beforeRecoveriesAmount / 100
                  that.detailData.changeRecoveriesAmount = that.detailData.changeRecoveriesAmount / 100
                  that.detailData.afterRecoveriesAmount = that.detailData.afterRecoveriesAmount / 100
                  that.detailData.orderAmount = that.detailData.orderAmount / 100
                  that.detailData.resellerShareAmount = that.detailData.resellerShareAmount / 100
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
