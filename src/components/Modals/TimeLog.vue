<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import CommonButton from "../CommonButton.vue";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (
    e: "submit",
    data: { date: string; time: string; description: string }
  ): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const date = ref("");
const time = ref("");
const description = ref("");
const searchQuery = ref("");

const handleSubmit = () => {
  emit("submit", {
    date: date.value,
    time: time.value,
    description: description.value,
  });
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal" @click.stop>
      <div class="modal__header">
        <h1 class="modal__title">Log time</h1>
      </div>

      <div class="modal__content">
        <div class="modal__search">
          <input
            type="text"
            class="modal__input"
            placeholder="Search issues"
            v-model="searchQuery"
          />
          <Icon
            icon="material-symbols:search"
            class="modal__search-icon"
            width="20"
            height="20"
          />
        </div>

        <!-- Date and Time inputs -->
        <div class="modal__row">
          <div class="modal__field">
            <input
              type="date"
              class="modal__input"
              placeholder="Date"
              v-model="date"
            />
            <Icon
              icon="material-symbols:calendar-month"
              class="modal__field-icon"
              width="20"
              height="20"
            />
          </div>

          <div class="modal__field">
            <input
              type="text"
              class="modal__input"
              placeholder="0h"
              v-model="time"
            />
            <Icon
              icon="material-symbols:schedule-outline-rounded"
              class="modal__field-icon"
              width="20"
              height="20"
            />
          </div>
        </div>

        <!-- Description -->
        <div class="modal__field">
          <input
            type="text"
            class="modal__input"
            placeholder="Description"
            v-model="description"
          />
          <Icon
            icon="material-symbols:description-outline"
            class="modal__field-icon"
            width="20"
            height="20"
          />
        </div>
      </div>

      <div class="modal__footer">
        <CommonButton variant="secondary" size="sm" @click="handleClose">Cancel</CommonButton>
        <CommonButton variant="primary" size="sm" @click="handleSubmit">Log Time</CommonButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 16px rgba(9, 30, 66, 0.08);

  &__header {
    padding: 20px 24px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    color: #172b4d;
    margin: 0;
  }

  &__content {
    padding: 24px;
  }

  &__row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;

    .modal__field {
      flex: 1;
    }
  }

  &__field {
    position: relative;
    margin-bottom: 16px;
  }

  &__field-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b778c;
  }

  &__search {
    position: relative;
    margin-bottom: 16px;
  }

  &__search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b778c;
  }

  &__input {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #dfe1e6;
    border-radius: 3px;
    font-size: 14px;
    color: #172b4d;

    &::placeholder {
      color: #6b778c;
    }

    &:focus {
      border-color: #4c9aff;
      outline: none;
      box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
    }
  }

  &__footer {
    padding: 16px 24px;
    border-top: 1px solid #dfe1e6;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
