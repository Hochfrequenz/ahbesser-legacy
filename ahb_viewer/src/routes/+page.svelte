<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let userInput = ""; // what the users types in the textbox
	let showIrrelevantLines = false;

	export async function is_valid_expression(ahb_expression){
		if (!ahb_expression){
			// if the expression is empty, we treat it as valid
			return true;
		}
		if(/\d/g.test(ahb_expression)==false){
			//if the expression doesn't contain any number, no need to call ahbicht
			return true;
		}
		let result = await fetch(`https://ahbicht.azurewebsites.net/api/ParseExpression?check_validity=true&expression=${encodeURIComponent(ahb_expression)}`);
		return result.status==200;
	}
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
	<p>
		<input bind:value={userInput} placeholder="Prüfidentifikator" list="matchingPruefis">
	<datalist id="matchingPruefis">
		{#each Array.from(data.availablePruefis) as pruefidentifikator}
		{#if userInput.trim()!=="" && pruefidentifikator.startsWith(userInput.trim())}
		<option value="{pruefidentifikator}">{pruefidentifikator}</option>
		{/if}
		{/each}
	</datalist>
	</p>
	<p><span title="Irrelevant sind diejenigen Zeilen, die nur in 'benachbarten' Prüfidentifkatoren verwendet werden">Irrelevante</span> Zeilen anzeigen? <input type=checkbox bind:checked={showIrrelevantLines}></p>
</section>
<section>
	{#if /^\d{5}$/g.test(userInput.trim())}
	{#if data.availablePruefis.has(userInput.trim())}
		<h3>Anwendungshandbuch {userInput.trim()}</h3>
		<table class="ahb">
			<colgroup>
				<col span="1" id="section_name">
				<col span="1" id="segment_group_key">
				<col span="1" id="segment_code">
				<col span="1" id="data_element">
				<col span="1" id="value_pool_entry">
				<col span="1" id="name">
				<col span="1" id="ahb_expression">
				<col span="1" id="is_valid_expression">
			</colgroup>
			<tr>
				<th>Abschnitt</th>
				<th><!-- Segment Gruppe--></th>
				<th><!-- Segment--></th>
				<th><!-- Datenelement--></th>
				<th>Auswahl</th>
				<th>Bedeutung</th>
				<th>Expression</th>
				<th><!-- is valid (ahbicht) --></th>
				<th><!--perma link-->⚓</th>
			</tr>

		{#each data.ahbs.get(userInput.trim())["lines"] as ahb_line }
		{#if showIrrelevantLines || ahb_line.ahb_expression}
		<tr class={showIrrelevantLines?"irrelevant":"default"}>
			<td>{ahb_line.section_name??''}</td>
			<td>{ahb_line.segment_group_key??''}</td>
			<td>{ahb_line.segment_code??''}</td>
			<td>{ahb_line.data_element??''}</td>
			<td>{ahb_line.value_pool_entry??''}</td>
			<td>{ahb_line.name ??''}</td>
			<td>{ahb_line.ahb_expression??''}</td>
			<td>
				{#await is_valid_expression(ahb_line.ahb_expression)}
				{:then is_valid}
					{#if !is_valid}
					<span title="ungültige Bedigung">⚠</span>
					{/if}
				{/await}
			</td>
			<td><!-- {ahb_line.guid} --></td>
		</tr>
		{/if}
		{/each}
	</table>
	{:else}
	<p>Unbekanner Prüfidentifikator {userInput}</p>
	{/if}
	{:else if userInput.length>0}
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
