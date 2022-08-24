<template>
  <div>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"  xmlns:v="https://vecta.io/nano"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg> -->

    <h4>{{task.title}}</h4>
    <p>{{task.description}}</p>
    
    <div>
      <!-- <button class="btn btn-success" v-if="!complete" @click="completeTask">Complete</button> -->
      <button class="btn" :class="[complete ? 'btn-info' : 'btn-success']" @click="completeTask">{{textButton}}</button>

      <button class="btn btn-warning" @click="edit = !edit">Edit</button>
      <button class="btn btn-danger" @click="deleteTask">Delete</button>
    </div>

    <div v-if="edit">
      <input class=""
             type="text" 
             placeholder="title"
             v-model="title">

      <input class=""
             type="text" 
             placeholder="description"
             v-model="description">

      <button class="btn btn-info" @click="updateTask">Add</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useTaskStore } from "../stores/task";
  // const emit = defineEmits([
  //   "ENTER-EMITS-HERE"

  // ]);

  const props = defineProps(["task"]);
  
  const complete = ref(props.task.is_complete);

  const edit = ref(false);

  const textButton = ref(props.task.is_complete ? "Uncomplete" : "Complete");

  // Input Fields
  const title = ref("");
  const description = ref("");

  const completeTask = async () => {
    console.log("valor del complete", complete.value);
    
    try {
      const task = await useTaskStore().completeTask(props.task.id, !props.task.is_complete);

      complete.value = task[0].is_complete;
      console.log("valor del complete después", complete.value);

      textButton.value = task[0].is_complete ? "Uncomplete" : "Complete";
      console.log("valor del text button", textButton.value);

    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
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
  };
</script>

<style></style>

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
