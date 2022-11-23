

var Main = {
    init: function () {
        Main.onEvent();
        Main.upEvent();
        Main.backLink();
        //Main.registerSelect2();
    },
    upEvent: function (container) {
        if (Utils.isEmpty(container))
            container = jQuery(document);

        container.find('.selectchange').on('changed.bs.select', function (e) {
            console.log('selectchange');
            //jQuery(document).on("changed.bs.select", ".selectchange", function (e) {
            e.preventDefault();
            var target = jQuery(this).closest('form').find('#BEDetail').first();
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

        container.find(".useDragable").draggable({
            cursorAt: { left: 5 }
        });
        Cust.dataTables_filter_col();
        container.find('.dataTables_wrapper .table:not(.useTreegrid)').each(function () {
            if (!$(this).hasClass("stacktable_inited") && !$(this).hasClass("not_js_responsive")) {
                $(this).addClass("stacktable_inited");
                $(this).stacktable();
            }
        });
        container.find(".selectpicker").selectpicker();
        container.find(".editorSummernote").each(function () {
            if (!jQuery(this).hasClass("setSummernote")) {
                jQuery(this).addClass("setSummernote").summernote({
                    height: '200px'
                });
            }
        });
        container.find(".nestable").each(function () {
            if (!jQuery(this).hasClass("setNestabled")) {
                var obj = jQuery(this);
                var maxDepth = obj.attr("data-max-depth") || 0;
                obj.addClass("setNestabled").nestable({
                    maxDepth: maxDepth
                }).on('change', function (e) {

                    var ids = [];
                    var idTheme = obj.attr("data-theme-id");
                    var idRegion = obj.attr("data-region-id");
                    var idPage = obj.attr("data-page-id");
                    var url = obj.attr("data-url");
                    var data = obj.nestable('serialize');

                    for (var i in data) {
                        var item = data[i];
                        ids.push(item.id);
                    }
                    if (!Utils.isEmpty(url)) {
                        var dataPost = {};
                        if (obj.hasClass("regions")) {
                            dataPost = {
                                IDTheme: idTheme,
                                IDPage: idPage || 0,
                                IDRegions: JSON.stringify(ids)
                            };
                        }
                        else {
                            dataPost = {
                                IDTheme: idTheme,
                                IDRegion: idRegion,
                                IDPage: idPage || 0,
                                IDBlocks: JSON.stringify(ids)
                            };
                        }

                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            url: url,
                            data: dataPost,
                            success: function (response) {
                                obj.closest(".ui-dialog").addClass("refresh");
                            }
                        });
                    }
                });
            }
        });

        container.find(".useSortable").each(function () {
            if (jQuery(this).hasClass("inited")) {
                jQuery(this).sortable("destroy");
            }
            jQuery(this).sortable({
                items: ".sortitem"
            });
        });
        container.find('.useRate').each(function () {
            var obj = jQuery(this);
            if (!obj.hasClass("inited")) {
                obj.addClass("inited").rating({
                    min: 0,
                    max: 5,
                    step: 1,
                    size: 'xs',
                    showClear: false,
                    hoverOnClear: false,
                    theme: 'krajee-svg'
                }).on("rating.change", function (event, value, caption) {

                    var data = obj.getDataUppername();
                    data.Rating = value;
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: data.Href,
                        data: data,
                        beforeSend: function () {
                        },
                        complete: function () {
                        },
                        error: function () {
                        },
                        success: function (response) {
                        }
                    });
                });
            }
        });
        container.find("select.autoselect2").each(function () {
            $(this).select2();
        })
        container.find("select.selectpicker").each(function () {
            $(this).selectpicker();
        })
        container.find(".morris-line-chart").each(function () {
            var mrdata = JSON.parse(jQuery(this).find('#txtdata').val());
            Morris.Line({
                element: jQuery(this),
                data: mrdata.data,
                xkey: mrdata.xkey,
                ykeys: mrdata.ykeys,
                labels: mrdata.labels,
                parseTime: false
            });
        });
        container.find(".morris-bar-chart").each(function () {
            var mrdata = JSON.parse(jQuery(this).find('#txtdata').val());
            Morris.Bar({
                element: jQuery(this),
                data: mrdata.data,
                xkey: mrdata.xkey,
                ykeys: mrdata.ykeys,
                labels: mrdata.labels
            });
        });
        container.find(".morris-area-chart").each(function () {
            var mrdata = JSON.parse(jQuery(this).find('#txtdata').val());
            Morris.Area({
                element: jQuery(this),
                data: mrdata.data,
                xkey: mrdata.xkey,
                ykeys: mrdata.ykeys,
                labels: mrdata.labels,
                parseTime: false
            });
        });
        container.find(".morris-stacked-chart").each(function () {
            var mrdata = JSON.parse(jQuery(this).find('#txtdata').val());
            Morris.Bar({
                element: jQuery(this),
                data: mrdata.data,
                xkey: mrdata.xkey,
                ykeys: mrdata.ykeys,
                labels: mrdata.labels,
                stacked: true
            });
        });
        container.find(".morris-donut-chart").each(function () {
            try {
                function labelFormatter(label, series) {
                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + Math.round(series.percent) + "%</div>";
                }
                var mrdata = JSON.parse(jQuery(this).find('#txtdata').val());
                if (typeof mrdata != "undefined") {
                    jQuery(this).unbind();
                    $.plot(jQuery(this), mrdata.data, {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 2 / 3,
                                    formatter: labelFormatter,
                                    threshold: 0
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
        container.find(".plot-pie-chart").each(function () {
            var data = jQuery(this).attr('data-value');
            jQuery(this).unbind();
            $.plot(jQuery(this), data, {
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
        container.find(".equip_pie_chart").each(function () {
            try {
                function labelFormatter(label, series) {
                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
                }
                var data = jQuery(this).attr('data-value');
                if (typeof data != "undefined") {
                    data = jQuery.parseJSON(data);
                    jQuery(this).unbind();
                    $.plot(jQuery(this), data, {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 2 / 3,
                                    formatter: labelFormatter,
                                    threshold: 0.1
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }

        });
        container.find("#equip_borrow_Chart").each(function () {

            var item = document.getElementById('equip_borrow_Chart');
            var e_category = new Array();
            var e_borrow = new Array();
            var e_total = new Array();
            var e_other = new Array();

            var dataChart = item.getAttribute('data-value');
            var labels = item.getAttribute('data-labels');
            var barColors = item.getAttribute('data-barColors');

            if (typeof dataChart != "undefined") {
                dataChart = jQuery.parseJSON(dataChart);
                labels = jQuery.parseJSON(labels);
                barColors = jQuery.parseJSON(barColors);


                for (var i = 0; i < dataChart.length; i++) {
                    e_category.push(dataChart[i].e_category);
                    e_borrow.push(dataChart[i].e_borrow);
                    e_total.push(dataChart[i].e_total);
                    e_other.push(dataChart[i].e_other);
                }
                Morris.Bar({
                    element: 'equip_borrow_Chart',
                    data: dataChart,
                    xkey: 'e_category',
                    ykeys: ['e_borrow', 'e_total'],
                    labels: labels,
                    hideHover: 'auto',
                    barColors: barColors
                });
                //Legend
                var legendHTML = "";
                for (var i = 0; i < labels.length; i++) {
                    legendHTML += "<div class='Legend_item'><span style='display:inline-block;width:20px;background-color:" + barColors[i] + ";'>&nbsp;</span> " + labels[i] + "</div>";
                }
                jQuery(this).after('<div class="DocproChart_legend">' + legendHTML + '</div>');
            }
        });
        container.find("#equip_status_Chart").each(function () {

            var item = document.getElementById('equip_status_Chart');
            var e_category = new Array();
            var e_old = new Array();
            var e_new = new Array();
            var e_other = new Array();

            var dataChart = item.getAttribute('data-value');
            var labels = item.getAttribute('data-labels');
            var barColors = item.getAttribute('data-barColors');

            if (typeof dataChart != "undefined") {
                dataChart = jQuery.parseJSON(dataChart);
                labels = jQuery.parseJSON(labels);
                barColors = jQuery.parseJSON(barColors);

                for (var i = 0; i < dataChart.length; i++) {
                    e_category.push(dataChart[i].e_category);
                    e_old.push(dataChart[i].e_old);
                    e_new.push(dataChart[i].e_new);
                    e_other.push(dataChart[i].e_other);
                }
                Morris.Bar({
                    element: 'equip_status_Chart',
                    data: dataChart,
                    xkey: 'e_category',
                    ykeys: ['e_old', 'e_new', 'e_other'],
                    labels: labels,
                    hideHover: 'auto',
                    barColors: barColors
                });
                //Legend
                var legendHTML = "";
                for (var i = 0; i < labels.length; i++) {
                    legendHTML += "<div class='Legend_item'><span style='display:inline-block;width:20px;background-color:" + barColors[i] + ";'>&nbsp;</span> " + labels[i] + "</div>";
                }
                jQuery(this).after('<div class="DocproChart_legend">' + legendHTML + '</div>');
            }
        });
        container.find(".planChart").each(function () {
            var item = document.getElementById('planChart');
            var categories = new Array();
            var plans = new Array();
            var actuals = new Array();
            var title = item.getAttribute('data-title');
            var subtitle = item.getAttribute('data-sub-title');
            var dataChart = item.getAttribute('data-value');
            if (typeof dataChart != "undefined") {
                dataChart = jQuery.parseJSON(dataChart);
                for (var i = 0; i < dataChart.length; i++) {
                    categories.push(dataChart[i].Category);
                    plans.push(dataChart[i].Plan);
                    actuals.push(dataChart[i].Actual);
                }

                Highcharts.chart('planChart', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: title,
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: subtitle
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: -10,
                        floating: true,
                        borderWidth: 0,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0)'),
                        shadow: false,
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Thực tế',
                        data: actuals,
                        color: "#ffce55"
                    }, {
                        name: 'Kế hoạch',
                        data: plans,
                        color: "#5db2ff"
                    }]
                });
                var actuals_color = "#5db2ff",
                percent = 0;
                var cIndex = 0;
                for (var i = 0; i < dataChart.length; i++) {
                    //percent = Math.round(dataChart[i].Actual / dataChart[i].Plan * 100, 3);
                    //if (percent < 30) {
                    //    actuals_color = "#444444"; // Màu đen
                    //}
                    //else if (percent >= 30 && percent < 50) {
                    //    actuals_color = "#d43f3a"; // Màu đỏ
                    //}
                    //else if (percent >= 50 && percent < 80) {
                    //    actuals_color = "#ff9800"; // Màu cam
                    //}
                    //else if (percent >= 80 && percent < 100) {
                    //    actuals_color = "#ffeb3b"; // Màu vàng
                    //}
                    //else {
                    //    actuals_color = "#5cb85c"; // Màu xanh
                    //}
                    //jQuery("#planChart .highcharts-series-0.highcharts-bar-series rect").each(function () {
                    //    var size = jQuery("#planChart .highcharts-series-0.highcharts-bar-series rect").length;
                    //    var index = jQuery(this).index();
                    //    if (index === i) {
                    //        jQuery(this).css("fill", actuals_color);
                    //    }
                    //});
                    jQuery("#planChart .highcharts-axis-labels.highcharts-xaxis-labels text tspan").each(function () {
                        jQuery(this).html(categories[cIndex]);
                        cIndex++;
                    });
                }

            }
        });
        container.find(".main-chart").each(function () {

            var target = $(this).attr("data-target");
            var datas = jQuery.parseJSON($("#" + target).attr("data-categories"));
            Highcharts.chart(target, {
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'sans-serif'
                    }
                },

                title: {
                    text: datas.text,
                    style: {
                        fontFamily: 'Segoe UI',
                        fontSize: '14px',
                        color: '#444',
                        fontWeight: '400 !important',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    }
                },

                xAxis: {
                    categories: datas.categories
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Số lượng',
                        style: {
                            fontFamily: 'Segoe UI',
                            fontSize: '13px',
                            color: '#444',
                            fontWeight: '400 !important',
                            textAlign: 'center',
                            // textTransform: 'uppercase',
                        }
                    },
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: datas.series
            });
        });
        container.find(".pie-chart-plot").each(function () {
            try {
                function labelFormatter(label, series) {
                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
                }
                var data2 = [
              { label: "Windows", data: [[1, 10]], color: themefifthcolor },
              { label: "Linux", data: [[1, 30]], color: themesecondary },
              { label: "Mac OS X", data: [[1, 90]], color: themethirdcolor },
              { label: "Android", data: [[1, 70]], color: themefourthcolor },
              { label: "Unix", data: [[1, 80]], color: themeprimary }
                ];
                var data = JSON.parse(jQuery(this).attr('data-value'));
                jQuery(this).unbind();
                $.plot(jQuery(this), data2, {
                    series: {
                        pie: {
                            show: true,
                            combine: {
                                color: "#999",
                                threshold: 0.05
                            }
                        }
                    },
                    legend: {
                        show: false
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });


        container.find(".hight-pie-chart").each(function () {
            try {
                var datas = JSON.parse($(this).attr('data-value'));
                var text = $(this).attr('data-text');
                var id = $(this).attr('id');
                var height = $(this).attr('data-height');
                if (height == '')
                    height = '610px'
                var pieColors = datas.colors;
                // Build the chart
                Highcharts.chart(id, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        height: height

                    },
                    title: {
                        text: text,
                        type: 'column'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.percentage:.1f} %',
                                distance: -50,
                                filter: {
                                    property: 'percentage',
                                    operator: '>',
                                    value: 4
                                }
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Tỉ lệ',
                        data: datas.data,
                    }]
                });


            } catch (e) {
                console.log(e);
            }
        });

    },
    onEvent: function () {
        // validateform
        jQuery(document).on("submit", ".validateForm", function () {
            var rel = jQuery(this).getData()["ref"];
            var result = false;
            jQuery(rel).siblings("span.error_ms").addClass("hidden");
            if (rel != undefined && !jQuery(rel).prop("checked")) {
                jQuery(rel).siblings("span.error_ms").removeClass("hidden");
                return Utils.validateDataForm(jQuery(this)) && false;
            }
            return Utils.validateDataForm(jQuery(this));
        });

        jQuery(document).on("change", ".datetime, .date", function (e) {
            try {
                var form = jQuery(e.currentTarget).closest("form");
                if (form.hasClass("bootstrapValidator")) {
                    form.bootstrapValidator('revalidateField', jQuery(e.currentTarget).attr("name"));
                }
            } catch (e) { }
        });
        $(document).on("change", ".date", function (e) {
            var dateVal = $(this).val();
            if (dateVal === "") {
                return;
            }
            var name = $(this).attr('placeholder');
            var invalidText;
            if (name != undefined)
                invalidText = name + " không hợp lệ";
            else
                invalidText = "Ngày nhập không hợp lệ";
            var text = $(this).siblings('small:first');
            var iTagert = $(this).siblings('i');
            if (!Utils.checkIsDate(dateVal)) {
                if (text.length == 0) {
                    text = $("<small class=\"help-block\" data-bv-for=\"" + $(this).attr('name') + "\" data-bv-result=\"VALID\" style=\"color: rgb(228, 111, 97); display: none;\"></small>");
                    $(this).closest("div").append(text);
                }
                text.show();
                text.text(invalidText);
                text.attr("data-bv-result", "INVALID");
                iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                $(this).parents("div.form-group").toggleClass("has-success has-error");
            } else {
                text.hide();
                text.text("");
                text.attr("data-bv-result", "VALID");
                iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                $(this).parents("div.form-group").toggleClass("has-success has-success");
                Utils.compareDate($(this));
            }
        });

        $(document).on("change", ".compareDate", function (e) {
            var dateCompare = $(this).val();
            var dateTarget = $(this).data("date-tagert");
            var dateTargets = $(this).data("date-tagerts");
            if (dateTargets != null && dateTargets != 'undefined') {
                dateTarget = $(dateTargets).val();
            }
            var textCompare = $(this).data('title-show');
            var textValue = $(this).siblings('small').text();
            var checkequals = $(this).data('equals-check');
            if (dateTarget != null && dateTarget != 'undefined' && dateCompare != null && dateCompare != "" && dateCompare != 'undefined') {
                var o = dateCompare.split("-"), s = dateTarget.split("-");
                d = o[2] + o[1] + o[0],
                g = s[2] + s[1] + s[0];
                var smallTagert = $(this).siblings('small');
                var iTagert = $(this).siblings('i');
                if (checkequals == true) {
                    if (parseInt(d) > parseInt(g)) {
                        smallTagert.show();
                        smallTagert.text(textCompare);
                        smallTagert.attr("data-bv-result", "INVALID");
                        iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                        $(this).parents("div.form-group").toggleClass("has-success has-error")
                    } else {
                        smallTagert.hide();
                        smallTagert.text(textValue);
                        smallTagert.attr("data-bv-result", "VALID");
                        iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                        $(this).parents("div.form-group").toggleClass("has-success has-success")
                    }
                }
                else {

                    if (parseInt(d) < parseInt(g)) {
                        smallTagert.show();
                        smallTagert.text(textCompare);
                        smallTagert.attr("data-bv-result", "INVALID");
                        iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                        $(this).parents("div.form-group").toggleClass("has-success has-error")
                    } else {
                        smallTagert.hide();
                        smallTagert.text(textValue);
                        smallTagert.attr("data-bv-result", "VALID");
                        iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                        $(this).parents("div.form-group").toggleClass("has-success has-success")
                    }
                }
            }
        });
        $(document).on("change", ".compareDatetime", function (e) {
            var dateCompare = $(this).val();
            var dateTarget = $(this).data("date-tagert");
            var dateTargets = $(this).data("date-tagerts");
            if (dateTargets != null && dateTargets != 'undefined') {
                dateTarget = $(dateTargets).val();
            }
            var textCompare = $(this).data('title-show');
            var textValue = $(this).siblings('small').text();
            var checkequals = $(this).data('equals-check');
            if (dateTarget != null && dateTarget != 'undefined' && dateCompare != null && dateCompare != "" && dateCompare != 'undefined') {
                var ndateCompare = dateCompare.split(" ");
                var ndateTarget = dateTarget.split(" ");
                var o = ndateCompare[0].split("-"), s = ndateTarget[0].split("-");
                d = o[2] + o[1] + o[0],
                g = s[2] + s[1] + s[0];
                var smallTagert = $(this).siblings('small');
                var iTagert = $(this).siblings('i');
                if (checkequals == true) {
                    if (parseInt(d) > parseInt(g)) {
                        smallTagert.show();
                        smallTagert.text(textCompare);
                        smallTagert.attr("data-bv-result", "INVALID");
                        iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                        $(this).parents("div.form-group").toggleClass("has-success has-error")
                    } else {
                        smallTagert.hide();
                        smallTagert.text(textValue);
                        smallTagert.attr("data-bv-result", "VALID");
                        iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                        $(this).parents("div.form-group").toggleClass("has-success has-success")
                    }
                }
                else {

                    if (parseInt(d) < parseInt(g)) {
                        smallTagert.show();
                        smallTagert.text(textCompare);
                        smallTagert.attr("data-bv-result", "INVALID");
                        iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                        $(this).parents("div.form-group").toggleClass("has-success has-error")
                    } else {
                        smallTagert.hide();
                        smallTagert.text(textValue);
                        smallTagert.attr("data-bv-result", "VALID");
                        iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                        $(this).parents("div.form-group").toggleClass("has-success has-success")
                    }
                }
            }
        });
        $(document).on("change", ".validatePhoneNumber", function (e) {
            var regexPhoneNumber = "/^[0-9-+]+$/";
            var phoneNumber = $(this).val();
            var textCompare = $(this).data('title-show');
            var textValue = $(this).siblings('small').text();
            var smallTagert = $(this).siblings('small');
            var iTagert = $(this).siblings('i');
            //if (regexPhoneNumber.test(phoneNumber)) {
            //    smallTagert.show();
            //    smallTagert.text(textCompare);
            //    smallTagert.attr("data-bv-result", "INVALID");
            //    iTagert.toggleClass('glyphicon-ok glyphicon-remove');
            //    $(this).parents("div.form-group").toggleClass("has-success has-error")
            //} else {
            //    smallTagert.hide();
            //    smallTagert.text(textValue);
            //    smallTagert.attr("data-bv-result", "VALID");
            //    iTagert.toggleClass('glyphicon-oke glyphicon-oke');
            //    $(this).parents("div.form-group").toggleClass("has-success has-success")
            //}
        });
        jQuery(document).on("click", ".close-flash", function () {
            jQuery(this).closest(".flash").fadeOut("fast");
        });
        jQuery(document).on("click", ".closeDialog", function () {
            Utils.closeOverlay(true);
        });
        jQuery(document).on("click", ".closeForm", function () {
            jQuery(this).closest("form").slideUp("fast");
        });
        jQuery(document).on("click", ".deleteItem", function () {
            jQuery(this).closest(".item").remove();
        });




        jQuery(document).on("click", ".openDialog", function () {
            var data = jQuery(this).getData();
            var dialoger = jQuery(data.target);
            var maxH = jQuery(window).height();
            if (!dialoger.hasClass("ui-dialog-content")) {
                jQuery(".ui-dialog[aria-describedby='" + dialoger.attr("id") + "']").remove();
            }
            dialoger.dialog({
                width: data.width,
                resizable: false,
                open: function () {
                    if (maxH < dialoger.height()) {
                        dialoger.css("height", maxH - 50);
                    }
                    if (typeof data.formTarget != 'undefined') {
                        dialoger.attr("data-target", data.formTarget);
                    }
                    if (typeof data.formInsertType != 'undefined') {
                        dialoger.attr("data-insert-type", data.formInsertType);
                    }
                    if (typeof data.formClass != 'undefined') {
                        dialoger.addClass(data.formClass);
                    }
                    if (dialoger.hasClass("uhf50d")) {
                        dialoger.closest(".ui-dialog").addClass("hf50d");
                    }
                    if (dialoger.hasClass("bootstrapValidator")) {
                        dialoger
                            .bootstrapValidator('disableSubmitButtons', false)
                            .bootstrapValidator('resetForm', true);
                        dialoger.reset();

                        if (dialoger.hasClass("quickSubmit") && dialoger.hasClass("bootstrapValidator")) {
                            dialoger.removeClass("bootstrapValidator").bootstrapValidator('destroy');
                            dialoger.unbind();
                        }
                    }

                    Utils.openOverlay();
                    Utils.updateFormState(dialoger);
                    Utils.updateScrollBar(dialoger);
                    Autocomplete.init(dialoger);

                    if (typeof data.id != 'undefined') {
                        dialoger.find("input[name='ID']").val(data.id);
                    }
                    if (typeof data.parentIdi != 'undefined') {
                        dialoger.find("input[name='Parent']").val(data.parentId);
                    }
                    if (typeof data.parentName != 'undefined') {
                        dialoger.find("input[name='ParentName']").val(data.parentName);
                    }
                },
                close: function () {
                    Utils.closeOverlay();
                }
            });
            return false;
        });
        jQuery(document).on("click", ".quickTree", function () {
            try {
                var obj = jQuery(this);
                var data = obj.getDataUppername();
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: data.Url,
                    data: data,
                    beforeSend: function () {
                        obj.addClass("loading-btn");
                    },
                    complete: function () {
                        obj.removeClass("loading-btn");
                    },
                    error: function () {
                        obj.removeClass("loading-btn");
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        Utils.updateScrollBar(jQuery(".ui-dialog:visible"));
                    }
                });
            } catch (e) {

            }
            return false;
        });

        jQuery(document).on("click", ".clickViewer", function () {
            var data = jQuery(this).getDataUppername();
            if (jQuery(this).hasClass("tabOpen")) {
                jQuery("[href='" + data.TabOpen + "']").trigger("click");
            }
            Utils.viewer(data);
            return false;
        });
        jQuery(document).on("click", ".tabitem", function () {
            var tab = jQuery(this).attr("data-tab");
            jQuery(this).parent().find(".tabitem").removeClass("active");
            var container = jQuery(this).addClass("active").closest(".group-tab");
            container.children(".tab-data").addClass("hidden");
            container.find(tab).removeClass("hidden");
        });
        jQuery(document).on('change', '.tickAllFormGroup', function () {
            var checked = jQuery(this).is(":checked");
            jQuery(this).closest(".form-group").find(".tickItem").prop("checked", checked);
        });
        jQuery(document).on('change', '.tickKey', function () {

            if (jQuery(this).prop("checked")) {
                var checkeds = jQuery(this).closest(".tickGroup").find(".tickItem").filter(":checked");
                if (checkeds.length == 0) {
                    jQuery(this).closest(".form-group").find(".tickItem").first().prop("checked", true);
                }
            } else {
                jQuery(this).closest(".form-group").find(".tickItem").prop("checked", false);
            }
        });
        jQuery(document).on('change', '.tickItem', function () {

            if (jQuery(this).prop("checked")) {
                jQuery(this).closest(".tickGroup").find(".tickKey").prop("checked", true);
            } else {
                var checkeds = jQuery(this).closest(".tickGroup").find(".tickItem").filter(":checked");
                jQuery(this).closest(".form-group").find(".tickKey").first().prop("checked", checkeds.length != 0);
            }
        });

        jQuery(document).on('change', '.group-checkable', function () {

            var table = jQuery(this).closest("table, ._main--page");
            var set = table.find(".checkboxes");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    jQuery(this).prop("checked", true);
                    jQuery(this).closest('tr').addClass("active");
                } else {
                    jQuery(this).prop("checked", false);
                    jQuery(this).closest('tr').removeClass("active");
                }
            });
            Utils.toggleMultiTicks(table);
        });
        jQuery(document).on('change', '.checkboxes', function () {
            jQuery(this).closest('tr, .tr-item').toggleClass("active");
            Utils.toggleMultiTicks(jQuery(this).closest('table, .table'));
        });
        $(document).on("change", ".checkboxes", function () {
            var chk = $(this);
            var table = chk.closest("table");
            var chkAll = table.find(".group-checkable");
            var checkedAll = true;
            if (chk.prop("checked")) {
                table.find(".checkboxes").each(function () {
                    if (!$(this).prop("checked") && !$(this).prop('disabled')) {
                        checkedAll = false;
                        return;
                    }
                });
                if (checkedAll)
                    chkAll.prop("checked", true);
            } else {
                chkAll.prop("checked", false);
            }
        });
        jQuery(document).on("change", ".changeRel", function () {
            var v = jQuery(this).prop("checked") ? 1 : 0;
            var data = jQuery(this).getDataUppername();
            jQuery(data.Rel).val(v);
            if (typeof data.RelVisible != 'undefined') {
                var dataOptions = jQuery(this).find("option:selected").getDataUppername();
                if (dataOptions.IsVisible.toLowerCase() == "true") {
                    jQuery(data.RelVisible).removeClass("hidden")
                } else {
                    jQuery(data.RelVisible).addClass("hidden")
                }
            }
        });
        jQuery(".changeRel").trigger("change");

        jQuery(document).on("change", ".fieldRadio", function () {
            var obj = jQuery(this);
            if (obj.prop("checked")) {
                var data = obj.getDataUppername();
                obj.closest("form").find(".fieldRadio").each(function () {
                    if (obj.attr("name") != jQuery(this).attr("name")) {
                        if (data.Label == jQuery(this).attr("data-label")) {
                            jQuery(this).prop("checked", false);
                        }
                    }
                });
            }
        });

        jQuery(document).on("keydown", ".pressSubmit", function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key === 13) {
                try {
                    jQuery(this).closest("form").trigger("submit");
                } catch (ex) {
                }
                return false;
            }
            return true;
        });
        jQuery(document).on("submit", ".quickSearch", function () {
            try {
                var form = jQuery(this);
                var url = form.attr("action");
                var target = form.attr("data-target");
                var data = Utils.getSerialize(form);
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
        jQuery(document).on("submit", ".quickSubmit", function (e) {
            e.preventDefault();
            try {
                var form = jQuery(this);
                if (!$(form).hasClass('submiting')) {
                    $(form).addClass('submiting');
                    var url = form.attr("action");
                    var target = form.attr("data-target");
                    var containmes = form.find('#messeage_err');
                    var targetDelete = form.attr("data-target-delete");
                    var type = form.attr("data-insert-type");
                    var data = Utils.getSerialize(form);
                    if (Utils.isEmpty(url)) {
                        $(form).removeClass('submiting');
                        return false;
                    }
                    if (!Utils.validateDataForm(form)) {
                        $(form).removeClass('submiting');
                        return false;
                    }
                    if (!form.hasClass("bootstrapValidator")) {
                        form.addClass("bootstrapValidator").bootstrapValidator();
                    }
                    var bootstrapValidator = form.data('bootstrapValidator');
                    bootstrapValidator.validate(true);
                    if (!bootstrapValidator.isValid()) {
                        $(form).removeClass('submiting');
                        return false;
                    }
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: url,
                        data: data,
                        beforeSend: function () {
                        },
                        complete: function () {
                        },
                        error: function () {
                        },
                        success: function (response) {
                            if (!response.isErr)
                                window.location.reload();
                            Utils.sectionBuilder(response, response.isErr);
                            if (response.hasOwnProperty("isCust")) {
                                if (type == "append") {
                                    jQuery(target).append(response.htCust);
                                }
                                else if (type == "prepend") {
                                    jQuery(target).prepend(response.htCust);
                                }
                                else if (type == "replaceWith") {
                                    jQuery(target).replaceWith(response.htCust);
                                }
                                else {
                                    jQuery(target).html(response.htCust);
                                }
                            }
                            if (containmes.length > 0)
                                containmes.text(response.ctMeg);
                            Utils.updateInputDate(jQuery(target));
                            Utils.updateFormState(jQuery(target));
                            Utils.updateScrollBar(jQuery(target));
                            Autocomplete.init(jQuery(target));
                            Main.upEvent();
                            if (!Utils.isEmpty(targetDelete)) {
                                jQuery(targetDelete).fadeOut("fast", function () {
                                    jQuery(this).remove();
                                });
                            }
                            if (form.hasClass("successOnRefresh")) {
                                var refresh = form.attr("data-refresh");
                                if (!response.hasOwnProperty("isErr")) {
                                    window.location.href = refresh;
                                }
                            }
                            if (form.hasClass("closeOnSubmit")) {
                                Utils.closeOverlay(true);
                            }
                            form.find("[type='submit']").prop("disabled", false);
                            $(form).removeClass('submiting');
                        }
                    });
                }
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickMore", function () {
            try {
                var node = jQuery(this);
                var data = jQuery(this).getDataUppername();
                if (typeof data.Skip == 'undefined') {
                    data.Skip = 0;
                }
                if (typeof data.Take == 'undefined') {
                    data.Take = 10;
                }
                data.Skip = parseInt(data.Skip) + parseInt(data.Take);

                var target = data.Target;
                var type = data.InsertType;
                var url = node.attr("href").replace("#", "");
                if (Utils.isEmpty(url)) {
                    return;
                }
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: url,
                    data: data,
                    beforeSend: function () {
                        node.addClass("loading");
                    },
                    complete: function () {
                        node.removeClass("loading");
                    },
                    error: function () {
                        node.removeClass("loading");
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            if (type == "prepend") {
                                jQuery(target).prepend(response.htCust);
                            }
                            else {
                                jQuery(target).append(response.htCust);
                            }
                        }
                        node.attr("data-skip", data.Skip);
                        node.attr("data-take", data.Take);
                        if (response.htCust == "" || jQuery(response.htCust).find(".itemMore").length < data.Take) {
                            node.addClass("hidden")
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickLike", function () {
            try {
                var node = jQuery(this);
                var data = jQuery(this).getDataUppername();
                var target = data.Target;
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: node.attr("href"),
                    data: data,
                    beforeSend: function () {
                        node.addClass("loading");
                    },
                    complete: function () {
                        node.removeClass("loading");
                    },
                    error: function () {
                        node.removeClass("loading");
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        node.toggleClass("active");
                        if (response.hasOwnProperty("isCust")) {
                            jQuery(target).html(response.htCust);
                        }
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickView", function () {
            try {
                var node = jQuery(this);
                var url = node.attr("href").replace("#", "");
                var target = node.attr("data-target");
                if (Utils.isEmpty(url)) {
                    return;
                }
                if (window.history.pushState) {
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        url: url,
                        data: { RedirectPath: Utils.getRedirect() },
                        beforeSend: function () {
                            jQuery(target).addClass("loading").html("")
                        },
                        complete: function () {
                            jQuery(target).removeClass("loading");
                        },
                        error: function () {
                            jQuery(target).removeClass("loading");
                        },
                        success: function (response) {
                            window.history.pushState(null, response.title, url);
                            jQuery(document).prop("title", response.title);

                            Utils.sectionBuilder(response);
                            if (response.hasOwnProperty("isCust")) {
                                jQuery(target).html(response.htCust);
                            }
                            Utils.updatePDFViewer(response);
                            Utils.updateImageViewer();
                            Utils.updateChart(jQuery(target));
                            Utils.updateInputDate(jQuery(target));
                            Utils.updateFormState(jQuery(target));
                            Utils.updateScrollBar(jQuery(target));
                            Autocomplete.init(jQuery(target));
                            Main.upEvent(jQuery(target));
                            //JobPage.upEvent(jQuery(target));
                            Main.backLink();

                            //window.webViewerLoad(true);
                            //jQuery("#viewerContainer").scrollTop(0);
                            Cust.fileViewer_height_fn();
                            Cust.toogle_steps();
                            Cust.Scroll_table();
                            Cust.Scroll_tab_group();
                            Cust.Table_sort();
                            //Main.registerSelect2();
                            //Cust.prev_next_group_button();
                            Cust.dataTables_filter_col(); //Responsive dataTables_filter Col
                        }
                    });
                } else {
                    window.location.href = url;
                }
            } catch (e) {

            }
            if (jQuery(this).hasClass("closeOpen")) {
                jQuery(this).closest(".open").removeClass("open");
            }
            return false;
        });
        jQuery(document).on("click", ".quickUpdate", function () {
            try {
                var obj = jQuery(this);
                var target = jQuery(this).attr("data-target");
                var data = obj.getDataUppername();
                data.RedirectPath = Utils.getRedirect();

                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    data: data,
                    beforeSend: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    complete: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    error: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(target).html(response.htCust);
                        }
                        Utils.updateTab(jQuery(target));
                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent(jQuery(target));
                        Main.updateAutoComplete();
                        Cust.check_required_input();
                        Utils.updateIsNumber(jQuery(target));
                        jQuery(target).find(".selectpicker").selectpicker();
                        //jQuery(target).find(".timepicker").timepicker({
                        //    minuteStep: 1,
                        //    appendWidgetTo: 'body',
                        //    showSeconds: false,
                        //    showMeridian: false,
                        //    defaultTime: true
                        //});

                        //if((jQuery(document).find(".autoSelect2").is(":visible"))&&()){
                        //$(".autoSelect2").select2();
                        //}
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickAppend", function () {
            try {
                var obj = jQuery(this);
                var target = jQuery(this)
                    .attr("data-target");
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: jQuery(this).attr("href"),
                    beforeSend: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    complete: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    error: function () {
                        if (!obj.hasClass("not-overlay")) {
                            Utils.openOverlay();
                        }
                    },
                    success: function (response) {
                        Utils.sectionBuilder(response);
                        if (response.hasOwnProperty("isCust")) {
                            Utils.closeOverlay();
                            jQuery(target).append(response.htCust);
                        }
                        Utils.updateTab(jQuery(target));
                        Utils.updateInputDate(jQuery(target));
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                        Autocomplete.init(jQuery(target));
                        Main.upEvent(jQuery(target));
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("click", ".quickDelete", function () {
            try {
                var data = jQuery(this).getDataUppername();
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
        });
        jQuery(document).on("click", ".quickDeletes, .quickConfirms", function () {
            try {
                var target = jQuery(this)
                    .attr("data-target");
                var href = jQuery(this)
                    .attr("data-href");
                var table = jQuery(this)
                    .closest(".dataTables_wrapper")
                    .find("table, div.table");

                var ids = [];
                var idFiles = [];
                table.find(".checkboxes").each(function () {
                    if (jQuery(this).prop("checked")) {
                        var id = jQuery(this).attr("data-id");
                        var idFile = jQuery(this).attr("data-id-file");
                        if (Utils.isInteger(id))
                            ids.push(id);
                        if (!Utils.isEmpty(idFile))
                            idFiles.push(idFile);
                    }
                });
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: href,
                    data: { ID: ids, IDFile: idFiles, RedirectPath: Utils.getRedirect() },
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
                            jQuery(target).html(response.htCust);
                        }
                        Utils.updateFormState(jQuery(target));
                        Utils.updateScrollBar(jQuery(target));
                    }
                });
            } catch (e) {

            }
            return false;
        });
        jQuery(document).on("submit", ".quickCmt", function (e) {
            try {
                var form = jQuery(this);
                var attrs = jQuery(this).getDataUppername();
                var container = form.closest(".container-cmts");
                var target = container.find(".cmts").first();
                var data = Utils.getSerialize(form);
                if (Utils.isEmpty(data.Body))
                    return false;

                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: form.attr("action"),
                    data: data,
                    beforeSend: function () {
                    },
                    complete: function () {
                    },
                    error: function () {
                    },
                    success: function (response) {

                        try {
                            Utils.sectionBuilder(response);
                            if (response.hasOwnProperty("isCust")) {
                                Utils.closeOverlay();
                                jQuery(target).append(response.htCust);
                                var dataInc = jQuery(attrs.IncTarget).getData();

                                var v = parseInt(dataInc.value) + 1;
                                jQuery(attrs.IncTarget).attr("data-value", v).val(v);
                            }
                            Utils.updateFormState(jQuery(target));
                            Utils.updateScrollBar(jQuery(target));
                            jQuery(target).scrollTop(jQuery(target).scrollHeight());
                        } catch (e) { }

                        form.reset();
                        form.find("[type='submit']").prop("disabled", false);
                    }
                });
            } catch (e) {
                console.log(e);
            }

            return false;
        });

        jQuery(document).on("click", ".nextChart", function () {

            var chartViewer = jQuery(this).closest(".chartViewer");
            var chart = chartViewer.highcharts();
            var data = chartViewer.getData();
            var from = parseInt(data.from);
            var to = parseInt(data.to);
            var max = parseInt(data.max);
            var step = parseInt(data.step);

            chart.xAxis[0].setExtremes(from + step, to + step);
            chartViewer.attr("data-from", from + step);
            chartViewer.attr("data-to", to + step);

            if (to + step >= max) {
                chartViewer.find(".nextChart").addClass("hidden");
            } else {
                chartViewer.find(".nextChart").removeClass("hidden");
            }
        });

        jQuery(document).on("click", ".prevChart", function () {
            var chartViewer = jQuery(this).closest(".chartViewer");
            var chart = chartViewer.highcharts();
            var data = chartViewer.getData();
            var from = parseInt(data.from);
            var to = parseInt(data.to);
            var max = parseInt(data.max);
            var step = parseInt(data.step);

            chart.xAxis[0].setExtremes(from - step, to - step);
            chartViewer.attr("data-from", from - step);
            chartViewer.attr("data-to", to - step);

            if (to - step >= max) {
                chartViewer.find(".nextChart").addClass("hidden");
            } else {
                chartViewer.find(".nextChart").removeClass("hidden");
            }
        });

        jQuery(window).resize(function () {
            Utils.autoResize();
        });

        jQuery(document).on("change", ".select_change1", function () {
            jQuery('.slhidden').removeClass('hidden');
            var status = $(this).children('option:selected').data('status');
            jQuery(this).siblings('#CrStatus').val(status);
            var val = jQuery(this).val();
            jQuery('.slhidden').addClass('hidden');
            jQuery(val).removeClass('hidden');

        });
        function clearInput(area) {
            $(area).find('input[type=checkbox]').prop('checked', false).end();
        }
        jQuery(document).on("click", ".showmodal", function () {
            clearInput($(this).data("target"));
            $(".choice-template").attr("data-idtarget", "");
            $(".choice-template").attr("data-filename", "");
            $(".choice-template").attr("data-filepath", "");
            var idtarget = $(this).data("idtarget");
            var target = $(this).data("target");
            var filename = $(this).data("filename");
            var filepath = $(this).data("filepath");
            $(target).modal('show');
            $(".choice-template").attr("data-idtarget", idtarget);
            $(".choice-template").attr("data-filename", filename);
            $(".choice-template").attr("data-filepath", filepath);
        });

        jQuery(document).on("click", ".choice-template", function () {
            var chkId = '';
            var data = jQuery(this).getDataUppername();
            $("input[name='template']:checked").each(function () {
                chkId += $(this).val() + ",";
            });
            if (chkId != '') {
                jQuery.ajax({
                    type: "POST",
                    async: true,
                    url: data.Url,
                    data: { 'id': chkId },
                    dataType: "json",
                    beforeSend: function () {
                    },
                    complete: function () {
                    },
                    error: function () {
                    },
                    success: function (res) {
                        $(data.Idtarget).removeClass("hidden");
                        $('#md-documenttmplate').modal('hide');
                        var result = JSON.parse(res);
                        for (var i = 0; i < result.length; i++) {
                            var item = result[i];
                            var idtarget = data.Idtarget + item.ID;
                            var template = jQuery("#attachments_template").html();
                            template = template.replace("#idtarget", idtarget.replace("#", ""));
                            template = template.replace("#src", item.FilePath);
                            template = template.replace("#srcs", item.FilePath);
                            template = template.replace("#filetitle", item.FileName);
                            template = template.replace("#filename", data.Filename);
                            template = template.replace("#filenamevalue", item.FileName);
                            template = template.replace("#filenamedown", item.FileName);
                            template = template.replace("#filepath", data.Filepath);
                            template = template.replace("#filepathvalue", item.FilePath);
                            template = template.replace("#filepathdown", item.FilePath);
                            template = template.replace("#filetarget", idtarget);
                            template = template.replace("#filenames", data.Filename);
                            template = template.replace("#filepaths", data.Filepath);
                            $(data.Idtarget).append(template);
                        }
                    }

                });
            }
        });
        //select_change
        jQuery(document).on('change', '.select_change', function (e) {
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
                    }
                    $('.selectpicker').selectpicker();
                    $('.autoSelect2').select2();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        });
        jQuery(document).on("keyup", ".moneyFormat", function () {
            var $input = $(this);
            var value = $input.val();
            if (value != null && value != "") {
                value = value.replace(/[^\d]/g, "");
                var num = parseFloat(value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                $input.val(num);
            }
            else
                $input.val(0);
        });
        jQuery(document).on("click", ".tabClick", function () {
            var tab = jQuery(this);
            var dataTab = tab.attr("data-tab-name");
            var currentUrl = window.location.href;
            currentUrl = updateQueryStringParameter(currentUrl, "tab", dataTab);
            window.history.pushState(null, null, currentUrl);
        });
        function updateQueryStringParameter(uri, key, value) {
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            }
            else {
                return uri + separator + key + "=" + value;
            }
        }
    },
    backLink: function () {
        try {
            var bcItems = jQuery(".breadcrumb").find("li");
            var len = bcItems.length;
            if (len > 2) {

                var a = jQuery(bcItems[len - 2]).find("a");
                var attr_href = a.attr("href");
                var data_target = a.attr("data-target");
                jQuery(".widget_back_btn")
                    .removeClass("hidden")
                    .attr("href", attr_href)
                    .attr("data-target", data_target);
                if (a.hasClass("quickView")) {
                    jQuery(".widget_back_btn").addClass("quickView");
                }
                else {
                    jQuery(".widget_back_btn").removeClass("quickView");
                }
            } else {
                jQuery(".widget_back_btn").addClass("hidden");
            }
        } catch (e) { }
    },
    //registerSelect2: function () {
    //    $(".autoSelect2").select2();
    //},

    updateAutoComplete: function () {
        var elementUp = document.getElementById("UpPersonType");
        if (typeof (elementUp) != 'undefined' && elementUp != null) {
            Autocomplete.doituong(jQuery(document), elementUp.value);
        }
    },
};
jQuery(document).ready(function () {
    Cdata.init();
    Smile.init();
    Main.init();
    Utils.autoCloseFlash();
    Utils.updateImageViewer();
    Utils.updatePlayer(jQuery(document));
    Utils.updateChart(jQuery(document));
    Utils.updateFormState(jQuery(document));
    Utils.updateInputDate(jQuery(document));
    Utils.updateScrollBar(jQuery(document));
    Autocomplete.init(jQuery(document));
    var element = document.getElementById("uploadFile");
    if (typeof (element) != 'undefined' && element != null) {
        element.onchange = function () {
            if (typeof (document.getElementById("uploadFileBack")) != 'undefined' && document.getElementById("uploadFileBack") != null) {
                document.getElementById("uploadFileBack").value = this.value;
            }
            if (typeof (document.getElementById("uploadFileCompliment")) != 'undefined' && document.getElementById("uploadFileCompliment") != null) {
                document.getElementById("uploadFileCompliment").value = this.value;
            }
        };
    }
    jQuery(".toogle_templatefile").click(function () {
        jQuery(this).next().slideToggle();
        console.log("clicked");
    });

});