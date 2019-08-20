describe('fixedHeader - options - fixedHeader.headerOffset', function() {
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
					headerOffset: 0
				},
				paging: false
			});
			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('... scrolling as expected', async function(done) {
			await dt.scrollTop(400);
			expect($('table.fixedHeader-floating').offset().top).toBe(400);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});

		dt.html('basic');
		it('When non-zero, no fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					headerOffset: 300
				},
				paging: false
			});
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
		});
		it('... and at expected offset', function() {
			expect($('table.fixedHeader-floating').offset().top).toBe(300);
		});
		it('... scrolling as expected', async function(done) {
			await dt.scrollTop(400);
			expect($('table.fixedHeader-floating').offset().top).toBe(700);
			done();
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
