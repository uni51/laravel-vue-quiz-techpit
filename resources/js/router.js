import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/page/Home'
import Quiz from './components/page/Quiz'
import Register from './components/page/Register'
import Login from './components/page/Login'
import MyPage from './components/page/MyPage'
import Keyword from './components/page/Keyword'

Vue.use(Router)

const router = new Router({
  mode: 'history', // SPAのURLにはhistoryモード(#ハッシュが付かないタイプを使います)
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home // URL「/」に対してHomeコンポーネントを使うという意味です
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz // URL「/quiz」に対してQuizコンポーネントを使うという意味です
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/keyword',
      name: 'keyword',
      component: Keyword
    },
  ]
})

// グローバルビフォーガード
// beforeEach関数内でnext()を呼ばない限り、ルーティングは次の画面にSPA遷移しません
router.beforeEach((to, from, next) => {
  // to.matchedでの配列の中でmeta.requiresAuthの要素があるものに対してのみ、処理を実行します。
  // ここではマイページのルーティングのみに対して処理を実行することになります。
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    router.app.$http.get("/api/user").then(response => {
      const user = response.data;
      if (user) {
        next()
      } else {
        next({
          path: '/login',
        })
      }
    }).catch(error => {
      if (error.response.status === 401) {
        alert("未認証のユーザーのためログイン画面でログインを行ってください");
      } else {
        alert("予期しないエラーが発生しました。再度ログインを行ってください");
      }
      next({
        path: '/login',
      })
    });
  } else {
    next()
  }
})
export default router
