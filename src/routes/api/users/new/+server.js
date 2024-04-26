import { createDBUser } from '$lib/db';

export async function POST(request) {
	const { username, email, user_sub } = request.body;

	try {
		const data = await createDBUser(username, email, user_sub);
		return {
			status: 200,
			body: {
				data
			}
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'An error occurred while creating the user.'
			}
		};
	}
}
