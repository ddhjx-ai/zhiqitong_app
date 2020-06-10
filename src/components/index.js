/**
 * 需要注册为全局组件就在这里引入，并添加到 components 对象中，不用操作其它地方。
 * 
 * 例如：在这里引入了 BaseButton 在页面中就可以直接用  <base-button>按钮</base-button>
 * 
 */

// import BaseButton from './button/BaseButton'
const components = {
  // BaseButton,
}





function install(Vue) {

  if (install.installed) {
    return
  }

  install.installed = true

  for (const key in components) {
    if (components.hasOwnProperty(key)) {
      Vue.component(key, components[key])
    }
  }
}

export default install