import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");

  // Return a proper error response for NextAuth errors
  return NextResponse.json({
    error: error || "Authentication Error",
    message: "There was an issue with authentication. Please try again."
  }, { status: 400 });
}
