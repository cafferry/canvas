function Shape (copy,cobj,xp) {
	this.canvas=copy;
	this.canvasW=copy.offsetWidth;
	this.canvasH=copy.offsetHeight;
	// console.log(this.canvasW)
	console.log(xp.offsetWidth) 
	this.cobj=cobj;
	this.type="line";
	this.history=[];
	this.style="stroke"
	this.fillStyle="#000";
	this.strokeStyle="#000";
	this.jiaoNum=8;
	this.bianNum=6;
	this.flag=true;
	this.xp=xp;
	// this.xp.style.display="none";
	this.xpsize=10;
	this.isback=true;
	this.lineWidth=1;
}
Shape.prototype={
	init:function(){
		this.cobj.style=this.style;
		this.cobj.fillStyle=this.fillStyle;
		this.cobj.strokeStyle=this.strokeStyle;
		this.cobj.lineWidth=this.lineWidth;
		this.isback=true;
		this.xp.style.display="none";
	},
	draw:function(){
		var that=this
		this.canvas.onmousedown=function(e){
			that.init()
			var ox=e.offsetX
			var oy=e.offsetY
			if(that.type=="pencil"){
				console.log(2)
				that.cobj.beginPath()
				that.cobj.moveTo(ox,oy)
			}
			that.canvas.onmousemove=function(e){
				var movex=e.offsetX
				var movey=e.offsetY
				if(that.flag==true){
					console.log(1)
					that.cobj.clearRect(0,0,that.canvasW,that.canvasH)
					that.cobj.beginPath()
				}
				if(that.history.length!==0){
					that.cobj.putImageData(that.history[that.history.length-1],0,0)
				}
				that[that.type](ox,oy,movex,movey)
			}
			that.canvas.onmouseup=function(){
				that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH))
				that.canvas.onmousemove=null
				that.canvas.onmouseup=null
			}
		}
	},
	line:function(ox,oy,movex,movey){
		this.flag=true
		this.cobj.moveTo(ox,oy)
		this.cobj.lineTo(movex,movey)
		this.cobj.stroke()
	},
	rect:function(ox,oy,movex,movey){
		this.flag=true
		this.cobj.rect(ox,oy,movex-ox,movey-oy)
		this.cobj[this.style]()
	},
	circle:function(ox,oy,movex,movey){
		this.flag=true
		var r=Math.sqrt((movex-ox)*(movex-ox),(movey-oy)*(movey-oy))
		this.cobj.arc(ox,oy,r,0,2*Math.PI)
		this.cobj[this.style]()
	},
	pencil:function(ox,oy,movex,movey){
		this.flag=false
		this.cobj.lineTo(movex,movey)
		this.cobj.stroke()
	},
	triangle:function(ox,oy,movex,movey){
		this.flag=true
		this.cobj.moveTo(ox,oy)
		this.cobj.lineTo(ox,movey)
		this.cobj.lineTo(movex,movey)
		this.cobj.closePath()
		this.cobj.stroke()
	},
	polygon:function(ox,oy,movex,movey){
		this.flag=true
		var r=Math.sqrt((movex-ox)*(movex-ox),(movey-oy)*(movey-oy))
		var d=360/this.bianNum
		this.cobj.moveTo(ox+r,oy)
		for (var i = 1; i<this.bianNum; i++) {
				this.cobj.lineTo(ox+r*Math.cos(Math.PI/180*d*i),oy+r*Math.sin(Math.PI/180*d*i))
		};
		this.cobj.closePath()
		this.cobj[this.style]()
	},
	star:function(ox,oy,movex,movey){
		this.flag=true
		var r=Math.sqrt((movex-ox)*(movex-ox),(movey-oy)*(movey-oy))
		var n=5
		var d=360/n/2
		var a=4*Math.pow(Math.cos(Math.PI/180*d/2),2)-1
		var r1=a*r
		for (var i = 0; i<(n*2); i++) {
			if(i%2==0){
				this.cobj.lineTo(ox+r*Math.cos(Math.PI/180*d*i),oy+r*Math.sin(Math.PI/180*d*i))
			}else{
				this.cobj.lineTo(ox+r1*Math.cos(Math.PI/180*d*i),oy+r1*Math.sin(Math.PI/180*d*i))
			}	
		};
		this.cobj.closePath()
		this.cobj[this.style]()
	},
	polygon_star:function(ox,oy,movex,movey){
		this.flag=true
		var r=Math.sqrt((movex-ox)*(movex-ox),(movey-oy)*(movey-oy))
		var d=360/this.jiaoNum/2
		var a=4*Math.pow(Math.cos(Math.PI/180*d/2),2)-1
		var r1=a*r
		for (var i = 0; i<(this.jiaoNum*2); i++) {
			if(i%2==0){
				this.cobj.lineTo(ox+r*Math.cos(Math.PI/180*d*i),oy+r*Math.sin(Math.PI/180*d*i))
			}else{
				this.cobj.lineTo(ox+r1*Math.cos(Math.PI/180*d*i),oy+r1*Math.sin(Math.PI/180*d*i))
			}
		};
		this.cobj.closePath()
		this.cobj[this.style]()
	},
	clear:function(){
		var that=this
		this.canvas.onmousemove=function(e){
			// that.init()
			var ox=e.offsetX
			var oy=e.offsetY
			console.log(ox+"---"+oy)
			// that.xp.style.display="block"
			var left=ox-that.xpsize/2
			var top=oy-that.xpsize/2
			// console.log(left+"---"+top)
			that.xp.style.left=left+"px"
			that.xp.style.top=top+"px"
			if(left<0){
				left=0;
			}
			if(left>that.canvasW-that.xpsize){
				left=that.canvasW-that.xpsize
			}
			if(top<0){
				top=0;
			}
			if(top>that.canvasH-that.xpsize){
				top=that.canvasH-that.xpsize
			}
			that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";
		}

		that.canvas.onmousedown=function(){

			that.canvas.onmousemove=function(e){
				var movex= e.offsetX;
				var movey= e.offsetY;
				var left=movex-that.xpsize/2;
				var top=movey-that.xpsize/2;
				if(left<0){
					left=0;
				}
				if(left>that.canvasW-that.xpsize){
					left=that.canvasW-that.xpsize
				}
				if(top<0){
					top=0;
				}
				if(top>that.canvasH-that.xpsize){
					top=that.canvasH-that.xpsize
				}
				that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";

				that.cobj.clearRect(left,top,that.xpsize,that.xpsize);
			}

			that.canvas.onmouseup=function(){
				that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
				that.canvas.onmousemove=null;
				that.canvas.onmouseup=null;
				that.clear();
			}

		}

	}
}
