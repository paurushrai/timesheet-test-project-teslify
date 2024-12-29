<script setup lang="ts">
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  type: "button",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--loading': loading }]"
    @click="emit('click', $event)"
  >
    <span class="btn__spinner" v-if="loading"></span>
    <span class="btn__content" :class="{ 'btn__content--hidden': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 3px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  height: 100%;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Variants
  &--primary {
    background: #2151c5;
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #2a63f6;
    }

    &:active:not(:disabled) {
      background: #73a5ed;
    }
  }

  &--secondary {
    background: #f5f5f5;
    color: #333;
    border: none;

    &:hover:not(:disabled) {
      background: #e8e8e8;
    }

    &:active:not(:disabled) {
      background: #ddd;
    }
  }

  &--outline {
    background: transparent;
    color: #0066ff;
    border: 1px solid #0066ff;

    &:hover:not(:disabled) {
      background: rgba(0, 102, 255, 0.05);
    }

    &:active:not(:disabled) {
      background: rgba(0, 102, 255, 0.1);
    }
  }

  // Sizes
  &--xsm {
    height: 32px;
    padding: 0 12px;
    font-size: 12px;
  }
  &--sm {
    height: 34px;
    padding: 0 12px;
    font-size: 14px;
  }

  &--md {
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  }

  &--lg {
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
  }

  // Loading state
  &--loading {
    cursor: wait;
  }

  &__spinner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__content {
    transition: opacity 0.2s;

    &--hidden {
      opacity: 0;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
