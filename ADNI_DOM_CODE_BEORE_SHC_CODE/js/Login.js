//var GHAserviceURL = "http://10.22.2.71:8080/DOMHHTHandler/HHTHandler.asmx/";
//var GHAserviceURL = "http://10.22.2.71:8080/DOMHHTHandler/HHTHandler.asmx/";
//var GHAserviceURL = 'http://10.22.2.71:8080/DOMHHTHandler/HHTHandler.asmx/';
//var GHAserviceURL = 'http://113.193.225.59:8080/DOMHHTHandler/HHTHandler.asmx/';
//var GHAserviceURL = 'http://113.193.225.59:8080/DOMHHTHandler/HHTHandler.asmx/';
//var GHAserviceURL = "https://adaniuat.kalelogistics.com/DOMAMDHHTHandler/HHTHandler.asmx/";

//var GHAserviceURL = "http://104.211.186.140/CMSCourierUATWS/HHTService.asmx/";

//Adani DOM Live
//var GHAserviceURL = "https://adani.kalelogistics.com/DOMAMDHHTHandler/HHTHandler.asmx/";

//var GHAserviceURL = "https://gmruat.kalelogistics.com:7081/GMRUATHHTGoa/HHTHandler.asmx/";

//var GHAserviceURL = "https://gmruat.kalelogistics.com:7081/GMRUATHHT/HHTHandler.asmx/";

var GHAserviceURL = "https://cscdomuat.kalelogistics.com/DOMUATHHTCOK/HHTHandler.asmx/";

//var GHAserviceURL = "https://domestic.gmrcargo.com:7081/DomHHTGOA/HHTHandler.asmx/";


//Adani DOM UAT AMD

//var GHAserviceURL = "https://adaniuat.kalelogistics.com/DOMAMDHHTHandler/HHTHandler.asmx/";

//Adani DOM UAT JAIPUR

//var GHAserviceURL = "https://adaniuat.kalelogistics.com/DOMJAIHHTHandler/HHTHandler.asmx/";

//Adani DOM UAT TRV

//var GHAserviceURL = "https://adaniuat.kalelogistics.com/DOMTRVHHTHandler/HHTHandler.asmx/";

var deviceUUID;
var encryptedUUID;
document.addEventListener("deviceready", SetRememberLogin, false);
document.addEventListener("backbutton", exitFromApp, false);


$(function () {

    var _deviceUUID = 'cdebd2ec7da49740';

    EncryptPasswordUUID(_deviceUUID);

    createCaptcha();
    //$(":text").addClear();
    //$(":password").addClear();
    //$('input[type=text]').addClear();
    //$('input[type=password]').addClear();
    if (typeof MSApp !== "undefined") {
        MSApp.execUnsafeLocalFunction(function () {
            //$('input[type=text]').addClear();
            //$('input[type=password]').addClear();
        });
    } else {
        $("input[type=text]").addClear();
        $("input[type=password]").addClear();
    }

    clearStorageExcept(["UserName", "Password", "IsRememberChecked"]);

    SetRememberLogin();
});



//function EncryptPassword() {
//    var pass = $('#txtPassword').val();

//    key = CryptoJS.enc.Utf8.parse('6127052419378774');
//    iv = CryptoJS.enc.Utf8.parse('7221940682806354');
//    if (pass != '') {
//        var encryptedpassword = encryptpasswords(pass, key, iv);
//    }
//    else {
//        // encryptclear();
//    }
//}

//function encryptpasswords(pass, key, iv) {
//    if (pass != '') {
//        var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pass), key,
//        {
//            keySize: 128 / 8,
//            iv: iv,
//            mode: CryptoJS.mode.CBC,
//            padding: CryptoJS.pad.Pkcs7
//        });
//        pass = '';
//        ProcessLogin(encryptedpassword, key, iv)
//    }
//}


function EncryptPassword() {
    var rndnoKey = '';
    for (var i = 0; rndnoKey.length < 16; ++i) {
        rndnoKey += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAKey = btoa(rndnoKey);
    var rndnoIv = '';
    for (var i = 0; rndnoIv.length < 16; ++i) {
        rndnoIv += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAIv = btoa(rndnoIv);
    var pass = document.getElementById('txtPassword').value.trim();
    var key = CryptoJS.enc.Utf8.parse(rndnoKey);
    var iv = CryptoJS.enc.Utf8.parse(rndnoIv);
    if (pass != '') {
        var encryptedpassword = EncryptPwdWithKey(pass, key, iv);
    } else { }
    ProcessLogin(encryptedpassword, encodedStringBtoAKey, encodedStringBtoAIv)
    return false;
}

function EncryptPwdWithKey(pass, key, iv) {

    if (pass != '') {
        var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pass), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        pass = '';
        return encryptedpassword;
    }
}




//function EncryptPasswordUUID() {
//    var dUUID = deviceUUID;

//    key = CryptoJS.enc.Utf8.parse('6127052419378774');
//    iv = CryptoJS.enc.Utf8.parse('7221940682806354');
//    if (dUUID != '') {
//        var encryptedpassword = encryptpasswordsUUID(dUUID, key, iv);
//    }
//    else {
//        // encryptclear();
//    }
//}

//function encryptpasswordsUUID(dUUID, key, iv) {
//    if (dUUID != '') {
//        encryptedUUID = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(dUUID), key,
//       {
//           keySize: 128 / 8,
//           iv: iv,
//           mode: CryptoJS.mode.CBC,
//           padding: CryptoJS.pad.Pkcs7
//       });
//        dUUID = '';
//        // SaveDeliveryDetails(encryptedpassword)
//    }
//}


function ProcessLogin(encryptedpassword, key, iv) {

    var Uname = $("#txtUserName").val();
    var Pass = $("#txtPassword").val();



    var connectionStatus = navigator.onLine ? "online" : "offline";
    var errmsg = "";
    if (Uname == null || Uname == "") {
        errmsg = "Please enter User ID.<br/>";
        $.alert(errmsg);
        return;
    }

    if (Pass == null || Pass == "") {
        errmsg = "Please enter Password.";
        $.alert(errmsg);
        return;
    }
    console.log(GHAserviceURL + "HHTLogin");

    if (
        Uname != null &&
        Uname != "" &&
        Pass != null &&
        Pass != "" &&
        connectionStatus == "online"
    ) {
        $.ajax({
            type: "POST",
            // url: GHAserviceURL + "HHTLoginVAPT",
            // url: GHAserviceURL + "HHTLoginVAPTSession",
            url: GHAserviceURL + "HHTLoginVAPTSessionV",
            data: JSON.stringify({
                //strUserName: Uname,
                //strPassword: encryptedpassword.toString()

                Value1: key,
                Value2: encryptedpassword.toString(),
                Value3: Uname,
                Value4: iv,
                Value5: encryptedUUID.toString()
            }),

            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            beforeSend: function doStuff() {
                $("body").mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {

                $("body").mLoading('hide');
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);
                    //console.log(response);
                    console.log(xmlDoc);
                    $(xmlDoc)
                        .find("Table")
                        .each(function (index) {
                            window.localStorage.setItem(
                                "UserID",
                                $(this).find("MU_UserName_C").text()
                            );
                            window.localStorage.setItem("MU_CITY_C", $(this).find("MU_CITY_C").text());
                            window.localStorage.setItem("ClientName", $(this).find("ClientName").text());

                            MU_Password_C = $(this).find("MU_Password_C").text();

                            if (key == MU_Password_C) {
                                window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
                                window.location = "GalaxyHome.html";
                                MU_Password_C = '';
                            } else {
                                $.alert('Invalid username/password.');
                                return;
                            }

                            //window.localStorage.setItem("MU_CITY_C", $(this).find("MU_CITY_C").text());
                            //window.localStorage.setItem("MU_CITY_C", $(this).find("MU_CITY_C").text());

                        });

                    $(xmlDoc)
                        .find("StatusMessage")
                        .each(function (index) {
                            Status = $(this).find("Status").text();
                            Message = $(this).find("Message").text();
                            if (Status == "E") {
                                errmsg = Message + "</br>";
                                $.alert(errmsg);
                                return;
                            }
                        });
                } else {
                    HideLoader();
                    errmsg = errmsg + "Invalid username and password.";
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
            },
        });

        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    } else if (connectionStatus == "offline") {
        HideLoader();
        $.alert("No Internet Connection!");
    }
    if (errmsg != "") {
        HideLoader();
        $.alert(errmsg);
    }
}

function clearALL() {
    $("#txtUserName").val("");
    $("#txtPassword").val("");
    $("#cpatchaTextBox").val("");
}

function RememberCheck() {
    if ($("#chkRemember").is(":checked")) {
        var UserName = $("#txtUserName").val();
        var PassWord = $("#txtPassword").val();
        window.localStorage.setItem("UserName", UserName);
        window.localStorage.setItem("Password", PassWord);
        window.localStorage.setItem("IsRememberChecked", "true");
    } else {
        window.localStorage.setItem("UserName", "");
        window.localStorage.setItem("Password", "");
        window.localStorage.setItem("IsRememberChecked", "false");
    }
}

function EncryptPasswordUUID(_deviceUUID) {
    var rndnoKey = '';
    for (var i = 0; rndnoKey.length < 16; ++i) {
        rndnoKey += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAKey = btoa(rndnoKey);
    var rndnoIv = '';
    for (var i = 0; rndnoIv.length < 16; ++i) {
        rndnoIv += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAIv = btoa(rndnoIv);
    var duuid = _deviceUUID;
    var key = CryptoJS.enc.Utf8.parse(rndnoKey);
    var iv = CryptoJS.enc.Utf8.parse(rndnoIv);
    if (duuid != '') {
        var encryptedpassword = EncryptPwdWithKeyUUID(duuid, key, iv);
    } else { }
    // ProcessLogin(encryptedpassword, encodedStringBtoAKey, encodedStringBtoAIv)
    return false;
}

function EncryptPwdWithKeyUUID(duuid, key, iv) {

    if (duuid != '') {
        encryptedUUID = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(duuid), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        duuid = '';
        _UUID = encryptedUUID.toString();

        window.localStorage.setItem("deviceUUID", _UUID);
        deviceUUID = window.localStorage.getItem("deviceUUID");
        return encryptedUUID;
    }
}

function SetRememberLogin() {
    // deviceUUID = device.uuid;


    var _deviceUUID = 'cdebd2ec7da49740';

    EncryptPasswordUUID(_deviceUUID);

    //console.log(device);
    //var vInfo = 'Device Name: ' + device.name + '\n' +
    //                       'Device Cordova: ' + device.cordova + '\n' +
    //                       'Device Platform: ' + device.platform + '\n' +
    //                       'Device UUID: ' + device.uuid + '\n' +
    //                       'Device Version: ' + device.version;
    //alert(device.uuid);





    var U = window.localStorage.getItem("UserName");
    var P = window.localStorage.getItem("Password");
    var R = window.localStorage.getItem("IsRememberChecked");
    if (R != null && R == "true") {
        $("#chkRemember").prop("checked", true);
    } else {
        $("#chkRemember").prop("checked", false);
        // window.CacheClear();
    }
    if (U != null && U != "") {
        $("#txtUserName").val(U);
    }
    if (P != null && P != "") {
        $("#txtPassword").val(P);
    }

    var connectionStatus = navigator.onLine ? "online" : "offline";
    if (connectionStatus == "offline") {
        $.alert("No Internet Connection!");
        setInterval(function () {
            connectionStatus = navigator.onLine ? "online" : "offline";
            if (connectionStatus == "online") { } else {
                $.tips(
                    "You are offline."
                );
            }
        }, 3000);
    }
}

function exitFromApp() {
    //console.log("in button");
    clearStorageExcept(["UserName", "Password", "IsRememberChecked"]);
    navigator.app.exitApp();
    HHTLogout();
    // window.CacheClear();
}

function onCreateAWB() {
    window.location = "ExpCreateAWB.html";
}

function onSearchAWB() {
    window.location = "ExpSearchAWB.html";
}

function onFlightCheck() {
    window.location = "IMP_FlightCheck.html";
}

function onIMPShipmentLoc() {
    window.location = "IMP_ShipmentLocation.html";
}

clearStorageExcept = function (exceptions) {
    var storage = localStorage;
    var keys = [];
    var exceptions = [].concat(exceptions); //prevent undefined

    //get storage keys
    $.each(localStorage, function (key, val) {
        keys.push(key);
    });

    //loop through keys
    for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var deleteItem = true;

        //check if key excluded
        for (j = 0; j < exceptions.length; j++) {
            var exception = exceptions[j];
            if (key == exception) {
                deleteItem = false;
            }
        }

        //delete key
        if (deleteItem) {
            localStorage.removeItem(key);
        }
    }
};

function viewPassword() {
    var x = document.getElementById("txtPassword");
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


var code;

function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 140;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";

    ctx.textAlign = "20";
    ctx.strokeText(captcha.join(""), 0, 30);

    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}

function validateCaptcha() {

    var Uname = $("#txtUserName").val();
    var Pass = $("#txtPassword").val();
    var errmsg = "";
    if (Uname == null || Uname == "") {
        errmsg = "Please enter User ID.<br/>";
        $.alert(errmsg);
        return;
    }

    if (Pass == null || Pass == "") {
        errmsg = "Please enter Password.";
        $.alert(errmsg);
        return;
    }

    event.preventDefault();

    if (document.getElementById("cpatchaTextBox").value == '') {
        errmsg = "Please enter Captcha.";
        $.alert(errmsg);
        return;
    } else if (document.getElementById("cpatchaTextBox").value == code) {
        EncryptPassword();
    } else {
        alert("Invalid Captcha. try Again");
        $("#cpatchaTextBox").val('');
        createCaptcha();
    }
}