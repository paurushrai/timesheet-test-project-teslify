<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

interface DropdownProps {
  options: Array<string | { id: string; label: string }>
  label?: string
  initialValue?: string
  width?: string
  variant?: 'default' | 'jira'
}

const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  label: '',
  initialValue: '',
  width: '120px',
  variant: 'default'
})

const emit = defineEmits<{
  'option-selected': [value: string]
}>()

const isOpen = ref(false)
const selectedOption = ref(props.initialValue || (typeof props.options[0] === 'string' ? props.options[0] : props.options[0].label))

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const getOptionLabel = (option: string | { id: string; label: string }): string => {
  return typeof option === 'string' ? option : option.label
}

const getOptionValue = (option: string | { id: string; label: string }): string => {
  return typeof option === 'string' ? option : option.id
}

const selectOption = (option: string | { id: string; label: string }) => {
  selectedOption.value = getOptionLabel(option)
  isOpen.value = false
  emit('option-selected', getOptionValue(option))
}

const handleClickOutside = (e: MouseEvent) => {
  if (!(e.target as Element).closest('.dropdown-container')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dropdown-container" :class="{ 'jira-style': variant === 'jira' }">
    <div v-if="label" class="dropdown-label">{{ label }}</div>
    <button
      class="dropdown-toggle"
      @click="toggleDropdown"
      :class="{ active: isOpen }"
      :style="{ width }"
      type="button"
    >
      <span class="selected-text">{{ selectedOption }}</span>
      <span class="arrow" :class="{ up: isOpen }">
        <Icon icon="mingcute:down-fill" height="20" />
      </span>
    </button>
    <div class="dropdown-menu" v-if="isOpen">
      <div
        v-for="option in options"
        :key="getOptionValue(option)"
        class="dropdown-item"
        :class="{ selected: selectedOption === getOptionLabel(option) }"
        @click="selectOption(option)"
      >
        {{ getOptionLabel(option) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  &.jira-style {
    .dropdown-label {
      color: #42526E;
      font-weight: 500;
    }

    .dropdown-toggle {
      border: 2px solid #DFE1E6;
      border-radius: 3px;
      color: #42526E;

      &:hover {
        background-color: #F4F5F7;
      }

      &.active {
        border-color: #4C9AFF;
        box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
      }
    }

    .dropdown-menu {
      box-shadow: 0 4px 8px -2px rgba(9, 30, 66, 0.25),
                  0 0 1px rgba(9, 30, 66, 0.31);
    }

    .dropdown-item {
      color: #42526E;

      &:hover {
        background-color: #F4F5F7;
      }

      &.selected {
        background-color: #DEEBFF;
        color: #0052CC;
      }
    }
  }
}

.dropdown-label {
  font-size: 14px;
  color: #333;
}

.dropdown-toggle {
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

  .selected-text {
    flex: 1;
  }

  .arrow {
    display: flex;
    align-items: center;
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