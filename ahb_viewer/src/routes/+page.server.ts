export const prerender = false; // dynamic data! do not pre-render
import {readFile} from 'fs/promises';
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
	const rawData = await fetch(flatAhbPath.replace("/src/lib/machine-readable_anwendungshandbuecher/","http://127.0.0.1:5173/_ahbs/"));
	const json = await rawData.json();
	var flatAhb = JSON.parse(json);
	return {
		meta:flatAhb.meta,
		lines:flatAhb.lines,
	} satisfies FlatAhb;
}
async function loadAllAhbs(): Promise<Array<FlatAhb>> {
	let ahbPromises = new Array<Promise<FlatAhb>>();
	let allAhbPathes = await import.meta.glob(`$lib/machine-readable_anwendungshandbuecher/FV2210/**/flatahb/*.json`);
	console.log("allpathes", allAhbPathes);
	for (let ahbPath in allAhbPathes) {
		ahbPromises.push(loadSingleAhb(ahbPath));
	}
	let allAhbs = new Array<FlatAhb>();
	allAhbs = await Promise.all(ahbPromises);
	return allAhbs;
}
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	let allMetaData = new Array<AhbMetaInformation>();
	let availablePruefis = new Set<string>();
	let ahbMap = new Map<string, FlatAhb>();
	let allAhbs = await loadAllAhbs();
	for (let flatAhb of allAhbs) {
		allMetaData.push(flatAhb.meta);
		availablePruefis.add(flatAhb.meta.pruefidentifikator);
		ahbMap.set(flatAhb.meta.pruefidentifikator, flatAhb);
	}
	const result = {
		metadatas: allMetaData,
		availablePruefis: availablePruefis,
		ahbs: ahbMap
	};
	return result;
}) satisfies PageServerLoad;