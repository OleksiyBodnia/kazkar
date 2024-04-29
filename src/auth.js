import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import Google from '@auth/sveltekit/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { SUPABASE_URL, SUPABASE_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google, GitHub],
	adapter: SupabaseAdapter({
		url: SUPABASE_URL,
		secret: SUPABASE_SECRET
	})
});
