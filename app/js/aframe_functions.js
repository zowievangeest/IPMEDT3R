/**
 * Created by Zowie on 12/17/2016.
 */

// aanmaken variabelen die gebruikt worden in de functies
var zoomvar = 1;
var zoomvarWheel = 0.8;
var lengthnumber = 140;
var sizenumber = 30;
var mouse_enter = false;

// soundfile voor feedback wanneer naar een object gekeken wordt
var succes_sound = new Audio('./sounds/succes_sound.mp3');

/* de functies van het hoverboard worden gestored in een variabele welke aan het einde van document wordt aangeroepen
in de document.ready() functie */
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
            var color_blue = document.getElementById('stroke-blue');
            var color_red = document.getElementById('stroke-red');
            var color_green = document.getElementById('stroke-green');
            var color_purple = document.getElementById('stroke-purple');
            var color_black = document.getElementById('stroke-black');

            //hoverboard stroke en hoverboard base
            var $hoverboard_stroke = $('#hoverboard-stroke');
            var $hoverboard_base_stroke = $('#board-stroke');

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
            var wheel_size_opener = document.getElementById('size-wheel-button');
            var rubber_color_opener = document.getElementById('color-rubber-button');

            // check if panels are toggled else close them
            hoverboardManager.functions.checkTogglePanels(color_opener_stroke, "#color-picker-rubber", '#wheel-size-plane');
            hoverboardManager.functions.checkTogglePanels(wheel_size_opener, "#color-picker", '#color-picker-rubber');
            hoverboardManager.functions.checkTogglePanels(rubber_color_opener, "#color-picker", '#wheel-size-plane');

            //zoombuttons
            var zoomIn = document.getElementById('zoomInButton');
            var zoomOut = document.getElementById('zoomOutButton');


            //wheelsizebuttons
            var wheelPlus = document.getElementById('sizePlusButton');
            var wheelMinus = document.getElementById('sizeMinusButton');

            //zoom variabelen aanmaken
            var zoommin = .05;
            var zoomplus = -.05;
            var sizeminWheel = -.05;
            var sizeplusWheel = .05;

            //splash screen variable
            var splashscreenbtn = document.getElementById('splash-closebtn');

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

            //aanroepen zoomfunctie
            hoverboardManager.functions.zoom(zoomIn, $hoverboard_base_stroke, zoommin, 10);
            hoverboardManager.functions.zoom(zoomOut, $hoverboard_base_stroke, zoomplus, -10);

            //aanroepen wheelsizefunction
            hoverboardManager.functions.adjustSize(wheelPlus, $wheel, sizeplusWheel, 5);
            hoverboardManager.functions.adjustSize(wheelMinus, $wheel, sizeminWheel, -5);

            // aanroepen rotation functies
            hoverboardManager.functions.rotationBoard(rotate_left, $rotAnBoard, true);
            hoverboardManager.functions.rotationBoard(rotate_right, $rotAnBoard, false);

            hoverboardManager.functions.getHoverboardImage("hoverboard");

            // aanroepen splashscreen function
            hoverboardManager.functions.closeSplash(splashscreenbtn)
        },

        // met deze functie wordt het splash/loading screen gesloten wanneer naar de continu button wordt gekeken
        closeSplash: function(button) {
            button.addEventListener('mouseenter', function() {
                $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="1.4 0.5 0.7" to="1.6 0.7 0.7" dur="500" fill="both" easing="ease-in"></a-animation>');
                setTimeout(function() {
                    succes_sound.play();
                    $('#splash-screen').attr('visible', false);
                }, 1000);
            });
    },
        // met deze functie zet je de panelen op niet visible
        checkTogglePanels: function (picker, atr1, atr2) {
            picker.addEventListener('mouseenter', function () {
                $(atr1).attr('visible', false);
                $(atr2).attr('visible', false);
            });

        },

        // met deze functie worden verschillende kleuren randen aan het hoverboard toegevoegd
        addStroke: function (id, selector, obj, mtl) {
            id.addEventListener('mouseenter', function () {
                var color = $(this).attr('data-color');
                var price = $(this).attr('data-price');

                $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="1 1 1" to="1.2 1.2 1.2" dur="500" fill="both" easing="ease-in"></a-animation>');
                mouse_enter = true
                setTimeout(function () {
                    if(mouse_enter == true){
                        // bij een mouseenter speelt sound af, wordt oude rand verwijdert en nieuwe toegevoegd, en oude model in menu verwijdert en nieuwe toegevoegd
                        succes_sound.play();
                        $('#hoverboard-stroke').remove();
                        $('#board-stroke').append('<a-entity data-color="' + color + '" class="price" data-price="' + price + '" data-part-name="Stroke" id="hoverboard-stroke" obj-model="obj: ' + obj + '; mtl: ' + mtl + '" position="0 0 0" rotation="0 180 0" scale="1 1 1" visible="" material=""></a-entity>');
                        $('#stroke-example').remove()
                        $('#modify-menu').append('<a-entity data-color="' + color + '" id="stroke-example" obj-model="obj: ' + obj + '; mtl: ' + mtl + '" position="-6.9 3.12 -3.21" rotation="-32.09 179.91 0" scale="0.2 1.36 0.1" visible="" material=""></a-entity>');
                    }
                }, 1500);
            });

            hoverboardManager.functions.mouseLeaveAnimation(id, "1.2 1.2 1.2", "1 1 1");
        },


        // met deze functie worden verschillende kleuren wielrubbers aan het hoverboard toegevoegd
        addRubber: function (id, selector, dae, position) {
            id.addEventListener('mouseenter', function () {
                var color = $(this).attr('data-color');
                var price = $(this).attr('data-price');

                $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="1 1 1" to="1.2 1.2 1.2" dur="500" fill="both" easing="ease-in"></a-animation>');
                mouse_enter = true
                setTimeout(function () {
                    if(mouse_enter == true){
                        // bij een mouseenter speelt sound af, wordt oude rubberpart verwijdert en nieuwe toegevoegd, en oude model in menu verwijdert en nieuwe toegevoegd
                        succes_sound.play();
                        $('#rubberp').remove();
                        $('#hoverboard').append('<a-entity data-color="' + color + '" class="price" data-price="' + price + '" data-part-name="Rubber Parts" id="rubberp" collada-model="' + dae + '" position="' + position + '" rotation="0 180 0" scale="0.57 0.57 0.57"></a-entity>');
                        $('#rubber-example').remove();
                        $('#modify-menu').append('<a-entity data-color="' + color + '" id="rubber-example" collada-model="' + dae + '" rotation="0 180 0" scale="0.2 0.2 0.2" position="-3.7 2.97 -3.18"></a-entity>');
                    }
                }, 1200);
            });

            hoverboardManager.functions.mouseLeaveAnimation(id, "1.2 1.2 1.2", "1 1 1");
        },

        /*
        Hieronder bevinden zich de functies voor het aanpassen van de grote van het wiel,
        de grote van het hoverboard.
         */

        //functie voor groter en kleiner maken van het hoverboard
        zoom: function (id, base_hov, zoomAdd, plusminus) {
            id.addEventListener('mouseenter', function () {
                $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="0.3 0.3 0.3" to="0.4 0.4 0.4" dur="500" fill="both" easing="ease-in"></a-animation>');
                setTimeout(function () {
                    // bij mouseenter wordt de succes_sound afgespeeld en een nieuwe functie aangeroepen
                    succes_sound.play();
                    hoverboardManager.functions.controlZoom(zoomAdd, base_hov, plusminus);
                }, 1200);
            });

            hoverboardManager.functions.mouseLeaveAnimation(id, "0.4 0.4 0.4", "0.3 0.3 0.3");
        },

        // functie voor het groter en kleiner maken van het wiel
        adjustSize: function (id, wheel, zoomAddWheel, plusminus) {
            id.addEventListener('mouseenter', function () {
                $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="0.3 0.3 0.3" to="0.4 0.4 0.4" dur="500" fill="both" easing="ease-in"></a-animation>');
                setTimeout(function () {
                    // bij mouseenter wordt succes_sound afgespeeld en de controlScale functie aangeroepen
                    succes_sound.play();
                    hoverboardManager.functions.controlScale(wheel, zoomAddWheel, plusminus);
                }, 1000);
            });

            hoverboardManager.functions.mouseLeaveAnimation(id, "0.4 0.4 0.4", "0.3 0.3 0.3");
        },

        /*
         Deze functie wordt aangeroepen binnen de adjustsize-functie en zorgt dat de size van
         het wheel aangepast kan worden. De grote van het wheel wordt opgeslagen
         in de variabele zoomvarWheel. Zo kan de grote bijgehouden worden.
         */
        controlScale: function (wheel, zoomAddWheel, plusminus) {
            // variabele wordt met 0.5 verhoogd of verlaagd
            zoomvarWheel += zoomAddWheel;
            if (zoomvarWheel <= 0.9 && zoomvarWheel >= 0.7) {
                // de nieuwe scale-waarden worden toegepast op het wheel
                wheel.attr('scale', zoomvarWheel + ' ' + zoomvarWheel + ' ' + zoomvarWheel);
                // de nummers op het menu die de grote aangeven worden aangepast
                $('#wheel-size-number').remove();
                $('#size-numbers').append('<a-entity id="wheel-size-number" bmfont-text="text:'+(sizenumber+plusminus)+' cm;letterSpacing:0.4;color:#ffffff;" position="3.23 3.69 -3.30"></a-entity>');
                sizenumber += plusminus;
            }
        },

        /*
        Deze functie wordt aangeroepen binnen de zoom-functie en zorgt dat de size van
        het hoverboard aangepast kan worden. De grote van het hoverboard wordt opgeslagen
        in de variabele zoomvar. Zo kan de grote bijgehouden worden.
         */
        controlZoom: function (zoomAdd, base_hov, plusminus) {
            // variabele wordt met 0.5 verhoogd of verlaagd
            zoomvar += zoomAdd;
            if (zoomvar <= 1.31 && zoomvar >= 0.9) {
                // de nieuwe scale-waarden worden toegepast op het hoverboard
                base_hov.attr('scale', zoomvar, zoomvar, zoomvar);
                // de nummers op het menu die de grote aangeven worden aangepast
                $('#board-size-number').remove();
                $('#size-numbers').append('<a-entity id="board-size-number" bmfont-text="text:' + (lengthnumber+plusminus ) +' cm;letterSpacing:0.4;color:#ffffff;" position="3.11 1.97 -3.30"></a-entity>');
                lengthnumber += plusminus;
            }
        },

        // functie voor het roteren van het hoverboard (naar links of naar rechts)
        rotationBoard: function (id, boardAn, bool) {
            id.addEventListener('mouseenter', function () {
                // de animaties worden toegevoegd aan de klasses
                if (bool) {
                    $(boardAn).append('<a-animation id="rotateAnimationBoard" attribute="rotation" dur="5000" repeat="0" easing="ease-in-out" from="0 0 0" to="0 180 0" direction="reverse"></a-animation>');
                } else {
                    $(boardAn).append('<a-animation id="rotateAnimationBoard" attribute="rotation" dur="5000" repeat="0" easing="ease-in-out" from="0 0 0" to="0 180 0" direction=""></a-animation>');
                }
                // de animatie van het draaien wordt na 5 seconden weer verwijdert, om te voorkomen dat hij door blijft draaien
                setTimeout(function () {
                    $('#rotateAnimationBoard').remove();
                }, 5000);
            });
        },

        // functie voor het ophalen van de video's welke worden weergeven in de VR-omgeving
        getHoverboardImage: function (tag) {
            $.ajax({
                // de api die we gebruiken
                url: "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=dc6zaTOxFJmzC",
                method: "GET", // or GET
                dataType: "json",
                success: function (msg) {
                    // video's worden opgeslaten in variabelen
                    var randomItem1 = msg.data[Math.random() * msg.data.length | 0];
                    var randomItem2 = msg.data[Math.random() * msg.data.length | 0];
                    var randomItem3 = msg.data[Math.random() * msg.data.length | 0];

                    var video1 = randomItem1.images.fixed_width.mp4;
                    var video2 = randomItem2.images.fixed_width.mp4;
                    var video3 = randomItem3.images.fixed_width.mp4;

                    // video's worden toegevoegd aan ID's binnen de html en zo weergeven in de omgeving
                    $('#hoverboard-picture-1').attr('material', 'src :' + video1);
                    $('#hoverboard-picture-2').attr('material', 'src :' + video2);
                    $('#hoverboard-picture-3').attr('material', 'src :' + video3);
                }
            });
        },

        /*
         functie voor animatie die knoppen weer kleiner laat worden zodra er een mouseleave wordt geconstateerd.
         De mouseenter animaties wordt in de functies zelf toegevoegd.
        */
        mouseLeaveAnimation: function (id, from, to) {
            id.addEventListener('mouseleave', function () {
                mouse_enter = false;
                $($(this)).append('<a-animation id="scaleDown" attribute="scale" from="' + from + '" to="' + to + '" delay="0" dur="500" fill="both" easing="ease-out"></a-animation>');
                setTimeout(function () {
                    $('#scaleUp').remove();
                    $('#scaleDown').remove();
                }, 700)
            });
        }
    }
};

/* de functies van het prijzensysteem worden gestored in een variabele welke aan het einde van document wordt aangeroepen
 in de document.ready() functie */
var priceManager = {
    init: function () {
        priceManager.setListeners();
    },
    // alle listeners die nodig zijn voor het gebruiken van de pricemanager
    setListeners: function () {
        var preview = document.getElementById('saveButton');
        priceManager.functions.toggleVisible("#checkoutButton", false);
        preview.addEventListener('mouseenter', function () {
            $('#summary-list-items').empty();
            $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="0.8 0.4 0.4" to="1 0.6 0.6" dur="500" fill="both" easing="ease-in"></a-animation>');
            setTimeout(function () {
                $('#savetext').attr('visible', true);
                setTimeout(function(){
                    $('#savetext').attr('visible', false);
                }, 3500);
                succes_sound.play();
                priceManager.functions.websiteCalculation();
            }, 1000);


        });

        priceManager.functions.mouseLeaveAnimation(preview, "1 0.6 0.6", "0.8 0.4 0.4");
    },
    // alle functies met betrekking tot de pricemanager
    functions: {
        // functie voor het aanmaken van een nieuwe array die de prijzen terug geeft
        makeArray: function () {
            var prizes = {};
            var color = "";
            $('.price').each(function () {
                if ($(this).attr('data-color') == undefined) {
                    color = "";
                } else if ($(this).attr('data-part-name') == "Stroke") {
                    color = ' - ' + $(this).attr('data-color');
                } else if ($(this).attr('data-part-name') == "Rubber Parts") {
                    color = ' - ' + $(this).attr('data-color');
                }
                prizes[$(this).attr('data-part-name') + color] = $(this).data('price');
            });
            return prizes
        },

        // totale prijs berekenen aan de hand van de aangemaakte array
        countTotal: function () {
            var prizeArray = priceManager.functions.makeArray();
            var sum = 0;

            for (var name in prizeArray) {
                sum += prizeArray[name];
            }
            return sum
        },
        // Voor op de website willen we ook de prijzen weergeven daarom wordt er met deze functie opnieuw alle prijzen na het opslaan op de website getoond.
        websiteCalculation: function () {
            $('.pricing-list').empty();

            var data = priceManager.functions.makeArray();
            var total = priceManager.functions.countTotal();

            $('#paypal-link').attr('href', 'https://www.paypal.me/zowie93/' + total);

            var y = 0.83;
            var i = 0

            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    $('#summary-list-items').append('<a-entity id="summary-board-text" scale="1.1 1.1 1.1" position="-1.74 ' + (y - (i * 0.30)) + ' 0.01" bmfont-text="text:' + k + ';letterSpacing:0.8;color:#ffffff;"></a-entity><a-entity id="summary-board-price" scale="1.1 1.1 1.1" position="1.2 ' + (y - (i * 0.30)) + ' 0.01" bmfont-text="text: €' + data[k] + ';letterSpacing:0.8;color:#ffffff;"></a-entity>')
                    i += 1;
                }
            }

            $('#summary-list-items').append('<a-entity id="summary-total-text" scale="1.3 1.3 1.3" position="-1.74 -1.0 0.01" bmfont-text="text:Total: €' + total + ';letterSpacing:0.8;color:#ffffff;"></a-entity>');


            for (var key in data) {
                $('.pricing-list').prepend('<li class="text-left">1 x ' + key + '<span class="text-right li-right-bold">€' + data[key] + '</span></li>');
            }
            $('.pricing-list').append('<li>&nbsp;</li>');
            $('.pricing-list').append('<li class="text-left">TOTAL: <span class="text-right li-right-bold">€' + total + '</span></li>');

            priceManager.functions.toggleVisible("#checkoutButton", true);
        },
        // functie voor het zichtbaarmaken van bepaalde elementen binnen de website
        toggleVisible: function (name, bool) {
            $(name).attr('visible', bool);
        },
        // als de muis uit de knop is kom er een animatie bij
        mouseLeaveAnimation: function (id, from, to) {
            id.addEventListener('mouseleave', function () {
                $($(this)).append('<a-animation id="scaleDown" attribute="scale" from="' + from + '" to="' + to + '" delay="0" dur="500" fill="both" easing="ease-out"></a-animation>');
                setTimeout(function () {
                    $('#scaleUp').remove();
                    $('#scaleDown').remove();
                }, 700)
            });
        }
    }
};

/* de functies van het prijzensysteem worden gestored in een variabele welke aan het einde van document wordt aangeroepen
 in de document.ready() functie */
var checkoutManager = {
    init: function () {
        checkoutManager.setListeners();
    },
    // alle listeners die nodig zijn voor het gebruiken van de checkoutmanager
    setListeners: function () {
        var checkout = document.getElementById('checkout-hoverboard');
        checkout.addEventListener('mouseenter', function () {
            $($(this)).append('<a-animation id="scaleUp" attribute="scale" from="1.6 1.2 1.2" to="1.7 1.3 1.3" dur="500" fill="both" easing="ease-in"></a-animation>');
            setTimeout(function () {
                succes_sound.play();
                $('#cursor').append('<a-entity id="textcursor" bmfont-text="text:Doe je headset af!;letterSpacing:0.4;color:#ffffff;" position="-0.93 0.06 -0.32"></a-entity>');
                $('#cursor').append('<a-entity id="textcursor-bg" position="-0.08 0.12 -0.33" scale="1.95 0.34 1" geometry="primitive:plane" material="color:black;opacity:0.8"></a-entity>');
                setTimeout(function () {
                    checkoutManager.functions.scrollToDiv('.thumbnail', 1600);
                    $('#textcursor').remove();
                    $('#textcursor-bg').remove();
                }, 10000);
            }, 1000);
        });

        $('a-scene').on('exit-vr', function () {
            checkoutManager.functions.scrollToDiv('.thumbnail', 1500);
        });
    },
    // alle functies die nodig zijn voor de checkout
    functions: {
        // Als je klaar bent met het VR gedeeldte scrollt die automatisch naar de div
        scrollToDiv: function (id, offset) {
            $('html, body').animate({
                scrollTop: $(id).offset().top + offset
            }, 2000);
        },

        // voegt animatie toe tijdens het verlaten van de checkoutknop
        mouseLeaveAnimation: function (id, from, to) {
            id.addEventListener('mouseleave', function () {
                $($(this)).append('<a-animation id="scaleDown" attribute="scale" from="' + from + '" to="' + to + '" delay="0" dur="500" fill="both" easing="ease-out"></a-animation>');
                setTimeout(function () {
                    $('#scaleUp').remove();
                    $('#scaleDown').remove();
                }, 700)
            });
        }
    },
};

// Document ready functies
$(document).ready(function () {
    // Hier roepen we alle inits aan als de dom geladen is
    hoverboardManager.init();
    priceManager.init();
    checkoutManager.init();
});
