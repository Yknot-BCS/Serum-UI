<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';
import { ethers } from 'ethers';
// import { computed } from 'vue';
import { useAccountStore } from 'stores/account';
// import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Header',
  components: {},
  setup() {
    const store = useAccountStore();

    return {
      store,
      //- Method to Fetch User Data
      // TODO ensure correct chain (ethereum mainnet)
      metamaskLogin: async () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        store.setAccountAddr(account);

      }
    };
  }
});
</script>
<template lang="pug">
q-header
  q-toolbar.row.q-py-sm.q-px-md.top-nav
    img.logo.q-mr-md(
      src='~assets/logo.png'
    )
    q-space
    .row(v-if="store.isAuthorized")
      | {{ store.getAccount }}
    q-btn(
      v-if="!store.isAuthorized"
      color="black"
      label="MetaMask Login"
      @click="metamaskLogin"
    )
</template>
<style scoped lang="sass">
.logo
  height: 60px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
