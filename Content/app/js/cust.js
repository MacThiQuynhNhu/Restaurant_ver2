//var iRight =-300;
var Cust = {


    calendar_height: function () {
        var header_banner_h = $(".header_banner").height();
        header_banner_h = header_banner_h == undefined ? 0 : header_banner_h;
        var navbar_h = $(".navbar").height();
        var page_breadcrumbs_h = $(".page-breadcrumbs").height();
        var page_body_padding_top_h = $(".page-body").css("padding-top");
        var page_body_padding_bottom_h = $(".page-body").css("padding-bottom");
        var widget_header_h = $(".widget-header").height();
        var dataTables_filter_h = $(".dataTables_filter").height();
        var NotedCalendar_h = $(".NotedCalendar").height();

        var  window_h = $(window).height();
        var calendar_h = parseInt(window_h) - (parseInt(header_banner_h)+parseInt(navbar_h)+parseInt(page_breadcrumbs_h)+parseInt(page_body_padding_top_h)+parseInt(page_body_padding_bottom_h)+parseInt(widget_header_h)+parseInt(dataTables_filter_h)+parseInt(NotedCalendar_h));


        //$('.fullcalendar').fullCalendar('option', 'height', calendar_h);
    },

    dataTables_filter_col: function () {
        //Fix col sm as col md
        if ($('.dataTables_filter > .quickSearch > div[class*="col"]').is(":visible")) {
            jQuery(document).find('.dataTables_filter > .quickSearch div[class*="col"]').each(function () {
                var obj = $(this);
                var arr = obj.attr('class').split(' ');
                for (var i = 0; i < arr.length; i++) {
                    var class_sm = arr[i];
                    var col_sm = 'col-sm-';
                    if (class_sm.indexOf(col_sm) !== -1) {
                        obj.removeClass(class_sm);
                    }
                }
                for (var j = 0; j < arr.length; j++) {
                    var class_md = arr[j];
                    var col_md = 'col-md-';
                    if (class_md.indexOf(col_md) !== -1) {
                        var res = class_md.replace("md", "sm");
                        obj.addClass(res);
                    }
                }

            });
        }
    },
    check_required_input: function () {
        jQuery(document).find(".form-control").each(function () {
            var attr = $(this).attr('data-bv-notempty');
            if (typeof attr !== typeof undefined && attr !== false && attr === 'true') {
                if (jQuery(this).parent().prev("label").is(":visible") && (jQuery(this).parent().prev("label").find(".red").size() === 0)) {
                    var label_text = jQuery(this).parent().prev("label").html();
                    jQuery(this).parent().prev("label").html(label_text + ' <span class="red">*</span>');
                }
            }
        });
    },
    fileViewer_height_fn: function () {
        if ($("#FileViewer").is(":visible")) {
            $("#FileViewer").css("height", "auto");
            $("#FileViewer #outerContainer").css("height", "auto");
            $("#FileViewer .group-tab .tab-data").css("height", "auto");
            var window_height = $(window).outerHeight(true);
            var navbar_height = 0;
            if ($(".header_banner").is(":visible")) {
                navbar_height = $(".navbar").outerHeight(true) + $(".header_banner").outerHeight(true);
            } else {
                navbar_height = $(".navbar").outerHeight(true);
            }
            var breadcrumbs_height = $(".page-breadcrumbs").outerHeight(true);
            var file_button_action_height = $("#FileViewer .file_button_action").outerHeight(true);
            var toolbarViewer_Scanfile_height = $("#FileViewer .toolbarViewer_Scanfile").outerHeight(true);
            var label_group_tab_custom_height = $("#FileViewer .label_group_tab_custom").outerHeight(true);
            var fileViewer_height = window_height - (navbar_height + breadcrumbs_height + 2);
            var outerContainer_height = fileViewer_height - (file_button_action_height + 2);
            var items_Scan_height = fileViewer_height - (toolbarViewer_Scanfile_height + 2);
            var tab_data_height = fileViewer_height - (label_group_tab_custom_height + 2);
            var sidebar_menu_height = window_height - (navbar_height + 2);
            var outerContainer_height_i = 0;
            if ($("#InfoStatus .wizard").is(":visible")) {
                var wizard_height = $("#InfoStatus .wizard").outerHeight(true);
                var tabs_flat_height = $("#FileViewer .tabs-flat").outerHeight(true);
                outerContainer_height_i = "height: " + parseInt(outerContainer_height - wizard_height - tabs_flat_height) + "px !important";
            }
            else {
                outerContainer_height_i = "height: " + outerContainer_height + "px !important";
            }
            $("#FileViewer").css("height", fileViewer_height);
            $("#FileViewer .secrtc2 .widget").css("height", fileViewer_height);
            $("#FileViewer .secrtc1 .ScanResult").css("height", fileViewer_height);
            $("#FileViewer .secrtc1 .ScanResult .items_Scan").css("height", items_Scan_height);
            $("#FileViewer #outerContainer").attr('style', outerContainer_height_i);
            $("#FileViewer #DocProIMGMap").attr('style', outerContainer_height_i);
            $("#FileViewer .doc-viewer").attr('style', outerContainer_height_i);
            $("#FileViewer .group-tab .tab-data").css("height", tab_data_height);
            $(".page-sidebar .sidebar-menu").css("height", sidebar_menu_height);
        }

    },
    newsfeedimg: function () {
        // NewsFeed image grid
        $(".timeline-body").each(function () {
            if ($(this).find(".card-image").is(":visible")) {
                var NewsFeed_Image_Count = $(this).find(".card-image").length;
                //alert(NewsFeed_Image_Count);
                if (parseInt(NewsFeed_Image_Count) > 2) {
                    $(this).find(".card-image").addClass("multi_card_img");
                    $(this).find(".card-image").addClass("hidden");
                    $(this).find(".card-image:eq(0)").removeClass("hidden");
                    $(this).find(".card-image:eq(1)").removeClass("hidden").addClass("equal_height");
                    $(this).find(".card-image:eq(2)").removeClass("hidden").addClass("equal_height");
                    var temp_img_heights = 0;
                    $(this).find(".card-image.equal_height img").each(function () {
                        var temp_img_height = jQuery(this).height();
                        if (parseInt(temp_img_height) > parseInt(temp_img_heights)) {
                            temp_img_heights = temp_img_height;
                        }
                    });
                    $(this).find(".card-image.equal_height").css("height", temp_img_heights);
                    $(this).find(".card-image.equal_height img").css("height", temp_img_heights);
                    $(this).find(".card-image.equal_height").addClass("fit_thumbnail");
                    if (parseInt(NewsFeed_Image_Count - 3) > 0) {
                        var other_img_count_msg = "<div class='other_img_count'>" + (NewsFeed_Image_Count - 3) + "<i class='ion-plus-round'></i></div>";
                        $(this).find(".card-image.equal_height:eq(1) img").after(other_img_count_msg);
                        var other_img_count = $(this).find(".other_img_count").width();
                        $(this).find(".other_img_count").css("margin-left", -(other_img_count / 2));
                    }
                } else if (parseInt(NewsFeed_Image_Count) === 2) {
                    $(this).find(".card-image").addClass("two_card_img");
                } else {
                    $(this).find(".card-image").addClass("one_card_img");
                }
            }

        });
    },
    toogle_steps: function () {
        jQuery(".toogle_steps").on("click", function (e) {
            e.preventDefault();
            jQuery(this).parents(".wizard").find(".steps_parent").slideToggle();
            jQuery(this).find("i").toggleClass("fa-angle-double-up fa-angle-double-down");
            setTimeout(function () {
                Cust.fileViewer_height_fn();
            }, 500);

        });
    },
    Scroll_table: function () {
        if ($("table.table").is(":visible")) {
            jQuery("table.table").each(function () {
                var obj = jQuery(this);
                var over_size = obj.parents(".dataTables_wrapper").find(".over_auto").size();
                if (over_size === 0) {
                    obj.wrapAll('<div class="over_auto"></div>');                
                }
                var celSize = obj.find("tbody tr:first-child").find("td").length;
                if(celSize > 7){
                    obj.addClass('max_content_width');
                }
                
                obj.find("tbody tr").each(function () {
                    $(this).find("td").each(function (index) {
                        var data_title = $(this).parents("tbody").prev("thead").find("tr").find("th").eq(index).clone().children().remove().end().text();
                        if (data_title.trim()) {
                            $(this).attr("data-title", data_title);
                        }
                    });
                });
            });
        }
    },
    Scroll_tab_group: function () {
        if ($(".group_tab_scroll").is(":visible")) {
            var group_tab_scroll_w = 0;
            group_tab_scroll_w = $(".group_tab_scroll").outerWidth(true);

            var group_tab_w = 0;
            $(".group_tab_scroll .tabitem:not(.hidden)").each(function () {
                var group_tab_item_w = $(this).outerWidth(true) + 2;
                $(this).addClass("tab_show");
                group_tab_w = group_tab_w + group_tab_item_w;
            });
            if (group_tab_w > group_tab_scroll_w) {
                jQuery(".group_tab_scroll_prev").removeClass("hidden");
                var tab_each_itemt = 0;
                jQuery(".group_tab_scroll > .tab_show").each(function () {
                    var tab_show_w = jQuery(this).outerWidth(true);
                    if (parseInt(tab_show_w) > parseInt(tab_each_itemt)) {
                        tab_each_itemt = tab_show_w;
                    }
                });
                jQuery(".group_tab_scroll > .tab_show").css("width", tab_each_itemt);
                var tab_length = jQuery(".group_tab_scroll > .tab_show").length;
                $(".group_tab_scroll").css("width", tab_each_itemt * tab_length);
                var translate_css_px = 0;
                var tem_w = tab_each_itemt * tab_length;

                $(".group_tab_scroll_prev").click(function () {
                    jQuery(".group_tab_scroll_next").removeClass("hidden");
                    translate_css_px = translate_css_px - tab_each_itemt;
                    var translate_css = 'translateX(' + translate_css_px + 'px)';
                    $(".group_tab_scroll").css({ "transform": translate_css });
                    tem_w = tem_w - tab_each_itemt;
                    $(".group_tab_scroll_next").show();
                    if (tem_w <= group_tab_scroll_w) {
                        $(this).hide();
                    }
                });
                $(".group_tab_scroll_next").click(function () {
                    translate_css_px = translate_css_px + tab_each_itemt;
                    var translate_css = 'translateX(' + translate_css_px + 'px)';
                    $(".group_tab_scroll").css({ "transform": translate_css });
                    tem_w = tem_w + tab_each_itemt;
                    $(".group_tab_scroll_prev").show();
                    if (tem_w >= (tab_each_itemt * tab_length)) {
                        $(this).hide();
                    }
                });
            }
        }
    },
    Table_sort: function () {
        if ($("table .sortitem").is(":visible")) {
            $(document).find(".sortitem").parents("th").addClass("sortitem_th");
        }
    }
};



//--DOCUMENT READY FUNCTION BEGIN
$(document).ready(function () {

    list_pagi(0,"");
    jQuery(document).on('click', '.more_slide_next', function(){
        var target = $("#"+$(this).parent(".useMoreSlide").attr("data-target"));
        var index = parseInt($(this).attr("data-index"));
        list_pagi(index,"");
    });
    jQuery(document).on('click', '.more_slide_prev', function(){
        var target = $("#"+$(this).parent(".useMoreSlide").attr("data-target"));
        var index = parseInt($(this).attr("data-index"));
        list_pagi(index,"");
    });

    if($("#wrap").length!=0){
        addPhotos();
    }

    jQuery('.close_birthday').click(function(){
        $(".wrapper_birthday").removeClass("active");
    });
    jQuery('.month_birthday_link').click(function(e){
        e.preventDefault();
        $(".wrapper_birthday").addClass("active");
    });
    //Tootip
    var $info = $('.tooltip');
    $info.each( function () {
      var dataInfo = $(this).data("tooltip");
      $( this ).append('<span class="inner" >' + dataInfo + '</span>');
    });
    // End
    // JS Filter Thông Báo 
    jQuery(document).on("click", ".gb_Qe--form .gb_bf--caret", function () {
        $(".gb_bf--filter").toggleClass("open");
    });
    jQuery(document).on("click", ".gb_bf--filter ._button ._delete", function () {
        $(".gb_bf--filter").removeClass("open");
    });

    jQuery(document).on('click', '.dataFilter_Dropdown .dropdown-toggle', function(){
        jQuery(this).parents(".dataFilter_Dropdown").toggleClass("open");
        jQuery(this).parents(".quickSearch ").find(".dataFilter_Dropdown_target").toggleClass("open");
    });
    jQuery(document).on('click', '.dataFilter_Dropdown_close', function(e){
        e.preventDefault();
        jQuery(this).parents(".quickSearch").find(".dataFilter_Dropdown").toggleClass("open");
        jQuery(this).parents(".quickSearch").find(".dataFilter_Dropdown_target").toggleClass("open");
    });	
    //$('#datetimepicker_yearonly').datepicker({
    //    changeMonth: false,
    //    changeYear: true,
    //    showButtonPanel: false,
    //    dateFormat: 'yy',

    //}).focus(function () {
    //    $(".ui-datepicker-month").hide();
    //    $(".ui-datepicker-calendar").hide();
    //});


    jQuery(document).on("click", ".borrowEquip", function (e) {

        e.preventDefault();
        jQuery(this).parents(".abc").remove();
    });
   

    jQuery(document).on('show.bs.tab', '[data-toggle="tab"]', function () {
        if ($("table.table").is(":visible")) {
            jQuery("table.table").each(function () {
                var obj = jQuery(this);
                if (!obj.parent().hasClass("over_auto")) {
                    obj.wrapAll('<div class="over_auto"></div>');
                    obj.find("tbody tr").each(function () {
                        $(this).find("td").each(function (index) {
                            var data_title = $(this).parents("tbody").prev("thead").find("tr").find("th").eq(index).clone().children().remove().end().text();
                            if (data_title.trim()) {
                                $(this).attr("data-title", data_title);
                            }
                        });
                    });
                }
            });
        }
    });

    jQuery(document).on("click", ".cmt_divTarget", function (e) {
        e.preventDefault();
        var elem = $(".module_cmt");
        if (elem.length && elem.position().top) {
            $(".job_search_quickview_content").animate({ scrollTop: elem.position().top }, { duration: 100, easing: 'swing' });
            jQuery(".cmt-content > .form-control").focus();
        }
    });


    jQuery('.widget-buttons > [data-toggle="maximize"]').on("click", function () {
        jQuery("body").toggleClass("maximize");
    });

    $('.FileNotification_btn').click(function () {
        $(this).parents('.FileNotification').toggleClass('is-opened');
    });
    $('.FileNotiClose').click(function () {
        $(this).parents('.FileNotification').toggleClass('is-opened');
    });
    $('[data-toggle="tooltip"]').tooltip();
    //advanced_search_bar
    $(".advanced_search_bar .show_form_btn").focus(function () {
        $(this).parents(".advanced_search_bar").addClass("active");
        $(this).parents(".advanced_search_bar").find(".option_search").fadeIn();
    });
    $(".advanced_search_bar .hide_form_btn").click(function () {
        $(this).parents(".advanced_search_bar").removeClass("active");
        $(this).parents(".option_search").fadeOut();
    });
    //notification
    $(".notifies-dropdown-toggle").click(function () {
        if ($(this).parents("li").hasClass("open")) {
            $(this).parents("li").removeClass("open");
        } else {
            $(this).parents("li").addClass("open");
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".notifies-dropdown-toggle").parents("li");
        if (container.is(":visible")) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(".notifies-dropdown-toggle").parents("li").removeClass("open");
            }
        }
    });
    jQuery(".navbar .navbar-inner .navbar-header .navbar-account .account-area li.dropdown-hover a .dropdown-expand").click(function(event){
        event.stopPropagation();
        event.preventDefault();
        jQuery(this).toggleClass("inited");
        jQuery(".navbar .navbar-inner .navbar-header .navbar-account .account-area li.dropdown-hover a .dropdown-expand:not('.inited')").removeClass("active");
        jQuery(this).toggleClass("active");
        jQuery(this).removeClass("inited");

        jQuery(this).parents(".dropdown-hover").toggleClass("inited");
        jQuery(".navbar .navbar-inner .navbar-header .navbar-account .account-area li.dropdown-hover:not('.inited')").find(".dropdown-menu").slideUp(300);
        jQuery(this).parents(".dropdown-hover").find(".dropdown-menu").slideToggle(300);
        jQuery(this).parents(".dropdown-hover").removeClass("inited");
    });
    //End Sidebar Menu Handle
    var dragTimer;
    $(window).on('dragenter', function (e) {
        e.preventDefault();
    });
    $(document).on('dragover', function (e) {
        var dt = e.originalEvent.dataTransfer;
        if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
            $("#drap_drop_fixed").addClass("active");
            $(".drap_drop_fixed_ov").addClass("active");
            window.clearTimeout(dragTimer);
        }
    });


    jQuery('#FrmCrTask .slhidden .btn').click(function (e) {
        e.preventDefault();
    });
  
    $(document).on("click", ".fc-widget-content", function () {
        $(document).find(".fc-widget-content").removeClass("fc-click");
        $(this).addClass("fc-click");
    });



    $(document).on("click", ".ellipsisMore", function () {
        //$(this).parent().parent().find(".fc-event").find(".ellipsisMore").removeClass('open');
        //$(this).toggleClass('open');
        if ($(this).next(".poputils").is(":visible")) {
            console.log("poputils visible");
            $(this).removeClass('open')
        } else {
            console.log("! poputils visible");
            $(this).addClass('open')
        }
    });
    // JS click user
    $( '.click_caret' ).click(function( event ) {
        event.preventDefault();
        $('.drop_click_caret').toggleClass('open');
    });
    $(document).click(function(e) {
        var target = e.target;
        if (!$(target).is('.click_caret') && !$(target).is('.click_caret')) {
            $('.drop_click_caret').removeClass('open');
        }
    });
    //content_less begin
    jQuery(document).on('click', '.content_less .icon_show_full_content', function(e){
        e.preventDefault();
        $(this).parents(".content_less").toggleClass("open");    
    });
    var content_less_count = 0;
    jQuery(document).find(".content_less").each(function(){
        content_less_count = content_less_count + 1;
        var obj = $(this);
        obj.attr("id","content_less_"+content_less_count);
        var elm = document.getElementById("content_less_"+content_less_count);
        console.log("offsetHeight: "+elm.offsetHeight);
        console.log("scrollHeight: "+elm.scrollHeight);
        if (elm.offsetHeight < elm.scrollHeight) {
            obj.addClass("active");
        }  
    });
    //content_less end

    // JS ADV SEARCH
    $(document).on("click", ".AdvSearchLink", function(e) {
        e.preventDefault();
        var url = $(this).attr("myhref");
        window.location = url;
    });

    $('.advanced_search_bar .btn-searchs .btn-group').on('shown.bs.dropdown', function(){
        $(this).find(".bootstrap-select > .dropdown-menu > .dropdown-menu.inner").addClass("useScrollbar");
        $(this).find(".bootstrap-select > .dropdown-menu > .dropdown-menu.inner.useScrollbar").perfectScrollbar();     
    });

    //$('.mBirthday_item .user-info .NSDash').popover({content: "<div class='NSDashPop useScrollBar'><div class='user-info'><img class='ua' src='/Thumb/200x200/Avatars/avatar.png' width='30'><span class='ui'><span class='clearfix'><i class='fa fa-fw fa-user-o' aria-hidden='true'></i>Nguyễn Thị Tâm</span><span class='clearfix'><i class='fa fa-fw fa-envelope-o' aria-hidden='true'></i>nguyentamht@gmail.com</span><span class='clearfix'><i class='fa fa-fw fa-phone' aria-hidden='true'></i>0123456789</span></span></div></div>", html: true, placement: "right"}); 

    $(".popover_listUser").each(function(){
        var popcontent = $(this).find("textarea").val();
        $(this).attr("data-content",popcontent);

    });






});
//--DOCUMENT READY FUNCTION END
function list_gen(container, resize, n, width){
    container.find(".more_slide_item.curent_slide").last().nextAll().addClass("temp_next");
    container.find(".more_slide_item.temp_next").css("opacity",".01");
    var temp_next_length = container.find(".more_slide_item.temp_next").length;
    var next_index = container.children(".more_slide").children(".more_slide_item").index(container.children(".more_slide").children(".more_slide_item.temp_next").first());
    if(! container.attr("data-first-index") && resize != "resize"){
        container.attr("data-first-index",next_index);
    }else if(container.attr("data-first-index") && resize == "resize"){
        container.attr("data-first-index",next_index);
    }
    var first_index = container.attr("data-first-index");
    container.find(".more_slide_next").attr("data-index",next_index);
    container.find(".more_slide_prev").attr("data-index",n-first_index);
    if(temp_next_length != 0){
        container.find(".more_slide_next").show();
        container.find(".next_count").html("+"+temp_next_length);
        
    }else{
        container.find(".more_slide_next").hide();
    }    
    container.find(".more_slide_item.curent_slide").first().prevAll().addClass("temp_prev");
    container.find(".more_slide_item.temp_prev").css("opacity",".01");
    var temp_prev_length = container.find(".more_slide_item.temp_prev").length;
    if(temp_prev_length != 0){
        container.find(".more_slide_prev").show();
        container.find(".prev_count").html("+"+temp_prev_length);
        
    }else{
        container.find(".more_slide_prev").hide();
    }
    var translate_x = 0;
    for (i = 0, len = temp_prev_length; i < len; i++) {
        translate_x = translate_x + parseInt(container.find(".more_slide_item.temp_prev").eq(i).attr("data-width"));
    }
    var curent_x = 0;
    for (i = 0, len = container.find(".more_slide_item.curent_slide").length; i < len; i++) {
        curent_x = curent_x + parseInt(container.find(".more_slide_item.curent_slide").eq(i).attr("data-width"));
    }
    var half_x = 0;
    if(temp_next_length != 0 || temp_prev_length !=0){
        half_x = (width - curent_x)/2;
    }
    container.children(".more_slide").css("transform","translateX("+-(translate_x-half_x)+"px)"); 
}
function list_pagi(n,resize) {
    var width = 0,
        more_slide_width = 0,
        item_width = 0,
        page_width = 0,
        next_count = 0;
    jQuery(document).find(".useMoreSlide").each(function(){
        var target = $("#"+$(this).attr("data-target"));
        target.attr("data-width",target.outerWidth(true));
        target.children(".more_slide").attr("data-width",target.children(".more_slide").outerWidth(true));
        target.find(".more_slide_item").each(function(){
            $(this).attr("data-width",$(this).outerWidth(true));
        });   
        width = parseInt(target.attr("data-width"));
        more_slide_width = parseInt(target.children(".more_slide").attr("data-width"));
        target.find(".more_slide_item").removeClass("temp_prev");
        target.find(".more_slide_item").removeClass("temp_next");
        target.find(".more_slide_item").removeClass("curent_slide");
        var length = target.find(".more_slide_item").length;
        for (i = n, len = length; i < len; i++) { 
            item_width = parseInt(target.find(".more_slide_item").eq(i).attr("data-width"));
            if(page_width + item_width<width){
                page_width = page_width + item_width;
                target.find(".more_slide_item").eq(i).addClass("curent_slide");
                target.find(".more_slide_item").eq(i).css("opacity","1");
                if(i == len -1){
                    list_gen(target,resize,n,width);
                }
            }else{
                list_gen(target,resize,n,width);                 
                break        
            }
        }
    });    
}

// BIRTHDAY BEGIN
function select(selector) {
  var method = selector.substr(0,1) == '.' ? 'getElementsByClassName' : 'getElementById';
  return document[method](selector.substr(1));
}

function range() {
  var range = {left : {x : [], y : []}, right : {x : [], y : []}};
  var wrap = {
    w : select("#wrap").clientWidth,
    h : select("#wrap").clientHeight
  }
  var photo = {
    w : select(".photo")[0].clientWidth,
    h : select(".photo")[0].clientHeight
  }
  range.wrap = wrap;
  range.photo = photo;

  range.left.x = [0, wrap.w/2 - photo.w/2];
  range.left.y = [0, wrap.h - photo.w/2];
  range.right.x = [wrap.w/2 + photo.w/2, wrap.w];
  range.right.y = [0, wrap.h - photo.w/2];

  return range;
}

function sort(n) {
  var _photo = select('.photo');
  var photos = [];
  for(i=0; i<_photo.length; i++) {
    _photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/, ' ');
    _photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/, ' ');
    _photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/, ' ');
    _photo[i].className += ' photo_front';
    _photo[i].style.left = '';
    _photo[i].style.top = '';
    _photo[i].style['transform'] = 'rotate(360deg) scale(1.3)';
    _photo[i].style['-webkit-transform'] = 'rotate(360deg) scale(1.3)';
    photos.push(_photo[i]);
  }
  var photo_center = select('#photo_' + n);
  photo_center.className += ' photo_center';

  photo_center = photos.splice(n, 1)[0];

  var photos_left = photos.splice(0, Math.ceil(photos.length/2));
  var photos_right = photos;

  var ranges = range();
  for(var i=0; i<photos_left.length; i++){
    photos_left[i].style.left = random(ranges.left.x) + "px";
    photos_left[i].style.top = random(ranges.left.y) + "px";
    photos_left[i].style['transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
    photos_left[i].style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
  }
  for(var i = 0; i<photos_right.length; i++){
    photos_right[i].style.left = random(ranges.right.x) + "px";
    photos_right[i].style.top = random(ranges.right.y) + "px";
    photos_right[i].style['transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
    photos_right[i].style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
  }
  var navs = select('.i');
  for(var i=0; i<navs.length; i++) {
    navs[i].className = navs[i].className.replace(/\s*i_current\s*/, ' ');
    navs[i].className = navs[i].className.replace(/\s*i_back\s*/, ' ');
  }
  select('#nav_' + n).className += ' i_current '; 
}

function random(range) {
  var max = Math.max(range[0], range[1]);
  var min = Math.min(range[0], range[1]);
  var diff = max - min;
  var number = Math.floor(Math.random() * diff + min);
  return number;
}

var data_photo = $("#wrap > .photo").length;
function addPhotos() {
  //var template = select('#wrap').innerHTML;
 // var html = [];
  var nav = [];
  for (i=0; i<data_photo; i++) {
    //var _html = template.replace('{{index}}', i)
    //.replace('{{img}}', data_photo[i].img)
    //.replace('{{caption}}', data_photo[i].caption)
    //.replace('{{desc}}', data_photo[i].desc);
    //html.push(_html);
    nav.push('<span id="nav_'+i+'" class="i" onclick ="turn(select(\'#photo_'+i+'\'))">&nbsp;</span>');
  }
  $("#wrap").append('<div class="nav">'+nav.join('')+'</div>');
  //select('#wrap').innerHTML = html.join('');
  sort(random([0, data_photo]));
}

function turn(elem) {
  var cls = elem.className;
  var n = elem.id.split("_")[1];

  if(! /photo_center/.test(cls)) {
    return sort(n);
  }

  if(/photo_front/.test(cls)) {
    cls = cls.replace(/photo_front/, 'photo_back'); 
    select('#nav_' + n).className += ' i_back ';
  } else {
    cls = cls.replace(/photo_back/, 'photo_front');
    select('#nav_' + n).className = select('#nav_' + n).className.replace(/\s*i_back\s*/, ' ');
  }
  return elem.className = cls;
}
// BIRTHDAY END



if (jQuery(".databox span.databox-text").is(":visible")) {
    jQuery(".databox span.databox-text").each(function () {
        var databox_text = jQuery(this).text();
        jQuery(this).attr("title", databox_text);
    });
}
if (jQuery(".sidebar-menu .menu-text").is(":visible")) {
    jQuery(".sidebar-menu .menu-text").each(function () {
        var menu_text = jQuery(this).text();
        jQuery(this).attr("title", menu_text);
    });
}

Cust.dataTables_filter_col();
Cust.check_required_input();
$(document).on("dialogopen", function (event, ui) {
    // lock scroll position, but retain settings for later
    // var scrollPosition = [
    //   self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    //   self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // ];
    // var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    // html.data('scroll-position', scrollPosition);
    // html.data('previous-overflow', html.css('overflow'));
    // html.css('overflow', 'hidden');
    // window.scrollTo(scrollPosition[0], scrollPosition[1]);
    if ((jQuery(document).find("#Overlay").is(":visible")) && (jQuery(document).find("#Overlay").hasClass("loadingc"))) {
        jQuery(document).find("#Overlay").removeClass("loadingc");
    }
    Cust.check_required_input();
});
$(document).on("dialogclose", function (event, ui) {
    // un-lock scroll position
    // var html = jQuery('html');
    // var scrollPosition = html.data('scroll-position');
    // html.css('overflow', html.data('previous-overflow'));
    // window.scrollTo(scrollPosition[0], scrollPosition[1]);
});
Cust.fileViewer_height_fn();
Cust.toogle_steps();
Cust.Scroll_table();
Cust.Scroll_tab_group();

// =========== Resopnsive member 2 colum equal height ==========
if ($(window).width() > 463) {
    $(".timeline_job_item_body .member").css("height", "auto");
    var member_temp_height = 0;
    $(".timeline_job_item_body .member").each(function () {
        var member_height = $(this).innerHeight();
        if (parseInt(member_height) > parseInt(member_temp_height)) {
            member_temp_height = member_height;
        }
    });
    $(".timeline_job_item_body .member").css("height", member_temp_height);
} else {
    $(".timeline_job_item_body .member").css("height", "auto");
}

// =========== Resopnsive timeline job item status &  star box rating colum equal height ==========
if ($(window).width() > 463) {
    $(".star_rate.box-rating").css("height", "auto");
    $(".timeline_job_item_status").css("height", "auto");
    var timeline_job_item_status_height = $(".timeline_job_item_status").innerHeight();
    var star_rate_box_rating_height = $(".star_rate.box-rating").innerHeight();
    if (parseInt(timeline_job_item_status_height) > parseInt(star_rate_box_rating_height)) {
        $(".star_rate.box-rating").css("height", timeline_job_item_status_height);
    }
    else {
        $(".timeline_job_item_status").css("height", star_rate_box_rating_height);
    }
} else {
    $(".star_rate.box-rating").css("height", "auto");
    $(".timeline_job_item_status").css("height", "auto");
}

function display_dock() {
    //dock
    var dock = $(".dock #dockWrapper");
    dock.css("margin-top", "0px");
    dock.css("opacity", "1");
    //toggle_dock
    var toggle_dock = $(".toggle_dock");
    toggle_dock.css("opacity", "0");
    $(".dock").css("visibility", "visible");
    jQuery(".toggle_dock").addClass("is_hidden");
    jQuery(".toggle_dock").removeClass("is_show");
    localStorage.setItem('toggle_dock_stt', 'dock_is_show');
}
function hide_dock() {
    //dock
    var dock = $(".dock #dockWrapper");
    dock.css("margin-top", "100px");
    dock.css("opacity", "0");
    //toggle_dock
    var toggle_dock = $(".toggle_dock");
    toggle_dock.css("opacity", "1");

    $(".dock").css("visibility", "hidden");
    jQuery(".toggle_dock").removeClass("is_hidden");
    jQuery(".toggle_dock").addClass("is_show");
    localStorage.setItem('toggle_dock_stt', 'dock_is_hide');
}
//function leaveChange() {
//    var elementCr = document.getElementById("CrPersonType");
//    if (typeof (elementCr) != 'undefined' && elementCr != null) {
//        Autocomplete.doituong(jQuery(document), elementCr.value);
//    }
//    var elementUp = document.getElementById("UpPersonType");
//    if (typeof (elementUp) != 'undefined' && elementUp != null) {
//        Autocomplete.doituong(jQuery(document), elementUp.value);
//    }
//}
jQuery(".btn_show_dock").click(function (e) {
    e.preventDefault();
    //dock
    var dock = $(".dock #dockWrapper");
    dock.animate({ "opacity": "1", "margin-top": "0px" }, 300);

    //toggle_dock
    var toggle_dock = $(".toggle_dock");
    toggle_dock.animate({ "opacity": "0" }, 300);
    toggle_dock.css({
        'transition': 'all .3s',
        'transform': 'scale(0)',
    });

    jQuery(".toggle_dock").addClass("is_hidden");
    jQuery(".toggle_dock").removeClass("is_show");
    $(".dock").css("visibility", "visible");
    localStorage.setItem('toggle_dock_stt', 'dock_is_show');
});
jQuery(".btn_hide_dock").click(function (e) {
    e.preventDefault();
    //dock
    var dock = $(".dock #dockWrapper");
    dock.animate({ "margin-top": "100px", "opacity": "0" }, 300);

    //toggle_dock
    var toggle_dock = $(".toggle_dock");
    toggle_dock.animate({ "opacity": "1" }, 300);


    toggle_dock.css({
        'transition': 'all .3s',
        'transform': 'scale(1)',
    });

    jQuery(".toggle_dock").removeClass("is_hidden");
    jQuery(".toggle_dock").addClass("is_show");
    $(".dock").css("visibility", "hidden");
    localStorage.setItem('toggle_dock_stt', 'dock_is_hide');
});
if (localStorage.getItem('toggle_dock_stt') === 'dock_is_show') {
    display_dock();
} else {
    hide_dock();
}

$('.multi-action .action-button').on('click', function () {
    $(this).toggleClass('active');
    if ($(this).parents().attr("data-original-title") === "") {
        $(this).parents().attr("data-original-title", "Danh sách ghim");
        $(this).parents().next(".tooltip").show();
    } else {
        $(this).parents().attr("data-original-title", "");
        $(this).parents().next(".tooltip").hide();
    }
});
$("select[name='PersonType']").change(function () {
    Autocomplete.doituong(jQuery(document), $(this).val());
});
$(document).on('click', '.quickAppendTemp', function () {
    var target = jQuery(this).attr('data-target');
    var temp = jQuery(this).attr('data-template');
    jQuery(target).append(jQuery(temp).html());
    Utils.updateInputDate(jQuery(target));
    Utils.updateFormState(jQuery(target));
    Utils.updateScrollBar(jQuery(target));
    Autocomplete.init(jQuery(target));
    Main.upEvent();
});


//load file
jQuery(".btn_remove").click(function (e) {
    var aaa = $(this).closet("#iddivfileChosed");
    console.log(aaa);
});
//--WINDOW RESIZE FUNCTION BEGIN
$(window).resize(function () {
    list_pagi(0,"resize");
    Cust.fileViewer_height_fn();
    Cust.calendar_height();
    Cust.Scroll_tab_group();
    // =========== Resopnsive member 2 colum equal height ==========
    if ($(window).width() > 463) {
        $(".timeline_job_item_body .member").css("height", "auto");
        var member_temp_height = 0;
        $(".timeline_job_item_body .member").each(function () {
            var member_height = $(this).innerHeight();
            if (parseInt(member_height) > parseInt(member_temp_height)) {
                member_temp_height = member_height;
            }
        });
        $(".timeline_job_item_body .member").css("height", member_temp_height);
    } else {
        $(".timeline_job_item_body .member").css("height", "auto");
    }

    // =========== Resopnsive timeline job item status &  star box rating colum equal height ==========
    if ($(window).width() > 463) {
        $(".star_rate.box-rating").css("height", "auto");
        $(".timeline_job_item_status").css("height", "auto");
        var timeline_job_item_status_height = $(".timeline_job_item_status").innerHeight();
        var star_rate_box_rating_height = $(".star_rate.box-rating").innerHeight();
        if (parseInt(timeline_job_item_status_height) > parseInt(star_rate_box_rating_height)) {
            $(".star_rate.box-rating").css("height", timeline_job_item_status_height);
        }
        else {
            $(".timeline_job_item_status").css("height", star_rate_box_rating_height);
        }
    } else {
        $(".star_rate.box-rating").css("height", "auto");
        $(".timeline_job_item_status").css("height", "auto");
    }
});
//--WINDOW RESIZE FUNCTION END

//--WINDOW LOADED FUNCTION BEGIN


$(window).bind("load", function () {
if($(document).find('input[class*="autocomplete"]').length !=0){
    $(document).find('input[class*="autocomplete"]').each(function () {
        jQuery(this).attr("autocomplete","new-password");
    });    
}

if($("[data-fancybox]").length !=0){
    $("[data-fancybox]").fancybox({
        margin: [44, 0, 22, 0],
        loop: true,
        buttons: [
            "zoom",
            //"share",
            //"slideShow",
            "fullScreen",
            "download",
            //"thumbs",
            "close"
        ],        
    });
} 
	$(".jobFile_Fancybox").click(function(){
		$(this).parents(".jobFile_Attach").find(".jobFile_Name").click();
	});      
//$(document).find('.dataTables_wrapper .table:not(.useTreegrid)').each(function() {
//	if(!$(this).hasClass("stacktable_inited") && !$(this).hasClass("not_js_responsive")){
//		$(this).addClass("stacktable_inited");
//		$(this).stacktable();
//	}
//});	
    Cust.fileViewer_height_fn();
    Cust.newsfeedimg();
    Cust.Scroll_table();
    Cust.Table_sort();
    Cust.calendar_height();
    jQuery(document).find(".useTreegrid").each(function () {
        jQuery(this).treegrid();
    });

    jQuery('.display_job_search_list').click(function () {
        jQuery(".calendar_table").toggleClass("active");
    });

        $('.toggle_notifications').on('click', function(){
        if(!$(this).hasClass("inited")){
            $(this).addClass("inited");
            var Ntf_less_count = 0;
            jQuery(document).find("#NtfContainer").find(".user_item").each(function(){
                Ntf_less_count = Ntf_less_count + 1;
                var obj = $(this);
                obj.find(".user_item_info > em").attr("id","Ntf_less_"+Ntf_less_count);
                var elm = document.getElementById("Ntf_less_"+Ntf_less_count);
                if (elm.offsetHeight < elm.scrollHeight) {
                    obj.find(".user_item_info > em").addClass("active");
                    obj.find(".user_item_info > em").append('<a class="icon_show_full_content" href="#" alt="Xem đầy đủ nội dung" title="Xem đầy đủ nội dung"><i class="fa fa-plus-square" aria-hidden="true"></i></a>');
                }  
            });
        }
    });
    jQuery(document).on('click', '#NtfContainer .icon_show_full_content', function(e){
        e.preventDefault();
        $(this).parent("em").toggleClass("open");    
    });
    //Header right dropdown menu
    $('.header_mainMenu').on('show.bs.dropdown', function(){
        var length = $(this).find(".dropdown-notifications>li").length;
        if(!$(this).hasClass("inited") && length > 5){
            $(this).addClass("inited");
            $(this).addClass("is_full");
            $(this).parents(".account-area").addClass("is_full");
            
        }
    });
    //Header left menu when sidebar is empty
    if(!$(".page-sidebar").size() == 0){
        $("#sidebar-collapse").addClass("is_show");
    }  
});    