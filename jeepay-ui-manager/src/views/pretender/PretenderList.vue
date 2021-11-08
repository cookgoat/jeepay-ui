<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form-model :model="searchForm" layout="inline" class="table-head-ground" :labelCol="{span:3 }" :wrapperCol="{span: 24 }">
          <a-form-model-item>
            <a-input v-model="searchForm.Certificate" placeholder="cookie"></a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-select v-model="searchForm.bizType" placeholder="产品类型" style="width: 150px;">
              <a-select-option v-for="(item, index) in productTypeList" :key="index" :value="item.value">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-range-picker v-model="datetrange" @change="onChange" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" style="margin-right: 15px;" @click="queryFunc">搜索</a-button>
            <a-button type="primary" @click="resetSearchForm">重置</a-button>
          </a-form-model-item>
        </a-form-model>
        <div style="margin-top: 15px;" class="btn-group">
          <a-button icon="arrow-up" type="primary" @click="addFunc" class="mg-b-30">上传</a-button>
          <a-button icon="arrow-down" type="primary" @click="exportPretender" class="mg-b-30">导出</a-button>
          <a-button icon="plus" type="primary" @click="() => { visible = true }" class="mg-b-30">添加</a-button>
          <a-button type="primary" @click="handlerBatch('close')" class="mg-b-30">全部关闭</a-button>
          <a-button type="primary" @click="handlerBatch('open')" class="mg-b-30">全部开启</a-button>
          <a-select v-model="status" style="width: 150px; margin-right: 15px;" placeholder="批量操作">
            <a-select-option value="UNAVAILABLE">关闭</a-select-option>
            <a-select-option value="AVAILABLE">开启</a-select-option>
          </a-select>
          <a-button type="primary" @click="handlerChangeStatus" class="mg-b-30">执行</a-button>
        </div>
      </div>
      <!-- 列表渲染 -->
      <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :reqTableDataFunc="reqTableDataFunc"
        :rowSelection="{selectedRowKeys: selectRow, onChange: onSelectChange}"
        :tableColumns="tableColumns"
        :searchData="searchForm"
        :scrollX="1100"
        :bordered="true"
        rowKey="id"
      >
        <template slot="id" slot-scope="{record}"><b>{{ record.id.toString() }}</b></template> <!-- 自定义插槽 -->
        <template slot="status" slot-scope="{record}" >
          <a-tag :color="record.status === 'AVAILABLE'?'green':record.status === 'UNAVAILABLE'?'orange':'volcano'">
            {{ record.status === 'AVAILABLE'?'启用':record.status === 'UNAVAILABLE'?'禁用':'未知' }}
          </a-tag>
        </template> <!-- 自定义插槽 -->
        <template slot="gmtCreate" slot-scope="{record}"><b>{{ record.gmtCreate }}</b></template> <!-- 自定义插槽 -->
        <template slot="account" slot-scope="{record}"><b>{{ record.account }}</b></template> <!-- 自定义插槽 -->
        <template slot="chargeAccount" slot-scope="{record}"><b>{{ record.chargeAccount }}</b></template> <!-- 自定义插槽 -->
        <template slot="certificate" slot-scope="{record}"><b>{{ record.certificate }}</b></template> <!-- 自定义插槽 -->
        <template slot="availableCount" slot-scope="{record}"><b>{{ record.availableCount }}</b></template>
        <template slot="failedCount" slot-scope="{record}"><b>{{ record.failedCount }}</b></template>
        <template slot="successCount" slot-scope="{record}"><b>{{ record.successCount }}</b></template>
        <template slot="finishCount" slot-scope="{record}"><b>{{ record.finishCount }}</b></template>
        <template slot="bizType" slot-scope="{record}">
          <b v-if="record.bizType ==='PROPERTY_CREDIT'">资和信</b>
          <b v-if="record.bizType ==='JD'">京东</b>
          <b v-if="record.bizType ==='TEST'">测试业务</b>
        </template>
      </JeepayTable>
    </a-card>
    <Detail ref="detailInfo"></Detail>
    <Upload ref="uploadInfo"></Upload>
<!--    添加小号弹窗-->
    <a-modal
      title="添加"
      :visible="visible"
      @cancel="() => { visible = false }"
      @ok="dialogConfirm"
    >
      <a-form-model
        :model="addForm"
        ref="addForm"
        layout="horizontal"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 14 }"
        :rules="rules"
      >
        <a-form-model-item label="产品类型" prop="bizType">
          <a-select v-model="addForm.bizType" placeholder="业务类型" style="width: 150px;">
            <a-select-option v-for="(item, index) in serviceTypeList" :key="index" :value="item.value">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="cookie" prop="certificate">
          <a-input placeholder="请输入cookie" v-model="addForm.certificate" style="width: 260px;" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </page-header-wrapper>
</template>
<script>
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import JeepayTableColumns from '@/components/JeepayTable/JeepayTableColumns'
import Detail from './Detail'
import Upload from './Upload'
// eslint-disable-next-line camelcase
import { API_URL_PRETENDER_LIST, req } from '@/api/manage'
import * as API_Trumpet from '@/api/trumpet'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment'
import { addTrumpet, batchOperation, exportData } from '../../api/trumpet'
const tableColumns = [
  { key: 'id', width: '80px', title: 'ID', align: 'center', scopedSlots: { customRender: 'id' } },
  { key: 'certificate', width: '220px', title: 'cookie', align: 'center', ellipsis: true, scopedSlots: { customRender: 'certificate' } },
  { key: 'bizType', width: '120px', title: '业务类型', align: 'center', scopedSlots: { customRender: 'bizType' } },
  { key: 'status', width: '80px', title: '状态', align: 'center', scopedSlots: { customRender: 'status' } },
  { key: 'availableCount', width: '80px', title: '可用次数', align: 'center', scopedSlots: { customRender: 'availableCount' } },
  { key: 'failedCount', width: '80px', title: '失败次数', align: 'center', scopedSlots: { customRender: 'failedCount' } },
  { key: 'successCount', width: '80px', title: '成功次数', align: 'center', scopedSlots: { customRender: 'successCount' } },
  { key: 'finishCount', width: '120px', title: '成功订单次数', align: 'center', scopedSlots: { customRender: 'finishCount' } },
  { key: 'gmtCreate', width: '160px', title: '创建日期', align: 'center', scopedSlots: { customRender: 'gmtCreate' } }
]

export default {
  name: 'PretenderList',
  components: { JeepayTable, JeepayTableColumns, Detail, Upload },
  data () {
    return {
      locale,
      btnLoading: false,
      tableColumns: tableColumns,
      searchData: {},
      params: {
        pageNumber: 1,
        pageSize: 10
      },
      searchForm: {
        bizType: undefined,
        Certificate: '',
        createdStart: '',
        createdEnd: ''
      },
      datetrange: [],
      selectRow: [],
      status: undefined,
      visible: false,
      addForm: {
        bizType: 'PROPERTY_CREDIT',
        certificate: undefined
      },
      rules: {
        bizType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        certificate: [
          { required: true, message: '请输入cookie', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    dialogConfirm () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          API_Trumpet.addTrumpet(this.addForm).then(res => {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.searchFunc()
            }
          })
        } else {
          this.$message.error('表单输入有误')
        }
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectRow = selectedRowKeys
    },
    handlerChangeStatus () {
      const params = {
        ids: this.selectRow,
        status: this.status
      }
      API_Trumpet.batchOperation(params).then(res => {
        if (res.code === 0) {
          this.selectRow = []
          this.searchFunc()
        }
      })
    },
    getDataList () {
      API_Trumpet.getTrumpetList(this.params).then(res => {
        console.log(res)
      })
    },
    disabledDate (current) { // 今日之后日期不可选
      return current && current > moment().endOf('day')
    },
    onChange (date, dateString) {
      this.searchForm.createdStart = dateString[0] // 开始时间
      this.searchForm.createdEnd = dateString[1] // 结束时间
    },
    queryFunc () {
      this.btnLoading = true
      this.$refs.infoTable.refTable(true)
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return API_Trumpet.getTrumpetList(params)
    },

    delFunc (recordId) {
      const that = this
      this.$infoBox.confirmDanger('确认删除？', '该操作将删除该账号', () => {
        req.delById(API_URL_PRETENDER_LIST, recordId).then(res => {
          that.$refs.infoTable.refTable(false)
          this.$message.success('删除成功')
        })
      })
    },
    addFunc () { // 业务通用【新增】 函数
      this.$refs.uploadInfo.show()
    },
    searchFunc () { // 点击【查询】按钮点击事件
      this.$refs.infoTable.refTable(true)
    },
    detailFunc: function (recordId) { // 业务通用【详情】 函数
      this.$refs.detailInfo.show(recordId)
    },
    resetSearchForm () {
      this.searchForm = {
        bizType: undefined,
        Certificate: '',
        createdStart: '',
        createdEnd: ''
      }
      this.datetrange = []
      this.$nextTick(() => {
        this.searchFunc()
      })
    },
    // 导出数据
    exportPretender () {
      API_Trumpet.exportData(this.searchForm).then(res => {
        const blob = new Blob([res]);
        const time = new Date().getTime() / 1000
        const fileName = time + '.xls';
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        }
      })
    },
    // 批量关闭，开启
    handlerBatch (type) {
      const ids = this.$refs.infoTable.apiResData.records.map(item => { return item.id })
      const _params = {
        ids,
        status: type === 'close' ? 'UNAVAILABLE' : 'AVAILABLE'
      }
      API_Trumpet.batchOperation(_params).then(res => {
        if (res.code === 0) {
          this.searchFunc()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  .ant-form {
    .ant-form-item {
      margin-right: 15px;
    }
    .ant-form-item:last-child {
      margin-right: 0;
    }
  }
  .btn-group {
    .ant-btn {
      margin-right: 15px;
    }
  }
}

</style>
