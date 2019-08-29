describe('fixedHeader - api - fixedHeader.enable()', function() {
	dt.libs({
		js: ['jquery', 'datatables', 'fixedheader'],
		css: ['datatables', 'fixedheader']
	});

	let table;

	describe('Check the defaults', function() {
		dt.html('basic_id');
		it('Ensure its a function', function() {
			table = $('#example').DataTable({
				fixedHeader: true
			});

			expect(typeof table.fixedHeader.enable).toBe('function');
		});
		it('Returns API instance', function() {
			expect(table.fixedHeader.enable() instanceof $.fn.dataTable.Api).toBe(true);
		});
		it('destroy', function() {
			table.destroy();
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Just the header', async function(done) {
			table = $('#example').DataTable({
				fixedHeader: {
					header: true
				},
				paging: false
			});

			await dt.scrollTop(2000);
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
			done();
		});
		it('... disappears when disabled', function() {
			table.fixedHeader.enable(false);
			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('... appears when enabled', function() {
			table.fixedHeader.enable(true);
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
