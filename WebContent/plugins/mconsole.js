/*
 *	! Copyright (c) 2013 Yuriy Yurch (http://github.com/yurch)
 */

;(function(){
	/*
	 * options
	 */
	var defOptions = {
			enable: true,
			keep: true
	};
	
	var _checks = {
			isConsole : !!window.console,
			isLog : !!window.console && !!window.console.log,
			isError : !!window.console && !!window.console.error,
			isInfo : !!window.console && !!window.console.info,
			isDebug : !!window.console && !!window.console.debug
	};
	
	var _settings = {};
	
	/*
	 * methods
	 */
	function _log(){
		if(_settings.enable && _checks.isLog){
			console.log.apply(console, arguments);
			return mcInst;
		}
	}
	
	function _set(options){
		if(typeof options === "object"){
			for(var optName in options){
				_settings[optName] = options[optName];
			}
		}
		return mcInst;
	}
	
	/*
	 * define
	 */
	function _Mconsole(options){
		if(this instanceof _Mconsole){
			_set(defOptions);
			
			this.l = this.log = _log;
			this.set = _set;
			
		} else {
			if(typeof prop === "object"){
				mcInst.set(options);
			}
			if(arguments.length > 0){
				l.apply(this, arguments);
			}
			return mcInst;
		}
	}
	
	var mcInst = new _Mconsole();
	
	if(!window.mconsole){
		window.mconsole = mcInst;
		window.mconsole.l("mconsole ready to use!");
	} else {
		throw new Error("mconsole namespace is taken!");
	}
	
	if(!window.mc){
		window.mc = window.mconsole;
		window.mc.l("mc ready to use!");
	} else {
		throw new Error("mc namespace is taken!");
	}
})();