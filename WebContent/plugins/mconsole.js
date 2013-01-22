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


function _mconsole(){
	  this.on=null;
	  this.enable=false;
	  this.iecons=[];
	  this.ietimer={};
	  this.is={};
	  this.isEnable=function(){
		  return !!this.enable;
	  };
	  this.log=function(a){
		  if(this.isEnable()){
		    if(this.is.console&&this.is.log){
		      my_console_log(a);
		    }else{
		      this.iecons.push(a);
		    }
		  }
	  };
	  this.time=function(a){
	    if(this.is.console&&this.is.time){
	      console.time(a);
	    }else{
	      this.ietimer[a]=(new Date).getTime();
	    }
	  };
	  this.timeEnd=function(a){
	    if(this.is.console&&this.is.timeEnd){
	      console.timeEnd(a);
	    }else{
	      this.log(a+": "+((new Date).getTime()-this.ietimer[a])+"ms");
	    }
	  };
	  this.debug = function(a){
		  if(this.is.console&&this.is.debug){
		      console.debug(a);
		    }else{
		      //
		    }
	  },
	  this.print=function(){
	    return this.iecons.join("\n----\n");
	  };
	  this.printC=function(){
	    this.print;
	    this.iecons=[];
	  };
	  this.getUrlParam=function(){
	    return "mconsole";
	  };
	  this._checkSwitch=function(){
	    this.on=true;
	  };
	  this._initF=function(){
	    this._checkSwitch();
	    this.is.console = typeof console!='undefined';
	    if(this.is.console){
	      this.is.log = typeof my_console_log!='undefined';
	      this.is.time = typeof console.time!='undefined';
	      this.is.timeEnd = typeof console.timeEnd!='undefined';
	      this.is.debug = typeof console.debug!='undefined';
	    }else{
	      this.is.log = false;
	      this.is.time = false;
	      this.is.timeEnd = false;
	      this.is.debug = false;
	    }
	    return true;
	  };
	  this._init=this._initF();
	  this.toString=function(){return "mconsole";};
	  
	  this.D=this.debug;
	  this.L=this.log;
	}