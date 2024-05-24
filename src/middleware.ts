import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";

const protectedRoutes = [
  "/dashboard",
  "/dashboard/livetv",
  "/dashboard/higlights",
  "/dashboard/profile",
  "/dashboard/search",
  "/dashboard/shows",
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const currentPath = request.nextUrl.pathname;

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (!authenticated && isProtectedRoute) {
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    } else {
      return NextResponse.next();
    }
  }
}
