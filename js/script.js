/*============================================================================
ヘッダー、フッターの各セクションをクリックするとページ内リンクにアニメーションで移動する
=============================================================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      // デフォルトのリンク動作を無効化
      e.preventDefault();

      // hrefで指定されたidを取得
      let id = this.getAttribute("href");

      // idの値が#のみの場合→ターゲットをhtmlタグにしてトップへ戻る
      let target = id === "#" ? document.documentElement : document.querySelector(id);

      // ページのトップを基準にターゲットの位置を取得し、ヘッダー分の高さ引く
      let position = target.getBoundingClientRect().top + window.scrollY;

      // ターゲットの位置までスクロール（アニメーションの速度は300ms）
      window.scrollTo({
          top: position,
          behavior: "smooth"
      });
  });
});

/*==================================
トップへ戻るボタン
==================================*/
document.addEventListener('DOMContentLoaded', function() {
  var pagetop = document.getElementById('page_top');
  // ボタン非表示
  pagetop.style.display = 'none';

  // スクロールイベントを監視
  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 80) {
          // ボタンが現れる（フェードイン風）
          pagetop.style.display = 'block';
          pagetop.style.opacity = 1;
          pagetop.style.transition = 'opacity 0.5s';
      } else {
          // ボタンが消える（フェードアウト風）
          pagetop.style.opacity = 0;
          pagetop.style.transition = 'opacity 0.5s';
          setTimeout(function() {
              pagetop.style.display = 'none';
          }, 500);  // フェードアウトが終わるまで非表示にしない
      }
  });

  // ボタンをクリックしたらトップにスクロール
  pagetop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
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
// フォーム、送信ボタン、プライバシーチェックボックスの要素を取得
const form = document.getElementById('js-form');
const submitButton = document.getElementById('js-submit');
const privacyCheckbox = document.querySelector('.contact-privacy-input');

// 各要素が存在するか確認してからイベントリスナーを設定
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // フォーム送信時の処理
  });
} else {
  console.error("フォームが見つかりません");
}

if (privacyCheckbox) {
  privacyCheckbox.addEventListener('change', function() {
    checkForm();
  });
} else {
  console.error("プライバシーチェックボックスが見つかりません");
}

// フォーム送信時の処理
form.addEventListener('submit', function(e) {
  // フォームのデフォルトの送信動作をキャンセル
  e.preventDefault();

  // AJAXリクエストを作成するためにXMLHttpRequestを使用
  const xhr = new XMLHttpRequest();
  // フォームのaction属性にあるURLにPOSTリクエストを送信
  xhr.open('POST', form.getAttribute('action'), true);
  // フォームデータをURLエンコード形式で送信することを指定
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // リクエストのステータスが変わるたびに呼び出される関数
  xhr.onreadystatechange = function() {
    // リクエストが完了したかどうかを確認
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // ステータスが0の場合（通信成功時の処理）
      if (xhr.status === 0) {
        // フォームを非表示にし、成功メッセージを表示
        form.style.display = 'none';
        document.getElementById('js-success').style.display = 'block';
      // ステータスが200の場合（通信失敗時の処理）
      } else if (xhr.status === 200) {
        // フォームを非表示にし、エラーメッセージを表示
        form.style.display = 'none';
        document.getElementById('js-error').style.display = 'block';
      }
    }
  };

  // フォームデータをシリアライズ（URLエンコード形式に変換）してリクエストを送信
  const formData = new URLSearchParams(new FormData(form)).toString();
  xhr.send(formData); // フォームデータをPOSTリクエストとして送信
});

// フォーム内の入力や選択が変更されたときに呼び出されるイベントリスナーを設定
form.querySelectorAll('input, textarea, select').forEach(function(element) {
  element.addEventListener('change', function() {
    // フォームの入力状態を確認して送信ボタンを有効/無効にする関数を実行
    checkForm();
  });
});

// プライバシーチェックボックスの変更時に実行される処理
privacyCheckbox.addEventListener('change', function() {
  // チェックボックスの状態に応じて送信ボタンの状態を更新
  checkForm();
});

// フォームの入力状況を確認してボタンの状態を切り替える関数
function checkForm() {
  // フォーム内の必須項目がすべて入力されているかを確認
  const allFilled = Array.from(form.querySelectorAll('.required input, .required textarea, .required select')).every(function(input) {
    return input.value !== ''; // 入力値が空でないかを確認
  });

  // プライバシーチェックボックスがチェックされているかを確認
  const isPrivacyChecked = privacyCheckbox.checked;

  // 全ての必須項目が入力され、プライバシーチェックボックスがチェックされていれば送信ボタンを有効化
  if (allFilled && isPrivacyChecked) {
    submitButton.disabled = false; // ボタンを有効化
    submitButton.classList.add('-active'); // クラスを追加してボタンの見た目を変更
  } else {
    // どれか一つでも条件を満たしていない場合は送信ボタンを無効化
    submitButton.disabled = true; // ボタンを無効化
    submitButton.classList.remove('-active'); // ボタンの見た目を戻す
  }
}

form.querySelectorAll('input, textarea, select').forEach(function(element) {
  element.addEventListener('change', function() {
    // フォームの入力状態を確認して送信ボタンを有効/無効にする関数を実行
    checkForm();
  });
});

// プライバシーチェックボックスの変更時に実行される処理
privacyCheckbox.addEventListener('change', function() {
  // チェックボックスの状態に応じて送信ボタンの状態を更新
  checkForm();
});

// フォームの入力状況を確認してボタンの状態を切り替える関数
function checkForm() {
  // フォーム内の必須項目がすべて入力されているかを確認
  const allFilled = Array.from(form.querySelectorAll('.required input, .required textarea, .required select')).every(function(input) {
    return input.value !== ''; // 入力値が空でないかを確認
  });

  // プライバシーチェックボックスがチェックされているかを確認
  const isPrivacyChecked = privacyCheckbox.checked;

  // 全ての必須項目が入力され、プライバシーチェックボックスがチェックされていれば送信ボタンを有効化
  if (allFilled && isPrivacyChecked) {
    submitButton.disabled = false; // ボタンを有効化
    submitButton.classList.add('-active'); // クラスを追加してボタンの見た目を変更
  } else {
    // どれか一つでも条件を満たしていない場合は送信ボタンを無効化
    submitButton.disabled = true; // ボタンを無効化
    submitButton.classList.remove('-active'); // ボタンの見た目を戻す
  }
}

form.querySelectorAll('input, textarea, select').forEach(function(element) {
  element.addEventListener('change', function() {
    // フォームの入力状態を確認して送信ボタンを有効/無効にする関数を実行
    checkForm();
  });
});

// プライバシーチェックボックスの変更時に実行される処理
privacyCheckbox.addEventListener('change', function() {
  // チェックボックスの状態に応じて送信ボタンの状態を更新
  checkForm();
});

// フォームの入力状況を確認してボタンの状態を切り替える関数
function checkForm() {
  // フォーム内の必須項目がすべて入力されているかを確認
  const allFilled = Array.from(form.querySelectorAll('.required input, .required textarea, .required select')).every(function(input) {
    return input.value !== ''; // 入力値が空でないかを確認
  });

  // プライバシーチェックボックスがチェックされているかを確認
  const isPrivacyChecked = privacyCheckbox.checked;

  // 全ての必須項目が入力され、プライバシーチェックボックスがチェックされていれば送信ボタンを有効化
  if (allFilled && isPrivacyChecked) {
    submitButton.disabled = false; // ボタンを有効化
    submitButton.classList.add('-active'); // クラスを追加してボタンの見た目を変更
  } else {
    // どれか一つでも条件を満たしていない場合は送信ボタンを無効化
    submitButton.disabled = true; // ボタンを無効化
    submitButton.classList.remove('-active'); // ボタンの見た目を戻す
  }
}