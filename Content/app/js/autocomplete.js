var Autocomplete = {

    init: function (container) {
        Autocomplete.category(container);
        Autocomplete.user(container);
        Autocomplete.position(container);
        Autocomplete.dept(container);
        Autocomplete.team(container);
        Autocomplete.provider(container);
        Autocomplete.role(container);
        Autocomplete.channel(container);
        Autocomplete.organ(container);
        Autocomplete.link(container);
        Autocomplete.item(container);
        Autocomplete.ocrForm(container);
        Autocomplete.htmlOthers(container);
        Autocomplete.doctype(container);
        Autocomplete.person(container);
        Autocomplete.doituong(container);
        Autocomplete.equip(container);
        Autocomplete.employee(container);
    },
    equip: function (container) {

        container.find(".autocompleteEquip").each(function () {
            if (!jQuery(this).hasClass("inited")) {

                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/equip.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItemEquip(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    province: function (container) {

        container.find(".autocompleteProvince").each(function () {
            var obj = jQuery(this);
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: {
                                Term: req.term,
                                Type: obj.attr("data-type") || jQuery(obj.attr("data-type-rel")).val(),
                                TypeSwitch: jQuery(obj.attr("data-type-switch")).val(),
                                Code: obj.attr("data-code"),
                                IDNotIn: obj.attr("data-id-not-id"),
                                Parent: obj.attr("data-parent") || -1,
                                DataId: obj.attr("data-id")
                            },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/category.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    close: function () {
                        Autocomplete._closeDialog(jQuery(this));
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItemProvince(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    channel: function (container) {

        container.find(".autocompleteChannel").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/channel.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    role: function (container) {

        container.find(".autocompleteRole").each(function () {
            if (!jQuery(this).hasClass("inited")) {

                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/role.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    provider: function (container) {

        container.find(".autocompleteProvider").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/provider.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    dept: function (container) {

        container.find(".autocompleteDept").each(function () {
            if (!jQuery(this).hasClass("inited")) {

                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/dept.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                        
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    person: function (container) {

        container.find(".autocompletePerson").each(function () {
            if (!jQuery(this).hasClass("inited")) {

                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/person.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    doituong: function (container) {

        container.find(".autocompleteDoiTuong").each(function () {
            var obj = jQuery(this);
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, Type: obj.attr("data-type") || jQuery(obj.attr("data-type-rel")).val() },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/doi-tuong.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    close: function () {
                        Autocomplete._closeDialog(jQuery(this));
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    team: function (container) {

        container.find(".autocompleteTeam").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/team.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    position: function (container) {

        container.find(".autocompletePosition").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/position.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    user: function (container) {

        container.find(".autocompleteUser").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/auser.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    category: function (container) {

        container.find(".autocompleteCategory").each(function () {
            var obj = jQuery(this);
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: {
                                Term: req.term,
                                Type: obj.attr("data-type") || jQuery(obj.attr("data-type-rel")).val(),
                                TypeSwitch: jQuery(obj.attr("data-type-switch")).val(),
                                Code: obj.attr("data-code"),
                                IDNotIn: obj.attr("data-id-not-id"),
                                Parent: obj.attr("data-parent") || -1
                            },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/category.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    close: function () {
                        Autocomplete._closeDialog(jQuery(this));
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    organ: function (container) {

        container.find(".autocompleteOrgan").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/organ.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    link: function (container) {

        container.find(".autocompleteLink").each(function () {
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/link.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },

    item: function (container) {

        container.find(".autocompleteItem").each(function () {
            var obj = jQuery(this);
            if (!obj.hasClass("inited")) {
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, type: obj.attr("data-type") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/item.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    ocrForm: function (container) {

        container.find(".autocompleteOcrForm").each(function () {
            var obj = jQuery(this);
            if (obj.data('uiAutocomplete')) {
                jQuery(this).autocomplete("destroy");
            }
            obj.autocomplete({
                appendTo: "body",
                source: function (req, res) {
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                        url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/ocr-form.html",
                        success: function (response) {
                            Autocomplete._source(res, response);
                        }
                    });
                },
                open: function (event, ui) {
                    Autocomplete._open(event, ui);
                },
                select: function (a, b) {
                    return Autocomplete._selectItem(a, b, jQuery(this));
                },
                delay: 350,
                minLength: 0
            }).click(function () {
                jQuery(this).autocomplete("search", "");
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return Autocomplete._renderItem(ul, item, jQuery(this.element));
            };
        });
    },
    doctype: function (container) {

        container.find(".autocompleteDoctype").each(function () {
            if (!jQuery(this).hasClass("inited")) {

                var obj = jQuery(this);
                obj.addClass("inited");
                obj.autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/doctype.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    htmlOthers: function (container) {

        container.find(".autocompleteHtmlOther").each(function () {
            var obj = jQuery(this);
            if (obj.data('uiAutocomplete')) {
                jQuery(this).autocomplete("destroy");
            }
            obj.autocomplete({
                appendTo: "body",
                source: function (req, res) {
                    jQuery.ajax({
                        type: "POST",
                        async: true,
                        data: { Term: req.term, IDNotIn: obj.attr("data-id-not-in") },
                        url: Utils.getDomain() + "/" + obj.attr("data-href"),
                        success: function (response) {

                            Utils.sectionBuilder(response);
                            if (response.hasOwnProperty("isCust")) {
                                jQuery(obj.attr("data-target")).html(response.htCust);
                            }

                            res();
                        }
                    });
                },
                open: function (event, ui) {
                },
                select: function (a, b) {
                },
                delay: 350,
                minLength: 0
            });
        });
    },


    employee: function (container) {

        container.find(".autocompleteEmployee").each(function () {
            var obj = jQuery(this);
            var contract = obj.attr('data-target-hascontract');
            var hasContract = 0;
            if (typeof contract != "undefined")
                hasContract = contract;
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: {
                                Term: req.term,
                                IDDept: jQuery(obj.attr('data-targetdept')).val(),
                                HasContract:hasContract
                            },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/employee.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    close: function () {
                        Autocomplete._closeDialog(jQuery(this));
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },
    employee: function (container) {

        container.find(".autocompleteSystem").each(function () {
            var obj = jQuery(this);
            if (!jQuery(this).hasClass("inited")) {
                jQuery(this).addClass("inited");
                jQuery(this).autocomplete({
                    appendTo: "body",
                    source: function (req, res) {
                        jQuery.ajax({
                            type: "POST",
                            async: true,
                            data: {
                                Term: req.term
                            },
                            url: Utils.getDomain() + "/" + Cdata.VirtualPath + "/autocomplete/employee.html",
                            success: function (response) {
                                Autocomplete._source(res, response);
                            }
                        });
                    },
                    close: function () {
                        Autocomplete._closeDialog(jQuery(this));
                    },
                    open: function (event, ui) {
                        Autocomplete._open(event, ui);
                    },
                    select: function (a, b) {
                        return Autocomplete._selectItem(a, b, jQuery(this));
                    },
                    delay: 350,
                    minLength: 0
                }).click(function () {
                    jQuery(this).autocomplete("search", "");
                }).autocomplete("instance")._renderItem = function (ul, item) {
                    return Autocomplete._renderItem(ul, item, jQuery(this.element));
                };
            }
        });
    },



    _source: function (res, response) {
        if (Utils.notEmpty(response.data)) {
            var items = [];
            for (var i in response.data) {
                var item = response.data[i];
                var itemA = {
                    value: item.Name,
                    label: item.Name,
                    id: item.ID,
                    index:0,
                    desc: ""
                };
                if (typeof item.Parents != "undefined")
                    itemA.desc = item.Parents;
                 if (typeof item.Index != "undefined")
                     itemA.index = item.Index;
                items.push(itemA);
            }
            res(items);
        } else {
            Utils.sectionBuilder(response);
            res();
        }
    },
    _closeDialog: function (el) {
        try {
            var v = el.val();
            var targetId = el.attr("data-targetid");
            if (!Utils.isEmpty(targetId)) {
                if (Utils.isEmpty(v)) {
                    jQuery(targetId).val("");
                }
                setTimeout(function () {
                    try {
                        var form = el.closest("form");
                        if (form.hasClass("bootstrapValidator")) {
                            form.bootstrapValidator('revalidateField', el.attr("name"));
                        }
                    } catch (e) { }
                }, 300);
            }
        } catch (e) {

        }
    },

    _open: function (event, ui) {
        var $input = jQuery(event.target),
        $results = $input.autocomplete("widget"),
        top = $input.offset().top,
        height = $results.css({ height: "auto" }).height(),
        inputHeight = $input.height(),
        bodyHeight = jQuery('body').height();
        if ((top + height + inputHeight) > bodyHeight) {
            var h = (bodyHeight - top + inputHeight - 50);
            if (h > 150)
                $results.css({ height: h + "px" });
        }
    },

    _selectItem: function (a, b, el) {
        var name = el.attr("data-name");
        var target = el.attr("data-target");
        var targetId = el.attr("data-targetid");
        if (!Utils.isEmpty(targetId)) {
            jQuery(targetId).val(b.item.id);
            setTimeout(function () {
                try {
                    var form = el.closest("form");
                    if (form.hasClass("bootstrapValidator")) {
                        form.bootstrapValidator('revalidateField', el.attr("name"));
                    }
                } catch (e) { }
            }, 300);
        }
        if (!Utils.isEmpty(target)) {
            var item = jQuery(target).find(".scrollItem[data-id='" + b.item.id + "']");
            if (item.length == 0) {
                item = '<div class="scrollItem tickGroup isNew" data-id="' + b.item.id + '" style="display: none">' +
                            '<div class="col-sm-12">' +
                                '<div class="checkbox">' +
                                    '<label>' +
                                        '<input checked type="checkbox" value="' + b.item.id + '" class="colored-success tickItem" name="' + name + '" id="Rand' + (new Date()).getTime() + '">' +
                                        '<span class="nowrap text">' + b.item.label + '</span>' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            }
            else {
                item.css('display', 'none').find("input[type='checkbox']").prop("checked", true);
            }
            jQuery(target).prepend(jQuery(item).fadeIn("1000"));

            try {
                var form = el.closest("form");
                if (form.hasClass("bootstrapValidator")) {
                    form.bootstrapValidator('revalidateField', jQuery(target).attr("name"));
                }
            } catch (e) { }

            jQuery(this).val("");
            return false;
        }


        return true;
    },
    _selectItemEquip: function (a, b, el) {
        var name = el.attr("data-name");
        var target = el.attr("data-target");
        var targetId = el.attr("data-targetid");
        if (!Utils.isEmpty(targetId)) {
            jQuery(targetId).val(b.item.id);
            setTimeout(function () {
                try {
                    var form = el.closest("form");
                    if (form.hasClass("bootstrapValidator")) {
                        form.bootstrapValidator('revalidateField', el.attr("name"));
                    }
                } catch (e) { }
            }, 300);
        }
        if (!Utils.isEmpty(target)) {
            var idEquip = b.item.id;
            var nameEquip = b.item.value;

            jQuery(target).find("tr").removeClass("bg-info");

            var equips = jQuery(target).find('#tr_' + idEquip);
            if (equips.length > 0) {
                equips.addClass("bg-info");
                el.val("");
                return false;
            }


            var temp = jQuery('#BEDetail_template').html();
            temp = temp.replace('#trequipidtemp', 'tr_' + idEquip);
            temp = temp.replace('#equipidtemp', idEquip);
            temp = temp.replace('#equipnametemp', nameEquip);

            jQuery(target).append(temp);
        }
        el.val("");
        return true;
    },
   

    _renderItem: function (ul, item, el) {
        var padding_left = item.index * 40;
        return jQuery("<li class='itemf' style='width: " + el.width() + "px'>")
            .append("<div><a style='padding-left:"+padding_left+"px' title='" + item.label + "'>" + item.label + "</a></div><div style='padding-left:"+padding_left+"px' class='detail' title='" + item.desc + "'>" + item.desc + "</div>")
            .appendTo(ul);
    }
};