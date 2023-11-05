<script>
	import { isAuthenticated } from '../store';
	import type { SvelteComponent } from 'svelte';
</script>

<nav class="navbar">
	<div class="container">
		<span class="brand">MyApp</span>
		<ul class="menu">
			<!-- other menu items -->
			{#if $isAuthenticated}
				<li class="menu-item">Logged In</li>
				<!-- Possibly add a logout button here -->
			{:else}
				<li class="menu-item">Not Logged In</li>
				<!-- Possibly add a login button/link here -->
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
