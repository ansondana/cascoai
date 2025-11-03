"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageSquare, Bug, Lightbulb, FileText, Loader2 } from "lucide-react";
import { submitFeedback, fetchAgents } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const feedbackSchema = z.object({
  agent_id: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["bug", "improvement", "other"]),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    },
  });

  const onSubmit = (data: FeedbackFormData) => {
    mutation.mutate(data);
  };

  const feedbackTypes = [
    { value: "bug", label: "Bug Report", icon: Bug },
    { value: "improvement", label: "Improvement", icon: Lightbulb },
    { value: "other", label: "Other", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback</h1>
        <p className="text-gray-600">
          Share your thoughts, report bugs, or suggest improvements
        </p>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm font-medium">
            Thank you! Your feedback has been submitted successfully.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg border border-gray-200 p-6 space-y-6"
      >
        {/* Feedback Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feedback Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {feedbackTypes.map((type) => {
              const Icon = type.icon;
              return (
                <label
                  key={type.value}
                  className="relative flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    value={type.value}
                    {...register("type")}
                    className="sr-only"
                  />
                  <Icon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    {type.label}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        {/* Agent Selection (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent (Optional)
          </label>
          <select
            {...register("agent_id")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">All Agents / General</option>
            {agents?.map((agent: any) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            {...register("subject")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Brief description of your feedback"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            {...register("message")}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Provide detailed feedback, steps to reproduce bugs, or suggestions for improvement..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Feedback
            </>
          )}
        </button>
      </form>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Need immediate help?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          For urgent issues or questions, please contact our support team
          directly.
        </p>
        <a
          href="mailto:support@cascoai.com"
          className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          support@cascoai.com
        </a>
      </div>
    </div>
  );
}

