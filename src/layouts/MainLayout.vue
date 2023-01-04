<!-- eslint-disable vue/no-reserved-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';
import Header from 'components/Header.vue'
import Footer from 'components/Footer.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { Header, Footer },

});
</script>
<template lang="pug">
q-layout(view='hHh Lpr fff')
  Header
  q-page-container
    router-view
  q-footer
    Footer
</template>

