import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async (events) => {
	const session = await events.locals.auth();

	if (!session?.user) {
		redirect(303, '/auth/signin');
	}

	return {
		session
	};
};
