<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent} from 'vue';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'Header',
  components: {},
  setup() {
    //- Chad Contract Address
    const chadContract = '0x1B84f3Db0EC59e1854f24d03596585F9740c9266';
    const ERC721_ABI = [
      'function walletOfOwner(address) view returns (uint256[])',
      'function tokenURI(uint256) view returns (string)',
      'function tokenOfownerByIndex(address, index) view returns (uint)'
    ];
    return {
      chadContract,
      ERC721_ABI,
      //- Method to Fetch User Data
      getAccountDetails:async () => {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const account = accounts[0];
      const contract = new ethers.Contract(chadContract, ERC721_ABI, provider);
      console.log(account, contract);
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
    q-btn(
      color="black"
      label="MetaMask Login"
      @click="getAccountDetails"
    )
</template>
<style scoped lang="sass">
.logo
  height: 60px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
