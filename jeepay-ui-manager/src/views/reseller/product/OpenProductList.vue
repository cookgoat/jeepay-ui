<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="'产品列表'"
    @close="onClose"
    :body-style="{ paddingBottom: '80px' }"
    width="80%"
    class="drawer-width"

  >
    <!-- 列表渲染 -->
    <JeepayTableNoPage
      @btnLoadClose="btnLoading=false"
      ref="infoTable"
      :initData="true"
      :reqTableDataFunc="reqTableDataFunc"
      :tableColumns="tableColumns"
      :searchData="searchData"
      :scrollX="1100"
    >
      <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
      <template slot="productType" slot-scope="{record}">
        <b v-if="record.productType ==='JD_E_CARD'">京东E卡</b>
        <b v-if="record.productType ==='CTRIP'">携程任我行</b>
      </template> <!-- 自定义插槽 -->
      <template slot="feeRate" slot-scope="{record}"><b>{{ record.feeRate }}</b></template> <!-- 自定义插槽 -->
      <template slot="creditAmount" slot-scope="{record}"><b>{{ '￥'+record.creditAmount/100 }}</b></template> <!-- 自定义插槽 -->
      <template slot="status" slot-scope="{record}">
        <a-switch class="els" checked-children="开启" un-checked-children="关闭" :checked="record.status === 'ENABLE'" @change="onChangeInner(record)" />
      </template>
      <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
        <JeepayTableColumns>
          <a-button type="link" v-if="$access('ENT_RESELLER_PRODUCT_GROUP_SETTLEUP')" @click="settleUpFunc(record)">清账</a-button>
        </JeepayTableColumns>
      </template>
    </JeepayTableNoPage>
    <InfoEdit ref="infoEdit" :callbackFunc="searchFunc"></InfoEdit>
  </a-drawer>
</template>

<script>
import JeepayTableNoPage from '@/components/JeepayTable/JeepayTableNoPage'
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import InfoEdit from './Edit'
import { API_URL_RESELLER_PRODUCT_LIST, req, settleUpProduct } from '@/api/manage'

const tableColumns = [

  { key: 'resellerNo', width: '200px', title: '核销商户号', scopedSlots: { customRender: 'resellerNo' } },
  { key: 'productType', width: '150px', title: '产品类型', scopedSlots: { customRender: 'productType' } },
  { key: 'feeRate', width: '150px', title: '利率', scopedSlots: { customRender: 'feeRate' } },
  { key: 'creditAmount', width: '150px', title: '信用金', scopedSlots: { customRender: 'creditAmount' } },
  { key: 'status', width: '150px', title: '状态', scopedSlots: { customRender: 'status' } },
  { key: 'op', title: '操作', width: '100px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]
export default {

  props: {
    callbackFunc: { type: Function }
  },
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { JeepayTableNoPage, JeepayTableColumns, JeepayTextUp, InfoEdit },

  data () {
    return {
      tableColumns: tableColumns,
      btnLoading: false,
      detailData: {}, // 数据对象
      resellerNo: null, // 更新对象ID
      visible: false, // 是否显示弹层/抽屉
      searchData: {}
    }
  },
  created () {
  },
  methods: {
    show: function (resellerNo) { // 弹层打开事件
      console.log(resellerNo)
      if (this.$refs.infoFormModel !== undefined) {
        this.$refs.infoFormModel.resetFields()
      }
      const that = this
      that.resetIsShow = true // 展示重置密码板块
      that.resellerNo = resellerNo
      this.searchData.resellerNo = this.resellerNo
      this.visible = true
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return req.list(API_URL_RESELLER_PRODUCT_LIST + '/list', params)
    },
    onClose () {
      this.visible = false
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
      this.callbackFunc() // 刷新列表
    },
    onChangeInner: function (record) { // 【更新状态】
      const temp = JSON.parse(JSON.stringify(record))
      this.$refs.infoEdit.show(temp)
    },
    settleUpFunc: function (record) {
      const that = this
      const params = {
        'resellerNo': record.resellerNo,
        'productType': record.productType
      }
      settleUpProduct(params).then(res => {
        that.$message.success('处理成功')
        this.$refs.infoTable.refTable(true)
      }).catch(res => {
      })
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
