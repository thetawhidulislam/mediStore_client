"use server";

import { analyticsService } from "@/services/analytics.service";

export const getDashboardStats = async () => {
  return await analyticsService.getDashboardStats();
};
