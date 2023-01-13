<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from 'src/stores/login';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Header',
  components: {},
  setup() {
    const loginStore = useLoginStore();
    const isAuthorized = storeToRefs(loginStore).isAuthorized;
    const router = useRouter();

    function logOut() {
      loginStore.clear();
      router.push({ name: 'login' });
    }
    return {
      isAuthorized,
      logOut
    };
  }
});
</script>

<template lang="pug">
q-header
  q-toolbar.row.q-py-xs.q-px-md.top-nav
    h5(style="color: white") Fuelswitch Analytics
    q-space
    q-btn.q-mr-md(outline v-if='isAuthorized' @click="logOut()") Log Out

</template>

<style scoped lang="sass">
.top-nav
  max-height: 80px,
  box-shadow: 0px 2px #BBBBBB,
  background: linear-gradient(to bottom right, $primary, $secondary)
</style>
