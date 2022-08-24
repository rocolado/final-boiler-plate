import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),

  actions: {
    async fetchTasks() {
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
        
      if (error) throw error;
      this.tasks = tasks;
      return this.tasks;
    },
    
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
      
      if (error) throw error;
      if (data) return data;
    },

    async completeTask(id, complete) {
      const { data, error } = await supabase.from("tasks").update({is_complete: complete}).match({id: id});
      
      if (error) throw error;
      if (data) return data;
    },

    async updateTask(task) {
      const { data, error } = await supabase.from("tasks").update({title: task.title, description: task.description}).match({id: task.id});
      
      if (error) throw error;
      if (data) return data;
    },

    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({id: id});
      
      if (error) throw error;
      if (data) return data;
    }
  },
});
