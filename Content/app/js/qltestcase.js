var QLtestcase = {
    init: function () {
        QLtestcase.onEvent();
    },
    onEvent: function (container) {
        var index = 0;
        if (Utils.isEmpty(container)) {
            container = jQuery(document);
        }
        $('#btnAddConfig').on('click', function () {
            index++;
            var newTr = $("#addRowTemplate").html();
          newTr = newTr.replace(/\NameItem/g, "NameItem_" + index);
            newTr = newTr.replace(/\ConfigTemplate/g, "ConfigTemplate_" + index);
            $("#id_item").append(newTr);
            $(".trConfig").find(".selectpicker").selectpicker();
            $('#config').find('input[type=hidden]').attr('value', index);
        });
        //$('#IsAutomatic').on('click', function () {
        //    $('#autotest').show();
        //    $('#handleTest').hide();

        //}); $('#IsHandle').on('click', function () {
        //    $('#autotest').hide();
        //    $('#handleTest').show();
        //});
       
        jQuery(document).on('click', '.configItem', function (e) {
            e.preventDefault();
            jQuery(this).parents('.trConfig').remove();
        });
        jQuery(document).ready(function () {
            $('#autotest').hide();
            $('.check-only-one').click(function (e) {
                $('.check-only-one').not(this).prop('checked', false);
                $('.check-only-one').not(this).prop('', false);
            }); $('.check-only-one-item').click(function (e) {
                $('.check-only-one-item').not(this).prop('checked', false);
            });
        });
        jQuery(document).on("click", ".chooseAuto", function () {
          //  var radio = $(this).prev("input");
            var value = $('input[name=ChooseType]:checked').val();
            $('#IsAutoTest').val(value);
            console.log(value);
            if ($('input[name=ChooseType]:checked').val() == 1) {
                $('#autotest').show();
                $('#handleTest').hide();
            } else {
              $('#autotest').hide();
                $('#handleTest').show();
            }
        });
        jQuery(document).on("click", ".itemHandleTest", function () {
            //  var radio = $(this).prev("input");
            var value = $('input[name=IDItem]:checked').val();
            $('#ItemHandleTest').val(value);
        });
    }
};

jQuery(document).ready(function () {
    
    QLtestcase.init();

   
});