<template>
  <div class="col-12 | d-flex flex-column | justify-content-center | bg-light | px-4 pt-3 pb-5">
    <div id="form" class="col-12 col-sm-10">
      <div class="text-center">
        <span id="task" class="fw-bold">TASK</span>
        <h1 id="h1" class="fw-bold | mt-2 mb-3">Add a new Task</h1>
        <h2 class="subtitle">Keep your life organized, prepare for a trip? Start here</h2>
        <h3 class="subtitle">Today's Date is {{today}}</h3>
      </div>

      <form class="my-5" @submit.prevent="addTask">
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
          <button id="button-add" class="btn" type="submit">Add</button>
        </div>

        <div v-if="errorMsg !== ''">
          <p class="text-danger text-center">{{errorMsg}}</p>
        </div>
      </form>
    </div>
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
        errorMsg.value = error.message;
        
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      } 

      emit("task", task);
    }
  };
</script>

<style>
  #task {
    font-size: 12px;
    color: rgb(14, 159, 110);
    border-radius: 15px;
    background-color: rgb(222, 247, 236);
    padding: 5px 10px;
  }

  #h1 {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
  }

  #form {
    max-width: 896px;
    margin: auto;
  }

  #button-add {
    color: white;
    background-color: rgb(3, 84, 63);
  }

  #button-add:hover {
    color: white;
    background-color: rgb(19, 104, 81);
  }

  @media (min-width: 768px) {
    #h1 {
      font-size: 48px;
    }

    .subtitle {
      font-size: 20px;
    }
  }
</style>
