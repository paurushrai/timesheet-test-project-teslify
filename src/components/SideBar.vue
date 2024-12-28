<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const activeItem = ref("tasks");

const setActive = (item: string) => {
  activeItem.value = item;
};
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
            <Icon
              icon="fluent:calendar-todo-32-light"
              height="20"
              class="sidebar__icon"
            />

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
            <Icon
              icon="mdi:clipboard-text-history"
              height="20"
              class="sidebar__icon"
            />
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
            <Icon
              icon="weui:setting-filled"
              height="20"
              class="sidebar__icon"
            />
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
          <Icon icon="mingcute:question-fill" height="25" width="25" />
          <span class="sidebar__tooltip">Help</span>
        </a>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss">
.sidebar {
  width: 56px;
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
    color: #42526e;
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
