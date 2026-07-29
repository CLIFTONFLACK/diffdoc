import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth-panel";

// The root layout's title template appends " · DiffDoc".
export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return <AuthPanel mode="sign-in" />;
}
