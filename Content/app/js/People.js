$(document).ready(function () {
    $(".all-people .panel-footer").click(function () {
        $("#all-people").slideToggle()
       
        // có thẻ tạo hàm sau khi show hoặc hide
        return false;
    });
});