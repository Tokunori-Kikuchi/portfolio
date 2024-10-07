/*==================================
アコーディオンメニュー（クリックで開閉）
==================================*/
$(function() {
    $('#toggle').on("click", function(event) {
        event.preventDefault(); // スクロール先で#toggleが付与されているトグルボタンをクリックしてもトップに戻らない
        $(".toggle-list").slideToggle();
    });

    // メニュー項目がクリックされたときにページの移動を行う
    $('.toggle-list a').on("click", function(event) {
        // デフォルトのクリック動作をキャンセル
        event.preventDefault();
        // クリックされたリンクの href 属性値を取得
        var target = $(this).attr("href");
        // 800msecかけてスクロールして移動
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 800);
        // アコーディオンメニューを閉じる
        $(".toggle-list").slideDown();
    });
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
            pagetop.fadeIn(300);
        // 画面がトップから80pxより上ならボタンを表示しない
        }else{
            pagetop.fadeOut(300);
        }
    });
    // ボタンをクリックしたらスクロールしてトップに戻る
    pagetop.click(function() {
        $('body, html').animate({scrollTop: 0}, 500);
        return false;
    });
});

/*==================================
モーダルウインドウ
==================================*/
$(function() {
    $("#menu-list img").click(function() {
        winScrollTop = $(window).scrollTop(); //スクロール位置を取得
        $("#modal").html($(this).prop('outerHTML'));
        $("#modal").fadeIn(500);
        //return false; ←a要素の場合追加する
    });
    $("#modal, #modal img").click(function() {
        $("#modal").fadeOut(500);
        $('body,html').stop().animate({scrollTop:winScrollTop}, 100); //画像をクリックしたときのスクロール位置まで戻る処理
        //return false; ←a要素の場合追加する
    });
});