<script lang="ts">
import tokenCountdown from 'components/tokenCountdown.vue'
import NFTs from 'components/NFTs.vue'
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { tokenCountdown ,NFTs },
  setup() {

    return { tokenCountdown };
  }
});
</script>
<template lang="pug">
q-page
  .row.full-width
    tokenCountdown
  .row-full-width
    NFTs
</template>

<style scoped lang="sass">
</style>
