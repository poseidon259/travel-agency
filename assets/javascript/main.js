const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnCategory = $('.header__menu-item');
const headerCategory = $('.header__category');
btnCategory.addEventListener('click', function() {
    headerCategory.classList.toggle('active');
    headerCategory.classList.toggle('hide');
})


// Event Click on Bars

const btnBarsOpen = $('.bars__open');
const btnBarsClose = $('.bars__close');
const barsTab = $('.bars__tab');

btnBarsClose.addEventListener('click', function(e) {
    e.stopPropagation();
    //barsTab.classList.remove('active');
    barsTab.style.width = '0';
})

btnBarsOpen.addEventListener('click', function() {
   // barsTab.classList.add('active');
   barsTab.style.width = '46rem';
})

// Event Click on Element Bar Mobile and Tablet

const elementBars = $$('.header__category-item');
const childElementBar = $$('.category__m-t');
const arrowRight = $$('.header__category-item .fa-angle-right');
const arrowDown = $$('.header__category-item .fa-angle-down');

for(let i = 0; i < elementBars.length; i++) {
    elementBars[i].addEventListener('click', function() {
        if(getComputedStyle(childElementBar[i]).display === 'none') {
            childElementBar[i].style.display = 'block';
            arrowRight[i].style.display = 'none';
            arrowDown[i].style.display = 'block';
        } else {
            childElementBar[i].style.display = 'none';
            arrowRight[i].style.display = 'block';
            arrowDown[i].style.display = 'none';
        }
    }) 
}


// Slider
const btnNext = $('.btn__move-next');
const btnPrev = $('.btn__move-prev');
const listSlide = $$('.slideshow');
let countSlide = 0;

btnNext.addEventListener('click', function() {
    countSlide++;
    if(countSlide > listSlide.length - 1) {
        countSlide = 0;
    }
    $('.slideshow.active').classList.remove('active');
    listSlide[countSlide].classList.add('active');
})

btnPrev.addEventListener('click', function() {
    countSlide--;
    if(countSlide < 0) {
        countSlide = listSlide.length - 1;
    }
    $('.slideshow.active').classList.remove('active');
    listSlide[countSlide].classList.add('active');
})

setInterval(function() {
    countSlide++;
    if(countSlide > listSlide.length - 1) {
        countSlide = 0;
    }
    $('.slideshow.active').classList.remove('active');
    listSlide[countSlide].classList.add('active');
}, 10000)


//----------------------------
const travelSubmenu = $$('.checkTravel__sub');
const travelSubmenuItem = $$('.checkTravel__sub-item');

$('.sub1').addEventListener('click', function() {
    if(getComputedStyle(travelSubmenu[0]).display === 'none') {
        travelSubmenu[0].style.display = 'block';
    } else {
        travelSubmenu[0].style.display = 'none';
    }
});


$('.sub2').addEventListener('click', function() {
    if(getComputedStyle(travelSubmenu[1]).display === 'none') {
        travelSubmenu[1].style.display = 'block';
    } else {
        travelSubmenu[1].style.display = 'none';
    }
});

travelSubmenu.forEach((element) => {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
    })
});


travelSubmenuItem.forEach((element) => {
    element.addEventListener('click', function() {
        if(element.parentElement.parentElement.classList.contains('sub1')) {
            $('.sub1 .colorDisplay').classList.remove('colorDisplay');
        } else {
            $('.sub2 .colorDisplay').classList.remove('colorDisplay');
        }

        element.classList.add('colorDisplay');
        element.parentElement.parentElement.childNodes[3].value = element.textContent;
    })
})


//Ghim Category

const locationPin = $('.travel-courses').offsetTop;
const category = $('#category');
const cart = $('.fa-shopping-cart');

window.addEventListener('scroll', function() {
    if(Math.floor(window.scrollY) >= locationPin) {
        category.classList.add('sticky');
        cart.style.display = 'none';
    } else {
        category.classList.remove('sticky');
        cart.style.display = 'block';
    }
})


//Play Video
const btnPlay = $('.parallax-item2 .fa-play');
const modalVideo = $('.modal-parallax');
const videoPlay = $('.modal-parallax video');
btnPlay.addEventListener('click', function(e){
    modalVideo.style.display = 'block';
});

modalVideo.addEventListener('click', function() {
    modalVideo.style.display = 'none';
    videoPlay.pause();
});

videoPlay.addEventListener('click', function(e) {
    e.stopPropagation();
});


//Draggable Slider
const dragSlide = $('.dragSlide');
const cards = $('.cards');
const cards_item = $$('.dragSlide-item');
const btnDragSlider = $$('.moveSlide__item');

let isPressedDown = false;
let cursorXSpace; // vị trí của con trỏ X so với thẻ cards

dragSlide.addEventListener('mousedown', function(e) {
    isPressedDown = true;
    cursorXSpace = e.offsetX - cards.offsetLeft; // cards.offsetLeft vị trí thẻ cards cách thẻ cha

    //e.offsetX là vị trí con trỏ X cách thẻ dragSlide
    dragSlide.style.cursor = 'grab';
});

dragSlide.addEventListener('mouseup', function() {
    dragSlide.style.cursor = 'pointer';
});

window.addEventListener('mouseup', function() {
    isPressedDown = false;
});

dragSlide.addEventListener('mousemove', function(e){
    if(!isPressedDown) return;
    e.preventDefault();
    cards.style.left = `${e.offsetX - cursorXSpace}px`;
    boundCards();
});

function boundCards() {
    const dragSlide_rect = dragSlide.getBoundingClientRect();
    const cards_rect = cards.getBoundingClientRect();

    if(parseInt(cards.style.left) > 0) {
        cards.style.left = 0;
    } else if (cards_rect.right < dragSlide_rect.right) {
        cards.style.left = `-${cards_rect.width - dragSlide_rect.width}px`;
    }

    if(-cards.offsetLeft < cards_item[4].offsetLeft) {
        $('.btnDrag').classList.remove('btnDrag');
        btnDragSlider[0].classList.add('btnDrag');
    }
    
    if(-cards.offsetLeft >= cards_item[4].offsetLeft) {
        $('.btnDrag').classList.remove('btnDrag');
        btnDragSlider[1].classList.add('btnDrag');
    }
    
    if(-cards.offsetLeft >= cards_item[7].offsetLeft) {
        $('.btnDrag').classList.remove('btnDrag');
        btnDragSlider[2].classList.add('btnDrag');
    }
}

//Auto Draggable Slider Function
const cards_rect = cards.getBoundingClientRect();

btnDragSlider[0].addEventListener('click', () => {
    $('.btnDrag').classList.remove('btnDrag');
    btnDragSlider[0].classList.add('btnDrag');
    cards.style.left = 0;
});

btnDragSlider[1].addEventListener('click', () => {
    $('.btnDrag').classList.remove('btnDrag');
    btnDragSlider[1].classList.add('btnDrag');
    cards.style.left = `-${cards_item[4].offsetLeft}px`;
});

btnDragSlider[2].addEventListener('click', () => {
    $('.btnDrag').classList.remove('btnDrag');
    btnDragSlider[2].classList.add('btnDrag');
    cards.style.left = `-${cards_item[7].offsetLeft}px`;
});


let i = 0;
setInterval(()=> {
    if(i > cards_item.length - 5) i = 0;
    cards.style.left = `-${cards_item[i].offsetLeft}px`;

    if(i <= 2) {
        $('.btnDrag').classList.remove('btnDrag');
        btnDragSlider[0].classList.add('btnDrag');
    }
    
    if(i >= 3 && i <= 5) {
        $('.btnDrag').classList.remove('btnDrag');
        btnDragSlider[1].classList.add('btnDrag');
    }
    
    if(i >= 6 && i <= 8) {
        $('.btnDrag').classList.remove('btnDrag');
        btnDragSlider[2].classList.add('btnDrag');
    }
    i++;
}, 10000);


// Members Slider
const membersBtnNext = $('.members__btn-next');
const membersBtnPrev = $('.members__btn-prev');
const listSlideMembers = $$('.members__slide-item');
let countSlide2 = 0;

membersBtnNext.addEventListener('click', function() {
    countSlide2++;
    if(countSlide2 > listSlideMembers.length - 1) {
        countSlide2 = 0;
    }
    $('.members__slide-item.active').classList.remove('active');
    listSlideMembers[countSlide2].classList.add('active');
    listSlideMembers[countSlide2].classList.remove('slideInLeft');
    listSlideMembers[countSlide2].classList.add('slideInRight');
})

membersBtnPrev.addEventListener('click', function() {
    countSlide2--;
    if(countSlide2 < 0) {
        countSlide2 = listSlideMembers.length - 1;
    }
    $('.members__slide-item.active').classList.remove('active');
    listSlideMembers[countSlide2].classList.add('active');
    listSlideMembers[countSlide2].classList.remove('slideInRight');
    listSlideMembers[countSlide2].classList.add('slideInLeft');
})

setInterval(function() {
    countSlide2++;
    if(countSlide2 > listSlideMembers.length - 1) {
        countSlide2 = 0;
    }
    $('.members__slide-item.active').classList.remove('active');
    listSlideMembers[countSlide].classList.add('active');

    listSlideMembers.forEach((element) => {
        element.classList.remove('slideInLeft');
        element.classList.add('slideInRight');
    })
}, 5000)

//Parallax Slider
const parallaxSlide = $('.parallax-slide');
const parallaxCards = $('.parallax-cards');
const card = $$('.card');
const btnParallaxSlide = $$('.moveParallaxSlide__item');

let isPressedDown2 = false;
let cursorXSpace2; // vị trí của con trỏ X so với thẻ cards

parallaxSlide.addEventListener('mousedown', function(e) {
    isPressedDown2 = true;
    cursorXSpace2 = e.offsetX - parallaxCards.offsetLeft; // cards.offsetLeft vị trí thẻ cards cách thẻ cha

    //e.offsetX là vị trí con trỏ X cách thẻ dragSlide
    parallaxSlide.style.cursor = 'grab';
});

parallaxSlide.addEventListener('mouseup', function() {
    parallaxSlide.style.cursor = 'pointer';
});

window.addEventListener('mouseup', function() {
    isPressedDown2 = false;
});

parallaxSlide.addEventListener('mousemove', function(e){
    if(!isPressedDown2) return;
    e.preventDefault();
    parallaxCards.style.left = `${e.offsetX - cursorXSpace2}px`;
    boundCards2();
});

function boundCards2() {
    const parallaxSlide_rect = parallaxSlide.getBoundingClientRect();
    const parallaxCards_rect = parallaxCards.getBoundingClientRect();

    if(parseInt(parallaxCards.style.left) > 0) {
        parallaxCards.style.left = 0;
    } else if (parallaxCards_rect.right < parallaxSlide_rect.right) {
        parallaxCards.style.left = `-${parallaxCards_rect.width - parallaxSlide_rect.width}px`;
    }
}

//Click Parallax Slide

btnParallaxSlide[0].addEventListener('click', () => {
    $('.btnSelect').classList.remove('btnSelect');
    btnParallaxSlide[0].classList.add('btnSelect');
    parallaxCards.style.left = 0;
});

btnParallaxSlide[1].addEventListener('click', () => {
    $('.btnSelect').classList.remove('btnSelect');
    btnParallaxSlide[1].classList.add('btnSelect');
    parallaxCards.style.left = `-${card[4].offsetLeft}px`;
});

btnParallaxSlide[2].addEventListener('click', () => {
    $('.btnSelect').classList.remove('btnSelect');
    btnParallaxSlide[2].classList.add('btnSelect');
    parallaxCards.style.left = `-${card[8].offsetLeft}px`;
});


// Auto Parallax Slide
let k = 0;
setInterval(()=> {
    if(k > card.length - 3) k = 0;
    parallaxCards.style.left = `-${card[k].offsetLeft}px`;

    if(k >= 0 && k <= 3 ) {
        $('.btnSelect').classList.remove('btnSelect');
        btnParallaxSlide[0].classList.add('btnSelect');
    }
    
    if(k >= 4 && k <= 7) {
        $('.btnSelect').classList.remove('btnSelect');
        btnParallaxSlide[1].classList.add('btnSelect');
    }
    
    if(k >= 8 && k <= 11) {
        $('.btnSelect').classList.remove('btnSelect');
        btnParallaxSlide[2].classList.add('btnSelect');
    }
    k++;
}, 10000);

//
const blogImage = $('.blog__banner');
const blogBanner = $('.blog__banner-content');
window.addEventListener('scroll', function() {
    if(parseInt(window.pageYOffset) >= 6000) {
        blogImage.classList.add('inLeft');
        blogBanner.classList.add('inRight');
    }
});

// Pictures Slider
//Parallax Slider
const picturesSlide = $('.pictures-slide');
const picturesCards = $('.pictures-cards');
const picture = $$('.pictures__card');

let isPressedDown3 = false;
let cursorXSpace3; // vị trí của con trỏ X so với thẻ cards

picturesSlide.addEventListener('mousedown', function(e) {
    isPressedDown3 = true;
    cursorXSpace3 = e.offsetX - picturesCards.offsetLeft; // cards.offsetLeft vị trí thẻ cards cách thẻ cha

    //e.offsetX là vị trí con trỏ X cách thẻ dragSlide
    picturesSlide.style.cursor = 'grab';
});

picturesSlide.addEventListener('mouseup', function() {
    picturesSlide.style.cursor = 'pointer';
});

window.addEventListener('mouseup', function() {
    isPressedDown3 = false;
});

picturesSlide.addEventListener('mousemove', function(e){
    if(!isPressedDown3) return;
    e.preventDefault();
    picturesCards.style.left = `${e.offsetX - cursorXSpace3}px`;
    boundCards3();
});

function boundCards3() {
    const picturesSlide_rect = picturesSlide.getBoundingClientRect();
    const picturesCards_rect = picturesCards.getBoundingClientRect();

    if(parseInt(picturesCards.style.left) > 0) {
        picturesCards.style.left = 0;
    } else if (picturesCards_rect.right < picturesSlide_rect.right) {
        picturesCards.style.left = `-${picture[3].offsetLeft}px`;
    }
}


let h = 0;
setInterval(()=> {
    if(h > picture.length - 5) h = 0;
    picturesCards.style.left = `-${picture[h].offsetLeft}px`;
    h++;

}, 5000);

