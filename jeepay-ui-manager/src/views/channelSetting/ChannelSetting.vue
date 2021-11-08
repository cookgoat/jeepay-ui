<template>
  <div class="match-config-page">
    <h3>京东E卡</h3>
    <div class="jd-e-card">
      <a-form-model :model="JdECardForm" ref="JdECardForm" labelAlign="right" layout="horizontal" :labelCol="{ span: 3 }">
        <a-form-model-item label="开启休眠">
          <a-switch :checked="JdECardForm.isOpenSleep === 'ENABLE'" @change="onJdECardChange" style="margin-right: 5px;" />
          <span>关闭状态的话，超时支付的核销订单会一直处于匹配成功的状态，开启状态=当玩家未付款，订单匹配成功超过设置的核销订单失效时间后，核销订单进入休眠状态</span>
        </a-form-model-item>
        <a-form-model-item label="核销回调方式">
          <a-radio-group v-model="JdECardForm.callBackStatus">
            <a-radio value="RECHARGED">充值到账回调</a-radio>
            <a-radio value="PAYED">支付成功回调</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-item label="超时休眠次数">
          <a-input v-model="JdECardForm.maxSleepCount" style="width: 100px; margin-right: 5px;" />
          <span>次 当核销订单超时失败，进入休眠{{ JdECardForm.maxSleepCount }}次后，说明该充值账号异常导致没有付款率，失败返回给核销商。</span>
        </a-form-item>
        <a-form-item label="小号下单次数">
          <a-input v-model="JdECardForm.pretenderAccountCreateOrderCount" style="width: 100px; margin-right: 5px;" />
          <span>次 限制小号下单次数，避免风控。</span>
        </a-form-item>
        <a-form-item label="核销订单失效时间">
          <a-input v-model="JdECardForm.matchOrderEffectiveSeconds" style="width: 100px; margin-right: 5px;" />
          <span>秒 为了防止重复支付，核销订单被拉起后未支付，则{{ JdECardForm.matchOrderEffectiveSeconds }}秒后进入休眠状态，支付订单优先拉取休眠中的核销订单</span>
        </a-form-item>
        <a-form-item label="支付链接类型">
          <a-select :default-value="JdECardForm.payLinkType" v-model="JdECardForm.payLinkType" style="width: 100px;">
            <a-select-option value="https"> https </a-select-option>
            <a-select-option value="detail"> 详情页 </a-select-option>
          </a-select>
          <span>第一种返回https形式 则是deeplink形式，第二种返回详情页的形式，可在第一种模式风控的时候切换，可降低风控提高成功率</span>
        </a-form-item>
        <a-form-item style="text-align: right;">
          <a-button type="primary" @click="updateData(JdECardForm.id)">确认修改</a-button>
        </a-form-item>
      </a-form-model>
    </div>
    <h3>携程卡</h3>
    <div class="ctrip">
      <a-form-model :model="CTRIPForm" ref="CTRIPForm" labelAlign="right" layout="horizontal" :labelCol="{ span: 3 }">
        <a-form-model-item label="开启休眠">
          <a-switch :checked="CTRIPForm.isOpenSleep === 'ENABLE'" @change="onCtripChange" style="margin-right: 5px;" />
          <span>关闭状态的话，超时支付的核销订单会一直处于匹配成功的状态，开启状态=当玩家未付款，订单匹配成功超过设置的核销订单失效时间后，核销订单进入休眠状态</span>
        </a-form-model-item>
        <a-form-model-item label="核销回调方式">
          <a-radio-group v-model="CTRIPForm.callBackStatus">
            <a-radio value="RECHARGED">充值到账回调</a-radio>
            <a-radio value="PAYED">支付成功回调</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-item label="超时休眠次数">
          <a-input v-model="CTRIPForm.maxSleepCount" style="width: 100px; margin-right: 5px;" />
          <span>次 当核销订单超时失败，进入休眠{{ CTRIPForm.maxSleepCount }}次后，说明该充值账号异常导致没有付款率，失败返回给核销商。</span>
        </a-form-item>
        <a-form-item label="小号下单次数">
          <a-input v-model="CTRIPForm.pretenderAccountCreateOrderCount" style="width: 100px; margin-right: 5px;" />
          <span>次 限制小号下单次数，避免风控。</span>
        </a-form-item>
        <a-form-item label="核销订单失效时间">
          <a-input v-model="CTRIPForm.matchOrderEffectiveSeconds" style="width: 100px; margin-right: 5px;" />
          <span>秒 为了防止重复支付，核销订单被拉起后未支付，则{{ CTRIPForm.matchOrderEffectiveSeconds }}秒后进入休眠状态，支付订单优先拉取休眠中的核销订单</span>
        </a-form-item>
        <a-form-item label="支付链接类型">
          <a-select :default-value="CTRIPForm.payLinkType" v-model="CTRIPForm.payLinkType" style="width: 100px;">
            <a-select-option value="https"> https </a-select-option>
            <a-select-option value="detail"> 详情页 </a-select-option>
          </a-select>
          <span>第一种返回https形式 则是deeplink形式，第二种返回详情页的形式，可在第一种模式风控的时候切换，可降低风控提高成功率</span>
        </a-form-item>
        <a-form-item style="text-align: right;">
          <a-button type="primary" @click="updateData(CTRIPForm.id)">确认修改</a-button>
        </a-form-item>
      </a-form-model>
    </div>
    <h3>中国石油</h3>
    <div class="petro">
      <a-form-model :model="PETROForm" ref="PETROForm" labelAlign="right" layout="horizontal" :labelCol="{ span: 3 }">
        <a-form-model-item label="开启休眠">
          <a-switch :checked="PETROForm.isOpenSleep === 'ENABLE'" @change="onPetroChange" style="margin-right: 5px;" />
          <span>关闭状态的话，超时支付的核销订单会一直处于匹配成功的状态，开启状态=当玩家未付款，订单匹配成功超过设置的核销订单失效时间后，核销订单进入休眠状态</span>
        </a-form-model-item>
        <a-form-model-item label="核销回调方式">
          <a-radio-group v-model="PETROForm.callBackStatus">
            <a-radio value="RECHARGED">充值到账回调</a-radio>
            <a-radio value="PAYED">支付成功回调</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-item label="超时休眠次数">
          <a-input v-model="PETROForm.maxSleepCount" style="width: 100px; margin-right: 5px;" />
          <span>次 当核销订单超时失败，进入休眠{{ PETROForm.maxSleepCount }}次后，说明该充值账号异常导致没有付款率，失败返回给核销商。</span>
        </a-form-item>
        <a-form-item label="小号下单次数">
          <a-input v-model="PETROForm.pretenderAccountCreateOrderCount" style="width: 100px; margin-right: 5px;" />
          <span>次 限制小号下单次数，避免风控。</span>
        </a-form-item>
        <a-form-item label="核销订单失效时间">
          <a-input v-model="PETROForm.matchOrderEffectiveSeconds" style="width: 100px; margin-right: 5px;" />
          <span>秒 为了防止重复支付，核销订单被拉起后未支付，则{{ PETROForm.matchOrderEffectiveSeconds }}秒后进入休眠状态，支付订单优先拉取休眠中的核销订单</span>
        </a-form-item>
        <a-form-item label="支付链接类型">
          <a-select :default-value="PETROForm.payLinkType" v-model="PETROForm.payLinkType" style="width: 100px;">
            <a-select-option value="https"> https </a-select-option>
            <a-select-option value="detail"> 详情页 </a-select-option>
          </a-select>
          <span>第一种返回https形式 则是deeplink形式，第二种返回详情页的形式，可在第一种模式风控的时候切换，可降低风控提高成功率</span>
        </a-form-item>
        <a-form-item style="text-align: right;">
          <a-button type="primary" @click="updateData(PETROForm.id)">确认修改</a-button>
        </a-form-item>
      </a-form-model>
    </div>
    <h3>中国石化</h3>
    <div class="sinopec">
      <a-form-model :model="SINOPECForm" ref="SINOPECForm" labelAlign="right" layout="horizontal" :labelCol="{ span: 3 }">
        <a-form-model-item label="开启休眠">
          <a-switch :checked="SINOPECForm.isOpenSleep === 'ENABLE'" @change="onSinoPecChange" style="margin-right: 5px;" />
          <span>关闭状态的话，超时支付的核销订单会一直处于匹配成功的状态，开启状态=当玩家未付款，订单匹配成功超过设置的核销订单失效时间后，核销订单进入休眠状态</span>
        </a-form-model-item>
        <a-form-model-item label="核销回调方式">
          <a-radio-group v-model="SINOPECForm.callBackStatus">
            <a-radio value="RECHARGED">充值到账回调</a-radio>
            <a-radio value="PAYED">支付成功回调</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-item label="超时休眠次数">
          <a-input v-model="SINOPECForm.maxSleepCount" style="width: 100px; margin-right: 5px;" />
          <span>次 当核销订单超时失败，进入休眠{{ SINOPECForm.maxSleepCount }}次后，说明该充值账号异常导致没有付款率，失败返回给核销商。</span>
        </a-form-item>
        <a-form-item label="小号下单次数">
          <a-input v-model="SINOPECForm.pretenderAccountCreateOrderCount" style="width: 100px; margin-right: 5px;" />
          <span>次 限制小号下单次数，避免风控。</span>
        </a-form-item>
        <a-form-item label="核销订单失效时间">
          <a-input v-model="SINOPECForm.matchOrderEffectiveSeconds" style="width: 100px; margin-right: 5px;" />
          <span>秒 为了防止重复支付，核销订单被拉起后未支付，则{{ SINOPECForm.matchOrderEffectiveSeconds }}秒后进入休眠状态，支付订单优先拉取休眠中的核销订单</span>
        </a-form-item>
        <a-form-item label="支付链接类型">
          <a-select :default-value="SINOPECForm.payLinkType" v-model="SINOPECForm.payLinkType" style="width: 100px;">
            <a-select-option value="https"> https </a-select-option>
            <a-select-option value="detail"> 详情页 </a-select-option>
          </a-select>
          <span>第一种返回https形式 则是deeplink形式，第二种返回详情页的形式，可在第一种模式风控的时候切换，可降低风控提高成功率</span>
        </a-form-item>
        <a-form-item style="text-align: right;">
          <a-button type="primary" @click="updateData(SINOPECForm.id)">确认修改</a-button>
        </a-form-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import * as API_Match from '@/api/match'
import { updateMatchData } from '../../api/match'
export default {
  name: 'ChannelSetting',
  data () {
    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      params: {
        pageNumber: 1,
        pageSize: 10
      },
      JdECardForm: {}, // 京东配置表单
      SINOPECForm: {}, // 中石化配置表单
      PETROForm: {}, // 中石油
      CTRIPForm: {}, // 携程
    }
  },
  mounted () {
    this.getMatchData()
  },
  methods: {
    getMatchData () {
      API_Match.getMatchList(this.params).then(res => {
        res.forEach(item => {
          switch (item.productType) {
            case 'JD_E_CARD':
              this.JdECardForm = item
              break;
            case 'SINOPEC':
              this.SINOPECForm = item
              break;
            case 'PETRO':
              this.PETROForm = item
              break;
            case 'CTRIP':
              this.CTRIPForm = item
              break;
          }
        })
      })
    },
    onJdECardChange (checked) {
      if (checked) {
        this.JdECardForm.isOpenSleep = 'ENABLE'
      } else {
        this.JdECardForm.isOpenSleep = 'DISABLE'
      }
    },

    onSinoPecChange (checked) {
      if (checked) {
        this.SINOPECForm.isOpenSleep = 'ENABLE'
      } else {
        this.SINOPECForm.isOpenSleep = 'DISABLE'
      }
    },

    onPetroChange (checked) {
      if (checked) {
        this.PETROForm.isOpenSleep = 'ENABLE'
      } else {
        this.PETROForm.isOpenSleep = 'DISABLE'
      }
    },

    onCtripChange (checked) {
      if (checked) {
        this.CTRIPForm.isOpenSleep = 'ENABLE'
      } else {
        this.CTRIPForm.isOpenSleep = 'DISABLE'
      }
    },

    updateData (id) {
      let _params = ''
      switch (id) {
        case 1:
          _params = this.JdECardForm
          break
        case 2:
          _params = this.SINOPECForm
          break
        case 3:
          _params = this.PETROForm
          break
        case 4:
          _params = this.CTRIPForm
      }
      API_Match.updateMatchData(id, _params).then(res => {
        if (res.code === 0) {
          this.$message.success('更新成功')
          this.getMatchData()
        } else {
          this.$message.error('更新失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.match-config-page {
  background-color: #ffffff;
  padding: 10px 30px 10px 10px;
  border-radius: 20px;
  .ant-form-item {
    margin-bottom: 5px;
    span {
      font-size: 12px;
    }
    .ant-btn {
      background-color: #45EE58;
      border: 0;
    }
  }
}
</style>
