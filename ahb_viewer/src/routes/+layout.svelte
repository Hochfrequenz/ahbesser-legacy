<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
		        made with ♥ by
		        <a href="https://www.hochfrequenz.de/">Hochfrequenz</a> 2024 | powered by
		        <a href="https://github.com/Hochfrequenz/kohlrahbi/">kohlrahbi</a> |
		        <a href="https://github.com/Hochfrequenz/ahbesser/">Github</a> |
		        <a href="https://www.hochfrequenz.de/impressum/">Impressum</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
