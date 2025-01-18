import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import axios from "axios";
import snakecaseKeys from "snakecase-keys";

// User型を拡張してaccessTokenを追加
declare module "next-auth" {
  interface User {
    accessToken: string;
    githubId: number;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    async signIn({ user, account, profile }) {
      const name = profile?.name;
      const githubId = account?.providerAccountId;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/callback/github`;
      const params = snakecaseKeys({ name, github_id: githubId });
      try {
        const response = await axios.post(url, params);
        if (response.status === 200) {
          user.accessToken = response.data.access_token;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
