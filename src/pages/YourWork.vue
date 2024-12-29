<script setup lang="ts">
// dependencies
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Avatar from "../components/Avatar.vue";
import TimeLog from "../components/Modals/TimeLog.vue";
import TimeFrameDropdown from "../components/TimeFrameDropdown.vue";
import CommonButton from '../components/CommonButton.vue';


const userName = ref("Divya Shah");
const showModal = ref(false);

const handleClose = () => {
  showModal.value = false;
};

const handleLogTime = () => {
  showModal.value = true;
}

const handleSubmit = (data: any) => {
  console.log("Submitted data:", data);
  showModal.value = false;
};
</script>

<template>
  <div class="your-work">
    <header class="header">
      <div class="user-info">
        <Avatar />
        <span class="user-name">{{ userName }}</span>
      </div>
      <div class="controls">
        <TimeFrameDropdown />
        <CommonButton @click="handleLogTime" size="sm">Log Time</CommonButton>
        <TimeLog
          :is-open="showModal"
          @close="handleClose"
          @submit="handleSubmit"
        />
        <button class="more-btn">
          <Icon
            icon="ph:dots-three-outline-fill"
            class="more-btn__icon"
            height="25"
            width="25"
          />
        </button>
      </div>
    </header>
  </div>
</template>

<style lang="scss">
.your-work {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .user-name {
        font-weight: 500;
      }
    }

    .controls {
      display: flex;
      gap: 1rem;

      .log-time-btn {
        background-color: #0052cc;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
          background-color: #0047b3;
        }
      }

      .more-btn {
        color: #45526c;
        background: none;
        cursor: pointer;
        border-radius: 3px;
        border: 2px solid #dfe1e6;

        &__icon {
          width: 100%;
          height: 100%;
          padding: 0px 3px;
        }
      }
    }
  }
}
</style>
