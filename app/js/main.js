// SLIDER
const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
    paused = false;
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if (n > items.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = items.length;
    }
    items.forEach((item) => {
      item.style.display = 'none';
    });
    items[slideIndex - 1].style.display = 'block';
  }
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }
  const prevBtn = document.querySelector(prev);
  const nexBtn = document.querySelector(next);
  prevBtn.addEventListener('click', () => {
    plusSlides(-1);
  });
  nexBtn.addEventListener('click', () => {
    plusSlides(1);
  });

  function animationControl() {
    paused = setInterval(function () {
      plusSlides(1);
    }, 5000);
  }

  animationControl();

  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener('mouseleave', () => {
    animationControl();
  });
};

// SLIDER

// TABS
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);
  // active = document.querySelector(activeClass);

  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = 'none';
      tab.forEach((item) => {
        item.classList.remove(activeClass);
      });
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = 'block';
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  header.addEventListener('click', (e) => {
    const target = e.target;
    if (
      target.classList.contains(tabSelector.replace(/\./, '')) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))
    ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};
// TABS

// SCROLL
const scrolling = (ups) => {
  window.addEventListener('scroll', () => {
    const item = document.querySelector(ups);
    if(document.documentElement.scrollTop > 1200) {
      item.style.opacity = '1';
    } else {
      item.style.opacity = '0'
    }
  });

// SCROLLING WITH RAF

let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.2;
links.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    let widthTop = document.documentElement.scrollTop, 
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
    requestAnimationFrame(step);
    function step(time) {
      if(start === null) {
        start = time
      }

      let progress = time - start
          r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

          document.documentElement.scrollTo(0 , r);
          if(r != widthTop + toBlock){
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
    }
  })
})

// SCROLLING WITH RAF

  // PURE JS SCROLLING

  // const element = document.documentElement,
  //     body =  document.body;
  // const calcScroll = () => {
  //   const item = document.querySelector(ups);
  //   item.addEventListener('click', function(event) {
  //     let scrollTop = Math.round( body.scrollTop || element.scrollTop);
  //     if(this.hash !== '') {
  //       event.preventDefault();
  //       let hashElement = document.querySelector(this.hash),
  //           hashElementTop = 0;
  //       while (hashElement.offsetParent) {
  //         hashElementTop += hashElement.offsetTop;
  //         hashElement = hashElement.offsetParent;
  //       }  
  //       hashElementTop = Math.round(hashElementTop);
  //       smoothScroll(scrollTop, hashElementTop, this.hash);         
  //     }
  //   })
  // }
  //   const smoothScroll = (from, to, hash) => {
  //     let timeInterval = 1,
  //         prevScrollTop,
  //         speed;

  //         if(to > from) {
  //           speed = 30;
  //         } else {
  //           speed = -30;
  //         }

  //         let move = setInterval(function()  {
  //           let scrollTop = Math.round(body.scrollTop || element.scrollTop);

  //           if(
  //             prevScrollTop === scrollTop ||
  //             (to > from && scrollTop >= to) ||
  //             (to < from && scrollTop <= to)
  //           ) {
  //             clearInterval(move);
  //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
  //           } else {
  //             body.scrollTop += speed;
  //             element.scrollTop += speed; 
  //             prevScrollTop = scrollTop;
  //           }
  //         }, timeInterval);
  //   }
  //   calcScroll();

  // PURE JS SCROLLING
}
// SCROLL


window.addEventListener('DOMContentLoaded', () => {
  sliders('.slide', '', '.prev', '.next');
  sliders('.slide-person', '', '.prevperson', '.nextperson');
  tabs('.main-tabs', '.item-tabs', '.summary', 'active');
  scrolling('.up');
});

// class Slider {
//   constructor({ container = null, btns = null, next = null, prev = null } = {}) {
//     this.container = document.querySelector(container);
//     this.btns = document.querySelectorAll(btns);
//     this.prev = document.querySelector(prev);
//     this.next = document.querySelector(next);
//     this.slides = this.container.children;
//     this.slideIndex = 1;
//   }
// }

// class MiniSlider extends Slider {
//   constructor(container, next, prev) {
//     super(container, next, prev);
//   }
//   bindTriggers() {
//     this.next.addEventListener('click', () => {
//       this.container.appendChild(this.slides[0]);
//     });
//     this.prev.addEventListener('click', () => {
//       let active = this.slides[this.slides.length - 1];
//       this.container.insertBefore(active, this.slides[0]);
//     });
//   }
//   init() {
//     this.container.style.cssText = `
//       // display: flex;
//       // flex-wrap: wrap;
//       // overflow: hidden;
//       // align-item: flex-start;
//     `;
//     this.bindTriggers();
//   }
// }

// window.addEventListener('DOMContentLoaded', () => {
//   // const slider = new Slider('.page', 'next');
//   // slider.render();
//   const firstSlider = new MiniSlider({
//     container: '.slideshow-container',
//     prev: '.prev',
//     next: '.next',
//   });

//   firstSlider.init();
//   const personSlider = new MiniSlider({
//     container: '.person-slide',
//     prev: '.prevperson',
//     next: '.nextperson',
//   });
//   personSlider.init();
// });

// // SLIDER
// var slideIndex = 1;
// var slideIndexPer = 1;
// showSlides(slideIndex);
// showSlidesPer(slideIndexPer);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function next() {
//   this.plusSlides(1);
// }

// function prev() {
//   this.plusSlides(-1);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("slide");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   slides[slideIndex - 1].style.display = "block";
// }

// // SLIDER

// // SLIDER-PERSON

// function plusSlidesPer(n) {
//     showSlidesPer(slideIndexPer += n);
// }

// function nextperson() {
//   this.plusSlidesPer(1);
// }

// function prevperson() {
//   this.plusSlidesPer(-1);
// }

// function currentSlidePer(n) {
//     showSlidesPer(slideIndexPer = n);
// }

// function showSlidesPer(n) {
//   var i;
//   var slidesPer = document.getElementsByClassName("slide-person");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slidesPer.length) {
//     slideIndexPer = 1;
//   }
//   if (n < 1) {
//     slideIndexPer = slidesPer.length;
//   }
//   for (i = 0; i < slidesPer.length; i++) {
//     slidesPer[i].style.display = "none";
//   }
//   slidesPer[slideIndexPer - 1].style.display = "block";
// }
