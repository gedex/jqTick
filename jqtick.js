(function($) {
    $.fn.ticker = function(options) {
        options = options || {};
        
        // default options
        var defaults = {
            childTarget: 'li',
            speed: 100, // speed of contents ticks
            stopOnHover: true, // set true if you want the ticker is stop
                               // when hover event on target occurs
            stopOnClik: false, // same as above, except for click event
        }
        
        // merge options with default
        var options = $.extend(defaults, options);
        
        var t = $(this);
        
        // properties of target
        var width = t.width();
        var height = t.height();
        var randID = Math.round(Math.random()*100000000);
        var padHeight = 1; // pad height that increments
        
        var pad = $('<div id="'+randID+'" style="width:'+width+'px; height:'+padHeight+'px"></div>');
        
        // prepend pad to target
        t.prepend(pad);
        
        var timer = startTimer();
        
        function startTimer() {
            var timer = setInterval(function() {
                if ( pad.height() < height ) {
                    pad.height( ++padHeight );
                } else {
                    padHeight = 1;
                    pad.height(padHeight);
                }
            },
            50
            );
            
            // bind event on pad if
            // options.stopOnHover is set
            if ( options.stopOnHover ) {
                pad.mouseover(function() {
                    stopTimer(timer);
                }).mouseout(function() {
                    startTimer();
                });
                
                t.mouseover(function() {
                    stopTimer(timer);
                }).mouseout(function() {
                    startTimer();
                });
            }
            
            return timer;
        }
        
        // function to stop timer
        function stopTimer(timerID) {
            clearInterval(timerID);
        }
    };
})(jQuery);