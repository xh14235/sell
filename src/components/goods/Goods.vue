<template>
  <div class="goods">
    <div class="menu" ref="menu">
      <ul>
        <li v-for="(item, index) of goods" :key="index" class="menu-item border-bottom" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods" ref="foods">
      <ul>
        <li class="food-list" v-for="(item, index) of goods" :key="index" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-bottom" v-for="(food, index) of item.foods" :key="index">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="month">月售{{food.sellCount}}份</span><span class="good">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="fuhao">￥</span><span class="now">{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  name: 'CommonGoods',
  props: {
    seller: Object
  },
  data () {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let hei1 = this.listHeight[i]
        let hei2 = this.listHeight[i + 1]
        if (!hei2 || (this.scrollY >= hei1 && this.scrollY < hei2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    getData () {
      axios.get('/api/goods').then(this.getDataSucc)
    },
    getDataSucc (res) {
      this.goods = res.data.data
      this.$nextTick(() => {
        this.calcHeight()
      })
    },
    scroll () {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foods, {
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calcHeight () {
      let foodList = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodList
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    }
  },
  mounted () {
    this.getData()
    this.scroll()
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/css/mixin.styl'
  .goods
    display: flex
    position: absolute
    top: 3.48rem
    bottom: .92rem
    width: 100%
    overflow: hidden
    .menu
      flex: 0 0 1.6rem
      width: 1.6rem
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12rem
        padding: 0 .24rem
        line-height: .28rem
        &.current
          background: #fff
        .icon
          display: inline-block
          vertical-align: top
          width: .24rem
          height: .24rem
          margin-right: .04rem
          background-size: .24rem .24rem
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 1.12rem
          font-size: .24rem
          vertical-align: middle
    .foods
      flex: 1
      .title
        background: #f3f5f7
        font-size: .24rem
        line-height: .52rem
        padding-left: .28rem
        border-left: 2px solid #d9dde1
      .food-item
        padding: .36rem
        display: flex
        .icon
          flex: 0 0 1.12rem
          width: 1.12rem
          margin-right: .1rem
          img
            width: 100%
        .content
          flex: 1
          .name
            font-size: .28rem
            color: rgb(7,17,27)
            line-height: .28rem
            margin-top: .04rem
          .desc, .extra
            font-size: .2rem
            color: rgb(147,153,159)
            line-height: .2rem
            margin-top: .16rem
            .month
              margin-right: .24rem
          .price
            font-size: .2rem
            font-weight: 700
            line-height: .2rem
            margin-top: .16rem
            color: rgb(147, 153, 159)
            .fuhao
              color: rgb(240, 20, 20)
            .now
              font-size: .32rem
              margin-right: 8px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
</style>
