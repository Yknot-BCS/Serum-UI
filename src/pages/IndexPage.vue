<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { defineComponent } from 'vue';
import KYCCompletion from 'components/KYCCompletion.vue';
import Devices from 'components/Devices.vue';
import REC from 'components/REC.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { KYCCompletion, Devices, REC },
});
</script>

<template lang="pug">
q-page.flex-center.column(v-cloak)
  KYCCompletion(v-cloak).card
  Devices.card
  REC.card
</template>

<style scoped lang="sass">
.card
  background: linear-gradient(to right , $primary, $secondary)
  width: 55%
  min-width: 400px
[v-cloak]
  display: none
</style>
