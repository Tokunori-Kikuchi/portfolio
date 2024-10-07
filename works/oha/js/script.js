/*==================================
スマホドロワーメニュー
==================================*/
//定義
const drawerIcon = document.querySelector("#js-drawer-icon")
const drawerContent = document.querySelector("#js-drawer-content")

//もし、drawerIconの定数が満たされていれば以下のイベントを動作する。
if (drawerIcon) {
    drawerIcon.addEventListener("click", function(e) {
        e.preventDefault();
        drawerIcon.classList.toggle("is-checked");
        drawerContent.classList.toggle("is-checked");
    });
}

/*==================================
トップへ戻るボタン
==================================*/
document.addEventListener('DOMContentLoaded', function() {
    var BackToHeader = document.getElementById('toHeader');
    var isHidden = true; // ボタンが非表示状態かどうかを示すフラグ

    // ボタンを非表示にする関数
    function hideButton() {
        if (!isHidden) {
            fadeOut(BackToHeader, 500);
            isHidden = true;
        }
    }

    // ボタンを表示する関数
    function showButton() {
        if (isHidden) {
            fadeIn(BackToHeader, 500);
            isHidden = false;
        }
    }

    // ボタンを非表示状態で初期化
    hideButton();

    // スクロール時のイベントリスナー
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            // スクロールが80pxを超えたらボタンを表示
            showButton();
        } else {
            // スクロールが80px以下ならボタンを非表示
            hideButton();
        }
    });

    // ボタンをクリックしたらトップにスクロールする
    BackToHeader.addEventListener('click', function() {
        scrollToTop(500);
    });
});

// 要素を徐々に表示する関数
function fadeIn(element, duration) {
    var interval = 16; // 16ミリ秒ごとに更新
    var opacity = 0;
    var increment = interval / duration;

    var fade = setInterval(function() {
        opacity += increment;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fade);
        }
    }, interval);
}

// 要素を徐々に非表示にする関数
function fadeOut(element, duration) {
    var interval = 16; // 16ミリ秒ごとに更新
    var opacity = 1;
    var decrement = interval / duration;

    var fade = setInterval(function() {
        opacity -= decrement;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fade);
            // element.style.display = 'none'; // この行を削除する
        }
    }, interval);
}

// トップにスクロールする関数
function scrollToTop(duration) {
    var start = window.pageYOffset;
    var startTime = performance.now();

    function scroll() {
        var elapsed = performance.now() - startTime;
        window.scrollTo(0, easeInOut(elapsed, start, -start, duration));
        if (elapsed < duration) {
            requestAnimationFrame(scroll);
        }
    }

    function easeInOut(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scroll);
}

/*==================================
アコーディオンメニュー（クリックで開閉）
==================================*/
// jQuery(".js-accordion").on("click", function(e) {
//     e.preventDefault();

//     if (jQuery(this).parent().hasClass("is-open")) {
//         jQuery(this).parent().addClass("is-open");
//         jQuery(this).next().slideUp();
//     } else {
//         jQuery(this).parent().removeClass("is-open");
//         jQuery(this).next().slideDown();
//     }
// });
document.querySelectorAll('.js-accordion').forEach(function(accordion) {
    accordion.addEventListener('click', function(e) {
        e.preventDefault(); // デフォルトのイベントをキャンセル

        const parent = this.parentNode;
        const content = this.nextElementSibling;

        if (parent.classList.contains('is-open')) {
            // // スライドアップ
            // parent.classList.remove('is-open');
            // content.style.maxHeight = '0'; // コンテンツの高さを0にすることでスライドアップを実現

            // content.style.maxHeight = content.scrollHeight + 'px'; // スライドアップする前の高さを設定
            // parent.classList.remove('is-open');
            // setTimeout(function() {
            //     content.style.maxHeight = '0'; // コンテンツの高さを0にすることでスライドアップを実現
            // }, 10); // 無理やり遅延を追加して、トランジションが再度開始するのを保証

            const height = content.scrollHeight;
            let i = height;
            const interval = setInterval(function() {
                if (i <= 0) {
                    clearInterval(interval);
                    parent.classList.remove('is-open');
                } else {
                    content.style.maxHeight = i + 'px';
                    i -= 10; // 少しずつ高さを減らす
                }
            }, 10); // インターバルを設定して少しずつ実行
        } else {
            // スライドダウン
            parent.classList.add('is-open');
            content.style.maxHeight = content.scrollHeight + 'px'; // スクロールの高さをmaxHeightに設定
        }
    });
});

/*==================================
swiper
==================================*/
const mySwiper = new Swiper('#gallery__swiper', { //名前を変える
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
        // type: "bullet" //paginationのタイプ (※2)
    },
    navigation: {
        prevEl: ".swiper-button-prev", //戻るボタンのclass
        nextEl: ".swiper-button-next" //進むボタンのclass
    },
    // scrollbar: { //スクロールバーを表示したいとき
    //     el: ".swiper-scrollbar", //スクロールバーのclass
    //     hide: true, //操作時のときのみ表示
    //     draggable: true //スクロールバーを直接表示できるようにする
    // },
    allowTouchMove: false, // スワイプで表示の切り替えを無効に
    slidesPerView: 1, // 一度に表示する枚数
    // breakpoints: { //画面幅による表示枚数と余白の指定
    //     320: {
    //         slidesPerView: 1,
    //         spaceBetween: 10,
    //     },
    //     375: {
    //         slidesPerView: 1,
    //         spaceBetween: 15,
    //     },
    //     600: {
    //         slidesPerView: 1,
    //         spaceBetween: 15,
    //     },
    //     1025: {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //     },
    //     1500: {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //     },
    // }
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
modalウィンドウ
==================================*/
// // jQuery
// jQuery(".js-modal-open").on("click", function(e) {
//     e.preventDefault();

//     jQuery("#js-about-modal")[0].showModal();
// });

// jQuery(".js-modal-close").on("click", function(e) {
//     e.preventDefault();

//     jQuery("#js-about-modal")[0].close();
// });

// Javascript
const modalOpenItems = document.querySelectorAll(".js-modal-open");
const modalCloseItems = document.querySelectorAll(".js-modal-close");
const aboutModal = document.querySelector("#js-about-modal");

modalOpenItems.forEach(function (modalOpenItem) {
    modalOpenItem.addEventListener("click", function (e) {
        e.preventDefault();

        if (aboutModal) {
            aboutModal.showModal();
        }
    });
});

modalCloseItems.forEach(function (modalCloseItem) {
    modalCloseItem.addEventListener("click", function (e) {
        e.preventDefault();

        if (aboutModal) {
            aboutModal.close();
        }
    });
});

/*============================================================================
ヘッダー、フッターの各セクションをクリックするとページ内リンクにアニメーションで移動する
=============================================================================*/
// // #から始まるURLがクリックされたとき
// jQuery('a[href^="#"]').click(function() {
//     // headerクラスがついた要素の高さを取得
//     let header = jQuery(".header").innerHeight();
//     // 移動速度を指定（ミリ秒）
//     let speed = 300;
//     // hrefで指定されたidを取得
//     let id = jQuery(this).attr("href");
//     // idの値が#のみの場合→ターゲットをhtmlタグにしてトップへ戻る
//     let target = jQuery("#" == id ? "html" : id);
//     // ページのトップを基準にターゲットの位置を取得し、ヘッダー分の高さ引く
//     let position = jQuery(target).offset().top - header;
//     // ターゲットの位置までspeed速度で移動
//     jQuery("html, body").animate(
//         {
//             scrollTop: position
//         },
//         speed
//     );
//     return false;
// });
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // headerクラスがついた要素の高さを取得
        let header = document.querySelector(".header").clientHeight;
        // 移動速度を指定（ミリ秒）
        let speed = 300;
        // hrefで指定されたidを取得
        let id = this.getAttribute('href');
        // idの値が#のみの場合→ターゲットをhtmlタグにしてトップへ戻る
        let target = document.querySelector(id === "#" ? "html" : id);
        // ページのトップを基準にターゲットの位置を取得し、ヘッダー分の高さ引く
        let position = target.getBoundingClientRect().top + window.pageYOffset - header;

        // ターゲットの位置までspeed速度で移動
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    });
});

/*==================================
画面をフワッと表示させる
==================================*/
const intersectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view")
        } else {
            entry.target.classList.remove("is-in-view")
        }
    });
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
    intersectionObserver.observe(inViewItem);
});