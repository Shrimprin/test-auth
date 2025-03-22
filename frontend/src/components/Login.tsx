// 使っていないので消してok
import { auth } from '@/auth';
import { SignIn, SignOut } from '@/components/auth-button';

export default async function Login() {
  const session = await auth();

  return (
    <div>{!session?.user ? <SignIn provider="github" /> : <SignOut />}</div>
  );
}
