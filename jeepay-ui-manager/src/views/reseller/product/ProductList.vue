<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'核销商户号'" :msg="searchData.resellerNo" v-model="searchData.resellerNo" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
                <a-select-option value="CTRIP">携程任我行</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.status" placeholder="状态" default-value="">
                <a-select-option value="ENABLE">开启</a-select-option>
                <a-select-option value="DISABLE">关闭</a-select-option>
              </a-select>
            </a-form-item>
            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
      </div>

      <!-- 列表渲染 -->
      <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :reqTableDataFunc="reqTableDataFunc"
        :tableColumns="tableColumns"
        :searchData="searchData"
        :scrollX="1100"
        rowKey="id"
      >

        <template slot="id" slot-scope="{record}"><b>{{ record.id.toString() }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}">
          <b v-if="record.productType ==='JD_E_CARD'">京东E卡</b>
          <b v-if="record.productType ==='CTRIP'">携程任我行</b>
        </template> <!-- 自定义插槽 -->
        <template slot="feeRate" slot-scope="{record}"><b>{{ record.feeRate }}</b></template> <!-- 自定义插槽 -->
        <template slot="recoveriesAmount" slot-scope="{record}"><b>{{ '￥'+record.recoveriesAmount/100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="creditAmount" slot-scope="{record}"><b>{{ '￥'+record.creditAmount/100 }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtUpdate" slot-scope="{record}"><b>{{ record.gmtUpdate }}</b></template> <!-- 自定义插槽 -->
        <template slot="status" slot-scope="{record}">
          <a-tag :color="record.status === 'ENABLE'?'green':record.status === 'DISABLE'?'orange':'volcano'">
            {{ record.status === 'ENABLE'?'开启':record.status === 'DISABLE'?'关闭':'未知' }}
          </a-tag>
        </template>
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button type="link" v-if="$access('ENT_RESELLER_PRODUCT_GROUP_CONFIG')" @click="productFunc(record)">配置</a-button>
            <a-button type="link" v-if="$access('ENT_RESELLER_PRODUCT_GROUP_SETTLEUP')" @click="settleUpFunc(record)">清账</a-button>
          </JeepayTableColumns>
        </template>
      </JeepayTable>
    </a-card>
    <InfoEdit ref="infoProduct" :callbackFunc="searchFunc"/>
  </page-header-wrapper>
</template>
<script>
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import InfoEdit from '@/views/reseller/product/Edit'
import { API_URL_RESELLER_PRODUCT_LIST, req, settleUpProduct } from '@/api/manage'
const tableColumns = [
  { key: 'id', width: '150px', title: 'ID', scopedSlots: { customRender: 'id' } },
  { key: 'resellerNo', width: '200px', title: '核销商户号', scopedSlots: { customRender: 'resellerNo' } },
  { key: 'productType', width: '150px', title: '产品类型', scopedSlots: { customRender: 'productType' } },
  { key: 'feeRate', width: '150px', title: '利率', scopedSlots: { customRender: 'feeRate' } },
  { key: 'creditAmount', width: '150px', title: '信用金', scopedSlots: { customRender: 'creditAmount' } },
  { key: 'recoveriesAmount', width: '150px', title: '待回款金额', scopedSlots: { customRender: 'recoveriesAmount' } },
  { key: 'status', width: '150px', title: '状态', scopedSlots: { customRender: 'status' } },
  { key: 'gmtCreate', width: '150px', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } },
  { key: 'gmtUpdate', width: '150px', title: '更新日期', scopedSlots: { customRender: 'gmtUpdate' } },
  { key: 'op', title: '操作', width: '150px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

export default {
  name: 'PretenderList',
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { JeepayTable, JeepayTableColumns, JeepayTextUp, InfoEdit },
  data () {
    return {
      btnLoading: false,
      tableColumns: tableColumns,
      searchData: {}
    }
  },
  mounted () {
  },
  methods: {
    queryFunc () {
      this.btnLoading = true
      this.$refs.infoTable.refTable(true)
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return req.list(API_URL_RESELLER_PRODUCT_LIST, params)
    },
    productFunc: function (record) { // 业务通用【产品】 函数
      const temp = JSON.parse(JSON.stringify(record))
      this.$refs.infoProduct.show(temp)
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
