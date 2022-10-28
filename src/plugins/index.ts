import Table from '@/components/VietAnts/Table/Table.vue'
import DatePicker from '@/components/VietAnts/DatePicker.vue'
import Input from '@/components/VietAnts/Input.vue'
import Breadcrumb from '@/components/VietAnts/Breadcrumb.vue'
import Select from '@/components/VietAnts/Select.vue'
import SelectTable from '@/components/VietAnts/SelectTable.vue'
import BackTop from '@/components/VietAnts/BackTop.vue'
import { PageHeader, Row, Col } from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import mixin from '@/utils/mixins/mixins'
import { Modal, message, notification } from 'ant-design-vue'
import Radio from '@/components/VietAnts/Radio.vue'
import Tabs from '@/components/VietAnts/Tabs.vue'
export default {
  install(Vue: any): void {
    // ant design component
    Vue.component('ARow', Row)
    Vue.component('ACol', Col)
    // VietAnts component
    Vue.component('va-table', Table)
    Vue.component('va-input', Input)
    Vue.component('va-select', Select)
    Vue.component('va-select-table', SelectTable)
    Vue.component('va-radio', Radio)
    Vue.component('va-date-picker', DatePicker)
    Vue.component('va-page-header', PageHeader)
    Vue.component('va-svg-icon', SvgIcon)
    Vue.component('va-breadcrumb', Breadcrumb)
    Vue.component('va-back-top', BackTop)
    Vue.component('va-tabs', Tabs)

    Vue.config.globalProperties.$message = message
    Vue.config.globalProperties.$confirm = Modal.confirm
    Vue.config.globalProperties.$notification = notification
    Vue.config.globalProperties.$info = Modal.info
    Vue.config.globalProperties.$success = Modal.success
    Vue.config.globalProperties.$error = Modal.error
    Vue.config.globalProperties.$warning = Modal.warning
    // su dung mixin
    Vue.mixin(mixin)
  }
}
