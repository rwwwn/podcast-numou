import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Admin users database (in production, this would be in a real database)
const ADMIN_USERS = [
  {
    id: "1",
    email: "wscrtq@gmail.com",
    name: "Admin",
    // Password: Rr123456 (hashed with bcryptjs)
    passwordHash: "$2b$10$s2rst4lBBEBhpm6ADSdFK.h/eLI3xKtP9djQ5a/Mhp9TsIrAazh8e",
  },
  {
    id: "2",
    email: "admin@podcast-numou.com",
    name: "Admin User",
    // Password: password123 (hashed with bcryptjs)
    passwordHash: "$2b$10$lSSCwpMnoJp5RCyndIc9DuIvDX7i2BgSv2X9bGANkbII/y1b60y4G",
  },
];

// List of allowed admin emails
export const ALLOWED_ADMIN_EMAILS = [
  "wscrtq@gmail.com",
  "admin@podcast-numou.com",
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "البريد الإلكتروني", type: "email" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;

        // Check if email is in allowed admin emails
        if (!ALLOWED_ADMIN_EMAILS.includes(email)) {
          return null;
        }

        // Find the admin user
        const user = ADMIN_USERS.find((u) => u.email === email);

        if (!user) {
          return null;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
