import { Menu, Dropdown } from 'ant-design-vue'

import { defineComponent, getCurrentInstance, ref } from 'vue'
// import { GlobalOutlined } from '@ant-design/icons-vue'
import ls from '@/utils/Storage'
import { setDocumentTitleForLangChange } from '@/utils/domUtil'

const locales = ['en-US', 'vi-VN']
const languageLabels = {
  'en-US': 'English',
  'vi-VN': 'Việt Nam'
}
// eslint-disable-next-line
const languageIcons = {
  'en-US': '🇺🇸',
  'vi-VN': '🇻🇳'
}

const SelectLang = {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-drop-down'
    }
  },
  name: 'SelectLang',
  setup(props) {
    const { proxy } = getCurrentInstance()

    const { prefixCls } = props
    const currentLang = ref(ls.get('lang') || 'vi-VN')

    function changeLang({ key }) {
      proxy.$i18n.locale = key
      ls.set('lang', key)
      currentLang.value = key
      setDocumentTitleForLangChange()
    }

    return {
      prefixCls,
      changeLang,
      currentLang
    }
  },
  render() {
    const langMenu = (
      <Menu
        class={['menu', 'ant-pro-header-menu']}
        selectedKeys={[this.currentLang]}
        onClick={this.changeLang}
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode || document.body
        }}
      >
        {locales.map((locale) => (
          <Menu.Item key={locale}>
            <div class="flex justify-start items-center text-sm">
              <span className="text-xl">{languageIcons[locale]}</span>
              <span className="text-sm ml-2">{languageLabels[locale]}</span>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    )
    return (
      <Dropdown overlay={langMenu} class={this.prefixCls} placement="bottomRight">
        <div
          class="bg-white flex justify-start items-center text-white border-1 p-2 rounded bg-opacity-10 hover:bg-opacity-30"
          style="width: 160px; line-height: 20px"
          role="img"
          aria-label={languageLabels[this.currentLang]}
        >
          <span class="text-xl">{languageIcons[this.currentLang]}</span>
          <span class="text-sm ml-2">{languageLabels[this.currentLang]}</span>
        </div>
      </Dropdown>
    )
  }
}

export default defineComponent(SelectLang)
