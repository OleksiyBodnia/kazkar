import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import Google from '@auth/sveltekit/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const authOptions = {
		providers: [Google, GitHub],
		callbacks: {
			session({ session, user }) {
				session.user.id = user.id;
				return session;
			}
		},
		adapter: SupabaseAdapter({
			url: env.SUPABASE_URL,
			secret: env.SUPABASE_SECRET
		})
	};

	return authOptions;
});
