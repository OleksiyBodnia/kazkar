export function combineRechennia(arr) {
	return arr.map((obj) => obj.content).join(' ');
}

export function lastRechennia(arr) { 
    return arr[arr.length - 1].content;
}

export function truncateText(text, maxLength) {
	let truncated = text.substring(0, maxLength);
	let last_dot = truncated.lastIndexOf('.');
	let last_space = truncated.lastIndexOf(' ');
	
	if (last_dot > last_space) {
		truncated = truncated.substring(0, last_dot+1);
	}
	else {
		truncated = truncated.substring(0, last_space+1);
	}

	if (truncated.length != text.length) {
		truncated += ' . . .'
	}

	return truncated;
}
