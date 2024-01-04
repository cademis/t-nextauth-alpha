import NextAuth from "next-auth";

import authConfig from "~/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedin = !!req.auth;
  console.log("ROUTE: cl", req.nextUrl.pathname);
  console.log("IS LOGGED IN", isLoggedin);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // authjs v5 docs
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // clerk docs
};
