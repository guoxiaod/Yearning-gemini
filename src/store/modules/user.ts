import {Module, VuexModule, Mutation, getModule} from 'vuex-module-decorators'
import store from "@/store";
import { QueryParams } from '@/interface';

interface Edit {
    id?: number
    username?: string
    department?: string
    real_name?: string
    rule?: string
    email?: string
    password?: string
    query_params?: QueryParams
}

@Module({namespaced: true, name: 'modules_user', dynamic: true, store})
class user extends VuexModule {

    edit: Edit = {
        id: 0,
        username: '',
        department: '',
        real_name: '',
        rule: '',
        email: '',
        password: '',
        query_params: {
            limit_count: 0,
            ex_query_time: 0,
        }
    }

    @Mutation
    fetch_user_info(vm: object) {
        this.edit = vm
    }

    @Mutation
    change_username(user:string) {
        this.edit.username = user
    }
}

const module_user = getModule(user)

export default module_user
