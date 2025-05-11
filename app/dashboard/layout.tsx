"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ThemeProvider, useTheme } from "next-themes";

export default function DashboardLayoutWrapper({

  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <DashboardLayout>{children}</DashboardLayout>

  );
}