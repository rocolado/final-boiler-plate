<template>
  <div class="container | d-flex | justify-content-center">
    <div class="col-12 col-md-6">
      <div class="text-center">
        <a class="" href="#">
          <img class="" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648297523/taskApp/imgs/logo1_ryvwid.svg" alt="Logo">
        </a>

        <h1 class="mt-5">Log In to MyTasks!</h1>
        <p class="">Start Organizing your tasks todays!</p>
        <p class="text-danger">{{errorMsg}}</p>
      </div>

      <form @submit.prevent="signIn">
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
          
          <div class="d-flex">
            <input class="form-control shadow-sm" 
                  :type="passwordFieldType" 
                  placeholder="**********" 
                  v-model="password"
                  required>

            <span @click="changePasswordInputType">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class=""><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </span>
          </div>
        </div>

        <div class="d-flex flex-column | mb-3">
          <button class="btn btn-success" type="submit">Sign In</button>
        </div>
      </form>

      <div class="d-flex | justify-content-center">
        <p class="">Don't have an account?</p>
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
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/user";
  import { storeToRefs } from "pinia";

  // Route Variables
  const route = "/auth/sign-up";
  const buttonText = "Sign Up";

  // Input Fields
  const email = ref("");
  const password = ref("");

  // Error Message
  const errorMsg = ref("");

  // Router to push user once SignedIn to the HomeView
  const redirect = useRouter();


  //Show hide password variables
  const hidePassword = ref(true);

  const passwordFieldType = computed(() =>
    hidePassword.value ? "password" : "text"
  );
  
  const changePasswordInputType = () => {
    hidePassword.value = !hidePassword.value;
  };


  // Arrow function to SignIn user to supaBase
  const signIn = async () => {
    try {
      await useUserStore().signIn(email.value, password.value);
      redirect.push({ path: "/" });

    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  };
</script>

<style>
</style>
