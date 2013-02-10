/*
 * wizard
 * https://github.com/yurch/wizard
 *
 * Copyright (c) 2013 "yurch" Yuriy Yurchenko
 * Licensed under the MIT license.
 */

;(function( $, undefined ) {
	
	var css = {
			STEP_FIRST : "yy-wizard-step-first",
			STEP_LAST : "yy-wizard-step-last",
			STEP_CURRENT : "yy-wizard-step_cur",
			STEP : "yy-wizard-step",
			STEP_N : "yy-step-"
		};
	

	var wizard = {

		_dialogOptions:{
			appendTo : "body",
			autoOpen : true,
			closeOnEscape : true,
			dialogClass : "",
			draggable : true,
			height : "auto",
			hide : {effect : "fade", duration : "fast"},
			maxHeight : null,
			maxWidth : null,
			minHeight : 200,
			minWidth : 200,
			modal : true,
			position : { my: "center", at: "center", of: window },
			resizable : true,
			show : {effect : "fade", duration : "fast"},
			title : null,
			width : 400,
			
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
		},
		/**
		 * @memberOf wizard
		 */
		_title : {
			separator : ' : ',
			text : null
			//TODO title to string option, separator to another string option
		},
		_cacheStyle:{
			
		},
		options: {
			
			//
			prevLabel : "prev",
			nextLabel :	"next",
			finishLabel : "finish",
			cancelLabel : "cancel",
			through : {effect : "drop", duration : "fast"}, //TODO steps animation
			title : null,
			//TODO
			//startStep
			//button config (hide)
			//step config: {Array} of {Object}
			/*
			 {
			 	title: "",
			 	button:{
			 		prev: "disable",
			 		finish: "enable"
			 		cancel: "hidden"
			 	}
			 }
			 */
			
			// callbacks
			beforePrev: null,
			beforeNext: null,
			afterPrev: null,
			afterNext: null,
			beforeFinish: null,
			finish: null,
			beforeCancel: null,
			cancel: null
		},
		
		_getDialogOption: function(addopt) {
			var dialog ={};
			for (var opt in this._dialogOptions){
				//set dialog option
				if(typeof this.options[opt] !== 'undefined'){
					//TODO wrap callbacks
					dialog[opt] = this.options[opt];
				
				//set additional option
				} else if(addopt && typeof addopt[opt]  !== 'undefined'){
					dialog[opt] = addopt[opt];
				
				//get dialog default option
				} else {
					dialog[opt] = this._dialogOptions[opt];
				}
			}
			
			//add buttons
			dialog.buttons = (function(that){
				 return [{ label: "prev", text: that.options.prevLabel, click: function() { that.prev(); } },
				         { label: "next", text: that.options.nextLabel, click: function() { that.next(); } },
				         { label: "finish", text: that.options.finishLabel, click: function() { that.finish(); } },
				         { label: "cancel", text: that.options.cancelLabel, click: function() { that.cancel(); } }];
			}(this));
			return dialog;
		},
		
		_initTitle: function() {
			//user added title for dialog
			if(typeof this.options.title === "string"){
				
				title.push(this.options.title);
				
			//if no value or default value check title of element
			} else if(!this.options.title || !this.options.title.text){
				var elTitle = this.element.attr('title');
				
				//if title is null 
				if(!this.options.title){
					this.options.title = this._title;
				}
				
				if(elTitle){
					this.options.title.text = elTitle;
				} else {
					this.options.title.text = '';
				}
			}
		},
		
		_getTitle: function(stepTitle) {
			
			var title = [];
			
			//start create title
			title.push(this.options.title.text);
			
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
			//TODO road
			var that = this;
			this._initTitle();
			
			//save existing style
			this._cacheStyle.dialog = this.element.attr("style");
			
			//create dialog
			this.element.dialog(this._getDialogOption());
			
			//init button map
			this._initButtons();
			
			//mark steps
			//TODO move to _createSteps and _createStep
			this.element.children().each(function(n){
				var el = $(this);
				//var id = css.STEP_N + n;
				that._cacheStyle[n] = el.attr("style");
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
			this.reset();
			if ( this.options.autoOpen ) {
				this.open();
			}
		},
		
		_initButtons: function(){
			var dialog = this.element.parent();
			if(!this.button.prev){
				this.button.prev = $('button[label="prev"]', dialog);
			}
			if(!this.button.next){
				this.button.next = $('button[label="next"]', dialog);
			}
			if(!this.button.finish){
				this.button.finish = $('button[label="finish"]', dialog);
			}
			if(!this.button.cancel){
				this.button.cancel = $('button[label="cancel"]', dialog);
			}
		},
		
		_destroy: function() {
			var that = this;
			this.element.dialog("destroy");
			this.element.children("." + css.STEP)
				.removeClass(css.STEP)
				.removeClass(css.STEP_CURRENT)
				.removeClass(css.STEP_FIRST)
				.removeClass(css.STEP_LAST)
				.each(function(n){
					$(this).attr("style", that._cacheStyle[n]||'');
				});
			this.element.attr("style", that._cacheStyle.dialog||'');
		},
		
		disable: $.noop,
		enable: $.noop,
		
		isOpen: function() {
			return this._isOpen;
		},
		
		open: function() {
			this._isOpen = true;
			$( this.element ).dialog( "open" );
			//this._trigger('open');
		},
		
		close: function() {
			this._isOpen = false;
			$( this.element ).dialog( "close" );
			
		},
		
		prev: function() {
			
			if(this._trigger('beforePrev') !== false){
				var cur = this.element.children("." + css.STEP_CURRENT);
				var prev = null;
				//if step is not first one
				if(!cur.is("." + css.STEP_FIRST)){
					//hide current and go to the previous
					prev = cur.removeClass(css.STEP_CURRENT).hide().prev("." + css.STEP).addClass(css.STEP_CURRENT).show();
					
					//set step title
					this._setOption('title', prev.attr('title') || "");
					
					//disable if first step
					if(prev && prev.is("." + css.STEP_FIRST)){
						this.button.prev.button( "disable" );
					}
					
					//disable finish, only last step have it, for now
					this.button.finish.button( "disable" );
					
					//enable next
					if(this.button.next.button( "option", "disabled" )){
						this.button.next.button( "enable" );
					}
				}
			
				this._trigger('afterPrev');
			}
		},
		
		button : {
			prev : null,
			next : null,
			finish : null,
			cancel : null
		},
		
		next: function() {
			
			if(this._trigger('beforeNext') !== false){
				var cur = this.element.children("." + css.STEP_CURRENT);
				var next = null;
				//if step is not last one
				if(!cur.is("." + css.STEP_LAST)){
					//hide current and go to the next
					next = cur.removeClass(css.STEP_CURRENT).hide().next("." + css.STEP).addClass(css.STEP_CURRENT).show();
					
					//set step title
					this._setOption('title', next.attr('title') || "");
					
					//disable next
					if(next && next.is("." + css.STEP_LAST)) {
						this.button.next.button( "disable" );
						
						//and enable finish
						if(this.button.finish.button( "option", "disabled" )){
							this.button.finish.button( "enable" );
						}
					}
					
					//enable prev
					if(this.button.prev.button( "option", "disabled" )){
						this.button.prev.button( "enable" );
					}
					
					this._trigger('afterNext');
				}
			}
		},
		
		reset: function() {
			this.element.children("." + css.STEP).hide().removeClass(css.STEP_CURRENT);
			
			//show first step
			//mark it
			//set title
			this._setTitle(this.element.find("." + css.STEP_FIRST).show().addClass(css.STEP_CURRENT).attr('title'));
			//disable prev button
			this.button.prev.button( "disable" );
			
			//remove focus
			$(':button', this.element.parent()).blur();
			
			//disable finish, only last step have it, for now
			this.button.finish.button( "disable" );
		},
		
		finish: function(){
			if(this._trigger('beforeFinish') !== false){
				//disable all buttons
				$.each(this.button, function(){
					//this is button
					this.button( "disable" );
				});
				
				//TODO final step 
				//if the finish callback return false keep dialog on last step
				if(this._trigger('finish') !== false){
					this.close();
				} else if(this.button.cancel){
					this.button.cancel.button( "enable" );
				} 
			}
		},
		
		cancel: function(){
			if(this._trigger('beforeCancel') !== false){
				this.close();
				this._trigger('cancel');
			}
		},
		
		_setOption: function(key, value){
			switch ( key ) {
			case "title":
				this._setTitle(value || '');
				break;
			}
		},
		
		_setOptions: function(options){
			var that = this;
			$.each( options, function( key, value ) {
				that._setOption( key, value );
			});
		}
	};
	
	$.widget( "yy.wizard",wizard);
}(jQuery));