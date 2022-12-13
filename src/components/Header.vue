<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Header',
  components: {}
});
</script>

<template lang="pug">
q-header
  q-toolbar.row.q-py-xs.q-px-md.top-nav
    h5(style="color: white") Fuelswitch Analytics
</template>

<style scoped lang="sass">
.top-nav
  max-height: 80px,
  box-shadow: 0px 2px #BBBBBB,
  background: linear-gradient(to bottom right, $primary, $secondary)
</style>
