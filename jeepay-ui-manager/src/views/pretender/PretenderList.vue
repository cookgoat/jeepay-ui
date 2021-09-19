<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'账号'" :msg="searchData.account" v-model="searchData.account" />
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.bizType" placeholder="业务类型" default-value="">
                <a-select-option value="PROPERTY_CREDIT">资和信</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up :placeholder="'ID'" :msg="searchData.id" v-model="searchData.id" />
            <jeepay-text-up :placeholder="'登录凭证'" :msg="searchData.certificate" v-model="searchData.certificate" />
            <a-form-item label="" class="table-head-layout" style="max-width:350px;min-width:300px">
              <a-range-picker
                @change="onChange"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
              >
                <a-icon slot="suffixIcon" type="sync" />
              </a-range-picker>
            </a-form-item>
            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
        <div>
          <a-button icon="plus" v-if="$access('ENT_ISV_INFO_ADD')" type="primary" @click="addFunc" class="mg-b-30">添加</a-button>
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
        <template slot="status" slot-scope="{record}" >
          <a-tag :color="record.status === 'AVAILABLE'?'green':record.status === 'UNAVAILABLE'?'orange':'volcano'">
            {{ record.status === 'AVAILABLE'?'有效':record.status === 'UNAVAILABLE'?'无效':'未知' }}
          </a-tag>
        </template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="account" slot-scope="{record}"><b>{{ record.account }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccount" slot-scope="{record}"><b>{{ record.chargeAccount }}</b></template> <!-- 自定义插槽 -->
        <template slot="bizType" slot-scope="{record}">
          <b v-if="record.bizType ==='PROPERTY_CREDIT'">资和信</b>
        </template>
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button type="link" v-if="$access('ENT_ISV_INFO_EDIT')" @click="detailFunc(record.id)">详情</a-button>
            <a-button type="link" v-if="$access('ENT_ISV_INFO_DEL')" style="color: red" @click="delFunc(record.id)">删除</a-button>
          </JeepayTableColumns>
        </template>
      </JeepayTable>
    </a-card>
    <Detail ref="detailInfo"></Detail>
    <Upload ref="uploadInfo"></Upload>
  </page-header-wrapper>
</template>
<script>
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import Detail from './Detail'
import Upload from './Upload'
// eslint-disable-next-line camelcase
import { API_URL_PRETENDER_LIST, req } from '@/api/manage'
import moment from 'moment'
const tableColumns = [

  { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
  { key: 'bizType', width: '200px', title: '业务类型', scopedSlots: { customRender: 'bizType' } },
  { key: 'account', width: '150px', title: '账号', scopedSlots: { customRender: 'account' } },
  { key: 'status', width: '150px', title: '状态', scopedSlots: { customRender: 'status' } },
  // { key: 'certificate', width: '150px', title: '登录凭证', scopedSlots: { customRender: 'certificate' } },
  { key: 'gmtCreate', width: '150px', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } },
  { key: 'op', title: '操作', width: '260px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

export default {
  name: 'PretenderList',
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { JeepayTable, JeepayTableColumns, JeepayTextUp, Detail, Upload },
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
    disabledDate (current) { // 今日之后日期不可选
      return current && current > moment().endOf('day')
    },
    onChange (date, dateString) {
      this.searchData.createdStart = dateString[0] // 开始时间
      this.searchData.createdEnd = dateString[1] // 结束时间
    },
    queryFunc () {
      this.btnLoading = true
      this.$refs.infoTable.refTable(true)
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return req.list(API_URL_PRETENDER_LIST, params)
    },
    delFunc: function (recordId) {
      const that = this
      this.$infoBox.confirmDanger('确认删除？', '该操作将删除该账号', () => {
        req.delById(API_URL_PRETENDER_LIST, recordId).then(res => {
          that.$refs.infoTable.refTable(false)
          this.$message.success('删除成功')
        })
      })
    },
    addFunc: function () { // 业务通用【新增】 函数
      this.$refs.uploadInfo.show()
    },
    searchFunc: function () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    detailFunc: function (recordId) { // 业务通用【详情】 函数
      this.$refs.detailInfo.show(recordId)
    }
  }
}
</script>
