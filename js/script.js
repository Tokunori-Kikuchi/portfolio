

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
トップへ戻るボタン
==================================*/
$(function() {
    var pagetop = $('#page_top');
    //ボタン非表示
    pagetop.hide();
    //80pxスクロールしたらボタン表示
    $(window).scroll(function() {
        if($(this).scrollTop() > 80) {
            pagetop.fadeIn();　// ボタンが現れる時間 （msec）
        // 画面がトップから80pxより上ならボタンを表示しない
        }else{
            pagetop.fadeOut(); // ボタンが消える時間（msec）
        }
    });
    // ボタンをクリックしたらスクロールしてトップに戻る
    pagetop.click(function() {
        $('body, html').animate({scrollTop: 0}, 500);
        return false;
    });
});

/*==================================
ハンバーガーボタンとドロワー
==================================*/
$("#js-button-drawer").on("click", function() {
    $(this).toggleClass("is-checked");
    $("#js-drawer").slideToggle();
    $("body").toggleClass("is-fixed");
});

/*==================================
swiper
==================================*/
const swiperSlides = document.getElementsByClassName("swiper-slide");
const breakPoint = 767; // ブレークポイントを設定
let swiper;
let swiperBool;

window.addEventListener(
  "load",
  () => {
    if (breakPoint < window.innerWidth) {
      swiperBool = false;
    } else {
      createSwiper();
      swiperBool = true;
    }
  },
  false
);

window.addEventListener(
  "resize",
  () => {
    if (breakPoint < window.innerWidth && swiperBool) {
      swiper.destroy(false, true);
      swiperBool = false;
    } else if (breakPoint >= window.innerWidth && !swiperBool) {
      createSwiper();
      swiperBool = true;
    }
  },
  false
);

const createSwiper = () => {
  swiper = new Swiper(".swiper", {
    loop: true, // ループさせる
    speed: 300, // 少しゆっくり(デフォルトは300)

    // ページネーション
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // クリック可能にする
    },
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: window.innerWidth < 768 ? "cube" : "slide", // ここを修正
  });
};

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

  // フォームの入力が変更されたときに実行される処理
  $('#js-form input, #js-form textarea, #js-form select').on('change', function() {
    // 入力項目が空でない場合
    if (
      $('#js-form .required').filter(function() {
        return $(this).find('input, textarea, select').val() === '';
      }).length === 0 &&
      $('#privacy.contact-privacy-input').prop('checked')
    ) {
      // ボタンに -active クラスを追加し、disabled を解除する
      $submit.prop('disabled', false).addClass('-active');
    } else {
      // ボタンから -active クラスを削除し、disabled を付与する
      $submit.prop('disabled', true).removeClass('-active');
    }
  });

  // プライバシーチェックボックスが変更されたときに実行される処理
  $('#privacy.contact-privacy-input').on('change', function() {
    // プライバシーチェックボックスがチェックされているか確認
    if (this.checked) {
      // 入力項目が全て入力されている場合、ボタンに -active クラスを追加し、disabled を解除する
      if (
        $('#js-form .required').filter(function() {
          return $(this).find('input, textarea, select').val() === '';
        }).length === 0
      ) {
        $submit.prop('disabled', false).addClass('-active');
      }
    } else {
      // チェックされていない場合、ボタンから -active クラスを削除し、disabled を付与する
      $submit.prop('disabled', true).removeClass('-active');
    }
  });