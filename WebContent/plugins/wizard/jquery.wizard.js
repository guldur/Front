

;(function( $, undefined ) {
	
	var 
	STEP_FIRST = "yy-wizard-step-first",
	STEP_LAST = "yy-wizard-step-last",
	STEP_CURRENT = "yy-wizard-step_cur",
	STEP = "yy-wizard-step";
	
	$.widget( "yy.wizard", {
		
		_dialogOptions:{
			
		},
		options: {
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
			prevLabel : "prev",
			nextLabel :	"next",
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
			
			//
			afterPrev: null,
			afterNext: null
		},
		
		_create: function() {
			mc.l("_create", this, arguments);
			var that = this;
			//TODO title
			//TODO road
			var opt = $.extend({}, this.options, {buttons: [ 
			    			                                { label: "prev", text: this.options.prevLabel, click: function() { that.prev(); } },
			    			                                { label: "next", text: this.options.nextLabel, click: function() { that.next(); } }]});
			this.element.dialog(opt);
			this.element.children().each(function(n){
				var el = $(this);
				el.hide();
				if(el.is("div")){
					el.addClass(STEP);
					if(n == 0){
						el.addClass(STEP_FIRST);
					}
				}
			}).filter('div:last').addClass(STEP_LAST);
			
			this._isOpen = false;
			
			mc.l("_create", this.element.children());
		},
		
		_init: function() {
			mc.l("_init", this, arguments);
			this.element.children("." + STEP).hide().removeClass(STEP_CURRENT);
			this.element.find("." + STEP_FIRST).show().addClass(STEP_CURRENT);
			this._initButtons();
			this._prevButton.button( "disable" );
			if ( this.options.autoOpen ) {
				this.open();
			}
		},
		
		_initButtons: function(){
			if(!this._prevButton){
				this._prevButton = $('button[label="prev"]', this.element.parent());
			}
			if(!this._nextButton){
				this._nextButton = $('button[label="next"]', this.element.parent());
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
			var prev = null;
			if(!cur.is("." + STEP_FIRST)){
				prev = cur.removeClass(STEP_CURRENT).hide().prev("." + STEP).addClass(STEP_CURRENT).show();
			}
			
			if(prev && prev.is("." + STEP_FIRST)){
				this._prevButton.button( "disable" );
			} else {
				if(this._nextButton.button( "option", "disabled" )){
					this._nextButton.button( "enable" );
				}
			}
		},
		_prevButton : null,
		_nextButton : null,
		next: function() {
			mc.l("next", this, arguments);
			var cur = this.element.children("." + STEP_CURRENT);
			var next = null;
			if(!cur.is("." + STEP_LAST)){
				next = cur.removeClass(STEP_CURRENT).hide().next("." + STEP).addClass(STEP_CURRENT).show();
			}
			
			if(next && next.is("." + STEP_LAST)) {
				this._nextButton.button( "disable" );
			} else {
				if(this._prevButton.button( "option", "disabled" )){
					this._prevButton.button( "enable" );
				}
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