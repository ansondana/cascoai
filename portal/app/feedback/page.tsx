import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import FeedbackForm from "@/components/FeedbackForm";
import Layout from "@/components/Layout";

export default async function FeedbackPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <Layout>
      <FeedbackForm />
    </Layout>
  );
}

