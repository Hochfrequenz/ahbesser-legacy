<script>
	//import { auth } from '../..../authService the login function from your auth service
	import { onMount } from 'svelte';
	import auth from '../authService';
	import { isAuthenticated, user } from '../store';
	import type { Auth0Client } from '@auth0/auth0-spa-js';

	let auth0Client: Auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();

		const userData = await auth0Client.getUser();
		if (userData) {
			user.set(userData);
		} else {
			// Handle the case when userData is undefined
			// For example, you could set user to null or an empty object,
			// or handle this scenario in a way that makes sense for your application
			user.set({});
		}
	});

	function login() {
		auth.loginWithPopup(auth0Client, {});
	}

	function logout() {
		auth.logout(auth0Client, {});
	}
</script>

<div class="container mx-auto">
	<!-- Header -->
	<header class="py-5">
		<h1 class="text-3xl font-bold">Your Website Name</h1>
	</header>

	<!-- Hero Section -->
	<section class="text-center my-10">
		<h2 class="text-2xl font-semibold">Welcome to Our Website</h2>
		<p class="mt-4 text-lg">Brief introduction about what your website does.</p>
	</section>

	<!-- Features or Services -->
	<section class="my-10">
		<h3 class="text-xl font-semibold text-center">Our Features</h3>
		<div class="flex justify-around mt-5">
			<!-- Feature Blocks -->
			<div class="text-center">
				<h4 class="font-semibold">Feature 1</h4>
				<p>Short description.</p>
			</div>
			<!-- Repeat for other features -->
		</div>
	</section>

	<!-- Call to Action -->
	<section class="text-center my-10">
		<button class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={auth}
			>Login</button
		>
	</section>

	<!-- Footer -->
	<footer class="py-5 text-center">© Your Website Name</footer>
</div>

<style>
	/* Add additional custom styles if needed */
</style>
