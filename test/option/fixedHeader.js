describe('fixedHeader - options - fixedHeader', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'fixedheader'],
		css: ['datatables', 'fixedheader']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Just the header by default...', function() {
			expect($.fn.dataTable.FixedHeader.defaults.header).toBe(true);
			expect($.fn.dataTable.FixedHeader.defaults.footer).toBe(false);
		});
		it('No fixed header shown on initialisaton', function() {
			table = $('#example').DataTable({ fixedHeader: true, paging: false });
			expect($('table.dataTable').length).toBe(1);
			expect($('table.fixedHeader-floating').length).toBe(0);
		});
		it('... appears when scolling down', async function(done) {
			await dt.scrollTop(2000);
			expect($('table.dataTable').length).toBe(2);
			expect($('table.fixedHeader-floating').length).toBe(1);
			done();
		});
		it('destroy', async function(done) {
			await dt.scrollTop(0);
			table.destroy();
			done();
		});
	});

	describe('Holds position when columns adjusted', function() {
		let pos;

		dt.html('basic');

		it('Will initialize', function() {
			table = $('#example').DataTable({
				fixedHeader: true,
				paging: false,
				scrollY: 1000
			});
		});

		it('Position on scroll', async function(done) {
			await dt.scrollTop(2000);
			expect($('table.fixedHeader-floating').length).toBe(1);

			pos = $(window).scrollTop();
			done();
		});

		it('Position held after columns.adjust', function() {
			table.columns.adjust();

			expect($(window).scrollTop()).toBe(pos);
		});
	});
});
