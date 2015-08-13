/*jslint browser: true*/
/*global $, jQuery*/
jQuery.noConflict();
jQuery(document).ready(function ($) {
  "use strict";

  /* Code from Tokimon on stackoverflow.com
   * http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
   *
   * Modified by Novem Designs/Dan Gronitz
   * jslinted the script
   */
  function checkVisible(elm, evalType) {
    evalType = evalType || "visible";
    var vpH = $(window).height(), // Viewport Height
      st = $(window).scrollTop(), // Scroll Top
      y = $(elm).offset().top,
      elementHeight = $(elm).height();
    
    if (evalType === "visible") { return ((y < (vpH + st)) && (y > (st - elementHeight))); }
    if (evalType === "above") { return ((y < (vpH + st))); }
  }

  // Check when the pages is 'scrolled' to see if the containers are visible on screen.
  $(window).scroll(function () {
    $('div.novem-counter-container span.novem-cc-value').each(function (index, value) {
      // Animates the counter - adds an 'animated' class to prevent the counter from counting with every scroll.
      if (checkVisible($(this)) && !$(this).hasClass('animated')) {
        $(this).addClass('animated');
        var foo = $(this).text();
        $(this).countUp({start: 0, last: foo, duration: 1000});
      }
      
      // Allows us to reanimate the counter once the container has left and re-entered the viewport.
      if (!checkVisible($(this)) && $(this).hasClass('animated')) {
        $(this).removeClass('animated');
      }
    });
  });
});


/**
 * jquery.countUp
 * @author hisayoshi hayashi: HYS INC.
 * @license MIT license
 *
 * @Modified by Novem Designs/Dan Gronitz
 *  jslinted the script
 */

(function ($) {
  "use strict";
  $.fn.countUp = function (options) {
    var start_num = Number($(this).text()),
      d = {start: 0, last: 100, duration: 1000, frame: 33, update: null, complete: null },
      o = $.extend(d, options),
      $that = $(this);

    o.last = parseInt(o.last, 10);
    o.duration = parseInt(o.duration, 10);
    o.frame = parseInt(o.frame, 10);

    $that.each(function (i) {
      var $t = $(this),
        total_frame = 0,
        split = (o.last - o.start) / (o.duration / 33),
        value = o.start,
        clear = setInterval(function () {
          value = Math.round(value + split);
          $t.text(value);
          
          if (typeof o.update === 'function') {
            o.update.call($t, value);
          }
          
          if (total_frame > o.duration) {
            clearInterval(clear);
            $t.text(o.last);
            
            if (typeof o.complete === 'function') {
              o.complete.call($t, value);
            }
          }
          total_frame += o.frame;
        }, o.frame);
    });
    return $that;
  };
}(jQuery));



