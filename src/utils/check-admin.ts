"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function checkAdminAccess() {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/"); // or login
  }

  const isAdmin = await getPermission("admin");
  if (!isAdmin?.isGranted) {
    redirect("/unauthorized");
  }

  // access granted
}
