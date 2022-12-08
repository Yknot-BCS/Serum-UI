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
    h5(style="color: black") Analytics Tool
</template>

<style scoped lang="sass">
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: white
</style>
