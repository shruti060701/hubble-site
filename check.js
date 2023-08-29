gsap.registerPlugin(MotionPathPlugin);

const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
circlePath.id = "circlePath";
document.querySelector(".big-circle").prepend(circlePath);
const items = document.querySelectorAll('.item-car');

let step = 1 / 5;
let wrapProgress = gsap.utils.wrap(0, 1);
let snap = gsap.utils.snap(step)

gsap.set(items, {
    motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        //autoRotate: true,
        end: i => i / items.length
    }
});

const tl = gsap.timeline({
    paused: true
});
tl.to('.wrapper', {
    rotation: 360,
    transformOrigin: 'center',
    duration: 1,
    ease: 'none'
});

tl.to(items, {
    rotation: "-=360",
    transformOrigin: 'center',
    duration: 1,
    ease: 'none'
}, 0);

// const nextTl = gsap.timeline({ paused:true });
// nextTl.to('.wrapper', {
// 	rotation: "-=360", 
// 	transformOrigin: 'center',
// 	duration: 1, 
// 	ease: 'none'
// });
// nextTl.to(items, {
// 	rotation: 360, 
// 	transformOrigin: 'center',
// 	duration: 1, 
// 	ease: 'none'
// });

//on next button click
document.getElementById('next').addEventListener("click", function() {
    // nextTl.play(0);

    gsap.to(tl, {
        progress: snap(tl.progress() + step),
        modifiers: {
            progress: wrapProgress
        }
    });
});

//on prev button click
document.getElementById('prev').addEventListener("click", function() {
    // prevTl.play(0);

    gsap.to(tl, {
        progress: snap(tl.progress() - step),
        modifiers: {
            progress: wrapProgress
        }
    });
});