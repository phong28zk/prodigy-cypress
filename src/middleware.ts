import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const emailListError = "Email link is invalid or expired. Please try again.";
  if (
    req.nextUrl.searchParams.get("error_description") === emailListError &&
    req.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(
      new URL("/signup?error_description", req.url)
    );
  }

  if(["/login", "/signup"].includes(req.nextUrl.pathname) && session) {
    console.log("redirecting to dashboard")
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin))
  }

  return res;
}

