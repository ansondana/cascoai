"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, Calendar, Loader2 } from "lucide-react";
import { fetchAgents, fetchAnalytics } from "@/lib/api";
import { formatDate, formatDuration } from "@/lib/utils";

export default function Analytics() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [dateRange, setDateRange] = useState<"day" | "week" | "month">("week");

  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics", selectedAgentId, dateRange],
    queryFn: () => {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case "day":
          startDate.setDate(startDate.getDate() - 1);
          break;
        case "week":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
      }

      return fetchAnalytics(
        selectedAgentId || undefined,
        startDate.toISOString(),
        endDate.toISOString()
      );
    },
    enabled: true,
  });

  const handleExport = (format: "csv" | "pdf") => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">
            Monitor call metrics and agent performance
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport("csv")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent
            </label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="">All Agents</option>
              {agents?.map((agent: any) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex space-x-2">
              {(["day", "week", "month"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    dateRange === range
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : analytics ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-1">Total Calls</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.total_calls}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-1">Avg Duration</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatDuration(analytics.average_duration)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.success_rate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.accuracy.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Call Volume
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.calls_by_date}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#007AFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Call Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.calls_by_date}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#007AFF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No analytics data available</p>
        </div>
      )}
    </div>
  );
}

