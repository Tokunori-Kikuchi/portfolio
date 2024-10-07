
/*==================================
ハンバーガーメニュー drawer.js
==================================*/
$(document).ready(function() {
    $('.drawer').drawer();
});

/*============================================================================
スムーズスクロール（ヘッダー、フッターの各セクションをクリックするとページ内リンクにアニメーションで移動する）
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
$('#js-form input, #js-form textarea').on('change', function() {
  if(
    $('#js-form input[type="text"]').val() !== "" &&
    $('#js-form input[type="email"]').val() !== "" &&
    $('#js-form input[name="entry.561298916"]').prop('checked') === true
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
