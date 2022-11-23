$(document).scroll(function () {
    $('#sidebar_cus').animate({ top: $(this).scrollTop() }, 10, "linear");
})
$(document).ready(function () {
    $('#sidebar_cus').css('padding', '0');
})


$('.sidebar-menu').hover(function () {
    //$('#sidebar_cus').css('margin-top', '16px');
    //$('#sidebar_cus').removeClass('col-lg-1');
    //$('#sidebar_cus').css('position', 'absolute');
    //$('#sidebar_cus').css('z-index', '1000');
    //$('#sidebar_cus').css('height', 'auto');
    //$('#sidebar_cus').css('padding-bottom', '15px');
    //$('#sidebar_cus').css('transition', 'all 0.3s');
    //$('#mainContent').removeClass('col-lg-9');
    //$('#mainContent').addClass('col-lg-10');
    //$('#mainContent').css('padding-left', 'calc(100% / 12 + 15px) ');
    //$('.child_menu').css('display', 'block');
    //$('li.nav-item > a.sidebar-link > span.title').text('DANH MỤC');
})
$('.sidebar-menu').mouseleave(function () {

    //$('#sidebar_cus').css('height', '200px');
    //$('#sidebar_cus').css('margin-top', '0');
    //$('#sidebar_cus').addClass('col-lg-1');
    //$('#sidebar_cus').css('position', '');
    //$('#sidebar_cus').css('z-index', '');
    //$('#sidebar_cus').css('background', '');
    //$('#mainContent').removeClass('col-lg-12');
    //$('#mainContent').addClass('col-lg-11');
    //$('#mainContent').css('padding-left', '');
    //$('.child_menu').css('display', 'none');
    //$('li.nav-item > a.sidebar-link > span.title').text('DANH MỤC');

})


$('#change_password').off('click').on('click', function () {
    $('#change_pwd_modal').modal('show');
})
$('#change_pwd_save').off('click').on('click', function () {
    var old_pass = $('#old_pass').val();
    var new_pass = $('#new_pass').val();
    var renew_pass = $('#renew_pass').val();

    if (old_pass == "" || new_pass == "" || renew_pass == "") {
        alert('Nhập đầy đủ các thông tin !');
        return;
    }
    if (new_pass != renew_pass) {
        alert('Mật khẩu xác nhận không khớp');
        return;
    }
    if (confirm('Bạn muốn đổi mật khẩu ?')) {
        $.ajax({
            url: '/Login/ChangePwd',
            type: 'get',
            dataType: 'json',
            data: {
                old_pass: old_pass,
                new_pass: new_pass
            },
            success: function (res) {
                if (res.status) {
                    alert('Đổi mật khẩu thành công');
                    $('#change_pwd_modal').modal('hide');
                }
                else {
                    alert('Mật khẩu cũ không đúng !');
                    return;
                }
            }
        })
    }
})
