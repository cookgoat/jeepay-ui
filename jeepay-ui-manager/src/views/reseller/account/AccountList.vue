<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'登录账号'" :msg="searchData.initUserId" v-model="searchData.initUserId" />
            <jeepay-text-up :placeholder="'核销商户号'" :msg="searchData.resellerNo" v-model="searchData.resellerNo" />
            <jeepay-text-up :placeholder="'核销商名字'" :msg="searchData.resellerName" v-model="searchData.resellerName" />

            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
        <div>
          <a-button icon="plus" v-if="$access('ENT_RESELLER_ACCOUNT_GROUP_ADD')" type="primary" @click="addFunc" class="mg-b-30">新建</a-button>
        </div>
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
        <template slot="initUserId" slot-scope="{record}"><b>{{ record.initUserId.toString() }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerName" slot-scope="{record}"><b>{{ record.resellerName }}</b></template> <!-- 自定义插槽 -->
        <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template> <!-- 自定义插槽 -->
        <template slot="status" slot-scope="{record}" >
          <a-tag :color="record.status === 'ENABLE'?'green':record.status === 'UNABLE'?'orange':'volcano'">
            {{ record.status === 'ENABLE'?'有效':record.status === 'UNABLE'?'无效':'未知' }}
          </a-tag>
        </template> <!-- 自定义插槽 -->
        <template slot="lastUpdateUid" slot-scope="{record}"><b>{{ record.lastUpdateUid }}</b></template> <!-- 自定义插槽 -->
        <template slot="contactTel" slot-scope="{record}"><b>{{ record.contactTel }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="gmtUpdate" slot-scope="{record}"><b>{{ record.gmtUpdate }}</b></template> <!-- 自定义插槽 -->
        <template slot="lastUpdateName" slot-scope="{record}"><b>{{ record.lastUpdateName }}</b></template> <!-- 自定义插槽 -->
        <template slot="createName" slot-scope="{record}"><b>{{ record.createName }}</b></template> <!-- 自定义插槽 -->
        <template slot="createUid" slot-scope="{record}"><b>{{ record.createUid }}</b></template> <!-- 自定义插槽 -->
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button type="link" v-if="$access('ENT_RESELLER_ACCOUNT_GROUP_VIEW')" @click="detailFunc(record.id)">详情</a-button>
            <a-button type="link" v-if="$access('ENT_RESELLER_ACCOUNT_GROUP_EDIT')" @click="updateFunc(record.id)">修改</a-button>
            <a-button type="link" v-if="$access('ENT_RESELLER_PRODUCT_GROUP_CONFIG')" @click="productFunc(record.resellerNo)">开通产品</a-button>
          </JeepayTableColumns>
        </template>
      </JeepayTable>
    </a-card>
    <!-- 新增页面组件  -->
    <InfoEdit ref="infoEdit" :callbackFunc="searchFunc"/>
    <!-- 新增页面组件  -->
    <InfoAdd ref="infoAdd" :callbackFunc="searchFunc"/>
    <InfoDetail ref="infoDetail" :callbackFunc="searchFunc"/>
    <InfoProductList ref="infoProduct" :callbackFunc="searchFunc"/>
  </page-header-wrapper>
</template>
<script>
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import InfoEdit from './Edit'
import InfoAdd from './Add'
import InfoDetail from './Detail'
import InfoProductList from '../product/OpenProductList'
// eslint-disable-next-line camelcase
import { API_URL_RESELLER_LIST, req } from '@/api/manage'
const tableColumns = [
  { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
  { key: 'initUserId', width: '200px', title: '登录账号', scopedSlots: { customRender: 'initUserId' } },
  { key: 'resellerNo', width: '200px', title: '核销商户号', scopedSlots: { customRender: 'resellerNo' } },
  { key: 'resellerName', width: '150px', title: '核销商名字', scopedSlots: { customRender: 'resellerName' } },
  { key: 'contactTel', width: '150px', title: '联系电话', scopedSlots: { customRender: 'contactTel' } },
  { key: 'lastUpdateName', width: '150px', title: '最近更新人', scopedSlots: { customRender: 'lastUpdateName' } },
  { key: 'lastUpdateUid', width: '150px', title: '最近更新人uid', scopedSlots: { customRender: 'lastUpdateUid' } },
  { key: 'createName', width: '150px', title: '创建人', scopedSlots: { customRender: 'createName' } },
  { key: 'createUid', width: '150px', title: '创建人uid', scopedSlots: { customRender: 'createUid' } },
  { key: 'status', width: '150px', title: '状态', scopedSlots: { customRender: 'status' } },
  { key: 'gmtCreate', width: '150px', title: '创建时间', scopedSlots: { customRender: 'gmtCreate' } },
  { key: 'gmtUpdate', width: '150px', title: '更新时间', scopedSlots: { customRender: 'gmtUpdate' } },

  { key: 'op', title: '操作', width: '260px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

export default {
  name: 'PretenderList',
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { JeepayTable, JeepayTableColumns, JeepayTextUp, InfoEdit, InfoAdd, InfoDetail, InfoProductList },
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
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return req.list(API_URL_RESELLER_LIST, params)
    },
    addFunc: function () { // 业务通用【新增】 函数
      this.$refs.infoAdd.show()
    },
    detailFunc: function (recordId) {
      this.$refs.infoDetail.show(recordId)
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    updateFunc: function (recordId) { // 业务通用【详情】 函数
      this.$refs.infoEdit.show(recordId)
    },
    productFunc: function (resellerNo) { // 业务通用【产品】 函数
      this.$refs.infoProduct.show(resellerNo)
    }
  }
}
</script>
