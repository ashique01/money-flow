import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ChartPie,
  PiggyBank,
  Target,
  FileText,
  Repeat,
  Settings,
  Tags,
} from "lucide-react";


export const dashboardNavigation = [

  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },


  {
    title: "Accounts",
    href: "/accounts",
    icon: Wallet,
  },


  {
    title: "Categories",
    href: "/categories",
    icon: Tags,
  },

  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartPie,
  },


  {
    title: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },


  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },


  {
    title: "Recurring",
    href: "/recurring",
    icon: Repeat,
  },

  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },


  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },

];