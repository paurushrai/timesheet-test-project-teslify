<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["option-selected"]);

const isOpen = ref(false);
const selectedOption = ref("Days");
const options = ref(["Days", "Weeks", "Months", "Year"]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: any) => {
  selectedOption.value = option;
  isOpen.value = false;
  emit("option-selected", option);
};

// Handle click outside
const handleClickOutside = (e:any) => {
  if (!e.target.closest(".dropdown-container")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="dropdown-container">
    <button
      class="dropdown-toggle"
      @click="toggleDropdown"
      :class="{ active: isOpen }"
    >
      {{ selectedOption }} <span class="arrow" :class="{ up: isOpen }">
        <Icon icon="mingcute:down-fill" height="20" />
      </span>
    </button>
    <div class="dropdown-menu" v-if="isOpen">
      <div
        v-for="option in options"
        :key="option"
        class="dropdown-item"
        :class="{ selected: selectedOption === option }"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  width: 100px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.dropdown-toggle {
  width: 100%;
  padding: 6px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #bbb;
  }

  &.active {
    border-color: #999;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .arrow {
    font-size: 10px;
    transition: transform 0.2s ease;

    &.up {
      transform: rotate(180deg);
    }
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  &.selected {
    background: #f0f0f0;
    font-weight: 500;
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
}
</style>
