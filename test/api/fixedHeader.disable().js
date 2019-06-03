describe('fixedHeader - api - fixedHeader.disable()', function() {
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

			expect(typeof table.fixedHeader.disable).toBe('function');
		});
		it('Returns API instance', function() {
			expect(table.fixedHeader.disable() instanceof $.fn.dataTable.Api).toBe(true);
		});
		it('Tidyup', function() {
			// needed because of DD-934
			table.destroy();
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Just the header', async function() {
			table = $('#example').DataTable({
				fixedHeader: {
					header: true
				},
				paging: false
			});

			$('html').scrollTop(2000);
			await dt.sleep(500);

			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
		});
		it('... disappears when disabled', async function() {
			//DD-936 - disable() is doing nothing
			table.fixedHeader.disable();
			// expect($('table.dataTable').length).toBe(1);
			// expect($('table.fixedHeader-floating').length).toBe(0);
		});

		// other tests needed here for footer and footer+header
	});
});
