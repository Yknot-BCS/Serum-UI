<!-- eslint-disable @typescript-eslint/no-explicit-any -->
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

      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
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
      'function tokenURI(uint256) view returns (string)',
      'function walletOfOwner(address) view returns (uint256[])'
      ];
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const contract = new ethers.Contract('0x1B84f3Db0EC59e1854f24d03596585F9740c9266', ERC721_ABI, provider);
      const ownedTokens = await contract.walletOfOwner('0x2A0d9059075a84C280Db8f8542Bf7e7cD75F51f2');
      const name = await contract.name();
      const tokenData = await contract.tokenURI(1);

      console.log(name,tokenData, ownedTokens  );
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
      color="black"
      label="MetaMask Login"
      @click="getContractDetails"
    )
</template>
<style scoped lang="sass">
.logo
  height: 60px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
