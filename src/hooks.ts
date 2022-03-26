import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) =>
{
	event.url.searchParams.forEach((value, key) => event.params[key] = value)
	const response = await resolve(event)
	return response
}
