<?php
/*
Plugin Name: Novem Counter
Plugin URI:  http://www.novemwebdesign.com/circle-counter-plugin
Description: Simple shortcode enabled circle counter.
Version:     0.1.0
Author:      Novem Designs, LLC/Dan Gronitz
Author URI:  http://www.novemwebdesign.com/
License:     MIT
License URI: http://opensource.org/licenses/MIT
Text Domain: novem-circle-counter

The MIT License (MIT)

Copyright (c) 2015 Novem Designs, LLC and Dan Gronitz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Prevent file being called directly.
defined( 'ABSPATH' ) or die( 'It was a bright cold day in April, and the clocks were striking thirteen.' );

// Enqueue our counter script
function novem_enqueue_script() {
  wp_enqueue_script( 'novem-counter', plugins_url( 'jquery.countUp.min.js', __FILE__ ), array( 'jquery' ));
}
add_action( 'wp_enqueue_scripts', 'novem_enqueue_script' );

// Build our shortcode in the style of
//   [novem-counter value="{num}" text="{text}"]
//
// This will output:
//      <div class="novem-counter-container">
//        <span class="novem-cc-value">{num}</span>
//        <span class="novem-cc-text">{text}</span>
//      </div>
function novem_circle_counter_shortcode( $atts ){
  $at = shortcode_atts( array(
    'value' => 100,
    'text' => "Counter Text",
  ), $atts );
  
  return '<div class="novem-counter-container"><span class="novem-cc-value">' . $at['value'] . '</span><span class="novem-cc-text">' . $at['text'] . '</span></div>';
    
}
add_shortcode( 'novem-counter', novem_circle_counter_shortcode );