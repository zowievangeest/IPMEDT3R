/**
 * Created by Zowie on 12/17/2016.
 */
var zoomvar = 1;
var zoomvarWheel = 0.8;

var hover_button = new Audio('./sounds/hover_sound.mp3');
var succes_sound = new Audio('./sounds/succes_sound.mp3');

var hoverboardManager;
hoverboardManager = {
    init: function () {
        hoverboardManager.setListeners();

    },

    setListeners: function () {
        hoverboardManager.functions.main_functions();
    },

    functions: {
        main_functions: function () {

            //hoverboard stroke colors
            var color_none = document.getElementById('stroke-white');
            var color_blue = document.getElementById('stroke-blue');
            var color_red = document.getElementById('stroke-red');
            var color_green = document.getElementById('stroke-green');
            var color_purple = document.getElementById('stroke-purple');
            var color_black = document.getElementById('stroke-black');

            //hoverboard stroke en hoverboard base
            var $hoverboard_stroke = $('#hoverboard-stroke');
            var $hoverboard_base = $('#hoverboard-base');


            //rubber part colors
            var color_none_rubber = document.getElementById('rubber-white');
            var color_blue_rubber = document.getElementById('rubber-blue');
            var color_red_rubber = document.getElementById('rubber-red');
            var color_green_rubber = document.getElementById('rubber-green');
            var color_purple_rubber = document.getElementById('rubber-purple');
            var color_black_rubber = document.getElementById('rubber-black');

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

            // check if panels are toggled else close them
            hoverboardManager.functions.checkTogglePanels(color_opener_stroke, "#color-picker-rubber", '#wheel-size-plane');
            hoverboardManager.functions.checkTogglePanels(wheel_size_opener, "#color-picker", '#color-picker-rubber');
            hoverboardManager.functions.checkTogglePanels(rubber_color_opener, "#color-picker", '#wheel-size-plane');

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
            


            // save hoverboard
            // var saveButton = document.getElementById('save-hoverboard');
            //
            // // save button function
            // hoverboardManager.functions.saveHoverboard(saveButton);

            //color functions for strokes
            hoverboardManager.functions.addStroke(color_blue, $hoverboard_stroke, '#hoverboard-stroke-blue-obj', '#hoverboard-stroke-blue-mtl');
            hoverboardManager.functions.addStroke(color_red, $hoverboard_stroke, '#hoverboard-stroke-red-obj', '#hoverboard-stroke-red-mtl');
            hoverboardManager.functions.addStroke(color_green, $hoverboard_stroke, '#hoverboard-stroke-green-obj', '#hoverboard-stroke-green-mtl');
            hoverboardManager.functions.addStroke(color_purple, $hoverboard_stroke, '#hoverboard-stroke-purple-obj', '#hoverboard-stroke-purple-mtl');
            hoverboardManager.functions.addStroke(color_black, $hoverboard_stroke, '#hoverboard-stroke-black-obj', '#hoverboard-stroke-black-mtl');

            //colors function for rubber part
            hoverboardManager.functions.addRubber(color_black_rubber, $rubber_base, '#rubber-dae-black', '-0.03 0 0');
            hoverboardManager.functions.addRubber(color_blue_rubber, $rubber_base, '#rubber-dae-blue', '-0.03 0 0');
            hoverboardManager.functions.addRubber(color_red_rubber, $rubber_base, '#rubber-dae-red', '-0.03 0 0');
            hoverboardManager.functions.addRubber(color_green_rubber, $rubber_base, '#rubber-dae-green', '-0.03 0 0');
            hoverboardManager.functions.addRubber(color_purple_rubber, $rubber_base, '#rubber-dae-purple', '-0.03 0 0');
            hoverboardManager.functions.addRubber(color_none_rubber, $rubber_base, '#rubber-dae', '0 -0.16 0' );

            //aanroepen zoomfunctie
            hoverboardManager.functions.zoom(zoomIn, $hoverboard_stroke, $hoverboard_base, zoommin);
            hoverboardManager.functions.zoom(zoomOut, $hoverboard_stroke, $hoverboard_base, zoomplus);


            // aanroepen rotation functies
            hoverboardManager.functions.rotationBoard(rotate_left, $rotAnBoard, true);
            hoverboardManager.functions.rotationBoard(rotate_right, $rotAnBoard, false);

            hoverboardManager.functions.getHoverboardImage("hoverboard");
        },


        checkTogglePanels : function (picker, atr1, atr2) {
            picker.addEventListener('mouseenter', function () {
                $(atr1).attr('visible', false);
                $(atr2).attr('visible', false);
            });

        },

        addStroke: function (id, selector, obj, mtl) {
            id.addEventListener('mouseenter', function () {
                timer = setTimeout
                succes_sound.play();
                $('#hoverboard-stroke').remove();
                $('#hoverboard').append('<a-entity class="price" data-price="50" data-part-name="Stroke" id="hoverboard-stroke" obj-model="obj: ' + obj + '; mtl: ' + mtl + '" position="0 0 0" rotation="0 180 0" scale="1 1 1" visible="" material=""></a-entity>');
                $('#stroke-example').remove()
                $('#modify-menu').append('<a-entity id="stroke-example" obj-model="obj: ' + obj + '; mtl: ' + mtl + '" position="-7.52 3.12 -3.21" rotation="-32.09 179.91 0" scale="0.2 1.36 0.1" visible="" material=""></a-entity>');
            });
        },

        addRubber: function (id, selector, dae, position) {
            id.addEventListener('mouseenter', function () {
                succes_sound.play();
                $('#rubberp').remove();
                $('#hoverboard').append('<a-entity class="price" data-price="25" data-part-name="Rubber Parts" id="rubberp" collada-model="'+ dae + '" position="' + position +'" rotation="0 180 0" scale="0.57 0.57 0.57"></a-entity>');
                $('#rubber-example').remove();
                $('#modify-menu').append('<a-entity id="rubber-example" collada-model="'+ dae +'" rotation="0 180 0" scale="0.2 0.2 0.2" position="-4.18 2.97 -3.18"></a-entity>');
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

        // controlScale: function (wheel, zoomAddWheel) {
        //     zoomvarWheel += zoomAddWheel;
        //     if (zoomvarWheel <= 1)
        //     {
        //         wheel.attr('scale', zoomvarWheel, zoomvarWheel, zoomvarWheel);
        //         console.log(zoomvarWheel)
        //     }
        // },

        controlZoom: function (zoomAdd, stroke, base_hov) {
            zoomvar += zoomAdd;
            stroke.attr('scale', zoomvar, zoomvar, zoomvar);
            base_hov.attr('scale', zoomvar, zoomvar, zoomvar);
            console.log(zoomvar)
        },

        rotationBoard: function (id, boardAn, bool) {
            id.addEventListener('mouseenter', function () {
                if (bool) {
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
        //
        // saveHoverboard: function (id) {
        //     id.addEventListener('mouseenter', function () {
        //         var hoverboard = $('#cloned-hoverboard');
        //         var cloneId = 1;
        //         var clonedHoverboard = $('#hoverboard').clone().attr({
        //             id: 'cloned-board' + cloneId++,
        //             class: 'cloned-board-class'
        //         }).insertAfter("#hoverboard");
        //         if (hoverboard.is(':parent')) {
        //             $('.cloned-board-class').remove();
        //             hoverboard.append(clonedHoverboard);
        //         } else {
        //             hoverboard.append(clonedHoverboard);
        //         }
        //
        //         setTimeout(function () {
        //             var $camera = $('#camera');
        //             var $cameraClass = $('.camera-animation');
        //             var camera = $camera.attr('rotation');
        //             var x = camera.x;
        //             var y = camera.y;
        //             var z = camera.z;
        //             if ($camera.is(':parent')) {
        //                 $cameraClass.remove();
        //                 $camera.append('<a-animation class="camera-animation" attribute="rotation" from="' + x + ' ' + y + ' ' + z + '" to="0 180 0" dur="5000" direction="alternateReverse"></a-animation>');
        //             } else {
        //                 $camera.append('<a-animation class="camera-animation" attribute="rotation" from="' + x + ' ' + y + ' ' + z + '" to="0 180 0" dur="5000" direction="alternateReverse"></a-animation>');
        //             }
        //             setTimeout(function () {
        //                 $('.cloned-board-class').append('<a-animation attribute="rotation" from="0 180 0" to="0 540 0" dur="10000" repeat="indefinite"></a-animation>');
        //             }, 4500);
        //         }, 500);
        //     });
        // }

    }
};

var priceManager = {
    init: function () {
        priceManager.setListeners();
    },

    setListeners: function () {
        var preview = document.getElementById('preview-hoverboard');

        preview.addEventListener('mouseenter', function () {
            setTimeout(function(){
                priceManager.functions.websiteCalculation()
            }, 1000);
        });
    },

    functions: {
        makeArray: function () {
            var prizes = {};
            $('.price').each(function () {
                prizes[$(this).attr('data-part-name')] = $(this).data('price');
            });
            return prizes
        },

        countTotal: function () {
            var prizeArray = priceManager.functions.makeArray();
            var sum = 0;

            for (var name in prizeArray) {
                sum += prizeArray[name];
            }
            return sum
        },

        websiteCalculation: function () {
            $('.pricing-list').empty();

            var data = priceManager.functions.makeArray();
            var total = priceManager.functions.countTotal();

            for (var key in data){
                $('.pricing-list').prepend('<li class="text-left">1 x ' + key + '<span class="text-right li-right-bold">€' + data[key] + '</span></li>');
            }
            $('.pricing-list').append('<li>&nbsp;</li>');
            $('.pricing-list').append('<li class="text-left">TOTAL: <span class="text-right li-right-bold">€' + total + '</span></li>');
        }
    }
};

$(document).ready(function () {
    hoverboardManager.init();
    priceManager.init();
});
