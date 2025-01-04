import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import axios from "axios";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    // サインインの後に呼ばれる
    async signIn({ user }) {
      console.log(user);
      const name = user.name;
      const email = user.email;
      const url = `${process.env.BACKEND_URL}/api/auth/callback/github`;

      try {
        const response = await axios.post(url, { name, email });
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
