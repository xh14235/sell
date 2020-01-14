import Vue from 'vue'
import Router from 'vue-router'
import CommonGoods from 'components/goods/Goods'
import CommonRatings from 'components/ratings/Ratings'
import CommonSeller from 'components/seller/Seller'
import '../common/css/reset.css'
import '../common/css/style.css'
import '../common/css/border.css'
import '../common/css/mixin.styl'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: CommonGoods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: CommonRatings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: CommonSeller
    }
  ]
})
