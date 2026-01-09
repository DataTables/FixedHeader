
if (!DataTable.versionCheck('3')) {
	throw 'Warning: FixedHeader requires DataTables 3 or newer';
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interfaces
 */

// Attach for constructor access
$.fn.dataTable.FixedHeader = FixedHeader;
$.fn.DataTable.FixedHeader = FixedHeader;

// DataTables creation - check if the FixedHeader option has been defined on the
// table and if so, initialise
$(document).on('init.dt.dtfh', function (e, settings, json) {
	if (e.namespace !== 'dt') {
		return;
	}

	var init = settings.oInit.fixedHeader;
	var defaults = DataTable.defaults.fixedHeader;

	if ((init || defaults) && !settings._fixedHeader) {
		var opts = $.extend({}, defaults, init);

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

$.each(['header', 'footer'], function (i, el) {
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
