<template>
  <div class="container | d-flex | justify-content-center">
    <div class="col-12 col-md-6">
      <div class="text-center">
        <a class="" href="#">
          <img class="" src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648297523/taskApp/imgs/logo1_ryvwid.svg" alt="Logo">
        </a>

        <h1 class="mt-5">Register to MyTasks!</h1>
        <p class="">Start Organizing your tasks todays!</p>
      </div>

      <form action="">
        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="email">Email</label>
          <input class="form-control shadow-sm" type="email" placeholder="example@example.com">
        </div>

        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="password">Password</label>
          <input class="form-control shadow-sm" type="password" placeholder="**********">
        </div>

        <div class="d-flex flex-column | mb-3">
          <label class="form-label" for="password">Confirm Password</label>
          <input class="form-control shadow-sm" type="password" placeholder="**********">
        </div>

        <div class="d-flex flex-column | mb-3">
          <button class="btn btn-success" type="submit">Sign In</button>
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
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/login";
const buttonText = "Log In";

// Input Fields

// Error Message

// Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
</script>

<style>

</style>
