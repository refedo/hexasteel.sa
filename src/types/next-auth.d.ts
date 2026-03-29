import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string;
      /** The user's role */
      role?: string;
      /** The user's avatar URL */
      avatar?: string | null;
    } & DefaultSession["user"];
  }
}
