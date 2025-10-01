// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // ✅ singleton
import { verifyPassword } from "@/lib/password"; // doit retourner boolean (sync ou async)

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim() || "";
        const password = credentials?.password || "";
        if (!email || !password) return null;

        // 1) User
        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, password: true, role: true },
        });
        if (!user) return null;

        // 2) Password
        const ok = await Promise.resolve(verifyPassword(password, user.password));
        if (!ok) return null;

        // 3) Vérification email sans changer le schéma :
        //    Si un token "email_verification" ACTIF existe encore pour cet email,
        //    on refuse la connexion (l’utilisateur n’a pas confirmé).
        const activeVerifyToken = await prisma.verificationToken.findFirst({
          where: {
            email,
            type: "email_verification",
            expiresAt: { gt: new Date() },
          },
          select: { id: true },
        });

        if (activeVerifyToken) {
          // Provoque error=EMAIL_NOT_VERIFIED dans /login
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        // 4) OK
        return {
          id: String(user.id),        // token id = string
          email: user.email,
          role: user.role || "INDIVIDUAL",
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        (token as any).role = (user as any).role ?? "INDIVIDUAL";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = (token as any).role ?? "INDIVIDUAL";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // error: "/login" // (optionnel) sinon NextAuth redirige déjà vers signIn avec ?error=...
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
