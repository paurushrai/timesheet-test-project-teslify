<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div class="app-container">
    <NavBar class="navbar" />
    <div class="main-container">
      <SideBar class="sidebar" />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-container {
  min-height: 100vh;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 100;
}

.main-container {
  display: flex;
  padding-top: 56px;
  min-height: calc(100vh - 56px);
}

.sidebar {
  position: fixed;
  left: 0;
  top: 56px;
  height: calc(100vh - 56px);
}

.content {
  margin-left: 56px;
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  height: calc(100vh - 56px);
}
</style>
