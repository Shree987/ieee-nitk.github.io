var enable = true;
function showTextEffect() {
    var index = 0,
        pos = 0;
    phraseShow = function() {
        var phrases = ["LEARN", "TEACH", "CREATE"];

        $("#text_effect").html('');
        pos = 0;
        for (pos = 0; pos < phrases[index].length; pos++) {
            $("<span/>", {
                "class": "effect_char",
                "style": "animation-delay:" + pos * 0.2 + "s",
                "html": phrases[index].charAt(pos)
            }).appendTo("#text_effect");
        }
        index++;
        index = index % 3;
    }

    phraseShow();
    setInterval(phraseShow, 3000);

    var mobile = $(document).outerWidth(true) < 768 ? true : false;
    if (mobile) {

        //The cool button!!

        $(".parent").click(function() {
            $(".nav-icon").toggleClass("active");
            if ($(".nav-icon").hasClass("active"))
                $(".popup_menu").slideDown();
            else
                $(".popup_menu").slideUp();

        });
        $("#menu li").click(function() {
            $(".popup_menu").slideUp();
            $(".nav-icon").removeClass("active");
        });
        $(".parent").mouseenter(function() {
            $(".nav-icon").addClass("hover");
        });
        $(".parent").mouseleave(function() {
            $(".nav-icon").removeClass("hover");
        });

    }
}


$(document).ready(function() {
    showTextEffect();
    console.log("starting...");
    particlesJS.load('particles-js', 'particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
    //The fullpage initialisation

    $("#fullpage").fullpage({
        anchors: ['home', 'about', 'sigs', 'events', 'team', 'projects', 'footer'],
        menu: "#menu",
        afterLoad: function(anchorLink, index) {
            $(".section:nth-of-type(" + index + ") .fly_up").animate({
                top: "0px",
                opacity: "1"
            }, 1000);
            $(".section:nth-of-type(" + index + ") .fly_up_fast").animate({
                top: "0px",
                opacity: "1"
            }, 600, function() {
                $(".section:nth-of-type(" + index + ") .fadein").fadeIn();
            });
        },
        onLeave: function(index, nextIndex) {
            /* Animating the footer */
            if (index == 6 && nextIndex == 7)
                $('.icon').addClass('icon_show');
            else
                $('.icon').removeClass('icon_show');
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
            if(enable){
                enable = !enable;
                console.log("disabled");
                $(".wrapper").addClass("shrunk");
                setTimeout(function(){
                    
                        //$.fn.fullpage.moveSlideRight();
                        $.fn.fullpage.moveTo('sigs', nextSlideIndex);
                    
                        //$.fn.fullpage.moveTo('sigs', nextSlideIndex);
                        //$.fn.fullpage.moveSlideLeft();
                    
                },500);
                setTimeout(function(){
                    enable = true;
                    console.log("Enabled!");
                },1000);
                return false;
            }
            
            //return false;
        },
        afterSlideLoad:function(){
            $(".wrapper").removeClass("shrunk");
        }
    });
});