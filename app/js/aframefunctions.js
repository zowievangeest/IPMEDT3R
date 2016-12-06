/**
 * Created by Zowie on 12/6/2016.
 */
$(document).ready(function () {

var color_none = document.getElementById('color-none');
var color_blue = document.getElementById('color-blue');
var color_red = document.getElementById('color-red');

var $hoverboard_stroke = $('#hoverboard-stroke');

addStroke(color_none, $hoverboard_stroke, '#hoverboard-stroke-none-obj', '#hoverboard-stroke-none-obj');
addStroke(color_blue, $hoverboard_stroke, '#hoverboard-stroke-blue-obj', '#hoverboard-stroke-blue-mtl');
addStroke(color_red, $hoverboard_stroke, '#hoverboard-stroke-red-obj', '#hoverboard-stroke-red-mtl');

// functie voor texture toevoegen op mouseenter
function addStroke(id, selector, obj, mtl ) {
    id.addEventListener('mouseenter', function () {
        selector.attr('obj-model', 'obj :' + obj + '; mtl: ' + mtl + '');
    });
}

});