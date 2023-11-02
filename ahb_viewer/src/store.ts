import { writable } from "svelte/store";
import type { User } from "@auth0/auth0-spa-js";


export const isAuthenticated = writable(false);
export const user = writable<User | null>(null);
export const popupOpen = writable(false);
export const error = writable<Error | null>(null);