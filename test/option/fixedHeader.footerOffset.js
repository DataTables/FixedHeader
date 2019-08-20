describe('fixedHeader - options - fixedHeader.footerOffset', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'fixedheader'],
		css: ['datatables', 'fixedheader']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Enabled by default...', function() {
			expect($.fn.dataTable.FixedHeader.defaults.headerOffset).toBe(0);
		});
		it('When 0, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					header: false,
					footer: true,
					footerOffset: 0
				},
				paging: false
			});

			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
		});
		it('... scrolling as expected', async function(done) {
			await dt.scrollTop(400);

			var pos = 400 + $(window).height() - $('table.fixedHeader-floating').height();
			expect($('table.fixedHeader-floating').offset().top).toBe(pos);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});

		dt.html('basic');
		it('When non-zero, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					header: false,
					footer: true,
					footerOffset: 400
				},
				paging: false
			});
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
		});
		it('... and at expected offset', function() {
			var pos = $(window).height() - 400 - $('table.fixedHeader-floating').height();
			expect($('table.fixedHeader-floating').offset().top).toBe(pos);
		});
		it('... scrolling as expected', async function(done) {
			await dt.scrollTop(300);
			var pos = $(window).height() - 400 + 300 - $('table.fixedHeader-floating').height();

			expect($('table.fixedHeader-floating').offset().top).toBe(pos);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
