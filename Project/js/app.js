function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let textColor = '#999999';
let headingCOlor = '#012C7B';

//Функция переключения табов в разделах

function thetabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, tabsPrevSelector, tabsNexSelector) {

    let thetabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector),
        tabsPrev = document.querySelector(tabsPrevSelector);
        tabsNext = document.querySelector(tabsNexSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        thetabs.forEach(item => {
            item.classList.remove(activeClass);
            item.setAttribute('style', `color: ${textColor}`);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        thetabs[i].setAttribute('style', `color: ${headingCOlor}`);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', e => {
        const target = e.target;
        if(target && target.classList.contains(tabsSelector.slice(1))) {
            thetabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                } 
            });
        }
    });
    let i = 0;

    tabsPrev.addEventListener('click', () => {
        hideTabContent(i);
        i = (i > 0) ? i - 1: tabsContent.length - 1;
        showTabContent(i);
    });

    tabsNext.addEventListener('click', () => {
        hideTabContent(i);
        i = (i < (tabsContent.length - 1) ? i + 1 : 0);
        showTabContent(i);
    });
    
}
thetabs('.nav-more__tab', '.tabcontent', '.nav-more__tabs', '.nav-more__tab-active', '.left-arrow', '.right-arrow');
thetabs('.nav-more__tab-pipe', '.tabcontent-pipe', '.nav-more__tabs-pipe', '.nav-more__tab-active', '.left-arrow-pipe', '.right-arrow-pipe');
thetabs('.nav-more__tab-valve', '.tabcontent-valve', '.nav-more__tabs-valve', '.nav-more__tab-active', '.left-arrow-valve', '.right-arrow-valve');
thetabs('.nav-more__tab-mount', '.tabcontent-mount', '.nav-more__tabs-mount', '.nav-more__tab-active', '.left-arrow-mount', '.right-arrow-mount');

// Свернуть развернуть раздел

function collapseExpand (upperSelector, upperASelector, arrowExpendSelector, hidesBlockSelector) {
    let upperBtn = document.querySelectorAll(upperSelector);
    let hidesBlock = document.querySelector(hidesBlockSelector);
    let upperBtnA = document.querySelectorAll(upperASelector);
    let arrowExpend = document.querySelectorAll(arrowExpendSelector);

    function changeCollapseExpand () {
        upperBtn.forEach(item => {
            item.addEventListener('click', function (e) {
                hidesBlock.classList.toggle('hide');

                upperBtnA.forEach(item => {
                    if (item.innerHTML === 'Подробнее') {
                        item.innerHTML = "Свернуть";
                    }else {
                        item.innerHTML = 'Подробнее';
                    }
                }); 
                
                arrowExpend.forEach(item => {
                    if (item.classList.contains('arrow-rollup')) {
                        item.classList.remove('arrow-rollup');
                    } else {
                        item.classList.add('arrow-rollup');
                    }
                });
            });
        });
    }
    changeCollapseExpand ();

}

collapseExpand('.collapseExpend', '.with-a', '.arrow-expend', '.hides-block');
collapseExpand('.collapseExpend-pipe', '.with-a-pipe', '.arrow-expend-pipe', '.hides-block-pipe');
collapseExpand('.collapseExpend-valve', '.with-a-valve', '.arrow-expend-valve', '.hides-block-valve');
collapseExpand('.collapseExpend-mount', '.with-a-mount', '.arrow-expend-mount', '.hides-block-mount');


// Функция подтягивания инфы товаров в модалку товаров

let smallImagePlace = document.querySelector('.about__good-bottom'),
    bigImagePlace = document.querySelector('.about__good-top'),
    headImage = document.querySelector('.pipe-good__heading');

let modalImgSmall1 = document.createElement('img');
    modalImgSmall1.className = 'text-img-small';

let modalImgSmall2 = document.createElement('img');
    modalImgSmall2.className = 'text-img-small';

let modalImgBig1 = document.createElement('img');
    modalImgBig1.className = 'text-img-big';

let modalImgBig2 = document.createElement('img');
    modalImgBig2.className = 'text-img-big';

    smallImagePlace.insertAdjacentElement('afterbegin', modalImgSmall2);
    smallImagePlace.insertAdjacentElement('afterbegin', modalImgSmall1);
    
    bigImagePlace.insertAdjacentElement('afterbegin', modalImgBig2);
    bigImagePlace.insertAdjacentElement('afterbegin', modalImgBig1);
    
let goodBlock = document.querySelectorAll('.pipe-good');
let popupGoodsTitle = document.querySelector('.popup-goods-title');
    


function block () {
    goodBlock.forEach(item => {
        item.addEventListener('click', () => {
            let image = item.querySelector('img');
            let imageSource = image.getAttribute('src').slice(13, -4);
            let blockHeading = item.querySelectorAll('.pipe-good__heading');

            modalImgSmall1.src = 'img/easyflex/' + imageSource + '-large1.png';
            modalImgSmall2.src = 'img/easyflex/' + imageSource + '-large2.png';
            
            modalImgBig1.src = 'img/easyflex/' + imageSource + '-large1.png';
            modalImgBig2.src = 'img/easyflex/' + imageSource + '-large2.png';

            function changePopupContent () {
                let popupGoodPrice = document.querySelector('.popup__price-block_price');
                let popupGoodText = document.querySelector('.popup__text-content');
                for (let i = 0; i < db.goods.length; i++) {
                    // popupGoodsTitle.innerHTML = db.goods[i].header;
                    // console.log(db.goods[i].header);
                    blockHeading.forEach(item => {
                        if (item.textContent === db.goods[i].header) {
                            popupGoodsTitle.textContent = db.goods[i].header;
                            popupGoodText.textContent = db.goods[i].about_text;
                            popupGoodPrice.textContent = db.goods[i].price;
                        }
                    });
                }
                
            }
            changePopupContent ();
        });
    });
}
block ();

// Функция ховер эффекта на превью картинок в модалке

function hover () {
    let target = document.querySelectorAll('.text-img-small');
    target.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            e.preventDefault;
            if (item.getAttribute('src').includes('1') === true) {
                modalImgBig1.style.display = 'block';
                modalImgBig2.style.display = 'none';
            } else {
                modalImgBig1.style.display = 'none';  
                modalImgBig2.style.display = 'block'; 
            }
            
        });
    });
}

hover();


// Кнопка "НАВЕРХ"
let goTopBtn = document.querySelector('.back_to_top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.style.opacity = "1";
    }
    if (scrolled < coords) {
        goTopBtn.style.opacity = "0";
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -40);
      setTimeout(backToTop, 0.5);
    }
  }


  // //Отправка формы
function _(id){ return document.getElementById(id); }

function submitForm(){
    _("mybtn").disabled = true;
    _("status").innerHTML = 'please wait ...';
    var formdata = new FormData();
    formdata.append( "userName", _("userName").value );
    formdata.append( "userEmail", _("userEmail").value );
    formdata.append( "userPhone", _("userPhone").value );
    formdata.append( "userMessage", _("userMessage").value );
    var ajax = new XMLHttpRequest();
    ajax.open( "POST", "sendmail.php" );
    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4 && ajax.status == 200) {
            if(ajax.responseText == "success"){
                _("my_form").innerHTML = '<h2>Спасибо.</h2><p>Ваш запрос отправлен.</p>';
            } else {
                _("status").innerHTML = ajax.responseText;
                _("mybtn").disabled = false;
            }
        }
    }
    ajax.send( formdata );
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
/*
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
*/
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
//Spollers
let spollers = document.querySelectorAll("._spoller");
if (spollers.length > 0) {
	for (let index = 0; index < spollers.length; index++) {
		const spoller = spollers[index];
		spoller.addEventListener("click", function (e) {
			if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
				return false;
			}
			if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
				return false;
			}
			if (spoller.closest('._spollers').classList.contains('_one')) {
				let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
				for (let i = 0; i < curent_spollers.length; i++) {
					let el = curent_spollers[i];
					if (el != spoller) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling);
					}
				}
			}
			spoller.classList.toggle('_active');
			_slideToggle(spoller.nextElementSibling);
		});
	}
}
//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//=================
//SearchInList
function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//Popups
let popup_link = document.querySelectorAll('.popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		console.log(1)
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}

	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/'+ video +'?autoplay=1&modestbranding=1&showinfo=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		}																								
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(800);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which == 27) {
		popup_close();
	}
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//========================================
//Animate
function animate({ timing, draw, duration }) {
	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}
function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}
function makeEaseInOut(timing) {
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}
function quad(timeFraction) {
	return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
function form_submit(e) {
	let btn = event.target;
	let form = btn.closest('form');
	let message = form.getAttribute('data-message');
	let error = form_validate(form);
	if (error == 0) {
		//SendForm
		form_clean(form);
		if (message) {
			popup_open('message-' + message);
			e.preventDefault();
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		event.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				datepicker(input, {
					customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}


let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}




let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	//scr_body.setAttribute('data-scroll', pageYOffset);
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (src_value > 10) {
		header.classList.add('_scroll');
	} else {
		header.classList.remove('_scroll');
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}

	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}

	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}

function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}

//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			// ВЫЧИСЛИТЬ!!!
			let current_scroll = pageYOffset;//parseInt(scr_body.getAttribute('data-scroll'));
			//
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			let block_pos;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_prev) {
					let current_block_prev_height = current_block_prev.offsetHeight;
					block_pos = offset(current_block_prev).top;
					if (current_block_height <= viewport_height) {
						if (current_block_prev_height >= viewport_height) {
							block_pos = block_pos + (current_block_prev_height - viewport_height);
							full_scroll_to_sector(block_pos);
						}
					} else {
						enableScroll();
						if (current_scroll <= current_block_pos) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pagestart();
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_next) {
					block_pos = offset(current_block_next).top;
					if (current_block_height <= viewport_height) {
						full_scroll_to_sector(block_pos);
					} else {
						enableScroll();
						if (current_scroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pageend();
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		const block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}

//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) {}


//Слайдер для Блок вентилятора
let slider_block = new Swiper('.swiper-container__block', {
	/*
	effect: 'fade',
	*/
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	draggable: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: '.swiper-pagination__block',
		clickable: true,
	},
	// Arrows
	// navigation: {
	// 	nextEl: '.about__more .more__item_next',
	// 	prevEl: '.about__more .more__item_prev',
	// },
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// }
});

// Слайдер для Регулирующие клапаны
let slider_valve = new Swiper('.swiper-container__valve', {
	/*
	effect: 'fade',
	*/
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	draggable: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: '.swiper-pagination__valve',
		clickable: true,
	},
	// Arrows
	// navigation: {
	// 	nextEl: '.about__more .more__item_next',
	// 	prevEl: '.about__more .more__item_prev',
	// },
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// }
});

// Слайдер для Регулирующие клапаны
let slider_collector = new Swiper('.swiper-container__collector', {
	/*
	effect: 'fade',
	*/
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	draggable: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: '.swiper-pagination__collector',
		clickable: true,
	},
	// Arrows
	// navigation: {
	// 	nextEl: '.about__more .more__item_next',
	// 	prevEl: '.about__more .more__item_prev',
	// },
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// }
});

// Слайдер для Приложение для Healthbox
let slider_app = new Swiper('.swiper-container__app', {
	/*
	effect: 'fade',
	*/
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	draggable: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: '.swiper-pagination__app',
		clickable: true,
	},
	// Arrows
	// navigation: {
	// 	nextEl: '.about__more .more__item_next',
	// 	prevEl: '.about__more .more__item_prev',
	// },
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// }
});

// Слайдер в pipe не требуется (воздуховоды)




let db = {
    "goods": [
        {
            "img": 'img/easyflex/goods__pipe-flexible-ellipse.png',
            "img_large_1": 'img/easyflex/goods__pipe-flexible-ellipse-large1.png',
            "img_large_2": 'img/easyflex/goods__pipe-flexible-ellipse-large2.png',
            "img_alt": '',
            'header': 'Гибкий воздуховод овального сечения',
            "about_text": 'Гибкий воздуховод из полиэтилена PE с внешним диаметром 140 х 64 мм и эквивалентным внутренним диаметром 90 мм. Гладкая внутренняя стенка воздуховода с двойной стенкой оснащена антистатическими и антибактериальными добавками для предотвращения накопления пыли и появления бактерий. Ограничение по высоте форма (140 х 64 мм.)позволяют легко устанавливать в фальшстену, потолки, бетон или стяжку. Тихая работа системы воздуховодов достигается за счет большого объема перемещаемого воздушного потока в сочетании с низкой скоросnью.',
            'price': '~ 1 000 руб.'
        },
        {
            "img": "img/easyflex/goods__pipe-ellipse.png",
            "img_large_1": "img/easyflex/goods__pipe-ellipse-large1.png",
            "img_large_2": "img/easyflex/goods__pipe-ellipse-large2.png",
            "img_alt": "Овальный воздуховод (соединительный)",
            'header': "Овальный воздуховод (соединительный)",
            "about_text": "Данный тип воздуховода используется для соединения более длинных участков. Представляет собой гибкий воздуховод easyflex  длиной 350мм. с прорезиненными уплотнителями с двухсторон.Гладкая внутренняя поверхность воздуховода обработа специальным антибактериальным и антистатическим покрытием для предотвращения скапливания пыли и роста бактерий.",
            "price": "~ 2 300 руб."
        },
        {
            "img": "img/easyflex/goods__pipe-flexible.png",
            "img_large_1": "img/easyflex/goods__pipe-flexible-large1.png",
            "img_large_2": "img/easyflex/goods__pipe-flexible-large2.png",
            "img_alt": "Гибкий воздуховод Rensen Flexible",
            'header': "Гибкий воздуховод Rensen Flexible",
            "about_text": "Данный тип воздуховода используется для соединения более длинных участков. Представляет собой гибкий воздуховод easyflex  длиной 350мм. с прорезиненными уплотнителями с двухсторон. Гладкая внутренняя поверхность воздуховода обработа специальным антибактериальным и антистатическим покрытием для предотвращения скапливания пыли и роста бактерий. Доступен в двух вариантах: d80 или d125 мм.",
            "price": "~ 1 600 руб."
        },
        {
            "img": "img/easyflex/goods__pipe-circle.png",
            "img_large_1": "img/easyflex/goods__pipe-circle-large1.png",
            "img_large_2": "img/easyflex/goods__pipe-circle-large2.png",
            "img_alt": "Жесткий воздуховод круглого сечения",
            'header': "Жесткий воздуховод круглого сечения",
            "about_text": "Данный тип воздуховода используется для соединения более длинных участков. Представляет собой гибкий воздуховод easyflex  длиной 350мм. с прорезиненными уплотнителями с двухсторон. Гладкая внутренняя поверхность воздуховода обработа специальным антибактериальным и антистатическим покрытием для предотвращения скапливания пыли и роста бактерий. Доступен в двух вариантах: d80 или d125 мм.",
            "price": "~ 1 300 руб."
        },
        {
            'img': 'img/easyflex/goods__horizontal-adapter.png',
            "img_large_1": "img/easyflex/goods__horizontal-adapter-large1.png",
            "img_large_2": "img/easyflex/goods__horizontal-adapter-large2.png",
            "img_alt": 'Горизонтальный адаптер c d125 на плоский овал',
            'header': 'Горизонтальный адаптер c d125 на плоский овал',
            'about_text': 'Предназначен для перехода с плоского овала на круглый канал. Диаметр Ø 125 мм используется для помещений с расходом вытяжки 50 м³/ч. Вытяжные решетки могут быть напрямую подключены к прямому редуктору, если он установлен на стене. Адаптеры также могут использоваться в качестве переходного элемента между плоскими овальными каналами и круглыми.',
            'price': '~ 2 200 руб.'
        },
        {
            'img': "img/easyflex/goods__vertical-adapter.png",
            "img_large_1": "img/easyflex/goods__vertical-adapter-large1.png",
            "img_large_2": "img/easyflex/goods__vertical-adapter-large2.png",
            "img_alt": "Вертикальный переходник 90гр",
            'header': "Вертикальный переходник 90гр",
            'about_text': 'Резкие повороты лучше всего делать с помощью гибкого канала Easyflex,  если это невозможно, то можно использовать фиксированные изгибные элементы, такие как вертикальный отвод 90°. Данные элементы используются по той причине, что при монтаже гибких воздуховод, необхожимо избегать их резких изгибов.',
            'price': "~ 1 400 руб."
        },
        {
            'img': "img/easyflex/goods__horizontal-tap.png",
            "img_large_1": "img/easyflex/goods__horizontal-tap-large1.png",
            "img_large_2": "img/easyflex/goods__horizontal-tap-large2.png",
            "img_alt": "Горизонтальный отвод 90гр",
            'header': "Горизонтальный отвод 90гр",
            'about_text': 'Резкие повороты лучше всего делать с помощью гибкого канала Easyflex,  если это невозможно, то можно использовать фиксированные изгибные элементы, такие как вертикальный отвод 90°. Данные элементы используются по той причине, что при монтаже гибких воздуховод, необхожимо избегать их резких изгибов.',
            'price': "~ 1 400 руб."
        },
        {
            'img': "img/easyflex/goods__corner-adapter.png",
            "img_large_1": "img/easyflex/goods__corner-adapter-large1.png",
            "img_large_2": "img/easyflex/goods__corner-adapter-large2.png",
            "img_alt": "Угловой адаптер 90гр на плоский овал",
            'header': "Угловой адаптер 90гр на плоский овал",
            'about_text': "Резкие повороты лучше всего делать с помощью гибкого канала Easyflex,  если это невозможно, то можно использовать фиксированные изгибные элементы, такие как вертикальный отвод 90°. Данные элементы используются по той причине, что при монтаже гибких воздуховод, необхожимо избегать их резких изгибов.",
            'price': "~ 2 000 руб."
        },
        {
            'img': "img/easyflex/goods__cross-adapter.png",
            "img_large_1": "img/easyflex/goods__cross-adapter-large1.png",
            "img_large_2": "img/easyflex/goods__cross-adapter-large2.png",
            "img_alt": "Крестовый переходник для овального воздуховода",
            'header': "Крестовый переходник для овального воздуховода",
            'about_text': "С помощью крестового переходника можно прокладывать пересечения каналов воздуховодов с высотой 65 мм. Опция поворота позволяет выбрать угол, под которым воздуховоды будут пересекать друг друга. Для прокладки воздуховодов под углом 90гр не требуется дополнительных поворотов. С помощью опции “поворот” у крестового переходника можно изменять угол пересечения от 45гр до 135гр. Использование крестового переходника позволяет преодолевать препятствия высотой до 3 см.",
            'price': "~ 5 500 руб."
        },
        {
            'img': "img/easyflex/goods__junction-box.png",
            "img_large_1": "img/easyflex/goods__junction-box-large1.png",
            "img_large_2": "img/easyflex/goods__junction-box-large2.png",
            "img_alt": "Распределительная коробка на 6 каналов",
            'header': "Распределительная коробка на 6 каналов",
            'about_text': "Распределительная коробка, где отвод d160 мм. расположен под углом 90 градусов, к плоскости коробки, к ней можно подключить до 6 вентиляционных каналов. К распределительной коробке можно подсоединить приточные и вытяжные воздуховоды, которые напрямуюподключаются к коробке с помощью металлических скоб (идут в комплекте). Небольшая высота коробки без проблем позволяет устанавливать её в стяжку, бетон, спрятать ее в стену и т.д.",
            'price': "~ 7 200 руб."
        },
        {
            'img': "img/easyflex/goods__junction-box-straight.png",
            "img_large_1": "img/easyflex/goods__junction-box-straight-large1.png",
            "img_large_2": "img/easyflex/goods__junction-box-straight-large2.png",
            "img_alt": "Распределительная коробка на 6 каналов (прямая)",
            'header': "Распределительная коробка на 6 каналов (прямая)",
            'about_text': "Распределительная коробка, где отвод d160 мм. расположен  расположен в  плоскости коробки, к ней можно подключить до 6 вентиляционных каналов. К распределительной коробке можно подсоединить приточные и вытяжные воздуховоды, которые напрямуюподключаются к коробке с помощью металлических скоб (идут в комплекте). Небольшая высота коробки без проблем позволяет устанавливать её в стажку, бетон, спрятать ее в стену и т.д.",
            'price': "~ 7 200 руб."
        },
        {
            'img': "img/easyflex/goods__junction-box-eight.png",
            "img_large_1": "img/easyflex/goods__junction-box-eight-large1.png",
            "img_large_2": "img/easyflex/goods__junction-box-eight-large2.png",
            "img_alt": "Распределительная коробка на 8 каналов",
            'header': "Распределительная коробка на 8 каналов",
            'about_text': "Приток в распределительный блок можно обеспечить с помощью двух каналов Easyflex и к нему можно подключить до 6 каналов. Таким образом, распределительаня коробка может быть размещена по центру и не связана напрямую с основным воздуховодом. К распределительной коробке можно подсоединить приточные и вытяжные воздуховоды, которые напрямуюподключаются к коробке с помощью металлических скоб (идут в комплекте). Небольшая высота коробки без проблем позволяет устанавливать её в стажку, бетон, спрятать ее в стену и т.д.",
            'price': "~ 6 800 руб."
        },
        {
            'img': "img/easyflex/goods__Y-tee.png",
            "img_large_1": "img/easyflex/goods__Y-tee-large1.png",
            "img_large_2": "img/easyflex/goods__Y-tee-large2.png",
            "img_alt": "Y-тройник (с двух в один)",
            'header': "Y-тройник (с двух в один)",
            'about_text': "С помощью Y-тройника можно соединить 2 (Два) вентиляционных канала в один. Таким образом, можно вентилировать два пространства через один основной канал. При реализации подобного подключения, рекомендуется использовать рамки-фланцы для вентиляционных решеток с клапаном бабочкой, для регулировки расхода воздуха.",
            'price': "~ 3 500 руб."
        },
        {
            'img': "img/easyflex/goods__dual-adapter.png",
            "img_large_1": "img/easyflex/goods__dual-adapter-large1.png",
            "img_large_2": "img/easyflex/goods__dual-adapter-large2.png",
            "img_alt": "Двойной адаптер на d125",
            'header': "Двойной адаптер на d125",
            'about_text': "Переходник для бесшовного соединения фланцев вентиляционных решеток с системой воздуховодов. Двойные адаптеры используются для помещений. где требуется повышенная вентиляция и большой расход воздуха. Фланцы вентиляционных решеток могут непсредственно соединяться с воздуховодами (стена из гипсокартона) или с использованием переходника на другом тпе поверхности (например, стена из бетона). Адаптер можно использовать для соединения плоских воздуховодов овального сечения с круглым.",
            'price': "~ 3 200 руб."
        },
        {
            'img': "img/easyflex/goods__horizontal-dual-adapter.png",
            "img_large_1": "img/easyflex/goods__horizontal-dual-adapter-large1.png",
            "img_large_2": "img/easyflex/goods__horizontal-dual-adapter-large2.png",
            "img_alt": "Горизонтальный двойной адаптер на d125",
            'header': "Горизонтальный двойной адаптер на d125",
            'about_text': "Переходник для бесшовного соединения фланцев вентиляционных решеток с системой воздуховодов. Двойные адаптеры используются для помещений. где требуется повышенная вентиляция и большой расход воздуха. Фланцы вентиляционных решеток могут непсредственно соединяться с воздуховодами (стена из гипсокартона) или с использованием переходника на другом тпе поверхности (например, стена из бетона). Адаптер можно использовать для соединения плоских воздуховодов овального сечения с круглым.",
            'price': "~ 3 200 руб."
        },
        {
            'img': "img/easyflex/goods__сlutch-ellipse.png",
            "img_large_1": "img/easyflex/goods__сlutch-ellipse-large1.png",
            "img_large_2": "img/easyflex/goods__сlutch-ellipse-large2.png",
            "img_alt": "Соединительная муфта, овал",
            'header': "Соединительная муфта, овал",
            'about_text': "Соединительная муфта овального сечения с двумя двойными резиновыми уплотнителями, благодаря которым в системе воздуховодов Easyflex достигается почти идеальная герметичность, то есть вероятность утечки воздуха втрое меньше, чем в других системах. Соединение может быть усилено с помощью фиксации на защелки или металлические скобы.",
            'price': "~ 300 руб."
        },
        {
            'img': "img/easyflex/goods__clutch-circle.png",
            "img_large_1": "img/easyflex/goods__clutch-circle-large1.png",
            "img_large_2": "img/easyflex/goods__clutch-circle-large2.png",
            "img_alt": "Соединительная муфты, круг",
            'header': "Соединительная муфты, круг",
            'about_text': "Соединительная муфта круглого сечения (d80 или d125) с двумя двойными резиновыми уплотнителями, благодаря которым в системе воздуховодов Easyflex достигается почти идеальная герметичность, то есть вероятность утечки воздуха втрое меньше, чем в других системах. Соединение может быть усилено с помощью фиксации на защелки или металлические скобы.",
            'price': "~ 400 руб."
        },
        {
            'img': "img/easyflex/goods__lock.png",
            "img_large_1": "img/easyflex/goods__lock-large1.png",
            "img_large_2": "img/easyflex/goods__lock-large2.png",
            "img_alt": "Защелка для овальных воздуховодов",
            'header': "Защелка для овальных воздуховодов",
            'about_text': "Специальные защелки для быстрого крепления воздуховодов Easyflex, защелки всегда устанавливаются попарно. К монтажной поверхности защелки крепятся с помощью винтов или бетонных штифтов. Крепление воздуховодов с помощью защелок значительно упрощает процесс монтажа. Например, при фиксации к потолку - одна защелка крепится к потолку, а затем воздуховод легко закрепляется к ней с помощью второй защелки без инструментов.",
            'price': "~ 100 руб."
        },
        {
            'img': "img/easyflex/goods__bracket.png",
            "img_large_1": "img/easyflex/goods__bracket-large1.png",
            "img_large_2": "img/easyflex/goods__bracket-large2.png",
            "img_alt": "Скоба монтажная, металлическая",
            'header': "Скоба монтажная, металлическая",
            'about_text': "Скоба монтажная используется для крепления воздуховодов Easyflex и их составных частей. К монтажной поверхности скобы крепятся с помощью винтов или бетонных штифтов.",
            'price': "~ 100 руб"
        },
        {
            'img': "img/easyflex/goods__ventilation-outlet.png",
            "img_large_1": "img/easyflex/goods__ventilation-outlet-large1.png",
            "img_large_2": "img/easyflex/goods__ventilation-outlet-large2.png",
            "img_alt": "Вентиляционный выход на кровле Vilpe",
            'header': "Вентиляционный выход на кровле Vilpe",
            'about_text': "Существует различное множество вентиляционных выходов производства компании VILPE, зависит от диаметра воздуховода, типа материала на кровле, поэтому, прежде чем приобретать систему - обсудите подробности со специалистом, где мы разберем какой вариант подходит именно вам.",
            'price': "~ 9 100 руб."
        },
        {
            'img': "img/easyflex/goods__pass-through-element.png",
            "img_large_1": "img/easyflex/goods__pass-through-element-large1.png",
            "img_large_2": "img/easyflex/goods__pass-through-element-large2.png",
            "img_alt": "Проходной элементы кровли VILPE",
            'header': "Проходной элементы кровли VILPE",
            'about_text': "Идеально подходит для уплотнения просветов при установке вентиляционного выхода. У производителя существуют различные варианты цвета и типа. Данный продукт используется исключительной для кровли со скатом.",
            'price': "~ 1 200 руб."
        },
        {
            'img': "img/easyflex/goods__roof-hatch.png",
            "img_large_1": "img/easyflex/goods__roof-hatch-large1.png",
            "img_large_2": "img/easyflex/goods__roof-hatch-large2.png",
            "img_alt": "Кровельный люк для выхода на крышу Vilpe",
            'header': "Кровельный люк для выхода на крышу Vilpe",
            'about_text': "Для удобство выхода на кровлю и осуществления различного рода обслуживающих кровлю работ. Кровельный люк для натуральной черепицы, металлочерепицы и фальцевой кровли. Технический (пожарный) люк для доступа в подкровельное пространство и на крышу. Размеры: отверстие 654х656 мм, общий размер 1180х900х243 мм. Комплект: кровельный люк, UNIROOF уплотнитель гидрозатвора, уплотнитель (Булпрен) 30х80 мм -3 шт., монтажная инструкция, двусторонняя клейкая лента и набор крепежа.",
            'price': "~ 10 000 руб."
        },
        {
            'img': "img/easyflex/goods__ventilation-grid.png",
            "img_large_1": "img/easyflex/goods__ventilation-grid-large1.png",
            "img_large_2": "img/easyflex/goods__ventilation-grid-large2.png",
            "img_alt": "Сетка вентиляционной решетки",
            'header': "Сетка вентиляционной решетки",
            'about_text': "Сетка вентиляционной решётки выполняет роль москитной сетки при использовании в системе естественной вентиляции. Используется вместе с вентиляционной решёткой какого же размера. Выполнена в сером цвете в двух размерных вариантах: 150 х 150 и 240 х 240 ",
            'price': "~ 450 руб."
        },
        {
            'img': "img/easyflex/goods__external-ventilation-grate.png",
            "img_large_1": "img/easyflex/goods__external-ventilation-grate-large1.png",
            "img_large_2": "img/easyflex/goods__external-ventilation-grate-large2.png",
            "img_alt": "Наружная вентиляционная решетка",
            'header': "Наружная вентиляционная решетка",
            'about_text': "Вентиляционная решетка выполняет декартивную роль. Представлена в нескольких цветовых вариантах (красный, бежевый, белый). Может быть окрашена в цвет фасада.",
            'price': "~ 800 руб."
        },
        {
            'img': "img/easyflex/goods__internal-ventilation-grilles.png",
            "img_large_1": "img/easyflex/goods__internal-ventilation-grilles-large1.png",
            "img_large_2": "img/easyflex/goods__internal-ventilation-grilles-large2.png",
            "img_alt": "Внутренние вентиляционные решетки",
            'header': "Внутренние вентиляционные решетки",
            'about_text': "Завершающий декоративный элемент, который скроет от глазах отверстие канала в каждом из помещений,  где осуществляется вытяжка загрязненного воздуха. Решетка производства Бельгия.",
            'price': "~ 1 400 руб."
        },
        {
            'img': "img/easyflex/goods__timer-switch.png",
            "img_large_1": "img/easyflex/goods__timer-switch-large1.png",
            "img_large_2": "img/easyflex/goods__timer-switch-large2.png",
            "img_alt": "Таймер выключатель для клапана",
            'header': "Таймер выключатель для клапана",
            'about_text': "Таймер/включатель VILPE Renson для клапана 'Кух.вытяжка'. Для любителей классического способа регулирования скорости воздушного потока в вытяжке.",
            'price': "~ 11 000 руб."
        },
        {
            'img': "img/easyflex/goods__switch.png",
            "img_large_1": "img/easyflex/goods__switch-large1.png",
            "img_large_2": "img/easyflex/goods__switch-large2.png",
            "img_alt": "Таймер выключатель для клапана",
            'header': "Таймер выключатель для клапана",
            'about_text': "3-ч позиционный переключатель для адаптивной системы вентиляции Healthbox 3. Идеально подходит для любителей консервативных ситлей управления, тех, кому не нравится управлять системой вентиляции со смартфона. ",
            'price': "~ 5 500 руб."
        },
        {
            'img': "img/easyflex/goods__kitchen-hood.png",
            "img_large_1": "img/easyflex/goods__kitchen-hood-large1.png",
            "img_large_2": "img/easyflex/goods__kitchen-hood-large2.png",
            "img_alt": "Вытяжной элемент для кухни Odormatic",
            'header': "Вытяжной элемент для кухни Odormatic",
            'about_text': "Настенная кухонная вытяжка ОК-6 ETNA. Управление: сенсорное, ЖК дисплей. Количество скоростей: 4. Освещение LED: 2х2 Вт Размеры: 60 см Материал: металл со стеклянной панелью. Настроена под ЕCo-вентилятор VILPE.  Есть функция 'зимний старт', активирована после включения вытяжки, вентилятор работает на максимальной скорости в течение 20 сек после старта. Таймер: 9 мин. Дистанционное управление (пульт).",
            'price': "~ 35 000 руб"
        },
        {
            'img': "img/easyflex/goods__anemostat.png",
            "img_large_1": "img/easyflex/goods__anemostat-large1.png",
            "img_large_2": "img/easyflex/goods__anemostat-large2.png",
            "img_alt": "Анемостат (регулирующий клапан)",
            'header': "Анемостат (регулирующий клапан)",
            'about_text': "Доступен в 4 различных версиях: Вытяжной клапан, регулирующий воздушный поток (либо из плстика, либо из аллюминия. Приточный клапан, также, либо из пластика, либо из алюминия. Конструкция: рамка-основание + передняя панель. Выступает от потолка или стены всего на 24мм. Имеет прямое соеднинение с воздуховодами через соединительную муфту d125. Оснащен звукопоглощающим материалом.",
            'price': "~ 4 200 руб."
        }
    ]       
};

