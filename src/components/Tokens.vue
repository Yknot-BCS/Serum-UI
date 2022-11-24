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
      h5 Claim Your Tokens
    .row.justify-center
      h6 Time left to claim 85 days
    .row.justify-center
      q-btn(
        label="Claim All"
      )
</template>
<style scoped lang="sass">
.token-data
  box-shadow: 0px 1px #ECECEC,
  background-color:  #F5F4F4
  width: 100%
  height: 300px
</style>
