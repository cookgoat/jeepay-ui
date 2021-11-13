<template>
  <div class="main-page">
    <div class="jd">
      <div style="width: 35%; margin-right: 15px;">
        <a-table
            :columns="JDOrderColumn"
            :data-source="JDOrderData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 50%; margin-right: 15px;">
        <a-table
            :columns="JDSuperveneColumn"
            :data-source="JDSuperveneData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 15%;">
        <a-table
            :columns="JDTrumpetColumn"
            :data-source="JDTrumpetData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
    </div>
    <div class="xc">
      <div style="width: 35%; margin-right: 15px;">
        <a-table
            :columns="CTRIPOrderColumn"
            :data-source="CTRIPOrderData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 50%; margin-right: 15px;">
        <a-table
            :columns="CTRIPSuperveneColumn"
            :data-source="CTRIPSuperveneData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 15%;">
        <a-table
            :columns="CTRIPTrumpetColumn"
            :data-source="CTRIPTrumpetData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
    </div>
    <div class="sy">
      <div style="width: 35%; margin-right: 15px;">
        <a-table
            :columns="PETROOrderColumn"
            :data-source="PETROOrderData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 50%; margin-right: 15px;">
        <a-table
            :columns="PETROSuperveneColumn"
            :data-source="PETROSuperveneData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 15%;">
        <a-table
            :columns="PETROTrumpetColumn"
            :data-source="PETROTrumpetData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
    </div>
    <div class="sh">
      <div style="width: 35%; margin-right: 15px;">
        <a-table
            :columns="SINOPECOrderColumn"
            :data-source="SINOPECOrderData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 50%; margin-right: 15px;">
        <a-table
            :columns="SINOPECSuperveneColumn"
            :data-source="SINOPECSuperveneData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
      <div style="width: 15%;">
        <a-table
            :columns="SINOPECTrumpetColumn"
            :data-source="SINOPECTrumpetData"
            bordered
            size="small"
            :pagination="false"
            :rowClassName="rowClassName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderOverallResellerCount, trumpetCount, superveneCount } from '../../api/home'
const JDOrderColumn = [
  {
    title: '京东E卡',
    className: 'jd-header',
    children: [
      {
        title: '金额',
        dataIndex: 'faceAmount',
        key: 'faceAmount',
        width: 95,
        align: 'center'
      },
      {
        title: '总数',
        dataIndex: 'allCount',
        key: 'allCount',
        width: 70,
        align: 'center'
      },
      {
        title: '总金额',
        dataIndex: 'allAmount',
        key: 'allAmount',
        width: 120,
        align: 'center'
      },
      {
        title: '支付中',
        dataIndex: 'payingCount',
        key: 'payingCount',
        width: 100,
        align: 'center'
      },
      {
        title: '休眠中',
        dataIndex: 'sleepCount',
        key: 'sleepCount',
        width: 110,
        align: 'center'
      },
      {
        title: '实际可用',
        dataIndex: 'pendingCount',
        key: 'pendingCount',
        width: 120,
        align: 'center'
      }
    ],
  }
];
const CTRIPOrderColumn = [
  {
    title: '携程卡',
    className: 'ctrip-header',
    children: [
      {
        title: '金额',
        dataIndex: 'faceAmount',
        key: 'faceAmount',
        width: 95,
        align: 'center'
      },
      {
        title: '总数',
        dataIndex: 'allCount',
        key: 'allCount',
        width: 70,
        align: 'center'
      },
      {
        title: '总金额',
        dataIndex: 'allAmount',
        key: 'allAmount',
        width: 120,
        align: 'center'
      },
      {
        title: '支付中',
        dataIndex: 'payingCount',
        key: 'payingCount',
        width: 110,
        align: 'center'
      },
      {
        title: '休眠中',
        dataIndex: 'sleepCount',
        key: 'sleepCount',
        width: 110,
        align: 'center'
      },
      {
        title: '实际可用',
        dataIndex: 'pendingCount',
        key: 'pendingCount',
        width: 120,
        align: 'center'
      }
    ],
  }
];
const SINOPECOrderColumn = [
  {
    title: '中石化',
    className: 'sinopec-header',
    children: [
      {
        title: '金额',
        dataIndex: 'faceAmount',
        key: 'faceAmount',
        width: 95,
        align: 'center'
      },
      {
        title: '总数',
        dataIndex: 'allCount',
        key: 'allCount',
        width: 70,
        align: 'center'
      },
      {
        title: '总金额',
        dataIndex: 'allAmount',
        key: 'allAmount',
        width: 120,
        align: 'center'
      },
      {
        title: '支付中',
        dataIndex: 'payingCount',
        key: 'payingCount',
        width: 110,
        align: 'center'
      },
      {
        title: '休眠中',
        dataIndex: 'sleepCount',
        key: 'sleepCount',
        width: 110,
        align: 'center'
      },
      {
        title: '实际可用',
        dataIndex: 'pendingCount',
        key: 'pendingCount',
        width: 120,
        align: 'center'
      }
    ],
  }
];
const PETROOrderColumn = [
  {
    title: '中石油',
    className: 'petro-header',
    children: [
      {
        title: '金额',
        dataIndex: 'faceAmount',
        key: 'faceAmount',
        width: 95,
        align: 'center'
      },
      {
        title: '总数',
        dataIndex: 'allCount',
        key: 'allCount',
        width: 70,
        align: 'center'
      },
      {
        title: '总金额',
        dataIndex: 'allAmount',
        key: 'allAmount',
        width: 120,
        align: 'center'
      },
      {
        title: '支付中',
        dataIndex: 'payingCount',
        key: 'payingCount',
        width: 110,
        align: 'center'
      },
      {
        title: '休眠中',
        dataIndex: 'sleepCount',
        key: 'sleepCount',
        width: 110,
        align: 'center'
      },
      {
        title: '实际可用',
        dataIndex: 'finishCount',
        key: 'finishCount',
        width: 120,
        align: 'center'
      }
    ],
  }
];
const JDSuperveneColumn = [
  {
    title: '金额',
    className: 'jd-header',
    align: 'center',
    children: [
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 95,
        align: 'center'
      }
    ]
  },
  {
    title: '一分钟并发',
    className: 'jd-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'inOrderCount',
        key: 'inOrderCount',
        width: 70,
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'matchSuccessRate',
        key: 'matchSuccessRate',
        width: 70,
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'paySuccessRate',
        key: 'paySuccessRate',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '30分钟并发',
    className: 'jd-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'thirty_inOrderCount',
        key: 'thirty_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'thirty_matchSuccessRate',
        key: 'thirty_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'thirty_paySuccessRate',
        key: 'thirty_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  },
  {
    title: '今日并发',
    className: 'jd-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'today_inOrderCount',
        key: 'today_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'today_matchSuccessRate',
        key: 'today_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'today_paySuccessRate',
        key: 'today_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  }
];
const CTRIPSuperveneColumn = [
  {
    title: '金额',
    className: 'ctrip-header',
    align: 'center',
    children: [
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 95,
        align: 'center'
      }
    ]
  },
  {
    title: '一分钟并发',
    className: 'ctrip-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'inOrderCount',
        key: 'inOrderCount',
        width: 70,
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'matchSuccessRate',
        key: 'matchSuccessRate',
        width: 70,
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'paySuccessRate',
        key: 'paySuccessRate',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '30分钟并发',
    className: 'ctrip-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'thirty_inOrderCount',
        key: 'thirty_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'thirty_matchSuccessRate',
        key: 'thirty_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'thirty_paySuccessRate',
        key: 'thirty_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  },
  {
    title: '今日并发',
    className: 'ctrip-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'today_inOrderCount',
        key: 'today_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'today_matchSuccessRate',
        key: 'today_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'today_paySuccessRate',
        key: 'today_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  }
];
const SINOPECSuperveneColumn = [
  {
    title: '金额',
    className: 'sinopec-header',
    align: 'center',
    children: [
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 95,
        align: 'center'
      }
    ]
  },
  {
    title: '一分钟并发',
    className: 'sinopec-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'inOrderCount',
        key: 'inOrderCount',
        width: 70,
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'matchSuccessRate',
        key: 'matchSuccessRate',
        width: 70,
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'paySuccessRate',
        key: 'paySuccessRate',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '30分钟并发',
    className: 'sinopec-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'thirty_inOrderCount',
        key: 'thirty_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'thirty_matchSuccessRate',
        key: 'thirty_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'thirty_paySuccessRate',
        key: 'thirty_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  },
  {
    title: '今日并发',
    className: 'sinopec-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'today_inOrderCount',
        key: 'today_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'today_matchSuccessRate',
        key: 'today_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'today_paySuccessRate',
        key: 'today_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  }
];
const PETROSuperveneColumn = [
  {
    title: '金额',
    className: 'petro-header',
    align: 'center',
    children: [
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 95,
        align: 'center'
      }
    ]
  },
  {
    title: '一分钟并发',
    className: 'petro-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'inOrderCount',
        key: 'inOrderCount',
        width: 70,
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'matchSuccessRate',
        key: 'matchSuccessRate',
        width: 70,
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'paySuccessRate',
        key: 'paySuccessRate',
        width: 70,
        align: 'center'
      }
    ]
  },
  {
    title: '30分钟并发',
    className: 'petro-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'thirty_inOrderCount',
        key: 'thirty_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'thirty_matchSuccessRate',
        key: 'thirty_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'thirty_paySuccessRate',
        key: 'thirty_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  },
  {
    title: '今日并发',
    className: 'petro-header',
    children: [
      {
        title: '进单量',
        dataIndex: 'today_inOrderCount',
        key: 'today_inOrderCount',
        width: '70px',
        align: 'center'
      },
      {
        title: '匹配率',
        dataIndex: 'today_matchSuccessRate',
        key: 'today_matchSuccessRate',
        width: '70px',
        align: 'center'
      },
      {
        title: '付款率',
        dataIndex: 'today_paySuccessRate',
        key: 'today_paySuccessRate',
        width: '70px',
        align: 'center'
      }
    ]
  }
];
const JDTrumpetColumn = [
  {
    title: '小号',
    className: 'jd-header',
    align: 'center',
    children: [
      {
        title: '正常小号个数',
        dataIndex: 'enableCount',
        key: 'enableCount',
        width: 70,
        align: 'center'
      },
      {
        title: '预估下单次数',
        dataIndex: 'expectCount',
        key: 'expectCount',
        width: 70,
        align: 'center'
      }
    ]
  }
];
const CTRIPTrumpetColumn = [
  {
    title: '小号',
    className: 'ctrip-header',
    align: 'center',
    children: [
      {
        title: '正常小号个数',
        dataIndex: 'enableCount',
        key: 'enableCount',
        width: 70,
        align: 'center'
      },
      {
        title: '预估下单次数',
        dataIndex: 'expectCount',
        key: 'expectCount',
        width: 70,
        align: 'center'
      }
    ]
  }
];
const SINOPECTrumpetColumn = [
  {
    title: '小号',
    className: 'sinopec-header',
    align: 'center',
    children: [
      {
        title: '正常小号个数',
        dataIndex: 'enableCount',
        key: 'enableCount',
        width: 70,
        align: 'center'
      },
      {
        title: '预估下单次数',
        dataIndex: 'expectCount',
        key: 'expectCount',
        width: 70,
        align: 'center'
      }
    ]
  }
];
const PETROTrumpetColumn = [
  {
    title: '小号',
    className: 'petro-header',
    align: 'center',
    children: [
      {
        title: '正常小号个数',
        dataIndex: 'enableCount',
        key: 'enableCount',
        width: 70,
        align: 'center'
      },
      {
        title: '预估下单次数',
        dataIndex: 'expectCount',
        key: 'expectCount',
        width: 70,
        align: 'center'
      }
    ]
  }
];
export default {
  name: 'HomeMain',
  data () {
    return {
      // 京东
      JDOrderData: [],
      JDOrderColumn,
      JDSuperveneColumn,
      JDSuperveneData: [],
      JDTrumpetColumn,
      JDTrumpetData: [],
      // 携程
      CTRIPOrderData: [],
      CTRIPOrderColumn,
      CTRIPSuperveneColumn,
      CTRIPSuperveneData: [],
      CTRIPTrumpetColumn,
      CTRIPTrumpetData: [],
      // 石油
      PETROOrderColumn,
      PETROOrderData: [],
      PETROSuperveneColumn,
      PETROSuperveneData: [],
      PETROTrumpetColumn,
      PETROTrumpetData: [],
      // 石化
      SINOPECOrderColumn,
      SINOPECOrderData: [],
      SINOPECSuperveneColumn,
      SINOPECSuperveneData: [],
      SINOPECTrumpetColumn,
      SINOPECTrumpetData: [],
      // 当前日期的时间戳
      currentDate: parseInt(new Date().getTime() / 1000)
    }
  },
  mounted () {
    this.getJDOrderCount()
    this.getCTRIPOrderCount()
    this.getSINOPECOrderCount()
    this.getPETROOrderCount()

    this.getJDTrumpetCount()
    this.getCTRIPTrumpetCount()
    this.getSINOPECTrumpetCount()
    this.getPETROTrumpetCount()

    this.getJDSuperveneCount()
    this.getCTRIPSuperveneCount()
    this.getSINOPECSuperveneCount()
    this.getPETROSuperveneCount()
  },
  methods: {
    rowClassName(record, index) {
      let className = 'light'
      if (index % 2 === 1) className = 'dark'
      return className
    },
    // 订单统计
    getJDOrderCount () {
      getOrderOverallResellerCount({ productType: 'JD_E_CARD' }).then(res => {
        res.forEach(item => {
          item['faceAmount'] = item['faceAmount'] / 100
          item['allAmount'] = item['allAmount'] / 100
          item['pendingCount'] = item['pendingCount'] / 100
        })
        this.JDOrderData = res
      })
    },
    getCTRIPOrderCount () {
      getOrderOverallResellerCount({ productType: 'CTRIP' }).then(res => {
        res.forEach(item => {
          item['faceAmount'] = item['faceAmount'] / 100
          item['allAmount'] = item['allAmount'] / 100
          item['pendingCount'] = item['pendingCount'] / 100
        })
        this.CTRIPOrderData = res
      })
    },
    getSINOPECOrderCount () {
      getOrderOverallResellerCount({ productType: 'SINOPEC' }).then(res => {
        res.forEach(item => {
          item['faceAmount'] = item['faceAmount'] / 100
          item['allAmount'] = item['allAmount'] / 100
          item['pendingCount'] = item['pendingCount'] / 100
        })
        this.SINOPECOrderData = res
      })
    },
    getPETROOrderCount () {
      getOrderOverallResellerCount({ productType: 'PETRO' }).then(res => {
        res.forEach(item => {
          item['faceAmount'] = item['faceAmount'] / 100
          item['allAmount'] = item['allAmount'] / 100
          item['pendingCount'] = item['pendingCount'] / 100
        })
        this.PETROOrderData = res
      })
    },

    // 小号统计
    getJDTrumpetCount () {
      this.JDTrumpetData = []
      trumpetCount('JD_E_CARD').then(res => {
        this.JDTrumpetData.push(res)
      })
    },
    getCTRIPTrumpetCount () {
      this.CTRIPTrumpetData = []
      trumpetCount('CTRIP').then(res => {
        this.CTRIPTrumpetData.push(res)
      })
    },
    getSINOPECTrumpetCount () {
      this.SINOPECTrumpetData = []
      trumpetCount('SINOPEC').then(res => {
        this.SINOPECTrumpetData.push(res)
      })
    },
    getPETROTrumpetCount () {
      this.PETROTrumpetData = []
      trumpetCount('PETRO').then(res => {
        this.PETROTrumpetData.push(res)
      })
    },

    // 并发统计
    getJDSuperveneCount () {
      this.JDSuperveneData = []
      let JD_Supervene_Data = []
      // 一分钟请求
      superveneCount({ productType: 'JD_E_CARD', startTime: this.dateFormat(this.currentDate - 60), endTime: this.dateFormat(this.currentDate) }).then(res => {
        JD_Supervene_Data = res
      }).then(() => {
        // 30分钟请求
        superveneCount({ productType: 'JD_E_CARD', startTime: this.dateFormat(this.currentDate - 1800), endTime: this.dateFormat(this.currentDate) }).then(res => {
          JD_Supervene_Data.forEach(item => {
            res.forEach(jtem => {
              if (item.amount === jtem.amount) {
                item['thirty_inOrderCount'] = jtem['inOrderCount']
                item['thirty_matchSuccessRate'] = jtem['matchSuccessRate']
                item['thirty_paySuccessRate'] = jtem['paySuccessRate']
              }
            })
          })
        }).then(() => {
          superveneCount({ productType: 'JD_E_CARD', startTime: this.dateFormat(this.getZeroTimeStamp()), endTime: this.dateFormat(this.getZeroTimeStamp() + 86399) }).then(res => {
            JD_Supervene_Data.forEach(item => {
              res.forEach(jtem => {
                if (item.amount === jtem.amount) {
                  item['today_inOrderCount'] = jtem['inOrderCount']
                  item['today_matchSuccessRate'] = jtem['matchSuccessRate']
                  item['today_paySuccessRate'] = jtem['paySuccessRate']
                }
              })
            })
          }).then(() => {
            JD_Supervene_Data.forEach(item => {
              item['amount'] = item['amount'] / 100
            })
            JD_Supervene_Data.sort((a, b) => { return a.amount - b.amount })
            this.JDSuperveneData = JD_Supervene_Data
          })
        })
      })
    },
    getCTRIPSuperveneCount () {
      this.CTRIPSuperveneData = []
      let ctrip_supervene_data = []
      superveneCount({ productType: 'CTRIP', startTime: this.dateFormat(this.currentDate - 60), endTime: this.dateFormat(this.currentDate) }).then(res => {
        ctrip_supervene_data = res
      }).then(() => {
        // 30分钟请求
        superveneCount({ productType: 'CTRIP', startTime: this.dateFormat(this.currentDate - 1800), endTime: this.dateFormat(this.currentDate) }).then(res => {
          ctrip_supervene_data.forEach(item => {
            res.forEach(jtem => {
              if (item.amount === jtem.amount) {
                item['thirty_inOrderCount'] = jtem['inOrderCount']
                item['thirty_matchSuccessRate'] = jtem['matchSuccessRate']
                item['thirty_paySuccessRate'] = jtem['paySuccessRate']
              }
            })
          })
        }).then(() => {
          superveneCount({ productType: 'CTRIP', startTime: this.dateFormat(this.getZeroTimeStamp()), endTime: this.dateFormat(this.getZeroTimeStamp() + 86399) }).then(res => {
            ctrip_supervene_data.forEach(item => {
              res.forEach(jtem => {
                if (item.amount === jtem.amount) {
                  item['today_inOrderCount'] = jtem['inOrderCount']
                  item['today_matchSuccessRate'] = jtem['matchSuccessRate']
                  item['today_paySuccessRate'] = jtem['paySuccessRate']
                }
              })
            })
          }).then(() => {
            ctrip_supervene_data.forEach(item => {
              item['amount'] = item['amount'] / 100
            })
            ctrip_supervene_data.sort((a, b) => { return a.amount - b.amount })
            this.CTRIPSuperveneData = ctrip_supervene_data
          })
        })
      })
    },
    getSINOPECSuperveneCount () {
      this.SINOPECSuperveneData = []
      let SINOPEC_Supervene_Data = []
      superveneCount({ productType: 'SINOPEC', startTime: this.dateFormat(this.currentDate - 60), endTime: this.dateFormat(this.currentDate) }).then(res => {
        SINOPEC_Supervene_Data = res
      }).then(() => {
        // 30分钟请求
        superveneCount({ productType: 'SINOPEC', startTime: this.dateFormat(this.currentDate - 1800), endTime: this.dateFormat(this.currentDate) }).then(res => {
          SINOPEC_Supervene_Data.forEach(item => {
            res.forEach(jtem => {
              if (item.amount === jtem.amount) {
                item['thirty_inOrderCount'] = jtem['inOrderCount']
                item['thirty_matchSuccessRate'] = jtem['matchSuccessRate']
                item['thirty_paySuccessRate'] = jtem['paySuccessRate']
              }
            })
          })
        }).then(() => {
          superveneCount({ productType: 'SINOPEC', startTime: this.dateFormat(this.getZeroTimeStamp()), endTime: this.dateFormat(this.getZeroTimeStamp() + 86399) }).then(res => {
            SINOPEC_Supervene_Data.forEach(item => {
              res.forEach(jtem => {
                if (item.amount === jtem.amount) {
                  item['today_inOrderCount'] = jtem['inOrderCount']
                  item['today_matchSuccessRate'] = jtem['matchSuccessRate']
                  item['today_paySuccessRate'] = jtem['paySuccessRate']
                }
              })
            })
          }).then(() => {
            SINOPEC_Supervene_Data.forEach(item => {
              item['amount'] = item['amount'] / 100
            })
            SINOPEC_Supervene_Data.sort((a, b) => { return a.amount - b.amount })
            this.SINOPECSuperveneData = SINOPEC_Supervene_Data
          })
        })
      })
    },
    getPETROSuperveneCount () {
      this.PETROSuperveneData = []
      let PETRO_Supervene_Data = []
      superveneCount({ productType: 'PETRO', startTime: this.dateFormat(this.currentDate - 60), endTime: this.dateFormat(this.currentDate) }).then(res => {
        PETRO_Supervene_Data = res
      }).then(() => {
        // 30分钟请求
        superveneCount({ productType: 'PETRO', startTime: this.dateFormat(this.currentDate - 1800), endTime: this.dateFormat(this.currentDate) }).then(res => {
          PETRO_Supervene_Data.forEach(item => {
            res.forEach(jtem => {
              if (item.amount === jtem.amount) {
                item['thirty_inOrderCount'] = jtem['inOrderCount']
                item['thirty_matchSuccessRate'] = jtem['matchSuccessRate']
                item['thirty_paySuccessRate'] = jtem['paySuccessRate']
              }
            })
          })
        }).then(() => {
          superveneCount({ productType: 'PETRO', startTime: this.dateFormat(this.getZeroTimeStamp()), endTime: this.dateFormat(this.getZeroTimeStamp() + 86399) }).then(res => {
            PETRO_Supervene_Data.forEach(item => {
              res.forEach(jtem => {
                if (item.amount === jtem.amount) {
                  item['today_inOrderCount'] = jtem['inOrderCount']
                  item['today_matchSuccessRate'] = jtem['matchSuccessRate']
                  item['today_paySuccessRate'] = jtem['paySuccessRate']
                }
              })
            })
          }).then(() => {
            PETRO_Supervene_Data.forEach(item => {
              item['amount'] = item['amount'] / 100
            })
            PETRO_Supervene_Data.sort((a, b) => { return a.amount - b.amount })
            this.PETROSuperveneData = PETRO_Supervene_Data
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  background-color: #ffffff;
  padding: 10px 10px;
  .jd, .xc, .sy, .sh {
    display: flex;
    margin-bottom: 30px;
  }
  .sh {
    margin-bottom: 0;
  }
}
.ant-table-wrapper:first-child {
  /deep/ .ant-table {
    .ant-table-content {
      .ant-table-body {
        margin: 0 !important;
        color: white;
        .ant-table-thead > tr {
          .jd-header {
            background-color: #f5f7fa;
          }
          .ctrip-header {
            background-color: #faecd8;
          }
          .sinopec-header {
            background-color: #e1f3d8;
          }
          .petro-header {
            background-color: #e9e9eb;
          }
        }

        .ant-table-thead tr:last-child {
          font-size: 12px;
        }

        .ant-table-tbody {
          color: black;
          .dark {
            background-color: #F5F5F5;
          }
        }
      }
    }
  }
}
</style>
