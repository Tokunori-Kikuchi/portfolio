/*==================================
トップへ戻るボタン
==================================*/
$(function() {
    var pagetop = $('#page_top');
    //ボタン非表示
    pagetop.hide();
    //80pxスクロールしたらボタン表示
    $(window).scroll(function() {
        if($(this).scrollTop() > 80) {
            pagetop.fadeIn();
        // 画面がトップから80pxより上ならボタンを表示しない
        }else{
            pagetop.fadeOut();
        }
    });
    // ボタンをクリックしたらスクロールしてトップに戻る
    pagetop.click(function() {
        $('body, html').animate({scrollTop: 0}, 500);
        return false;
    });
});

/*==================================
main-visualのスライドアニメーション
==================================*/
const mainSwiper = new Swiper('.main-swiper', {
    // Optional parameters (スライドのループ)
    /* direction: 'vertical', */ //ドットボタンの位置を垂直にする
    loop: true,

    // If we need pagination (ドットボタン)
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    //Navigation arrows (画像送りのアローアイコン)
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar (スクロールバー)
    /* scrollbar: {
        el: '.swiper-scrollbar',
    } */
});

/*==================================
cardのスライドアニメーション
==================================*/
const cardSwiper = new Swiper('.card-swiper', {
    // Navigation arrows
    navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
    },

    // Pagination
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },

    // Optional parameters
    loop: true,
    // 何枚表示させるか
    slidesPerView: 1,
    // スペースをどの程度あけるか
    spaceBetween: 28,
    // 何枚目から表示させるか
    initialSlide: 1,

    breakpoints: {
        // ブラウザサイズ1024px以上
        1024: {
            slidesPerView: 3,
            spaceBetween: 28,
            initialSlide:1,
        },
        // ブラウザサイズ768px以上
        768: {
            slidesPerView: 2,
            spaceBetween: 28,
            initialSlide:1,
        },

    },
});

/*==================================
ハンバーガーメニュー
==================================*/
$(function() {
    $('.drawer').on('click', function() { // drawerをクリックすると以下の処理を行う
        $(this).toggleClass('is-active'); // drawerにis-activeクラスを付与
        $('.drawer__menu').toggleClass('is-active'); // drawer__menuにis-activeクラスを付与
        $('.drawer__background').toggleClass('is-active'); // drawer__backgroundにis-activeクラスを付与
    });
});

/*==================================
フルスクリーンメニュー

$(function() {
    $('.fullscreen').on('click', function() { // fullscreenをクリックすると以下の処理を行う
        $(this).toggleClass('is-active'); // fullscreenにis-activeクラスを付与
        $('.fullscreen__menu').toggleClass('is-active'); // fullscreen__menuにis-activeクラスを付与
        $('.fullscreen__background').toggleClass('is-active'); // fullscreen__backgroundにis-activeクラスを付与
    });
});
==================================*/

/*============================================================================
ヘッダー、フッターの各セクションをクリックするとページ内リンクにアニメーションで移動する
=============================================================================*/
// #から始まるURLがクリックされたとき
jQuery('a[href^="#"]').click(function() {
    // headerクラスがついた要素の高さを取得
    let header = jQuery(".header").innerHeight();
    // 移動速度を指定（ミリ秒）
    let speed = 300;
    // hrefで指定されたidを取得
    let id = jQuery(this).attr("href");
    // idの値が#のみの場合→ターゲットをhtmlタグにしてトップへ戻る
    let target = jQuery("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得し、ヘッダー分の高さ引く
    let position = jQuery(target).offset().top - header;
    // ターゲットの位置までspeed速度で移動
    jQuery("html, body").animate(
        {
            scrollTop: position
        },
        speed
    );
    return false;
});

/*====================================================================
ページ内リンクでクリックした要素に下線を引く（クリックイベントの処理）
その１
jQuery('.header__nav li a').click(function() {
    jQuery('.header__nav li a').removeClass('is-active');
    jQuery(this).addClass('is-active');
    return false;
});

その２
$(function() {
    $('.header__nav li a').on('click', function() { // drawerをクリックすると以下の処理を行う
        $('.header__nav li a').removeClass('is-active'); // drawerにis-activeクラスを付与
        $(this).addClass('is-active'); // drawer__menuにis-activeクラスを付与
    });
});


/*====================================================================
jQueryを使わず、pure JavaScriptでページ内リンクでクリックした要素に下線を引く（クリックイベントの処理）
====================================================================*/
const navLinks = document.querySelectorAll('.header__nav li a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        navLinks.forEach(function(link) {
            link.classList.remove('is-active');
        });
        this.classList.add('is-active');
    });
});

/*==================================
タブメニュー
==================================*/
jQuery('.tab__nav ul li span').click(function(e) {
    e.preventDefault();
    let target = jQuery(this).data('target');

    jQuery('.tab__nav ul li span').removeClass('is-active');
    jQuery(this).addClass('is-active');

    jQuery('.tab-item').removeClass('is-active');
    jQuery(target).addClass('is-active');

    return false;
});

/*==================================
アコーディオン

// .accordion__headの要素を取得して、各要素にクリックイベントを追加
var accordionHeads = document.querySelectorAll('.accordion__head');
accordionHeads.forEach(function(accordionHead) {
    accordionHead.addEventListener('click', function() {

        // クリックされた要素の次の要素を取得して、slideToggle()を実行
        var accordionBody = this.nextElementSibling;
        accordionBody.style.display = accordionBody.style.display === 'none' ? 'block' : 'none';

        // クリックされた要素の子要素である.accordion__iconにis-openクラスをトグル
        var accordionIcon = this.querySelector('.accordion__icon');
        accordionIcon.classList.toggle('is-open');
    });
});
==================================*/
/*==================================
アコーディオン1
==================================*/
jQuery('.accordion__head').click(function() {
    jQuery(this).next().slideToggle();
    jQuery(this).children('.accordion__icon').toggleClass('is-open');
});

/*==================================
アコーディオン2
==================================*/
jQuery('.accordion-y__head').click(function() {
    jQuery(this).next().slideToggle();
    jQuery(this).children('.accordion-y__icon').toggleClass('is-open');
});

/*==================================
モーダルウィンドウ

$(function() {
    $("#main img").click(function() {
        winScrollTop = $(window).scrollTop(); //スクロール位置を取得
        $("#modal").html($(this).prop('outerHTML'));
        $("#modal").fadeIn(200);
        //return false; ←a要素の場合追加する
    });
    $("#modal, #modal img").click(function() {
        $("#modal").fadeOut(200);
        $('body,html').stop().animate({scrollTop:winScrollTop}, 100); //画像をクリックしたときのスクロール位置まで戻る処理
        //return false; ←a要素の場合追加する
    });
});
==================================*/

/*==================================
モーダルウィンドウ（プライバシーポリシー）
==================================*/
jQuery('.js-modal-open').click(function(e) {
    e.preventDefault();
    //data-以下が「target」になってる属性の値（for-modal）を取得
    let target = jQuery(this).data("target");
    //targetの値と同じクラス名を持った要素に.is-showクラスを追加する
    jQuery('.' + target).addClass('is-show');

    return false
});

jQuery('.js-modal-close').click(function(e) {
    e.preventDefault();
    //data-以下が「target」になってる属性の値（for-modal）を取得
    let target =jQuery(this).data("target");
    //targetの値と同じクラス名を持った要素から.is-showクラスを除去する
    jQuery('.' + target).removeClass('is-show');
});