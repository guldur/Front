/*
 *	! Copyright (c) 2013 Yuriy Yurch (http://github.com/yurch)
 */

;(function(){
	/*
	 * options
	 */
	var defOptions = {
			enable: false,
			keep: false //TODO #future
	};
	
	var _checks = {
			console : !!window.console,
			log : !!window.console && !!window.console.log,
			error : !!window.console && !!window.console.error,
			info : !!window.console && !!window.console.info,
			debug : !!window.console && !!window.console.debug
	};
	
	var _settings = {
			_names: ["mc", "mconsole"]
	};
	
	/*
	 * methods
	 */
	
	function _do (method, args){
		if(_settings.enable){
			if(_checks[method]){
				if(console[method].apply){
					console[method].apply(console, args);
				} else {
					//IE
					helpie(method, args);
					
				}
			}
		}
		return this;
	}
	
	function helpie(method, args){
		var sb = [];
		for(var i = args.length; i--;){
			sb.push(getSource(args[i]));
		}
		console[method](sb.join(", "));
	}
	
	function getSource(o){
		if(typeof o === "string"){
			return '"' + o + '"';
		} else if(typeof o === "object"){
			var r = [];
			for(var p in o){
				try{
					r.push(p + ":" + o[p]); //flat
				} catch (e) {
					r.push(p + ': Error - "' + e + '"');
				}
			}
			return '{' + r.join(', \n') + '}';
		} else if(typeof o === "function"){
			return o.toString().replace(/\n/g, '');
		} else {
			return o + "";
		}
		//typeof o === "function" return o.toString(); 
	}
	
	function _setPublic(win, nameArr, inst){
		var _nameArr = nameArr instanceof Array ? nameArr : typeof nameArr === "object" ? [nameArr] : [];
		
		for(var i = _nameArr.length; i--;){
			var name = _nameArr[i];
			if(!win[name]){
				win[name] = inst;
			}
		}
	}
	
	/**
	 * set to settings all fields of all objects in the arguments
	 * each next object override  the same field of previous
	 * @param def {Object}
	 * @param opts {Object}
	 */
	function _set(def, opts){
		for(var i = arguments.length; i--;){
			var obj = arguments[i];
			if(typeof obj === "object"){
				for(var optName in obj){
					_settings[optName] = obj[optName];
				}
			}
		}
		
		return this;
	}
	
	/*
	 * define
	 */
	function _Mconsole(options){
		if(this instanceof _Mconsole){
			this.l = this.log = function(){return _do.call(this, "log", arguments);};
			this.i = this.info = function(){return _do.call(this, "info", arguments);};
			this.d = this.debug = function(){return _do.call(this, "debug", arguments);};
			this.e = this.error = function(){return _do.call(this, "error", arguments);};
			this.set = _set;
			this.on = function(){return this.set({enable: true});};
			this.off = function(){return this.set({enable: false});};
			this.set(defOptions, options);
		} else {
			if(arguments.length > 0){
				l.apply(this, arguments);
			}
			return mcInst;
		}
	}
	
	_setPublic(window, _settings._names, new _Mconsole());
	
	/*
	window.mc.l("mc ready to use!");
	throw new Error("mc namespace is taken!");
	window.mconsole.l("mconsole ready to use!");
	throw new Error("mconsole namespace is taken!");
	*/
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
