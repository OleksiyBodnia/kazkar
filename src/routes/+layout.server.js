/** @type {import('./$types').LayoutServerLoad} */

export const load = async (event) => {
	const session = await event.locals.auth();

	return {
		session
	};
};
