import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/sveltekit/providers/github'
import Google from "@auth/sveltekit/providers/google"
 
export const { handle } = SvelteKitAuth({
  providers: [Google, GitHub],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
}) 

