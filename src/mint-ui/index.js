import Vue from 'vue';
import './style.css' 
/**
 * 
 * 在这里引入 mint-ui的样式文件, 便于修改样式
 并且去掉 .babel.config.js > plugins > {
  "libraryName": "mint-ui",
  "style": true
}
 */

// import 'mint-ui/lib/style.css'

import {
  Button,
  Cell,
  Badge,
  Search,
  Checklist,
  Popup,
  Swipe,
  SwipeItem,
  Picker,
  Toast,
  Indicator,
  MessageBox,
  DatetimePicker,
} from 'mint-ui'

  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Badge.name, Badge);
  Vue.component(Search.name, Search);
  Vue.component(Checklist.name, Checklist);
  Vue.component(Popup.name, Popup);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Picker.name, Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$indicator = Vue.prototype.$indicator = Indicator;
