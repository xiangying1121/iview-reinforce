import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'view-design/dist/styles/iview.css';
import { Table, Page ,Poptip,CheckboxGroup, Icon, DatePicker,Button , Input, Select} from 'view-design';
import rFilterTable from './components/index.js'
Vue.component('Table', Table);
Vue.component('Page', Page);
Vue.component('Poptip', Poptip);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('Icon', Icon);
Vue.component('DatePicker', DatePicker);
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.use(rFilterTable)
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
