var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserId = window.localStorage.getItem("UserID");
var html;
var LocationRowID;
var AWBRowID;
var inputRowsforLocation = "";
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
(function () {

    if (window.localStorage.getItem("RoleExpBinning") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    // document.addEventListener('deviceready', AddLocation, false);
    // document.addEventListener('deviceready', AddingTestLocation, false);

})();

function GetAWBEventLog() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == '') {
        //errmsg = "Please enter AWB No.";
        //$.alert(errmsg);
        return;
    }

    if (AWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetAWBEventLogV",
            data: JSON.stringify({
                strModule: 'I',
                strAWBNo: AWBNo,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID
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
                $('#divAddTestLocation').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)



                if (str != null && str != "") {

                    html = '';

                    //html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    //html += "<thead><tr>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Event Name</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Final Datetime</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    //html += "</tr></thead>";
                    //html += "<tbody id='TextBoxesGroup'>";

                    html = "<table id='tblNews' border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='left'font-weight:'bold'>Date & Time " + '<br>' + " User</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='left'font-weight:'bold'>Event Desc.</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    html += "</tr></thead>";
                    html += "<tbody id='TextBoxesGroup'>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $('#divAddTestLocation').empty();
                            $('.alert_btn_ok').click(function () {
                                $('#txtAWBNo').val('');
                                $('#txtAWBNo').focus();
                            });
                            html = '';
                            return;
                        }

                        EventName = $(this).find('EventName').text();
                        EventDT = $(this).find('EventDT').text();
                        UserName = $(this).find('UserName').text();

                        AddTableQuery(EventName, EventDT, UserName);
                    });

                    html += "</tbody></table>";

                    $('#divAddTestLocation').append(html);

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



function GetAWBEventLogOnBtnClick() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        $('.alert_btn_ok').click(function () {
            $('#txtAWBNo').focus();
        });
        return;
    }

    if (AWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetAWBEventLogV",
            data: JSON.stringify({
                strModule: 'I',
                strAWBNo: AWBNo,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID
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
                $('#divAddTestLocation').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)



                if (str != null && str != "") {

                    html = '';

                    //html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    //html += "<thead><tr>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Event Name</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Final Datetime</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    //html += "</tr></thead>";
                    //html += "<tbody id='TextBoxesGroup'>";

                    html = "<table id='tblNews' border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='left'font-weight:'bold'>Date & Time " + '<br>' + " User</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='left'font-weight:'bold'>Event Desc.</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    html += "</tr></thead>";
                    html += "<tbody id='TextBoxesGroup'>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $('#divAddTestLocation').empty();
                            $('.alert_btn_ok').click(function () {
                                $('#txtAWBNo').val('');
                                $('#txtAWBNo').focus();
                            });
                            html = '';
                            return;
                        }

                        EventName = $(this).find('EventName').text();
                        EventDT = $(this).find('EventDT').text();
                        UserName = $(this).find('UserName').text();

                        AddTableQuery(EventName, EventDT, UserName);
                    });

                    html += "</tbody></table>";

                    $('#divAddTestLocation').append(html);

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

function AddTableQuery(EventName, EventDT, UserName) {

    html += "<tr>";
    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='left'>" + EventDT + ' <br> ' + UserName + "</td>";
    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='left'>" + EventName + "</td>";
    //html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='left'>" + UserName + "</td>";
    html += "</tr>";



}