<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  components: {},
  setup() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    const showAccount = document.querySelector('.showAccount');
    return {
      ethereumButton,
      showAccount
    };
  },
  methods: {
    getAccount:async () => {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      this.showAccount.innerHTML = account;

      return account;
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
          @click="getAccount"
        )
</template>
<style scoped lang="sass">
.logo
  height: 70px
.top-nav
  box-shadow: 0px 1px #ECECEC,
  background-color: black
</style>
