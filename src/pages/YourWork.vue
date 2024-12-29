<script setup lang="ts">
// dependencies
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Avatar from "../components/Avatar.vue";

const userName = ref("Divya Shah");
const selectedTimeframe = ref("days");

</script>

<template>
  <div class="your-work">
    <header class="header">
      <div class="user-info">
        <Avatar />
        <span class="user-name">{{ userName }}</span>
      </div>
      <div class="controls">
        <select v-model="selectedTimeframe" class="timeframe-select">
          <option value="days">Days</option>
        </select>
        <button class="log-time-btn">Log time</button>
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
      gap: 0.5rem;

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
          padding: 0px 2px;
        }
      }
    }
  }
}
</style>
