<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore, Login } from '../stores/login';

export default defineComponent({
  name: 'LoginPage',
  components: {},
  setup() {
    const email = ref('');
    const password = ref('');
    const loginStore = ref(useLoginStore()).value;

    const router = useRouter();

    async function OnSubmit() {
      const loginInformation = <Login>{
        username: email.value,
        password: password.value
      };
      loginStore.setLoginDetails(loginInformation);
      await loginStore.authorize().then(() => {
        if (loginStore.isAuthorized) {
          router.push({ name: 'home' });
        }
      });
    }
    return {
      email,
      password,
      loginStore,
      OnSubmit
    };
  }
});
</script>

<template lang="pug">
q-page.flex-center.column
  q-card.q-pa-sm.q-ma-sm.card(dark bordered)
    q-card-section.q-pa-md
      div.text-h6.row.justify-center Login Page
    q-separator(dark inset)
    q-card-section.q-pa-md
      q-form.q-gutter-md.q-pt-md(@submit="OnSubmit()")
        q-input(
          dark
          filled
          v-model="email"
          label="Email"
          color="white"
          label-color="gray"
          standout="text-white"
          lazy-rule
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          )
        q-input(
          dark
          filled
          v-model="password"
          label="Password"
          type="password"
          color="white"
          label-color="gray"
          standout="text-white"
          lazy-rule
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          )
        div.q-pr-md
          q-btn.full-width(label="Log In" type="submit" color="secondary")


</template>

<style scoped lang="sass">
.card
  background: linear-gradient(to right , $primary, $secondary)
  width: 55%
  min-width: 400px
</style>
