<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

});
</script>
<template lang="pug">
q-layout(view='hHh Lpr fff')
  q-header
    q-toolbar.row.q-py-sm.q-px-md.top-nav
      .row.full-length.items-center
        .col-auto
            img.logo.q-mr-md(
              src='~assets/quasar-logo-vertical.svg'
            )
        .col
  q-page-container
    router-view

</template>
<style scoped lang="sass">
.logo
  height: 70px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
