import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 
const defaultValue = 'default';
const initialValue = browser ? window.localStorage.getItem('site_theme') ?? defaultValue : defaultValue;
 
export const site_theme = writable(initialValue);
 
site_theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('site_theme', value);
		document.documentElement.classList = value;
	}
});