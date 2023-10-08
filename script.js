var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function mouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        // console.log(dets.clientX,dets.clientY);
        document.querySelector("#circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
    })
}
function animFirstpage() {
    var tl = gsap.timeline();

    tl.from(".navbar", {
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInout
    })
        .to(".boundingelem", {
            y: 0,
            stagger: .2,
            duration: 1,
            ease: Expo.easeInout,

        })
        .from(".herofooter", {
            y: -10,
            opacity: 0,
            duration: 1,
            ease: Expo.easeInout,
            delay: -.5
        })
}
function circleskew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        var xdiff = dets.clientX - xprev;
        xprev = dets.clientX;
        var ydiff = dets.clientY - xprev;
        yprev = dets.clientY;

        mouseFollower(xscale, yscale)
        timeout = setTimeout(function () {
            document.querySelector("#circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;

        }, 100);

    });
}

animFirstpage();
mouseFollower();

document.querySelectorAll(".elem")
    .forEach(function (elem) {
        
        var rotate = 0;
        var diffrot = 0;
        elem.addEventListener("mouseleave", function (dets) {
            gsap.to(elem.querySelectorAll("img"), {
                
                opacity: 0,
                ease: Power3,
                duration: 0.5,
            });
        });

        elem.addEventListener("mousemove", function (dets) {
            diffrot = dets.clientX - rotate;
            rotate = dets.clientX;
            var diff = dets.clientY - elem.getBoundingClientRect().top;
            // console.log(dets.clientY-elem.getBoundingClientRect().top);
            // console.log(dets.clientY);

            gsap.to(elem.querySelectorAll("img"), {

                opacity: 1,
                ease: Power3,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrot * 0.3),
                transformOrigin: "center center"
            });
        });


    });


