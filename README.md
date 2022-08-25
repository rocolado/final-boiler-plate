# Final project
This is the final project done in Frontend Ironhack Bootcamp.
The project is a duplicate of [TaskApp](https://vue-supabase-todo.vercel.app/auth).

The [TaskApp](https://vue-supabase-todo.vercel.app/auth) allows you to create multiple tasks for the current user that is logged in.  
The main functionalities to implement are "Sing up", "Sign in", "Sign out", "Create task", "Update task" and "Delete task".  
  
## Technologies
***
The project is created with:

* Vue 3
* Vue router
* Pinia
* Vite
* Supabase
* Bootstrap 5

## Project Setup
***
```
npm install
```

**Set Up your Environment Variables from Supabase located at the root folder of the project**
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY 
```  

Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database.

### Compile and Hot-Reload for Development
```
npm run dev
```

### Compile and Minify for Production
```
npm run build
```  

## Journal
***      
### **Day 1 - 18/08**
I have been writting the README file for the project and installing Bootstrap 5.  

### **Day 2 - 19/08**
I have finished the structure of the "SignUp" page and I started to work in the styles.
Also, I have finished the implementation of the "SignUp" functionality with Supabase.  

### **Day 3 - 22/08**
I have finished the "SignIn" functionality and I implemented the "Nav" component with the "Log Out" functionality in the home.
  
### **Day 4 - 23/08**
I have been working in "NewTask" component, saving in Supabase database the new task that I created.
Also, I started the comunication between the "Home" component and "NewTask" component to share the data between those.  

### **Day 5 - 24/08**
Today I have finished all the functionalities of "TaskItem" component. 
I have implemented the functionality of show and hide the password inputs of "SignIn" and "SignUp" components too.