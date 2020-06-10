

# WISave
通过整合图像识别、大数据、云服务、物联网技术手段，与传统加热炉的控制技术相结合，致力于为客户打造“智能化加热炉”新概念，让客户不管身在何方，都能实时掌控加热炉的运营状况，做到“WISave在手，心中都有”的使用新体验。


# 写给开发人员的：

## 关于架构
- 该项目采用 [Vue CLI 3](https://cli.vuejs.org/zh/) 生成。

## 关于CSS

- 项目采用 [sass](https://www.sass.hk/) 扩展。
  
- [src/assets/scss/variables.scss](./src/assets/scss/variables.scss) 定义了全局变量，无需再使用文件中引入，项目中用到的一些公共尺寸和颜色都在`src/assets/scss/var/`下面定义，可以直接使用。
  > 2018-11-06 补充: 日了狗,设计图太多种颜色和字号了,我已经没有耐心了,大家随意怎么弄吧, 写代码嘛,开心就好😄

  
- 项目采用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 替代大家熟知的 rem 适配方案，在写样式的时候直接按照设计图的尺寸写 `px` 单位就行。
  
- [src/assets/scss/mixin.scss](./src/assets/scss/mixin.scss)
  里边定义了`1px`边框、文本超出省略号、多倍图icon的使用等`mixin`实现，同样已经注册为全局了，不需要在页面中引入即可使用。

- [src/assets/scss/base.scss](./src/assets/scss/base.scss)有一些基础类方便使用，例如页面中有 `<base-header>页面标题</base-header>`，只需要在页面最顶层`div`添加`class="has-base-header"`即可正确布局。


## 关于组件
- 项目引入了组件库[mint-ui](https://mint-ui.github.io/docs/#/zh-cn2), 采用按需引入的方式, 如果需要引入某个组件, 需要在`src/mint-ui/index.js`打开该组件的注释. 你也可以直接通过`src/mint-ui/style.css`来修改组件的样式.
- 引用图片资源按就近原则，例如 `src/components/header` 路径下，如果你觉得图片太多太乱了，你也可以在该目录下添加一个`img`文件夹。`BaseHeader.vue` 依赖的图片就放在当前文件夹，这样做的目的是为了方便维护。
- 如果要将你写的组件注册为全局组件，只需要在`src/components/index.js`文件里边添加就行了。

## 关于图表
- 图表采用[echarts](http://echarts.baidu.com/), 采用按需引入的方式, 如果需要引入某个组件, 需要在`src/plugins/echarts.js`打开该组件的注释

## 关于路由
- 页面的路由和文件基本都定义好了。如果你需要添加，根据已有的规则添加即可。
- 页面中跳转请使用 `{name: 'PathName', query: {id: 111}}` 的形式。



## 关于命名规则

- 参照 [风格指南——Vue.js](https://cn.vuejs.org/v2/style-guide/)。所有文件 `.vue` 文件都采用手写字母大写。

## 关于引入第三方工具（插件、组件）

- 全局的请**不要**在`main.js`以外的地方引入。因为这样能让同事更直观地知道项目中的全局工具。
- 局部的就在使用的地方引入。