import { redirect } from '@sveltejs/kit';
import { getKazky, getUserStats } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	const session = await event.locals.auth();
	let user_kazky = await getKazky({ state: 'completed', user_id: session?.user.id });
	const user_stats = await getUserStats(session?.user.id);
	
	if (!session?.user) {
		redirect(303, '/');
	}

	return {
		session,
		user_kazky,
		user_stats
	};
};
