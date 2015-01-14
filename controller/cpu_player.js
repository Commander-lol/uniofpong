/*jslint nomen: true, plusplus: true */
/*global console */

(function(){
    'use strict';
    var PongCPU = function (batname) {
            var _t = this, step; //Scoping reasons
            this.batname = batname;
            this.bat = document.getElementById(batname);
            this.ballpath = [];
            this.targetY = 350;
            this.speed = 20;

            step = function () {
                var ball, blx, bly,
                    bty, dir, tsp,
                    i, ipos,
                    prX, crX, prY, crY;

                bty = parseInt(_t.bat.getAttribute("y"), 10);

                if(_t.ballpath.length >= 5) {
                    _t.ballpath.shift();
                }
                ball = document.getElementById("ball");
                blx = parseInt(ball.getAttribute("x"), 10);
                bly = parseInt(ball.getAttribute("y"), 10);

                _t.ballpath.push({x:blx, y:bly});

                /* TODO: Implement prediction and stuff here

                i = _t.ballpath.length;
                ipos = null;
                while (i--) {
                    if(ipos === null) {

                    }
                }

                DELETE NEXT LINE WHEN PREDICTION IS IMPLEMENTED */
                _t.targetY = bly - (parseInt(_t.bat.getAttribute("height"), 10) / 2);

                dir = bty < _t.targetY ? -1 : 1;
                dir = bty === _t.targetY ? 0 : dir;
                tsp = dir === -1 ?
                    bty + (_t.speed * dir) < _t.targetY ?
                        bty - _t.targetY :
                        _t.speed :
                    bty + (_t.speed * dir) > _t.targetY ?
                        _t.targetY - bty :
                        _t.speed;

                _t.bat.setAttribute("y", Math.max(0,Math.min(700, bty + (tsp * dir))));


            };
            document.addEventListener("pingpongstep", step);
        },
        initOpponent = function (batname) {
            window.pongspace = window.pongspace || {};
            window.pongspace[batname] = new PongCPU(batname);
        };

        window.uoplccpu = initOpponent;
}());
