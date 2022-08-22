<template>
  <div>Nav Component</div>
  <button class="btn btn-success" @click="signOut">{{buttonText}}</button>

  <span>{{user}}</span>
</template>

<script setup>
import { ref, computed } from "vue";
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

  return cleanEmail(useUserStore().user.email);
});

const signOut = async () => {
  console.log("sign out");
  try {
    await useUserStore().signOut();
    redirect.push({ path: route });

  } catch (error) {
    // errorMsg.value = `Error: ${error.message}`;
    
    // setTimeout(() => {
    //   errorMsg.value = null;
    // }, 5000);
  }
};
</script>

<style></style>
