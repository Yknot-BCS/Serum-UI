<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'Header',
  components: {},
  setup() {
    return {

    };
  },
  methods: {

    getAccountDetails:async () => {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', []);
      const chainId = await provider.send('eth_chainId', []);
      const account = accounts[0];
      const balance = await provider.getBalance(account);

      console.log(accounts, account, balance, chainId);
    }
  }
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
          id="ethereumButton"
          label="MetaMask Login"
          @click="getAccountDetails"
        )
</template>
<style scoped lang="sass">
.logo
  height: 70px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
