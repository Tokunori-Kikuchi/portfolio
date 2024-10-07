/* ドロワーメニュー（コース一覧） */
$(function() {
    $('#toggle').on("click",function() {
        $(".toggle-list").slideToggle();
    });
});

/*  トップへ戻るボタン　*/
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

/* コース一覧をクリックすると色が変化 */
$('#drawer-menu').on('click', function(){
    $(this).toggleClass('isActive');
  })

/* モーダルウィンドウ  */
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