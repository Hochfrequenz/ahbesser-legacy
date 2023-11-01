import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import type { PopupLoginOptions } from "@auth0/auth0-spa-js"
import { user, isAuthenticated, popupOpen } from "./store";


async function createClient() {
    const auth0Domain = process.env.AUTH0_DOMAIN;
    const auth0ClientId = process.env.AUTH0_CLIENT_ID;

    if (!auth0Domain) {
        throw new Error('AUTH0_DOMAIN is not defined in the environment variables.');
    }
    if (!auth0ClientId) {
        throw new Error('AUTH0_CLIENT_ID is not defined in the environment variables.');
    }

    return createAuth0Client({ domain: auth0Domain, clientId: auth0ClientId });
}

async function loginWithPopup(client: Auth0Client, options: PopupLoginOptions) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        const userData = await client.getUser();
        if (userData) {
            user.set(userData);
            isAuthenticated.set(true);
        } else {
            throw new Error('Failed to retrieve user data after login.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client: Auth0Client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;