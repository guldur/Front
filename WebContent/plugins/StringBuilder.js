function StringBilder(){
	this.st = [];
	this.append = function(s){
		if(typeof s === "string" ){
			this.st.push(s);
		}
		return this;
	};
	
	this.toString(separator){
		if(typeof s !== "string"){
			separator = ' ';
		}
		return this.st.join(separator);
	};
};
