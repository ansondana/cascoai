"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  XCircle,
  Shield,
  Loader2
} from "lucide-react";
import { fetchAgents } from "@/lib/api";

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState<"clients" | "agents" | "feedback">("clients");

  const { data: agents, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const tabs = [
    { id: "clients", label: "Clients", icon: Users },
    { id: "agents", label: "Agents", icon: BarChart3 },
    { id: "feedback", label: "Feedback", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <Shield className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <p className="text-gray-600">
          Manage all client accounts, agents, and system settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`
                  flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors
                  ${
                    selectedTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {selectedTab === "clients" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Clients
            </h2>
            {/* Client list would be fetched from API */}
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Client management coming soon</p>
            </div>
          </div>
        )}

        {selectedTab === "agents" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Agents
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : agents && agents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent: any) => (
                  <div
                    key={agent.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {agent.name}
                      </h3>
                      {agent.status === "active" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {agent.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      <span>{agent.call_count || 0} calls</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No agents found</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === "feedback" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Feedback & Support
            </h2>
            <div className="text-center py-12 text-gray-500">
              <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Feedback management coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Clients</p>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Active Agents</p>
          <p className="text-3xl font-bold text-gray-900">
            {agents?.filter((a: any) => a.status === "active").length || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Calls</p>
          <p className="text-3xl font-bold text-gray-900">
            {agents?.reduce((sum: number, a: any) => sum + (a.call_count || 0), 0) || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Pending Feedback</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
      </div>
    </div>
  );
}

