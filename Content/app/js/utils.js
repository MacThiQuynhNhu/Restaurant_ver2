var Utils = {

    rmSpace: function (val) {
        try {
            while (val.indexOf(" ") !== -1) {
                val = val.replace(" ", "");
            }
        } catch (e) { }
        return val;
    },

    notEmpty: function (val) {
        return !Utils.isEmpty(val);
    },
    isGet: function (form) {
        return form.attr("method").toLowerCase() == "get";
    },
    isPost: function (form) {
        return form.attr("method").toLowerCase() == "post";
    },
    isEmpty: function (val) {

        if (typeof val == "object")
            return false;
        if (typeof val == "function")
            return false;

        return val === undefined || jQuery.trim(val).length === 0;
    },
    isInteger: function (val) {

        return !isNaN(val) && !Utils.isEmpty(val);
    },
    updateIsNumber: function (container) {
        container.find(".isNumberFormat").each(function () {
            $(this).keyup(function () {
                this.value = Utils.formatMoney(this.value);
            });
        });

        $('.isNumber').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode
            if (
                (charCode != 45 && charCode != 8 || $(this).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
                (charCode != 46 || $(this).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
                (charCode < 48 || charCode > 57))
                return false;

            return true;
        }); $('.isNumberInteger').keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });

    },
    checkIsDate: function (str) {
        var parts = str.split('-');
        if (parts.length < 3)
            return false;
        else {
            var day = parseInt(parts[0]);
            var month = parseInt(parts[1]);
            var year = parseInt(parts[2]);
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                return false;
            }
            if (day < 1 || year < 1)
                return false;
            if (month > 12 || month < 1)
                return false;
            if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)
                return false;
            if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30)
                return false;
            if (month == 2) {
                if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
                    if (day > 29)
                        return false;
                } else {
                    if (day > 28)
                        return false;
                }
            }
            return true;
        }
    },
    compareDate: function (obj) {
        var dateCompare = obj.val();
        var target = obj.data("date-tagert");
        var targetid = obj.data("date-targetid");
        var textCompare = obj.data('title-show');
        var textValue = obj.siblings('small').text();
        var dateTarget = $(targetid).val();
        var smallTagert;
        var iTagert;
        var o;
        var s;
        var d;
        var g;
        if (target != null && target != 'undefined' && dateCompare != null && dateCompare != "" && dateCompare != 'undefined') {
            o = dateCompare.split("-");
            s = target.split("-");
            d = o[2] + o[1] + o[0],
                g = s[2] + s[1] + s[0];
            smallTagert = obj.siblings('small');
            iTagert = obj.siblings('i');
            if (parseInt(d) < parseInt(g)) {
                smallTagert.show();
                smallTagert.text(textCompare);
                smallTagert.attr("data-bv-result", "INVALID");
                iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                obj.parents("div.form-group").toggleClass("has-success has-error")
            } else {
                smallTagert.hide();
                smallTagert.text(textValue);
                smallTagert.attr("data-bv-result", "VALID");
                iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                obj.parents("div.form-group").toggleClass("has-success has-success");
            }
        }
        else if (dateTarget != null && dateTarget != 'undefined' && dateCompare != null && dateCompare != "" && dateCompare != 'undefined') {
            o = dateCompare.split("-");
            s = dateTarget.split("-");
            d = o[2] + o[1] + o[0],
                g = s[2] + s[1] + s[0];
            smallTagert = obj.siblings('small');
            iTagert = obj.siblings('i');
            if (obj.hasClass("smaller")) {
                if (parseInt(d) > parseInt(g)) {
                    smallTagert.show();
                    smallTagert.text(textCompare);
                    smallTagert.attr("data-bv-result", "INVALID");
                    iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                    obj.parents("div.form-group").toggleClass("has-success has-error");
                } else {
                    smallTagert.hide();
                    smallTagert.text(textValue);
                    smallTagert.attr("data-bv-result", "VALID");
                    iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                    obj.parents("div.form-group").toggleClass("has-success has-success");
                }
            } else {
                if (parseInt(d) < parseInt(g)) {
                    smallTagert.show();
                    smallTagert.text(textCompare);
                    smallTagert.attr("data-bv-result", "INVALID");
                    iTagert.toggleClass('glyphicon-ok glyphicon-remove');
                    obj.parents("div.form-group").toggleClass("has-success has-error");
                } else {
                    smallTagert.hide();
                    smallTagert.text(textValue);
                    smallTagert.attr("data-bv-result", "VALID");
                    iTagert.toggleClass('glyphicon-oke glyphicon-oke');
                    obj.parents("div.form-group").toggleClass("has-success has-success");
                }
            }
        }
    },
    resetValidator: function (container) {
        try {
            if (container.hasClass("bootstrapValidator")) {
                container.removeClass("bootstrapValidator").bootstrapValidator('destroy');
            }
        }
        catch (e) {

        }
        Utils.bootstrapValidator(container);
    },
    isChrome: function () {
        return navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    },
    IsImage: function (extension) {
        extension = extension.toLowerCase().replace('.', '');
        switch (extension) {
            case "ico":
                return true;
            case "bmp":
                return true;
            case "gif":
                return true;
            case "jpe":
                return true;
            case "jpeg":
                return true;
            case "jpg":
                return true;
            case "png":
                return true;
        }
        return false;
    },
    IsPdfOrOffice: function (extension) {
        return Utils.IsPdf(extension) || Utils.IsOffice(extension);
    },
    IsPdf: function (extension) {
        extension = extension.toLowerCase().replace('.', '');
        return extension == "pdf";
    },
    IsOffice: function (extension) {
        extension = extension.toLowerCase().replace('.', '');
        switch (extension) {
            case "rtf":
                return true;
            case "odt":
                return true;
            case "doc":
                return true;
            case "dot":
                return true;
            case "docx":
                return true;
            case "dotx":
                return true;
            case "docm":
                return true;
            case "dotm":
                return true;
            case "csv":
                return true;
            case "odc":
                return true;
            case "xls":
                return true;
            case "xlsx":
                return true;
            case "xlsm":
                return true;
            case "odp":
                return true;
            case "ppt":
                return true;
            case "pptx":
                return true;
            case "pptm":
                return true;
            case "pot":
                return true;
            case "potm":
                return true;
            case "potx":
                return true;
            case "pps":
                return true;
            case "ppsx":
                return true;
            case "ppsm":
                return true;
        }
        return false;
    },
    IsVideo: function (extension) {
        extension = extension.toLowerCase().replace('.', '');
        switch (extension) {
            case "3g2":
                return true;
            case "3gp":
                return true;
            case "3gp2":
                return true;
            case "3gpp":
                return true;
            case "avi":
                return true;
            case "asf":
                return true;
            case "asr":
                return true;
            case "asx":
                return true;
            case "dif":
                return true;
            case "dv":
                return true;
            case "ivf":
                return true;
            case "flv":
                return true;
            case "m4v":
                return true;
            case "lsf":
                return true;
            case "lsx":
                return true;
            case "m1v":
                return true;
            case "m2t":
                return true;
            case "m2ts":
                return true;
            case "m2v":
                return true;
            case "mod":
                return true;
            case "mov":
                return true;
            case "movie":
                return true;
            case "mp2":
                return true;
            case "mp2v":
                return true;
            case "mp4":
                return true;
            case "mp4v":
                return true;
            case "mpeg":
                return true;
            case "mpe":
                return true;
            case "mpa":
                return true;
            case "mpg":
                return true;
            case "mpv2":
                return true;
            case "mqv":
                return true;
            case "mts":
                return true;
            case "nsc":
                return true;
            case "qt":
                return true;
            case "ts":
                return true;
            case "tts":
                return true;
            case "vbk":
                return true;
            case "wm":
                return true;
            case "wmp":
                return true;
            case "wmv":
                return true;
            case "wmx":
                return true;
            case "wvx":
                return true;
        }
        return false;
    },
    IsAudio: function (extension) {
        extension = extension.toLowerCase().replace('.', '');
        switch (extension) {
            case "aa":
                return true;
            case "aac":
                return true;
            case "aax":
                return true;
            case "ac3":
                return true;
            case "adt":
                return true;
            case "adts":
                return true;
            case "aif":
                return true;
            case "aifc":
                return true;
            case "aiff":
                return true;
            case "au":
                return true;
            case "caf":
                return true;
            case "cdda":
                return true;
            case "gsm":
                return true;
            case "m3u":
                return true;
            case "m3u8":
                return true;
            case "m4a":
                return true;
            case "m4b":
                return true;
            case "m4p":
                return true;
            case "m4r":
                return true;
            case "mid":
                return true;
            case "midi":
                return true;
            case "mp3":
                return true;
            case "pls":
                return true;
            case "ra":
                return true;
            case "ram":
                return true;
            case "rmi":
                return true;
            case "sd2":
                return true;
            case "smd":
                return true;
            case "smx":
                return true;
            case "smz":
                return true;
            case "snd":
                return true;
            case "wav":
                return true;
            case "wave":
                return true;
            case "wax":
                return true;
            case "wma":
                return true;
        }
        return false;
    },
    getSerialize: function (form) {
        var keys = {};
        var checkboxs = {};
        form.find("input, select, textarea").each(function () {
            var el = jQuery(this)
            var name = el.attr("name");
            if (!Utils.isEmpty(name)) {
                var tagName = el.prop("tagName").toLowerCase();
                if (tagName == "input") {
                    var type = el.attr("type").toLowerCase();
                    if (type == "text" || type == "password" || type == "hidden") {
                        if (!keys.hasOwnProperty(name)) {
                            keys[name] = [];
                        }
                        keys[name].push(el.val());
                    }
                    else if (type == "checkbox" || type == "radio") {
                        if (el.prop("checked")) {
                            if (!keys.hasOwnProperty(name)) {
                                keys[name] = [];
                            }
                            keys[name].push(el.val());
                        }
                        if (!checkboxs.hasOwnProperty(name)) {
                            checkboxs[name] = 0;
                        }
                        checkboxs[name]++;
                    }
                }
                else {
                    if (!keys.hasOwnProperty(name)) {
                        keys[name] = [];
                    }
                    keys[name].push(el.val());
                }
            }
        });
        for (var k in keys) {
            var vals = keys[k];
            if (vals.length == 1) { // || !checkboxs.hasOwnProperty(k)
                keys[k] = vals.join(",");
            }
            else {
                keys[k] = JSON.stringify(vals);
            }
        }
        return keys;
    },
    builderQString: function (data) {
        var queries = [];
        for (var i in data) {
            if (i == "RedirectPath")
                continue;

            if (!Utils.isEmpty(data[i])) {
                queries.push(i + "=" + data[i]);
            }
        }
        return ("?" + queries.join("&"));
    },
    b64toBlob: function (b64Data, contentType, sliceSize) {

        contentType = contentType || "";
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteLength = byteCharacters.length;
        var byteArrays = [];

        for (var offset = 0; offset < byteLength; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType, encoding: "utf-8" });
    },
    sendB64AsFile: function (settings, file) {

        var fileReader = new FileReader();
        fileReader.onabort = function (e) {
            if (settings.onClientAbort) {
                settings.onClientAbort(e);
            }
        };
        fileReader.onerror = function (e) {
            if (settings.onClientError) {
                settings.onClientError(e);
            }
        };
        fileReader.onload = function (e) {
            if (settings.onClientLoad) {
                settings.onClientLoad(e);
            }
        };
        fileReader.onloadend = function (e) {
            if (settings.onClientLoadEnd) {
                settings.onClientLoadEnd(e);
            }
        };
        fileReader.onloadstart = function (e) {
            if (settings.onClientLoadStart) {
                settings.onClientLoadStart(e);
            }
        };
        fileReader.onprogress = function (e) {
            if (settings.onClientProgress) {
                settings.onClientProgress(e);
            }
        };
        fileReader.readAsDataURL(file);
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.upload.onabort = function (e) {
            if (settings.onServerAbort) {
                settings.onServerAbort(e);
            }
        };
        xmlHttpRequest.upload.onerror = function (e) {
            if (settings.onServerError) {
                settings.onServerError(e);
            }
        };
        xmlHttpRequest.upload.onload = function (e) {
            if (settings.onServerLoad) {
                settings.onServerLoad(e);
            }
        };
        xmlHttpRequest.upload.onloadstart = function (e) {
            if (settings.onServerLoadStart) {
                settings.onServerLoadStart(e);
            }
        };
        xmlHttpRequest.upload.onprogress = function (e) {
            if (settings.onServerProgress) {
                settings.onServerProgress(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function (e) {
            if (settings.onServerReadyStateChange) {
                settings.onServerReadyStateChange(e, xmlHttpRequest.readyState);
            }
            if (settings.onSuccess && xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
                try {
                    settings.onSuccess(e, JSON.parse(xmlHttpRequest.responseText));
                } catch (e) {
                    settings.onClientError(e);
                    var message = jQuery(xmlHttpRequest.responseText).find("#MessageError");
                    if (message.length > 0) {
                        alert(message.text());
                    }
                }
            }
        };

        xmlHttpRequest.open("POST", settings.postUrl, true);
        if (file.getAsBinary) {
            var data = window.dashes + boundary + window.crlf
                + "Content-Disposition: form-data; name=\""
                + settings.name + "\";" + "filename=\""
                + unescape(encodeURIComponent(file.name)) + "\"" + window.crlf
                + "Content-Type: application/octet-stream" + window.crlf
                + window.crlf + file.getAsBinary() + window.crlf + window.dashes + boundary
                + window.dashes;
            xmlHttpRequest.setRequestHeader("Content-Type", "multipart/form-data;boundary=" + boundary);
            xmlHttpRequest.sendAsBinary(data);
        } else if (window.FormData) {
            var formData = new FormData();
            formData.append(settings.name, file, file.name);
            xmlHttpRequest.send(formData);
        }
    },
    getRedirect: function () {

        var href = window.location.href;
        if (href.indexOf("#") != -1) {
            href = href.substring(0, href.indexOf("#"));
        }
        if (href.indexOf("rand=") != -1) {
            href = href.replace(/(rand=)[a-z|0-9]+/ig, '$1' + (new Date()).getTime());
        }
        else if (href.indexOf("?") != -1) {
            href += "&rand=" + (new Date()).getTime();
        }
        else {
            href += "?rand=" + (new Date()).getTime();
        }

        return href;
    },
    getDomain: function () {

        var domain = window.location.protocol
        domain += "//";
        domain += window.location.hostname;
        if (window.location.port !== "") {
            domain += ":";
            domain += window.location.port;
        }
        return domain;
    },
    toggleMultiTicks: function (table) {

        var flag = false;
        var wrapper = table.closest(".dataTables_wrapper");
        var actions = wrapper.find(".actMultiTicks");
        var grouper = wrapper.find(".group-checkable");
        table.find(".checkboxes").each(function () {
            if (jQuery(this).prop("checked")) {
                actions.removeClass("hidden");
                flag = true;
                return false;
            }
        });
        if (!flag) {
            actions.addClass("hidden");
            if (grouper.prop("checked"))
                grouper.prop("checked", false);
        }
    },
    updateTab: function (container) {
        if (container.hasClass("useTabs")) {
            container.tabs();
        }
        container.find(".useTabs").tabs();
    },
    bootstrapValidator: function (obj) {
        if (!obj.hasClass("bootstrapValidator")) {
            obj.addClass("bootstrapValidator").bootstrapValidator();
        }
    },

    updateFormState: function (container) {
        if (container.hasClass("validateForm")) {
            Utils.bootstrapValidator(container);
        }
        container.find(".validateForm").each(function () {
            Utils.bootstrapValidator(jQuery(this));
        });
        container.find(".form-control textarea:visible, .form-control input[type='text']:visible").each(function () {
            if (Utils.isEmpty(jQuery(this).val())) {
                jQuery(this).focus();
                return false;
            }
        });
        container.find("select").unbind("mousewheel")
            .bind("mousewheel", "select", function (e) {
                e.stopPropagation();
            });

        var redirectPath = Utils.getRedirect();
        if (container.prop("tagName") === "FORM") {
            var redirects = container.find("input[name='RedirectPath']");
            if (redirects.length == 0) {
                var inputRedirect = jQuery("<input type='hidden' class='redirectauto' />");
                inputRedirect.attr("name", "RedirectPath");
                inputRedirect.val(redirectPath);
                container.append(inputRedirect);
            } else if (redirects.hasClass("redirectauto")) {
                redirects.val(redirectPath);
            }
        } else {
            container.find("form").each(function () {
                var redirects = jQuery(this).find("input[name='RedirectPath']");
                if (redirects.length == 0) {
                    var inputRedirect = jQuery("<input type='hidden' class='redirectauto'/>");
                    inputRedirect.attr("name", "RedirectPath");
                    inputRedirect.val(redirectPath);
                    jQuery(this).append(inputRedirect);
                } else if (redirects.hasClass("redirectauto")) {
                    redirects.val(redirectPath);
                }
            });
        }
        container.find(".validateForm").each(function () {
            if (!jQuery(this).hasClass("quickSubmit") && !jQuery(this).hasClass("bootstrapValidator"))
                jQuery(this).addClass("bootstrapValidator").bootstrapValidator();
        });
    },
    updateSelectbox: function (container) {

        container.find(".selectbox").selectbox({
            effect: "slide",
            classHolder: "sbHolder form-control"
        });
        container.find(".inputchoises").each(function () {
            var choises = [];
            var data = jQuery.parseJSON(jQuery(this).attr("data-choises"));
            for (var i in data) {
                var choise = data[i];
                choises.push({
                    value: choise.Name,
                    label: choise.Name,
                });
            }
            var id = jQuery(this).attr("id");
            if (Utils.isEmpty(id)) {
                id = "IChoise" + (new Date()).getTime();
                jQuery(this).attr("id", id);
            }
            jQuery("#" + id).autocomplete({
                source: choises,
                minLength: 0,
                select: function (event, ui) {

                }
            }).click(function () {
                jQuery(this).autocomplete("search", "");
            }).focus(function () {
                jQuery(this).autocomplete("search", "");
            });
        });
    },
    updateInputDate: function (container) {
        if (Utils.isEmpty(container))
            container = jQuery(document);
        container.find(".date").each(function () {
            var id = jQuery(this).attr("id");
            jQuery(this).attr("autocomplete", "off");
            if (Utils.isEmpty(id)) {
                id = "IDate" + (new Date()).getTime();
                jQuery(this).attr("id", id);
            }
            jQuery("#" + id).datetimepicker({
                timepicker: false,
                format: "d-m-Y",
                lang: "vi",
                scrollInput: false
            });
        });
        container.find(".datetime").each(function () {
            var id = jQuery(this).attr("id");
            jQuery(this).attr("autocomplete", "off");
            if (Utils.isEmpty(id)) {
                id = "IDatetime" + (new Date()).getTime();
                jQuery(this).attr("id", id);
            }
            jQuery("#" + id).datetimepicker({
                format: "d-m-Y H:i",
                lang: "vi",
                scrollInput: false
            });
        });
        container.find(".monthYear").each(function () {
            var id = jQuery(this).attr("id");
            jQuery(this).attr("autocomplete", "off");
            if (Utils.isEmpty(id)) {
                id = "IMonth" + (new Date()).getTime();
                jQuery(this).attr("id", id);
            }
            jQuery("#" + id).datetimepicker({
                timepicker: false,
                format: "m-Y",
                lang: "vi",
                scrollInput: false
            });
            //jQuery("#" + id).datetimepicker.viewMode('months');
        });
        container.find(".time").each(function () {
            var id = jQuery(this).attr("id");
            jQuery(this).attr("autocomplete", "off");
            if (Utils.isEmpty(id)) {
                id = "ITime" + (new Date()).getTime();
                jQuery(this).attr("id", id);
            }
            jQuery("#" + id).datetimepicker({
                format: "H:i",
                lang: "vi",
                scrollInput: false
            });
        });
    },
    updateScrollBar: function (container) {
        if (container.hasClass("ps-container")) {
            container.perfectScrollbar("destroy");
            container.perfectScrollbar({
                useBothWheelAxes: false, wheelPropagation: true
            });
        }
        else if (container.hasClass("useScrollBar")) {
            container.perfectScrollbar({
                useBothWheelAxes: false, wheelPropagation: true
            });
        }
        //container.find(".useScrollBar").perfectScrollbar({
        //    useBothWheelAxes: false, wheelPropagation: true
        //});
    },
    updateChart: function (container) {
        container.find(".chartViewer").each(function () {
            try {
                var dataChart = jQuery(this).find(".dataChart").val();
                if (typeof dataChart != "undefined") {
                    dataChart = jQuery.parseJSON(dataChart);
                    jQuery(this).fadeIn("200", function () {

                        jQuery(this).highcharts(dataChart);
                        try {
                            var step = 5;
                            var max = dataChart.chart.columns;
                            var chartViewer = jQuery(this);
                            chartViewer.attr("data-max", max);
                            chartViewer.attr("data-from", 0);
                            chartViewer.attr("data-to", step);
                            chartViewer.attr("data-step", step);
                            if (max > step) {
                                chartViewer.append(jQuery("<button type='button'>")
									.addClass("btn btn-xs btn-info prevChart")
									.append(jQuery("<i class='glyphicon glyphicon-arrow-left'></i>")))
                                chartViewer.append(jQuery("<button type='button'>")
									.addClass("btn btn-xs btn-info nextChart")
									.append(jQuery("<i class='glyphicon glyphicon-arrow-right'></i>")))
                            }

                            var chart = jQuery(this).highcharts();
                            chart.xAxis[0].setExtremes(0, step);
                        } catch (e) { }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
        container.find(".chartBeyondPlot").each(function () {
            if (!jQuery(this).hasClass("builded")) {
                jQuery(this).addClass("builded");

                try {
                    var dataChart = jQuery(this).find(".dataChart").val();
                    if (typeof dataChart != "undefined") {
                        dataChart = jQuery.parseJSON(dataChart);
                        jQuery.plot(jQuery(this), dataChart, {
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
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });

        container.find(".fullcalendar").each(function () {
            if (!jQuery(this).hasClass("builded")) {
                jQuery(this).addClass("builded");
                try {
                    var dataCalendar = jQuery(this).find(".contentcalendar").val();
                    if (typeof dataCalendar != "undefined") {
                        dataCalendar = jQuery.parseJSON(dataCalendar);
                        console.log(dataCalendar.Data);
                        var dayoffs = dataCalendar.DayOffs;
                        yeardefault = dataCalendar.DateDefault.Year;
                        monthdefault = dataCalendar.DateDefault.Month - 1;
                        daydefault = dataCalendar.DateDefault.Day;
                        $(this).fullCalendar(
                            {
                                year: yeardefault,
                                month: monthdefault,
                                day: daydefault,
                                header: {
                                    right: 'month,agendaWeek,agendaDay prev,next',
                                    left: 'title'
                                },
                                viewRender: function () {
                                    //Cấu hình tô  màu cho 1 ngày
                                    if (typeof dayoffs != "undefined") {
                                        for (var i = 0 ; i < dayoffs.length; i++) {
                                            var dayoff = dayoffs[i];
                                            $("[data-date=" + $.fullCalendar.formatDate(new Date(dayoff.Year, dayoff.Month - 1, dayoff.Day), "yyyy-MM-dd") + "]").find(".fc-day-content").append('<span class="fc-title">' + dayoff.txtNote + '</span>');
                                            $("[data-date=" + $.fullCalendar.formatDate(new Date(dayoff.Year, dayoff.Month - 1, dayoff.Day), "yyyy-MM-dd") + "]").find(".fc-day-content").find(".fc-title").css("background-color", dayoff.BackgroundColor);
                                            $("[data-date=" + $.fullCalendar.formatDate(new Date(dayoff.Year, dayoff.Month - 1, dayoff.Day), "yyyy-MM-dd") + "]").find(".fc-day-content").find(".fc-title").css("box-shadow", dayoff.shadow);
                                        }
                                    }
                                },

                                editable: true,
                                buttonText: {
                                    prev: '<i class="fa fa-chevron-left"></i>',
                                    next: '<i class="fa fa-chevron-right"></i>',

                                    month: 'Month',
                                    week: 'Week',
                                    day: 'Day'
                                },
                                eventLimit: true, // for all non-agenda views
                                views: {
                                    agenda: {
                                        eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
                                    }
                                },
                                droppable: true,
                                drop: function (date, allDay) {

                                    var originalEventObject = $(this).data('eventObject');

                                    var copiedEventObject = $.extend({}, originalEventObject);

                                    copiedEventObject.start = date;
                                    copiedEventObject.allDay = allDay;

                                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                                    if ($('#drop-remove').is(':checked')) {
                                        $(this).remove();
                                    }

                                },
                                //eventRender: function (event, element) {
                                //    //var append = '<a class="ellipsisMore"><i class="fa fa-ellipsis-v"></i></a> <div class="poputils"><a class="" href="">Cập nhật <i class="fa fa-pencil-square-o"></i></a><a class="quickDelete" href="' + event.urldelete + '">Xóa <b><i class="fa fa-trash closeon"></i></b></a></div>';
                                //    //element.append(append);
                                //    var fc_event_title = $("#checkincalendar .fc-event-title").html().toLowerCase();
                                //    var res = fc_event_title.replace('giờ đến:', '<i class="fa fa-sign-in" aria-hidden="true"></i>');
                                //    var res_final = res.replace('giờ về:', '<i class="fa fa-sign-out" aria-hidden="true"></i>');
                                //    $("#checkincalendar .fc-event-title").html(res_final);
                                //},
                                events: dataCalendar.Data


                                // backgroundColor: 'red'
                            });
                        //$(jQuery(this)).UseTooltip();
                    };

                } catch (e) {
                    console.log(e);
                }
            }
        });
    },
    updatePlayer: function (container) {
        container.find(".media-player").each(function () {
            var url = jQuery(this).attr("data-value");
            var video = jQuery(this).attr("data-video");
            jwplayer(jQuery(this).attr("id")).setup({
                flashplayer: "/stg/plugins/player.swf",
                controlbar: "bottom",
                width: 400,
                height: video == "1" ? 280 : 24,
                background: "#fff",
                autostart: "false",
                plugins: {
                    'timeslidertooltipplugin-1': {},
                    'captions': {
                        color: "#ffff80",
                        fontFamily: "Tahoma, Geneva, sans-serif",
                        fontSize: "17",
                        fontWeight: "normal"
                    }
                },
                //'proxy.file': "",
                'file': Cdata.Storage.domain + "/" + url
            });
            jQuery(this).addClass("player");
        });
    },
    updateImageViewer: function () {
        try {
            var thumbUrl = jQuery("#ViewerIMG").attr("src");
            var thumbMapUrl = jQuery("#PathThumbMap").val();
            var settings = {
                'viewportWidth': '100%',
                'viewportHeight': '100%',
                'fitToViewportShortSide': true,
                'contentSizeOver100': true,
                'loadingBgColor': '#ffffff',
                'startScale': .2,
                'startX': 0,
                'startY': 0,
                'animTime': 500,
                'draggInertia': 10,
                'zoomLevel': 1,
                'zoomStep': 0.1,
                'contentUrl': thumbUrl,
                'intNavEnable': true,
                'intNavPos': 'TR',
                'intNavAutoHide': true,
                'intNavMoveDownBtt': true,
                'intNavMoveUpBtt': true,
                'intNavMoveRightBtt': true,
                'intNavMoveLeftBtt': true,
                'intNavZoomBtt': true,
                'intNavUnzoomBtt': true,
                'intNavFitToViewportBtt': true,
                'intNavFullSizeBtt': true,
                'intNavBttSizeRation': 1,
                'mapEnable': true,
                'mapThumb': thumbMapUrl,
                'mapPos': 'BL',
                'popupShowAction': 'click',
                'testMode': false
            };
            jQuery('#DocProIMGMap').lhpMegaImgViewer(settings, 'DocProHotspots');
        }
        catch (e) {
            console.log(e);
        }
    },
    updatePDFViewer: function (response) {
        try {
            OCR.reset();
        }
        catch (e) { }
        try {
            window.webViewerLoad(true);
        } catch (e) {
            console.log(e);
        }
    },
    viewer: function (data) {

        try {
            if (typeof data == "undefined")
                return;
            if (typeof data.Path == "undefined")
                return;

            var path = data.Path.replace("\\", "/");
            if (Utils.IsPdfOrOffice(data.Extension)) {
                path = path.substring(0, path.lastIndexOf(".")) + ".pdf";
                jQuery("#DEFAULT_URL").val(Cdata.Storage.domain + "/Storage/Files/" + path);
                window.webViewerLoad(true);
                jQuery("#viewerContainer").scrollTop(0);
            }
            else if (Utils.IsImage(data.Extension)) {
                Utils.updateImageViewer();
            }
            else {
                Utils.updatePlayer();
            }
        } catch (e) {
            console.log(e);
        }
    },
    openOverlay: function (overide) {

        if (overide != undefined || jQuery("#Overlay").is(":visible") == false) {
            jQuery("#Overlay").fadeIn("fast");
            Utils.autoResize();
        }
    },
    closeOverlay: function (overide) {
        if (overide != undefined || jQuery(".ui-dialog:visible").length < 1) {
            jQuery("#Overlay").fadeOut("fast");
            jQuery(".ui-dialog-content:visible").dialog("close");
            jQuery(".hiddenDialog").removeClass("hiddenDialog");
        }
    },
    closeCDialog: function (dialoger, invoker) {
        dialoger.closest(".ui-dialog").removeClass("hiddenDialog");
        var hiddenDialogs = jQuery(document).find(".hiddenDialog");
        if (hiddenDialogs.length > 0) {
            hiddenDialogs.last().removeClass("hidden");
        } else {
            Utils.closeOverlay();
        }
        if (dialoger.closest(".ui-dialog").hasClass("refresh")) {
            window.location.href = Utils.getRedirect();
        }
        if (invoker) {
            dialoger.closest(".ui-dialog").find(".ui-dialog-content:visible").dialog("close");
        }
    },
    autoCloseFlash: function () {
        var flashCount = 0;
        jQuery(".flash-success").each(function () {
            flashCount++;
            jQuery(this).delay(flashCount * 5000).fadeOut("fast");
        });
    },
    autoResize: function () {
        try {
            var maxH = jQuery(window).height();
            jQuery(".ui-dialog-content:visible").each(function () {
                jQuery(this).dialog("option", "position", jQuery(this).dialog("option", "position"));
            });

        } catch (e) {
        }
    },

    validateDataForm: function (form) {
        form.find("input[type='checkbox']").each(function () {
            jQuery(this).removeClass("error");
            if (jQuery(this).hasClass('check_checked')) {
                if (!jQuery(this).is(':checked')) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.check_checked").removeClass("hidden");
                }
                else {
                    jQuery(this).siblings("span.error_ms.check_checked").addClass("hidden");
                }
            }
        })
        form.find("input[type='text'], input[type='password'], textarea, select").each(function () {
            var num = jQuery(this).removeClass("error").val();
            num = Utils.rmSpace(num);
            //if (!jQuery(this).is(":visible"))
            //    return true;
            if (jQuery(this).hasClass('checkngay')) {
                if (!Utils.isEmpty(num)) {
                    if (!jQuery.isNumeric(num) || parseInt(num) > 31 || parseInt(num) < 1) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkngay").removeClass("hidden");
                    } else {
                        if (num.length == 1) {
                            num = "0" + num;
                        }
                        jQuery(this).val(num);
                    }
                }
            }
            else if (jQuery(this).hasClass('checkthang')) {
                if (!Utils.isEmpty(num)) {
                    if (!jQuery.isNumeric(num) || parseInt(num) > 12 || parseInt(num) < 1) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkthang").removeClass("hidden");
                    } else {
                        if (num.length == 1) {
                            num = "0" + num;
                        }
                        jQuery(this).val(num);
                    }
                }
            }
            else if (jQuery(this).hasClass('checknam')) {
                if (!Utils.isEmpty(num)) {
                    if (!jQuery.isNumeric(num) || parseInt(num) < 1900 || parseInt(num) > 2015) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checknam").removeClass("hidden");
                    } else {
                        jQuery(this).val(num);
                    }
                }
            }
            else if (jQuery(this).hasClass('checkint')) {
                if (!Utils.isEmpty(num)) {
                    if (!jQuery.isNumeric(num) || num.indexOf(".") != -1 || num.indexOf(",") != -1) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkint").removeClass("hidden");
                    } else {
                        jQuery(this).val(num);
                    }
                }
            }

            if (jQuery(this).hasClass('checkrequired')) {
                jQuery(this).siblings("span.error_ms.checkrequired").addClass("hidden");
                if (Utils.isEmpty(num)) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkrequired").removeClass("hidden");
                }
                else if (jQuery(this).prop("tagName") == "SELECT" && num == "0") {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkrequired").removeClass("hidden");
                }
            }

            if (jQuery(this).hasClass('checkcompare')) {
                var comparator = jQuery(jQuery(this).attr("data-compare"));
                jQuery(this).siblings("span.error_ms.checkcompare").addClass("hidden");
                comparator.siblings("span.error_ms.checkcompare").addClass("hidden");
                var valCompare = comparator.val();
                if (valCompare != num) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkcompare").removeClass("hidden");
                    comparator.siblings("span.error_ms.checkcompare").removeClass("hidden");
                }
            }
            if (jQuery(this).hasClass('checkemail')) {
                jQuery(this).siblings("span.error_ms.checkemail").addClass("hidden");
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+/;
                if (!Utils.isEmpty(num) && !regex.test(num)) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkemail").removeClass("hidden");
                }
            }
            if (jQuery(this).hasClass('checkphone')) {
                jQuery(this).siblings("span.error_ms.checkphone").addClass("hidden");
                var regex = /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){8,16}$/;
                if (!Utils.isEmpty(num) && !regex.test(num)) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkphone").removeClass("hidden");
                }
            }
            if (jQuery(this).hasClass('checkphonetvds')) {
                jQuery(this).siblings("span.error_ms.checkphonetvds").addClass("hidden");
                var regex = /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){8,16}$/;
                if (!Utils.isEmpty(num) && !regex.test(num)) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkphonetvds").removeClass("hidden");
                }

                if (num.startsWith('+84') == false) {
                    if (num.startsWith('0') == true) {
                        if (num.length < 10 || num.length > 11) {
                            jQuery(this).addClass("error");
                            jQuery(this).siblings("span.error_ms.checkphonetvds").removeClass("hidden");
                        }
                    }
                    else {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkphonetvds").removeClass("hidden");
                    }
                }
                else {
                    if (num.length < 12 || num.length > 13) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkphonetvds").removeClass("hidden");
                    }
                }

            }

            if (jQuery(this).hasClass('checkusername')) {
                jQuery(this).siblings("span.error_ms.checkusername").addClass("hidden");
                var regex = /^[a-zA-Z\_]+([_]?[a-zA-Z0-9\_]+)*$/;
                jQuery(this).val(num);
                if (!Utils.isEmpty(num) && (!regex.test(num))) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checkusername").removeClass("hidden");
                }
            }
            if (jQuery(this).hasClass('checklength')) {
                var lengh = jQuery(this).getData()["length"];
                jQuery(this).siblings("span.error_ms.checklength").addClass("hidden");
                if (jQuery.isNumeric(lengh) && (Utils.isEmpty(num) || num.length < parseInt(lengh))) {
                    jQuery(this).addClass("error");
                    jQuery(this).siblings("span.error_ms.checklength").removeClass("hidden");
                }
            }
            if (jQuery(this).hasClass('checkcompareyear')) {
                if (!Utils.isEmpty(num)) {
                    var compare = jQuery(this).getData()["compare"];
                    var dtnow = new Date();
                    var dts = num.split("-");
                    var date = new Date(dts[2], parseInt(dts[1]) - 1, dts[0]);
                    jQuery(this).siblings("span.error_ms.checkcompareyear").addClass("hidden");
                    jQuery(this).removeClass("error");
                    if (compare == '0' && date > dtnow) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkcompareyear").removeClass("hidden");
                    }
                    else if (dtnow.getFullYear() - parseInt(compare) < parseInt(dts[2])) {
                        jQuery(this).addClass("error");
                        jQuery(this).siblings("span.error_ms.checkcompareyear").removeClass("hidden");
                    }
                }
            }



            /*
            if (GuestRepository.UsernameExists(guest.Username))
            {
                SetError(Locate.T("Tên đăng nhập đã tồn tại"));
            }


            */
        });

        var elErrors = form.find(".error");
        if (elErrors.length > 0) {
            var elError = elErrors.first().focus();
            if (!elError.is(":visible")) {
                elError.closest(".group-tab").find(".tab-data").addClass("hidden");
                var idTab = elError.closest(".tab-data").removeClass("hidden").attr("id");

                elError.closest(".group-tab").find(".tabitem").removeClass("active");
                elError.closest(".group-tab").find(".tabitem[data-tab='#" + idTab + "']").addClass("active");
            }

            return false;
        }
        return true;
    },

    sectionBuilder: function (response, options) {

        try {
            jQuery(".flash-success").remove();
            jQuery(".flash-error, .flash-warn").each(function () {
                if (jQuery(this).is(":visible") == false) {
                    jQuery(this).remove();
                }
            });
            if (response.hasOwnProperty("isTle")) {
                jQuery(document).prop("title", response.pgTle);
            }
            if (response.hasOwnProperty("isMsg")) {
                if (options != true)
                    jQuery("#Section").prepend(response.htMsg);
                if (!response.isErr)
                    Utils.closeOverlay(true);
                Utils.autoCloseFlash();
            }
            if (response.hasOwnProperty("isLogout")) {
                jQuery("<div>").delay(1000).fadeOut("100", function () {
                    window.location.href = jQuery("#bcrumdLogout").find("a").attr("href");
                });
                return;
            }
            if (response.hasOwnProperty("isDL")) {
                var dialoger = jQuery(response.htDL);
                var idDialoger = dialoger.attr("id");
                if (Utils.notEmpty(idDialoger)) {
                    dialoger.find('.ui-dialog-title').first().text(response.title);
                    jQuery('.ui-dialog:visible').addClass("hidden hiddenDialog");
                    jQuery('div[aria-describedby="' + idDialoger + '"]').detach();
                    jQuery('#' + idDialoger).closest(".ui-dialog").detach();

                    dialoger.dialog({
                        width: response.wDL,
                        resizable: false,
                        open: function () {
                            //jQuery("html").scrollTop(0);
                            //jQuery("body").addClass("noscroll");
                            if (dialoger.hasClass("useScrollBar"))
                                //jQuery(this).parent(".ui-dialog").addClass("hf50d");
                                Utils.openOverlay();
                            Utils.autoResize();
                            //
                            jQuery("#Overlay").removeClass("loading")
                        },
                        close: function () {

                            Utils.closeCDialog(jQuery(this));
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }

    },

    ins2pos: function (insString, selector) {

        var val = jQuery(selector).val();
        try {
            var st = jQuery(selector).getSelectionStart();
            var ed = jQuery(selector).getSelectionEnd();
            var before = val.substring(0, st);
            var after = val.substring(ed, val.length);
            jQuery(selector).val(before + insString + after);
            jQuery(selector).setSelection(st + insString.length, st + insString.length);
        } catch (e) {
            jQuery(selector).val(val + insString);
        }
    },

    wordCount: function (string) {
        string = string.replace(/(<([^>]+)>)/ig, " ");
        string = string.replace(/&nbsp;/ig, " ");
        string = string.replace(/\s{2,}/g, ' ');
        string = jQuery.trim(string);
        var args = string.split(' ');
        return args.length;
    },

    getSumary: function (string, limit) {

        string = string.replace(/(<([^>]+)>)/ig, " ");
        string = string.replace(/&nbsp;/ig, " ");
        string = string.replace(/\s{2,}/g, " ");
        string = jQuery.trim(string);
        return string.substring(0, limit);
    },

    convertDate: function (strDate, format) {

        var date = new Date(strDate);
        return date.toDateFormat(format);
    },

    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,

    convertSize: function (size) {

        var bytes = parseInt(size);
        if (isNaN(bytes))
            return "0 B";

        var tb = bytes / Utils.TB;
        if (tb >= 1) {
            return tb.toFixed(2) + " TB";
        }

        var gb = bytes / Utils.GB;
        if (gb >= 1) {
            return gb.toFixed(2) + " GB";
        }

        var mb = bytes / Utils.MB;
        if (mb >= 1) {
            return mb.toFixed(2) + " MB";
        }

        var kb = bytes / Utils.KB;
        if (kb >= 1) {
            return kb.toFixed(2) + " KB";
        }

        return size + " B";
    },
    moneyFormat: function (num) {
        var p = num.toFixed(2).split(".");
        return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "");
    }
};
var Smile = {

    smileurl: '',
    smileitems: {},
    init: function () {
        Smile.smileurl = typeof Cdata.Storage != 'undefined' 
            ? Cdata.Storage.urlSmile
            : '';
        Smile.smilelist();
    },

    smiles: function (str) {

        try {
            for (var i in Smile.smileitems) {
                if (Smile.smileitems.hasOwnProperty(i)) {
                    while (str.indexOf(i) !== -1) {
                        str = str.replace(i, Smile.smileitems[i]);
                    }
                }
            }
        } catch (e) {
        }
        return str;
    },

    smilelist: function () {
        Smile.smileitems = {};
        Smile.smileitems[":-)"] = "smile.png";
        Smile.smileitems[":)"] = "smile.png";
        Smile.smileitems[":]"] = "smile.png";
        Smile.smileitems["=)"] = "smile.png";
        Smile.smileitems[":-("] = "frown.png";
        Smile.smileitems[":("] = "frown.png";
        Smile.smileitems[":["] = "frown.png";
        Smile.smileitems["=("] = "frown.png";
        Smile.smileitems[":-O"] = "gasp.png";
        Smile.smileitems[":O"] = "gasp.png";
        Smile.smileitems[":-D"] = "grin.png";
        Smile.smileitems[":D"] = "grin.png";
        Smile.smileitems["=D"] = "grin.png";
        Smile.smileitems[":-p"] = "tongue.png";
        Smile.smileitems[":p"] = "tongue.png";
        Smile.smileitems["=P"] = "tongue.png";
        Smile.smileitems[";-)"] = "wink.png";
        Smile.smileitems[";)"] = "wink.png";
        Smile.smileitems[":3"] = "curlylips.png";
        Smile.smileitems[":-*"] = "kiss.png";
        Smile.smileitems[":*"] = "kiss.png";
        Smile.smileitems[">:-("] = "grumpy.png";
        Smile.smileitems[">:("] = "grumpy.png";
        Smile.smileitems["8)"] = "glasses.png";
        Smile.smileitems["B-)"] = "glasses.png";
        Smile.smileitems["B)"] = "glasses.png";
        Smile.smileitems["8-|"] = "sunglasses.png";
        Smile.smileitems["8|"] = "sunglasses.png";
        Smile.smileitems["B|-"] = "sunglasses.png";
        Smile.smileitems["B|"] = "sunglasses.png";
        Smile.smileitems[">:O"] = "upset.png";
        Smile.smileitems[">:-O"] = "upset.png";
        Smile.smileitems[">:o"] = "upset.png";
        Smile.smileitems[">:-o"] = "upset.png";
        Smile.smileitems["o.O"] = "confused.png";
        Smile.smileitems["O.o"] = "confused.png";
        Smile.smileitems["(^^^)"] = "shark.gif";
        Smile.smileitems[":v"] = "pacman.png";
        Smile.smileitems["O:)"] = "angel.png";
        Smile.smileitems["O:-)"] = "angel.png";
        Smile.smileitems["3:)"] = "devil.png";
        Smile.smileitems["3:-)"] = "devil.png";
        Smile.smileitems[":-/"] = "unsure.png";
        Smile.smileitems[":\\"] = "unsure.png";
        Smile.smileitems[":-\\"] = "unsure.png";
        Smile.smileitems[":'("] = "cry.png";
        Smile.smileitems[":putnam:"] = "putnam.gif";
        Smile.smileitems[":|]"] = "robot.gif";
        Smile.smileitems["<3"] = "heart.png";
        Smile.smileitems["<(“)"] = "penguin.gif";
        Smile.smileitems[":poop:"] = "poop-smiley.png";

        var html = "";
        for (var i in Smile.smileitems) {
            if (Smile.smileitems.hasOwnProperty(i)) {
                var filename = Smile.smileitems[i];
                var title = filename.split(".");
                html += "<img src=\"" + Smile.smileurl + "/" + Smile.smileitems[i] + "\" data-value=\"" + i + "\" title=\"" + title[0] + "\" />";;
                Smile.smileitems[i] = "<img src=\"" + Smile.smileurl + "/" + Smile.smileitems[i] + "\" title=\"" + title[0] + "\" />";
            }
        }
        jQuery(".showsmiles").bind("click", function () {
            if (!jQuery(this).hasClass("hasboxsmiles")) {
                jQuery(".showsmiles").addClass("hasboxsmiles");
                jQuery(".boxsmiles").append(html);
                jQuery(".boxsmiles").find("img").bind("click", function () {
                    var selector = jQuery(this).closest(".boxsmiles").attr("data-selector");
                    Utils.ins2pos(jQuery(this).attr("data-value"), selector);
                    return false;
                });
                jQuery(".boxsmiles").hover(function () {
                    jQuery(this).show();
                }, function () {
                    jQuery(this).hide();
                });
            }
            jQuery(this).find(".boxsmiles").show();
        });
        jQuery(".replace-smiles").each(function () {
            var html = jQuery(this).html();
            jQuery(this).html(Smile.smiles(html));
        });
    }
};
var Cdata = {
    init: function () {
        try {
            var data = jQuery("#CDATA").val();
            var dataJson = jQuery.parseJSON(data);
            for (var k in dataJson) {
                if (dataJson.hasOwnProperty(k)) {
                    Cdata[k] = dataJson[k];
                }
            }
        } catch (e) {
        }
    },
    SrcPath: function (path) {
        return Cdata.Storage.urlFile + "/" + path; //+ Cdata.Storage.urlFile
    }
};
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Date.prototype.toDateFormat = function (format) {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    var h = this.getHours().toString();
    var m = this.getMinutes().toString();

    mm = (mm[1] ? mm : "0" + mm[0]);
    dd = (dd[1] ? dd : "0" + dd[0]);
    h = (h[1] ? h : "0" + h[0]);
    m = (m[1] ? m : "0" + m[0]);

    var value = "";
    switch (format) {
        case "dd-MM-yyyy HH:mm":
            value = dd + "-" + mm + "-" + yyyy + " " + h + ":" + m;
            break;
        default:
            value = dd + "-" + mm + "-" + yyyy;
            break;
    }
    return value;
};
jQuery.fn.extend({
    reset: function () {
        try {
            this.each(function () {
                this.reset();
            });
            jQuery(jQuery(this).attr("data-html-reset")).html("");
        } catch (e) {
        }
        jQuery(this).find(".isNew").remove();
    },
    getData: function () {
        var data = {};
        try {
            this.each(function () {
                jQuery.each(this.attributes, function () {
                    var name = this.name.toLowerCase();
                    if (name.indexOf("data-") === 0) {
                        var k = "";
                        var args = name.split("-");
                        for (var n = 0; n < args.length; n++) {
                            if (n == 0) continue;
                            if (n == 1) {
                                k += args[n];
                            }
                            else {
                                k += args[n].capitalize()
                            }
                        }
                        data[k] = this.value;
                    }
                });
            });
        } catch (e) {
        }
        return data;
    },
    getDataUppername: function () {
        var data = {};
        try {
            this.each(function () {
                jQuery.each(this.attributes, function () {
                    var name = this.name.toLowerCase();
                    if (name.indexOf("data-") === 0) {
                        var k = "";
                        var args = name.split("-");
                        for (var n = 0; n < args.length; n++) {
                            if (n == 0) continue;
                            var v = args[n];
                            if (v == "id") {
                                k += v.toUpperCase();
                            }
                            else {
                                k += v.capitalize()
                            }
                        }
                        data[k] = this.value;
                    }
                });
            });
        } catch (e) {
        }
        return data;
    }
});

var Callbacks = {

    ServiceFormFiles: function (value, validator) {
        return jQuery(validator.$form).find(".ServiceFormFiles").find(".fileitem").length > 0;
    },
    JobExecutors: function (value, validator) {
        var rs = jQuery(validator.$form).find(".JobExecutors").find(".scrollItem").length > 0;
        if (!rs) {
            jQuery("#tabJobCrExecutors").trigger("click");
        }
        return rs;
    }
}
