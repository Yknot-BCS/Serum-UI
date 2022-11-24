<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'Tokens',

});
</script>
<template lang="pug">
q-item.token-data
  q-item-section
    .row.justify-center
      .h1_title Claim Your Tokens
    .row.justify-center
      .h2_title Time left to claim
        q-img.q-ma-xs(
          src='~assets/loading.svg',width="20px")
        | 85 days...
    .row.justify-center
      q-btn(
        label="Claim All"
      )
</template>
<style scoped lang="sass">
.h1_title
  font-size: calc(2.5vw + 12px)
  font-family: 'one-pop', sans-serif
  font-weight: 700
  letter-spacing: 1px
  margin-bottom: 25px
  text-transform: capitalize
  text-align: center

.h2_title
  font-size: 1.3rem
  font-family: 'Quicksand', sans-serif
  font-weight: 700
  letter-spacing: 1px
  text-transform: capitalize
  margin-bottom: 25px

.token-data
  box-shadow: 0px 1px #ECECEC,
  background-color:  #F5F4F4
  width: 100%
  height: 250px
</style>
