<template>
  <nav class="col-12 | d-flex | justify-content-between align-items-center | px-2 px-md-4 py-3 m-auto">
    <router-link :to="homeRoute">
      <img class="logo" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg" alt="Logo">
    </router-link>

    <button id="button-menu">
      <svg class="menu | d-md-none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" style="fill: rgb(3, 84, 63);"><path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path></svg>
    </button>

    <div class="d-none d-md-flex | justify-content-end align-items-center">
      <p id="welcome" class="text-end | my-0">Welcome Back <span class="fw-bold">{{user}}</span></p>

      <button id="button-logout" class="btn | ms-5" @click="signOut">{{buttonText}}</button>
    </div>
  </nav>
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
  nav {
    max-width: 1280px;
    margin: auto;
  }

  .logo {
    height: 24px;
  }

  #welcome {
    font-size: 14px;
  }

  #button-menu {
    border: none;
    background-color: transparent;
    padding: 10px 0px;
    border-radius: 10px;
  }

  #button-menu:hover {
    background-color: rgba(57, 163, 135, 0.2);
  }

  #button-menu:active {
    border: 2px solid rgb(3, 84, 63);
    cursor: pointer;
  }

  #button-logout {
    color: white;
    background-color: rgb(3, 84, 63);
  }

  #button-logout:hover {
    color: white;
    background-color: rgb(19, 104, 81);
  }

  @media (min-width: 576px) {
    .logo {
      height: 36px;
    }
  }
</style>
