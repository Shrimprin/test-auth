import { SignIn, SignOut } from "@/components/auth-button";
import { auth } from "@/auth";

export default async function Login() {
  const session = await auth();

  return (
    <div>{!session?.user ? <SignIn provider="github" /> : <SignOut />}</div>
  );
}
