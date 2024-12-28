const navRoutes = [
  {
    name: "Your Work",
    route: "/YourWork",
  },
  {
    name: "Projects",
    route: "/Projects",
    subRoute: [
      {
        name: "Active",
        route: "/Projects/Active",
      },
      {
        name: "Archived",
        route: "/Projects/Archived",
      },
    ],
  },
  {
    name: "Filters",
    route: "/Filters",
    subRoute: [
      {
        name: "Tasks",
        route: "/Filters/Tasks",
      },
      {
        name: "Issues",
        route: "/Filters/Issues",
      },
      {
        name: "Tickets",
        route: "/Filters/Tickets",
      },
    ],
  },
  {
    name: "Dashboards",
    route: "/Dashboards",
    subRoute: [
      {
        name: "Web",
        route: "/Dashboards/Web",
      },
      {
        name: "Mobile",
        route: "/Dashboards/Mobile",
      },
    ],
  },
  {
    name: "People",
    route: "/People",
  },
  {
    name: "Apps",
    route: "/Apps",
    subRoute: [
      {
        name: "Calendar",
        route: "/Apps/Calendar",
      },
      {
        name: "Chat",
        route: "/Apps/Chat",
      },
    ],
  },
];

export default navRoutes;
