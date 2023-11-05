<script lang="ts">
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	import { isAuthenticated, user } from '../store';
	import auth from '../authService';
	import { onMount } from 'svelte';
	import '../app.css';

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

	function login() {
		const popUpLoginOptions = {};
		auth.loginWithPopup(auth0Client, popUpLoginOptions);
	}

	function logout() {
		auth.logout(auth0Client);
		isAuthenticated.set(false);
	}
</script>

<div class="container mx-auto">
	<!-- Header -->
	<header class="py-5">
		<h1 class="text-3xl font-bold">Your Website Name</h1>
	</header>

	<!-- Hero Section -->
	<section class="text-center my-10">
		<h2 class="text-2xl font-semibold">AHBesser</h2>
		<p class="mt-4 text-lg">Anwendungshandbücher für Menschen.</p>
	</section>

	<!-- Features or Services -->
	<section class="my-10">
		<h3 class="text-xl font-semibold text-center">Features</h3>
		<div class="flex justify-around mt-5">
			<!-- Feature Blocks -->
			<div class="text-center">
				<h4 class="font-semibold">Nur ein Prüfidentifikator</h4>
				<p>
					Man kann sich ganz auf den Inhalt konzentrieren ohne Angst zu haben in der falschen
					Tabelle sein.
				</p>
				<h4 class="font-semibold">Sektionsweiser Aufbau</h4>
				<p>Übersichtlicher Aufbau der Tabellen ermöglicht eine schnelle Orientierung.</p>
				<p>The value is: {$user?.email}</p>
				<p>Authenticated is: {$isAuthenticated}</p>
			</div>
			<!-- Repeat for other features -->
		</div>
	</section>

	<!-- Call to Action -->
	<section class="text-center my-10">
		<button class="px-5 py-2 bg-primary text-white rounded hover:bg-secondary" on:click={login}
			>Login</button
		>
		<button class="px-5 py-2 bg-primary text-white rounded hover:bg-secondary" on:click={logout}
			>Logout</button
		>
	</section>

	<!-- Footer -->
	<footer class="py-5 text-center">
		made with ♥ by <a class="text-accent" href="https://hochfrequenz.de">Hochfrequenz</a> 2023 |
		powered by
		<a class="text-accent" href="https://github.com/Hochfrequenz/kohlrahbi/">kohlrahbi</a>
	</footer>
</div>

<style>
</style>
