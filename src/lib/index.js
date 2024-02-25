// place files you want to import through the `$lib` alias in this folder.

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export async function getKazky(state = 'all') {
	let query = supabase.from('kazky').select('*');

	if (state === 'completed') {
		query = query.filter('is_completed', 'eq', true);
	}

	if (state === 'incompleted') {
		query = query.filter('is_completed', 'eq', false);
	}

	const { data, error } = await query;

	if (error) {
		throw error;
	}

	return data;
}

export async function newKazka({ title, text }) {
	const { data, error } = await supabase.from('kazky').insert({ title, text });
	if (error) {
		throw error;
	}
	return data;
}
