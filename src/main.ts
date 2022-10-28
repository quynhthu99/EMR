import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/global.less'
import i18n from '@/locales/useI18n'
import 'virtual:svg-icons-register'
import setupDefaultSetting from '@/utils/setupDefaultSetting'
import plugins from '@/plugins/index'
import '@/plugins/chart'
import 'flowbite';
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(plugins, {})
app.mount('#app')

setupDefaultSetting()
