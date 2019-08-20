describe('fixedHeader - options - fixedHeader.footer', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'fixedheader'],
		css: ['datatables', 'fixedheader']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Enabled by default...', function() {
			expect($.fn.dataTable.FixedHeader.defaults.footer).toBe(false);
		});
		it('When true, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					footer: true
				},
				paging: false
			});
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
		});
		it('... appears when scolling down (along with header)', async function(done) {
			await dt.scrollTop(1000);
			expect($('table.dataTable').length).toBe(3);
			expect($('table.fixedHeader-floating').length).toBe(2);
			done();
		});
		it('... disappears when scolling all the way down', async function(done) {
			await dt.scrollTop(2000);
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
			done();
		});
		it('Removed when table destroyed', async function(done) {
			await dt.scrollTop(0);
			table.destroy();
			expect($('table.dataTable').length).toBe(0);
			expect($('table.fixedHeader-floating').length).toBe(0);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});

		dt.html('basic');
		it('When false, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					footer: false
				},
				paging: false
			});
			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('... does not appear when scolling down', async function(done) {
			await dt.scrollTop(2000);
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
