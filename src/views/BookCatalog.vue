<template>
  <main class="container">
    <div class="header">
      <div class="header_inner">
        <div class="header_top top">
          <img class="top_img" src="@/assets/icon/logo.svg" alt="logo" />
          <div class="top_search-wrapper">
            <img
              class="top_search-icon"
              src="@/assets/icon/search.svg"
              alt="Search"
            />
            <input
              type="text"
              class="top_search"
              v-model="searchQuery"
              placeholder="Найти ту самую книгу"
            />
          </div>
        </div>
        <div class="header_bottom bottom">
          <h1 class="bottom_title">
            {{ searchQuery === "" ? "Книги в каталоге" : "Книги по запросу" }}
            <span class="filtered-count">
              {{
                searchQuery === "" ? filteredBooks.length : `«${searchQuery}»`
              }}
            </span>
          </h1>
          <AddButton
            class="bottom_button"
            title="Добавить книгу"
            @click="togleModal"
          />
        </div>
      </div>
    </div>
    <div class="catalog">
      <BookPage v-for="card in filteredBooks" :key="card.id" :card="card" />
      <p class="catalog_empty" v-if="filteredBooks.length <= 0">
        По вашему запросу ничего не найдено
      </p>
    </div>
    <EditBookModal @closeModal="togleModal" v-if="isModalOpen">
      <template v-slot:top_title>
        <div>Добавить книгу</div>
      </template>
      <template v-slot:top_sub-title>
        <div>Заполните все поля и добавьте книгу в список</div>
      </template>
    </EditBookModal>
  </main>
</template>

<script setup lang="ts">
import BookPage from "@/components/BookPage.vue";
import AddButton from "@/components/ui/AddButton.vue";
import EditBookModal from "@/components/modals/EditBookModal.vue";
import { useBookCatalogStore } from "@/stores/bookCatalog";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

defineEmits(["closeModal"]);
const isModalOpen = ref(false);
const bookCatalogStore = useBookCatalogStore();
const { books } = storeToRefs(bookCatalogStore);
const searchQuery = ref("");

const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return books.value;

  return books.value.filter((book) => book.title.toLowerCase().includes(query));
});

const togleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.container {
  padding: 0 40px;
  margin: 0 auto;
}

.header {
  background-color: var(--light-grey-color);
  margin-left: -40px;
  margin-right: -40px;
  padding-left: 40px;
  padding-right: 40px;

  &_inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  &_top {
    display: flex;
    margin-bottom: 16px;
    padding-top: 16px;
    align-items: center;
  }

  &_bottom {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    align-items: center;
  }
}

.bottom_title {
  font-size: 20px;
}

.filtered-count {
  margin-left: 8px;
  font-size: 20px;
  font-weight: $font-weight-bold;
  color: var(--dark-grey);
}

.top {
  &_img {
    margin-right: 25px;
  }

  &_search-wrapper {
    position: relative;
    flex: 1;
    align-self: center;
  }

  &_search-icon {
    position: absolute;
    left: 12px;
    top: 48%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    pointer-events: none;
  }

  &_search {
    width: 100%;
    min-height: 41px;
    border-radius: 8px;
    border: none;
    padding: 10px 12px 10px 36px;
    font-size: $font-size-mobile;
    text-align: start;
  }
}

.catalog {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &_empty {
    color: var(--dark-grey);
  }
}

@media (max-width: 481px) {
  .bottom_button {
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 16px;
    transform: none;
    width: auto;
    text-align: center;
  }

  .container {
    padding: 0 30px;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 0 20px;
  }
}
</style>
