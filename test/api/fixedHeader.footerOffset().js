describe('fixedHeader - api - fixedHeader.footerOffset()', function() {
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

			expect(typeof table.fixedHeader.footerOffset).toBe('function');
		});
		it('Getter returns integer', function() {
			expect(typeof table.fixedHeader.footerOffset()).toBe('number');
		});
		it('Setter returns API instance', function() {
			expect(table.fixedHeader.footerOffset(50) instanceof $.fn.dataTable.Api).toBe(true);
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
					header: false,
					footer: true,
					footerOffset: 100
				},
				paging: false
			});

			expect(table.fixedHeader.footerOffset()).toBe(100);
		});
		it('... and at expected offset', function() {
			var pos = $(window).height() - 100 - $('table.fixedHeader-floating').height();
			expect($('table.fixedHeader-floating').offset().top).toBe(pos);
		});
		it('Get offset after changing', function() {
			table.fixedHeader.footerOffset(300);

			expect(table.fixedHeader.footerOffset()).toBe(300);
		});
		it('... and at expected offset', function() {
			var pos = $(window).height() - 300 - $('table.fixedHeader-floating').height();
			expect($('table.fixedHeader-floating').offset().top).toBe(pos);
		});
		it('destroy', function() {
			table.destroy();
		});
	});
});
