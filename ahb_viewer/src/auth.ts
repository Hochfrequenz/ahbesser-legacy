import createAuth0Client from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';

const user = writable(null);
const isAuthenticated = writable(false);
const auth0Client = writable(null);

async function initAuth0() {
    const auth0 = await createAuth0Client({
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    });

    auth0Client.set(auth0);

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }

    const isAuthenticatedValue = await auth0.isAuthenticated();
    isAuthenticated.set(isAuthenticatedValue);

    if (isAuthenticatedValue) {
        const userValue = await auth0.getUser();
        user.set(userValue);
    }
}

async function login() {
    const client = get(auth0Client);
    client.loginWithRedirect();
}

async function logout() {
    const client = get(auth0Client);
    client.logout({ returnTo: window.location.origin });
}

export { user, isAuthenticated, initAuth0, login, logout };
