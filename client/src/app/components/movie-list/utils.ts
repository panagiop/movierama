function getQueryParameter(name: string, query: string): string {
	name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	const results = regex.exec(query);
	return results === null
		? ''
		: decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export { getQueryParameter };
