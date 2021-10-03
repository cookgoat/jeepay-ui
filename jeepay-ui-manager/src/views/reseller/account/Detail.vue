<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'核销商详情'"
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
            <a-descriptions-item label="昵称">
              {{ detailData.resellerName }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="联系电话">
              {{ detailData.contactTel }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>

        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="状态">
              <a-tag :color="detailData.status === 'ENABLE'?'green':detailData.status === 'UNABLE'?'orange':'volcano'">
                {{ detailData.status === 'ENABLE'?'有效':detailData.status === 'UNABLE'?'无效':'未知' }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>

      <a-row justify="space-between" type="flex">
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="核销商户号">
              {{ detailData.resellerNo }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="登录账号">
              {{ detailData.initUserId }}
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
            <a-descriptions-item label="最近更新人uid">
              {{ detailData.lastUpdateUid }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="10">
          <a-descriptions>
            <a-descriptions-item label="最近更新人">
              {{ detailData.lastUpdateName }}
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
import { API_URL_RESELLER_LIST, req } from '@/api/manage'
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
      that.resetIsShow = true // 展示重置密码板块
      that.recordId = recordId
      req.getById(API_URL_RESELLER_LIST, recordId).then(res => {
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
