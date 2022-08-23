<template>
  <router-link :to="homeRoute">
    <img class="" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg" alt="Logo">
  </router-link>

  <span>Welcome Back {{user}}</span>

  <button class="btn btn-success" @click="signOut">{{buttonText}}</button>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/user";

  // Route Variable
  const logInRoute = "/auth/login";
  const buttonText = "Log Out";

  const homeRoute = "/";

  // Router to push user once SignedOut to the SignIn view
  const redirect = useRouter();

  const cleanEmail = (user) => user.split("@")[0];

  const user = computed(() => {
    useUserStore().fetchUser();

    if(useUserStore().user !== null) {
      return cleanEmail(useUserStore().user.email);
    }
  });

  const signOut = async () => {
    try {
      await useUserStore().signOut();
      redirect.push({ path: logInRoute });

    } catch (error) {
      console.log(error);
    }
  };
</script>

<style></style>
