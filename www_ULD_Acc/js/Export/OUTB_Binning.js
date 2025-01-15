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
(function() {

    if (window.localStorage.getItem("RoleExpBinning") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    document.addEventListener('deviceready', AddLocation, false);
    document.addEventListener('deviceready', AddingTestLocation, false);

})();

var TotPackages;
var OldLocationPieces;



function GetExportBinningDetails() {

    //  clearBeforePopulate();
    $("#btnSubmit").removeAttr("disabled");
    $('#txtCommodity').val('');
    $('#txtTotalPkg').val('');

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

    //var EWRNo = $('#ddlEWRno').find('option:selected').text()

    //if (EWRNo == '' || EWRNo == 'Select') {
    //    errmsg = "Please select EWR No.";
    //    $.alert(errmsg);
    //    return;
    //}

    var locPieces;

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetExportBinningDetailsV",
            data: JSON.stringify({
                strType: 'A',
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
            success: function(response) {
                $('#divAddTestLocation').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)
                $(xmlDoc).find('Table').each(function(index) {

                    AWBRowID = $(this).find('AWBRowID').text();
                    var Commodity = $(this).find('Commodity').text();
                    var Origin = $(this).find('Origin').text();
                    var Destination = $(this).find('Destination').text();
                    var TotBinnedPkd = $(this).find('TotBinnedPkd').text();

                    $("#txtOrigin").val(Origin);
                    $("#txtDest").val(Destination);
                    $("#txtCommodity").val(Commodity);
                    $("#txtBinnedTotalPkgs").val(TotBinnedPkd);
                });


                if (str != null && str != "") {

                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Binned Pkgs.</th>";
                    html += "</tr></thead>";
                    html += "<tbody id='TextBoxesGroup'>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function(index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            $('#divAddTestLocation').empty();
                            html = '';
                            return;
                        }

                        var location;

                        LocationRowID = $(this).find('LocationRowID').text();
                        location = $(this).find('LOC_CODE').text();
                        locPieces = $(this).find('pcs').text();

                        //$('#txtOrigin').val($(this).find('Origin').text());
                        //$('#txtDest').val($(this).find('Destination').text());



                        //if (index == 0) {
                        //    $('#txtBinnedTotalPkgs').val($(this).find('TotBinnedPkd').text());
                        //    $('#txtCommodity').val($(this).find('Commodity').text());
                        //}

                        //var remainingPieces = $(this).find('RemainingPieces').text().substr(0, $(this).find('RemainingPieces').text().indexOf('/'));

                        //if (remainingPieces == $(this).find('TotPieces').text())
                        //    $("#btnSubmit").attr("disabled", "disabled");
                        AddTableLocation(location, locPieces, LocationRowID);
                    });

                    html += "</tbody></table>";

                    if (locPieces > 0)
                        $('#divAddTestLocation').append(html);

                } else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function(msg) {
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


function calLocationRows(idCounter) {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtlocation").val() == "") {
        errmsg = "Please enter location.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtbinnPkgs").val() == "") {
        errmsg = "Please enter location Pkgs. </br>";
        $.alert(errmsg);
        return;
    }
    debugger
    var TableData = new Array();
    inputRowsforLocation = "";

    $("#TextBoxesGroup tr").each(function(row, tr) {


        TableData[row] = {
            ItemNum: $(tr).find("td:eq(0)").text(),
            Itemloc: $(tr).find("td:eq(1)").text(),
            Itempcs: $(tr).find("td:eq(2)").text(),
        };
        if (
            $(tr).find("td:eq(0)").text() != "" &&
            $(tr).find("td:eq(1)").text() != ""
        ) {
            inputRowsforLocation +=
                '<Location LocationRowID = "' +
                $(tr).find("td:eq(0)").text() +
                '" LocationCode="' +
                $(tr).find("td:eq(1)").text() +
                '" Pieces="' +
                $(tr).find("td:eq(2)").text() +
                '" />';
        }
    });

    inputRowsforLocation +=
        '<Location LocationRowID = "' +
        '-1' +
        '" LocationCode="' +
        $("#txtlocation").val() +
        '" Pieces="' +
        $("#txtbinnPkgs").val() +
        '" />';


    if (inputRowsforLocation == "") {
        inputRowsforLocation =
            '<Location LocationRowID = "' +
            '-1' +
            '" LocationCode="' +
            $("#txtlocation").val() +
            '" Pieces="' +
            $("#txtbinnPkgs").val() +
            '" />';
    }
    SaveLocation();
}


function SaveLocation() {

    var locationXML = "<Root>" + inputRowsforLocation + "</Root>";
    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "AddLocationV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                strLocationXML: locationXML,
                strAirportCity: AirportCity,
                strUserId: UserId, strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                //console.log("save location");
                //console.log("Location", xmlDoc);
                _xmlDocTable = xmlDoc;

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function(index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        //  $("#hdMessage").text(Message);
                        GetExportBinningDetails();
                        // inputRowsforLocation = "";
                        errmsg = Message + "</br>";
                        $.alert(errmsg);
                        return;
                    });
            },
            error: function(msg) {
                $("body").mLoading("hide");
                $.alert("Data could not be loaded");
            },
        });
        return false;
    } else if (connectionStatus == "offline") {
        $("body").mLoading("hide");
        $.alert("No Internet Connection!");
    } else if (errmsg != "") {
        $("body").mLoading("hide");
        $.alert(errmsg);
    } else {
        $("body").mLoading("hide");
    }
}

//function SaveShipmentLocation() {

//    var connectionStatus = navigator.onLine ? 'online' : 'offline'
//    var errmsg = "";

//    var AWBNo = $('#txtAWBNo').val();
//    //var TotalPIECESno = $('#txtTotalPkg').val();
//    var Location = $('#txtLocation_0').val().toUpperCase();
//    //var Area = $('#txtArea_0').val();
//    //var Terminal = $('#txtTerminal_0').val();
//    var BinnPckgs = $('#txtBinnPkgs_0').val();
//    var UserName = window.localStorage.getItem("UserName")
//    console.log("BinnPckgs" + BinnPckgs)
//    console.log("AWBNo" + AWBNo)
//    console.log("Location" + Location)
//    console.log("ddlEWRno" + $('#ddlEWRno').find('option:selected').text())
//    console.log("UserName" + UserName)

//    if (AWBNo == '') {

//        errmsg = "Please enter AWB number</br>";
//        $.alert(errmsg);
//        return;

//    }
//    if (location == '') {
//        errmsg = "Please enter location</br>";
//        $.alert(errmsg);
//        return;
//    }

//    if (BinnPckgs == '') {
//        errmsg = "Please enter binn pckgs</br>";
//        $.alert(errmsg);
//        return;
//    }

//    //OldLocationPieces = TotalPIECESno.substr(((TotalPIECESno.length - 1) / 2) + 1);
//    //OldLocationPieces = TotalPIECESno.substr(0, TotalPIECESno.indexOf('/'));
//    //if (Number(BinnPckgs) > Number(OldLocationPieces)) {
//    //    errmsg = "Binn packages cannot be more than total packages.</br>";
//    //    $.alert(errmsg);
//    //    return;
//    //}

//    if (errmsg == "" && connectionStatus == "online") {
//        $.ajax({
//            type: "POST",
//            url: GHAserviceURL + "CreateShipmentLocation_PDA",
//            data: JSON.stringify({
//                'intAWBRowId': AWBNo,
//                'strLocationXML': '',
//                'strAirportCity': AirportCity,
//                'strUserId': UserId, 
//            }),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            beforeSend: function doStuff() {
//                //$('.dialog-background').css('display', 'block');
//                $('body').mLoading({
//                    text: "Please Wait..",
//                });
//            },
//            success: function (response) {
//                $("body").mLoading('hide');
//                $.alert(response.d);
//                //window.location.reload();
//                //clearALL();
//                GetShipmentLocation();
//            },
//            error: function (msg) {
//                $("body").mLoading('hide');
//                $.alert('Some error occurred while saving data');
//            }
//        });
//        return false;
//    }

//}

function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtCommodity').val('');
    $('#txtTotalPkg').val('');
    $('#txtLocation_0').val('');
    $('#txtArea_0').val('');
    $('#txtTerminal_0').val('');
    $('#txtBinnPkgs_0').val('');
    $('#divAddTestLocation').empty();
    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#ddlEWRno').empty();
    $('#txtAWBNo').focus();
}

function clearBeforePopulate() {
    $('#txtAWBNo').val('');
    $('#txtOrigin').val('');
    $('#txtDest').val('');
    $('#txtCommodity').val('');

    $('#txtBinnedTotalPkgs').val('');
    $('#txtlocation').val('');
    $('#txtbinnPkgs').val('');
    $('#txtTotalPkg').val('');

    $('#divAddTestLocation').empty();
    html = '';

}

function AddTableLocation(location, locpieces, LocationRowID) {

    html += "<tr>";
    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;display:none;'>" + LocationRowID + "</td>";
    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + location + "</td>";
    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='right'>" + locpieces + "</td>";
    html += "</tr>";



}

function AddLocation() {
    console.log("Location Added");
    var LocCont = $('#divAddLocation > *').length;
    var no = '0';
    var LocCount;
    if ($('#divAddLocation > *').length > 0) {
        no = parseInt($('#divAddLocation').children().last().attr('id').split('_')[1]) + 1;
    }
    if (no != undefined || no != '') {
        LocCount = no;
    }
    var str = "";
    str = '<div id="loc_' + LocCount + '" class="row panel panel-widget forms-panel form-grids widget-shadow" style="margin-top:5px;">'
    str += '<div class="row">'
    str += '<div class="col-xs-12">'
    str += '<a>'
        //str += '<button class="btn btn-success btn-xs" onclick="RemoveLocation(' + LocCount + ',event );" style="float:right;"><span class="glyphicon glyphicon-remove-circle" style="float: right;color:red;"></span></button>'
        //str += '<span class="glyphicon glyphicon-remove-circle" style="float: right;color:red;" onclick="RemoveLocation(' + LocCount + ');"></span>'
    str += '</a>'
    str += '</div>'
    str += '</div>'
    str += '<div class="forms">'
    str += '<div class="form-body">'
    str += '<div class="row form-group" style="margin-bottom: 0px;">'
    str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-left: 0px;">'
    str += '<label id="lblLocation_' + LocCount + '" for="txtLocation_' + LocCount + '" class="control-label">Location</label>'
    str += '<font color="red">*</font>'
        //str += '<select class="form-control" id="ddlLocation_' + LocCount + '">'
    str += '<input id="txtLocation_' + LocCount + '" class="form-control" type="text" maxlength="20">'
        //str += '<option value="0">Select</option>'
        //str += '</select>'
    str += '</div>'
        //str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-right: 0px;">'
        //str += '<label id="lblArea_' + LocCount + '" for="txtArea_' + LocCount + '" class="control-label">Area</label>'
        //str += '<font color="red">*</font>'
        //str += '<input id="txtArea_' + LocCount + '" class="form-control" type="text" maxlength="20">'
        //str += '</div>'
        //str += '</div>'
        //str += '<div class="row form-group" style="margin-bottom: 0px;">'
        //str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-left: 0px;">'
        //str += '<label id="lblTerminal_' + LocCount + '" for="txtTerminal_" class="control-label">Terminal</label>'
        //str += '<font color="red">*</font>'
        //str += '<input id="txtTerminal_' + LocCount + '" class="form-control" type="text" maxlength="20">'
        //str += '</div>'
    str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-right: 0px;">'
    str += '<label id="lblBinnPkgs_' + LocCount + '" for="txtBinnPkgs_" class="control-label">Binn Pkgs</label>'
    str += '<font color="red">*</font>'
    str += '<input id="txtBinnPkgs_' + LocCount + '" class="form-control" type="number" onkeyup="ChkMaxLength(this, 4); NumberOnly(event);" style="text-align:right;" max="9999999">'
    str += '</div>'
    str += '</div>'
    str += '</div>'
    str += '</div>'
        //$('#divAddLocation').append(str);
        //MSApp.execUnsafeLocalFunction(function () {
        //    $('#divAddLocation').append(str);
        //});

    if (typeof(MSApp) !== "undefined") {
        MSApp.execUnsafeLocalFunction(function() {
            $('#divAddLocation').append(str);
        });
    } else {
        $('#divAddLocation').append(str);
    }
}

function RemoveLocation(id) {
    //MSApp.execUnsafeLocalFunction(function () {
    //    $('#loc_' + id).remove();
    //});    
    if (typeof(MSApp) !== "undefined") {
        MSApp.execUnsafeLocalFunction(function() {
            lnv.confirm({
                title: 'Delete',
                content: 'Are you want to delete location??',
                confirmHandler: function() {
                    $('#loc_' + id).remove();
                },
                cancelHandler: function() {
                    // cancel callback
                }
            })
        });
    } else {
        lnv.confirm({
            title: 'Delete',
            content: 'Are you want to delete location??',
            confirmHandler: function() {
                $('#loc_' + id).remove();
            },
            cancelHandler: function() {
                // cancel callback
            }
        })
    }
}