<template>
  <div>Nav Component</div>
  <button class="btn btn-success" @click="signOut">{{buttonText}}</button>

  <span>{{user}}</span>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Route Variable
const route = "/auth/login";
const buttonText = "Log Out";

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
    redirect.push({ path: route });

  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
