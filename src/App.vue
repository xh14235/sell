<template>
  <div id="app">
    <common-header :seller="seller"></common-header>
    <div class="tab border-bottom">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommonHeader from './components/header/Header'
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    CommonHeader
  },
  methods: {
    getData () {
      axios.get('/api/seller').then(this.getDataScuu)
    },
    getDataScuu (res) {
      this.seller = res.data.data
      // console.log(this.seller)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
  .tab
    display: flex
    line-height: .8rem
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        width: 100%
        height: 100%
        &.active
          color: rgb(240, 20, 20)
</style>
