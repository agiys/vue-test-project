import { defineStore } from 'pinia';

export const useBookCatalogStore = defineStore('bookCatalog', {
  state: () => ({
    books: [
      {
        id: 1,
        title: 'Как разговаривать с кем угодно, когда угодно, где угодно',
        caregories: ['Ларри Кинг', '2011', 'Научпоп'],
      },
      {
        id: 2,
        title: 'Больше, чем просто красивая. 12 тайных сил женщины, перед которой невозможно устоять',
        caregories: ['Кара Кинг', '2020', 'Научпоп'],
      },
      {
        id: 3,
        title: 'Как разговаривать с кем угодно, когда угодно, где угодно',
        caregories: ['Ларри Кинг', '2011', 'Научпоп'],
      },
    ],
  }),

  actions: {
    addBook(book: { id: number; title: string; caregories: string[] }) {
      this.books.push(book);
    },
  },
});
