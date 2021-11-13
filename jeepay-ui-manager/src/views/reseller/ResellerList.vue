<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" class="table-head-ground">
          <div class="table-layer">
            <jeepay-text-up :placeholder="'商户单号'" :msg="searchData.matchOutTradeNo" v-model="searchData.matchOutTradeNo" />
            <jeepay-text-up :placeholder="'官方单号'" :msg="searchData.pretenderOrderNo" v-model="searchData.pretenderOrderNo" />
            <jeepay-text-up :placeholder="'充值账号'" :msg="searchData.chargeAccount" v-model="searchData.chargeAccount" />
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.amount" placeholder="金额" default-value="">
                <a-select-option v-for="(item, index) in moneyList" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout">
              <a-select v-model="searchData.notifyStatus" placeholder="核销回调" default-value="">
                <a-select-option v-for="(item, index) in writeOffCallback" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item class="table-head-layout">
              <a-select v-model="isSuccess" placeholder="批量操作" @change="selectChange">
                <a-select-option value="1">手动成功</a-select-option>
                <a-select-option value="0">手动失败</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button style="background-color: #45EE58; border: 0; color: white;" @click="batchExecute">执行</a-button>
            </a-form-item>
          </div>
          <div class="table-layer">
            <jeepay-text-up :placeholder="'核销单号'" :msg="searchData.orderNo" v-model="searchData.orderNo" />
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.resellerNo" placeholder="请选择核销商">
                <a-select-option v-for="item in reSellerList" :key="item.resellerNo" :value="item.resellerNo">
                  {{ item.resellerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
<!--            核销状态-->
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.orderStatus" placeholder="请选择核销状态">
                <a-select-option v-for="(item, index) in orderStatus" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
<!--            产品类型-->
            <a-form-item class="table-head-layout">
              <a-select v-model="searchData.productType" placeholder="产品类型">
                <a-select-option v-for="(item, index) in productTypeList" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="" class="table-head-layout" style="max-width:250px;min-width:200px">
              <a-range-picker
                @change="onChange"
                v-model="daterange"
              >
              </a-range-picker>
            </a-form-item>

            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="searchFunc" :loading="btnLoading">搜索</a-button>
              <a-button type="primary" style="margin-left: 8px" icon="reload" @click="restFormData">重置</a-button>
              <a-button style="margin-left: 8px; background-color: #CD853F; border: 0; color: white;" @click="gHostCallback">一键回调</a-button>
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
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange  }"
        :scrollX="1100"
        rowKey="id"
      >
        <template slot="orderStatus" slot-scope="{record}">
          <span v-if="record === 'PENDING'">待处理</span>
          <span v-if="record === 'WAITING_PAY'">待匹配</span>
          <span v-if="record === 'MATCHING'">匹配中</span>
          <span v-if="record === 'PAYING'" style="color: orange;">匹配成功</span>
          <span v-if="record === 'RECHARGING'" style="color: green;">充值中</span>
          <span v-if="record === 'FINISH'" style="color: green;">充值完成</span>
          <span v-if="record === 'HANDLE_FINISH'" style="color: green;">手动成功</span>
          <span v-if="record === 'SLEEP'" style="color: pink;">休眠</span>
          <span v-if="record === 'NULLIFY'" style="color: red;">已禁用</span>
          <span v-if="record === 'RECHARGE_FAILED'" style="color: blue;">失败退款</span>
          <span v-if="record === 'HANDLE_FAILED'" style="color: blue;">手动失败</span>
        </template>
        <template slot="opSlot" slot-scope="{record}">
          <a-button size="small" style="background-color: #45EE58; border: 0; color: white; margin-right: 4px;" @click="handleOperation(true, record.id)">手动成功</a-button>
          <a-button size="small" type="primary" @click="handleOperation(false, record.id)">手动失败</a-button>
          <a-button size="small" style="background-color: #CD853F; border: 0; color: white; margin-left: 4px;" @click="detail(record.id)">详情</a-button>
        </template>
      </JeepayTable>
    </a-card>
    <Detail ref="detailInfo"></Detail>
<!--    订单详情-->
    <a-modal
      title="核销订单详情"
      :visible="detailDialog"
      width="880px"
      @cancel="() => { detailDialog = false }"
      cancelText="关闭"
    >
      <a-descriptions bordered size="small">
        <a-descriptions-item label="核销单号">
          {{ orderDetail.orderNo }}
        </a-descriptions-item>
        <a-descriptions-item label="官方单号">
          {{ orderDetail.pretenderOrderNo }}
        </a-descriptions-item>
        <a-descriptions-item label="核销名称">
          {{ orderDetail.resellerName }}
        </a-descriptions-item>
        <a-descriptions-item label="核销回调">
          <template v-if="orderDetail.notifyStatus === 'WAIT_NOTIFY'">
            <span>待回调</span>
          </template>
          <template v-if="orderDetail.notifyStatus === 'NOTIFY_SUCCESS'">
            <span style="color: forestgreen;">已发送</span>
          </template>
          <template v-if="orderDetail.notifyStatus === 'NOTIFY_FAILED'">
            <span style="color: red;">未发送</span>
          </template>
        </a-descriptions-item>
        <a-descriptions-item label="产品类型">
          <a-select v-model="orderDetail.productType"  disabled placeholder="产品类型" default-value="">
            <a-select-option v-for="(item, index) in productTypeList" :key="index" :value="item.value">{{
                item.name
              }}
            </a-select-option>
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ orderDetail.gmtCreate }}
        </a-descriptions-item>
        <a-descriptions-item label="充值账号">
          {{ orderDetail.chargeAccount }}
        </a-descriptions-item>
        <a-descriptions-item label="过期时间">
          {{ orderDetail.gmtExpire }}
        </a-descriptions-item>
        <a-descriptions-item label="订单金额">
          {{ orderDetail.amount }}
        </a-descriptions-item>
        <a-descriptions-item label="匹配时间">
          {{ orderDetail.gmtPayingStart }}
        </a-descriptions-item>
        <a-descriptions-item label="完成时间">
          {{ orderDetail.gmtFinish }}
        </a-descriptions-item>
        <a-descriptions-item label="核销状态">
          <span v-if="orderDetail.orderStatus === 'PENDING'">待处理</span>
          <span v-if="orderDetail.orderStatus === 'WAITING_PAY'">待匹配</span>
          <span v-if="orderDetail.orderStatus === 'MATCHING'">匹配中</span>
          <span v-if="orderDetail.orderStatus === 'PAYING'" style="color: orange;">匹配成功</span>
          <span v-if="orderDetail.orderStatus === 'RECHARGING'" style="color: green;">充值中</span>
          <span v-if="orderDetail.orderStatus === 'FINISH'" style="color: green;">充值完成</span>
          <span v-if="orderDetail.orderStatus === 'HANDLE_FINISH'" style="color: green;">手动成功</span>
          <span v-if="orderDetail.orderStatus === 'SLEEP'" style="color: pink;">休眠</span>
          <span v-if="orderDetail.orderStatus === 'NULLIFY'" style="color: red;">已禁用</span>
          <span v-if="orderDetail.orderStatus === 'RECHARGE_FAILED'" style="color: blue;">失败退款</span>
          <span v-if="orderDetail.orderStatus === 'HANDLE_FAILED'" style="color: blue;">手动失败</span>
        </a-descriptions-item>
        <a-descriptions-item label="商户单号">
          {{ orderDetail.resellerOrderNo }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </page-header-wrapper>
</template>
<script>
import JeepayTable from '../../components/JeepayTable/JeepayTable'
import JeepayTextUp from '../../components/JeepayTextUp/JeepayTextUp' // 文字上移组件
import InfoAddOrEdit from './AddOrEdit'
import Upload from '../../views/reseller/Upload'
import Detail from './Detail'
import { accountList } from '../../api/account'
import { failOrderCallback, getOrdertDetail, getResellerOrderList, orderNotice } from '../../api/resellerOrder'

const tableColumns = [
  { key: 'id', width: '100px', title: '序号', dataIndex: 'id' },
  { key: 'orderNo', width: '200px', title: '核销订单号', dataIndex: 'orderNo' },
  { key: 'matchOutTradeNo', width: '200px', title: '商户单号', dataIndex: 'matchOutTradeNo' },
  { key: 'resellerName', width: '150px', title: '核销商名称', dataIndex: 'resellerName' },
  {
    key: 'productType',
    width: '150px',
    title: '产品类型',
    dataIndex: 'productType',
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
    }
},
  { key: 'chargeAccount', width: '150px', title: '充值账号', dataIndex: 'chargeAccount' },
  {
    key: 'amount',
    width: '150px',
    title: '订单金额',
    dataIndex: 'amount',
    customRender: (text) => {
      if (text) {
        return text / 100
      }
    }
  },
  { key: 'orderStatus', width: '150px', title: '核销状态', dataIndex: 'orderStatus', scopedSlots: { customRender: 'orderStatus' } },
  { key: 'sleepCount', width: '150px', title: '休眠次数', dataIndex: 'sleepCount' },
  { key: 'pretenderOrderNo', width: '180px', title: '官方单号', dataIndex: 'pretenderOrderNo' },
  {
    key: 'notifyStatus',
    width: '180px',
    title: '核销回调',
    dataIndex: 'notifyStatus',
    customRender: (text, record) => {
      if (text) {
        switch (text) {
          case 'WAIT_NOTIFY':
            return '待回调'
          case 'NOTIFY_SUCCESS':
            return '回调成功'
          case 'NOTIFY_FAILED':
            return '回调失败'
        }
      }
    }
  },
  { key: 'gmtCreate', width: '180px', title: '创建时间', dataIndex: 'gmtCreate' },
  { key: 'gmtExpire', width: '180px', title: '过期时间', dataIndex: 'gmtExpire' },
  { key: 'gmtPayingStart', width: '180px', title: '匹配时间', dataIndex: 'gmtPayingStart' },
  { key: 'gmtFinish', width: '180px', title: '完成时间', dataIndex: 'gmtFinish' },
  { key: 'op', title: '操作', width: '260px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

export default {
  name: 'ResellerList',
  components: { JeepayTable, JeepayTextUp, InfoAddOrEdit, Upload, Detail },

  data () {
    return {
      btnLoading: false,
      tableColumns: tableColumns,
      selectedRowKeys: [],
      searchData: {},
      isSuccess: undefined,
      batchManual: {
        isSuccess: undefined,
        resellerOrderIds: []
      },
      reSellerList: [],
      daterange: [],
      detailDialog: false,
      orderDetail: {},
      orderDetailKeys: []
    }
  },
  mounted () {
    this.getReSeller()
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
    onChange (date, dateString) {
      this.searchData.createdStart = dateString[0] // 开始时间
      this.searchData.createdEnd = dateString[1] // 结束时间
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return getResellerOrderList(params)
    },
    searchFunc () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    detailFunc (recordId) { // 业务通用【详情】 函数
      this.$refs.detailInfo.show(recordId)
    },
    // 充值表单
    restFormData () {
      this.searchData = {}
      this.daterange = []
      this.isSuccess = undefined
      this.$nextTick(() => {
        this.searchFunc()
      })
    },
    // 查看详情
    detail (id) {
      getOrdertDetail(id).then(res => {
        this.detailDialog = true
        this.orderDetail = res
        this.orderDetailKeys = Object.keys(this.orderDetail)
      })
    },
  //  手动操作
    handleOperation (status, id) {
      const _params = {
        isSuccess: status,
        resellerOrderIds: [id]
      }
      orderNotice(_params).then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
        this.searchFunc()
      })
    },
    selectChange (value) {
      this.batchManual.isSuccess = (value !== '0');
    },
    batchExecute () {
      // 获取当前页下的所有id
      this.batchManual.resellerOrderIds = this.selectedRowKeys
      orderNotice(this.batchManual).then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
        this.searchFunc()
      })
    },
    // 一键回调
    gHostCallback () {
      failOrderCallback().then(res => {
        if (res.code === 0) {
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
        this.searchFunc()
      })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
  }
}
</script>
