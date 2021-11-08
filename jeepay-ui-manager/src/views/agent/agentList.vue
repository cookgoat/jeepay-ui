<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-button type="primary" @click="openDialog('add', {})">新增代理商</a-button>
      </div>
      <JeepayTable
        @btnLoadClose="btnLoading=false"
        ref="infoTable"
        :initData="true"
        :reqTableDataFunc="reqTableDataFunc"
        :tableColumns="tableColumns"
        :scrollX="1100"
        rowKey="agentNo"
      >
        <template slot="jdECardDiscount" slot-scope="{record}">
          <div v-if="record.productTypes && record.productTypes.includes('JD_E_CARD')">
            <p v-for="(item, index) in record.jdECardDiscount" :key="index" style="margin-bottom: 0;">
              <span v-if="item.amount">
                {{ item.amount }} / {{ item.discount }}
              </span>
            </p>
          </div>
        </template>
        <template slot="ctripDiscount" slot-scope="{record}">
          <div v-if="record.productTypes && record.productTypes.includes('CTRIP')">
            <p v-for="(item, index) in record.ctripDiscount" :key="index" style="margin-bottom: 0;">
              <span v-if="item.amount">
                {{ item.amount }} / {{ item.discount }}
              </span>
            </p>
          </div>
        </template>
        <template slot="petroDiscount" slot-scope="{record}">
          <div v-if="record.productTypes && record.productTypes.includes('PETRO')">
            <p v-for="(item, index) in record.petroDiscount" :key="index" style="margin-bottom: 0;">
              <span v-if="item.amount">
                {{ item.amount }} / {{ item.discount }}
              </span>
            </p>
          </div>
        </template>
        <template slot="sinopecDiscount" slot-scope="{record}">
          <div v-if="record.productTypes && record.productTypes.includes('SINOPEC')">
            <p v-for="(item, index) in record.sinopecDiscount" :key="index" style="margin-bottom: 0;">
              <span v-if="item.amount">
                {{ item.amount }} / {{ item.discount }}
              </span>
            </p>
          </div>
        </template>
        <template slot="testDiscount" slot-scope="{record}">
          <div v-if="record.productTypes && record.productTypes.includes('TEST')">
            <p v-for="(item, index) in record.testDiscount" :key="index" style="margin-bottom: 0;">
              <span v-if="item.amount">
                {{ item.amount }} / {{ item.discount }}
              </span>
            </p>
          </div>
        </template>
        <template slot="status" slot-scope="{record}">
          <span v-if="record === 'ENABLE'" style="color: green;">正常</span>
          <span v-if="record === 'DISABLE'" style="color: red;">禁用</span>
        </template>
        <template slot="opt" slot-scope="{record}">
          <a-button v-if="record.status === 'DISABLE'" style="background-color: green; border: 0; color: white; margin-right: 5px;" size="small" @click="optAgent('ENABLE', record)">启用</a-button>
          <a-button v-if="record.status === 'ENABLE'" style="background-color: red; border: 0; color: white; margin-right: 5px;" size="small" @click="optAgent('DISABLE', record)">禁用</a-button>
          <a-button style="background-color: pink; border: 0; color: white; margin-right: 5px;" size="small" @click="openRateDialog(record)">费率设定</a-button>
          <a-button type="primary" size="small" @click="openDialog('edit', record)">编辑</a-button>
        </template>
      </JeepayTable>
    </a-card>
<!--    添加代理商-->
    <a-modal
      title="添加代理商"
      :visible="addAgentDialog"
      @cancel="closeDialog"
      @ok="addAgentConfirm"
    >
      <a-form-model :model="addAgentForm" ref="addAgentForm" layout="horizontal" :rules="addAgentRules" :labelCol="{ span: 5 }" :wrapperCol="{ span: 16 }">
        <a-form-model-item label="代理商名称" prop="agentName">
          <a-input v-model="addAgentForm.agentName" placeholder="代理商名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="登录账号" prop="loginUserName">
          <a-input v-model="addAgentForm.loginUserName" :disabled="isEdit" placeholder="登录账号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="contactTel">
          <a-input v-model="addAgentForm.contactTel" placeholder="联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="开通产品">
          <a-checkbox-group v-model="addAgentForm.productTypes" :options="defaultProductTypes" />
        </a-form-model-item>
        <a-form-model-item label="信用资金">
          <a-input v-model="addAgentForm.creditAmount" placeholder="信用资金"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
<!--    费率编辑-->
    <a-modal
      title="费率编辑"
      :visible="rateDialog"
      @cancel="closeRateDialog"
      @ok="editRateConfirm"
    >
      <a-form-model :model="rateForm" ref="rateForm" layout="horizontal" :labelCol="{ span: 5 }" :wrapperCol="{ span: 16 }">
        <a-form-model-item label="产品类型">
          <a-select v-model="currentProduct" style="width: 150px;" @change="selectChange">
            <a-select-option v-for="(item, index) in useProduct" :key="index" :value="item.value">
              {{ item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="费率设置" v-if="useProduct && useProduct.length">
          <div v-for="(item, index) in rateForm[useProduct[currentProductIndex].rate]" :key="index">
            <a-input :addon-before="item.amount" v-model="item.discount"></a-input>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import JeepayTable from '../../components/JeepayTable/JeepayTable'
import { addAgent, getAgentDetail, getAgentList, updateAgent } from '../../api/agent'

const tableColumns = [
  { key: 'id', title: '序号', width: '100px', dataIndex: 'id' },
  { key: 'agentName', title: '代理商名称', width: '150px', dataIndex: 'agentName' },
  { key: 'creditAmount', title: '代理商余额', width: '120px', dataIndex: 'creditAmount' },
  {
    key: 'productTypes',
    title: '产品类型',
    width: '100px',
    dataIndex: 'productTypes',
    scopedSlots: { customRender: 'productTypes' },
    customRender: (text) => {
      if (text && text.length) {
        text = text.map(item => {
          switch (item) {
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
            case 'TEST':
              return '测试产品'
          }
        })
        return text.join('/')
      } else {
        return ''
      }
  }
  },
  { key: 'jdECardDiscount', title: 'E卡折扣', width: '120px', scopedSlots: { customRender: 'jdECardDiscount' } },
  { key: 'ctripDiscount', title: '携程卡折扣', width: '120px', scopedSlots: { customRender: 'ctripDiscount' } },
  { key: 'petroDiscount', title: '中石油折扣', width: '120px', scopedSlots: { customRender: 'petroDiscount' } },
  { key: 'sinopecDiscount', title: '中石化折扣', width: '120px', scopedSlots: { customRender: 'sinopecDiscount' } },
  { key: 'testDiscount', title: '测试产品折扣', width: '120px', scopedSlots: { customRender: 'testDiscount' } },
  {
    key: 'status',
    title: '状态',
    width: '100px',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    key: 'opt',
    title: '状态',
    width: '230px',
    fixed: 'right',
    scopedSlots: { customRender: 'opt' },
  },

]
export default {
  name: 'AgentList',
  components: {
    JeepayTable
  },
  data () {
    return {
      btnLoading: false,
      tableColumns,
      addAgentDialog: false,
      isEdit: false,
      addAgentForm: {
        agentName: undefined,
        loginUserName: 123456,
        contactTel: undefined,
        productTypes: [],
        creditAmount: undefined,
        jdECardDiscount: [
          {
            amount: 100,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 200,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 500,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'JD_E_CARD',
            discount: 0
          }
        ],
        ctripDiscount: [
          {
            amount: 100,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 200,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 500,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'CTRIP',
            discount: 0
          },
        ],
        sinopecDiscount: [
          {
            amount: 100,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 200,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 500,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'SINOPEC',
            discount: 0
          },
        ],
        petroDiscount: [
          {
            amount: 100,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 200,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 500,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'petroDiscount',
            discount: 0
          },
        ],
        testDiscount: [
          {
            amount: 100,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 200,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 500,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'TEST',
            discount: 0
          },
        ]
      },
      defaultProductTypes: [],
      addAgentRules: {
        agentName: [
          { required: true, message: '请输入代理商名称', trigger: 'blur' }
        ],
        loginUserName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '请输入联系电话', triggrt: 'blur' }
        ]
      },
      rateForm: {

      },
      rateDialog: false,
      useProduct: [],
      currentProduct: '',
      currentProductIndex: 0
    }
  },
  mounted () {
    this.productTypeList.forEach(item => {
      item['label'] = item['name']
      this.defaultProductTypes.push(item)
    })
  },
  methods: {
    openDialog (type, record) {
      this.isEdit = type === 'edit'
      if (this.isEdit) {
        for (const i in this.addAgentForm) {
          if (record[i]) {
            this.addAgentForm[i] = record[i]
          }
        }
        this.addAgentForm['id'] = record.id
      }
      this.addAgentDialog = true
    },
    closeDialog () {
      this.addAgentDialog = false
      this.addAgentForm = {
        agentName: undefined,
        loginUserName: 123456,
        contactTel: undefined,
        productTypes: [],
        creditAmount: undefined,
        jdECardDiscount: [
          {
            amount: 100,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 200,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 500,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'JD_E_CARD',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'JD_E_CARD',
            discount: 0
          }
        ],
        ctripDiscount: [
          {
            amount: 100,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 200,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 500,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'CTRIP',
            discount: 0
          },
        ],
        sinopecDiscount: [
          {
            amount: 100,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 200,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 500,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'SINOPEC',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'SINOPEC',
            discount: 0
          },
        ],
        petroDiscount: [
          {
            amount: 100,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 200,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 500,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'petroDiscount',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'petroDiscount',
            discount: 0
          },
        ],
        testDiscount: [
          {
            amount: 100,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 200,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 500,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'TEST',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'TEST',
            discount: 0
          },
        ]
      }
    },
    reqTableDataFunc (params) {
      return getAgentList(params)
    },
    addAgentConfirm () {
      this.$refs.addAgentForm.validate((validate) => {
        if (validate) {
          if (!this.isEdit) {
            addAgent(this.addAgentForm).then(res => {
              if (res.code === 0) {
                this.$message.success('添加成功')
                this.$refs.infoTable.refTable(true)
              } else {
                this.$message.error('添加失败')
                this.$refs.infoTable.refTable(true)
              }
            })
          } else {
            updateAgent(this.addAgentForm.id, this.addAgentForm).then(res => {
              if (res.code === 0) {
                this.$message.success('修改成功')
                this.$refs.infoTable.refTable(true)
              } else {
                this.$message.error('修改失败')
                this.$refs.infoTable.refTable(true)
              }
            })
          }
          this.addAgentDialog = false
        } else {
          this.$message.error('请检查表单输入')
        }
      })
    },
    // 禁用/启用
    optAgent (type, record) {
      record['status'] = type
      updateAgent(record.id, record).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
        this.$refs.infoTable.refTable(true)
      })
    },

    // 费率弹窗
    openRateDialog (record) {
      this.rateForm = record
      this.productTypeList.forEach(item => {
        if (record.productTypes.includes(item.value)) {
          this.useProduct.push(item)
          if (this.useProduct && this.useProduct.length) {
            this.currentProduct = this.useProduct[0].value
          }
        }
      })
      this.rateDialog = true
    },
    closeRateDialog () {
      this.$refs.infoTable.refTable(true)
      this.rateDialog = false
    },
    selectChange (value) {
      this.useProduct.forEach((item, index) => {
        if (item.value === value) {
          this.currentProductIndex = index
        }
      })
    },
    editRateConfirm () {
      try {
        this.rateForm.jdECardDiscount && this.rateForm.jdECardDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
        this.rateForm.sinopecDiscount && this.rateForm.sinopecDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
        this.rateForm.petroDiscount && this.rateForm.petroDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
        this.rateForm.ctripDiscount && this.rateForm.ctripDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
      } catch (e) {
        this.$message.error('输入的费率需要大于0小于1')
      }
      updateAgent(this.rateForm.id, this.rateForm).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
        this.rateDialog = false
        this.$refs.infoTable.refTable(true)
      })
    }
  }
}
</script>

<style scoped>

</style>
