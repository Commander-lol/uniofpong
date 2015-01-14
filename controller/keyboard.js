(function() {
    'use strict';
    var alias = {
            up: 38,
            down: 40,
            w: 87,
            s: 83
        },
        keyStatus = {
            leftUp: false,
            leftDown: false,
            rightUp: false,
            rightDown: false
        },
        actions = {},
        batSpeed = 10,
        doBatAction = function(bat, dir) {
            var newY = parseInt(bat.getAttribute("y"), 10) + (batSpeed * dir);
            bat.setAttribute("y", Math.max(0,Math.min(700, newY)));
        },
        onKeyDown = function(e) {
            e.preventDefault();
            if (actions.hasOwnProperty(e.keyCode)) {
                keyStatus[actions[e.keyCode]] = true;
            }
        },
        onKeyUp = function(e) {
            e.preventDefault();
            if (actions.hasOwnProperty(e.keyCode)) {
                keyStatus[actions[e.keyCode]] = false;
            }
        },
        step = function() {
            var velL = 0,
                velR = 0;

            velL += keyStatus.leftUp ? -1 : 0;
            velL += keyStatus.leftDown ? 1 : 0;

            velR += keyStatus.rightUp ? -1 : 0;
            velR += keyStatus.rightDown ? 1 : 0;

            doBatAction(document.getElementById("lbat"), velL);
            doBatAction(document.getElementById("rbat"), velR);
        };

    actions[alias.w] = "leftUp";
    actions[alias.s] = "leftDown";
    actions[alias.up] = "rightUp";
    actions[alias.down] = "rightDown";

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('pingpongstep', step);
}());
