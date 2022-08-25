<template>
  <div class="bg-white | rounded shadow | px-4 pt-3 pb-4">
    <div class="d-flex | justify-content-center">
      <div id="svg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
      </div>
    </div>

    <h4 class="fw-bold">{{task.title}}</h4>
    <p>{{task.description}}</p>
    
    <div class="d-flex | justify-content-between">
      <button id="button-complete" class="btn" v-if="!complete" @click="completeTask">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
      </button>

      <button class="btn btn-info" v-else @click="completeTask">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path></svg>
      </button>

      <button class="btn btn-warning" @click="edit = !edit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
      </button>

      <button class="btn btn-danger" @click="deleteTask">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </div>

    <div class="d-flex flex-column" v-if="edit">
      <input class="form-control shadow-sm | my-4"
             type="text" 
             placeholder="Edit title"
             v-model="title">

      <input class="form-control shadow-sm | mb-4"
             type="text" 
             placeholder="Edit description"
             v-model="description">

      <button id="button-complete" class="btn" @click="updateTask">Add</button>

      <div v-if="errorMsg !== ''">
        <p class="text-danger text-center">{{errorMsg}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useTaskStore } from "../stores/task";
  import { getCurrentInstance } from 'vue';
  
  const { emit } = getCurrentInstance();

  const props = defineProps(["task"]);
  
  const complete = ref(props.task.is_complete);

  const edit = ref(false);

  // Input Fields
  const title = ref("");
  const description = ref("");

  // Error Message
  const errorMsg = ref("");
  

  const completeTask = async () => {
    try {
      const task = await useTaskStore().completeTask(props.task.id, !complete.value);

      complete.value = task[0].is_complete;

    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    if (!title.value && !description.value) {
      errorMsg.value = "Fields cannot be empty";

      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);

    } else { 
      try {
        props.task.title = title.value;
        props.task.description = description.value;
    
        await useTaskStore().updateTask(props.task);
  
        title.value = "";
        description.value = "";
        edit.value = !edit.value;
  
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTask = async () => {
    try {
      const deletedTask= await useTaskStore().deleteTask(props.task.id);

      if (deletedTask) {
        emit("fetch-task");
      } 

    } catch (error) {
      console.log(error);
    }
  };
</script>

<style>
  svg {
    color: white;
    height: 25px;
  }

  #svg {
    border-radius: 100px;
    background-color: #0E9F6E;
    padding: 10px;
  }

  #button-complete {
    color: white;
    background-color: rgb(3, 84, 63);
  }

  #button-complete:hover {
    color: white;
    background-color: rgb(19, 104, 81);
  }
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, 
think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important 
variable, a string to store an error, a string to store the value of the task that the 
user can edit, an initial 
false boolean to hide the inputFIeld used to edit the new task detail or details
[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the 
homeView for editing, deleting and toggling the status[completed, not complted] 
of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. 
This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title]
 is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the 
 error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data 
 property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
