/*
 *	! Copyright (c) 2013 Yuriy Yurch (http://github.com/yurch)
 */

(function($) {
  $.widget('yy.timelist', {
	  _create: function(){
		mc.l("_create", arguments);
		mc.l(this.options);
	  },
	  _destroy: function(){
		mc.l("_destroy", arguments);  
	  },
	  /*
	  _getCreateEventData: function(){},
	  */
	  _getCreateOptions: function(){
		return {from: "10:15", time: "13:40"}; //default options
	  },
	  _init: function(){
		mc.l("_init", arguments);  
	  },
	  _setOptions: function(){
		mc.l("_setOptions", arguments);
	  },
	  _setOption: function(){
		mc.l("_setOption", arguments);
	  },
	  _on: function(){
		mc.l("_on", arguments);
	  },
	  _off: function(){
		mc.l("_off", arguments);
	  },
	  _super: function(){
		mc.l("_super", arguments);
	  },
	  _superApply: function(){
		mc.l("_superApply", arguments);
	  },
	  _delay: function(){
		mc.l("_delay", arguments);
	  },
	  _hoverable: function(){
		mc.l("_hoverable", arguments);
	  },
	  _focusable: function(){
		mc.l("_focusable", arguments);
	  },
	  _trigger: function(){
		mc.l("_trigger", arguments);
	  },
	  _show: function(){
		mc.l("_show", arguments);
	  },
	  _hide: function(){
		mc.l("_hide", arguments);
	  }
  });
}(jQuery));