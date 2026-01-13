
import DataTables, { Api, Dom } from 'datatables.net';
import FixedHeader from './FixedHeader';

export default DataTables;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables' types integration
 */
declare module 'datatables.net' {
	interface Context {
		_fixedHeader: FixedHeader;
	}

	interface Config {
        /*
         * FixedHeader extension options
         */
        fixedHeader?: boolean | Options;
    }

	interface Api<T> {
		/**
		 * FixedHeader methods container
		 * 
		 * @returns Api for chaining with the additional FixedHeader methods
		 */
		fixedHeader: ApiFixedHeaderMethods<T>;
	}

	interface DataTablesStatic {
		/**
		 * FixedHeader class
		 */
		FixedHeader: {
			/**
			 * Create a new FixedHeader instance for the target DataTable
			 */
			new (dt: Api<any>, settings: boolean | Options): DataTablesStatic['FixedHeader'];

			/**
			 * FixedHeader version
			 */
			version: string;

			/**
			 * Default configuration values
			 */
			defaults: Options;
		}
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Options
 */

export interface Defaults {
    /*
     * Enable / disable fixed footer
     */
    footer: boolean;

    /*
     * Offset the table's fixed footer
     */
    footerOffset: number;

    /*
     * Enable / disable fixed header
     */
    header: boolean;

    /*
     * Offset the table's fixed header
     */
    headerOffset: number;
}

export interface Options extends Partial<Defaults> {}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * API
 */

interface ApiFixedHeaderMethods<T> extends Api<T> {
    /**
     * Recalculate the position of the DataTable on the page and adjust the fixed element as appropriate.
     * 
     * @returns The DataTables API for chaining
     */
    adjust(): Api<T>;

    /**
     * Disable the fixed elements
     * 
     * @returns The DataTables API for chaining
     */
    disable(): Api<T>;

    /**
     * Enable / disable the fixed elements
     * 
     * @param enable Flag to indicate if the FixedHeader elements should be enabled or disabled, default true.
     * @returns The DataTables API for chaining
     */
    enable(enable?: boolean): Api<T>;

    /**
     * Simply gets the status of FixedHeader for this table.
     * 
     * @returns true if FixedHeader is enabled on this table. false otherwise.
     */
    enabled(): boolean;

    /**
     * Get the fixed footer's offset.
     * 
     * @returns The current footer offset
     */
    footerOffset(): number;

    /**
     * Set the fixed footer's offset
     * 
     * @param offset The offset to be set
     * @returns DataTables Api for chaining
     */
    footerOffset(offset: number): Api<T>;

    /**
     * Get the fixed header's offset.
     * 
     * @returns The current header offset
     */
    headerOffset(): number;

    /**
     * Set the fixed header's offset
     * 
     * @param offset The offset to be set
     * @returns The DataTables API for chaining
     */
    headerOffset(offset: number): Api<T>;
}


export interface InternalDom {
	floatingHeader: null,
	thead: Dom;
	tbody: Dom;
	tfoot: Dom;
	header: {
		host: Dom | null;
		scrollAdjust: Dom | null;
		floating: Dom | null;
		floatingParent: Dom;
		limiter: Dom | null;
		placeholder: Dom | null;
		rightBlocker: Dom | null;
		leftBlocker: Dom | null;
	}
	footer: {
		host: Dom | null;
		scrollAdjust: Dom | null;
		floating: Dom | null;
		floatingParent: Dom;
		limiter: Dom | null;
		placeholder: Dom | null;
		rightBlocker: Dom | null;
		leftBlocker: Dom | null;
	}
}

export interface Settings {
	dt: Api;
	position: {
		theadBottom: number;
		theadTop: number;
		tbodyTop: number;
		tbodyHeight: number;
		tbodyWidth: number;
		tfootTop: number;
		tfootBottom: number;
		width: number;
		left: number;
		tfootHeight: number;
		theadHeight: number;
		windowHeight: number;
		visible: boolean;
	},
	headerMode: string | null;
	footerMode: string | null;
	autoWidth: boolean;
	namespace: string;
	scrollLeft: {
		header: number;
		footer: number;
	},
	enable: boolean;
	autoDisable: boolean;
}