var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserId = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var AWB_Number = localStorage.getItem('AWB_Number');
var HAWB_Number = localStorage.getItem('HAWB_Number');
var Flight_Seq_No = localStorage.getItem('Flight_Seq_No');
var remarkOfTextarea = localStorage.getItem('remarkOfTextarea',);
var increamentVal = 1;
var _xmlDocTable;
var i = 1;
var allIDs;
var checkifDamagebyID;
var AIRLINE_PREFIX;
var AWB_NUMBER;
var BOOKED_FLIGHT_SEQUENCE_NUMBER;
var SEQUENCE_NUMBER = '';
var IMPAWBROWID;
var _IMPSHIPROWID;
var IMPSHIPROWID;
var _DamageDataXML2, _ShipTotalPcsXML2, _PackagingXML3, _OuterPackingXML4, _InnerPackingXML5, _IsSufficientXML6;
var _DamageObserContainersXML7, _SpaceForMissingXML8, _SpaceForMissingXML9, _DamageRemarkedXML10, _DispositionXML11;
$(document).ready(function () {


    $("#txtScanAWBNo").keyup(function () {
        var myLength = $("#txtScanAWBNo").val().length;
        if (myLength == 11) {
            GetImportDamageFlightDetails();
        }
    });

    if (localStorage.getItem('AWB_Number') != null && localStorage.getItem('HAWB_Number') != null && localStorage.getItem('Flight_Seq_No')) {
        $("#txtAWBNo").val(localStorage.getItem('AWB_Number'));
        $("#txtScanAWBNo").val(localStorage.getItem('AWB_Number'));
        txtScanAWBNo
        GetImportDamageFlightDetails();
        //  $("#ddlHAWB").val(localStorage.getItem('HAWB_Number'));
        $("#hawbLists").blur();
    }
    $("#txtAreaRemark").val(remarkOfTextarea);

    $("#hawbLists").blur(function () {

        if ($("#hawbLists").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            dd = document.getElementById('ddlHAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                // console.log(this.text);
                if (this.text == value) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid HAWB No.";
                // $.alert(errmsg);
                $('#successMsg').text('Please scan/enter valid HAWB No.').css('color', 'red');
                return;
            }
            //  console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlHAWBNo').trigger('change');


            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });



});// JavaScript source code



function CheckEmpty() {

    if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
        $('#btnMoveDetail').removeAttr('disabled');
    } else {
        $('#btnMoveDetail').attr('disabled', 'disabled');
        return;
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
                // console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                // console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function GetImportDamageFlightDetails() {

    //if ($("#txtScanAWBNo").val() != AWB_NUMBER) {
    //    localStorage.removeItem('AWB_Number');
    //    localStorage.removeItem('HAWB_Number');
    //    localStorage.removeItem('Flight_Seq_No');
    //}

    if ($("#txtScanAWBNo").val() == '') {

        return;
    }
    $('#ddlHAWBNo').empty();
    $('#ddlFlightNo').empty();
    $('#txtAreaRemark').val('');

    if ($("#txtScanAWBNo").val().length != '11') {
        //errmsg = "Please enter valid AWB No.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter valid AWB No.").css('color', 'red');
        $('#txtScanAWBNo').val('');
        $('#txtScanAWBNo').focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }
    $('#txtAWBNo').val($("#txtScanAWBNo").val());

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    //  InputXML = '<Root><AWBNo>' + $("#txtScanAWBNo").val() + '</AWBNo><AWBId></AWBId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetImportDamageFlightDetails",
            data: JSON.stringify({
                'strAWBNo': $('#txtScanAWBNo').val(),
                'strAirportCity': AirportCity,
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');
                //  console.log(xmlDoc)
                $('#ddlHAWBNo').empty();


                //$(xmlDoc).find('Table').each(function (index) {
                //    var Status = $(this).find('Status').text();
                //    var StrMessage = $(this).find('StrMessage').text();
                //    if (Status == 'E') {
                //        /*  $.alert(StrMessage);*/
                //        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                //        $('#txtAWBNo').val('');
                //        $('#txtScanAWBNo').val('');
                //        $('#txtScanAWBNo').focus();
                //        return;
                //    } else {
                //        $('#spnErrormsg').text('');
                //    }
                //});

                $(xmlDoc).find('StatusMessage').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var Message = $(this).find('Message').text();
                    if (Status == 'E') {
                        var ori = Message.split('~');
                        var msg = ori[0];
                        var rmk = ori[1];

                        $('#spnErrormsg').text(msg).css('color', 'red');
                        $('#txtAreaRemark').val(rmk);
                        $('#txtAWBNo').val('');
                        // $('#txtScanAWBNo').val('');
                        // $('#txtScanAWBNo').focus();
                        $('#btnNextBase').attr('disabled', 'disabled');
                        return;
                    } else {
                        $('#spnErrormsg').text('');
                        $('#btnNextBase').removeAttr('disabled');
                    }
                });

                $(xmlDoc).find('Table').each(function (index) {
                    IMPAWBROWID = $(this).find('MAWBID').text();
                    imageUplaodID = $(this).find('MAWBID').text();
                });


                $(xmlDoc).find('Table1').each(function (index) {
                    FLIGHT_NUMBER_Date = $(this).find('FlightNo_Date').text();
                    BOOKED_FLIGHT_SEQUENCE_NUMBER = $(this).find('FlightSeqNo').text();
                    IMPSHIPROWID = $(this).find('IMH_ROWID').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(BOOKED_FLIGHT_SEQUENCE_NUMBER).text(FLIGHT_NUMBER_Date);
                    newOption.appendTo('#ddlFlightNo');
                    if (localStorage.getItem('AWB_Number') == $("#txtScanAWBNo").val()) {
                        if (localStorage.getItem('AWB_Number') && localStorage.getItem('Flight_Seq_No')) {

                            $('#ddlFlightNo').val(localStorage.getItem('Flight_Seq_No'))
                        }
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
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function GetImportFlightDetailsByAWBId(AWB_shiID_Mindi) {
    $('#spnErrormsg').text('');
    $('#txtAreaRemark').val('');
    //checkifDamagebyID = AWB_shiID_Mindi;
    //allIDs = AWB_shiID_Mindi.split('~');
    //_awbID = allIDs[0];
    //_shiprowid = allIDs[1];
    //_MAWBindicator = allIDs[2];
    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //   InputXML = '<Root><AWBNo>' + $("#txtScanAWBNo").val() + '</AWBNo><AWBId>' + AWB_shiID_Mindi + '</AWBId><AirportCity>' + AirportCity + '</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetImportDamageFlightDetails",
            data: JSON.stringify({
                'strAWBNo': $('#txtScanAWBNo').val(),
                'strAirportCity': AirportCity,
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
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log(xmlDoc);
                $('#ddlFlightNo').empty();
                $(xmlDoc).find('Table2').each(function (index) {

                    FLIGHT_NUMBER_Date = $(this).find('FLIGHT_NUMBER_Date').text();
                    BOOKED_FLIGHT_SEQUENCE_NUMBER = $(this).find('BOOKED_FLIGHT_SEQUENCE_NUMBER').text();
                    IMPAWBROWID = $(this).find('IMPAWBROWID').text();
                    IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(BOOKED_FLIGHT_SEQUENCE_NUMBER).text(FLIGHT_NUMBER_Date);
                    newOption.appendTo('#ddlFlightNo');
                    if (localStorage.getItem('AWB_Number') == $("#txtScanAWBNo").val()) {
                        if (localStorage.getItem('AWB_Number') && localStorage.getItem('Flight_Seq_No')) {

                            $('#ddlFlightNo').val(localStorage.getItem('Flight_Seq_No'))
                        }
                    }
                });


            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }


}


function clickOnNextButton() {
    if ($('#txtScanAWBNo').val() == '') {
        // $.alert('Please enter AWB No.');
        $('#spnErrormsg').text("Please scan / enter AWB No.").css('color', 'red');
        $('#txtScanAWBNo').focus();
        return;
    }



    if ($('#ddlFlightNo').val() == '0' || $('#ddlFlightNo').val() == null) {
        //   $.alert('Please select flight No / Date.');
        $('#spnErrormsg').text("Please select Flight No. / Date.").css('color', 'red');
        $('#ddlFlightNo').focus();
        return;
    }
    GetImportDamageRecordDetails();
    /* $('#spnErrormsg').text("");*/

}




function clearALL() {
    $('#txtScanAWBNo').val('');
    $('#txtAWBNo').val('');
    $('#txtScanAWBNo').focus();
    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();
    $('#spnErrormsg').empty();
    $('#txtLocationShow').val('');
    $('#txtAreaRemark').val('');
    $('#hawbLists').val('');

    localStorage.removeItem('AWB_Number');
    localStorage.removeItem('HAWB_Number');
    localStorage.removeItem('Flight_Seq_No');
    localStorage.removeItem('allIDs');

}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));

    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}



function GetImportDamageRecordDetails() {
    SEQUENCE_NUMBER = '';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    //var valuesOfAll = ids.split('~');

    //idAWB = valuesOfAll[0];
    //idSHI = valuesOfAll[1];
    // M_indi = valuesOfAll[2];

    // console.log(BOOKED_FLIGHT_SEQUENCE_NUMBER + '/' + IMPAWBROWID + '/' + IMPSHIPROWID)

    //  InputXML = '<Root><AWBId>' + idAWB + '</AWBId><SHIPId>' + idSHI + '</SHIPId><FlightSeqNo>' + $('#ddlFlightNo').val() + '</FlightSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';
    var awbNo = $('#txtScanAWBNo').val();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetImportDamageRecordDetails",
            data: JSON.stringify({
                'strAWBNo': awbNo,
                'strAirportCity': AirportCity,
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
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log(xmlDoc);

                $(xmlDoc).find('Table15').each(function (index) {

                    SEQUENCE_NUMBER = $(this).find('SEQUENCE_NUMBER').text();
                    TYPE_DISCREPANCY = $(this).find('TYPE_DISCREPANCY').text();
                    PACK_CONTAINER_MATERIAL = $(this).find('TYPE_DISCREPANCY').text();
                    REMARKS = $(this).find('REMARKS').text();
                    $('#txtAreaRemark').val(REMARKS)

                });

                if (SEQUENCE_NUMBER != '') {
                    //  $.alert('Damage details are already captured, hence cannot proceed.');
                    $('#spnErrormsg').text("Damage details are already captured, hence cannot proceed.").css('color', 'red');
                    //  $('.alert_btn').click(function () {
                    localStorage.removeItem('AWB_Number');
                    localStorage.removeItem('HAWB_Number');
                    localStorage.removeItem('Flight_Seq_No');
                    localStorage.removeItem('allIDs');
                    return
                    // });
                } else {
                    localStorage.setItem('AWB_Number', $('#txtAWBNo').val());
                    localStorage.setItem('HAWB_Number', $('#ddlHAWBNo').val());
                    localStorage.setItem('Flight_Seq_No', $('#ddlFlightNo').val());
                    localStorage.setItem('IMPAWBROWID', IMPSHIPROWID);
                    localStorage.setItem('IMPSHIPROWID', IMPSHIPROWID);
                    localStorage.setItem('imageUplaodID', imageUplaodID);
                    
                    window.location.href = 'IMP_RecordDamage_Options.html';
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }


}



function exitFromPage() {
    localStorage.removeItem('AWB_Number');
    localStorage.removeItem('HAWB_Number');
    localStorage.removeItem('Flight_Seq_No');
    localStorage.removeItem('allIDs');
    window.location.href = 'IMP_Dashboard.html'
}