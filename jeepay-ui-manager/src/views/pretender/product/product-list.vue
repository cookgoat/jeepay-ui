<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option value="JD_E_CARD">京东E卡</a-select-option>
                <a-select-option value="CTRIP">携程任我行</a-select-option>
              </a-select>
            </a-form-item>
            <jeepay-text-up
              placeholder="产品名称"
              :msg="searchData.productName"
              v-model="searchData.productName"/>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.status" placeholder="状态" default-value="">
                <a-select-option value="ENABLE">启用</a-select-option>
                <a-select-option value="DISABLE">停用</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout" style="max-width:350px;min-width:300px">
              <a-range-picker
                @change="onChange"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate"
              >
                <a-icon slot="suffixIcon" type="sync"/>
              </a-range-picker>
            </a-form-item>
            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="() => this.searchData = {}">重置</a-button>
            </span>
          </div>
        </a-form>
        <div>
          <a-button icon="plus" v-if="$access('ENT_PRETENDER_PRODUCT_GROUP_ADD')" type="primary" @click="addFunc" class="mg-b-30">添加</a-button>
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
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="productType" slot-scope="{record}">
          <b v-if="record.productType ==='JD_E_CARD'">京东E卡</b>
          <b v-if="record.productType ==='CTRIP'">携程任我行</b>
        </template> <!-- 自定义插槽 -->
        <!-- 自定义插槽 -->
        <template slot="status" slot-scope="{record}">
          <b v-if="record.status ==='ENABLE'">启用</b>
          <b v-if="record.status ==='DISABLE'">停用</b>
        </template> <!-- 自定义插槽 -->
        <!-- 自定义插槽 -->
        <template slot="productName" slot-scope="{record}"><b>{{ record.productName }}</b></template> <!-- 自定义插槽 -->
        <!-- 自定义插槽 -->
        <template slot="opSlot" slot-scope="{record}">  <!-- 操作列插槽 -->
          <JeepayTableColumns>
            <a-button
              type="link"
              v-if="$access('ENT_PRETENDER_PRODUCT_GROUP_EDIT')"
              @click="updateById(record.id)">修改
            </a-button>
          </JeepayTableColumns>
          <JeepayTableColumns>
            <a-button
              type="link"
              v-if="$access('ENT_PRETENDER_PRODUCT_GROUP_VIEW')"
              @click="detailFunc(record.id)">详情
            </a-button>
          </JeepayTableColumns>
        </template>
      </JeepayTable>
    </a-card>
    <Detail ref="detailInfo"></Detail>
    <Modify ref="modifyInfo" :callbackFunc="queryFunc"></Modify>
  </page-header-wrapper>
</template>
<script>
    import JeepayTable from '@/components/JeepayTable/JeepayTable'
    import JeepayTextUp from '@/components/JeepayTextUp/JeepayTextUp' // 文字上移组件
    import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
    import { API_URL_PRETENDER_PRODUCT_LIST, req } from '@/api/manage'
    import moment from 'moment'
    import Detail from '@/views/pretender/product/detail'
    import Modify from '@/views/pretender/product/Modify'

    const tableColumns = [

        { key: 'id', width: '200px', title: 'ID', scopedSlots: { customRender: 'id' } },
        { key: 'productType', width: '200px', title: '产品类型', scopedSlots: { customRender: 'productType' } },
        { key: 'productName', width: '150px', title: '产品名称', scopedSlots: { customRender: 'productName' } },
        { key: 'status', width: '150px', title: '状态', scopedSlots: { customRender: 'status' } },
        { key: 'gmtCreate', width: '150px', title: '创建日期', scopedSlots: { customRender: 'gmtCreate' } },
        { key: 'op', title: '操作', width: '160px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
    ]

    export default {
        name: 'OrderList',
        // eslint-disable-next-line standard/object-curly-even-spacing
        components: { JeepayTable, JeepayTableColumns, JeepayTextUp, Detail, Modify },
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
                return req.list(API_URL_PRETENDER_PRODUCT_LIST, params)
            },
            // delFunc: function (recordId) {
            //     const that = this
            //     this.$infoBox.confirmDanger('确认删除？', '该操作将删除该支付类型', () => {
            //         req.delById(API_URL_PRETENDER_PRODUCT_LIST, recordId).then(res => {
            //             that.$refs.infoTable.refTable(false)
            //             this.$message.success('删除成功')
            //         })
            //     })
            // },
            addFunc: function () { // 业务通用【新增】 函数
                this.$refs.modifyInfo.show()
            },
          updateById: function (recordId) { // 业务通用【新增】 函数
            this.$refs.modifyInfo.show(recordId)
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
