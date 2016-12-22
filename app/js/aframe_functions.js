/**
 * Created by Zowie on 12/17/2016.
 */
var zoomvar = 1;

var hover_button = new Audio('../sounds/hover_sound.mp3');
var succes_sound = new Audio('../sounds/succes_sound.mp3');

var hoverboardManager = {
    init: function () {
        hoverboardManager.setListeners();

    },

    setListeners: function () {
        hoverboardManager.functions.main_functions();
    },

    functions: {
        main_functions: function () {

            //hoverboard stroke colors
            var color_none = document.getElementById('color-none');
            var color_blue = document.getElementById('color-blue');
            var color_red = document.getElementById('color-red');
            var color_green = document.getElementById('color-green');
            var color_purple = document.getElementById('color-purple');
            var color_black = document.getElementById('color-black');

            //hoverboard stroke en hoverboard base
            var $hoverboard_stroke = $('#hoverboard-stroke');
            var $hoverboard_base = $('#hoverboard-base');

            //variabelen voor rotate buttons
            var rotate_right = document.getElementById('rotateRight');
            var rotate_left = document.getElementById('rotateLeft');
            var $rotAnBoard = $('#hoverboard');

            //colorpicker
            var color_opener_stroke = document.getElementById('color-stroke-button');
            var color_closer_stroke = document.getElementById('color-stroke-button-close');

            //zoombuttons
            var zoomIn = document.getElementById('zoomInButton');
            var zoomOut = document.getElementById('zoomOutButton');

            //zoom variabelen aanmaken
            var zoommin = .1;
            var zoomplus = -.1;


            hoverboardManager.functions.addStroke(color_none, $hoverboard_stroke, '#hoverboard-stroke-none-obj', '#hoverboard-stroke-none-mtl');
            hoverboardManager.functions.addStroke(color_blue, $hoverboard_stroke, '#hoverboard-stroke-blue-obj', '#hoverboard-stroke-blue-mtl');
            hoverboardManager.functions.addStroke(color_red, $hoverboard_stroke, '#hoverboard-stroke-red-obj', '#hoverboard-stroke-red-mtl');
            hoverboardManager.functions.addStroke(color_green, $hoverboard_stroke, '#hoverboard-stroke-green-obj', '#hoverboard-stroke-green-mtl');
            hoverboardManager.functions.addStroke(color_purple, $hoverboard_stroke, '#hoverboard-stroke-purple-obj', '#hoverboard-stroke-purple-mtl');
            hoverboardManager.functions.addStroke(color_black, $hoverboard_stroke, '#hoverboard-stroke-black-obj', '#hoverboard-stroke-black-mtl');

            //aanroepen zoomfunctie
            hoverboardManager.functions.zoom(zoomIn, $hoverboard_stroke, $hoverboard_base, zoommin);
            hoverboardManager.functions.zoom(zoomOut, $hoverboard_stroke, $hoverboard_base, zoomplus);

            // aanroepen rotation functies
            hoverboardManager.functions.rotationBoard(rotate_left, $rotAnBoard, true);
            hoverboardManager.functions.rotationBoard(rotate_right, $rotAnBoard, false);

            //aanroepen color opener functies
            hoverboardManager.functions.togglePanel(color_opener_stroke, "#color-picker", true);
            hoverboardManager.functions.togglePanel(color_closer_stroke, "#color-picker", false);

            for (i = 1; i < 9; i++) {
                var color = document.getElementById("skybox-color" + i);
                color.addEventListener('mouseenter', function () {
                    var colorCode = $(this).attr('material')['color'];
                    $('#sky').attr('color', colorCode);
                })
            }

            hoverboardManager.functions.getHoverboardImage("hoverboard");
        },

        togglePanel: function (id, visibleId, bool) {
            id.addEventListener('mouseenter', function () {
                hover_button.play();
                $(visibleId).attr('visible', bool);
            });
        },

        addStroke: function (id, selector, obj, mtl) {
            id.addEventListener('mouseenter', function () {
                succes_sound.play();
                selector.attr('obj-model', 'obj :' + obj + '; mtl: ' + mtl);
            });
        },

        zoom: function (id, stroke, base_hov, zoomAdd) {
            id.addEventListener('mouseenter', function () {
                hoverboardManager.functions.controlZoom(zoomAdd, stroke, base_hov);
            });
        },

        controlZoom: function (zoomAdd, stroke, base_hov) {
            zoomvar += zoomAdd;
            stroke.attr('scale', zoomvar, zoomvar, zoomvar);
            base_hov.attr('scale', zoomvar, zoomvar, zoomvar);
            console.log(zoomvar)
        },

        rotationBoard: function (id, boardAn, bool) {
            id.addEventListener('mouseenter', function () {
                if(bool){
                    $(boardAn).append('<a-animation id="rotateAnimationBoard" attribute="rotation" dur="5000" repeat="0" easing="ease-in-out"  from="0 0 0" to="0 180 0" direction="reverse"></a-animation>');
                } else {
                    $(boardAn).append('<a-animation id="rotateAnimationBoard" attribute="rotation" dur="5000" repeat="0" easing="ease-in-out"  from="0 0 0" to="0 180 0" direction=""></a-animation>');
                }
                setTimeout(function () {
                    $('#rotateAnimationBoard').remove();
                }, 5000);
            });
        },

        getHoverboardImage: function (tag) {
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=dc6zaTOxFJmzC",
                method: "GET", // or GET
                dataType: "json",
                success: function (msg) {
                    var randomItem1 = msg.data[Math.random() * msg.data.length | 0];
                    var randomItem2 = msg.data[Math.random() * msg.data.length | 0];
                    var randomItem3 = msg.data[Math.random() * msg.data.length | 0];

                    var video1 = randomItem1.images.fixed_width.mp4;
                    var video2 = randomItem2.images.fixed_width.mp4;
                    var video3 = randomItem3.images.fixed_width.mp4;

                    $('#hoverboard-picture-1').attr('material', 'src :' + video1);
                    $('#hoverboard-picture-2').attr('material', 'src :' + video2);
                    $('#hoverboard-picture-3').attr('material', 'src :' + video3);
                }
            });
        },

    }
};

$(document).ready(function () {
    hoverboardManager.init();
});