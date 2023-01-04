<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
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
      network: ref({
        chainId: 0,
        name: ''
      }),
      //- Method to Fetch User Data
      // TODO ensure correct chain (ethereum mainnet)
      metamaskLogin: async () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        store.setAccountAddr(account);

      }
    };
  },
  computed: {
    correctNetwork(): boolean {
      return this.network.chainId === 1 || this.network.chainId === 5;
    }
  },

  async mounted() {
    // check if the correct network is selected
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    this.network = await provider.getNetwork();
    console.log(this.network)

    if (!this.correctNetwork) {
      this.$q.notify({
        message: 'Please connect to the Ethereum Mainnet',
        color: 'negative',
        position: 'top',
        timeout: 5000,
      });
    }
  }
});
</script>
<template lang="pug">
q-header
  q-toolbar.row.q-py-sm.q-px-md.top-nav
    router-link.row.items-center.cursor-pointer(:to='{ name: "home" }')
      img.logo.q-mr-md(
        src='~assets/logo.png'
      )
    q-space
    .row(v-if="store.isAuthorized")
      | {{ store.getAccount }}
    .row(v-if="!correctNetwork")
      .text-red Select Ethereum Network
    q-btn(
      v-if="!store.isAuthorized && correctNetwork"
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
