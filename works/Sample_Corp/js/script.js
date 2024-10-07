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
ハンバーガーメニュー drawer.js
==================================*/
$(document).ready(function() {
  $('.drawer').drawer();
});

// ハンバーガーボタンクリックでアイコンが右から左にスライドする
const drawerHamburger = document.querySelector('.drawer-hamburger');
const drawerRight = document.querySelector('.drawer--right');
const drawerHamburgerIcon = document.querySelector('.drawer-hamburger-icon');
const drawerBackground = document.querySelector('.drawer__background');

drawerHamburger.addEventListener('click', () => {
  if (drawerRight.classList.contains('is-active')) {
    drawerRight.classList.remove('is-active');
    drawerHamburgerIcon.classList.remove('is-active');
    drawerBackground.classList.remove('is-active');
  } else {
    drawerRight.classList.add('is-active');
    drawerHamburgerIcon.classList.add('is-active');
    drawerBackground.classList.add('is-active');
  }
});

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



/*==================================
アコーディオンボタン
==================================*/
jQuery('.accordion__head').click(function() {
  jQuery(this).next().slideToggle();
  jQuery(this).children('.accordion__icon').toggleClass('is-open');
});

/*==================================
swiper.js
==================================*/
const swiper = new Swiper('.swiper', {
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
  slidesPerView: 2,
  // スペースをどの程度あけるか
  spaceBetween: 20,
  // 何枚目から表示させるか
  initialSlide: 1,

  breakpoints: {
    // ブラウザサイズ768px以上
    768: {
      slidesPerView: 3,
      spaceBetween: 35,
      initialSlide: 1,
    }
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});

/*==================================
アニメーション wow.js
==================================*/
new WOW().init();

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

/*==================================
google form
==================================*/
let $form = $('#js-form');

$form.submit(function(e) {
    $.ajax({
     url: $form.attr('action'),
     data: $form.serialize(),
     type: "POST",
     dataType: "xml",
     statusCode: {
        0: function() {
          //送信に成功したときの処理
          $form.slideUp(),
          $('#js-success').slideDown();
        },
        200: function() {
          //送信に失敗したときの処理
          $form.slideUp(),
          $('#js-error').slideDown();
        }
      }
    });
    return false;
  });

// formの入力確認
let $submit = $('#js-submit');
$('#js-form input').on('change', function() {
  if(
    $('#js-form input[type="text"]').val() !== ""
  ) {
     // すべて入力されたとき
      $submit.prop('disabled', false),
      $submit.addClass('-active')
    } else {
      // 入力されていないとき
      $submit.prop('disabled', true),
      $submit.removeClass('-active')
   }
});


