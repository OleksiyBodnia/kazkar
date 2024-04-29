import { changeUserName } from '$lib/db';

export const POST = async (event) => {
	const body = await event.request.json();
	const { newName } = body;

	const session = await event.locals.auth();

	if (!session.user) {
		return new Response(null, {
			status: 401,
			body: { error: 'You are not signed in' }
		});
	}

	if (!newName || typeof newName !== 'string') {
		return new Response(JSON.stringify({ error: 'Invalid name' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		await changeUserName(session.user.id, newName);

		return new Response(JSON.stringify({ message: 'Name changed successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error changing user name:', error);
		return new Response(JSON.stringify({ error: 'Something went wrong' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
