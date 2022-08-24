<template>
  <div class="container | col-12 | d-flex | justify-content-between | px-3 my-4">
    <router-link :to="homeRoute">
      <img class="" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg" alt="Logo">
    </router-link>

    <div class="d-flex | justify-content-end align-items-center">
      <p class="text-end | m-0">Welcome Back <span class="fw-bold">{{user}}</span></p>

      <button class="btn btn-success" @click="signOut">{{buttonText}}</button>
    </div>
  </div>
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

<style>
  img {
    height: 24px;
  }
</style>
