import { redirect } from '@sveltejs/kit';
import { getKazky } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	const session = await event.locals.auth();
	let user_kazky = await getKazky('completed', 100, 'asc', 0, session?.user.id);

	if (!session?.user) {
		redirect(303, '/');
	}

	return {
		session,
		user_kazky
	};
};
