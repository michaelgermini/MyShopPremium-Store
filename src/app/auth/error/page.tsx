"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
  CredentialsSignin: "Invalid credentials provided.",
  EmailSignin: "Could not send sign in email.",
  OAuthSignin: "Error signing in with the provider.",
  OAuthCallback: "Error in OAuth callback.",
  OAuthCreateAccount: "Could not create account with the provider.",
  EmailCreateAccount: "Could not create account with the email.",
  Callback: "Error in callback URL.",
  OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
  SessionRequired: "Please sign in to access this page.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";

  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="mt-4 text-xl font-semibold text-gray-900">
            Authentication Error
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-gray-600">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500">
            <strong>Error Code:</strong> {error}
          </div>

          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                Try Again
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
            <strong>Troubleshooting:</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Check if your account credentials are correct</li>
              <li>Try clearing your browser cache and cookies</li>
              <li>Make sure cookies are enabled in your browser</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
