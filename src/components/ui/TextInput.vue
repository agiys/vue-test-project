<template>
  <div class="input">
    <p class="input_title">{{ props?.title }}</p>
    <input
      class="input_text"
      type="text"
      :placeholder="props?.placeholder"
      :value="(store as any)[props.model!]"
      @input="updateValue"
      :class="{ error_border: props.error }"
    />
    <p v-if="props.error" class="input_error">{{ props.error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useBookFormStore } from "@/stores/bookForm";
const store = useBookFormStore();

const props = defineProps({
  title: String,
  placeholder: String,
  model: String,
  error: String,
});

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  if (props.model && target) {
    (store as any)[props.model] = target.value;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.input_title {
  font-weight: $font-weight-bold;
  font-size: $font-size-mobile;
  margin-bottom: 5px;
}

.input_text {
  border: none;
  background-color: var(--light-grey-color);
  font-size: $font-size-mobile;
  font-family: $font-family-base;
  line-height: 150%;
  width: 100%;
  padding: 12px 10px;
  border-radius: 8px;
}

.input_error {
  color: var(--primary-red);
  font-size: 12px;
  margin-top: 4px;
}

.error_border {
  border: 1px solid var(--primary-red) !important;
}
</style>
