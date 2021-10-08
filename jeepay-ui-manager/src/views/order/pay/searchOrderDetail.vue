<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'订单详情'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="40%"
    class="drawer-width"
  >
<!--    <a-form-model v-if="visible" ref="infoFormModel" :model="detailData" layout="vertical">-->
<!--      <a-row justify="space-between" type="flex">-->
<!--          <a-descriptions>-->
<!--            <a-descriptions-item label="订单信息">-->
<!--              -->
<!--            </a-descriptions-item>-->
<!--          </a-descriptions>-->
<!--      </a-row>-->
<!--    </a-form-model>-->
    <div>
      订单信息：
    </div>
    <div>
      {{ detailData }}
    </div>
  </a-drawer>
</template>

<script>
export default {

  props: {
    callbackFunc: { type: Function }
  },

  data () {
    return {
      btnLoading: false,
      detailData: {},
      visible: false // 是否显示弹层/抽屉
    }
  },
  methods: {
    show (data) {
      this.visible = true
      this.detailData = data
    },
    onClose () {
      this.visible = false
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
