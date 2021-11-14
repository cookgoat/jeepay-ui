export default {
  data() {
    return {
      // 产品类型
      productTypeList: [
        {
          value: 'JD_E_CARD',
          name: '京东E卡',
          rate: 'jdECardDiscount'
        },
        {
          value: 'SINOPEC',
          name: '中国石化',
          rate: 'sinopecDiscount'
        },
        {
          value: 'PETRO',
          name: '中国石油',
          rate: 'petroDiscount'
        },
        {
          value: 'CTRIP',
          name: '携程任我行',
          rate: 'ctripDiscount'
        },
        {
          value: 'TEST_PRODUCT',
          name: '测试产品',
          rate: 'testDiscount'
        },
      ],
      // 业务类型
      serviceTypeList: [
        {
          value: 'PROPERTY_CREDIT',
          name: '资和信'
        },
        {
          value: 'JD',
          name: '京东'
        },
        {
          value: 'TEST',
          name: '测试业务'
        },
      ],
      // 核销回调
      writeOffCallback: [
        {
          value: 'WAIT_NOTIFY',
          name: '待回调'
        },
        {
          value: 'NOTIFY_SUCCESS',
          name: '回调成功'
        },
        {
          value: 'NOTIFY_FAILED',
          name: '回调失败'
        }
      ],
      // 订单金额
      moneyList: [
        {
          value: '10000',
          name: '100'
        },
        {
          value: '20000',
          name: '200'
        },
        {
          value: '50000',
          name: '500'
        },
        {
          value: '100000',
          name: '1000'
        },
        {
          value: '200000',
          name: '2000'
        }
      ],
      // 订单状态
      orderStatus: [
        {
          value: 'PENDING',
          name: '待处理'
        },
        {
          value: 'WAITING_PAY',
          name: '待匹配'
        },
        {
          value: 'MATCHING',
          name: '匹配中'
        },
        {
          value: 'PAYING',
          name: '匹配成功'
        },
        {
          value: 'RECHARGING',
          name: '充值中'
        },
        {
          value: 'FINISH',
          name: '充值完成'
        },
        {
          value: 'HANDLE_FINISH',
          name: '手动完成'
        },
        {
          value: 'SLEEP',
          name: '休眠中'
        },
        {
          value: 'NULLIFY',
          name: '禁用'
        },
        {
          value: 'RECHARGE_FAILED',
          name: '失败退款'
        },
        {
          value: 'HANDLE_FAILED',
          name: '手动失败'
        },
      ],
      payStatus: [
        {
          value: 'WAITING_PAY',
          name: '待匹配'
        },
        {
          value: 'MATCHING',
          name: '匹配中'
        },
        {
          value: 'PAYING',
          name: '支付中'
        },
        {
          value: 'RECHARGING',
          name: '充值中'
        },
        {
          value: 'SLEEP',
          name: '休眠'
        },
        {
          value: 'NULLIFY',
          name: '已经作废'
        },
        {
          value: 'OVER_TIME',
          name: '支付超时'
        },
        {
          value: 'REQUEST_FAILED',
          name: '请求失败'
        },
        {
          value: 'FINISH',
          name: '已到账'
        }
      ]
    }
  },
  methods: {
    dateFormat (s) {
      const date = new Date(parseInt(s) * 1000)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    dateFormatMills (s) {
      const date = new Date(parseInt(s))
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
  }
}
