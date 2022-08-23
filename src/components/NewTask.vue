<template>
  <div class="container | col-10 | d-flex flex-column | justify-content-center">
    <div class="text-center">
      <span>TASK</span>
      <h1 class="fw-bold">Add a new Task</h1>
      <h2 class="fs-5">Keep your life organized, prepare for a trip? Start here</h2>
      <h3 class="fs-6">Today's Date is {{today}}</h3>
    </div>

    <form @submit.prevent="addTask">
      <div class="mb-3">
        <input class="form-control shadow-sm | py-2" 
               type="text" 
               placeholder="Add a Task Title" 
               v-model="title">
      </div>

      <div class="mb-3">
        <input class="form-control shadow-sm | py-2" 
               type="text" 
               placeholder="Add a Task Description" 
               v-model="description">
      </div>

      <div class="d-flex flex-column | mb-3">
        <button class="btn btn-success" type="submit">Add</button>
      </div>

      <div v-if="errorMsg !== ''">
        <p class="text-danger text-center">{{errorMsg}}</p>
      </div>
    </form>

  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useTaskStore } from "../stores/task";
  import { getCurrentInstance } from 'vue';

  const { emit } = getCurrentInstance();

  const today = `${new Date().toLocaleDateString('en-us', {month:"short", day:"numeric", year:"numeric"})}`;

  // Input Fields
  const title = ref("");
  const description = ref("");

  // Error Message
  const errorMsg = ref("");

  // Arrow function to SignIn user to supaBase
  const addTask = async () => {
    if (!title.value && !description.value) {
      errorMsg.value = "Title & Description are needed";

      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);

    } else {
      let task = null;

      try {
        task = await useTaskStore().addTask(title.value, description.value);
        title.value = "";
        description.value = "";

    
      } catch (error) {
        console.log("Error", error);
        errorMsg.value = "Title & Description are needed";
        
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      } 

      emit("task", task);
    }
  };
// constant to save a variable that define the custom event that will be emitted to 
//the homeView
</script>

<style>
  h1 {
    font-size: 48px;
  }
</style>
