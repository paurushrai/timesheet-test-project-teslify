<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const activeItem = ref('tasks')

const setActive = (item: string) => {
  activeItem.value = item
}
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <!-- Tasks/Checkmark -->
        <li class="sidebar__item">
          <a
            href="#"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': activeItem === 'tasks' }"
            @click="setActive('tasks')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="sidebar__icon"
            >
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              />
            </svg>
            <span class="sidebar__tooltip">Tasks</span>
          </a>
        </li>

        <!-- Documents -->
        <li class="sidebar__item">
          <a
            href="#"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': activeItem === 'documents' }"
            @click="setActive('documents')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="sidebar__icon"
            >
              <path
                d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"
              />
            </svg>
            <span class="sidebar__tooltip">Documents</span>
          </a>
        </li>

        <!-- Team -->
        <li class="sidebar__item">
          <a
            href="#"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': activeItem === 'team' }"
            @click="setActive('team')"
          >
            <Icon icon="ri:team-fill" height="20" class="sidebar__icon" />
            <span class="sidebar__tooltip">Team</span>
          </a>
        </li>

        <!-- Settings -->
        <li class="sidebar__item">
          <a
            href="#"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': activeItem === 'settings' }"
            @click="setActive('settings')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="sidebar__icon"
            >
              <path
                d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
              />
            </svg>
            <span class="sidebar__tooltip">Settings</span>
          </a>
        </li>
      </ul>

      <!-- Help at bottom -->
      <div class="sidebar__bottom">
        <a
          href="#"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': activeItem === 'help' }"
          @click="setActive('help')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="sidebar__icon"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
            />
          </svg>
          <span class="sidebar__tooltip">Help</span>
        </a>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss">
.sidebar {
  width: 56px;
  height: 100vh;
  // background-color: #2c2c2c;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #ffffff;
  border-right: 1px solid #dfe1e6;

  &__nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: 8px;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    margin: 0 auto;
    border-radius: 4px;
    position: relative;
    color: #a6a6a6;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f4f5f7;

      .sidebar__tooltip {
        opacity: 1;
        visibility: visible;
      }
    }

    &--active {
      color: var(--primary-color);
      background-color: #cbdff8;

      &:hover {
        color: #4c9aff;
      }
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  &__tooltip {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-color: #404040;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    margin-left: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    pointer-events: none;

    &::before {
      content: "";
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: transparent #404040 transparent transparent;
    }
  }

  &__bottom {
    margin-top: auto;
    padding: 8px 0;
  }
}
</style>
