<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'Header',
  components: {},
  setup() {

    const chadContract = '0x1B84f3Db0EC59e1854f24d03596585F9740c9266';

    return {
        chadContract
    };

  },
  methods: {

    getAccountDetails:async () => {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const chainId = await provider.send('eth_chainId', []);
      const account = accounts[0];
      const balance = await provider.getBalance(account);

      console.log(accounts, account, balance, chainId);
    },

    getContractDetails:async () => {

      const ERC721_ABI = [
      'function balanceOf(address) view returns (uint)',
      'function name() view returns (string)',
      'function tokenOfownerByIndex(address, index) view returns (uint)',
      'function totalSupply() view returns (uint)',
      'function tokenByIndex(index) view returns (uint)'
      ];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract('0x1B84f3Db0EC59e1854f24d03596585F9740c9266', ERC721_ABI, provider);
      const totalSupply = await contract.totalSupply();
      const name = await contract.name();
      const balance = await contract.balanceOf('0xd04da43d4a6e3434399a495e6a0f5c426ecec3ea')

      console.log(name, totalSupply , balance);
      }
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
    q-btn(
      label="MetaMask Login"
      @click="getContractDetails"
    )
</template>
<style scoped lang="sass">
.logo
  height: 50px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
