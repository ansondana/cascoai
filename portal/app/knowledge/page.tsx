import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import KnowledgeBank from "@/components/KnowledgeBank";
import Layout from "@/components/Layout";

export default async function KnowledgePage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <Layout>
      <KnowledgeBank />
    </Layout>
  );
}

