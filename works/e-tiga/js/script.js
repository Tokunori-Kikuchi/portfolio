/*====================================================================
ページ内リンクでクリックした要素に下線を引く（header-1）
====================================================================*/
// 使いまわす際、定数名navLinksと付与クラスis-activeを変えること！
const navLinks1 = document.querySelectorAll('.link-1');

navLinks1.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        navLinks1.forEach(function(link) {
            link.classList.remove('is-active-1');
        });
        this.classList.add('is-active-1');
    });
});

/*====================================================================
ページ内リンクでクリックした要素に下線を引く（header-2）
====================================================================*/
// 使いまわす際、定数名navLinksと付与クラスis-activeを変えること！
const navLinks2 = document.querySelectorAll('.link-2');

navLinks2.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        navLinks2.forEach(function(link) {
            link.classList.remove('is-active-2');
        });
        this.classList.add('is-active-2');
    });
});

/*====================================================================
ページ内リンクでクリックした要素に下線を引く（header-3）
====================================================================*/
// 使いまわす際、定数名navLinksと付与クラスis-activeを変えること！
const navLinks3 = document.querySelectorAll('.link-3');

navLinks3.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        navLinks3.forEach(function(link) {
            link.classList.remove('is-active-3');
        });
        this.classList.add('is-active-3');
    });
});

/*====================================================================
ドロワーメニュー
====================================================================*/
//定義
const drawerIcon = document.querySelector("#js-drawer-icon")
const drawerContent = document.querySelector("#js-drawer-content")

//もし、drawerIconの定数が満たされる場合、以下のイベントを実行する。
if (drawerIcon) {
    drawerIcon.addEventListener("click", function(e) {
        e.preventDefault();
        drawerIcon.classList.toggle("is-open");
        drawerContent.classList.toggle("is-open");
    });
}

/*====================================================================
news swiper
====================================================================*/
const newsSwiper = new Swiper('#news-swiper', { //名前を変える
    loop: true, //最後→最初に戻るループ再生を有効に
    autoplay: {
        delay: 3000, //何秒ごとにスライドを動かすか
        stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
        disableOnInteraction: true, //ユーザーの操作時に止める
        reverseDirection: false, //自動再生を逆向きにする
    },
    speed: 1000, //表示切り替えのスピード
    effect: "slide", //切り替えのmotion (※1)
    centeredSlides: true, //中央寄せ
    pagination: {
        el: ".swiper-pagination", //paginationのclass
        clickable: true, //クリックでの切り替えを有効に
        // type: "progressbar" //paginationのタイプ (※2)
        renderBullet: function(index, className) {
            //ページネーションに番号を表示
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    },
    navigation: {
        prevEl: ".swiper-button-prev", //戻るボタンのclass
        nextEl: ".swiper-button-next" //進むボタンのclass
    },
    scrollbar: { //スクロールバーを表示したいとき
        el: ".swiper-scrollbar", //スクロールバーのclass
        hide: true, //操作時のときのみ表示
        draggable: true //スクロールバーを直接表示できるようにする
    },
    allowTouchMove: false, // スワイプで表示の切り替えを無効に
    slidesPerView: 3, // 一度に表示する枚数
    breakpoints: { //画面幅による表示枚数と余白の指定
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        375: {
            slidesPerView: 1,
            spaceBetween: 15,
        },
        600: {
            slidesPerView: 1,
            spaceBetween: 15,
        },
        1025: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1500: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
    }
});

/* ===================================================
※1 effectについて
slide：左から次のスライドが流れてくる
fade：次のスライドがふわっと表示
■ fadeの場合は下記を記述
    fadeEffect: {
        crossFade: true
    },
cube：スライドが立方体になり、3D回転を繰り返す
coverflow：写真やアルバムジャケットをめくるようなアニメーション
flip：平面が回転するようなアニメーション
cards：カードを順番にみていくようなアニメーション
creative：カスタマイズしたアニメーションを使うときに使用します

=======================================================
※2 paginationのタイプ
bullet：スライド枚数と同じ数のドットが表示
fraction：分数で表示（例：1 / 3）
progressbar：スライドの進捗に応じてプログレスバーが伸びる
custom：自由にカスタマイズ

=====================================================*/

/*==================================
アコーディオンメニュー（クリックで開閉）
==================================*/
document.querySelectorAll('.js-accordion').forEach(function(accordion) {
    accordion.addEventListener('click', function (e) {
        e.preventDefault();
        //スライドアップ
        const qaBox = this.parentNode;
        const qaBoxBody = this.nextElementSibling;

        if (qaBox.classList.contains('is-open')) {
            const qaTextHeight = qaBoxBody.scrollHeight;
            let i =  qaTextHeight;
            const scrollInterval = setInterval(function () {
                if (i <= 0) {
                    clearInterval(scrollInterval);
                    qaBox.classList.remove('is-open');
                } else {
                    qaBoxBody.style.maxHeight = i + 'px';
                    i -= 20; //2pxずつ高さを減らす
                }
            }, 50); //インターバルを設定して少しずつ実行
        } else {
            //スライドダウン
            qaBox.classList.add('is-open');
            qaBoxBody.style.maxHeight = qaBoxBody.scrollHeight + 'px'; //スクロールの高さをmaxHeightに設定
        }
    });
});

/*====================================================================
casestudy swiper
====================================================================*/
const casestudySwiper = new Swiper('#casestudy-swiper', { //名前を変える
    loop: true, //最後→最初に戻るループ再生を有効に
    autoplay: {
        delay: 3000, //何秒ごとにスライドを動かすか
        stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
        disableOnInteraction: true, //ユーザーの操作時に止める
        reverseDirection: false, //自動再生を逆向きにする
    },
    speed: 1000, //表示切り替えのスピード
    effect: "slide", //切り替えのmotion (※1)
    centeredSlides: false, //中央寄せ
    pagination: {
        el: ".swiper-pagination2", //paginationのclass
        clickable: true, //クリックでの切り替えを有効に
        // type: "progressbar" //paginationのタイプ (※2)
        // renderBullet: function(index, className) {
        //     //ページネーションに番号を表示
        //     return '<span class="' + className + '">' + (index + 1) + '</span>';
        // }
    },
    navigation: {
        prevEl: ".swiper-button-prev2", //戻るボタンのclass
        nextEl: ".swiper-button-next2" //進むボタンのclass
    },
    scrollbar: { //スクロールバーを表示したいとき
        el: ".swiper-scrollbar", //スクロールバーのclass
        hide: true, //操作時のときのみ表示
        draggable: true //スクロールバーを直接表示できるようにする
    },
    allowTouchMove: false, // スワイプで表示の切り替えを無効に
    slidesPerView: 3, // 一度に表示する枚数
    breakpoints: { //画面幅による表示枚数と余白の指定
        320: {
            slidesPerView: 1.2,
            spaceBetween: 18,
        },
        375: {
            slidesPerView: 1.2,
            spaceBetween: 18,
        },
        600: {
            slidesPerView: 1.2,
            spaceBetween: 18,
        },
        1025: {
            slidesPerView: 3,
            spaceBetween: 18,
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 18,
        },
        1500: {
            slidesPerView: 3,
            spaceBetween: 18,
        },
    }
});

/* ===================================================
※1 effectについて
slide：左から次のスライドが流れてくる
fade：次のスライドがふわっと表示
■ fadeの場合は下記を記述
    fadeEffect: {
        crossFade: true
    },
cube：スライドが立方体になり、3D回転を繰り返す
coverflow：写真やアルバムジャケットをめくるようなアニメーション
flip：平面が回転するようなアニメーション
cards：カードを順番にみていくようなアニメーション
creative：カスタマイズしたアニメーションを使うときに使用します

=======================================================
※2 paginationのタイプ
bullet：スライド枚数と同じ数のドットが表示
fraction：分数で表示（例：1 / 3）
progressbar：スライドの進捗に応じてプログレスバーが伸びる
custom：自由にカスタマイズ

=====================================================*/

/*==================================
タブメニュー
==================================*/
// // jQuery
// jQuery('.company-heading ul li span').click(function(e) {
//     e.preventDefault();
//     let target = jQuery(this).data('target');

//     jQuery('.company-heading ul li span').removeClass('tab-active');
//     jQuery(this).addClass('tab-active');

//     jQuery('.company__item').removeClass('tab-active');
//     jQuery(target).addClass('tab-active');

//     return false;
// });

// JavaScript
document.querySelectorAll('.company-heading ul li span').forEach(span => {
    span.addEventListener('click', function(e) {
        e.preventDefault();

        const target = this.dataset.target;

        document.querySelectorAll('.company-heading ul li span').forEach(span => {
            span.classList.remove('tab-active');
        });
        this.classList.add('tab-active');

        document.querySelectorAll('.company__item').forEach(companyItem => {
            companyItem.classList.remove('tab-active');
        });
        document.querySelector(target).classList.add('tab-active');

        return false;
    });
});