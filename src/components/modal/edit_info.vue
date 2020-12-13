<template>
    <Modal v-model="is_open" @on-ok="edit_user_Info" @on-cancel="cancel">
        <h3 slot="header" style="color:#2D8CF0">用户信息</h3>
        <Form :model="edit" label-position="right" ref="edit_user">
            <FormItem label="用户名" prop="username">
                <Input v-model="edit.username" readonly="readonly"></Input>
            </FormItem>
            <FormItem label="真实姓名" prop="real_name">
                <Input v-model="edit.real_name"></Input>
            </FormItem>
            <FormItem label="角色">
                <template v-if="edit.username !== 'admin'">
                    <Select v-model="edit.rule">
                        <Option value="guest" label="提交人"></Option>
                        <Option value="admin" label="操作人"></Option>
                    </Select>
                </template>
                <template v-else>
                    <span v-if="edit.rule === 'guest'">提交人</span>
                    <span v-else-if="edit.rule === 'admin'">操作人</span>
                    <span v-else>超级管理员</span>
                </template>

            </FormItem>
            <FormItem label="部门" prop="department">
                <Input v-model="edit.department" placeholder="请输入新部门"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="email">
                <Input v-model="edit.email" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem label="查询最大Limit限制" prop="limit_count">
                <InputNumber class='ivu-input-wrapper' v-model="edit.query_params.limit_count"></InputNumber>
            </FormItem>
            <FormItem label="查询超时时间(s)" prop="ex_query_time">
                <InputNumber class='ivu-input-wrapper' v-model="edit.query_params.ex_query_time"></InputNumber>
            </FormItem>
        </Form>
    </Modal>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Watch} from "vue-property-decorator";
import att_mixins from "@/mixins/basic";

@Component({components: {}})
export default class edit_info extends Mixins(att_mixins) {

    edit: any = {
        query_params: {
            limit_count: 0,
            ex_query_time: 0,
        }
    }

    @Prop({
        required: true,
        type: Boolean,
        default: false
    }) value !: boolean

    @Prop({
        required: true,
        type: Object,
        default: false
    }) user_info !: {}

    @Watch('value')
    get_visible(vl: boolean) {
        this.is_open = vl
    }

    @Watch('user_info')
    get_edit(vl: any) {
        this.edit = vl
    }

    edit_user_Info() {
        this.$http.put(`${this.$config.url}/manage_user`, {
            'username': this.edit.username,
            'rule': this.edit.rule,
            'department': this.edit.department,
            'real_name': this.edit.real_name,
            'mail': this.edit.email,
            'query_params': this.edit.query_params,
            'tp': 'info'
        })
            .then((res: { data: string; }) => {
                this.$config.notice(res.data);
                this.resetFields('edit_user')
                this.$emit("call")
            })
            .catch((error: any) => {
                this.$config.err_notice(this, error)
            });
        this.cancel()
    }
}
</script>

<style scoped>

</style>
