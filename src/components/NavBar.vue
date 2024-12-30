<script setup lang="ts">
// dependencies
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import CommonButton from "./CommonButton.vue";

// data
import navRoutes from "../data/navRoutes";

import Avatar from "./Avatar.vue";
import router from "../router";

const activeItem = ref(navRoutes[0].name);

const setActive = (item: string) => {
  activeItem.value = item;
  router.push("/YourWork");
};

onMounted(() => {
  router.push("/YourWork");
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar__left">
      <!-- App switcher and logo -->
      <button class="navbar__app-switcher">
        <Icon icon="gg:menu-grid-r" height="30" />
      </button>
      <div class="navbar__logo">
        <Icon icon="logos:jira" height="20" width="20" />
        JIRA
      </div>

      <!-- Main navigation items -->
      <ul class="navbar__items">
        <li
          class="navbar__item"
          v-for="navLink in navRoutes"
          :key="navLink.name"
        >
          <router-link
            :to="navLink.route"
            class="navbar__link"
            :class="{ 'navbar__link--active': activeItem === navLink.name }"
            @click="setActive(navLink.name)"
          >
            {{ navLink.name }}
            <Icon
            v-if="navLink.subRoute && navLink.subRoute.length"
            icon="mingcute:down-fill"
            height="20"
            width="20"
            class="navbar__icon"
          />
          </router-link>
        </li>
      </ul>

      <!-- Create button -->
      <CommonButton size="xsm">Create</CommonButton>
    </div>

    <div class="navbar__right">
      <!-- Search -->
      <div class="navbar__search">
        <Icon icon="bx:bx-search" class="navbar__search-icon" />
        <input type="text" class="navbar__search-input" placeholder="Search" />
      </div>

      <!-- Right side icons -->
      <div class="navbar__icons">
        <button class="navbar__icon-btn">
          <Icon icon="gridicons:bell" height="25" width="25" />
        </button>
        <button class="navbar__icon-btn">
          <Icon icon="mingcute:question-fill" height="25" width="25" />
        </button>
        <button class="navbar__icon-btn">
          <Icon icon="weui:setting-filled" height="25" width="25" />
        </button>
        <Avatar />
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #dfe1e6;

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__app-switcher {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: #f4f5f7;
    }
  }

  &__logo {
    display: contents;
    font-size: larger;
  }

  &__items {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 4px;
  }

  &__item {
    position: relative;

    &--has-dropdown {
      // TODO: Add dropdown styles
    }
  }

  &__link {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    color: #42526e;
    text-decoration: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    position: relative;

    &:hover {
      background-color: #f4f5f7;
    }

    &--active {
      color: var(--primary-color);

      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__search {
    position: relative;
    width: 240px;

    &-icon {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #42526e;
    }

    &-input {
      width: 100%;
      padding: 8px 8px 8px 32px;
      border: 2px solid transparent;
      border-radius: 3px;
      background-color: #f4f5f7;
      font-size: 14px;

      &:focus {
        border-color: #4c9aff;
        background-color: white;
        outline: none;
      }
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__icon-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 3px;
    color: #42526e;
    cursor: pointer;

    &:hover {
      background-color: #f4f5f7;
    }
  }
}
</style>
