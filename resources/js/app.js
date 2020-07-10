import Vue from 'vue'
import router from './router.js'
import SocialSharing from 'vue-social-sharing'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios'
import MainPage from './components/page/MainPage'
global.jQuery = global.$ = require('jquery');
require('bootstrap');

Vue.prototype.$http = axios;

axios.defaults.headers.common['Authorization'] = "Bearer " + document
  .querySelector('meta[name="api-token"]')
  .getAttribute("content");

Vue.use(SocialSharing);
Vue.use(Loading);

new Vue({
  router: router, // routerにはrouter.jsファイルを設定します
  components: {
    app: MainPage
  }
}).$mount('#app') // routerを適用する要素を設定(マウント)します
