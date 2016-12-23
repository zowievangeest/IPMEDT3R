/**
 * Created by Zowie on 12/17/2016.
 */
var zoomvar = 1;
var zoomvarWheel = 0.8;

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

            //rubber part colors
            var color_none_rubber = document.getElementById('color-none-rubber');
            var color_blue_rubber = document.getElementById('color-blue-rubber');
            var color_red_rubber = document.getElementById('color-red-rubber');
            var color_green_rubber = document.getElementById('color-green-rubber');
            var color_purple_rubber = document.getElementById('color-purple-rubber');
            var color_black_rubber = document.getElementById('color-black-rubber');

            //rubber part base
            var $rubber_base = $('#rubberp');
            var $wheel = $('#wheel-base');

            //variabelen voor rotate buttons
            var rotate_right = document.getElementById('rotateRight');
            var rotate_left = document.getElementById('rotateLeft');
            var $rotAnBoard = $('#hoverboard');

            //colorpicker and size vars
            var color_opener_stroke = document.getElementById('color-stroke-button');
            var color_closer_stroke = document.getElementById('color-stroke-button-close');
            var wheel_size_opener = document.getElementById('size-wheel-button');
            var wheel_size_closer = document.getElementById('wheel-size-button-close');
            var rubber_color_opener = document.getElementById('color-rubber-button');
            var rubber_color_closer = document.getElementById('color-rubber-button-close');

            //zoombuttons
            var zoomIn = document.getElementById('zoomInButton');
            var zoomOut = document.getElementById('zoomOutButton');

            //sizebuttons
            // var sizeplus = document.getElementById('size-plus-button');
            // var sizeminus = document.getElementById('size-minus-button');

            //zoom variabelen aanmaken
            var zoommin = .1;
            var zoomplus = -.1;
            // var sizeminWheel = -.1;
            // var sizeplusWheel = .1;
            
            //colors function for stroke
            hoverboardManager.functions.addStroke(color_none, $hoverboard_stroke, '#hoverboard-stroke-none-obj', '#hoverboard-stroke-none-obj');


            hoverboardManager.functions.addStroke(color_none, $hoverboard_stroke, '#hoverboard-stroke-none-obj', '#hoverboard-stroke-none-mtl');

            hoverboardManager.functions.addStroke(color_blue, $hoverboard_stroke, '#hoverboard-stroke-blue-obj', '#hoverboard-stroke-blue-mtl');
            hoverboardManager.functions.addStroke(color_red, $hoverboard_stroke, '#hoverboard-stroke-red-obj', '#hoverboard-stroke-red-mtl');
            hoverboardManager.functions.addStroke(color_green, $hoverboard_stroke, '#hoverboard-stroke-green-obj', '#hoverboard-stroke-green-mtl');
            hoverboardManager.functions.addStroke(color_purple, $hoverboard_stroke, '#hoverboard-stroke-purple-obj', '#hoverboard-stroke-purple-mtl');
            hoverboardManager.functions.addStroke(color_black, $hoverboard_stroke, '#hoverboard-stroke-black-obj', '#hoverboard-stroke-black-mtl');

            //colors function for rubber part
            hoverboardManager.functions.addRubber(color_black_rubber, $rubber_base, '#rubber-dae-black', '-0.03 0.17 0.00');
            hoverboardManager.functions.addRubber(color_blue_rubber, $rubber_base, '#rubber-dae-blue', '-0.03 0.17 0.00');
            hoverboardManager.functions.addRubber(color_red_rubber, $rubber_base, '#rubber-dae-red', '-0.03 0.17 0.00');
            hoverboardManager.functions.addRubber(color_green_rubber, $rubber_base, '#rubber-dae-green', '-0.03 0.17 0.00');
            hoverboardManager.functions.addRubber(color_purple_rubber, $rubber_base, '#rubber-dae-purple', '-0.03 0.17 0.00');
            hoverboardManager.functions.addRubber(color_none_rubber, $rubber_base, '#rubber-dae', '0 0 0' );

            //aanroepen zoomfunctie
            hoverboardManager.functions.zoom(zoomIn, $hoverboard_stroke, $hoverboard_base, zoommin);
            hoverboardManager.functions.zoom(zoomOut, $hoverboard_stroke, $hoverboard_base, zoomplus);

            //aanroepen scalefunctie
            // hoverboardManager.functions.adjustSize(sizeminus, $wheel, sizeminWheel);
            // hoverboardManager.functions.adjustSize(sizeplus, $wheel, sizeplusWheel);

            // aanroepen rotation functies
            hoverboardManager.functions.rotationBoard(rotate_left, $rotAnBoard, true);
            hoverboardManager.functions.rotationBoard(rotate_right, $rotAnBoard, false);

            //aanroepen color opener functies
            hoverboardManager.functions.togglePanel(color_opener_stroke, "#color-picker", true);
            hoverboardManager.functions.togglePanel(color_closer_stroke, "#color-picker", false);
            hoverboardManager.functions.togglePanel(wheel_size_opener, "#wheel-size-plane", true);
            hoverboardManager.functions.togglePanel(wheel_size_closer, "#wheel-size-plane", false);
            hoverboardManager.functions.togglePanel(rubber_color_opener, "#color-picker-rubber", true);
            hoverboardManager.functions.togglePanel(rubber_color_closer, "#color-picker-rubber", false);


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

        addRubber: function (id, selector, dae, position) {
            id.addEventListener('mouseenter', function () {
                succes_sound.play();
                selector.attr('collada-model', dae).attr('position', position);
            });
        },

        zoom: function (id, stroke, base_hov, zoomAdd) {
            id.addEventListener('mouseenter', function () {
                hoverboardManager.functions.controlZoom(zoomAdd, stroke, base_hov);
            });
        },

        // adjustSize: function (id, wheel, zoomAddWheel) {
        //     id.addEventListener('mouseenter', function () {
        //         console.log('hover');
        //         hoverboardManager.functions.controlScale(wheel, zoomAddWheel);
        //     });
        // },

        controlScale: function (wheel, zoomAddWheel) {
            zoomvarWheel += zoomAddWheel;
            if (zoomvarWheel <= 1)
            {
                wheel.attr('scale', zoomvarWheel, zoomvarWheel, zoomvarWheel);
                console.log(zoomvarWheel)
            }
        },

        // controlZoom: function (zoomAdd, stroke, base_hov) {
        //     zoomvar += zoomAdd;
        //     stroke.attr('scale', zoomvar, zoomvar, zoomvar);
        //     base_hov.attr('scale', zoomvar, zoomvar, zoomvar);
        //     console.log(zoomvar)
        // },

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