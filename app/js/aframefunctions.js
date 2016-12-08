/**
 * Created by Zowie on 12/6/2016.
 */
$(document).ready(function () {
//hoverboard stroke colors
    var color_none = document.getElementById('color-none');
    var color_blue = document.getElementById('color-blue');
    var color_red = document.getElementById('color-red');

//hoverboard stroke en hoverboard base
    var $hoverboard_stroke = $('#hoverboard-stroke');
    var $hoverboard_base = $('#hoverboard-base');

//zoombuttons
    var zoomIn = document.getElementById('zoomInButton');
    var zoomOut = document.getElementById('zoomOutButton');

//zoom variabelen aanmaken
    var zoomvar = 1;
    var zoommin = .1;
    var zoomplus = -.1

//aanroepen functie om kleur aan te passen
    addStroke(color_none, $hoverboard_stroke, '#hoverboard-stroke-none-obj', '#hoverboard-stroke-none-obj');
    addStroke(color_blue, $hoverboard_stroke, '#hoverboard-stroke-blue-obj', '#hoverboard-stroke-blue-mtl');
    addStroke(color_red, $hoverboard_stroke, '#hoverboard-stroke-red-obj', '#hoverboard-stroke-red-mtl');

// functie voor texture toevoegen op mouseenter
    function addStroke(id, selector, obj, mtl) {
        id.addEventListener('mouseenter', function () {
            selector.attr('obj-model', 'obj :' + obj + '; mtl: ' + mtl + '');
        });
    }

//aanroepen zoomfunctie
    zoom(zoomIn, $hoverboard_stroke, $hoverboard_base, zoomvar, zoommin);
    zoom(zoomOut, $hoverboard_stroke, $hoverboard_base, zoomvar, zoomplus);

//zoom functie aanmaken

    function zoom(id, stroke, base, zoomvar, zoomAdd) {
        id.addEventListener('mouseenter', function () {
            zoomvar = zoomvar + zoomAdd;
            stroke.attr('scale', zoomvar, zoomvar, zoomvar);
            base.attr('scale', zoomvar, zoomvar, zoomvar);

        });
    }

    for(i = 1; i < 9; i++){
        var color = document.getElementById("skybox-color" + i);
        color.addEventListener('mouseenter', function () {
            var colorCode = $(this).attr('material')['color'];
            $('#sky').attr('color', colorCode);
        })
    }

});

