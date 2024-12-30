<template>
  <div class="time-tracking-table">
    <table>
      <thead>
        <tr>
          <th class="issue-header">Issue</th>
          <th class="logged-header">Logged</th>
          <template v-for="(day, index) in days" :key="index">
            <th
              :class="[
                'day-header',
                { weekend: isWeekend(day), today: isToday(day) },
              ]"
            >
              <div class="day-name">{{ day.dayName }}</div>
              <div class="day-number">{{ day.date }}</div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(issue, issueIndex) in issues"
          :key="issueIndex"
          :class="{
            'highlighted-row':
              selectedCell && selectedCell.issueIndex === issueIndex,
          }"
        >
          <td class="issue-cell">
            <div class="issue-content">
              <div class="lightning-icon">⚡</div>
              <span class="issue-id">{{ issue.id }}</span>
              <span class="issue-summary">{{ issue.summary }}</span>
            </div>
          </td>
          <td class="logged-cell">{{ issue.logged }}</td>
          <template v-for="(day, dayIndex) in days" :key="dayIndex">
            <td
              :class="[
                'time-cell',
                {
                  weekend: isWeekend(day),
                  today: isToday(day),
                  'highlighted-cell': isSelectedCell(issueIndex, dayIndex),
                },
              ]"
              @click="selectCell(issueIndex, dayIndex)"
            >
              {{ getTimeForDay(issue, day) }}
            </td>
          </template>
        </tr>
        <tr class="total-row">
          <td>Total</td>
          <td>73.75</td>
          <template v-for="(day, index) in days" :key="index">
            <td
              :class="[
                'total-cell',
                { weekend: isWeekend(day), today: isToday(day) },
              ]"
            >
              {{ getTotalForDay(day) }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Day {
  date: number;
  dayName: string;
  fullDate: Date;
}

interface Issue {
  id: string;
  summary: string;
  logged: number;
  times: { [key: string]: number };
}

interface SelectedCell {
  issueIndex: number;
  dayIndex: number;
}

const selectedCell = ref<SelectedCell | null>(null);

// Generate days for the current month
const generateDays = () => {
  const days: Day[] = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    days.push({
      date: currentDate.getDate(),
      dayName: currentDate
        .toLocaleString("en-US", { weekday: "short" })
        .toUpperCase(),
      fullDate: currentDate,
    });
  }
  return days;
};

const days = ref(generateDays());

const issues = ref<Issue[]>(
  Array(13)
    .fill(null)
    .map((_, index) => ({
      id: "ATL-0011",
      summary: "Issue summary",
      logged: 4.5,
      times: {
        "2024-01-01": 4.5,
        "2024-01-10": 4.5,
        "2024-01-15": 4.5,
      },
    }))
);

const isWeekend = (day: Day) => {
  return day.dayName === "SAT" || day.dayName === "SUN";
};

const isToday = (day: Day) => {
  const today = new Date();
  return day.date === today.getDate();
};

const selectCell = (issueIndex: number, dayIndex: number) => {
  selectedCell.value = { issueIndex, dayIndex };
};

const isSelectedCell = (issueIndex: number, dayIndex: number) => {
  return (
    selectedCell.value?.issueIndex === issueIndex &&
    selectedCell.value?.dayIndex === dayIndex
  );
};

const getTimeForDay = (issue: Issue, day: Day) => {
  const dateString = day.fullDate.toISOString().split("T")[0];
  return issue.times[dateString] || 0;
};

const getTotalForDay = (day: Day) => {
  return issues.value.reduce((total, issue) => {
    return total + (getTimeForDay(issue, day) || 0);
  }, 0);
};
</script>

<style lang="scss" scoped>
.time-tracking-table {
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;

    th,
    td {
      border: 1px solid #e5e7eb;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 500;
    }

    .day-header {
      text-align: center;
      min-width: 50px;

      .day-name {
        font-size: 12px;
        color: #6b7280;
      }

      .day-number {
        font-weight: 600;
        color: #374151;
      }

      &.weekend {
        background-color: #f3f4f6;
      }

      &.today {
        .day-number {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
        }
      }
    }

    .issue-cell {
      min-width: 200px;

      .issue-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .lightning-icon {
          color: #6b7280;
        }

        .issue-id {
          color: #6b7280;
          font-weight: 500;
        }

        .issue-summary {
          color: #374151;
        }
      }
    }

    .time-cell,
    .logged-cell {
      text-align: center;
      color: #374151;
      cursor: pointer;

      &.weekend {
        background-color: #f3f4f6;
      }

      &.highlighted-cell {
        background-color: #dbeafe;
      }
    }

    tr.highlighted-row {
      background-color: #f0f7ff;

      .time-cell:not(.highlighted-cell) {
        background-color: #f0f7ff;
      }
    }

    .total-row {
      font-weight: 600;

      td:first-child {
        color: #374151;
      }
    }
  }
}
</style>
