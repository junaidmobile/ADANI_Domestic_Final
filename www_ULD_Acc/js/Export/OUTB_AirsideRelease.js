//document.addEventListener("deviceready", GetCommodityList, false);

var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserId = window.localStorage.getItem("UserID");
var FlightSeqNo;
var strUldToRelease;
var strBulkToRelease;
var AllULDValue;
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

    //$('#ddlBulk').multiselect({
    //    enableClickableOption: true
    //});

    if (window.localStorage.getItem("RoleExpAirsideRelease") == '0') {
        // window.location.href = 'EXP_Dashboard.html';
    }

   // $("#chkManual").attr('checked', 'checked');

    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1; // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var date = 'O' + y.toString() + m.toString() + d.toString();
    // $('#txtGPNo1').val(date);

    strUldToRelease = '';
    strBulkToRelease = '';

});

function GetGPStatus() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    $('#container').empty();
    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#divAddTestLocation').empty();
    html = '';
    strUldToRelease = '';
    strBulkToRelease = '';
    $('#txtReleasedULD').val('');
    $('#txtPendingULD').val('');
    $('#txtReleasedAWB').val('');
    $('#txtPendingAWB').val('');

    if ($('#txtGPNo1').val() == "") {
        // errmsg = "Please enter GP No.";
       
        // $.alert(errmsg);
        return;
    }

    //if ($('#txtGPNo1').val().length != '13') {
    //    // errmsg = "Please enter valid GP No.";
      
    //    // $.alert(errmsg);
    //    return;
    //}

    // var inputXML = '<Root><GatePassNo>' + $('#txtGPNo1').val() + '</GatePassNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><AirportCity>' + AirportCity + '</AirportCity><UserID>' + UserId + '</UserID><GatePassNo>' + $('#txtGPNo1').val() + '</GatePassNo></Root>';

 

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetExportAirsideReleaseV",
            data: JSON.stringify({ 'InputXML': inputXML, 'strUserId': UserId, 'strVal': deviceUUID }),
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
                console.log(xmlDoc)
                var isTbale = '0';
                $(xmlDoc).find('Table').each(function () {
                    if ($(this).find('Status').text() == 'E') {
                        $.alert($(this).find('StrMessage').text());

                    } else {
                        isTbale = '1';
                    }

                    $("#divGatePass").show();
                    Value = $(this).find('Value').text();
                    Text = $(this).find('Text').text();

                    //var newOption = $('<option></option>');
                    //newOption.val(Value).text(Text);
                    //newOption.appendTo('#ddlBulk');
                    $('#container')
                        .append(`<input class="Checkbox" type="checkbox" id="${Value}" name="ULDNumber" value="${Value}">`)
                        .append(`<label style="padding-left:10px;" for="${Value}">${Text.toUpperCase()}</label></div>`)
                        .append(`<br>`);
                });

                if (isTbale != '1') {
                    $("#divGatePass").hide();
                    $('#container').empty();
                }
                $(xmlDoc).find('Table1').each(function () {

                    $('#txtReleasedULD').val($(this).find('ULDReleased').text());
                    $('#txtPendingULD').val($(this).find('ULDPending').text());
                    $('#txtReleasedAWB').val($(this).find('TrolleyReleased').text());
                    $('#txtPendingAWB').val($(this).find('TrolleyPending').text());

                });

                $(xmlDoc).find('Table2').each(function () {


                    //$('#txtReleasedULD').val($(this).find('ULDCount').text());
                    //$('#txtPendingULD').val($(this).find('PendingULD').text());
                    //$('#txtReleasedAWB').val($(this).find('TrolleyCount').text());
                    //$('#txtPendingAWB').val($(this).find('PendingTrolley').text());
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

function GetULDsToRelease() {

    $('#ddlULD').empty();
    $('#divAddTestLocation').empty();
    html = '';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "UnReleaseULDDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML, 'strUserId': UserId,
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

                strUldToRelease = response;

                $(xmlDoc).find('Table1').each(function (index) {

                    var ULDId;
                    var ULDNo;
                    var FltSeqNo;
                    var FltOffPoint;

                    ULDId = $(this).find('ULDSeqNo').text();
                    ULDNo = $(this).find('ULD').text();
                    FltSeqNo = $(this).find('FlightSeqNo').text();
                    FltOffPoint = $(this).find('RoutePoint').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULDNo);
                    newOption.appendTo('#ddlULD');


                    if (index == 0) {

                        GetAWBDetailsForULD(ULDId, FltSeqNo, FltOffPoint, 'U')
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

function GetBULKToRelease() {

    $('#ddlBulk').empty();
    $('#divAddTestLocation').empty();
    html = '';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "UnReleaseULDDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML, 'strUserId': UserId,
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

                strBulkToRelease = response;

                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table2').each(function (index) {

                    var BulkId;
                    var BulkNo;
                    var FltSeqNo;
                    var FltOffPoint;

                    BulkId = $(this).find('TrolleySeqNo').text();
                    BulkNo = $(this).find('Trolley').text();
                    FltSeqNo = $(this).find('FlightSeqNo').text();
                    FltOffPoint = $(this).find('RoutePoint').text();

                    var newOption = $('<option></option>');
                    newOption.val(BulkId).text(BulkNo);
                    newOption.appendTo('#ddlBulk');

                    if (index == 0) {

                        GetAWBDetailsForULD(BulkId, FltSeqNo, FltOffPoint, 'T')
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

function SaveExportAirsideRelease() {
    debugger
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
    }).get().join('-');

    console.log(AllULDValue);

    if ($('#txtGPNo1').val() == "") {
        errmsg = "Please enter GP No.";
        $.alert(errmsg);
        return;
    }

    //if ($('#txtGPNo1').val().length != '13') {
    //    errmsg = "Please enter valid GP No.";
    //    $.alert(errmsg);
    //    return;
    //}


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var inputXML = '<Root><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    //var inputXML = AllULDValue;


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "SaveExportAirsideReleaseV",
            data: JSON.stringify({
                'InputXML': AllULDValue,
                'strAirportCity': AirportCity,
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

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() == 'S')
                        GetGPStatus();
                });
                // GetGPStatus();

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function ReleaseULDBulk(flag) {

    if (flag == 'U') {
        if ($('#ddlULD').find('option:selected').text() == "" || $('#ddlULD').find('option:selected').text() == "Select") {
            errmsg = "ULD not selected";
            $.alert(errmsg);
            return;
        }
    }

    if (flag == 'T') {
        if ($('#ddlBulk').find('option:selected').text() == "" || $('#ddlBulk').find('option:selected').text() == "Select") {
            errmsg = "Bulk not selected";
            $.alert(errmsg);
            return;
        }
    }

    if ($('#txtGPNo1').val() == "") {
        errmsg = "Please enter GP No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtGPNo1').val().length != '13') {
        errmsg = "Please enter valid GP No.";
        $.alert(errmsg);
        return;
    }

    if (flag == 'U')
        var ULDseqNo = $('#ddlULD').find('option:selected').val();
    if (flag == 'T')
        var ULDseqNo = $('#ddlBulk').find('option:selected').val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var inputXML = '<Root><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><GPNo>' + $('#txtGPNo1').val() + '</GPNo><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ULDType>' + flag + '</ULDType><UserId>' + UserId + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UpdateULDReleaseV",
            data: JSON.stringify({
                'InputXML': inputXML, 'strUserId': UserId,
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

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() == 'S')
                        GetGPStatus();
                });

                if (flag == 'U')
                    GetULDsToRelease();
                if (flag == 'T')
                    GetBULKToRelease();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function ShowReleaseULDGrid() {

    if ($('#txtGPNo1').val() == "") {
        errmsg = "Please enter GP No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtGPNo1').val().length != '13') {
        errmsg = "Please enter valid GP No.";
        $.alert(errmsg);
        return;
    }

    GetULDsToRelease();

    $("#divReleaseBulk").hide();
    $("#divReleaseULD").show();

}

function ShowReleaseBulkGrid() {

    if ($('#txtGPNo1').val() == "") {
        errmsg = "Please enter GP No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtGPNo1').val().length != '13') {
        errmsg = "Please enter valid GP No.";
        $.alert(errmsg);
        return;
    }

    GetBULKToRelease();

    $("#divReleaseULD").hide();
    $("#divReleaseBulk").show();
}

function ShowTotalPkgsForAWB(AWBid) {
    $('#txtTotPkgs').val(AWBid);
    $('#txtReleasePkgs').val('');
}

function GetAWBDetailsForULD(ULDId, FltSeqNo, FltOffPoint, type) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    //SelectedHawbId = $("#ddlHAWB option:selected").val();      

    //var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><FlightSeqNo>' + FltSeqNo + '</FlightSeqNo><ULDSeqNo>' + ULDId + '</ULDSeqNo><Type>' + type + '</Type><Offpoint>' + FltOffPoint + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetUnitizedShipmentDetailsV",
            data: JSON.stringify({
                'InputXML': inputXML, 'strUserId': UserId,
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
                        Pkgs = $(this).find('NOP').text();

                        AddTableLocation(Awb, Pkgs);

                    });

                    $(xmlDoc).find('Table2').each(function (index) {

                        totalPkgs = $(this).find('NOP').text();

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

function AddTableLocation(AWB, Pkgs) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWB + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Pkgs + "</td>";
    html += "</tr>";

}


function ChangeULDBulkToRelease(UldBulSeqNo, type) {

    $('#divAddTestLocation').empty();
    html = '';

    if (type == 'U') {
        var xmlDoc = $.parseXML(strUldToRelease);

        $(xmlDoc).find('Table1').each(function (index) {

            if ($(this).find('ULDSeqNo').text() == UldBulSeqNo) {

                var FltSeqNo;
                var FltOffPoint;

                FltSeqNo = $(this).find('FlightSeqNo').text();
                FltOffPoint = $(this).find('RoutePoint').text();

                GetAWBDetailsForULD(UldBulSeqNo, FltSeqNo, FltOffPoint, 'U')

            }
        });
    } else if (type == 'T') {
        var xmlDoc = $.parseXML(strBulkToRelease);

        $(xmlDoc).find('Table2').each(function (index) {

            if ($(this).find('TrolleySeqNo').text() == UldBulSeqNo) {

                var FltSeqNo;
                var FltOffPoint;

                FltSeqNo = $(this).find('FlightSeqNo').text();
                FltOffPoint = $(this).find('RoutePoint').text();

                GetAWBDetailsForULD(UldBulSeqNo, FltSeqNo, FltOffPoint, 'T')

            }
        });
    }

}


function clearAll() {

    var checkboxs = document.getElementsByName("ULDNumber");
    for (var i = 0; i < checkboxs.length; i++) {
        console.log(i)
        if (checkboxs[i].type == 'checkbox') {
            checkboxs[i].checked = false;
        }
    }
    $('#container').empty();
    $('#divBulk').hide();
    $('#txtGPNo1').val('');
    //$('#txtGPNo2').val('');
    $('#txtReleasedULD').val('');
    $('#txtPendingULD').val('');
    $('#txtReleasedAWB').val('');
    $('#txtPendingAWB').val('');
    $('#txtGPNo1').focus();
    $('#chkManual').removeAttr('checked');
    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#divAddTestLocation').empty();
    html = '';
}


function PutGPno() {
    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1; // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var date = 'O' + y.toString() + m.toString() + d.toString();
    if (document.getElementById('chkManual').checked) {
        var formattedDate = new Date();
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();
        var date = 'O' + y.toString() + m.toString() + d.toString();
      //  $('#txtGPNo1').val('');
        //$('#txtGPNo1').focus();
        $('#txtGPNo1').val(date);
        $('#txtGPNo1').focus();

    } else {
         $('#txtGPNo1').val('');
        // $('#txtGPNo1').focus();
        //clearAll();
    }

}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function alertDismissed() { }