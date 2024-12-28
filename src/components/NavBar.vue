<script setup lang="ts">
import { Icon } from "@iconify/vue";

</script>

<template>
  <nav class="navbar">
    <div class="navbar__left">
      <!-- App switcher and logo -->
      <button class="navbar__app-switcher">
        <Icon icon="gg:menu-grid-r" height="30"  />
      </button>
      <div class="navbar__logo">
        <Icon icon="logos:jira" height="20" width="20" /> <span>JIRA</span>
      </div>

      <!-- Main navigation items -->
      <ul class="navbar__items">
        <li class="navbar__item">
          <a href="#" class="navbar__link">Your work</a>
        </li>
        <li class="navbar__item navbar__item--has-dropdown">
          <a href="#" class="navbar__link">
            Projects
            <Icon icon="mingcute:down-fill" />
          </a>
        </li>
        <li class="navbar__item navbar__item--has-dropdown">
          <a href="#" class="navbar__link">
            Filters
            <Icon icon="mingcute:down-fill" />
          </a>
        </li>
        <li class="navbar__item navbar__item--has-dropdown">
          <a href="#" class="navbar__link">
            Dashboards
            <Icon icon="mingcute:down-fill" />
          </a>
        </li>
        <li class="navbar__item">
          <a href="#" class="navbar__link">
            People
          </a>

        </li>
        <li class="navbar__item navbar__item--has-dropdown">
          <a href="#" class="navbar__link">
            Apps
            <Icon icon="mingcute:down-fill" />
          </a>
        </li>
      </ul>

      <!-- Create button -->
      <button class="navbar__create-btn">Create</button>
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
        <button class="navbar__avatar">
          <img src="/src/assets/avatar.jpeg" alt="User avatar" />
        </button>
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
    // width: 24px;
    // height: 24px;
    // margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
    }
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
      // .navbar__link {
        // padding-right: 24px;

        // i {
        //   position: absolute;
        //   right: 8px;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   font-size: 12px;
        // }
      // }
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

    &:hover {
      background-color: #f4f5f7;
    }
  }

  &__create-btn {
    padding: 6px 12px;
    background-color: #0052cc;
    color: white;
    border: none;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #0065ff;
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

  &__avatar {
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
