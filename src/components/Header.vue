<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',

});
</script>
<template lang="pug">
q-header
  q-toolbar.row.q-py-sm.q-px-md.top-nav
    .row.full-length.items-center
      .col-10
        img.logo.q-mr-md(
          src='~assets/logo.png'
        )
      .col-2
        q-btn(
          color="yellow"
        )
</template>
<style scoped lang="sass">
.logo
  height: 70px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
