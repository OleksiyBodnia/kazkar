export function combineRechennia(arr) {
	return arr.map((obj) => obj.content).join(' ');
}

export function lastRechennia(arr) {
	return arr[arr.length - 1];
}

export function truncateText(text, maxLength) {
	let truncated = text.substring(0, maxLength);
	let last_dot = truncated.lastIndexOf('.');
	let last_space = truncated.lastIndexOf(' ');

	if (last_dot > last_space) {
		truncated = truncated.substring(0, last_dot + 1);
	} else {
		truncated = truncated.substring(0, last_space + 1);
	}

	if (truncated.length != text.length) {
		truncated += ' . . .';
	}

	return truncated;
}

export function tooltip(node, params) {
	node.classList.add('tooltip');
	node.setAttribute('tabindex', 0);

	function handleFocus() {
		const child = document.createElement('span');
		child.textContent = params;
		child.setAttribute('id', 'tooltip');
		node.appendChild(child);

		node.addEventListener('mouseleave', handleBlur);
		node.addEventListener('blur', handleBlur);
		node.removeEventListener('mouseenter', handleFocus);
		node.removeEventListener('focus', handleFocus);
	}

	function handleBlur() {
		node.removeChild(node.querySelector('#tooltip'));

		node.removeEventListener('mouseleave', handleBlur);
		node.removeEventListener('blur', handleBlur);
		node.addEventListener('mouseenter', handleFocus);
		node.addEventListener('focus', handleFocus);
	}

	node.addEventListener('mouseenter', handleFocus);
	node.addEventListener('focus', handleFocus);

	return {
		onDestroy() {
			node.classList.remove('tooltip');
			node.removeEventListener('mouseenter', handleFocus);
			node.removeEventListener('focus', handleFocus);
		}
	};
}

export async function releaseKazka(kazka) {
	await fetch('/api/kazka/release-kazka', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			kazka_id: kazka.id
		})
	});
}

export async function takeKazka(kazka) {
	await fetch('/api/kazka/take-kazka', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			kazka_id: kazka.id
		})
	});
}

export async function isKazkaTaken(kazka, taking_window = 180) {
	// if kazka.taken_at is null, it is considered not taken
	if (!kazka.taken_at) {
		return false;
	}
	// if kazka.taken_at is less than 'taking_window' seconds ago, it is considered taken
	const now = new Date();
	const taken_at = new Date(kazka.taken_at);
	const diff = now - taken_at;
	const diff_seconds = diff / 1000;
	return diff_seconds < taking_window;
}
