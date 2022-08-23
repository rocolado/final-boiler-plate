<template>
  <div class="container | d-flex | justify-content-center">
    <div class="col-12 col-md-6">
      <div class="text-center">
        <a class="" href="#">
          <img class="" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648297523/taskApp/imgs/logo1_ryvwid.svg" alt="Logo">
        </a>

        <h1 class="mt-5">Register to MyTasks!</h1>
        <p class="">Start Organizing your tasks todays!</p>
        <p class="text-danger">{{errorMsg}}</p>
      </div>

      <form @submit.prevent="signUp">
        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="email">Email</label>
          <input class="form-control shadow-sm" 
                 type="email" 
                 placeholder="example@example.com" 
                 v-model="email" 
                 required>
        </div>

        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="password">Password</label>
          <input class="form-control shadow-sm" 
                 type="password" 
                 placeholder="**********" 
                 v-model="password"
                 required>
        </div>

        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="password">Confirm Password</label>
          <input class="form-control shadow-sm" 
                 type="password" 
                 placeholder="**********" 
                 v-model="confirmPassword"
                 required>
        </div>

        <div class="d-flex flex-column | mb-3">
          <button class="btn btn-success" type="submit">Sign Up</button>
        </div>
      </form>

      <div class="d-flex | justify-content-center">
        <p class="">Have an account?</p>
        <PersonalRouter :route="route" :buttonText="buttonText"/>
      </div>
    </div>

    <div class="col-md-6 | d-none d-md-flex" id="bg-image">
      <img class="bg-image" src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Background image">
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import PersonalRouter from "./PersonalRouter.vue";
  import { supabase } from "../supabase";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/user";
  import { storeToRefs } from "pinia";

  // Route Variables
  const route = "/auth/login";
  const buttonText = "Log In";

  // Input Fields
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");

  // Error Message
  const errorMsg = ref("");

  // Router to push user once SignedUp to Log In
  const redirect = useRouter();

  // Show hide password variable
  const passwordFieldType = computed(() =>
    hidePassword.value ? "password" : "text"
  );
  const hidePassword = ref(true);

  // Show hide confirmPassword variable


  // Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
  const signUp = async () => {
    if (password.value !== confirmPassword.value) {
      errorMsg.value = "Passwords do not match";

      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
      
    } else {
      try {
        await useUserStore().signUp(email.value, password.value);
        redirect.push({ path: route });

      } catch (error) {
        errorMsg.value = error.message;
        
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    }
  };
</script>

<style>

</style>
