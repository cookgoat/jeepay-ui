<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <a-form-item  class="table-head-layout">
              <a-select v-model="searchData.resellerNo" placeholder="请选择核销商">
                <a-select-option v-for="item in reSellerList" :key="item.resellerNo" :value="item.resellerNo">
                  {{ item.resellerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型" default-value="">
                <a-select-option v-for="(item, index) in productTypeList" :key="index" :value="item.value">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout" style="max-width:350px;min-width:300px">
              <a-range-picker v-model="datetrange" @change="onChange" />
            </a-form-item>

            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="queryFunc" :loading="btnLoading">搜索</a-button>
              <a-button style="margin-left: 8px" icon="reload" @click="resetFormData">重置</a-button>
            </span>
          </div>
        </a-form>
      </div>
      <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :reqTableDataFunc="reqCollectionList"
        :tableColumns="tableColumns"
        :searchData="searchData"
        rowKey="payOrderId"
        :scrollX="1000"
      >
      <template slot="productType" slot-scope="{record}">
        {{ record.productType }}
      </template>
      </JeepayTable>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getCollectionList } from '../../api/collection';
import JeepayTable from '../../components/JeepayTable/JeepayTable';
import JeepayTextUp from '../../components/JeepayTextUp/JeepayTextUp'
import moment from 'moment'
import { accountList } from '../../api/account'

const tableColumns = [
  { key: 'createTime', title: '时间', dataIndex: 'createTime', width: '100px', align: 'center' },
  { key: 'resellerNo', title: '核销商ID', dataIndex: 'resellerNo', width: '150px', align: 'center' },
  { key: 'resellerName', title: '核销商名称', dataIndex: 'resellerName', width: '80px', align: 'center' },
  {
    key: 'productType',
    title: '产品类型',
    dataIndex: 'productType',
    scopedSlots: { customRender: 'productType' },
    customRender: (text, record) => {
      if (text) {
        switch (text) {
          case 'JD_E_CARD':
            return '京东E卡'
          case 'SINOPEC':
            return '中国石化'
          case 'PETRO':
            return '中国石油'
          case 'CTRIP':
            return '携程任我行'
          case 'TEST_PRODUCT':
            return '测试产品'
        }
      } else {
        return ''
      }
    },
    width: '80px',
    align: 'center'
  },
  { key: 'allAmount', title: '订单金额', dataIndex: 'allAmount', width: '80px', align: 'center', customRender: (text) => { return text / 100 } },
  { key: 'finishAmount', title: '完成金额', dataIndex: 'finishAmount', width: '80px', align: 'center', customRender: (text) => { return text / 100 } },
  { key: 'returnAmount', title: '回款金额', dataIndex: 'returnAmount', width: '80px', align: 'center', customRender: (text) => { return text / 100 } },
]

export default {
  name: 'CollectionList',
  components: {
    JeepayTable,
    JeepayTextUp
  },
  data () {
    return {
      btnLoading: false,
      searchData: {},
      tableColumns,
      reSellerList: [],
      datetrange: []
    }
  },
  mounted () {
    this.getReSeller()
    this.reqCollectionList()
  },
  methods: {
    // 获取核销商列表
    getReSeller () {
      accountList({ pageNumber: 1, pageSize: 9999 }).then(res => {
        this.reSellerList = res.records.map(item => {
          return {
            resellerName: item.resellerName,
            resellerNo: item.resellerNo
          }
        })
      })
    },
    queryFunc () {
      if (this.searchData.amountSearch && this.searchData.amountSearch !== '') {
        this.searchData.amount = ''
        this.searchData.amount = this.searchData.amountSearch * 100
      }
      this.btnLoading = true
      this.$refs.infoTable.refTable(true)
    },
    reqCollectionList (params) {
      return getCollectionList(params)
    },
    onChange (date, dateString) {
      this.searchData.createdStart = dateString[0] // 开始时间
      this.searchData.createdEnd = dateString[1] // 结束时间
    },
    disabledDate (current) { // 今日之后日期不可选
      return current && current > moment().endOf('day')
    },
    // 重置表单
    resetFormData () {
      this.searchData = {}
      this.datetrange = []
      this.$nextTick(() => {
        this.queryFunc()
      })
    }
  }
}
</script>

<style scoped>

</style>
