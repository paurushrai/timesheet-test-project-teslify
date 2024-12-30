<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import CommonButton from "./CommonButton.vue";

interface DateRange {
  start: Date;
  end: Date;
}

const isOpen = ref(false);
const startDate = ref(new Date());
const endDate = ref(new Date());
const currentViewMonth = ref(new Date());
const hoveredDate = ref<Date | null>(null);
const isSelectingRange = ref(false);

const emit = defineEmits<{
  "date-change": [range: DateRange];
}>();

const formatDisplayDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

const formatInputDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const dateRange = computed(() => {
  return `${formatDisplayDate(startDate.value)} - ${formatDisplayDate(
    endDate.value
  )}`;
});

const quickSelections = [
  { label: "Current week", action: "currentWeek" },
  { label: "Last week", action: "lastWeek" },
  { label: "Current month", action: "currentMonth" },
  { label: "Last month", action: "lastMonth" },
  { label: "Current quarter", action: "currentQuarter" },
  { label: "Last quarter", action: "lastQuarter" },
];

const getMonthDays = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  // Add previous month's days
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month, -i),
      isCurrentMonth: false,
    });
  }

  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  return days;
};

const months = computed(() => {
  return [
    {
      label: currentViewMonth.value.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      days: getMonthDays(currentViewMonth.value),
    },
    {
      label: new Date(
        currentViewMonth.value.getFullYear(),
        currentViewMonth.value.getMonth() + 1
      ).toLocaleString("default", { month: "long", year: "numeric" }),
      days: getMonthDays(
        new Date(
          currentViewMonth.value.getFullYear(),
          currentViewMonth.value.getMonth() + 1
        )
      ),
    },
  ];
});

const isInRange = (date: Date) => {
  if (!startDate.value || !endDate.value) return false;
  return date >= startDate.value && date <= endDate.value;
};

const isSelected = (date: Date) => {
  return (
    date.toDateString() === startDate.value.toDateString() ||
    date.toDateString() === endDate.value.toDateString()
  );
};

const handleDateClick = (date: Date) => {
  if (!isSelectingRange.value) {
    startDate.value = date;
    endDate.value = date;
    isSelectingRange.value = true;
  } else {
    if (date < startDate.value) {
      endDate.value = startDate.value;
      startDate.value = date;
    } else {
      endDate.value = date;
    }
    isSelectingRange.value = false;
  }
};

const handleQuickSelect = (action: string) => {
  const today = new Date();
  const currentDay = today.getDay();

  switch (action) {
    case "currentWeek":
      startDate.value = new Date(
        today.setDate(today.getDate() - currentDay + 1)
      );
      endDate.value = new Date(today.setDate(today.getDate() + 6));
      break;
    case "lastWeek":
      startDate.value = new Date(
        today.setDate(today.getDate() - currentDay - 6)
      );
      endDate.value = new Date(today.setDate(today.getDate() + 6));
      break;
    case "currentMonth":
      startDate.value = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate.value = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    case "lastMonth":
      startDate.value = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate.value = new Date(today.getFullYear(), today.getMonth(), 0);
      break;
    case "currentQuarter":
      const currentQuarter = Math.floor(today.getMonth() / 3);
      startDate.value = new Date(today.getFullYear(), currentQuarter * 3, 1);
      endDate.value = new Date(today.getFullYear(), (currentQuarter + 1) * 3, 0);
      break;
    case "lastQuarter":
      const lastQuarter = Math.floor(today.getMonth() / 3) - 1;
      const yearAdjustment = lastQuarter < 0 ? -1 : 0;
      const adjustedQuarter = lastQuarter < 0 ? 3 : lastQuarter;
      startDate.value = new Date(
        today.getFullYear() + yearAdjustment,
        adjustedQuarter * 3,
        1
      );
      endDate.value = new Date(
        today.getFullYear() + yearAdjustment,
        (adjustedQuarter + 1) * 3,
        0
      );
      break;
  }
  isOpen.value = false;
};

const navigateMonth = (direction: number) => {
  currentViewMonth.value = new Date(
    currentViewMonth.value.getFullYear(),
    currentViewMonth.value.getMonth() + direction,
    1
  );
};

const handleApply = () => {
  emit("date-change", { start: startDate.value, end: endDate.value });
  isOpen.value = false;
};
</script>

<template>
  <div class="date-picker-container">
    <!-- Date picker trigger - same as before -->
    <div class="date-picker">
      <button class="nav-button" @click="navigateMonth(-1)">
        <Icon icon="mingcute:left-fill" height="20" width="20" />
      </button>

      <div class="date-display" @click="isOpen = !isOpen">
        <Icon
          icon="material-symbols:calendar-month"
          class="calendar-icon"
          width="18"
        />
        <span class="date-text">{{ dateRange }}</span>
      </div>

      <button class="nav-button" @click="navigateMonth(1)">
        <Icon icon="mingcute:right-fill" height="20" width="20" />
      </button>
    </div>

    <!-- Calendar dropdown -->
    <div v-if="isOpen" class="calendar-dropdown">
      <!-- Main content wrapper -->
      <div class="calendar-content">
        <!-- Left side - Calendar -->
        <div class="calendar-section">
          <!-- Date inputs -->
          <div class="date-inputs">
            <div class="input-group">
              <label>Start date</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  :value="formatInputDate(startDate)"
                  readonly
                />
                <Icon
                  icon="material-symbols:calendar-month"
                  class="calendar-icon"
                  height="20"
                />
              </div>
            </div>
            <div class="input-group">
              <label>End date</label>
              <div class="input-wrapper">
                <input type="text" :value="formatInputDate(endDate)" readonly />
                <Icon
                  icon="material-symbols:calendar-month"
                  class="calendar-icon"
                  height="20"
                />
              </div>
            </div>
          </div>

          <!-- Calendar grid -->
          <div class="calendar-container">
            <div class="calendar-navigation">
              <button class="nav-button" @click="navigateMonth(-1)">
                <Icon icon="mingcute:left-fill" />
              </button>
              <div class="calendar-months">
                <span v-for="month in months" :key="month.label">
                  {{ month.label }}
                </span>
              </div>
              <button class="nav-button" @click="navigateMonth(1)">
                <Icon icon="mingcute:right-fill" />
              </button>
            </div>

            <div class="calendars-wrapper">
              <div
                v-for="month in months"
                :key="month.label"
                class="calendar-grid"
              >
                <div class="weekday-header">
                  <span>SUN</span>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                </div>
                <div class="days-grid">
                  <button
                    v-for="{ date, isCurrentMonth } in month.days"
                    :key="date.toISOString()"
                    class="day-button"
                    :class="{
                      'other-month': !isCurrentMonth,
                      selected: isSelected(date),
                      'in-range': isInRange(date),
                      'range-start':
                        date.toDateString() === startDate.toDateString(),
                      'range-end':
                        date.toDateString() === endDate.toDateString(),
                    }"
                    @click="handleDateClick(date)"
                    @mouseenter="hoveredDate = date"
                  >
                    {{ date.getDate() }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Quick selections -->
        <div class="quick-selections">
          <div class="quick-selections-content">
            <button
              v-for="option in quickSelections"
              :key="option.label"
              class="quick-select-button"
              @click="handleQuickSelect(option.action)"
            >
              {{ option.label }}
            </button>
            <div class="days-indicator">
              <input type="number" min="0" value="7" class="days-input" />
              <span class="days-label">Days</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer actions -->
      <div class="actions">
        <CommonButton variant="secondary" size="sm" @click="isOpen = false">
          Cancel
        </CommonButton>
        <CommonButton variant="primary" size="sm" @click="handleApply">
          Apply
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-picker-container {
  position: relative;
}

.date-picker {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  // margin: 4px;
  // gap: 8px;
  width: fit-content;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 6px;
  color: #545b6b;
  cursor: pointer;

  &:hover {
    background: #f5f6f8;
    // border-radius: 4px;
  }
}

.date-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-inline: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background: #f5f6f8;
    // border-radius: 4px;
  }

  .calendar-icon {
    color: #545b6b;
  }

  .date-text {
    font-size: 14px;
    color: #1a2233;
    font-weight: 500;
  }
}

.calendar-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  width: 900px;
  z-index: 1000;
}

.calendar-content {
  display: flex;
  padding: 24px;
}

.calendar-section {
  flex: 1;
  margin-right: 24px;
}

.date-inputs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;

  .input-group {
    flex: 1;

    label {
      display: block;
      font-size: 16px;
      color: #545b6b;
      margin-bottom: 8px;
    }

    .input-wrapper {
      position: relative;
      background: #f5f6f8;
      border-radius: 8px;
      padding: 12px 16px;

      input {
        width: 100%;
        border: none;
        background: transparent;
        font-size: 16px;
        color: #1a2233;
        padding-right: 32px;
      }

      .calendar-icon {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #545b6b;
      }
    }
  }
}

.calendar-navigation {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .nav-button {
    padding: 8px;
    background: transparent;
    border: none;
    color: #545b6b;
    cursor: pointer;
    border: 1px solid #e5e7eb;
    border-radius: 4px;

    &:hover {
      background: #f5f6f8;
    }
  }

  .calendar-months {
    flex: 1;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: 600;
    color: #1a2233;
  }
}

.calendars-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.calendar-grid {
  .weekday-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    color: #545b6b;
    margin-bottom: 8px;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
}

.day-button {
  aspect-ratio: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1a2233;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;

  &:hover {
    background: #f5f6f8;
  }

  &.other-month {
    color: #9aa1b0;
  }

  &.selected {
    background: #0052cc;
    color: white;
  }

  &.in-range {
    background: #deebff;
  }

  &.range-start {
    background: #0052cc;
    color: white;
    border-radius: 4px 0 0 4px;
  }

  &.range-end {
    background: #0052cc;
    color: white;
    border-radius: 0 4px 4px 0;
  }
}

.quick-selections {
  width: 200px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-weight: 500;

  .quick-selections-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .quick-select-button {
    text-align: left;
    padding: 8px;
    background: transparent;
    border: none;
    color: #0052cc;
    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
      // text-decoration: underline;
      background: #f5f6f8;
    }
  }

  .days-indicator {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;

    .days-input {
      width: 48px;
      text-align: center;
      padding: 4px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 14px;
    }

    .days-label {
      color: #545b6b;
      font-size: 14px;
    }
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;

  button {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  .cancel-button {
    background: transparent;
    border: none;
    color: #545b6b;

    &:hover {
      background: #f5f6f8;
    }
  }

  .apply-button {
    background: #0052cc;
    border: none;
    color: white;

    &:hover {
      background: #0047b3;
    }
  }
}
</style>
