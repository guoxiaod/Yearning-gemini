import {Component, Mixins} from "vue-property-decorator";
import att_mixins from "@/mixins/basic";
import render from "@/interface/render";
import module_init_args from "@/store/modules/init_args";
import {order} from "@/interface";
import modules_order from "@/store/modules/order";

@Component({components: {}})
export default class audit_mixins extends Mixins(att_mixins) {

    columns = [
        {
            title: '工单编号:',
            key: 'work_id',
            sortable: true,
            sortType: 'desc',
            width: 155
        },
        {
            title: '工单说明:',
            key: 'text',
            tooltip: true
        },
        {
            title: '工单类型',
            key: 'type',
            render: render.type
        },
        {
            title: '是否备份',
            key: 'backup',
            render: render.backup
        },
        {
            title: '提交时间:',
            key: 'date',
            sortable: true
        },
        {
            title: '提交账号',
            key: 'username',
            sortable: true
        },
        {
            title: '真实姓名',
            key: 'real_name',
            sortable: true
        },
        {
            title: '定时执行',
            key: 'delay',
            slot: 'delay'
        },
        {
            title: '当前操作人',
            key: 'assigned',
            sortable: true
        },
        {
            title: '状态',
            key: 'status',
            width: 150,
            render: render.tag,
            sortable: true
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            slot: 'action'
        }
    ];
    auth = sessionStorage.getItem('auth');
    reboot = 0;
    valve = true;
    is_osc = false;
    url = `${this.$config.url}/audit`

    delayKill(vl: { work_id: string }) {
        this.$http.get(`${this.$config.url}/audit/kill/${vl.work_id}`)
            .then((res: { data: string; }) => {
                this.$config.notice(res.data);
                this.current_page()
            })
            .catch((err: any) => this.$config.err_notice(this, err))
    }

    timerOsc(vl: { work_id: string }) {
        this.is_osc = true;
        modules_order.fetch_order_osc_id(vl.work_id)
    }

    orderDetail(row: any) {
        module_init_args.fetch_order_item(row)
        this.$router.push({
            name: 'profile'
        })
    }

    current_page(vl = 1) {
        this.fetch_page(vl, this.url)
    }

    refreshForm(vl: boolean) {
        if (vl) {
            let vm = this;
            this.reboot = setInterval(function () {
                vm.current_page(vm.current);
            }, 5000)
        } else {
            clearInterval(this.reboot)
        }
    }

    mounted() {
        this.current_page();
        this.refreshForm(this.valve)
    }

    destroyed() {
        clearInterval(this.reboot)
    }
}
