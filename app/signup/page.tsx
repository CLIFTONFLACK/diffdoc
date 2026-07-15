import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "Create your free account · DiffDoc",
};

export default function SignUpPage() {
  return <AuthPanel mode="sign-up" />;
}
