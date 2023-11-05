<script lang="ts">
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	import { isAuthenticated, user } from '../store';
	import auth from '../authService';
	import { onMount } from 'svelte';

	let auth0Client: Auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();

		const userData = await auth0Client.getUser();
		if (userData) {
			user.set(userData);
			isAuthenticated.set(true);
		} else {
			// Handle the case when userData is undefined
			// For example, you could set user to null or an empty object,
			// or handle this scenario in a way that makes sense for your application
			user.set({});
		}
	});
</script>

<nav class="navbar">
	<div class="container">
		<span class="font-sans">AHBesser</span>
		<ul class="menu">
			<!-- other menu items -->
			{#if $isAuthenticated}
				<li class="menu-item">Eingelogged als {$user?.email}</li>
				<li class="menu-item logout" on:click={() => auth.logout(auth0Client)}>Logout</li>

				<!-- Possibly add a logout button here -->
			{:else}
				<li class="menu-item">Registrieren</li>
				<li class="menu-item" on:click={() => auth.loginWithPopup(auth0Client, {})}>Anmelden</li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	.navbar {
		width: 100%;
		background-color: #333; /* Your color here */
		color: white;
		position: fixed;
		top: 0;
		z-index: 10;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
	}

	.brand {
		font-weight: bold;
	}

	.menu {
		list-style: none;
		display: flex;
		gap: 1rem;
		margin: 0;
		padding: 0;
	}

	.menu-item {
		cursor: pointer;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		transition: background-color 0.3s ease;
	}

	.menu-item:hover {
		background-color: #555; /* Darken on hover */
	}
</style>
