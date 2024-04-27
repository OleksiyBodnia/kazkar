import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/sveltekit/providers/github'
import Google from "@auth/sveltekit/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { SUPABASE_URL, SUPABASE_SECRET } from '$env/static/private'

export const { handle, signIn, signOut  } = SvelteKitAuth({
  providers: [Google, GitHub],
  adapter: SupabaseAdapter({
    url: SUPABASE_URL,
    secret: SUPABASE_SECRET,
  }),
  // Чи це тут потрібно? Хто зна, звіки воно тут?
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
  //       session.user.id = token.sub;
  //     }
  //     return session;
  //   },
  // },
})

