 $(document).ready( function() {

    width = $('div#vecdemo').width();
    height = $('div#vecdemo').height();
    $vCanvas0 = $('canvas#v0');
    $vCanvas1 = $('canvas#v1');

    $vCanvas0.attr('height', height).attr('width', width).css('position', 'absolute');
    $vCanvas1.attr('height', height).attr('width', width).css('position', 'absolute');
    $currentCanvas = $vCanvas0;

    vecCenter = {x: width*0.5,y: height*0.35, reflectionPoint: height*0.35};

    function swapCanvases(){
      if(vCanvas0.style.visibility=='visible'){
        vCanvas0.style.visibility='hidden';
        vCanvas1.style.visibility='visible';
        currentCanvas  = vCanvas0;
      }else{
        vCanvas0.style.visibility='visible';
        vCanvas1.style.visibility='hidden';
        currentCanvas  = vCanvas1;
      }
    }

    Vectorblog = function(canvas) {
        this.theta = 0;
        this.x = 0;
        this.y = 0;
        this.radius = 8;
        this.radial = {};

        this.moveTo = function(theta,r,z) {
            this.theta = theta;
            this.x = parseInt(vecCenter.x + r*Math.cos(theta) * 3.2);
            this.y = parseInt(vecCenter.y - r*Math.sin(theta)) + z;
            this.radius = ((this.y / height)*20) + 10;
            this.radial = 'rgba(128, 128, 255, '+(0.25+(this.y / height)*0.5)+')';
        }

        this.render = function() {

            $currentCanvas.drawEllipse({
                fillStyle: 'rgba(128, 128, 255, 0.05)',
                x: this.x, 
                y: vecCenter.reflectionPoint - (this.y*-1),
                width: this.radius,
                height: this.radius
            });

            $currentCanvas.drawEllipse({
                fillStyle: this.radial,
                x: this.x, 
                y: this.y,
                width: this.radius,
                height: this.radius
            });

            $currentCanvas.drawEllipse({
                fillStyle: 'rgba(0, 0, 64, 0.25)',
                x: this.x+this.radius/8, 
                y: this.y+this.radius/8,
                width: this.radius/3,
                height: this.radius/3
            });

            $currentCanvas.drawEllipse({
                fillStyle: 'rgba(255, 255, 255, 0.75)',
                x: this.x-this.radius/8, 
                y: this.y-this.radius/8,
                width: this.radius/10,
                height: this.radius/10
            });

        }        
    }

    doLoop = function() {
        for (var i = 0, len = blobs.length; i < len; i++) {
            blobs[i].moveTo((blobs[i].theta + 0.01)%360,100-(i/100),(Math.sin(blobs[i].theta*i/8 + i))*50%60);
        }
        $currentCanvas.clearCanvas();
        for (var i = 0, len = blobs.length; i < len; i++) {
            blobs[i].render();
        }
        swapCanvases();
    }

    var blobs = [];
    for (i = 0; i<50; i++) {
        blobs.push(new Vectorblog($currentCanvas));
        blobs[i].moveTo(i/2,i*10,(i * 100) % 30);
    }
    loop = setInterval(function(){doLoop()}, 15);



    


});
