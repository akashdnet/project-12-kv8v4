import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: any) {

    const { token } = req.kindeAuth || {};
    if (!token) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    const hasAdminPermission = token.permissions?.includes("admin");
    if (!hasAdminPermission) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    isReturnToCurrentPage: true, // After login, return back to the same page
    loginPage: "/auth",
    publicPaths: [
      "/auth",
      "/unauthorized",
      "/api/login",
      "/api/register"
    ]
  }
);



export const config = {
  matcher: [
    "/((?!auth|api/auth/login|api/auth/register|api/auth/logout|unauthorized).*)",
  ],
};




