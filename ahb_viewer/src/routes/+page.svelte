<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let userInput = ""; // what the users types in the textbox
	let selectedPruefidentifikator = ""; // if the user entered a 5 digit pruefi, it will be set here
</script>

<svelte:head>
	<title>AHBesser</title>
	<meta name="description" content="Lesbare Anwendungshandbücher" />
</svelte:head>

<section>
	<h1>AHBesser</h1>
	<h2>Anwendungshandbücher für Menschen</h2>
</section>
<section> <!-- input section -->
		<input bind:value={userInput} placeholder="Prüfidentifikator" list="matchingPruefis">
	<datalist id="matchingPruefis">
		{#each Array.from(data.availablePruefis) as pruefidentifikator}
		{#if userInput.trim()!=="" && pruefidentifikator.startsWith(userInput.trim())}
		<option value="{pruefidentifikator}">{pruefidentifikator}</option>
		{/if}
		{/each}
	</datalist>
</section>
<section>
	{#if /\d{5}/g.test(userInput.trim())}
	{#if data.availablePruefis.has(userInput.trim())}
		<h3>Anwendungshandbuch {userInput.trim()}</h3>
		<table>
			<tr>
				<th>Abschnitt</th>
				<th>Segment Gruppe</th>
				<th>Segment</th>
				<th>Datenelement</th>
				<th>Auswahl</th>
				<th>Bedeutung</th>
				<th>Expression</th>
				<th><!--perma link-->⚓</th>
			</tr>

		{#each data.ahbs.get(userInput.trim())["lines"] as ahb_line }
		<tr>
			<td>{ahb_line.section_name??''}</td>
			<td>{ahb_line.segment_group_key??''}</td>
			<td>{ahb_line.segment_code??''}</td>
			<td>{ahb_line.data_element??''}</td>
			<td>{ahb_line.value_pool_entry??''}</td>
			<td>{ahb_line.name ??''}</td>
			<td>{ahb_line.ahb_expression??''}</td>
			<td><!-- {ahb_line.guid} --></td>
		</tr>
		{/each}
	</table>
	{:else}
	<p>Unbekanner Prüfidentifikator {userInput}</p>
	{/if}
	{:else}
	<p>'{userInput}' is kein Prüfidentifikator</p>
	{/if}

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
