<template>
    <a-drawer
            :maskClosable="false"
            :visible="visible"
            :title="'核销商资金详情'"
            @close="onClose"
            :body-style="{ paddingBottom: '80px' }"
            width="40%"
            class="drawer-width"

    >
        <a-form-model v-if="visible" ref="infoFormModel" :model="detailData" layout="vertical">
            <a-row justify="space-between" type="flex">
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="ID">
                            {{ detailData.id }}
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

                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="订单总金额">
                            {{ '￥'+detailData.allAmount / 100 }}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>

                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="回款金额">
                            {{ '￥'+detailData.finishedAllAmount  / 100}}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
            </a-row>

            <a-row justify="space-between" type="flex">
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="待充值金额">
                            {{ '￥'+detailData.waitAllAmount / 100}}
                        </a-descriptions-item>
                    </a-descriptions>
                </a-col>
                <a-col :span="10">
                    <a-descriptions>
                        <a-descriptions-item label="分享金额">
                            {{ '￥'+detailData.shareAllAmount / 100 }}
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
    import { API_URL_RESELLER_FUNDACCOUNT_LIST, req } from '@/api/manage'
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
                that.resetIsShow = true // 展示重置密码板块
                that.recordId = recordId
                req.getById(API_URL_RESELLER_FUNDACCOUNT_LIST, recordId).then(res => {
                    that.detailData = res
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
