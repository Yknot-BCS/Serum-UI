<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { defineComponent } from 'vue';
import KYCCompletion from 'components/KYCCompletion.vue';
import Devices from 'components/Devices.vue';
import REC from 'components/REC.vue';
import { useLoginStore } from 'src/stores/login';

export default defineComponent({
  name: 'IndexPage',
  components: { KYCCompletion, Devices, REC },
  data() {
    return {
      showUI: 'none'
    }
  },
  computed: {
    finishedLoading () {
      return useLoginStore().isLoaded
    }
  },
  watch: {
    finishedLoading () {
      this.showUI = 'all';
    }
  }
});
</script>

<template lang="pug">
q-page.flex-center.column
  KYCCompletion.card
  Devices.card
  REC.card
</template>

<style scoped lang="sass">
.card
  background: linear-gradient(to right , $primary, $secondary)
  width: 55%
  min-width: 400px
  display: v-bind('showUI')
</style>
