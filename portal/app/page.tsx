import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";

export default async function Home() {
  const session = await getSession();
  
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

