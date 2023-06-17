import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

type TokenResponse = {
  access?: string;
  refresh?: string;
};
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, email,profile }) {
      if (account?.provider == "google") {
        const { access_token, id_token } = account;
        console.log(account)
        console.log(email)
        console.log(user)
        try {
          const response = await axios.post<TokenResponse>(
            process.env.DJANGOURL + "/api/social/google/",
            {
              access_token: id_token,
              // id_token:id_token
            }
          );
          
          const tokken = response.data;
          user.accessToken = tokken.access;
          // console.log(user);
          console.log("GAAA");
          return true;
        } catch (error) {
          console.log("NOOO")
          // console.log(error)

          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        const { accessToken } = user;
        token.accessToken = accessToken;
      }
      return token;
    },
    async session({ session, user, token }) {
      // console.log(session);
      // console.log(token);
      session.user.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log(url)
    // Allows relative callback URLs
    // if (url.startsWith("/")) return `${baseUrl}${url}`
    // // Allows callback URLs on the same origin
    // else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  }
  },
};

export default NextAuth(authOptions);
