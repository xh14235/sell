<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) of itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'CommonStar',
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType () {
      const star1 = 'star-' + this.size
      return star1
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/css/mixin.styl'
  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: .4rem
        height: .4rem
        margin-right: .44rem
        &:last-child
          margin-right: 0
        background-size: .4rem .4rem
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: .3rem
        height: .3rem
        margin-right: .12rem
        &:last-child
          margin-right: 0
        background-size: .3rem .3rem
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: .2rem
        height: .2rem
        margin-right: .06rem
        &:last-child
          margin-right: 0
        background-size: .2rem .2rem
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
