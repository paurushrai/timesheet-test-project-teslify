<template>
  <button class="avatar">
    <img src="/src/assets/avatar.jpeg" alt="" />
  </button>
</template>

<style scoped>
.avatar {
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
</style>