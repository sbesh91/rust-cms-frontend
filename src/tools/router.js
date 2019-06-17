import { isDynamic, getArticle, load, routes } from '../app';

import {
  generatePageTransitionAnimation
} from 'tools';


const navigate = async (path) => {
  const page = path === '/' ? '/' : path.slice(1);
  
  if (isDynamic(page)) {
    await import('../pages/home/index')
    getArticle(page);
  } else {
    await load(page);
  }
  
};

const route = (href) => {
  window.history.pushState({}, '', href);
  viewChange(window.location);
}

let currentLocation = "unset";

async function animateViewChange(node, first, method, direction = 'forwards', axis = 'Y') {
  const duration = direction === 'forwards' ? 800 : 0;
  const curve = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  const animationTimingConfig = {
    fill: 'none',
    easing: curve,
    duration: duration
  };

  const top = document.querySelector('#top svg');
  const bottom = document.querySelector('#bottom svg');
  const transition = document.querySelector('#transition');

  let topFrames;
  let bottomFrames;
  let transitionFrames;
  let frames;

  const rotate = -35;
  const skew = -65;
  const translateOut = 10;
  const translateIn = 5;
  const slide = 1;

  if (direction === 'forwards') {


    topFrames = [
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(${translateIn}rem, 0)`, opacity: 0 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)`, opacity: .7, offset: .3 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)`, opacity: .5, offset: .6 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)`, opacity: .2, offset: .75 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(${translateOut}rem, 0)`, opacity: .1, offset: .95 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(${translateOut}rem, 0)`, opacity: 0 },
    ];

    bottomFrames = [
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(-${translateIn}rem, 0)`, opacity: 0 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)`, opacity: .7, offset: .3 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)`, opacity: .5, offset: .6 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)`, opacity: .2, offset: .75 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(-${translateOut}rem, 0)`, opacity: .1, offset: .95 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg)  translate(-${translateOut}rem, 0)`, opacity: 0 },
    ];

    transitionFrames = [
      { opacity: 0 },
      { opacity: 1, offset: .1 },
      { opacity: 1, offset: .8 },
      { opacity: 0 }
    ];

    frames = [
      { transform: `translateY(${slide}rem)`, opacity: 0 },
      { transform: `translateY(${slide}rem)`, opacity: 0, offset: .9 },
      { transform: `none`, opacity: 1 }
    ]
  } else {
    topFrames = [
      
    ];

    bottomFrames = [

    ];

    transitionFrames = [

    ];

    frames = [
      { transform: `none`, opacity: 1 },
      { transform: `translateY(${slide}rem)`, opacity: 0 }
    ];
  }

  const fadeTransition = transition.animate(transitionFrames, {
    duration: duration,
    fill: 'forwards'
  });
  const topAnimation = top.animate(topFrames, animationTimingConfig);
  const bottomAnimation = bottom.animate(bottomFrames, animationTimingConfig);
  const animation = node.animate(frames, {
    duration: duration + 300,
    easing: curve,
    fill: 'forwards'
  });
  
  animation.onfinish = onFinish(node, direction);

  return Promise.all([fadeTransition.finished, topAnimation.finished, bottomAnimation.finished, animation.finished]);
}

function onFinish(node, direction) {
  return () => {
    if (direction === 'forwards') {
      node.style.opacity = 1;
    } else {
      node.style.opacity = 0;
    }
  };
}

const manageDomViewChange = async (first = false, method = 'add', direction = 'forwards',  pathname = location.pathname) => {
  if (isDynamic(pathname)) {
    const dynamic = document.querySelector('article-page');

    if (direction === 'forwards') dynamic.classList[method]('active');
    
    if (first) {
      generatePageTransitionAnimation(dynamic, direction);
    } else {
      await animateViewChange(dynamic, first, method, direction);
    }

    if (direction === 'backwards') { 
      dynamic.classList[method]('active'); 
      document.dispatchEvent(new CustomEvent('unload-article'));
    }
    
  } else {
    
    try {
      const view = document.querySelector(routes[pathname].selector);
      
      generatePageTransitionAnimation(view, direction);
      view.classList[method]('active');


      if (method === 'add') {
        view.setAttribute('loaded', true);
      }
    } catch (error) {
      route('/not-found'); 
    }
  }
};

const viewChange = async (location) => {
  if (currentLocation === "unset") {
    await navigate(window.decodeURIComponent(location.pathname));
    
    await manageDomViewChange(true);

    currentLocation = location.pathname;
    return;
  }

  await manageDomViewChange(false, 'remove', 'backwards', currentLocation);

  // toss up a spinner

  await navigate(window.decodeURIComponent(location.pathname));
  currentLocation = location.pathname;
  
  await manageDomViewChange()
};

export {
  viewChange,
  navigate,
  route
}