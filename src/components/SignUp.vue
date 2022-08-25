<template>
  <div id="mid" class="d-flex | justify-content-center align-items-center | mx-5 mx-md-0">
    <div class="col-12 col-md-6 | px-md-5">
      <div class="text-center">
        <a class="" href="#">
          <img id="logo" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648297523/taskApp/imgs/logo1_ryvwid.svg" alt="Logo">
        </a>

        <h1 class="fs-1 | mt-5">Register to MyTasks!</h1>
        <p class="fs-5">Start Organizing your tasks todays!</p>
        <p class="text-danger">{{errorMsg}}</p>
      </div>

      <form id="container" @submit.prevent="signUp">
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
          
          <div class="d-flex | position-relative | align-items-center">
            <input class="form-control shadow-sm" 
                  :type="passwordFieldType" 
                  placeholder="**********" 
                  v-model="password"
                  required>
            
            <span class="position-absolute" @click="changePasswordInputType">
              <svg id="icon-pass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class=""><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </span>
          </div>
        </div>

        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="password">Confirm Password</label>
          
          <div class="d-flex | position-relative | align-items-center">
            <input class="form-control shadow-sm" 
                  :type="confirmPasswordFieldType" 
                  placeholder="**********" 
                  v-model="confirmPassword"
                  required>

            <span class="position-absolute" @click="changeConfirmPasswordInputType">
              <svg id="icon-pass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class=""><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </span>
          </div>
        </div>

        <div class="d-flex flex-column | mb-3">
          <button id="button-sign-in" class="btn" type="submit">Sign Up</button>
        </div>
      </form>

      <div class="d-flex | justify-content-center">
        <p class="fw-bold | me-2">Have an account?</p>
        <PersonalRouter id="link" class="fw-bold" :route="route" :buttonText="buttonText"/>
      </div>
    </div>

    <div class="col-md-6 | d-none d-md-flex" id="bg-image"></div>
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
  const hidePassword = ref(true);

  const passwordFieldType = computed(() =>
    hidePassword.value ? "password" : "text"
  );

  const changePasswordInputType = () => {
    hidePassword.value = !hidePassword.value;
  }

  // Show hide confirm password variable
  const hideConfirmPassword = ref(true);

  const confirmPasswordFieldType = computed(() =>
    hideConfirmPassword.value ? "password" : "text"
  );

  const changeConfirmPasswordInputType = () => {
    hideConfirmPassword.value = !hideConfirmPassword.value;
  }


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
  #mid {
    align-content: center;
    height: 100vh;
  }

  #container {
    max-width: 500px;
    margin: auto;
  }

  #logo {
    width: 40px;
  }

  span {
    right: 10px;
  }

  #icon-pass {
    color: rgb(46, 46, 46);
    height: 20px;
  }

  #button-sign-in {
    color: white;
    background-color: rgb(3, 84, 63);
  }

  #button-sign-in:hover {
    color: white;
    background-color: rgb(19, 104, 81);
  }

  #link {
    color: rgb(3, 84, 63);
    text-decoration: none;
  }

  #link:hover {
    background-color: transparent;
    text-decoration: underline;
  }

  #bg-image {
    background-image: url("https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
  }
</style>
