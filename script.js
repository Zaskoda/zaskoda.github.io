 $(document).ready( function() {

    width = 800;
    height = 400;
    $vecdemo = $('canvas#vecdemo');
    $vecdemo.attr('height', height).attr('width', width);
    $ex = $('#example');
    vecCenter = {x: width/2,y: height/2};

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
            $vecdemo.drawEllipse({
                fillStyle: this.radial,
                x: this.x, 
                y: this.y,
                width: this.radius,
                height: this.radius
            });

            $vecdemo.drawEllipse({
                fillStyle: 'rgba(0, 0, 64, 0.25)',
                x: this.x+this.radius/8, 
                y: this.y+this.radius/8,
                width: this.radius/3,
                height: this.radius/3
            });

            $vecdemo.drawEllipse({
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
            blobs[i].moveTo((blobs[i].theta +0.01)%360,100-(i/2),Math.sin((blobs[i].theta + i/10))*20 %100);
        }
        $vecdemo.clearCanvas();
        for (var i = 0, len = blobs.length; i < len; i++) {
            blobs[i].render();
        }
        $ex.html(blobs[0].theta+' '+blobs[0].x+' '+blobs[0].y+' '+blobs[0].radius);
    }

    var blobs = [];
    for (i = 0; i<100; i++) {
        blobs.push(new Vectorblog($vecdemo));
        blobs[i].moveTo(i*5,100,i);
    }
    loop = setInterval(function(){doLoop()}, 20);




});
