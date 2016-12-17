/**
 * Created by Zowie on 12/17/2016.
 */
var zoomvar = 1;

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

            //hoverboard stroke en hoverboard base
            var $hoverboard_stroke = $('#hoverboard-stroke');
            var $hoverboard_base = $('#hoverboard-base');

            //variabelen voor rotate buttons
            var rotate_right = document.getElementById('rotateRight');
            var rotate_left = document.getElementById('rotateLeft');
            var $rotAnBoard = $('#hoverboard');

            //zoombuttons
            var zoomIn = document.getElementById('zoomInButton');
            var zoomOut = document.getElementById('zoomOutButton');

            //zoom variabelen aanmaken
            var zoommin = .1;
            var zoomplus = -.1;

            hoverboardManager.functions.addStroke(color_none, $hoverboard_stroke, '#hoverboard-stroke-none-obj', '#hoverboard-stroke-none-obj');
            hoverboardManager.functions.addStroke(color_blue, $hoverboard_stroke, '#hoverboard-stroke-blue-obj', '#hoverboard-stroke-blue-mtl');
            hoverboardManager.functions.addStroke(color_red, $hoverboard_stroke, '#hoverboard-stroke-red-obj', '#hoverboard-stroke-red-mtl');

            //aanroepen zoomfunctie
            hoverboardManager.functions.zoom(zoomIn, $hoverboard_stroke, $hoverboard_base, zoommin);
            hoverboardManager.functions.zoom(zoomOut, $hoverboard_stroke, $hoverboard_base, zoomplus);

            // aanroepen rotation functies
            hoverboardManager.functions.rotationRight(rotate_right, $rotAnBoard);
            hoverboardManager.functions.rotationLeft(rotate_left, $rotAnBoard);

            for (i = 1; i < 9; i++) {
                var color = document.getElementById("skybox-color" + i);
                color.addEventListener('mouseenter', function () {
                    var colorCode = $(this).attr('material')['color'];
                    $('#sky').attr('color', colorCode);
                })
            }

            hoverboardManager.functions.getHoverboardImage("hoverboard");
        },

        addStroke: function (id, selector, obj, mtl) {
            id.addEventListener('mouseenter', function () {
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

        rotationRight: function (id, boardAn) {
            id.addEventListener('mouseenter', function(){
                $(boardAn).append('<a-animation id="rotateAnimationBoard" attribute="rotation" dur="5000" repeat="0" easing="ease-in-out"  from="0 0 0" to="0 180 0" direction="reverse"></a-animation>');
            });
        },

        rotationLeft: function (id, boardAn) {
            id.addEventListener('mouseenter', function(){
                $(boardAn).append('<a-animation id="rotateAnimationBoard" attribute="rotation" dur="5000" repeat="0" easing="ease-in-out"  from="0 0 0" to="0 180 0" direction=""></a-animation>');
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
        }

    }
};

$(document).ready(function () {
    hoverboardManager.init();
});