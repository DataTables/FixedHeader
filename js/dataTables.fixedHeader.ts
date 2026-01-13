import DataTable, { Context } from 'datatables.net';
import FixedHeader from './FixedHeader';
import './interface';

if (!DataTable.versionCheck('3')) {
	throw 'Warning: FixedHeader requires DataTables 3 or newer';
}

const dom = DataTable.dom;
const util = DataTable.util;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interfaces
 */

// Attach for constructor access
DataTable.FixedHeader = FixedHeader;

// DataTables creation - check if the FixedHeader option has been defined on the
// table and if so, initialise
dom.s(document).on('init.dt.dtfh', function (e, settings: Context) {
	if (e.namespace !== 'dt') {
		return;
	}

	var init = settings.init.fixedHeader;
	var defaults = DataTable.defaults.fixedHeader;

	if ((init || defaults) && !settings._fixedHeader) {
		let opts = {};

		if (util.is.plainObject(defaults)) {
			util.object.assign(opts, defaults);
		}

		if (util.is.plainObject(init)) {
			util.object.assign(opts, init);
		}

		if (init !== false) {
			new FixedHeader(settings, opts);
		}
	}
});

// DataTables API methods
DataTable.Api.register('fixedHeader()', function () { });

DataTable.Api.register('fixedHeader.adjust()', function () {
	return this.iterator('table', function (ctx) {
		var fh = ctx._fixedHeader;

		if (fh) {
			fh.update();
		}
	});
});

DataTable.Api.register('fixedHeader.enable()', function (flag) {
	return this.iterator('table', function (ctx) {
		var fh = ctx._fixedHeader;

		flag = flag !== undefined ? flag : true;

		if (fh && flag !== fh.enabled()) {
			fh.enable(flag);
		}
	});
});

DataTable.Api.register('fixedHeader.enabled()', function () {
	if (this.context.length) {
		var fh = this.context[0]._fixedHeader;

		if (fh) {
			return fh.enabled();
		}
	}

	return false;
});

DataTable.Api.register('fixedHeader.disable()', function () {
	return this.iterator('table', function (ctx) {
		var fh = ctx._fixedHeader;

		if (fh && fh.enabled()) {
			fh.enable(false);
		}
	});
});

['header', 'footer'].forEach(function (el) {
	DataTable.Api.register('fixedHeader.' + el + 'Offset()', function (offset) {
		var ctx = this.context;

		if (offset === undefined) {
			return ctx.length && ctx[0]._fixedHeader
				? ctx[0]._fixedHeader[el + 'Offset']()
				: undefined;
		}

		return this.iterator('table', function (ctx) {
			var fh = ctx._fixedHeader;

			if (fh) {
				fh[el + 'Offset'](offset);
			}
		});
	});
});
