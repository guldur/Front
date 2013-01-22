

;(function( $, undefined ) {
	
	var 
	STEP_FIRST = "yy-wizard-step-first",
	STEP_LAST = "yy-wizard-step-last",
	STEP_CURRENT = "yy-wizard-step_cur",
	STEP = "yy-wizard-step";
	
	$.widget( "yy.wizard", {
		options: {
			prevLabel : "prev",
			nextLabel :	"next",
			appendTo : "body",
			autoOpen : true,
			closeOnEscape : true,
			dialogClass : "",
			draggable : true,
			height : "auto",
			hide : {effect : "drop", duration : "fast"},
			maxHeight : null,
			maxWidth : null,
			minHeight : 200,
			minWidth : 200,
			modal : true,
			position : { my: "center", at: "center", of: window },
			resizable : true,
			show : {effect : "drop", duration : "fast"},
			title : "Wizard:",
			width : "400",
			//
			through : {effect : "drop", duration : "fast"},
			
			// callbacks
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null,
			beforePrev: null,
			beforeNext: null,
			afterPrev: null,
			afterNext: null
		},
		
		_create: function() {
			mc.l("_create", this, arguments);
			var that = this;
			var opt = $.extend({}, this.options, {buttons: [ 
			    			                                { text: this.options.prevLabel, click: function() { that.prev(); } },
			    			                                { text: this.options.nextLabel, click: function() { that.next(); } }]});
			this.element.dialog(opt);
			this.element.children().each(function(){
				var that = $(this);
				that.hide();
				if(that.is("div")){
					that.addClass(STEP);
					if(that.is(":first")){
						that.addClass(STEP_FIRST);
					}
					if(that.is(":last")){
						that.addClass(STEP_LAST);
					}
				}
			});
			
			this._isOpen = false;
			
			mc.l("_create", this.element.children());
		},
		
		_init: function() {
			mc.l("_init", this, arguments);
			this.element.children("." + STEP).hide().removeClass(STEP_CURRENT);
			this.element.find("." + STEP_FIRST).show().addClass(STEP_CURRENT);
			
			if ( this.options.autoOpen ) {
				this.open();
			}
		},
		
		_destroy: function() {
			mc.l("_destroy", this, arguments);
		},
		
		disable: $.noop,
		enable: $.noop,
		
		isOpen: function() {
			return this._isOpen;
		},
		
		open: function() {
			mc.l("open", this, arguments);
			this._isOpen = true;
			$( this ).dialog( "open" );
		},
		
		close: function() {
			mc.l("close", this, arguments);
			this._isOpen = false;
			$( this ).dialog( "close" );
		},
		
		prev: function() {
			mc.l("prev", this, arguments);
			var cur = this.element.children("." + STEP_CURRENT);
			if(!cur.is("." + STEP_FIRST)){
				cur.removeClass(STEP_CURRENT).hide().prev("." + STEP).addClass(STEP_CURRENT).show();
			}
		},
		
		next: function() {
			mc.l("next", this, arguments);
			var cur = this.element.children("." + STEP_CURRENT);
			if(!cur.is("." + STEP_LAST)){
				cur.removeClass(STEP_CURRENT).hide().next("." + STEP).addClass(STEP_CURRENT).show();
			}
		},
		
		reset: function() {
			mc.l("reset", this, arguments);
		},
		
	});
	
	$.extend($.yy.wizard, {
		instances: []
	});
}(jQuery));
/*
modal: true,
buttons: {
Ok: function() {
$( this ).dialog( "close" );
}
}s
	
	*/