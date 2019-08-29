describe('fixedHeader - api - fixedHeader.headerOffset()', function() {
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

			expect(typeof table.fixedHeader.headerOffset).toBe('function');
		});
		it('Getter returns integer', function() {
			expect(typeof table.fixedHeader.headerOffset()).toBe('number');
		});
		it('Setter returns API instance', function() {
			expect(table.fixedHeader.headerOffset(50) instanceof $.fn.dataTable.Api).toBe(true);
		});
		it('destroy', function() {
			table.destroy();
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Get initial value', function() {
			table = $('#example').DataTable({
				fixedHeader: {
					headerOffset: 100
				},
				paging: false
			});

			expect(table.fixedHeader.headerOffset()).toBe(100);
		});
		it('... and at expected offset', function() {
			expect($('table.fixedHeader-floating').offset().top).toBe(100);
		});
		it('Get offset after changing', function() {
			table.fixedHeader.headerOffset(300);

			expect(table.fixedHeader.headerOffset()).toBe(300);
		});
		it('... and at expected offset', function() {
			expect($('table.fixedHeader-floating').offset().top).toBe(300);
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
