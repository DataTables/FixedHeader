describe('fixedHeader - api - fixedHeader.adjust()', function() {
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

			expect(typeof table.fixedHeader.adjust).toBe('function');
		});
		it('Returns API instance', function() {
			expect(table.fixedHeader.adjust() instanceof $.fn.dataTable.Api).toBe(true);
		});
		it('destroy', function() {
			table.destroy();
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Hide table initially', function() {
			$('#example').hide();
			table = $('#example').DataTable({
				fixedHeader: {
					headerOffset: 100
				},
				paging: false
			});
			$('#example_wrapper, #example').show();

			expect(table.fixedHeader.headerOffset()).toBe(100);
		});
		it('... but not in the DOM', function() {
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('Call adjust', function() {
			table.fixedHeader.adjust();
			expect(table.fixedHeader.headerOffset()).toBe(100);
		});
		it('... and now in the DOM', function() {
			expect($('table.fixedHeader-floating').offset().top).toBe(100);
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
