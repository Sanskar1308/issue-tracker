import NextAuth from "next-auth/next";
import OAuthOptions from "./OAuthOption";

const handler = NextAuth(OAuthOptions);

export { handler as GET, handler as POST };
