<template>
  <div class="card">
    <div class="card_inner">
      <div class="card_title">
        <p class="title">{{ props.card?.title }}</p>
        <div class="card_add-icon">
          <img class="icon" src="@/assets/icon/file-edit.svg" alt="edit-icon" />
        </div>
      </div>
      <div class="card_categories">
        <div v-for="category in props.card?.caregories" :key="category">
          {{ category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  card: Object,
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";
.card {
  border: 1px solid var(--light-grey-color);
  border-radius: 16px;

  &_inner {
    padding: 16px;
  }

  &_categories {
    display: flex;
    gap: 16px;
    color: var(--dark-grey);
    font-size: $font-size-mobile;
  }

  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 9px;
  }

  :hover {
    background-color: var(--light-grey-color);
  }
}

.icon:hover {
  cursor: pointer;
}
</style>
