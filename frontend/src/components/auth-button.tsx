import React from "react";
import { signIn, signOut } from "@/auth";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
