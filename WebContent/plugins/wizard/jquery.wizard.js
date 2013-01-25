/**
 * 
 */

;(function( $, undefined ) {
	
	var css = {
			STEP_FIRST : "yy-wizard-step-first",
			STEP_LAST : "yy-wizard-step-last",
			STEP_CURRENT : "yy-wizard-step_cur",
			STEP : "yy-wizard-step"
		};
	
	$.widget( "yy.wizard", {
		
		_dialogOptions:{
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
			title : null,
			width : "400",
			
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
			beforeNext: null
		},
		
		_title : {
			prefix: "Wizard: ",
			separator : ' : ',
			label : null
		},
		
		options: {
			
			//
			prevLabel : "prev",
			nextLabel :	"next",
			through : {effect : "drop", duration : "fast"},
			title : null,
			
			// callbacks
			afterPrev: null,
			afterNext: null
		},
		
		_getDialogOption: function(addopt) {
			var dialog ={};
			for (var opt in this._dialogOptions){
				if(typeof this.options[opt] !== 'undefined'){
					dialog[opt] = this.options[opt];
				} else if(addopt && typeof addopt[opt]  !== 'undefined'){
					dialog[opt] = addopt[opt];
				} else {
					dialog[opt] = this._dialogOptions[opt];
				}
			}
			
			//add buttons
			dialog.buttons = (function(that){
				 return [{ label: "prev", text: that.options.prevLabel, click: function() { that.prev(); } },
				         { label: "next", text: that.options.nextLabel, click: function() { that.next(); } }];
			}(this));
			return dialog;
		},
		
		_initTitle: function() {
			//user added title for dialog
			if(typeof this.options.title === "string"){
				
				title.push(this.options.title);
				
			//if no value or default value check title of element
			} else if(!this.options.title || !this.options.title.label){
				var elTitle = this.element.attr('title');
				
				//if title is null 
				if(!this.options.title){
					this.options.title = this._title;
				}
				
				if(elTitle){
					this.options.title.label = elTitle;
				} else {
					this.options.title.label = '';
				}
			}
		},
		
		_getTitle: function(stepTitle) {
			
			var title = [];
			
			//start create title
			title.push(this.options.title.prefix);
			title.push(this.options.title.label);
			
			//add separator and step title
			if(stepTitle){
				title.push(this.options.title.separator);
				title.push(stepTitle);
			}
			
			return title.join('');
		},
		
		_setTitle: function(stepTitle) {
			this.element.dialog('option', 'title', this._getTitle(stepTitle));
		},
		
		_create: function() {
			mc.l("_create", this, arguments);
			
			//TODO road
			
			mc.l("_create opt", this._getDialogOption());
			
			this._initTitle();
			
			this.element.dialog(this._getDialogOption());
			
			this.element.children().each(function(n){
				var el = $(this);
				el.hide();
				if(el.is("div")){
					el.addClass(css.STEP);
					if(n == 0){
						el.addClass(css.STEP_FIRST);
					}
				}
			}).filter('div:last').addClass(css.STEP_LAST);
			
			
			this._isOpen = false;
		},
		
		_init: function() {
			mc.l("_init", this, arguments);
			this.element.children("." + css.STEP).hide().removeClass(css.STEP_CURRENT);
			
			this._setTitle(this.element.find("." + css.STEP_FIRST).show().addClass(css.STEP_CURRENT).attr('title'));
			
			
			
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
			this.element.children("." + css.STEP).removeClass(css.STEP).removeClass(css.STEP_CURRENT).removeClass(css.STEP_FIRST).removeClass(css.STEP_LAST);
			this.element.dialog("destroy");
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
			var cur = this.element.children("." + css.STEP_CURRENT);
			var prev = null;
			if(!cur.is("." + css.STEP_FIRST)){
				prev = cur.removeClass(css.STEP_CURRENT).hide().prev("." + css.STEP).addClass(css.STEP_CURRENT).show();
				
				//set title
				this._setOption('title', prev.attr('title'));
			}
			
			//disable or not  
			if(prev && prev.is("." + css.STEP_FIRST)){
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
			var cur = this.element.children("." + css.STEP_CURRENT);
			var next = null;
			if(!cur.is("." + css.STEP_LAST)){
				next = cur.removeClass(css.STEP_CURRENT).hide().next("." + css.STEP).addClass(css.STEP_CURRENT).show();
				
				//set title
				this._setOption('title', next.attr('title'));
			}
			
			//disable or not  
			if(next && next.is("." + css.STEP_LAST)) {
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
		
		_setOption: function(key, value){
			mc.l("_setOptions", this, arguments);
		},
		
		_setOptions: function(options){
			mc.l("_setOptions", this, arguments);
		}
	});
	
	$.extend($.yy.wizard, {
		instances: []
	});
}(jQuery));