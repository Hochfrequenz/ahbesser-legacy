import { onMount } from "svelte";

export const prerender = false; // dynamic data! do not pre-render
export interface FlatAhbLine {
	guid: string;
	name: string | null;
	segment_group_key: string | null;
	segment_code: string | null;
	ahb_expression: string | null;
	value_pool_entry: string | null;
	data_element: string | null;
	index: number;
	section_name: string;
}
export interface FlatAhb {
	meta: AhbMetaInformation;
	lines: Array<FlatAhbLine>;
}
export interface AhbMetaInformation {
	pruefidentifikator: string;
}

async function loadSingleAhb(flatAhbPath: string): Promise<FlatAhb> {
	const flatAhbContent: FlatAhb = await import(flatAhbPath);
	return flatAhbContent;
}
async function loadAllAhbs():Promise<Array<FlatAhb>>{
	let allAhbPathes = import.meta.glob(
		'$lib/machine-readable_anwendungshandbuecher/FV2210/**/flatahb/*.json'
	);
	let ahbPromises = new Array<Promise<FlatAhb>>();
	for (let ahbPath in allAhbPathes) {
		ahbPromises.push(loadSingleAhb(ahbPath));
	}
	let allAhbs = new Array<FlatAhb>();
	allAhbs = await Promise.all(ahbPromises);
	return allAhbs;
}


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let allMetaData = new Array<AhbMetaInformation>();
	let availablePruefis = new Set<string>();
	let ahbMap = new Map<string, FlatAhb>();
	for (let flatAhb of await loadAllAhbs()) {
		allMetaData.push(flatAhb.meta);
		availablePruefis.add(flatAhb.meta.pruefidentifikator);
		ahbMap.set(flatAhb.meta.pruefidentifikator, flatAhb);
	}
	return {
		metadatas: allMetaData,
		availablePruefis: availablePruefis,
		ahbs: ahbMap
	};
}


