<template>
  <div class="container | col-12 | d-flex flex-column | justify-content-center | py-4">
    <router-link class="text-center" :to="homeRoute">
      <img class="logo" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg" alt="Logo">
    </router-link>

    <p class="fs-6 fw-bold text-center | pt-4">© 2022 MyTasks! All rights reserved. Built by Rocío Colado ⚡</p>
  </div>
</template>

<script setup>
// import { useRouter } from "vue-router";

const homeRoute = "/";
</script>

<style>
  .logo {
    height: 24px;
  }

  @media (min-width: 576px) {
    .logo {
      height: 36px;
    }
  }
</style>
