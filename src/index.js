import './styles/index.css';
import anime from 'animejs/lib/anime.es.js';

const EL = {
    LEFT: '.js-left-slice',
    RIGHT: '.js-right-slice',
    LEFT_FILL: '#js-left-fill',
    RIGHT_FILL: '#js-right-fill',
    BURST: '#js-burst',
};

const DURATIONS = {
    JOIN: 800,
    SLIDE: 350,
    BURST: 1200,
    COMBINE: 300,
    SLIDE_OFF: 300,
};

const TIME = {
    JOIN_X: DURATIONS.JOIN,
    get JOIN() {
        return this.JOIN_X + DURATIONS.JOIN - 100;
    },
    get SLIDE() {
        return this.JOIN + DURATIONS.SLIDE;
    },
    get BURST() {
        return this.SLIDE + DURATIONS.BURST;
    },
    get COMBINE() {
        return this.BURST + DURATIONS.COMBINE;
    },
    get PULL_Y() {
        return this.COMBINE + DURATIONS.JOIN;
    },
};

const timeline = anime.timeline({
    loop: true,
});

const leftSlice = {
    direction: 'alternate',
    easing: 'easeInOutQuint',
    targets: EL.LEFT,
    translateX: [
        {value: -10, duration: 1},
        {value: 0, duration: DURATIONS.JOIN},
        {
            value: -10,
            duration: DURATIONS.COMBINE,
            delay: TIME.BURST - DURATIONS.JOIN,
            easing: 'easeOutQuint',
        },
    ],
    translateY: [
        {value: -28, duration: 1},
        {delay: TIME.JOIN_X, value: 0, duration: DURATIONS.JOIN},
        {
            delay: TIME.COMBINE - TIME.JOIN,
            value: -28,
            duration: DURATIONS.JOIN,
        },
    ],
    opacity: [
        {delay: TIME.SLIDE, value: 0, duration: 1},
        {delay: TIME.BURST - TIME.SLIDE, value: 1, duration: 1},
    ],
};

const leftFill = {
    direction: 'alternate',
    easing: 'easeInOutQuint',
    targets: EL.LEFT_FILL,
    x: [
        {
            value: '-=154',
            duration: DURATIONS.SLIDE,
            delay: TIME.JOIN,
            easing: 'easeOutExpo',
        },
        {
            value: '+=154',
            duration: 1,
            easing: 'easeOutExpo',
        },
        {
            value: '-=154',
            duration: DURATIONS.COMBINE,
            delay: TIME.BURST - TIME.SLIDE,
            easing: 'easeOutQuint',
        },
        {
            value: '+=154',
            duration: DURATIONS.COMBINE,
            delay: TIME.PULL_Y - TIME.COMBINE,
            easing: 'easeOutCubic',
        },
    ],
    translateX: [
        {value: -10, duration: 1},
        {value: 0, duration: DURATIONS.JOIN},
        {
            value: -10,
            duration: DURATIONS.SLIDE_OFF,
            delay: TIME.BURST - DURATIONS.JOIN,
            easing: 'easeOutQuad',
        },
    ],
    translateY: [
        {value: -28, duration: 1},
        {delay: TIME.JOIN_X, value: 0, duration: DURATIONS.JOIN},
        {
            delay: TIME.COMBINE - TIME.JOIN,
            value: -28,
            duration: DURATIONS.JOIN,
        },
    ],
    opacity: [
        {delay: TIME.SLIDE, value: 0, duration: 1},
        {delay: TIME.BURST - TIME.SLIDE, value: 1, duration: 1},
    ],
};

const rightSlice = {
    direction: 'alternate',
    easing: 'easeInOutQuint',
    targets: EL.RIGHT,
    translateX: [
        {value: 10, duration: 1},
        {value: 0, duration: DURATIONS.JOIN},
        {
            value: 10,
            duration: DURATIONS.COMBINE,
            delay: TIME.BURST - DURATIONS.JOIN,
            easing: 'easeOutQuint',
        },
    ],
    translateY: [
        {value: 28, duration: 1},
        {delay: TIME.JOIN_X, value: 0, duration: DURATIONS.JOIN},
        {
            delay: TIME.COMBINE - TIME.JOIN,
            value: 28,
            duration: DURATIONS.JOIN,
        },
    ],
};

const rightFill = {
    direction: 'alternate',
    easing: 'easeInOutQuint',
    targets: EL.RIGHT_FILL,
    x: [
        {
            value: '-=72',
            duration: DURATIONS.SLIDE,
            delay: TIME.JOIN,
            easing: 'easeOutExpo',
        },
        {
            value: '+=72',
            duration: DURATIONS.COMBINE,
            delay: TIME.BURST - TIME.SLIDE,
            easing: 'easeOutQuint',
        },
    ],
    translateX: [
        {value: 10, duration: 1},
        {value: 0, duration: DURATIONS.JOIN},
        {
            value: 10,
            duration: DURATIONS.COMBINE,
            delay: TIME.BURST - DURATIONS.JOIN,
            easing: 'easeOutQuint',
        },
    ],
    translateY: [
        {value: 28, duration: 1},
        {delay: TIME.JOIN_X, value: 0, duration: 800},
        {
            delay: TIME.COMBINE - TIME.JOIN,
            value: 28,
            duration: DURATIONS.JOIN,
        },
    ]
};

const burst = {
    direction: 'alternate',
    easing: 'easeOutCubic',
    targets: EL.BURST,
    opacity: [{value: 1, duration: 1}, {delay: DURATIONS.BURST, value: 0, duration: 1}],
    scaleX: {
        value: 1.25,
        duration: DURATIONS.BURST / 2,
        delay: DURATIONS.BURST / 2,
        easing: 'easeInCubic',
    },
    translateX: [
        {value: '-=200', duration: DURATIONS.BURST / 2, easing: 'easeOutCubic'},
        {value: '+=192', duration: DURATIONS.BURST / 2, easing: 'easeInCubic'},
    ],
    r: [{value: 2.5, duration: 400}, {value: 30, delay: 400, duration: DURATIONS.BURST}]
};

timeline
    .add(leftSlice, 0)
    .add(rightSlice, 0)
    .add(leftFill, 0)
    .add(rightFill, 0)
    .add(burst, TIME.SLIDE);