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
interface EagerAhb {
	meta: AhbMetaInformation;
	lines: Array<FlatAhbLine>;
}

// see https://vitejs.dev/guide/features.html#glob-import
const ahbFileNameToRawAhb: Record<string, EagerAhb> = import.meta.glob(
	`$lib/machine-readable_anwendungshandbuecher/FV2310/**/flatahb/*.json`,
	{ eager: true }
); // the keys are the pathes to the ahb from the submodule, the value is a callable that returns its content

async function loadAllAhbs(): Promise<Array<FlatAhb>> {
	const allAhbs = new Array<FlatAhb>();
	for (const ahbPath in ahbFileNameToRawAhb) {
		const eagerAhb = ahbFileNameToRawAhb[ahbPath];
		const flatAhb = {
			meta: eagerAhb.meta,
			lines: eagerAhb.lines
		};
		allAhbs.push(flatAhb);
	}
	return allAhbs;
}
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// no {params} for now, because we don't need them
	const allMetaData = new Array<AhbMetaInformation>();
	const availablePruefis = new Set<string>();
	const ahbMap = new Map<string, FlatAhb>();
	const allAhbs = await loadAllAhbs();
	for (const flatAhb of allAhbs) {
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
