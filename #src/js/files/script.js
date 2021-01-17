
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