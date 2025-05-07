import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const { pathname } = url
	if (pathname) {
		return {
			pathname
		};
	}
  throw error(404, 'Not found');
}