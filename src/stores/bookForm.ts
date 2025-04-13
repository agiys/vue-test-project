import { defineStore } from 'pinia';

export const useBookFormStore = defineStore('bookForm', {
  state: () => ({
    title: '',
    author: '',
    year: '',
    genre: '',
  }),
  actions: {
    resetForm() {
      this.title = '';
      this.author = '';
      this.year = '';
      this.genre = '';
    },
  },
});
