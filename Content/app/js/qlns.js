var QLNS = {
    init: function () {

        QLNS.onEvent();
        QLNS.upEVent();
    },
    onEvent: function (container) {
        if (Utils.isEmpty(container)) {
            container = jQuery(document);
        }

        jQuery(document).on("click",
                ".attachFile",
                function (e) {
                    jQuery(document)
                        .on("click",
                            ".delMember",
                            function () {
                                jQuery(this)
                                    .closest(".member")
                                    .slideUp("slow",
                                        function () {
                                            var parent = jQuery(this).parent();
                                            if (parent.find(".member").length == 1) {
                                                parent.addClass("hidden");
                                            }
                                            jQuery(this).remove();
                                        });
                            });
                });
        jQuery(document).on("click",
                ".delMember",
                function (e) {
                    var target = $(this).attr("data-target");
                    $(target).remove();
                });
        jQuery(document).on('change', '.group-checkable-noty', function () {

            var table = jQuery(document).find("#_BangTin");
            var set = table.find(".checkboxesnoty");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    jQuery(this).prop("checked", true);
                    jQuery(this).closest('div').addClass("active");
                } else {
                    jQuery(this).prop("checked", false);
                    jQuery(this).closest('div').removeClass("active");
                }
            });
            //var flag = false;
            //var wrapper = table.closest("._main--page");
            //var actions = wrapper.find(".actMultiTicks");
            //table.find(".checkboxes").each(function () {
            //    if (jQuery(this).prop("checked")) {
            //        actions.removeClass("hidden");
            //        flag = true;
            //        return false;
            //    }
            //});
            //if (!flag) {
            //    actions.addClass("hidden");
            //    if (jQuery(this).prop("checked"))
            //        jQuery(this).prop("checked", false);
            //}
            //Utils.toggleMultiTicks(table);
        });
         jQuery(document).on('change', '.checkboxesnoty', function () {
            jQuery(this).closest('div._List--N').toggleClass("active");
            Utils.toggleMultiTicks(jQuery(this).closest('table'));
        });
        $('.selectchange_pc').on('changed.bs.select',
                function (e) {
                    var target = jQuery(this).attr('data-target');;
                    var selected = jQuery(this).find(":selected");
                    var value = selected.attr('data-value');
                    jQuery(target).val(value);
                });
        $('.select_change_value').on('changed.bs.select',
               function (e) {
                   var select = jQuery(this);
                   var id = select.val();
                   var url = select.attr('data-url');
                   var target = select.attr('data-target');
                   jQuery.ajax({
                       type: "POST",
                       contentType: "application/json; charset=utf-8",
                       async: false,
                       url: url,
                       data: JSON.stringify({
                           'id': id,
                       }),
                       beforeSend: function () {
                           jQuery(target).addClass("loading").html("");
                       },
                       complete: function () {
                           jQuery(target).removeClass("loading");
                       },
                       error: function () {
                           jQuery(target).removeClass("loading");
                       },
                       dataType: "json",
                       success: function (respone) {
                           jQuery(target).val(Utils.moneyFormat(respone));
                           $('.selectpicker').selectpicker();
                           $('.autoSelect2').select2();
                       },
                       error: function (XMLHttpRequest, textStatus, errorThrown) {
                       }
                   });
               });

        jQuery(document).on("change",
                ".select_equip",
                function (e) {
                    e.preventDefault();
                    var target = jQuery(this).closest('form').find('#equips_table').first();
                    var idEquip = jQuery(this).val();
                    var nameEquip = jQuery(this).find('option:selected').text();
                    if (target.find('#tr_' + idEquip).length > 0)
                        return false;
                    var temp = jQuery('#BEDetail_template').html();

                    temp = temp.replace('#trequipidtemp', 'tr_' + idEquip);
                    temp = temp.replace('#equipnametemp', nameEquip);
                    temp = temp.replace('#equipidtemp', idEquip);

                    target.append(temp);
                });
        $('.select_Employee').on('changed.bs.select',
                function (e) {
                    var select = jQuery(this);
                    var id = select.val();
                    var url = select.attr('data-url') + id;
                    var target = select.attr('data-target');
                    jQuery.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        url: url,
                        data: JSON.stringify({
                            'id': id,
                        }),
                        beforeSend: function () {
                            jQuery(target).addClass("loading").html("")
                        },
                        complete: function () {
                            jQuery(target).removeClass("loading");
                        },
                        error: function () {
                            jQuery(target).removeClass("loading");
                        },
                        dataType: "json",
                        success: function (data) {
                            Utils.sectionBuilder(data);
                            if (data.hasOwnProperty("isCust")) {
                                jQuery(target).html(data.htCust);
                                Utils.updateScrollBar(jQuery(target));
                            }
                            $('.selectpicker').selectpicker();
                            $('.autoSelect2').select2();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });
                });


        $('.send_Ajax_').on('changed.bs.select',
                function (e) {
                    var select = jQuery(this);
                    var id = select.val();
                    var idAdd = select.attr('data-Add');
                    var url = select.attr('data-url') + "?IDEmployee=" + idAdd + "&IDStatus=" + id;
                    var target = select.attr('data-target');
                    var check = select.attr('data-check');
                    if (parseInt(id, 10) == parseInt(check, 10)) {
                        jQuery.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            async: false,
                            url: url,
                            data: JSON.stringify({
                                'id': id,
                            }),
                            beforeSend: function () {
                                if (!select.hasClass("not-overlay")) {
                                    Utils.openOverlay();
                                }
                            },
                            complete: function () {
                                Utils.closeOverlay();
                            },
                            error: function () {
                                if (!select.hasClass("not-overlay")) {
                                    Utils.openOverlay();
                                }
                            },
                            dataType: "json",
                            success: function (data) {
                                Utils.sectionBuilder(data);
                                if (data.hasOwnProperty("isCust")) {
                                    Utils.closeOverlay();
                                    jQuery(target).html(data.htCust);
                                    Utils.updateScrollBar(jQuery(target));
                                }
                                $('.selectpicker').selectpicker();
                                $('.autoSelect2').select2();
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                            }
                        });
                    }

                });

        QLNS.onAutoResize();
        //CHART EXAMPLE
        container.find(".employeeChart").each(function () {
            var mrdata = JSON.parse(jQuery(this).next('#txtdata').val());
            jQuery(this).unbind();
            console.log(mrdata);
            console.log(mrdata.data);

            $.plot(jQuery(this),
                mrdata.data,
                {
                    series: {
                        pie: {
                            innerRadius: 0.45,
                            show: true,
                            stroke: {
                                width: 4
                            }
                        }
                    }
                });


        });

        jQuery(document).on("click",
                ".check-IsAllday",
                function () {
                    var radio = $(this).prev("input");
                    var target = "." + $(this).attr("data-target");
                    if ($('input[name=IsAllDay]:checked').val() <= 0) {
                        $(target).removeClass("hidden");
                    } else {
                        $(target).addClass("hidden");
                    }
                });
        jQuery(document)
            .on("click",
                ".check-IsPersonal",
                function () {
                    var target = "." + $(this).attr("data-target");
                    if ($('input[name=IsPersonal]:checked').val() > 0)
                        $(target).removeClass("hidden");
                    else
                        $(target).addClass("hidden");
                });
        $('.select_IDDept')
            .on('changed.bs.select',
                function (e) {
                    var select = jQuery(this);
                    var id = select.val();
                    var url = select.attr('data-url')
                    var target = select.attr('data-target');
                    jQuery.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        url: url,
                        data: JSON.stringify({
                            'id': id,
                        }),
                        beforeSend: function () {
                            jQuery(target).addClass("loading").html("");
                        },
                        complete: function () {
                            jQuery(target).removeClass("loading");
                        },
                        error: function () {
                            jQuery(target).removeClass("loading");
                        },
                        dataType: "json",
                        success: function (data) {
                            Utils.sectionBuilder(data);
                            if (data.hasOwnProperty("isCust")) {
                                jQuery(target).html(data.htCust);
                            }
                            $('.selectpicker').selectpicker();
                            $('.autoSelect2').select2();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });
                });
        $('.IsInternal_checkBox')
            .on('click',
                function () {
                    var check = parseInt($(this).attr("value"), 10);
                    if (check == 0)
                        $(this).attr('value', 1);
                    if (check == 1)
                        $(this).attr('value', 2);
                    else if (check == 2)
                        $(this).attr('value', 1);

                    $($(this).attr('data-target')).attr('value', parseInt($(this).val(), 10))
                });
        $('.IsInternal_checkBoxs')
            .on('click',
                function () {
                    $(this).parents('label').siblings().find('.IsInternal_checkBoxs').removeAttr('checked');
                    //siblings().removeAttr("checked");
                    $($(this).attr('data-target')).attr('value', parseInt($(this).val(), 10));
                });
        $(".checkIsAll")
            .click(function () {

                var select = jQuery(this);
                var rel = $(select.attr("data-rel"));
                var ischeck = select.is(':checked');
                if (ischeck) {
                    select.attr("value", 1);
                    rel.attr("value", 1);
                } else {
                    select.attr("value", 0);
                    rel.attr("value", 0);
                }
                var url = select.attr('data-url');
                var target = select.attr('data-target');
                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    url: url,
                    data: JSON.stringify({
                        value: select.attr("value"
                        ),
                    }),
                    beforeSend: function () {
                        jQuery(target).addClass("loading").html("");
                    },
                    complete: function () {
                        jQuery(target).removeClass("loading");
                    },
                    error: function () {
                        jQuery(target).removeClass("loading");
                    },
                    dataType: "json",
                    success: function (data) {
                        Utils.sectionBuilder(data);
                        if (data.hasOwnProperty("isCust")) {
                            jQuery(target).html(data.htCust);
                        }
                        $('.selectpicker').selectpicker();
                        $('.autoSelect2').select2();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
                //  };
            });

        $(".addChild-btn")
            .on("click",
                function () {
                    var target = $(this).attr("data-target");
                    var template = $(this).attr("data-template");
                    $(target).removeClass("hidden").append($(template).html());
                    //QLNS.onEvent();
                    Utils.updateInputDate();
                });
        $(document)
            .on("click",
                ".deleteChild-btn",
                function () {
                    $(this).parents(".childItem").remove();
                });

        $("#btn_printf_preview")
            .on("click",
                function (e) {
                    e.preventDefault();
                    try {
                        var form = $(this).closest("form");
                        var containmes = form.find('#messeage_err');
                        var data = Utils.getSerialize(form);
                        var url = $(this).attr('data-url');
                        jQuery.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            beforeSend: function () {
                            },
                            complete: function () {
                            },
                            error: function () {
                            },
                            success: function (response) {
                                Utils.sectionBuilder(response, response.isErr);
                                if (containmes.length > 0)
                                    containmes.text(response.ctMeg);
                                if (!response.isErr)
                                    window.location = response.url +
                                        '?filename=' +
                                        response.filename +
                                        '&path=' +
                                        response.path;
                            }
                        });
                    } catch (e) {

                    }
                    return false;
                });
        $("._printf").on("click",
                function (e) {
                    e.preventDefault();
                    try {
                        var url = $(this).attr('data-url');
                        jQuery.ajax({
                            type: "POST",
                            url: url,
                            data: JSON.stringify({
                                id: 1,
                            }),
                            beforeSend: function () {
                            },
                            complete: function () {
                            },
                            error: function () {
                            },
                            success: function (response) {
                                Utils.sectionBuilder(response, response.isErr);
                                if (!response.isErr) {
                                    var link = response.url +
                                        '?filename=' +
                                        response.filename +
                                        '&path=' +
                                        response.path;
                                    window.location.href = link;
                                }
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    return false;
                });

        function fileDownload(url, filename) {
            var link = document.createElement('a');
            link.setAttribute("type", "hidden");
            link.download = filename;
            link.href = location.protocol + '//' + location.host + url;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }

        $("#btn_import").on("click",
                function (e) {
                    e.preventDefault();
                    try {
                        var form = $(this).closest("form");
                        var containmes = form.find('#messeage_err');
                        var data = Utils.getSerialize(form);
                        var url = $(this).attr('data-url');
                        jQuery.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            beforeSend: function () {
                            },
                            complete: function () {
                            },
                            error: function () {
                            },
                            success: function (response) {
                                Utils.sectionBuilder(response, response.isErr);
                                if (containmes.length > 0)
                                    containmes.text(response.ctMeg);
                                if (!response.isErr) {
                                    if (response.onlyreload != 1) {
                                        var file = response.url +
                                            '?filename=' +
                                            response.filename +
                                            '&path=' +
                                            response.path;
                                        console.log(file);
                                        fileDownload(file, response.filename);
                                        localStorage.noti_enable = "true";
                                        localStorage.noti_type = response.type;
                                        localStorage.noti_text = response.noti;
                                        window.location.reload();
                                    } else {
                                        ThongBao(response.type, response.noti);
                                    }
                                }
                            }
                        });
                    } catch (e) {

                    }
                    return false;
                });
        $("#btn_import_reload").on("click",
                function (e) {
                    e.preventDefault();
                    try {
                        var form = $(this).closest("form");
                        //var containmes = form.find('#messeage_err');
                        var data = Utils.getSerialize(form);
                        var url = $(this).attr('data-url');
                        jQuery.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            beforeSend: function () {
                            },
                            complete: function () {
                            },
                            error: function () {
                            },
                            success: function (response) {
                                window.location = refresh;

                            }
                        });
                    } catch (e) {

                    }
                    return false;
                });

        jQuery(document).on("click", ".quickSort", function () {
            try {
                var form = $("#noti_form");
                var url = form.attr("action");
                var target = form.attr("data-target");
                var sortType = $(this).attr("value");
                var data = Utils.getSerialize(form);
                data.Sort = sortType;
                if (Utils.isEmpty(url)) {
                    return;
                }
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: url,
                    data: data,
                    beforeSend: function () {
                        jQuery(target).addClass("loading").html("");
                    },
                    complete: function () {
                        jQuery(target).removeClass("loading");
                    },
                    error: function () {
                        jQuery(target).removeClass("loading");
                    },
                    success: function (response) {
                        try {
                            if (form.attr("data-state") != "0") {
                                window.history.pushState(null, response.title, url + Utils.builderQString(data));
                                jQuery(document).prop("title", response.title);
                            }
                        } catch (e) {
                            console.log(e);
                        }

                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            jQuery(target).html(response.htCust);
                        }

                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Utils.updateChart(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent(jQuery(target));
                        if (form.hasClass("auto_resize_table")) {
                            QLNS.onAutoResize();
                        }
                        // Main.registerSelect2(jQuery(target));
                        jQuery(target).find(".selectpicker").selectpicker();
                        var cancelSearch = jQuery(".cancelSearch").is(":visible");
                        if (cancelSearch !== true) {
                            jQuery(".cancelSearch").show();
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });

        $("#check_all_read").change(function () {
            if (this.checked) {
                try {
                    var form = $("#noti_form");
                    var data = Utils.getSerialize(form);
                    if (typeof data.RedirectPath == "undefined")
                        data.RedirectPath = Utils.getRedirect();
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: jQuery(this).attr("href"),
                        data: data,
                        beforeSend: function () {
                            Utils.openOverlay();
                        },
                        complete: function () {
                            Utils.openOverlay();
                        },
                        error: function () {
                            Utils.openOverlay();
                        },
                        success: function (response) {
                            Utils.sectionBuilder(response);
                            if (response.hasOwnProperty("isCust")) {
                                Utils.closeOverlay();
                                jQuery(data.Target).html(response.htCust);
                            }
                            if (!Utils.isEmpty(data.TargetDeleteClick)) {
                                jQuery(data.TargetDeleteClick).fadeOut("fast", function () {
                                    jQuery(this).remove();
                                });
                            }
                            Utils.updateFormState(jQuery(data.Target));
                            Utils.updateScrollBar(jQuery(data.Target));
                        }
                    });
                } catch (e) {

                }
                return false;
            }


        });

        //chart
        jQuery(document).find(".hight-pie-chart-column").each(function () {
            try {
                var datas = JSON.parse($(this).attr('data-value'));
                var id = $(this).attr('id');
                var pieColors = datas.colors;
                var height = $(this).attr('data-height');
                var maxcolumn = $(this).attr('data-max-column');
                var dataStacking = $(this).attr("data-stacking");
                var datacolumn = datas.categories.length;
                console.log(datacolumn);
                if (height == '')
                    height = '610px'
                // Build the chart
                Highcharts.chart(id, {

                    chart: {
                        type: 'column',
                        height: height
                    },

                    title: {
                        text: datas.text
                    },
                    colors: ['#FCF54C', '#9CE076'],

                    xAxis: {
                        categories: datas.categories,//['Chuyên môn', 'Số hóa', 'Tiếp nhận', 'Tiếp nhận TT', 'Chánh VP', 'Chuyên viên', 'CSS', 'DEV', 'FSISoft', 'Phó Tránh VP', 'Chính sách CB', 'Sale', 'Test', 'Test1', 'Trưởng BP chuyên môn', 'Văn phòng']
                        // min: 0,
                        // max: maxcolumn,
                        crosshair: true,
                        labels: {
                            rotation: 0,
                        }
                    },

                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: ''
                        }
                    },

                    tooltip: {
                        shared: true,
                        useHTML: true,
                        formatter: function () {
                            if (dataStacking != "false") {
                                var points = '<table class="tip"><caption><b style="color: #222">' + this.x + '</b></caption>'
                                + '<tbody>';
                                $.each(this.points, function (i, point) {
                                    points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>'
                                    + '<td style="text-align: right"><b>' + point.y + '</b></td></tr>'
                                });
                                points += '<tr><td>Tổng: </td>'
                                + '<td style="text-align:right"><b>' + this.points[0].total + '</b></td></tr>'
                                + '</tbody></table>';
                                return points;

                            } else {
                                var points = '<table class="tip"><caption><b>' + this.x + '</b></caption>'
                                + '<tbody>';
                                $.each(this.points, function (i, point) {
                                    points += '<tr><td><i class="fa fa-circle" aria-hidden="true" style="color: ' + point.series.color + '"></i> ' + point.series.name + ': </td>'
                                    + '<td style="text-align: right"><b>' + point.y + '</b></td></tr>'
                                });
                                points += '</tbody></table>';
                                return points;

                            }
                        }
                    },

                    plotOptions: {
                        column: {
                            stacking: 'normal'
                        },
                        series: {
                            pointWidth: 30
                        }
                    },

                    series: datas.series
                });

            } catch (e) {
                console.log(e);
            }
        });


        jQuery(document).on("keyup", ".change_salary", function () {

            $($(this).attr('data-target')).val(replaceall($(this).val()).toString());

            var month = $("select[name='Month']").val();
            var year = $("select[name='Year']").val();
            var salary = $("input[name='Salary']").val();
            var advance = $("input[name='Advance']").val();
            var overtime = $("#OverTime").val();
            var salaryot = $("input[name='SalaryOT']").val();
            var recover = $("input[name='Recover']").val();
            var insurance = $("input[name='Insurance']").val();
            var unionfund = $("input[name='UnionFund']").val();
            var deductionmoney = $("input[name='DeductionMoney']").val();
            var taxbase = $("#TaxBase").val();
            var taxmoney = $("#TaxMoney").val();
            var bank = $("input[name='Bank']").val();
            var numberbank = $("input[name='NumberBank']").val();
            var assigner = $("input[name='Assigner']").val();
            var dependperson = $("input[name='DependPerson']").val();
            var insurancecompany = $("input[name='InsuranceCompany']").val();
            var total = $("input[name='Total']").val();
            var totalpay = $("input[name='TotalPay']").val();
            var dayofwork = $("#DayOfWork").val();
            var contractvalue = $("input[name='ContractValue']").val();
            var dayWorkCurrentContract = $("#dayWorkCurrentContract").val();
            var pastContractValue = $("#pastContractValue").val();
            var dayWorkPassContract = $("#dayWorkPassContract").val();
            var standardaywork = $("input[name='StandarDaywork']").val();
            var unionrate = $("input[name='UnionRate']").val();
            var basicSalary = $("input[name='BasicSalary']").val();
            //var advanceTotal = $("input[name='AdvanceSalaryTotal']").val();

            if (dayofwork > 0) {
                salary = parseFloat(contractvalue) * parseFloat(replaceall(dayofwork)) / parseFloat(replaceall(standardaywork));
            } else {
                salary = parseFloat(salary);
            }
            if ($(this).attr('id') == $("input[name='Salarys']").attr('id'))
                salary = $("#Salary").val();

            salaryot = parseFloat(contractvalue) * parseFloat(replaceall(overtime)) / 8 / parseFloat(replaceall(standardaywork));
            if ($(this).attr('id') == $("input[name='SalaryOTs']").attr('id'))
                salaryot = $("#SalaryOT").val();

            taxbase = parseFloat(salary) - parseFloat(insurance) - parseFloat(deductionmoney) + parseFloat(salaryot);
            if ($(this).attr('id') == $("input[name='TaxBases']").attr('id'))
                taxbase = $("#TaxBase").val();

            taxmoney = CountSalary(taxbase);
            if ($(this).attr('id') == $("input[name='TaxMoneys']").attr('id'))
                taxmoney = $("#TaxMoney").val();

            if ($(this).attr('id') == $("input[name='UnionFunds']").attr('id'))
                unionfund = $("#UnionFund").val();

            total = CalculTotal(parseFloat(salary), parseFloat(salaryot), parseFloat(advance), parseFloat(recover), parseFloat(insurance), parseFloat(replaceall(unionfund)), parseFloat(taxmoney));
            //total = parseFloat(salary) + parseFloat(salaryot) - parseFloat(advance) - parseFloat(recover) - parseFloat(insurance) - parseFloat(replaceall(unionfund)) - parseFloat(taxmoney);
            if ($(this).attr('id') == $("input[name='Totals']").attr('id'))
                total = $("#Total").val();

            //totalpay = parseFloat(salary) + parseFloat(salaryot) + parseFloat(insurancecompany);
            totalpay = CalculTotalPay(parseFloat(salary), parseFloat(salaryot), parseFloat(insurancecompany));

            if ($(this).attr('id') == $("input[name='TotalPays']").attr('id'))
                totalpay = $("#TotalPay").val();

            if ($(this).attr('id') == $("input[name='DayOfWorks']").attr('id'))
                dayofwork = $("#DayOfWork").val();
            if ($(this).attr('id') == $("input[name='OverTimes']").attr('id'))
                overtime = $("#OverTime").val();
            if ($(this).attr('id') == $("input[name='Advances']").attr('id'))
                advance = $("#Advance").val();
            if ($(this).attr('id') == $("input[name='Recovers']").attr('id'))
                recover = $("#Recover").val();
            if ($(this).attr('id') == $("#Insurance").attr('id'))
                insurance = $("#Insurance").val();

            if ($(this).attr('id') == $("#DeductionMoneys").attr('id'))
                deductionmoney = $("#DeductionMoney").val();





            $("input[name='Salarys']").val(Math.round(parseFloat(replaceall(salary, "'"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $("input[name='SalaryOTs']").val(Math.round(parseFloat(replaceall(salaryot, "'"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $("input[name='TaxBases']").val(Math.round(parseFloat(replaceall(taxbase, "'"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $("input[name='TaxMoneys']").val(Math.round(parseFloat(replaceall(taxmoney, "'"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $("input[name='TotalPays']").val(Math.round(parseFloat(replaceall(totalpay, "'"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $("input[name='Totals']").val(Math.round(parseFloat(replaceall(total, "'"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


        });


        jQuery(document).on("change", "#hodiday_type", function () {
            var selected = $("#hodiday_type").val();
            var holiday = $("#hodiday");
            var weekend = $("#weekend");
            var startdatespan = $("#start_date");
            var enddatespan = $("#end_date");
            if (selected == 1) //vacation
            {
                if (holiday.hasClass("hidden")) {
                    holiday.removeClass("hidden");
                }
                if (!weekend.hasClass("hidden")) {
                    weekend.addClass("hidden")
                }
                startdatespan.text(startdatespan.attr("data-holiday-text")).append("<span class='red'>*</span>");
                enddatespan.text(enddatespan.attr("data-holiday-text")).append("<span class='red'>*</span>");
            }
            else {
                if (!holiday.hasClass("hidden")) {
                    holiday.addClass("hidden");
                }
                if (weekend.hasClass("hidden")) {
                    weekend.removeClass("hidden")
                }
                startdatespan.text(startdatespan.attr("data-weekend-text")).append("<span class='red'>*</span>");
                enddatespan.text(enddatespan.attr("data-weekend-text")).append("<span class='red'>*</span>");
            }
        });

        function replaceall(str, param) {
            str = str.toString().replace(/,/g, '');
            return str;
        };
        function CalculTotal(salary, salaryot, advance, recover, insurance, unionfund, taxmoney) {
            return salary + salaryot - advance - recover - insurance - unionfund - taxmoney;
        };
        function CalculTotalPay(salary, salaryot, insurancecompany) {
            return salary + salaryot + insurancecompany;
        };


    },


    upEVent: function () {

    },


    onAutoResize: function () {
        $("#checkIn_Table.large-only").find("tr.employeeInfo").each(function () {
            var employHeight = jQuery(this).height();
            var tableInner = $(this).find(".large-only");
            var sumHeght = 0;
            var count = 0;
            var trInner = tableInner.find("tr.checkInRow");
            trInner.each(function () {
                count = jQuery(this).attr('data-count');
                var tdHeight = jQuery(this).height();
                sumHeght = sumHeght + tdHeight;
            });
            if (sumHeght < employHeight) {
                tableInner.closest("div").css('max-height', employHeight + 'px');
                var height = employHeight / count;
                trInner.each(function () {
                    jQuery(this).css('height', height + 'px');
                });
            }
        });
    },
};


function ThongBao(type, text) {
    var str = '<div class="row flash flash-' + type + '">' +
                '<ul>' +
                    '<li>' + text + '</li>' +
                '</ul>' +
                '<i class="ui-icon ui-icon-closethick close-flash"></i>' +
            '</div>';

    jQuery("#Section").prepend(str);
    setTimeout(function () {
        jQuery('.flash-' + type).fadeOut("fast");
    }, 3000);
};
function CountSalary(taxBase) {
    var taxMoney = 0;
    if (taxBase > 80000000) {
        taxMoney = (taxBase - 80000000) * parseFloat('0.35') + 18150000;
    }
    else if (taxBase > 52000000)
        taxMoney = (taxBase - 52000000) * parseFloat('0.3') + 9750000;
    else if (taxBase > 32000000)
        taxMoney = (taxBase - 32000000) * parseFloat('0.25') + 4750000;
    else if (taxBase > 18000000)
        taxMoney = (taxBase - 18000000) * parseFloat('0.2') + 1950000;
    else if (taxBase > 10000000)
        taxMoney = (taxBase - 10000000) * parseFloat('0.15') + 750000;
    else if (taxBase > 5000000)
        taxMoney = (taxBase - 5000000) * parseFloat('0.1') + 250000;
    else
        taxMoney = taxBase * parseFloat('0.05');

    return taxMoney;
};
jQuery(document).ready(function () {

    QLNS.init();

    if (localStorage.noti_enable === "true") {
        var type = localStorage.noti_type;
        var text = localStorage.noti_text;
        ThongBao(type, text);
        localStorage.removeItem("noti_enable");
        localStorage.removeItem("noti_type");
        localStorage.removeItem("noti_text");
    }
    $(document).on('change', '.select_Employee_History', function () {
        var select = jQuery(this);
        var type = parseInt(select.attr('data-type'), 10);
        var month = 0;
        var year = 0;
        if (type = 1) {
            month = select.val();
            year = $(select.attr('data-link')).val();
        }
        else {
            month = $(select.attr('data-link')).val();
            year = select.val();
        }
        var url = select.attr('data-url') + "Month=" + month + "&" + "Year=" + year;
        var target = select.attr('data-target');
        jQuery.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            async: false,
            url: url,
            data: JSON.stringify({
            }),
            beforeSend: function () {
                jQuery(target).addClass("loading").html("")
            },
            complete: function () {
                jQuery(target).removeClass("loading");
            },
            error: function () {
                jQuery(target).removeClass("loading");
            },
            dataType: "json",
            success: function (data) {
                Utils.sectionBuilder(data);
                if (data.hasOwnProperty("isCust")) {
                    jQuery(target).html(data.htCust);
                    console.log(jQuery(target).html(data.htCust));
                    Utils.updateScrollBar(jQuery(target));
                }
                $('.selectpicker').selectpicker();
                $('.autoSelect2').select2();
                //QLNS.onEvent();

            }
        });
    });
});