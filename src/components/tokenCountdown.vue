<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'tokenCountdown',

});
</script>
<template lang="pug">
q-item.count-down
  q-item-section
    h5 Claim Your Tokens
    h6 Time left to claim 85 days
    q-btn(
      color="red",

    )
</template>
<style scoped lang="sass">
.count-down
  box-shadow: 0px 1px #ECECEC,
  background-color:  #F5F4F4 
</style>
