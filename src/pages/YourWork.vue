<script setup lang="ts">
// dependencies
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Avatar from "../components/Avatar.vue";
import TimeLog from "../components/Modals/TimeLog.vue";
import CommonDropdown from "../components/CommonDropdown.vue";
import CommonButton from "../components/CommonButton.vue";
import DatePicker from "../components/DatePicker.vue";
import TimeLogSheet from "../components/TimeLogSheet.vue";

const userName = ref("Divya Shah");
const showModal = ref(false);
// Simple string options
const timeOptions = ["Days", "Weeks", "Months", "Year"];

// Or object options for more complex cases
const groupingOptions = [
  { id: "issues", label: "Issues" },
  { id: "epics", label: "Epics" },
  { id: "assignee", label: "Assignee" },
  { id: "reporter", label: "Reporter" },
  { id: "project", label: "Project" },
  { id: "label", label: "Label" },
  { id: "sprint", label: "Sprint" },
  { id: "status", label: "Status" },
  { id: "priority", label: "Priority" },
  { id: "type", label: "Type" },
  { id: "created", label: "Created" },
  { id: "updated", label: "Updated" },
  { id: "resolved", label: "Resolved" },
  { id: "completed", label: "Completed" },
];
const handleClose = () => {
  showModal.value = false;
};

const handleLogTime = () => {
  showModal.value = true;
};

const handleSubmit = (data: any) => {
  console.log("Submitted data:", data);
  showModal.value = false;
};

const handleTimeFrameSelection = (value: string) => {
  console.log("Selected:", value);
};

const handleSelectedGroupBy = (value: any) => {
  console.log("Selected:", value);
};
</script>

<template>
  <div class="your-work-container">
    <header class="header">
      <div class="user-info">
        <Avatar />
        <span class="user-name">{{ userName }}</span>
      </div>
      <div class="controls">
        <CommonDropdown
          :options="timeOptions"
          @option-selected="handleTimeFrameSelection"
          width="100px"
        />

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
    <div class="filters">
      <DatePicker />
      <div class="filters__group">
        <span>Group by</span>
          <CommonDropdown
            :options="groupingOptions"
            @option-selected="handleSelectedGroupBy"
            width="160px"
          />
        </div>
    </div>
    <div class="time-log-sheet-container">
      <TimeLogSheet />
    </div>
  </div>
</template>

<style lang="scss">
.your-work-container {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;

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

  .filters {
    display: flex;
    gap: 2rem;

    .filters__group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 12px;
      padding-bottom: 20px;
    }
  }

  .time-log-sheet-container {
    overflow:scroll ;
  }
}
</style>
