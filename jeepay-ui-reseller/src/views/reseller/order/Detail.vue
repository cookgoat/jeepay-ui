<template>
    <a-drawer
            :maskClosable="false"
            :visible="visible"
            :title="'核销商订单详情'"
            @close="onClose"
            :body-style="{ paddingBottom: '80px' }"
            width="40%"
            class="drawer-width"

    >
        <a-form-model v-if="visible" ref="infoFormModel" :model="detailData" layout="vertical">
            <a-row justify="space-between" type="flex">
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="订单号">
                            {{ detailData.orderNo }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="核销商号">
                            {{ detailData.resellerNo }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>

            <a-row justify="space-between" type="flex">

                <a-col :span="6">
                    <a-descriptions>
                        <a-descriptions-item label="产品类型">
                            {{ detailData.productType === 'JD_E_CARD' ? '京东E卡' : '携程任我行' }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>

                <a-col :span="6">
                    <a-descriptions>
                        <a-descriptions-item label="充值账号">
                            {{ detailData.chargeAccount }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>

                <a-col :span="6">
                    <a-descriptions>
                        <a-descriptions-item label="充值金额">
                            {{ '￥'+detailData.amount }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>

            <a-row justify="space-between" type="flex">
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="查询标志">
                            {{ detailData.queryFlag }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="账号类型">
                            {{ detailData.chargeAccountType === 'MOBILE' ? '手机号' : '平台账号' }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>

            </a-row>

            <a-row justify="space-between" type="flex">
                <a-col :span="6">
                    <a-descriptions>
                        <a-descriptions-item label="订单状态">
                            {{ detailData.orderStatus === 'WAITING_PAY' ? '等待支付' :  detailData.orderStatus === 'FINISH' ? '订单完成' : '支付中'}}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="6">
                    <a-descriptions>
                        <a-descriptions-item label="匹配上游订单号">
                            {{ detailData.matchOutTradeNo }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="6">
                    <a-descriptions>
                        <a-descriptions-item label="匹配时间">
                            {{ detailData.gmtPayingStart }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>

            </a-row>

            <a-row justify="space-between" type="flex">
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="创建人uid">
                            {{ detailData.createUid }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="创建人">
                            {{ detailData.createName }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>

            <a-row justify="space-between" type="flex">
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="创建时间">
                            {{ detailData.gmtCreate }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="更新时间">
                            {{ detailData.gmtUpdate }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>
        </a-form-model>
    </a-drawer>
</template>

<script>
    import { API_URL_RESELLER_ORDER_LIST, req } from '@/api/manage'
    export default {

        props: {
            callbackFunc: { type: Function }
        },

        data () {
            return {
                btnLoading: false,
                detailData: {}, // 数据对象
                recordId: null, // 更新对象ID
                visible: false // 是否显示弹层/抽屉
            }
        },
        created () {
        },
        methods: {
            show: function (recordId) { // 弹层打开事件
                if (this.$refs.infoFormModel !== undefined) {
                    this.$refs.infoFormModel.resetFields()
                }
                const that = this
                that.recordId = recordId
                req.getById(API_URL_RESELLER_ORDER_LIST, recordId).then(res => {
                    that.detailData = res
                    that.detailData.amount = that.detailData.amount / 100
                })
                this.visible = true
            },
            onClose () {
                this.visible = false
            },
            searchFunc: function () { // 点击【查询】按钮点击事件
                this.$refs.infoTable.refTable(true)
            }
        }
    }
</script>
<style lang="less">
    .typePopover {
        position: absolute;
        top: 0;
        left:62px;
    }
</style>
