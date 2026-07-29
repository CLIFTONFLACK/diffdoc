import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth-panel";

// The root layout's title template appends " · DiffDoc".
export const metadata: Metadata = {
  title: "Create your free account",
};

export default function SignUpPage() {
  return <AuthPanel mode="sign-up" />;
}
