import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Authentification pour l'admin

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = { id: "1", name: process.env.NAME, email: "user@example.com" };

        if (credentials.username === process.env.NAME && credentials.password === process.env.PASSWORD) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };