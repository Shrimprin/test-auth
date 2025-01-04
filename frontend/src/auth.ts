import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import axios from "axios";

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
    async jwt({ token, account }) {
      // JWTを生成・更新するために使う
      // ユーザーがログインした時、またはセッションが更新された時に呼ばれる
      // GitHub認証に成功したとき、GitHubのAccessTokenを取得する
      if (account) {
        token.accessToken = account.access_token;
        token.githubId = account.providerAccountId;
      }
      console.log("--------------account--------------");
      console.log(account);
      console.log("--------------token--------------");
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      // クライアントに返されるセッションオブジェクトをカスタマイズするために使う
      // セッションが更新された時に呼ばれる
      session.user.accessToken = token.accessToken as string;
      session.user.githubId = token.githubId as number;
      console.log("--------------session--------------");
      console.log(session);
      return session;
    },
    async signIn({ user, account }) {
      const name = user.name;
      const githubId = account?.providerAccountId;
      const url = `${process.env.BACKEND_URL}/api/auth/callback/github`;
      console.log("--------------user--------------");
      console.log(user);
      console.log("--------------githubId--------------");
      console.log(githubId);

      try {
        const response = await axios.post(url, { name, github_id: githubId });
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
