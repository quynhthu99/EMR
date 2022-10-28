const colorList = [
  {
    key: 'yellow',
    color: '#FAAD14'
  },
  {
    key: 'primary',
    color: '#466C95'
  },
  {
    key: 'red',
    color: '#F5222D'
  },
  {
    key: 'orange',
    color: '#FA541C'
  },
  {
    key: 'cyan',
    color: '#13C2C2'
  },
  {
    key: 'success',
    color: '#52C41A'
  },
  {
    key: 'dark_blu',
    color: '#2F54EB'
  },
  {
    key: 'violet',
    color: '#722ED1'
  }
]

const updateDarkMode = (isDark) => {
  let styleTag = document.getElementById('themeCss')
  const appTag = document.getElementById('html')
  if (!styleTag) {
    styleTag = document.createElement('link')
    styleTag.setAttribute('id', 'themeCss')
    document.head.appendChild(styleTag)
  }
  if (isDark) {
    styleTag.setAttribute('href', '/themes/dark.css')
    appTag!.className = 'darkMode'
  } else {
    styleTag.setAttribute('href', '')
    appTag!.className = ''
  }
}

const updateColorWeak = (isColorWeak) => {
  const app = document.getElementById('html')
  isColorWeak ? app!.classList.add('colorWeak') : app!.classList.remove('colorWeak')
}

const updateGrayMode = (isGrayMode) => {
  const app = document.getElementById('html')
  isGrayMode ? app!.classList.add('grayMode') : app!.classList.remove('grayMode')
}

export { colorList, updateColorWeak, updateGrayMode, updateDarkMode }
