<template>
  <div class="modal modal_overlay">
    <div class="modal_content content">
      <div class="content_top top">
        <div class="top_body">
          <h1 class="top_title">
            <slot name="top_title"></slot>
          </h1>
          <p class="top_sub-title"><slot name="top_sub-title"></slot></p>
        </div>
        <img
          class="top_close"
          src="@/assets/icon/close.svg"
          alt="close"
          @click="$emit('closeModal')"
        />
      </div>
      <div class="bottom">
        <TextInput
          class="bottom_input"
          v-for="input in inputs"
          :key="input.id"
          :title="input.title"
          :placeholder="input.placeholder"
          :model="input.model"
          :error="errors[input.model]"
        />
        <div class="bottom_agreement agreement">
          <input class="agreement_checkbox" type="checkbox" />
          <p class="agreement_title">
            Я согласен с условиями
            <span class="agreement_title__underlined"
              >Политики конфиденциальности</span
            >
          </p>
        </div>
      </div>
      <div class="bottom_button-wrapper">
        <AddButton class="bottom_button" title="Добавить" @click="submitForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/components/ui/TextInput.vue";
import { useBookFormStore } from "@/stores/bookForm";
import { useBookCatalogStore } from "@/stores/bookCatalog";
import AddButton from "../ui/AddButton.vue";
import { ref } from "vue";

const emit = defineEmits(["clickButton", 'closeModal']);
const store = useBookFormStore();
const catalogStore = useBookCatalogStore();
const errors = ref<{ [key: string]: string }>({});
const currentYear = new Date().getFullYear();
const inputs = [
  {
    id: 1,
    title: "Название",
    placeholder: "Название произведения",
    model: "title",
  },
  {
    id: 2,
    title: "Автор",
    placeholder: "Имя и фамилия автора",
    model: "author",
  },
  { id: 3, title: "Год", placeholder: "Год выпуска", model: "year" },
  {
    id: 4,
    title: "Жанр",
    placeholder: "Добавьте жанр произведения",
    model: "genre",
  },
];

function submitForm() {
  const isValid = validateForm();

  if (!isValid) return;

  const newBook = {
    id: Date.now(),
    title: store.title,
    caregories: [store.author, store.year, store.genre],
  };

  catalogStore.addBook(newBook);
  emit("closeModal");
  store.resetForm();
}

function validateForm() {
  errors.value = {};

  if (!store.title.trim()) {
    errors.value.title = "Введите название книги";
  }

  if (!store.author.trim()) {
    errors.value.author = "Введите автора";
  }

  if (!store.year.trim()) {
    errors.value.year = "Введите год";
  } else if (isNaN(Number(store.year))) {
    errors.value.year = "Год должен быть числом";
  } else if (Number(store.year) > currentYear) {
    errors.value.year = `Год не может быть больше ${currentYear}`;
  }

  return Object.keys(errors.value).length === 0;
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
}

.modal_content {
  background-color: white;
  padding: 32px;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  z-index: 1001;
  margin: 0 20px;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: start;

  &_title {
    font-size: 20px;
    margin: 0 0 8px 0;
  }

  &_sub-title {
    font-size: $font-size-mobile;
    color: var(--dark-grey);
  }

  &_body {
    display: flex;
    flex-direction: column;
  }

  &_close {
    cursor: pointer;
  }
}

.bottom_input {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 16px;
  }
}

.agreement {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &_checkbox {
    appearance: none;
    -webkit-appearance: none;

    width: 16px;
    height: 16px;
    border: 2px solid var(--dark-grey);
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    &:checked::after {
      content: "";
      position: absolute;
      top: 0px;
      left: 3px;
      width: 4px;
      height: 8px;
      border: solid var(--dark-grey);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &_title {
    font-size: 10px;
    font-family: $font-family-base;
    color: var(--dark-grey);
    margin-left: 8px;

    &__underlined {
      font-size: 10px;
      border-bottom: 1px solid var(--dark-grey);
      padding-bottom: 2px;
    }
  }
}
.bottom {
  display: flex;
  flex-direction: column;
}

.bottom_button-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
