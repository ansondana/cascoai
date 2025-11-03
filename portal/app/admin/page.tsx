import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import AdminPanel from "@/components/AdminPanel";
import Layout from "@/components/Layout";

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/api/auth/login");
  }

  // In production, check if user has admin role
  // const userRoles = session.user['https://casco.ai/roles'] || [];
  // if (!userRoles.includes('admin')) {
  //   redirect("/");
  // }

  return (
    <Layout>
      <AdminPanel />
    </Layout>
  );
}

