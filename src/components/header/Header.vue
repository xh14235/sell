<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img class="avatar-img" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          {{seller.name}}
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports"  @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <div class="bull-title"></div>
      <div class="bull-text">{{seller.bulletin}}</div>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-img">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <common-star :size="48" :score="seller.score"></common-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) of seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CommonStar from 'components/star/Star'
export default {
  name: 'CommonHeader',
  props: {
    seller: Object
  },
  data () {
    return {
      detailShow: false
    }
  },
  components: {
    CommonStar
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/css/mixin.styl'
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: .48rem .24rem .36rem .48rem
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        width: 1.28rem
        .avatar-img
          width: 100%
          border-radius: .1rem
      .content
        display: inline-block
        vertical-align: top
        margin-left: .16rem
        .title
          font-size: .32rem
          line-height: .36rem
          font-weight: bold
          margin-top: .04rem
          margin-bottom: .16rem
          .brand
            display: inline-block
            vertical-align: top
            width: .6rem
            height: .36rem
            bg-image('brand')
            background-repeat: no-repeat
            background-size: .6rem .36rem
        .description
          font-size: .24rem
          font-weight: 200
          line-height: .24rem
        .support
          margin-top: .2rem
          margin-bottom: .04rem
          .icon
            display: inline-block
            vertical-align: top
            width: .24rem
            height: .24rem
            margin-right: .08rem
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
            background-size: .24rem .24rem
          .text
            font-size: .2rem
            font-weight: 200
            line-height: .24rem
        .support-count
          position: absolute
          right: .12rem
          bottom: .32rem
          background: rgba(0,0,0,.2)
          padding: .14rem .16rem
          border-radius: .24rem
          .count
            vertical-align: top
            font-size: .2rem
          .icon-keyboard_arrow_right
            margin-left: .02rem
            line-height: .24rem
            font-size: .2rem
    .bulletin-wrapper
      display: flex
      box-sizing: border-box
      padding: .16rem .24rem
      background: rgba(7, 17, 27, 0.2)
      .bull-title
        flex: 0 0 .44rem
        bg-image('bulletin')
        background-repeat: no-repeat
        background-size: .44rem .24rem
      .bull-text
        flex: 0 1 auto
        font-size: .2rem
        margin-left: .16rem
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .icon-keyboard_arrow_right
        flex: 0 0 .24rem
        font-size: .2rem
    .bg-img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
      img
        width: 100%
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 1.28rem
          padding-bottom: .64rem
          .name
            line-height: .32rem
            text-align: center
            font-size: .32rem
            font-weight: 700
          .star-wrapper
            margin-top: .36rem
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 0 auto
            margin-top: .56rem
            margin-bottom: .48rem
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              padding: 0 .24rem
              font-weight: 700
              font-size: .28rem
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 .24rem
              margin-bottom: .24rem
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: .32rem
                height: .32rem
                vertical-align: top
                margin-right: .12rem
                background-size: .32rem .32rem
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: .32rem
                font-size: .24rem
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 .24rem
              line-height: .48rem
              font-size: .24rem
      .detail-close
        position: relative
        width: .64rem
        height: .64rem
        margin: 0 auto
        margin-top: -1.28rem
        clear: both
        font-size: .64rem
</style>
