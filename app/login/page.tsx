import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "Sign in · DiffDoc",
};

export default function LoginPage() {
  return <AuthPanel mode="sign-in" />;
}
