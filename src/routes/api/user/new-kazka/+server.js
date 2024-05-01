import { newKazka } from '$lib/db';

export const POST = async (event) => {
	const { title, rechennia_content, user_id } = JSON.parse(event.body);
	const newKazkaData = await newKazka(title, rechennia_content, user_id);
	return {
		body: newKazkaData
	};
};
