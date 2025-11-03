"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PlayCircle, Phone, Loader2 } from "lucide-react";
import { fetchAgents, testAgent } from "@/lib/api";

export default function TestAgent() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [callStatus, setCallStatus] = useState<string>("");

  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const testMutation = useMutation({
    mutationFn: (data: { agentId: string; phoneNumber?: string }) =>
      testAgent(data.agentId, data.phoneNumber),
    onSuccess: (data) => {
      setCallStatus(`Call initiated! Call ID: ${data.call_id}`);
    },
    onError: (error: any) => {
      setCallStatus(`Error: ${error.response?.data?.detail || error.message}`);
    },
  });

  const handleTest = () => {
    if (!selectedAgentId) {
      setCallStatus("Please select an agent");
      return;
    }
    setCallStatus("Initiating call...");
    testMutation.mutate({
      agentId: selectedAgentId,
      phoneNumber: phoneNumber || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Agent</h1>
        <p className="text-gray-600">
          Test your voice agents with real or simulated calls
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Agent Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Agent
          </label>
          {agentsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="">Choose an agent...</option>
              {agents?.map((agent: any) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-sm text-gray-500">
            Leave empty to use a simulated call
          </p>
        </div>

        {/* Test Button */}
        <button
          onClick={handleTest}
          disabled={!selectedAgentId || testMutation.isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {testMutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Initiating...
            </>
          ) : (
            <>
              <PlayCircle className="h-5 w-5 mr-2" />
              Start Test Call
            </>
          )}
        </button>

        {/* Call Status */}
        {callStatus && (
          <div
            className={`p-4 rounded-md ${
              callStatus.includes("Error")
                ? "bg-red-50 text-red-800 border border-red-200"
                : callStatus.includes("Call initiated")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <p className="text-sm font-medium">{callStatus}</p>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          How to Test
        </h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>
              Select an agent from the dropdown above
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>
              Optionally enter a phone number for a real call test
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>
              Click "Start Test Call" to begin testing
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>
              Review call transcripts and metrics in the Analytics section
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

