import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import Analytics from "@/components/Analytics";
import Layout from "@/components/Layout";

export default async function AnalyticsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <Layout>
      <Analytics />
    </Layout>
  );
}

