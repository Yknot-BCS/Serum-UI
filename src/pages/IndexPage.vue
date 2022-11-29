<script lang="ts">
import NFTs from 'components/NFTs.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { NFTs },
});
</script>
<template lang="pug">
q-page
  .row
    q-item.token-data
      q-item-section
        .row.justify-center
          .h1_title Claim Your Tokens
        .row.justify-center
          .h2_title Time left to claim
            q-img.q-ma-xs(
              src='~assets/loading.svg',width="20px")
            | 44 days...
        .row.justify-center
          q-btn(
            label="Claim All"
          )
  .row
    NFTs
</template>

<style scoped lang="sass">
</style>
