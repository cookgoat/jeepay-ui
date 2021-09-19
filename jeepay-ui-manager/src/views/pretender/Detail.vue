<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'小号详情'"
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
              {{ detailData.bizType }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="账号">
              {{ detailData.account }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions v-if="detailData.status === 'AVAILABLE'">
            <a-descriptions-item label="状态">
              <a-tag :color="detailData.status === 'AVAILABLE'?'green':detailData.orderStatus === 'UNAVAILABLE'?'orange':'volcano'">
                {{ detailData.status === 'AVAILABLE'?'有效':detailData.orderStatus === 'UNAVAILABLE'?'无效':'未知' }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="40">
          <a-descriptions>
            <a-descriptions-item label="登录凭证">
              {{ detailData.certificate }}
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
      </a-row>
    </a-form-model>
  </a-drawer>
</template>

<script>
import { API_URL_PRETENDER_LIST, req } from '@/api/manage'
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
      req.getById(API_URL_PRETENDER_LIST, recordId).then(res => {
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
