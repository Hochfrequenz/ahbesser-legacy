import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';
import type { User } from '@auth0/auth0-spa-js';

interface AuthState {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
}

function createAuth() {
    const client = writable<Auth0Client>();
    const { subscribe, set } = writable<AuthState>({
        loading: true,
        isAuthenticated: false,
        user: null,
    });

    async function initialize() {
        const auth0Client = await createAuth0Client({
            domain: process.env.AUTH0_DOMAIN,
            client_id: process.env.AUTH0_CLIENT_ID,
            redirect_uri: window.location.origin,
        });

        client.set(auth0Client);

        if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;

        set({ loading: false, isAuthenticated, user });
    }

    return {
        initialize,
        subscribe,
        login: async () => (await client).loginWithRedirect(),
        logout: async () => (await client).logout({ returnTo: window.location.origin }),
    };
}

export const auth = createAuth();
