<template>
  <page-header-wrapper>
    <div id="chart-card">
      <div class="chart-data user-greet" style="margin-top: 20px">
        <a-button icon="plus" type="primary" @click="openAddDialog('add', {})" class="mg-b-30">新增核销商户</a-button>
        <!-- 列表渲染 -->
        <JeepayTable
            @btnLoadClose="btnLoading=false"
            ref="infoTable"
            :initData="true"
            :reqTableDataFunc="reqTableDataFunc"
            :tableColumns="tableColumns"
            :scrollX="1100"
            rowKey="id"
        >
          <template slot="id" slot-scope="{record}"><b>{{ record.id.toString() }}</b></template>
          <template slot="resellerName" slot-scope="{record}"><b>{{ record.resellerName }}</b></template>
          <template slot="proxyReseller" slot-scope="{record}"><b>{{ record.proxyReseller }}</b></template>
          <template slot="resellerNo" slot-scope="{record}"><b>{{ record.resellerNo }}</b></template>
          <template slot="status" slot-scope="{record}">
            <a-tag :color="record.status === 'ENABLE'?'green':record.status === 'UNABLE'?'orange':'volcano'">
              {{ record.status === 'ENABLE' ? '启用' : record.status === 'DISABLE' ? '禁用' : '未知' }}
            </a-tag>
          </template>
          <template slot="jdECardDiscount" slot-scope="{record}">
            <div v-if="record.productTypes && record.productTypes.includes('JD_E_CARD')">
              <p v-for="(item, index) in record.jdECardDiscount" :key="index" style="margin-bottom: 0;">
                <span v-if="item.amount">
                  {{ item.amount }}/{{ item.discount }}
                </span>
              </p>
            </div>
          </template>
          <template slot="ctripDiscount" slot-scope="{record}">
            <div v-if="record.productTypes && record.productTypes.includes('CTRIP')">
              <p v-for="(item, index) in record.ctripDiscount" :key="index" style="margin-bottom: 0;">
                <span v-if="item.amount">
                  {{ item.amount }}/{{ item.discount }}
                </span>
              </p>
            </div>
          </template>
          <template slot="sinopecDiscount" slot-scope="{record}">
            <div v-if="record.productTypes && record.productTypes.includes('SINOPEC')">
              <p v-for="(item, index) in record.sinopecDiscount" :key="index" style="margin-bottom: 0;">
                <span v-if="item.amount">
                  {{ item.amount }}/{{ item.discount }}
                </span>
              </p>
            </div>
          </template>
          <template slot="petroDiscount" slot-scope="{record}">
            <div v-if="record.productTypes && record.productTypes.includes('PETRO')">
              <p v-for="(item, index) in record.petroDiscount" :key="index" style="margin-bottom: 0;">
                <span v-if="item.amount">
                  {{ item.amount }}/{{ item.discount }}
                </span>
              </p>
            </div>
          </template>
          <template slot="privateKey" slot-scope="{record}">
            <b>{{ record.privateKey }}</b>
          </template>
          <template slot="priority" slot-scope="{record}"><b>{{ record.priority }}</b></template>
          <template slot="opSlot" slot-scope="{record}">
            <div style="display: flex; justify-content: space-between;">
              <a-button type="danger" v-if="record.status === 'ENABLE'" size="small" @click="updateFunc('DISABLE', record)">禁用</a-button>
              <a-button style="background-color: #45EE58; color: white; border: 0;" v-if="record.status === 'DISABLE'" size="small" @click="updateFunc('ENABLE', record)">启用</a-button>
              <a-button type="primary" size="small" @click="openAddDialog('edit', record)">编辑</a-button>
              <a-button type="primary" size="small" @click="openAddWriteOffDialog(record)">手动添加</a-button>
              <a-button type="primary" size="small" @click="openSetRateDialog(record)">费率设定</a-button>
            </div>

          </template>
        </JeepayTable>
      </div>
    </div>
<!--    新增核销商户-->
    <a-modal
        :title="isEdit ? '编辑核销商户' : '新增核销商户'"
        :visible="addAccountDialog"
        width="650px"
        @cancel="closeDialog"
        @ok="saveAccount"
    >
      <a-form-model :model="addForm" ref="addForm" layout="horizontal" :rules="addFormRules" :labelCol="{ span: 5 }" :wrapperCol="{ span: 16 }">
        <a-form-model-item label="商户名称" prop="resellerName">
          <a-input v-model="addForm.resellerName" placeholder="请输入商户名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="登录账号" prop="loginUserName" v-if="!isEdit">
          <a-input v-model="addForm.loginUserName" placeholder="请输入登录账号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="contactTel">
          <a-input v-model="addForm.contactTel" placeholder="请输入联系电话" :disabled="isEdit"></a-input>
        </a-form-model-item>
        <a-form-model-item label="商户密钥" prop="privateKey">
          <a-input v-model="addForm.privateKey" placeholder="请生成密钥" disabled style="width: 300px; margin-right: 5px;"></a-input>
          <a-button type="primary" @click="generatorKey">生成密钥</a-button>
        </a-form-model-item>
        <a-form-model-item label="业务类型" prop="productTypes">
          <a-checkbox-group v-model="addForm.productTypes" :options="defaultCheckedOption" :default-value="addForm.productTypes"></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="权重">
          <a-input v-model="addForm.priority" placeholder="值越大，优先匹配订单"></a-input>
        </a-form-model-item>
        <a-form-model-item label="授信金额" prop="creditAmount">
          <a-input v-model="addForm.creditAmount"></a-input>
        </a-form-model-item>
        <a-form-model-item label="绑定核销商">
          <a-select v-model="addForm.proxyReseller" placeholder="请选择核销商" @change="handlerSelect">
            <a-select-option v-for="item in writeOffOperatorList" :key="item.id" :value="item.agentNo">{{ item.agentName }}</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
<!--    手动添加核销订单-->
    <a-modal
      title="手动添加核销订单"
      :visible="addWriteOffOrderDialog"
      @cancel="() => { addWriteOffOrderDialog = false }"
      @ok="confirmSubmit"
    >
      <a-form-model
        :model="addWriteOffOrderForm"
        ref="addWriteOffOrderForm"
        :rules="addWriteOffOrderFormRules"
        layout="horizontal"
        :labelCol="{ span: 5 }"
        :wrapperCol="{ span: 15 }"
      >
        <a-form-model-item label="子核销名称">
          <a-input v-model="addWriteOffOrderForm.queryFlag" placeholder="没有则填写0"></a-input>
        </a-form-model-item>
        <a-form-model-item label="充值账号" prop="chargeAccount">
          <a-input v-model="addWriteOffOrderForm.chargeAccount" placeholder="请输入充值账号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="订单金额" prop="amount">
          <a-select v-model="addWriteOffOrderForm.amount" placeholder="请选择订单金额" style="width: 150px;">
            <a-select-option v-for="(item, index) in moneyList" :key="index" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="产品类型" prop="productType">
          <a-select v-model="addWriteOffOrderForm.productType"  placeholder="请选择产品类型">
            <a-select-option v-for="(item, index) in productTypeList" :key="index" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
<!--    费率设定-->
    <a-modal
      title="费率设定"
      width="600px"
      :visible="rateDialog"
      @cancel="() => { rateDialog = false; searchFunc() }"
      @ok="rateConfirm"
    >
      <a-form :model="editRateForm" ref="editRate" layout="horizontal" :labelCol="{ span: 5 }" :wrapperCol="{ span: 16 }">
        <a-form-item label="产品类型">
          <a-select v-model="currentSelectProduct" :default-value="currentSelectProduct" @change="selectProductChange">
            <a-select-option v-for="(item, index) in useSetProductTypes" :key="index" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="费率" v-if="useSetProductTypes && useSetProductTypes.length">
          <div class="rate-input" v-for="(item, index) in editRateForm[useSetProductTypes[currentSelectProductIndex]['rate']]" :key="index">
            <a-input :addonBefore="item.amount" v-model="item.discount"></a-input>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>
<script>
import * as API_Account from '@/api/account'
import JeepayTable from '@/components/JeepayTable/JeepayTable'
import { generatorSecretKey } from '@/utils/util'
import { writeOffAgentList } from '../../../api/account'

const tableColumns = [
  { key: 'id', width: '80px', fixed: 'left', title: '序号', scopedSlots: { customRender: 'id' } },
  { key: 'resellerName', width: '120px', title: '商户名称', scopedSlots: { customRender: 'resellerName' } },
  { key: 'proxyReseller', width: '220px', title: '代理商', scopedSlots: { customRender: 'proxyReseller' } },
  { key: 'resellerNo', width: '210px', title: '商户号', scopedSlots: { customRender: 'resellerNo' } },
  {
    key: 'productTypes',
    width: '140px',
    title: '产品类型',
    dataIndex: 'productTypes',
    scopedSlots: { customRender: 'productTypes' },
    customRender: (text, record) => {
      if (text) {
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
  { key: 'privateKey', width: '200px', title: '密钥', scopedSlots: { customRender: 'privateKey' } },
  {
    key: 'jdECardDiscount',
    title: 'E卡折扣',
    scopedSlots: { customRender: 'jdECardDiscount' },
    width: '100px'
  },
  {
    key: 'ctripDiscount',
    title: '携程卡折扣',
    scopedSlots: { customRender: 'ctripDiscount' },
    width: '120px',
  },
  {
    key: 'sinopecDiscount',
    title: '石化折扣',
    scopedSlots: { customRender: 'sinopecDiscount' },
    width: '100px',
  },
  {
    key: 'petroDiscount',
    title: '石油折扣',
    scopedSlots: { customRender: 'petroDiscount' },
    width: '100px',
  },
  { key: 'status', width: '80px', title: '状态', scopedSlots: { customRender: 'status' } },
  { key: 'priority', width: '80px', title: '权重', scopedSlots: { customRender: 'priority' } },

  { key: 'op', title: '操作', width: '300px', fixed: 'right', align: 'center', scopedSlots: { customRender: 'opSlot' } }
]

export default {
  name: 'PretenderList',
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { JeepayTable },
  data () {
    return {
      btnLoading: false,
      tableColumns: tableColumns,
      defaultCheckedOption: [],
      addForm: {
        resellerName: undefined,
        loginUserName: undefined,
        contactTel: undefined,
        privateKey: undefined,
        productTypes: [],
        priority: undefined,
        proxyResellerName: undefined,
        proxyReseller: undefined,
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
            amount: 100,
            productType: 'CTRIP',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'CTRIP',
            discount: 0
          }
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
            productType: 'PETRO',
            discount: 0
          },
          {
            amount: 200,
            productType: 'PETRO',
            discount: 0
          },
          {
            amount: 500,
            productType: 'PETRO',
            discount: 0
          },
          {
            amount: 1000,
            productType: 'PETRO',
            discount: 0
          },
          {
            amount: 2000,
            productType: 'PETRO',
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
      addAccountDialog: false,
      addFormRules: {
        resellerName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        loginUserName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        privateKey: [
          { required: true, message: '请输入商户密钥', trigger: 'blur' }
        ],
        productTypes: [
          { required: true, message: '请勾选产品', trigger: 'blur' }
        ],
        creditAmount: [
          { required: true, message: '请输入授信金额', trigger: 'blur' }
        ]
      },
      writeOffOperatorList: [],
      isEdit: false,
      // 添加核销订单
      addWriteOffOrderForm: {
        queryFlag: undefined,
        chargeAccount: undefined,
        amount: undefined,
        resellerNo: '',
        productType: undefined,
      },
      addWriteOffOrderFormRules: {
        chargeAccount: [
          { required: true, message: '请输入充值账号', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请选择充值金额', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ]
      },
      addWriteOffOrderDialog: false,
      rateDialog: false,
      useSetProductTypes: [],
      editRateForm: {},
      currentSelectProduct: '',
      currentSelectProductIndex: 0
    }
  },
  mounted () {
    this.productTypeList.forEach((item, index) => {
      const _item = {}
      _item['label'] = item.name
      _item['value'] = item.value
      this.defaultCheckedOption.splice(index, 0, _item)
    })
  },
  methods: {
    // 打开设置费率弹窗
    openSetRateDialog (record) {
      this.editRateForm = record
      this.useSetProductTypes = []

      this.productTypeList.forEach(item => {
        if (record.productTypes.indexOf(item.value) !== -1) {
          this.useSetProductTypes.push(item)
        }
      })
      if (this.useSetProductTypes && this.useSetProductTypes.length) {
        this.currentSelectProduct = this.useSetProductTypes[0].value
        this.currentSelectProductIndex = 0
      }
      this.rateDialog = true
    },
    selectProductChange (value) {
      this.useSetProductTypes.forEach((item, index) => {
        if (item.value === value) {
          this.currentSelectProductIndex = index
        }
      })
    },

    rateConfirm () {
      try {
        this.editRateForm.jdECardDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
        this.editRateForm.sinopecDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
        this.editRateForm.petroDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
        this.editRateForm.ctripDiscount.forEach(item => {
          if (item.discount < 0 || item.discount > 1) {
            throw Error()
          }
        })
      } catch (e) {
        this.$message.error('输入的费率需要大于0小于1')
      }
      API_Account.updateAccount(this.editRateForm.id, this.editRateForm).then(res => {
        if (res.code === 0) {
          this.rateDialog = false
          this.$message.success('修改成功')
          this.$refs.infoTable.refTable(true)
        }
      })
    },
    // 生成商户密钥
    generatorKey () {
      this.addForm.privateKey = generatorSecretKey()
    },
    openAddDialog (type, record) {
      this.isEdit = type === 'edit'
      if (this.isEdit) {
        for (const k in this.addForm) {
          if (record[k]) {
            this.addForm[k] = record[k]
          }
        }
        this.addForm['id'] = record['id']
      }
      writeOffAgentList().then(res => {
        this.writeOffOperatorList = res.records
      })
      this.addAccountDialog = true
    },
    // 关闭弹窗
    closeDialog () {
      this.addAccountDialog = false
      this.addForm = {
        resellerName: undefined,
        loginUserName: undefined,
        contactTel: undefined,
        privateKey: undefined,
        productTypes: [],
        priority: undefined,
        proxyResellerName: undefined,
        proxyReseller: undefined,
        creditAmount: undefined,
        jdECardDiscount: [
        {
          amount: '',
          productType: 'JD_E_CARD',
          discount: ''
        }
      ],
        sinopecDiscount: [
        {
          amount: '',
          productType: 'SINOPEC',
          discount: ''
        }
      ],
        petroDiscount: [
        {
          amount: '',
          productType: 'PETRO',
          discount: ''
        }
      ],
        ctripDiscount: [
        {
          amount: '',
          productType: 'CTRIP',
          discount: ''
        }
      ]
      }
    },

    saveAccount () {
      this.$refs.addForm.validate((validate) => {
        if (validate) {
          if (this.isEdit) {
            API_Account.updateAccount(this.addForm.id, this.addForm).then(res => {
              if (res.code === 0) {
                this.addAccountDialog = false
                this.$message.success('修改成功')
                this.$refs.infoTable.refTable(true)
              }
            })
          } else {
            API_Account.addAccount(this.addForm).then(res => {
              if (res.code === 0) {
                this.addAccountDialog = false
                this.$message.success('添加成功')
                this.$refs.infoTable.refTable(true)
              } else {
                this.$message.error('添加失败')
              }
            })
          }
        } else {
          this.$message.error('请检查表单')
        }
      })
    },

    // 代理商切换方法
    handlerSelect (value,) {
      this.addForm.proxyResellerName = this.writeOffOperatorList.filter(item => { return item.agentNo === value })[0].proxyResellerName
    },

    // 打开手动添加核销订单弹窗
    openAddWriteOffDialog (record) {
      this.addWriteOffOrderForm.resellerNo = record.resellerNo
      this.addWriteOffOrderDialog = true
    },

    confirmSubmit () {
      this.$refs.addWriteOffOrderForm.validate((validate) => {
        if (validate) {
          API_Account.addWriteOffOrder(this.addWriteOffOrderForm).then(res => {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.addWriteOffOrderDialog = false
            } else {
              this.$message.error('添加失败')
              this.addWriteOffOrderDialog = false
            }
            this.$refs.addWriteOffOrderForm.resetFields()
          }).catch(() => {
            this.addWriteOffOrderDialog = false
            this.$refs.addWriteOffOrderForm.resetFields()
          })
        } else {
          this.$message.error('请检查表单')
        }
      })
    },
    // 请求table接口数据
    reqTableDataFunc: (params) => {
      return API_Account.accountList(params)
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
    updateFunc (type, record) { // 业务通用【详情】 函数
      if (type === 'DISABLE') {
        record['status'] = 'DISABLE'
        API_Account.updateAccount(record.id, record).then(res => {
          if (res.code === 0 && res.msg === 'SUCCESS') {
            this.$message.success('操作成功')
            this.$refs.infoTable.refTable(true)
          }
        })
      } else if (type === 'ENABLE') {
        record['status'] = 'ENABLE'
        API_Account.updateAccount(record.id, record).then(res => {
          if (res.code === 0 && res.msg === 'SUCCESS') {
            this.$message.success('操作成功')
            this.$refs.infoTable.refTable(true)
          }
        })
      }
    },
    productFunc: function (resellerNo) { // 业务通用【产品】 函数
      this.$refs.infoProduct.show(resellerNo)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../views/dashboard/index.less'; // 响应式布局
.user-greet {
  font-size: 19px;
  font-weight: 500;

  .quick-start {
    box-sizing: border-box;
    padding-top: 20px;

    .quick-start-title {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      margin-bottom: 0;
    }

    .quick-start-ul {
      font-size: 13px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      padding: 0;
      margin-bottom: 0;

      li {
        margin-right: 20px;
        margin-top: 10px;
        text-align: left;

        :hover {
          color: @jee-inside-link
        }
      }

      li:hover {
        cursor: pointer;
      }
    }
  }
}

.chart-padding {
  box-sizing: border-box;
  padding: 0 5px;
  width: 300px;
}

.user-greet-title {
  box-sizing: border-box;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;

  .user-greet-all {
    display: flex;
    flex-direction: row;

    .user-greet-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      background: #ddd;
      margin-right: 10px;

      img {
        width: 60px;
        height: 60px;
        border: 1px solid rgba(0, 0, 0, 0.08)
      }
    }

    .user-greet-all {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}

.analy-title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  align-items: center;
}

.there-spot:hover {
  cursor: pointer;
}

.ant-calendar-picker-input {
  border: none !important
}

.payAmountSpan {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}

.chart-data {
  padding: 20px;
  box-sizing: border-box;
}

.top-left {

  .chart-data {
    padding: 0;
  }
}

.pay-amount-text {
  display: flex;
  padding: 0 20px 0 16px;
  box-sizing: border-box;
  height: 33px;
  line-height: 33px;
  align-items: baseline;
  margin-bottom: 10px;

  .pay-amount {
    font-size: 33px;
    margin-right: 10px;
  }
}

.pay-count-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .pay-count-date {
    display: flex;
    justify-content: space-around;
  }
}

.chart-padding {
  box-sizing: border-box;
  max-width: 330px;
  min-width: 260px;
  flex-grow: 1;
  flex-shrink: 1;
  margin-bottom: 20px;
}

.change-date-layout {
  padding-left: 11px;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .change-date-icon {
    width: 50px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.chart-title {
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
