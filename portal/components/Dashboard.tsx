"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { 
  Phone, 
  BarChart3, 
  BookOpen, 
  MessageSquare,
  LogOut,
  PlayCircle
} from "lucide-react";
import { fetchAgents } from "@/lib/api";

export default function Dashboard() {
  const { user, isLoading: userLoading } = useUser();
  
  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  if (userLoading || agentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: "Test Agent",
      description: "Test your voice agents with real or simulated calls",
      icon: PlayCircle,
      href: "/test",
      color: "bg-primary",
    },
    {
      title: "View Analytics",
      description: "Monitor call metrics and agent performance",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-gray-800",
    },
    {
      title: "Knowledge Bank",
      description: "Manage and update agent knowledge base",
      icon: BookOpen,
      href: "/knowledge",
      color: "bg-gray-800",
    },
    {
      title: "Feedback",
      description: "Submit feedback and suggestions",
      icon: MessageSquare,
      href: "/feedback",
      color: "bg-gray-800",
    },
  ];

  return (
    <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Manage and monitor your voice agents from one place
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group relative overflow-hidden bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Active Agents Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Active Voice Agents
          </h3>
          {agents && agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent: any) => (
                <div
                  key={agent.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        agent.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <Phone className="h-4 w-4 mr-1" />
                    <span>{agent.call_count || 0} calls</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active agents yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Contact support to set up your first voice agent
              </p>
            </div>
          )}
        </div>
    </div>
  );
}

