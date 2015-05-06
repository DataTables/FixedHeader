/*! FixedHeader 3.0.0-dev
 * ©2009-2015 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              scrolling
 * @version     3.0.0-dev
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2015 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */


(function(window, document, undefined) {


var factory = function( $, DataTable ) {
"use strict";


var FixedHeader = function ( dt, config ) {
	// Sanity check - you just know it will happen
	if ( ! (this instanceof FixedHeader) ) {
		throw "FixedHeader must be initialised with the 'new' keyword.";
	}

	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	dt = new DataTable.Api( dt );

	this.c = $.extend( true, {}, FixedHeader.defaults, config );

	this.s = {
		dt: dt,
		position: {
			theadTop: 0,
			tbodyTop: 0,
			tfootTop: 0,
			tfootBottom: 0
		},
		headerMode: null,
		footerMode: null
	};

	this.dom = {
		floatingHeader: null,
		thead: $(dt.table().header()),
		tbody: $(dt.table().body()),
		tfoot: $(dt.table().footer()),
		header: {
			host: null,
			floating: null,
			placeholder: null
		},
		footer: {
			host: null,
			floating: null,
			placeholder: null
		}
	};

	this.dom.header.host = this.dom.thead.parent();
	this.dom.footer.host = this.dom.tfoot.parent();

	var dtSettings = dt.settings()[0];
	if ( dtSettings._fixedHeader ) {
		throw "FixedHeader already initialised on table "+dtSettings.nTable.id;
	}

	dtSettings._fixedHeader = this;

	this._constructor();
};


/*
 * Variable: FixedHeader
 * Purpose:  Prototype for FixedHeader
 * Scope:    global
 */
FixedHeader.prototype = {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;

		// xxx needs a unique namespace
		$(window).on( 'scroll.dtfc', function () {
			that._scroll();
		} );

		// xxx window resize event handler
		// xxx column reorder event handler - redo the placeholder
		// xxx column visibility event handler - redo the placeholder

		dt.on( 'destroy.dtfc', function () {
			dt.off( 'destroy.dtfc' );
			$(window).off( 'scroll.dtfc' );
		} );

		this._positions();
	},


	_positions: function ()
	{
		var dt = this.s.dt;
		var table = dt.table();
		var position = this.s.position;
		var dom = this.dom;
		var tableNode = $(table.node());

		position.width = tableNode.outerWidth();
		position.left = tableNode.offset().left;
		position.theadTop = dom.thead.offset().top;
		position.tbodyTop = dom.tbody.offset().top;
		position.tfootTop = dom.tfoot.offset().top;
		position.tfootBottom = position.tfootTop + dom.tfoot.outerHeight();
		position.tfootHeight = position.tfootBottom - position.tfootTop;
		position.theadHeight = position.tbodyTop - position.theadTop;
	},


	_scroll: function ()
	{
		var windowTop = $(document).scrollTop();
		var windowHeight = $(window).height(); // xxx move to a resize event handler
		var position = this.s.position;
		var headerMode, footerMode;

		if ( this.c.header ) {
			if ( windowTop <= position.theadTop - this.c.headerOffset ) {
				headerMode = 'in-place';
			}
			else if ( windowTop <= position.tfootTop - position.theadHeight - this.c.headerOffset ) {
				headerMode = 'in';
			}
			else {
				headerMode = 'below';
			}

			if ( headerMode !== this.s.headerMode ) {
				this._modeChange( headerMode, 'header' );
			}
		}

		if ( this.c.footer ) {
			if ( windowTop + windowHeight >= position.tfootBottom + this.c.footerOffset ) {
				footerMode = 'in-place';
			}
			else if ( windowHeight + windowTop > position.tbodyTop + position.tfootHeight + this.c.footerOffset ) {
				footerMode = 'in';
			}
			else {
				footerMode = 'above';
			}

			if ( footerMode !== this.s.footerMode ) {
				this._modeChange( footerMode, 'footer' );
			}
		}
	},


	// Switching mode
	_modeChange: function ( mode, item )
	{
		var dt = this.s.dt;
		var itemDom = this.dom[ item ];
		var position = this.s.position;

		if ( mode === 'in-place' ) {
			// Insert the header back into the table's real header
			if ( itemDom.placeholder ) {
				itemDom.placeholder.remove();
				itemDom.placeholder = null;
			}

			itemDom.host.append( item === 'header' ?
				this.dom.thead :
				this.dom.tfoot
			);

			if ( itemDom.floating ) {
				itemDom.floating.remove();
				itemDom.floating = null;
			}
		}
		else if ( mode === 'in' ) {
			// Remove the header from the read header and insert into a fixed
			// positioned floating table clone
			this._clone( item );

			itemDom.floating
				.addClass( 'fixedHeader-floating' )
				.css( item === 'header' ? 'top' : 'bottom', this.c[item+'Offset'] )
				.css( 'left', position.left+'px' )
				.css( 'width', position.width+'px' );

			if ( item === 'footer' ) {
				itemDom.floating.css( 'top', '' );
			}
		}
		else if ( mode === 'below' ) { // only used for the header
			// Fix the position of the floating header at base of the table body
			this._clone( item );

			itemDom.floating
				.addClass( 'fixedHeader-locked' )
				.css( 'top', position.tfootTop - position.theadHeight )
				.css( 'left', position.left+'px' )
				.css( 'width', position.width+'px' );
		}
		else if ( mode === 'above' ) { // only used for the footer
			// Fix the position of the floating footer at top of the table body
			this._clone( item );

			itemDom.floating
				.addClass( 'fixedHeader-locked' )
				.css( 'top', position.tbodyTop )
				.css( 'left', position.left+'px' )
				.css( 'width', position.width+'px' );
		}

		this.s[item+'Mode'] = mode;
	},

	_clone: function ( item )
	{
		var dt = this.s.dt;
		var itemDom = this.dom[ item ];
		var itemElement = item === 'header' ?
			this.dom.thead :
			this.dom.tfoot;

		if ( itemDom.floating ) {
			// existing floating element - reuse it
			itemDom.floating.removeClass( 'fixedHeader-floating fixedHeader-locked' );
		}
		else {
			itemDom.floating = $( dt.table().node().cloneNode( false ) )
				.append( itemElement )
				.appendTo( 'body' );

			// xxx footer needs sizes cloned across

			// Insert a fake thead/tfoot into the DataTable to stop it jumping around
			itemDom.placeholder = itemElement.clone( false );
			itemDom.host.append( itemDom.placeholder );
		}
	}
};


FixedHeader.version = "3.0.0-dev";


FixedHeader.defaults = {
	header: true,
	footer: false,
	headerOffset: 0,
	footerOffset: 0
};


// xxx API method to allow recalculation of the positions and thus redraw


$.fn.dataTable.FixedHeader = FixedHeader;
$.fn.DataTable.FixedHeader = FixedHeader;


// DataTables creation - check if the FixedHeader option has been defined on the
// table
$(document).on( 'init.dt.dtb', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.fixedHeader || DataTable.defaults.fixedHeader;

	if ( opts && ! settings._buttons ) {
		new FixedHeader( settings, opts );
	}
} );


return FixedHeader;
}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
	define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery && !jQuery.fn.dataTable.FixedHeader ) {
	// Otherwise simply initialise as normal, stopping multiple evaluation
	factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);
