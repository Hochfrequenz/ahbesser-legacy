<script lang="ts">
	import { user } from '../../store'; // Assuming you have a store for user
	import { onMount } from 'svelte';

	let formatVersion = '';
	let pruefi = '';

	// Example options, replace with your actual options
	const formatVersions = ['FV2310', 'FV2320', 'FV2330'];
	const pruefis = ['44001', '44002', '44003'];

	// Function to handle the form submission
	function handleSubmit() {
		if (!formatVersion || !pruefi) {
			alert('Please select both format version and prüfi.');
			return;
		}
		// Update the URL
		const newUrl = `/${formatVersion}/${pruefi}`;
		window.history.pushState({}, `${pruefi} in Formatversion ${formatVersion}`, newUrl);

		// Here you can also update the view or perform other actions based on the selection
		console.log({ formatVersion, pruefi });

		// // Proceed with the next step, e.g., navigating to another page or making an API call
		// console.log({ formatVersion, pruefi });
	}

	onMount(() => {
		// Initialize with the user's previous choices if they exist
		// For example:
		// formatVersion = user.previousFormatVersion;
		// pruefi = user.previousPruefi;
	});
</script>

<div class="selection-page">
	<h1>Welcome, {$user?.nickname}!</h1>
	<p>Please select a format version and prüfi.</p>

	<div class="selection-form">
		<div class="form-group">
			<label for="formatVersion">Select Format Version</label>
			<select id="formatVersion" bind:value={formatVersion}>
				<option value="">--Select--</option>
				{#each formatVersions as fv}
					<option value={fv}>{fv}</option>
				{/each}
			</select>
		</div>

		<div class="form-group">
			<label for="pruefi">Select Prüfi</label>
			<select id="pruefi" bind:value={pruefi}>
				<option value="">--Select--</option>
				{#each pruefis as pr}
					<option value={pr}>{pr}</option>
				{/each}
			</select>
		</div>

		<button on:click={handleSubmit}>Confirm Selection</button>
	</div>
</div>

<style>
	.selection-page {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	select {
		width: 100%;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
