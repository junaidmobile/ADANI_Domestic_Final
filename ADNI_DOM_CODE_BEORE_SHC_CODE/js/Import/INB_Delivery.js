var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserId = window.localStorage.getItem("UserID");
//var deviceUUID = window.localStorage.getItem("deviceUUID");
var flightSeqNo;
var ULDSeqNo;
var Identification;
var selectedGatePass;
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("menubutton", onMenuKeyDown, false);



$(function () {

    $('#ddlGatePassNo').change(function () {
        selectedGatePass = $(this).val();

    });

})

function onblureAWBNo(AWB) {
    if ($("#txtAWBNo").val() == '') {
        return;
    }

    $("#txtAWBNo").val(AWB);
}

function GetAWBDetails() {

    //var myLength = $("#txtAWBNo").val().length;
    //if (myLength == 11) {
    //    GetAWBDetails();
    //}

    if ($("#txtAWBNo").val() == '' || $("#txtAWBNo").val().length != 11) {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }



    $('#ddlIdentification').empty();
    if ($("#txtAWBNo").val() == '') {
        $('#ddlGatePassNo').empty();
        $('#ddlIdentification').empty();
        $('#ddlIdentification').html('');
        $('#txtDelieveredTo').val('');
        $('#txtIdentificationNo').val('');
        $('#txtDeliveryPieces').val('');
        $('#txtDeliveryGrWt').val('');
        $('#txtDeliveryChWt').val('');
        $('#txtDeliveryStatus').val('');

        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";
    $('#ddlGatePassNo').empty();
    $('#ddlIdentification').empty();
    $('#ddlIdentification').html('');
    $('#txtDelieveredTo').val('');
    $('#txtIdentificationNo').val('');
    $('#txtDeliveryPieces').val('');
    $('#txtDeliveryGrWt').val('');
    $('#txtDeliveryChWt').val('');
    $('#txtDeliveryStatus').val('');

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "AWBSearchDeliveryV",
            data: JSON.stringify({
                'strAWBNo': $('#txtAWBNo').val(),
                'strAirportCity': AirportCity,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log('call')
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    gatePassId = $(this).find('Value').text();
                    gatePassNo = $(this).find('Text').text();

                    var newOption = $('<option></option>');
                    newOption.val(gatePassId).text(gatePassNo);
                    newOption.appendTo('#ddlGatePassNo');
                    $('#ddlGatePassNo').trigger('change')


                });

                $(xmlDoc).find('StatusMessage').each(function (index) {

                    Status = $(this).find('Status').text();
                    Message = $(this).find('Message').text();
                    if (Status == 'E') {
                        $.alert(Message);

                        $(".alert_btn_ok").click(function () {
                            $('#txtAWBNo').val('');
                            $('#txtAWBNo').focus();

                        });
                        return;
                    } else {
                        if ($("#ddlGatePassNo").val() == undefined) {
                            errmsg = "Please select gate pass No.</br>";
                            $.alert(errmsg);
                            return;
                        }
                        CheckDeliveryDetails();
                    }
                    if (Message == 'No gatepass found.' || Status == 'E') {
                        $("#btnGetDetail").attr("disabled", "disabled");
                    } else {
                        $('#btnSubmit').removeAttr("disabled");
                    }
                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function Decrypt(IdentificationCome) {

    var key = CryptoJS.enc.Utf8.parse('6127052419378774');
    var iv = CryptoJS.enc.Utf8.parse('7221940682806354');

    var encryptedData = CryptoJS.AES.decrypt(IdentificationCome, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decrypted = encryptedData.toString(CryptoJS.enc.Utf8);

    document.getElementById('txtIdentificationNo').value = decrypted;
    // $('#txtIdentificationNo').val(Identification);
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}

function CheckDeliveryDetails() {


    if ($("#txtAWBNo").val() == '' || $("#txtAWBNo").val().length != 11) {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    //if ($("#ddlGatePassNo").val() == undefined) {
    //    errmsg = "Please select gate pass No.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    $('#ddlIdentification').empty();
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetDeliveryDetailsV",
            data: JSON.stringify({
                'intGatepassRId': $("#ddlGatePassNo").val(),
                'strAirportCity': AirportCity,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log('mul')
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    DeliveredTo = $(this).find('DeliveredTo').text();
                    IDno = $(this).find('IDno').text();
                    Identification = $(this).find('Identification').text();

                    DelieverdPieces = $(this).find('GPPieces').text();
                    DelieverdWeight = $(this).find('GPGrossWt').text();
                    DelieverdChWeight = $(this).find('GPChrgWt').text();
                    Status = $(this).find('Status').text();
                    BtnStatus = $(this).find('BtnStatus').text();

                    $('#txtDeliveryPieces').val(DelieverdPieces);
                    $('#txtDeliveryGrWt').val(DelieverdWeight);
                    $('#txtDeliveryChWt').val(DelieverdChWeight);
                    $('#txtDeliveryStatus').val(Status);



                    if (Status == 'Delivered') {
                        $("#btnSubmit").attr("disabled", "disabled");
                        $('#txtDelieveredTo').val(DeliveredTo);

                        Decrypt(Identification)
                        // $('#ddlIdentification').val(IDno);
                        // $("#ddlIdentification option[value='IDno']").attr("selected", "selected");
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                    refDataIdentifier = $(this).find('Value').text();
                    refDescription = $(this).find('Text').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val('0').text('Select');
                        newOption.appendTo('#ddlIdentification');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(refDataIdentifier).text(refDescription);
                    newOption.appendTo('#ddlIdentification');
                    if (Status == 'Delivered') {
                        $('#ddlIdentification').val(IDno).attr("selected", "selected");
                    }
                });


                $(xmlDoc).find('StatusMessage').each(function (index) {

                    Status = $(this).find('Status').text();
                    Message = $(this).find('Message').text();
                    if (Status == 'E') {
                        $.alert(Message);
                    }
                    if (Message == 'No gatepass found.') {
                        $("#btnSubmit").attr("disabled", "disabled");
                    }
                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

//function EncryptPassword() {
//    var rndnoKey = '';
//    for (var i = 0; rndnoKey.length < 16; ++i) {
//        rndnoKey += Math.floor(Math.random() * (10 - 1) + 1).toString();
//    }
//    var encodedStringBtoAKey = btoa(rndnoKey);
//    var rndnoIv = '';
//    for (var i = 0; rndnoIv.length < 16; ++i) {
//        rndnoIv += Math.floor(Math.random() * (10 - 1) + 1).toString();
//    }
//    var encodedStringBtoAIv = btoa(rndnoIv);
//    var pass = document.getElementById('txtIdentificationNo').value.trim();
//    var key = CryptoJS.enc.Utf8.parse(rndnoKey);
//    var iv = CryptoJS.enc.Utf8.parse(rndnoIv);

//    var encryptedpassword = EncryptPwdWithKey(pass, key, iv);

//    SaveDeliveryDetails(encryptedpassword)
//    return false;
//}

//function EncryptPwdWithKey(pass, key, iv) {

//    if (pass != '') {
//        var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pass), key,
//        {
//            keySize: 128 / 8,
//            iv: iv,
//            mode: CryptoJS.mode.CBC,
//            padding: CryptoJS.pad.Pkcs7
//        });
//        pass = '';
//        return encryptedpassword;
//    }
//}


function EncryptPassword() {
    if ($("#txtAWBNo").val() == '' || $("#txtAWBNo").val().length != 11) {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#ddlGatePassNo").val() == undefined) {
        errmsg = "Please select gate pass No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#ddlIdentification").val() == undefined) {
        errmsg = "Please select Identification</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtDelieveredTo").val() == '') {
        errmsg = "Please enter delivered to.</br>";
        $.alert(errmsg);
        return;
    }
    if ($('#ddlIdentification').find('option:selected').text() == 'Select') {
        errmsg = "Please select Identification.</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtIdentificationNo").val() == '') {
        errmsg = "Please enter ID No.</br>";
        $.alert(errmsg);
        return;
    }
    var pass = $('#txtIdentificationNo').val();

    key = CryptoJS.enc.Utf8.parse('6127052419378774');
    iv = CryptoJS.enc.Utf8.parse('7221940682806354');
    if (pass != '') {
        var encryptedpassword = encryptpasswords(pass, key, iv);
    } else {
        // encryptclear();
    }
}

function encryptpasswords(pass, key, iv) {
    if (pass != '') {
        var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pass), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        pass = '';
        SaveDeliveryDetails(encryptedpassword)
    }
}

function SaveDeliveryDetails(encryptedpassword) {

    console.log(encryptedpassword.toString())

    if ($("#txtAWBNo").val() == '' || $("#txtAWBNo").val().length != 11) {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtDelieveredTo").val() == '') {
        errmsg = "Please enter delivered to.</br>";
        $.alert(errmsg);
        return;
    }
    if ($('#ddlIdentification').find('option:selected').text() == 'Select') {
        errmsg = "Please select Identification.</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtIdentificationNo").val() == '') {
        errmsg = "Please enter ID No.</br>";
        $.alert(errmsg);
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "SaveDeliveryDetailsV",
            data: JSON.stringify({
                'intGatepassRId': selectedGatePass,
                'strDeliveredTo': $('#txtDelieveredTo').val(),
                'strIDType': $('#ddlIdentification').val(),
                'strIdentificationNo': encryptedpassword.toString(),
                'strAirportCity': AirportCity,
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log("Save Details Response", xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    DelieverdPieces = $(this).find('GPPieces').text();
                    DelieverdWeight = $(this).find('GPGrossWt').text();
                    DelieverdChWeight = $(this).find('GPChrgWt').text();
                    Status = $(this).find('Status').text();


                    $('#txtDeliveryPieces').val(DelieverdPieces);
                    $('#txtDeliveryGrWt').val(DelieverdWeight);
                    $('#txtDeliveryChWt').val(DelieverdChWeight);
                    $('#txtDeliveryStatus').val(Status);


                });


                $(xmlDoc).find('StatusMessage').each(function (index) {

                    Status = $(this).find('Status').text();
                    Message = $(this).find('Message').text();
                    $.alert(Message);
                    // $('#hdMessage').text(Message)
                });
                CheckDeliveryDetails();

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtDelieveredTo').val('');
    $('#txtIdentificationNo').val('');
    $('#txtDeliveryPieces').val('');
    $('#txtDeliveryGrWt').val('');
    $('#txtDeliveryChWt').val('');
    $('#txtDeliveryStatus').val('');
    $('select').empty();
    $('#btnSubmit').removeAttr("disabled");
    $('#ddlIdentification').append('<option value=0>Select</option>')
    $("#txtAWBNo").focus();
}

function viewPassword() {
    var x = document.getElementById("txtIdentificationNo");
    if (x.type === "password") {
        $(".glyphicon glyphicon-eye-open").show();
        $(".glyphicon glyphicon-eye-close").hide();
        x.type = "text";
    } else {
        $(".glyphicon glyphicon-eye-open").hide();
        $(".glyphicon glyphicon-eye-close").show();
        x.type = "password";
    }
}


function onPause() {

    HHTLogout();
}

function onResume() {
    HHTLogout();
}

function onMenuKeyDown() {
    HHTLogout();
}