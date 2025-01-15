var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserId = window.localStorage.getItem("UserID");

var FlightSeqNo;
var SegId;
var ULDseqNo;
var strShipmentInfo;
var totalPkgs;
var totalWeight;
var totalVol;
var prorataWeightValue;
var prorataVolumeValue;
var prorataWtParam;
var prorataVolParam;
var html;
var _FlightSeqNo;
var AWBRowId;

document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("menubutton", onMenuKeyDown, false);

function onPause() {

    HHTLogout();
}

function onResume() {
    HHTLogout();
}

function onMenuKeyDown() {
    HHTLogout();
}
$(function () {

    if (window.localStorage.getItem("RoleExpUnitization") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1; // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    $('#txtFlightDate').val(newDate);

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return date + h + ":" + m;
    // $('#txtGPNo1').val(date);

});

//function countChar(val, count) {

//    var currentBoxNumber = 0;
//    textboxes = $('input[name="textbox[]"]');
//    currentBoxNumber = textboxes.index(val);

//    var len = val.value.length;
//    var index = val.index;

//    if (len == count)
//        ToNextTextbox(currentBoxNumber)
//};

//function ToNextTextbox(currentBoxNumber) {

//    textboxes = $('input[name="textbox[]"]');

//    if (textboxes[currentBoxNumber + 1] != null) {
//        nextBox = textboxes[currentBoxNumber + 1];
//        nextBox.focus();
//        nextBox.select();
//        event.preventDefault();
//        return false;

//    }

//}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function CheckULDBulk() {

    if (document.getElementById('rdoULD').checked) {
        $('#divULDText').show();
        $('#divBulkText').hide();
        $('#divDdlULD').show();
        $('#divDdlBulk').hide();
        $('#divContour').show();
        $('#txtGrossWt').val('');
        
        GetOffPointForFlight();

    }
    if (document.getElementById('rdoBulk').checked) {
        $('#divULDText').hide();
        $('#divBulkText').show();
        $('#divDdlULD').show();
        // $('#divDdlBulk').show();
        $('#divContour').hide();
        $('#txtGrossWt').val('');
        GetOffPointForFlight();
    }
}

function CheckUldNoValidation(uldno) {
    CheckSpecialCharacter(uldno);
    var ValidChars = "0123456789.";
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";
    var IsNumber = true;
    var Char;

    var getULDNo = uldno; //document.getElementById(txtULDNumber).value;
    var getlength = getULDNo.length;

    if ((getlength > 0) && (document.activeElement.getAttribute('id') != 'ext1')) {
        if (getlength == 4) {
            var firstChar = getULDNo.charAt(0);
            var string = getULDNo.substr(1, 3);

            for (var i = 0; i < getlength; i++) {
                if (iChars.indexOf(getULDNo.charAt(i)) != -1) {
                    $.alert("Special characters not allowed");
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    return false;
                }
            }

            for (i = 0; i < string.length && IsNumber == true; i++) {
                Char = string.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    $.alert('Last three character should be numeric  \n if ULD no is 4 digits');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    IsNumber = false;
                }
            }

        } else if (getlength == 5) {
            var string = getULDNo.substr(1, 4);

            for (var i = 0; i < getlength; i++) {
                if (iChars.indexOf(getULDNo.charAt(i)) != -1) {
                    $.alert("Special characters not allowed.");
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    return false;
                }
            }

            for (i = 0; i < string.length && IsNumber == true; i++) {
                Char = string.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    $.alert('Last four character should be numeric  \n if ULD no is 5 digits');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    IsNumber = false;
                }
            }
        } else {
            $.alert('Please Enter minimum four and maximum five character');
            $('#txtULDNumber').val('');
            $('#txtULDNumber').focus();
            return false;
        }
    }
}

function CheckSpecialCharacter(uldno) {

    var getUldno = $('#txtULDNumber').val();
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";

    for (var i = 0; i < getUldno.length; i++) {
        if (iChars.indexOf(getUldno.charAt(i)) != -1) {
            $.alert("Your string has special characters. \nThese are not allowed.");
            document.getElementById(txtULDNumber).value = "";
            document.getElementById(txtULDNumber).focus();
            return false;
        }
    }
}

function GetOffPointForFlight() {

    $('#ddlOffPoint').empty();
    //$('#ddlContour').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlContour');

    $('#ddlULD').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlULD');


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    if (FlightPrefix == "" || FlightNo == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if (FlightDate == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    var _ULDNo;
    var _Type;
    if (document.getElementById('rdoULD').checked) {
        _Type = 'U';
        _ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        _Type = 'T';
        _ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';


    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><ULDTYPE>' + _Type + '</ULDTYPE></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetExportFlightDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                console.log('unit get')
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();

                    if (status == 'E') {
                        $.alert($(this).find('StrMessage').text());
                    }
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                $(xmlDoc).find('Table1').each(function (index) {

                    var RouteId;
                    var OffPointCity;

                    RouteId = $(this).find('RouteID').text();
                    OffPointCity = $(this).find('AirportCity').text();

                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlOffPoint');
                    //}


                    var newOption = $('<option></option>');
                    newOption.val(RouteId).text(OffPointCity);
                    newOption.appendTo('#ddlOffPoint');
                    // if (index == 0) {
                    //     GetULDs(OffPointCity);
                    // }
                });

                $(xmlDoc).find('Table2').each(function (index) {
                    var TrolleyId;
                    var TrolleyNo;

                    TrolleyId = $(this).find('TrolleyId').text();
                    TrolleyNo = $(this).find('TrolleyNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(TrolleyId).text(TrolleyNo.toUpperCase());
                    newOption.appendTo('#ddlULD');



                });

                $(xmlDoc).find('Table3').each(function (index) {

                    _FlightSeqNo = $(this).find('flightSeqNo').text();

                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}

function GetULDs(offPonit) {

    //$('#ddlULD').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlULD');

    //$('#ddlBulk').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlBulk');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    var _ULDNo;
    var _Type;
    if (document.getElementById('rdoULD').checked) {
        _Type = 'U';
        //_ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        _Type = 'T';
        //_ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint>' + offPonit + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><ULDTYPE>' + _Type + '</ULDTYPE></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetExportFlightDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                console.log('MAN');
                console.log(xmlDoc);
                $(xmlDoc).find('Table2').each(function (index) {

                    var ULDId;
                    var ULDNo;

                    ULDId = $(this).find('ULDSeqNo').text();
                    ULDNo = $(this).find('ULDNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULDNo);
                    newOption.appendTo('#ddlULD');
                });

                // $(xmlDoc).find('Table5').each(function (index) {

                //     var TrolleyId;
                //     var TrolleyNo;

                //     TrolleyId = $(this).find('TrolleySeqNo').text();
                //     TrolleyNo = $(this).find('TrolleyNo').text();

                //     var newOption = $('<option></option>');
                //     newOption.val(TrolleyId).text(TrolleyNo);
                //     newOption.appendTo('#ddlBulk');
                // });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}

function AddULD() {

    if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    if (document.getElementById('rdoULD').checked) {
        if ($('#txtULDType').val() == "" || $('#txtULDNumber').val() == "") {
            errmsg = "Please enter ULD Type and No.";
            $.alert(errmsg);
            return;
        }
        if ($('#txtOwner').val() == "") {
            errmsg = "Please enter ULD Owner";
            $.alert(errmsg);
            return;
        }
    }
    if (document.getElementById('rdoBulk').checked) {
        if ($('#txtBulkType').val() == "" || $('#txtBulkNumber').val() == "") {
            errmsg = "Please enter Bulk Type and No.";
            $.alert(errmsg);
            return;
        }
    }

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        errmsg = "No offpoint selected";
        $.alert(errmsg);
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '';
    var servicename;

    if (document.getElementById('rdoULD').checked) {

        inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtULDType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtULDNumber').val() + '</ULDNo><ULDOwner>' + $('#txtOwner').val().toUpperCase() + '</ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';
        servicename = 'UnitizationSaveULDDetailsV';
    }
    if (document.getElementById('rdoBulk').checked) {

        inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtBulkType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtBulkNumber').val() + '</ULDNo><ULDOwner></ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>'
        servicename = 'UnitizationSaveTrolleyDetailsV';
    }




    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + servicename,
            data: JSON.stringify({
                'InputXML': inputXML,
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {
                        $.alert($(this).find('StrMessage').text());
                    }
                });

                GetULDs($('#ddlOffPoint').find('option:selected').text());

                $('#txtULDType').val('');
                $('#txtULDNumber').val('');
                $('#txtOwner').val('');

                $('#txtBulkType').val('');
                $('#txtBulkNumber').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function CloseULD() {

    //if (document.getElementById('rdoBulk').checked) {

    //    CloseBulk();
    //    return;
    //}

    if (document.getElementById('rdoULD').checked) {

        if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
            errmsg = "Please enter valid Flight No.";
            $.alert(errmsg);
            return;
        }
    }


    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    //if ($('#txtOwner').val() == "") {
    //    errmsg = "Please enter ULD Owner";
    //    $.alert(errmsg);
    //    return;
    //}

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        errmsg = "No offpoint selected";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlULD').find('option:selected').text() == "Select" || $('#ddlULD').find('option:selected').text() == "") {
        errmsg = "Please select ULD";
        $.alert(errmsg);
        return;
    }
    var _ULDNo;
    var _Type;
    if (document.getElementById('rdoULD').checked) {
        _Type = 'U';
        _ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        _Type = 'T';
        _ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    //var uldType = $('#ddlULD').find('option:selected').text().substring(0, 3);
    //var tempSTR = $('#ddlULD').find('option:selected').text().substring(3);
    //var uldOwner = tempSTR.substring(tempSTR.length - 2)
    //var uldNumber = (tempSTR.slice(0, -2)).trim();

    // var contourCode;
    // if ($('#ddlContour').find('option:selected').val() == 'Select')
    //     contourCode = '';
    // else
    //     contourCode = $('#ddlContour').find('option:selected').val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
  
    var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><TrolleySeqNo>' + $('#ddlULD').find('option:selected').val() + '</TrolleySeqNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><ULDTYPE>' + _Type + '</ULDTYPE> </Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UnitizationCloseULDTrolleyV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });

                GetOffPointForFlight();

                $('#txtGrossWt').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function CloseBulk() {

    if ($('#ddlBulk').find('option:selected').text() == "Select" || $('#ddlBulk').find('option:selected').text() == "") {
        errmsg = "Please select Bulk";
        $.alert(errmsg);
        return;
    }


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "EXPTrolleyClose",
            data: JSON.stringify({
                'ULDSequenceNo': $('#ddlBulk').find('option:selected').val(),
                'AirportCity': AirportCity,
                'ScaleWeight': $('#txtGrossWt').val(),
                'CompanyCode': window.localStorage.getItem("companyCode"),
                'strUserID': window.localStorage.getItem("UserID"),
                'FlightSeqNumber': FlightSeqNo,
                'routepoint': $('#ddlOffPoint').find('option:selected').text(),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {

                $('#txtGrossWt').val('');

                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });

                GetOffPointForFlight();

                $('#txtGrossWt').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function SaveDateTimeForULD() {

    if ($('#ddlOffPoint').find('option:selected').text() == "Select") {
        errmsg = "Please select ULD";
        $.alert(errmsg);
        return;
    }

    if ($('#txtStartDateTime').val() == "" || $('#txtStartTimeFrom').val() == "" || $('#txtStartTimeTo').val() == "") {
        errmsg = "Please enter Start Date/hh/mm.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtEndDateTime').val() == "" || $('#txtEndTimeFrom').val() == "" || $('#txtEndTimeTo').val() == "") {
        errmsg = "Please enter End Date/hh/mm.";
        $.alert(errmsg);
        return;
    }

    if ((new Date($('#txtStartDateTime').val()).getTime() > new Date($('#txtEndDateTime').val()).getTime())) {
        errmsg = "End date cannot be less start date.";
        $.alert(errmsg);
        return;
    }

    if ((new Date($('#txtStartDateTime').val()).getTime() == new Date($('#txtEndDateTime').val()).getTime())) {
        if (Number($('#txtStartTimeFrom').val()) > Number($('#txtEndTimeFrom').val())) {
            errmsg = "End time cannot be less start time.";
            $.alert(errmsg);
            return;
        }
    }

    if ($('#txtStartDateTime').val().length > 0) {
        var formattedDate = new Date($('#txtStartDateTime').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var StartDate = m + "/" + d + "/" + y;
    }

    if ($('#txtEndDateTime').val().length > 0) {
        var formattedDate = new Date($('#txtEndDateTime').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var EndDate = m + "/" + d + "/" + y;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><BuiltUpStart>' + StartDate + '</BuiltUpStart><BuiltUpStartTime>' + $('#txtStartTimeFrom').val() + ':' + $('#txtStartTimeTo').val() + '</BuiltUpStartTime><BuiltUpEnd>' + EndDate + '</BuiltUpEnd><BuiltUpEndTime>' + $('#txtEndTimeFrom').val() + ':' + $('#txtEndTimeTo').val() + '</BuiltUpEndTime><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UnitizationBuiltUpULD",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function ShowAddAWBGrid() {

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    if (FlightPrefix == "" || FlightNo == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if (FlightDate == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    if (document.getElementById('rdoULD').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'SELECT' || $("#ddlULD").val() == null) {
            errmsg = "Please select ULD";
            $.alert(errmsg);
            return;
        }
        $('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    }

    if (document.getElementById('rdoBulk').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'SELECT' || $("#ddlULD").val() == null) {
            errmsg = "Please select Bulk";
            $.alert(errmsg);
            return;
        }
        $('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    }



    $('#txtFlightPrefix').attr("disabled", "disabled");
    $('#txtFlightNo').attr("disabled", "disabled");
    $('#txtFlightDate').attr("disabled", "disabled");
    $('#ddlOffPoint').attr("disabled", "disabled");
    $('#btnGet').attr("disabled", "disabled");

    //$('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    $("#divULDDetails").hide();
    $("#divAddAWBDetails").show();
    $("#divGatePass").hide();

    GetAWBDetailsForULD();

}

function ShowGatePassGrid() {

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    if (FlightPrefix == "" || FlightNo == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if (FlightDate == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlOffPoint').find('option:selected').text() == "Select") {
        errmsg = "No offpoint selected";
        $.alert(errmsg);
        return true;
    }



    $('#txtFlightPrefix').attr("disabled", "disabled");
    $('#txtFlightNo').attr("disabled", "disabled");
    $('#txtFlightDate').attr("disabled", "disabled");
    $('#ddlOffPoint').attr("disabled", "disabled");
    $('#btnGet').attr("disabled", "disabled");

    //$('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    $("#divULDDetails").hide();
    $("#divAddAWBDetails").hide();
    $("#divGatePass").show();

    GetGatePassDetailsForULD();

}


//$('#container')
//                        .append(`<input class="Checkbox" type="checkbox" id="${Value}" name="ULDNumber" value="${Value}">`)
//                        .append(`<label style="padding-left:10px;" for="${Value}">${Text}</label></div>`)
//                        .append(`<br>`);

function clearSHC() {
    $('#TextBoxDiv').empty();
}
function ShowULDGrid() {

    $('#txtFlightPrefix').removeAttr("disabled");
    $('#txtFlightNo').removeAttr("disabled");
    $('#txtFlightDate').removeAttr("disabled");
    $('#ddlOffPoint').removeAttr("disabled");
    $('#btnGet').removeAttr("disabled");

    $("#divAddTestLocationGatePass").hide();
    $("#divAddAWBDetails").hide();
    $("#divULDDetails").show();

    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#ddlShipmentNo').empty();
    $('#txtPackages').val('');

    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');

    $('#txtWeight').val('');
    $('#txtVolume').val('');

    $('#divAddTestLocation').empty();
    $('#divBulk').empty();
    $('#divBulk').hide();
   //$('#TextBoxDiv').hide();
    html = '';
}

function GetShipmentInfoForAWB() {

    var MAWBPrefix = $('#txtAWBNo').val().substr(0, 3);
    var MAWBNo = $('#txtAWBNo').val().substr(3, 11);

    if (MAWBNo == '') {
        return;
    }

    if ($('#txtAWBNo').val().length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        $('#txtPackages').val('');

        return;
    }

    $('#txtPackages').val('');
    $('#txtWeight').val('');
    $('#txtVolume').val('');
    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');
    $('#ddlShipmentNo').empty();

    totalPkgs = '';
    totalWeight = '';
    totalVol = '';

    prorataWtParam = '';
    prorataVolParam = '';

    var getULDNo;

    if (MAWBNo == '')
        return;

    if (MAWBNo != '') {
        if (MAWBPrefix.length != '3' || MAWBNo.length != '8') {
            errmsg = "Please enter valid AWB No.";
            $.alert(errmsg);
            return;
        }
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var inputXML = '<Root><flightSeqNo>' + _FlightSeqNo + '</flightSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><AWBPrefix>' + MAWBPrefix + '</AWBPrefix><AWBNo>' + MAWBNo + '</AWBNo></Root>';

    var inputXML = '<Root><flightSeqNo>' + _FlightSeqNo + '</flightSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><AWBPrefix>' + MAWBPrefix + '</AWBPrefix><AWBNo>' + MAWBNo + '</AWBNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            //url: GHAExportFlightserviceURL + "UnitizationPendingAWBDetails",
            url: GHAserviceURL + "UnitizationGetAWBDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                responsee = response.d;

                strShipmentInfo = responsee;

                var xmlDoc = $.parseXML(responsee);

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() != 'S') {
                        $.alert($(this).find('StrMessage').text());
                        $('#txtPackages').val('');
                        $('#txtAWBNo').val('');
                        $('#TextBoxDiv').empty();
                        return;
                    } else {
                        $('#txtUnitizedPkgs').val($(this).find('ManifestNOP').text());
                        $('#txtTotalPkgs').val($(this).find('TotNOP').text());

                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                    var newOption = $('<option></option>');
                    newOption.val($(this).find('EXPSHIPROWID').text()).text($(this).find('RNo').text());
                    newOption.appendTo('#ddlShipmentNo');

                    if (index == 0) {
                        //$('#txtPackages').val($(this).find('NOP').text());
                        //$('#txtWeight').val($(this).find('WEIGHT_KG').text());
                        //$('#txtVolume').val($(this).find('VOLUME').text());

                        $('#txtUnitizedPkgs').val($(this).find('ManifestNOP').text());
                        $('#txtTotalPkgs').val($(this).find('TotNOP').text());
                        AWBRowId = $(this).find('AWBRowId').text();
                        AWBNo = $(this).find('AWBNo').text();
                        SHCAll = $(this).find('SHCAll').text();
                        SHCSpanHtml(SHCAll);
                        //totalPkgs = $(this).find('TotNOP').text();
                        //totalWeight = $(this).find('ManWt').text();
                        ////totalVol = $(this).find('VOLUME').text();

                        //prorataWtParam = Number(totalWeight) / Number(totalPkgs);
                        //prorataVolParam = Number(totalVol) / Number(totalPkgs);
                    }
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}
function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}
function ChangeEWRInfo(selectedShpmnt) {

    var xmlDoc = $.parseXML(strShipmentInfo);

    $(xmlDoc).find('Table1').each(function (index) {

        if ($(this).find('RNo').text() == selectedShpmnt) {
            $('#txtUnitizedPkgs').val($(this).find('ManNOP').text());
            $('#txtTotalPkgs').val($(this).find('NOP').text());

            totalPkgs = $(this).find('NOP').text();
            totalWeight = $(this).find('ManWt').text();
            //totalVol = $(this).find('VOLUME').text();

            prorataWtParam = Number(totalWeight) / Number(totalPkgs);
        }
    });

}

function CalculateProrataWtVol() {

    var newWt = Number($('#txtPackages').val()) * prorataWtParam;
    var newVol = Number($('#txtPackages').val()) * prorataVolParam;

    $('#txtWeight').val(newWt.toFixed(3));
    $('#txtVolume').val(newVol.toFixed(3));
}

function SaveAWBforULDDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if (document.getElementById('rdoULD').checked) {
        Type = 'U';
        ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        Type = 'T';
        ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    if (document.getElementById('rdoULD').checked) {
        if ($('#txtULDType').val() == "" || $('#txtULDNumber').val() == "") {
            errmsg = "Please enter ULD Type and No.";
            $.alert(errmsg);
            return;
        }
        if ($('#txtOwner').val() == "") {
            errmsg = "Please enter ULD Owner";
            $.alert(errmsg);
            return;
        }
    }
    if (document.getElementById('rdoBulk').checked) {
        if ($('#txtBulkType').val() == '') {
            errmsg = "Please enter Bulk Type.";
            $.alert(errmsg);
            return;
        }
    }

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        errmsg = "No offpoint selected";
        $.alert(errmsg);
        return;
    }


    if (document.getElementById('rdoULD').checked) {

        var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDType>' + $("#txtULDType").val().toUpperCase() + '</ULDType><ULDNo>' + $("#txtULDNumber").val() + '</ULDNo><ULDOwner>' + $("#txtOwner").val().toUpperCase() + '</ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><UType>' + Type + '</UType><TrolleyNo></TrolleyNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';
    }
    if (document.getElementById('rdoBulk').checked) {

        var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDType></ULDType><ULDNo></ULDNo><ULDOwner></ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><UType>' + Type + '</UType><TrolleyNo>' + $("#txtBulkType").val() + '</TrolleyNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UnitizationSaveULDDetailsV",
            //data: JSON.stringify({
            //    'strFlightNo': $('#txtFlightPrefix').val() + $('#txtFlightNo').val(), 'strFlightDate': flightDate, 'strULDNo': ULDNo,
            //    'strAWBNo': AWBNo, 'strShipmentNo': ShipmentNo, 'strPkgs': Packages,
            //    'strGrossWt': GrossWt, 'strWtUnit': GrossWtUnit, 'strVolume': Volume,
            //    'strAirportCity': AirportCity, 'strUserID': window.localStorage.getItem("UserID"), 'CompanyCode': window.localStorage.getItem("companyCode"), 'OffPoint': $('#ddlOffPoint').find('option:selected').text(), 'Type': Type,
            //}),
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $('#txtBulkType').val('');
                $('#txtULDType').val('');
                $('#txtULDNumber').val('');
                $('#txtOwner').val('');

                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();
                    // $.alert($(this).find('StrMessage').text());
                    if (status != 'E') {
                        $('#txtAWBPrefix').val('');
                        $('#txtAWBNo').val('');
                        $('#txtUnitizedPkgs').val('');
                        $('#txtTotalPkgs').val('');
                        $('#txtPackages').val('');
                        $('#ddlShipmentNo').empty();

                    }

                    //if (confirm($(this).find('StrMessage').text())) {
                    //    $('#txtAWBNo').focus();
                    //}

                    if (!alert($(this).find('StrMessage').text())) {
                        $('#txtAWBNo').focus();
                    }

                });

                //GetShipmentInfoForAWB($('#txtAWBNo').val());


                //$('#txtVolume').val('');
                //window.location.reload();

                GetOffPointForFlight();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}



function UnitizationSaveAWBDetailsV() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if (document.getElementById('rdoULD').checked) {
        Type = 'U';
        ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        Type = 'T';
        ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }
    var MAWBNo = $('#txtAWBNo').val();
    if (MAWBNo == '') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtPackages').val() == '') {
        errmsg = "Please enter Packages.";
        $.alert(errmsg);
        return;
    }

    //if (document.getElementById('rdoULD').checked) {
    //    if ($('#txtULDType').val() == "" || $('#txtULDNumber').val() == "") {
    //        errmsg = "Please enter ULD Type and No.";
    //        $.alert(errmsg);
    //        return;
    //    }
    //    if ($('#txtOwner').val() == "") {
    //        errmsg = "Please enter ULD Owner";
    //        $.alert(errmsg);
    //        return;
    //    }
    //}
    //if (document.getElementById('rdoBulk').checked) {
    //    if ($('#txtBulkType').val() == '') {
    //        errmsg = "Please enter Bulk Type.";
    //        $.alert(errmsg);
    //        return;
    //    }
    //}

    //if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
    //    errmsg = "No offpoint selected";
    //    $.alert(errmsg);
    //    return;
    //}


    //if (document.getElementById('rdoULD').checked) {


    //}
    //if (document.getElementById('rdoBulk').checked) {

    //    var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDType></ULDType><ULDNo></ULDNo><ULDOwner></ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><UType>' + Type + '</UType><TrolleyNo>' + $("#txtBulkType").val() + '</TrolleyNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';
    //}

    // var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserID>' + UserId + '</UserID><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><NOP>' + $("#txtPackages").val() + '</NOP></Root>';

    var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserID>' + UserId + '</UserID><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><AWBRowId>' + AWBRowId + '</AWBRowId><NOP>' + $("#txtPackages").val() + '</NOP><ULDType>' + Type + '</ULDType></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UnitizationSaveAWBDetailsV",
            //data: JSON.stringify({
            //    'strFlightNo': $('#txtFlightPrefix').val() + $('#txtFlightNo').val(), 'strFlightDate': flightDate, 'strULDNo': ULDNo,
            //    'strAWBNo': AWBNo, 'strShipmentNo': ShipmentNo, 'strPkgs': Packages,
            //    'strGrossWt': GrossWt, 'strWtUnit': GrossWtUnit, 'strVolume': Volume,
            //    'strAirportCity': AirportCity, 'strUserID': window.localStorage.getItem("UserID"), 'CompanyCode': window.localStorage.getItem("companyCode"), 'OffPoint': $('#ddlOffPoint').find('option:selected').text(), 'Type': Type,
            //}),
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();
                    // $.alert($(this).find('StrMessage').text());
                    if (status != 'E') {
                        $('#txtAWBPrefix').val('');
                        $('#txtAWBNo').val('');
                        $('#txtUnitizedPkgs').val('');
                        $('#txtTotalPkgs').val('');
                        $('#txtPackages').val('');
                        $('#ddlShipmentNo').empty();
                        $('#TextBoxDiv').empty();

                    }

                    //if (confirm($(this).find('StrMessage').text())) {
                    //    $('#txtAWBNo').focus();
                    //}

                    if (!alert($(this).find('StrMessage').text())) {
                        GetAWBDetailsForULD();
                        $('#txtAWBNo').focus();
                    }

                });

                //GetShipmentInfoForAWB($('#txtAWBNo').val());


                //$('#txtVolume').val('');
                //window.location.reload();

                // GetOffPointForFlight();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function UnitizationCreateGPV() {

    var checkboxs = document.getElementsByName("ULDNumber");

    var okay = false;
    for (var i = 0, l = checkboxs.length; i < l; i++) {
        if (checkboxs[i].checked) {
            okay = true;
            break;
        }
    }
    if (okay) {

    }
    else {
        alert("You must check at least one checkbox.");
        return;
    }

    //for (var i = 0, l = checkboxs.length; i < l; i++) {
    //    if (checkboxs[i].checked) {

    //        break;
    //    } else {
    //        alert("You must check at least one checkbox.");
    //        return;
    //    }
    //}


    AllULDValue = $('.Checkbox:checked').map(function () {
        return this.value;
    }).get().join(',');

    console.log(AllULDValue);

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var inputXML = '<Root><FlightSeqNo>' + _FlightSeqNo + '</FlightSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><ULDSeqNo>' + AllULDValue + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';

    //var inputXML = AllULDValue;


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UnitizationCreateGPV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });

                //$(xmlDoc).find('Table').each(function () {

                //    if ($(this).find('Status').text() == 'S')
                //        GetGPStatus();
                //});
                // GetGPStatus();
                GetGatePassDetailsForULD();

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function GetAWBDetailsForULD() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (document.getElementById('rdoULD').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'Select') {
            return false;
        }
    }

    //if (document.getElementById('rdoBulk').checked) {
    //    if ($('#ddlBulk').find('option:selected').text() == 'Select') {
    //        return false;
    //    }
    //}

    var ULDid;
    var type;

    if (document.getElementById('rdoULD').checked) {
        ULDid = $("#ddlULD option:selected").val();
        type = 'U';
    }

    if (document.getElementById('rdoBulk').checked) {
        ULDid = $("#ddlBulk option:selected").val();
        type = 'T';
    }

    //var inputXML = '<Root><flightSeqNo>' + _FlightSeqNo + '</flightSeqNo><ULDSeqNo>' + ULDid + '</ULDSeqNo><Offpoint>' + $("#ddlOffPoint option:selected").text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNO + '</AWBNo></Root>';

    //SelectedHawbId = $("#ddlHAWB option:selected").val();      

    //var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
   
    var inputXML = '<Root><flightSeqNo>' + _FlightSeqNo + '</flightSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "UnitizationGetULDDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                var totalPkgs;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>AWB</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Packages</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        //var outMsg = $(this).find('Status').text();

                        //if (outMsg == 'E') {
                        //    $.alert($(this).find('StrMessage').text());
                        //    return;
                        //}

                        var Awb;
                        var Pkgs;

                        Awb = $(this).find('AWBNo').text().toUpperCase();
                        Pkgs = $(this).find('Pkgs').text();

                        AddTableLocation(Awb, Pkgs);

                    });

                    $(xmlDoc).find('Table2').each(function (index) {

                        totalPkgs = $(this).find('TotalManifestPkgs').text();

                        html += "<tr>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>TOTAL</td>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>" + totalPkgs + "</td>";
                        html += "</tr>";


                    });

                    html += "</tbody></table>";
                  
                    if (totalPkgs > Number(0))
                        $('#divAddTestLocation').append(html);
                    else {
                        $('#divAddTestLocation').empty();
                        html = '';
                    }
                } else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}



function GetGatePassDetailsForULD() {

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var Type;
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (document.getElementById('rdoULD').checked) {
        Type = 'U';
        // ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        Type = 'T';
        //  ULDNo = $('#ddlBulk').find('option:selected').val();
    }


    $("#tdTrollyList").empty();
    $("#container").empty();

    var _ULDNo;
    var _Type;
    if (document.getElementById('rdoULD').checked) {
        _Type = 'U';
        //_ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        _Type = 'T';
        //_ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><ULDTYPE>' + _Type + '</ULDTYPE></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetExportFlightDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                var totalPkgs;

                strXmlStore = str;
                var xmlDoc = $.parseXML(str);

                var IsGPGenerated;
                var GatepassNo;
                var isTblBind = '0';
                $(xmlDoc).find('Table3').each(function (index) {

                    flightSeqNo = $(this).find('flightSeqNo').text();
                    IsGPGenerated = $(this).find('IsGPGenerated').text();
                    GatepassNo = $(this).find('GatepassNo').text();
                    isTblBind = '1'

                    if (IsGPGenerated == 'Y') {
                        $("#divAddTestLocationGatePass").show();
                        $("#tdGatepass").text(GatepassNo);
                    }
                });

                $(xmlDoc).find('Table2').each(function (index) {

                    TrolleyId = $(this).find('TrolleyId').text();
                    TrolleyNo = $(this).find('TrolleyNo').text();
                    Status = $(this).find('Status').text();

                    if (IsGPGenerated == 'N') {
                        if (Status == 'C') {
                            $("#divBulk").show();
                            $('#container')
                                .append(`<input class="Checkbox" type="checkbox" id="${TrolleyId}" name="ULDNumber" value="${TrolleyId}">`)
                                .append(`<label style="padding-left:10px;" for="${TrolleyId}">${TrolleyNo.toUpperCase()}</label></div>`)
                                .append(`<br>`);
                        }

                    }

                    $("#divAddTestLocationGatePass").show();
                    if (TrolleyId > '-1') {
                        if (IsGPGenerated == 'Y') {
                            if (Status == 'C') {
                                html = '<span>' + TrolleyNo.toUpperCase() + '</span></br>';
                                $("#tdTrollyList").append(html);
                                $("#tblNewsForGatePass").show();

                            }
                        }

                    }

                });

                if (str != null && str != "") {

                    $('#divAddTestLocationGatePass').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Gate Pass No.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>ULD No./Trolley No.</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    $(xmlDoc).find('Table3').each(function (index) {

                        //var outMsg = $(this).find('Status').text();

                        //if (outMsg == 'E') {
                        //    $.alert($(this).find('StrMessage').text());
                        //    return;
                        //}

                        //var Awb;
                        //var Pkgs;



                        GatepassNo = $(this).find('GatepassNo').text();
                        ULDCount = $(this).find('ULDCount').text();

                        AddTableLocationGatePass(GatepassNo, ULDCount);

                    });

                    $(xmlDoc).find('Table1').each(function (index) {

                        totalPkgs = $(this).find('Pkgs').text();

                        html += "<tr>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>TOTAL</td>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>" + totalPkgs + "</td>";
                        html += "</tr>";


                    });

                    html += "</tbody></table>";
                
                    if (IsGPGenerated == 'Y')
                        $('#divAddTestLocationGatePass').append(html);
                    else {
                        $('#divAddTestLocationGatePass').empty();
                        html = '';
                    }
                } else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}

function AddTableLocation(AWB, Pkgs) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWB + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Pkgs + "</td>";
    html += "</tr>";

}

function AddTableLocationGatePass(GatepassNo, ULDCount) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + GatepassNo + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + ULDCount + "</td>";
    html += "</tr>";

}





function clearAllULDDetails() {

    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#ddlOffPoint').empty();
    $('#txtULDType').val('');
    $('#txtULDNumber').val('');
    $('#txtOwner').val('');
    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#txtStartDateTime').val('');
    $('#txtStartTimeFrom').val('');
    $('#txtStartTimeTo').val('');
    $('#txtEndDateTime').val('');
    $('#txtEndTimeFrom').val('');
    $('#txtEndTimeTo').val('');
    $('#txtBulkType').val('');
    $('#txtBulkNumber').val('');
    $('#txtGrossWt').val('');
    $('#txtFlightPrefix').focus();
}

function clearAWBDetails() {
    
    //$('#txtULDNo').val('');
    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#ddlShipmentNo').empty();
    $('#TextBoxDiv').empty();
    $('#txtPackages').val('');
    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');
    $('#txtAWBNo').focus();
    //$('#txtTotalPkgs').val('');


}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function alertDismissed() { }