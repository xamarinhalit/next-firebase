(function () {
    $(document).ready(function () {
        const _Messages = {
            Validate: {
                messages: {
                    cardnumber: "Kart Numarasýný kontrol ediniz  ",

                    cartType: "Kart Tipini kontrol ediniz  ",
                    CCOwner: "Karttaki adýnýzý kontrol ediniz  ",
                    expiry: "Tarih Kontrol Ediniz. ",
                    cvc: "Arka Yüzündeki kodu kontrol ediniz."
                },
                fields: {
                    CardNumber: 0,
                    cartType: 2,
                    CCOwner: 3,
                    expiry: 4,
                    cvc: 5
                }
            }
        };
        const _PaymentValues = {
            Values: {
                Cartype: null,
                CartBank: null,
                Installment: 0
            },
            Validate: {

                Invalids: [
                    //{ id: _Messages.Validate.fields.CardNumber, message: _Messages.Validate.messages.cardnumber },
                    //{ id: _Messages.Validate.fields.cartType, message: _Messages.Validate.messages.cartType },
                    //{ id: _Messages.Validate.fields.CCOwner, message: _Messages.Validate.messages.CCOwner },
                    //{ id: _Messages.Validate.fields.expiry, message: _Messages.Validate.messages.expiry },
                    //{ id: _Messages.Validate.fields.cvc, message: _Messages.Validate.messages.cvc },
                ],
            },
            Load: {
                IsLoading: false
            },
            Card: {
                $formcard: $('#formcard'),
                $formcardhidden: $('#formcard>#hiddenfields'),
                $cardnumber: $("#card_number"),
                cvcInvalid: function (checked = 0) {
                    const imessage = {
                        id: _Messages.Validate.fields.cvc,
                        message: _Messages.Validate.messages.cvc
                    };
                    return _PaymentFN.Tools.Validate.fields(checked, imessage);
                },
                expiryInvalid: function (checked = 0) {
                    const imessage = {
                        id: _Messages.Validate.fields.expiry,
                        message: _Messages.Validate.messages.expiry
                    };
                    return _PaymentFN.Tools.Validate.fields(checked, imessage);
                },
                cardnumberInvalid: function (checked = 0) {
                    const imessage = {
                        id: _Messages.Validate.fields.CardNumber,
                        message: _Messages.Validate.messages.cardnumber
                    };
                    return _PaymentFN.Tools.Validate.fields(checked, imessage);
                },

                carttypeInvalid: function (checked = 0) {
                    const imessage = {
                        id: _Messages.Validate.fields.cartType,
                        message: _Messages.Validate.messages.cartType
                    };
                    return _PaymentFN.Tools.Validate.fields(checked, imessage);
                },
                CCOwnerInvalid: function (checked = 0) {
                    const imessage = {
                        id: _Messages.Validate.fields.CCOwner,
                        message: _Messages.Validate.messages.CCOwner
                    };
                    return _PaymentFN.Tools.Validate.fields(checked, imessage);
                },
                $carttype: $("#card_type"),
                $cartBank: $("#cartbank"),
                Prop: {
                    container: '.card-wrapper',
                    // numara formatý
                    formatting: true,
                    form: document.querySelector('#formcard'),
                    // form seçicileri
                    formSelectors: {
                        numberInput: 'input[name="card_number"]',
                        expiryInput: 'input[name="expiry"]',
                        cvcInput: 'input[name="cvv"]',
                        nameInput: 'input[name="cc_owner"]'
                    },
                    cardSelectors: {
                        cardContainer: '.jp-card-container',
                        card: '.jp-card',
                        numberDisplay: '.jp-card-number',
                        expiryDisplay: '.jp-card-expiry',
                        cvcDisplay: '.jp-card-cvc',
                        nameDisplay: '.jp-card-name'
                    },

                    // mesajlar
                    messages: {
                        validDate: 'valid\nthru',
                        monthYear: 'month/year'
                    },

                    // placeholder alanlarý
                    placeholders: {
                        number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
                        cvc: '&bull;&bull;&bull;',
                        expiry: '&bull;&bull;/&bull;&bull;',
                        name: 'Adý Soyadý'
                    },

                    // input masking aktifle
                    masks: {
                        cardNumber: false
                    },

                    // valid/invalid CSS class bilgileri
                    classes: {
                        valid: 'jp-card-valid',
                        invalid: 'jp-card-invalid'
                    },

                    // debug mode
                    debug: false

                },
                $CCOwner: $("input[name='cc_owner']"),
                $Cvc: $("input[name='cvv']"),
            },
            Expiry: {
                $month: $("input[name='expiry_month']"),
                $year: $("input[name='expiry_year']"),
                $expiry: $("input[name='expiry']")
            },
            Installment: {
                $installment: $("input[name='InstallmentCount']"),
                $installmentChecked: $("input[name='InstallmentCount']:checked")
            },
            Order: {
                $OrderNumber: $("input[name='OrderNumber']")
            },
            Prices: {
                $paymentAmount: $("#PaymentAmount"),
                paymentAmount: 0,
                $orderprices: $("#OrderPrice"),
                orderprice: 0
            },
            Submit: {
                $priceButton: $("#PriceButton")
            }
        };
        const _PaymentFN = {
            Tools: {
                ToBase64: function (data) {
                    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
                },
                ToFromBase64String: function (data) {
                    return JSON.parse(decodeURIComponent(escape(atob(data))));
                },
                Validate: {
                    fields: function (checked, imessage) {
                        var valids = false;
                        var indexof = -1;
                        var invalids = null;
                        for (var i = 0; i < _PaymentValues.Validate.Invalids.length ; i++) {
                            invalids = _PaymentValues.Validate.Invalids[i];
                            if (invalids != undefined && invalids.id == imessage.id) {
                                
                                indexof = i;
                            }
                        }
                        if (indexof == -1) {
                            if (checked == 0) {
                                
                                _PaymentValues.Validate.Invalids.push(imessage);
                            }
                            valids = true;
                        } else {
                            switch (checked) {
                                case 2:
                                    _PaymentValues.Validate.Invalids.splice(indexof, 1);
                                    break;
                                default:
                                    break;
                            }
                        }

                        return valids;//checked==1 validation
                    },
                    AddError: function (val) {
                        toastr.error('' + val + '');
                    }
                },
                AllTrim: function (val) {
                    return new String(val).replace(/ /g, "");
                }
            },
           
            Card: {
                New: function () { new Card(_PaymentValues.Card.Prop);},
                KeyUp: function (e) {
                    var tval = e.currentTarget.value;
                    if (tval != null && e.keyCode != 8 && e.keyCode != 46) {
                        var tval2 = _PaymentFN.Tools.AllTrim(tval);
                        if (tval2.length == 6) {
                            _PaymentValues.Card.cardnumberInvalid();
                            tval2 = new String(tval2);
                            if (_PaymentValues.Load.IsLoading == false) {
                                _PaymentValues.Load.IsLoading = true;
                                $.ajax({
                                    url: '/Payment/GetBinDetail',
                                    type: "POST",
                                    data: { bin: tval2 },
                                    success: function (result) {
                                        if (typeof result === "string") {
                                            if (result.indexOf("DOCTYPE") != -1) {
                                                swal("Bu iþlemi yapmaya ya da sayfayý görüntülemeye yetkiniz yoktur", "", "warning");
                                            }
                                        }
                                        else {
                                            if (result.success == "success") {
                                                _PaymentValues.Card.$carttype.val(result.cardType);
                                                _PaymentValues.Card.$cartBank.val(result.bank);
                                                _PaymentValues.Installment.$installment.each(function (index, el) {
                                                    if (el != undefined) {
                                                        if (result.cardType == "debit") {
                                                            if (el.value == "false")
                                                                el.checked = true;
                                                            else
                                                                el.checked = false;
                                                            el.disabled = true;
                                                        } else {
                                                            el.disabled = false;
                                                        }
                                                    }
                                                });
                                                _PaymentValues.Values.Cartype = result.cardType;
                                                _PaymentValues.Values.CartBank = result.bank;
                                                if (result.cardType || false) {
                                                    _PaymentValues.Card.carttypeInvalid(2);
                                                } else {
                                                    _PaymentValues.Card.carttypeInvalid();
                                                }
                                            }
                                            else {
                                                _PaymentFN.Validate.ClearCardType();
                                                swal(result.errormessage, "", "error");

                                            }
                                        }
                                        _PaymentValues.Load.IsLoading = false;
                                    },
                                    error: function (error) {
                                        _PaymentFN.Validate.ClearCardType();
                                        swal(result.errormessage, "", "error");
                                        AuthorityMessage(error);
                                        _PaymentValues.Load.IsLoading = false;
                                    }
                                });
                            }
                        }
                        else if (tval2.length < 6) {
                            _PaymentValues.Card.cardnumberInvalid();
                            _PaymentFN.Validate.ClearCardType();
                        } else if (tval2.length == 16) {
                            _PaymentValues.Card.cardnumberInvalid(2);
                        }
                    }
                },
            },
            Expiry: {
                Blur: function (e) {
                    
                    const { AllTrim } = _PaymentFN.Tools;
                    let valexpiry = e.currentTarget.value
                    let val = "";
                    if (valexpiry || false) {
                        val = AllTrim(valexpiry);
                        let vals = parseInt(val);
                        if (!isNaN(vals)) {
                            if (val.indexOf("/") > -1) {
                                let values = val.split("/");
                                let val1 = AllTrim(values[0]);
                                _PaymentValues.Expiry.$month.val(val1);
                                let val2 = parseInt(AllTrim(values[1]));
                                if (!isNaN(val2)) {
                                    _PaymentValues.Expiry.$year.val(val2);
                                    const Dnow = new Date().getFullYear();
                                    if (val2 >= Dnow)
                                        _PaymentValues.Card.expiryInvalid(2);
                                    else
                                        _PaymentValues.Card.expiryInvalid();
                                } else {
                                    _PaymentValues.Card.expiryInvalid();
                                }
                                _PaymentValues.Expiry.$month.val(val1);
                            } else {
                                _PaymentValues.Card.expiryInvalid();
                            }
                        } else {
                            _PaymentValues.Card.expiryInvalid();
                        }
                    }
                }
            },
            Installment: {
                ToFixed: function (val = 100) {
                    return (_PaymentValues.Prices.paymentAmount / 100 * val).toFixed(2);
                },
                ToDisabled: function () {
                    _PaymentValues.Installment.$installment.each(function (index, el) {
                        if (el != undefined) {
                            if (el.value == "false")
                                el.checked = true;
                            else
                                el.checked = false;
                            el.disabled = true;
                        }
                    });
                },
                Change: function (e) {
                    const target = e.currentTarget;
                    if (target.checked) {
                        if (target.value == "true") {
                            _PaymentValues.Values.Installment = 3;
                            _PaymentValues.Prices.$paymentAmount.val(_PaymentFN.Installment.ToFixed(105));
                        } else {
                            _PaymentValues.Values.Installment = 0;
                            _PaymentValues.Prices.$paymentAmount.val(_PaymentFN.Installment.ToFixed());
                        }
                       
                    }
                },

            },
            Prices: {
                Init: function () {
                    _PaymentValues.Prices.paymentAmount = parseFloat(_PaymentValues.Prices.$paymentAmount.val()).toFixed(2);
                    _PaymentValues.Prices.$paymentAmount.val(_PaymentValues.Prices.paymentAmount);
                    _PaymentValues.Prices.orderprice = parseFloat(_PaymentValues.Prices.$orderprices.val()).toFixed(2);
                    _PaymentValues.Prices.$orderprices.val(_PaymentValues.Prices.orderprice);
                }
            },
            Clear: function () {
                _PaymentFN.Installment.ToDisabled();
                _PaymentValues.Card.$carttype.val("");
                _PaymentValues.Card.$cardnumber.val("");
                _PaymentValues.Card.$CCOwner.val("");
                _PaymentValues.Card.$Cvc.val("");
                _PaymentValues.Expiry.$expiry.val("");
                _PaymentValues.Expiry.$month.val("");
                _PaymentValues.Expiry.$year.val("");
                
            },
            Validate: {
                Init: function () {
                    _PaymentValues.Card.cardnumberInvalid();
                    _PaymentValues.Card.carttypeInvalid();
                    _PaymentValues.Card.CCOwnerInvalid();
                    //_PaymentValues.Card.cvcInvalid();
                    _PaymentValues.Card.expiryInvalid();
                },
                ClearCardType: function () {
                    _PaymentValues.Card.carttypeInvalid();
                    _PaymentValues.Values.CartBank = null;
                    _PaymentValues.Values.Cartype = null;
                    _PaymentValues.Card.$carttype.val("");
                    _PaymentValues.Card.$cartBank.val("");
                    _PaymentFN.Installment.ToDisabled();
                },
                ValidateSubmit: function () {
                    const { AllTrim } = _PaymentFN.Tools;
                    const owner = _PaymentValues.Card.$CCOwner.val();
                    let ownertrim = AllTrim(owner);
                    const Cvc = _PaymentValues.Card.$Cvc.val();
                    let Cvctrim = AllTrim(Cvc);
                    if (ownertrim.length == 0)
                        _PaymentValues.Card.CCOwnerInvalid();
                    else
                        _PaymentValues.Card.CCOwnerInvalid(2);
                    if (Cvctrim.length == 0)
                        _PaymentValues.Card.cvcInvalid();
                    else
                        _PaymentValues.Card.cvcInvalid(2);
                }
            },
            Init: function ( first="true") {
                if (first == "true") {
                    _PaymentFN.Card.New();
                    _PaymentFN.Validate.Init();
                    _PaymentValues.Card.$formcard.card(_PaymentValues.Card.Prop);
                    _PaymentValues.Expiry.$expiry.blur(_PaymentFN.Expiry.Blur);
                    _PaymentValues.Card.$cardnumber.keyup(_PaymentFN.Card.KeyUp);
                    _PaymentFN.Prices.Init();
                    _PaymentValues.Installment.$installment.change(_PaymentFN.Installment.Change);
                    _PaymentValues.Submit.$priceButton.click(_PaymentFN.Submit.Click);
                    _PaymentFN.Clear();
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "5000",
                        "hideDuration": "5000",
                        "timeOut": "5000",
                        "extendedTimeOut": "5000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                }
            },
            Submit: {
                Click: function (e) {
                    e.preventDefault();
                    const { AllTrim } = _PaymentFN.Tools;
                    _PaymentFN.Validate.ValidateSubmit();
                    if (_PaymentValues.Validate.Invalids.length > 0) {

                        _PaymentValues.Validate.Invalids.forEach(function (item, index) {
                            if (item != undefined) {
                                if (item.message != undefined) {
                                    if (item.message)
                                        _PaymentFN.Tools.Validate.AddError(item.message);
                                }
                            }
                        });
                    } else if (_PaymentValues.Load.IsLoading == false) {
                        _PaymentValues.Load.IsLoading = true;

                        const paymcalc = {};
                        paymcalc["owner"] = _PaymentValues.Card.$CCOwner.val();
                        paymcalc["cardbank"] = _PaymentValues.Values.CartBank;
                        paymcalc["carttype"] = _PaymentValues.Card.$carttype.val();
                        paymcalc["ordernumber"] = _PaymentValues.Order.$OrderNumber.val();
                        paymcalc["installamount"] = _PaymentValues.Values.Installment;
                        const paydata = _PaymentFN.Tools.ToBase64(paymcalc);
                        $.ajax({
                            url: '/Payment/GetPayMentCalc',
                            type: "POST",
                            data: { paymcalc: paydata },
                            success: function (result) {
                                if (typeof result === "string") {
                                    if (result.indexOf("DOCTYPE") != -1) {
                                        swal("Bu iþlemi yapmaya ya da sayfayý görüntülemeye yetkiniz yoktur", "", "warning");
                                    }
                                }
                                else {
                                    if (result.success == "success") {
                                        console.log(result);
                                        let _data = _PaymentFN.Tools.ToFromBase64String(result.Result);
                                        console.log(_data);
                                        //_data.map(function (key, value, index) {
                                        //    if (key != undefined)
                                        //        _PaymentValues.Card.$formcard.append("<input type='hidden' name='" + key + "' value='" + _data[keys[i]] + "'/>");
                                        //});
                                        let keys = Object.keys(_data);
                                        _PaymentValues.Card.$formcardhidden.html("");
                                        for (let i = 0; i < keys.length; i++) {
                                            if(keys[i]!="Id")
                                            _PaymentValues.Card.$formcardhidden.append("<input type='hidden' name='" + keys[i] + "' value='" + _data[keys[i]] + "'/>");
                                        }
                                        _PaymentValues.Card.$cardnumber.val(x => AllTrim(x));
                                        _PaymentValues.Expiry.$year.val(x => AllTrim(x).substr(2,2));
                                        //_PaymentValues.Card.$cardnumber.val("4444555566667777");
                                        //_PaymentValues.Expiry.$year.val("24");
                                        //_PaymentValues.Expiry.$month.val("12");
                                        //_PaymentValues.Card.$Cvc.val("000");
                                        //_PaymentValues.Card.$CCOwner.val("TEST KARTI");
                                        //_PaymentValues.Card.$carttype.val("bonus");
                                        _PaymentValues.Card.$formcard.submit();
                                    }
                                    else {
                                        swal(result.errormessage, "", "error");
                                    }
                                }
                                _PaymentValues.Load.IsLoading = false;
                            },
                            error: function (error) {
                                AuthorityMessage(error);
                                _PaymentValues.Load.IsLoading = false;
                            }
                        });
                    }
                }
            },
        };
        _PaymentFN.Init();
    });
})();