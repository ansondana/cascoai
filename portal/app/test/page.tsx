import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import TestAgent from "@/components/TestAgent";
import Layout from "@/components/Layout";

export default async function TestPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <Layout>
      <TestAgent />
    </Layout>
  );
}

