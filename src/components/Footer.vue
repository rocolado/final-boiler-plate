<template>
  <div class="container | col-12 | d-flex flex-column | justify-content-center">
    <router-link class="text-center" :to="homeRoute">
      <img class="" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg" alt="Logo">
    </router-link>

    <hr>

    <p class="text-center | fs-5">© 2022 MyTasks! All rights reserved. Built by Rocío Colado ⚡</p>
  </div>
</template>

<script setup>
// import { useRouter } from "vue-router";

const homeRoute = "/";
</script>

<style>
  img {
    height: 36px;
  }
</style>
