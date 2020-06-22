describe('fixedHeader - api - fixedHeader.enabled()', function() {
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

			expect(typeof table.fixedHeader.enabled).toBe('function');
		});
		it('Returns boolean', function() {
			expect(typeof table.fixedHeader.enabled()).toBe('boolean');
		});
		it('destroy', function() {
			table.destroy();
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Not enable', function() {
			table = $('#example').DataTable({
				fixedHeader: false
			});

			expect(table.fixedHeader.enabled()).toBe(false);
		});
		it('... estroy', function() {
			table.destroy();
		});

		dt.html('basic');
		it('Enable', function() {
			table = $('#example').DataTable({
				fixedHeader: true
			});

			expect(table.fixedHeader.enabled()).toBe(true);
		});
		it('... then disabled', function() {
			table.fixedHeader.disable();
			expect(table.fixedHeader.enabled()).toBe(false);
		});
		it('... then enabled', function() {
			table.fixedHeader.enable();
			expect(table.fixedHeader.enabled()).toBe(true);
		});
		it('... destroy', function() {
			table.destroy();
		});
	});
});
