"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Save, FileText, History, Loader2 } from "lucide-react";
import { fetchAgents, fetchKnowledgeBase, updateKnowledgeBase } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default function KnowledgeBank() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const { data: knowledgeBase, isLoading: kbLoading } = useQuery({
    queryKey: ["knowledge", selectedAgentId],
    queryFn: () => fetchKnowledgeBase(selectedAgentId),
    enabled: !!selectedAgentId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { agentId: string; content: string }) =>
      updateKnowledgeBase(data.agentId, data.content),
    onSuccess: () => {
      setIsEditing(false);
      // Refetch knowledge base
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    },
  });

  const handleLoadKnowledge = () => {
    if (knowledgeBase && knowledgeBase.length > 0) {
      const latest = knowledgeBase.sort(
        (a, b) => b.version - a.version
      )[0];
      setContent(latest.content);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!selectedAgentId || !content.trim()) {
      alert("Please select an agent and enter content");
      return;
    }
    updateMutation.mutate({
      agentId: selectedAgentId,
      content: content.trim(),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Knowledge Bank
        </h1>
        <p className="text-gray-600">
          Manage and update your agent's knowledge base
        </p>
      </div>

      {/* Agent Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Agent
        </label>
        <select
          value={selectedAgentId}
          onChange={(e) => {
            setSelectedAgentId(e.target.value);
            setIsEditing(false);
            setContent("");
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">Choose an agent...</option>
          {agents?.map((agent: any) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      {selectedAgentId && (
        <>
          {/* Version History */}
          {kbLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : knowledgeBase && knowledgeBase.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Version History
                </h2>
                <button
                  onClick={handleLoadKnowledge}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Load Latest
                </button>
              </div>
              <div className="space-y-2">
                {knowledgeBase
                  .sort((a, b) => b.version - a.version)
                  .map((entry: any) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      <div>
                        <span className="font-medium text-gray-900">
                          Version {entry.version}
                        </span>
                        <span className="text-sm text-gray-500 ml-3">
                          {formatDate(entry.updated_at)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setContent(entry.content);
                          setIsEditing(true);
                        }}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        View
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}

          {/* Editor */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Editor</h2>
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setIsEditing(true);
              }}
              placeholder="Enter knowledge base content here..."
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">
              Changes are auto-saved. Click "Save Changes" to publish a new
              version.
            </p>
          </div>
        </>
      )}

      {!selectedAgentId && (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Select an agent to manage its knowledge base</p>
        </div>
      )}
    </div>
  );
}

