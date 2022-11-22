<script lang="ts">
import Tokens from 'components/Tokens.vue'
import NFTs from 'components/NFTs.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { Tokens ,NFTs },
});
</script>
<template lang="pug">
q-page
  .row
    Tokens
  .row
    NFTs
</template>

<style scoped lang="sass">
</style>
