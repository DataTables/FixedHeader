describe('fixedHeader - options - fixedHeader.header', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'fixedheader'],
		css: ['datatables', 'fixedheader']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Enabled by default...', function() {
			expect($.fn.dataTable.FixedHeader.defaults.header).toBe(true);
		});
		it('When true, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					header: true,
					footer: false
				},
				paging: false
			});

			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('... appears when scolling down', async function(done) {
			await dt.scrollTop(2000);
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
			done();
		});
		it('Removed when table destroyed', function() {
			table.destroy();
			expect($('table.dataTable').length).toBe(0);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('destroy', function() {
			table.destroy();
		});

		dt.html('basic');
		it('When false, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					header: false,
					footer: false
				},
				paging: false
			});
			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('... does not appear when scolling down', async function(done) {
			await dt.scrollTop(2000);
			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
