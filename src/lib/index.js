// place files you want to import through the `$lib` alias in this folder.

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export async function getKazky(state = 'all', limit = 10) {
	let query = supabase.from('kazky').select('*');

	if (state === 'completed') {
		query = query.filter('is_completed', 'eq', true);
	}

	if (state === 'incompleted') {
		query = query.filter('is_completed', 'eq', false);
	}

	query = query.limit(limit);

	const { data, error } = await query;

	if (error) {
		throw error;
	}

	return data;
}

export async function getKazka(id) {
	const { data, error } = await supabase.from('kazky').select('*').eq('id', id).single();
	if (error) {
		throw error;
	}
	return data;
}

export async function getRandomKazka(completed = false) {
	const { data, error } = await supabase
		.from('kazky')
		.select('*')
		.filter('is_completed', 'eq', completed)
		.order('random()')
		.limit(1);
	if (error) {
		throw error;
	}
	return data[0];
}

// FUNCTION get_rechennia_for_kazka(kazka_id integer) — returns all rechennia for a given kazka
export async function getRechenniaForKazka(kazka_id) {
	const { data, error } = await supabase.from('rechennia').select('*').eq('kazka_id', kazka_id);
	if (error) {
		throw error;
	}
	return data;
}
