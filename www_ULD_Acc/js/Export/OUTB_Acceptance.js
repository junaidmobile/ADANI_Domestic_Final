var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserId = window.localStorage.getItem("UserID");

var isCHGWTRF = window.localStorage.getItem("CHG_WT_RF");
var isCHGWTDSBL = window.localStorage.getItem("CHG_WT_DSBL");
var RoundFactorVal = window.localStorage.getItem("ROUND_FACTOR");

var flightSeqNo;
var ULDSeqNo;
var calculateByStatus; // add by junaid
var calculateByStatusMP; // add by junaid
var _xmlDocTable;
var _Value;
var _Text;
var changeVlaueCM;
var changeTextCM;
var AWBRowID;
var counter = 1;
var newTextBoxDiv = "";
var inputRowsforLocation = "";
var gridXMLforShow;
var strAction;
var Isdata;
var Message = "";
var locationList = [];
var _xmlDocTableDynamic;
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("menubutton", onMenuKeyDown, false);
UOMlist = [];

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


    $("#closeModal").click(function () {
        $("#acceptanceModal").modal("toggle");
    });

    $("#closeModalRejection").click(function () {
        $("#rejectionModal").modal("toggle");
    });


    $("#txtAWBNo").keyup(function () {
        var myLength = $("#txtAWBNo").val().length;
        if (myLength == 11) {
            GetAWBDetails();
        }
    });

    $("#ddlAccCMIN").change(function () {
        _Value = $("option:selected", this).val();
        _Text = $("option:selected", this).text();

        changeAccLength = _Value.split("~")[1];
        changeAccWidth = _Value.split("~")[2];
        changeAccHeight = _Value.split("~")[3];

        Status = _Value.split("~")[5];
        calculateByStatus = _Value.split("~")[5];

        $("#txtAccLength").val("");
        $("#txtAccWidth").val("");
        $("#txtAccHeight").val("");

        $("#txtAccVolWt").val("");

        $("#txtAccLength").removeAttr("disabled");

        $("#txtAccWidth").removeAttr("disabled");

        $("#txtAccHeight").removeAttr("disabled");

        // 1~0.00~0.00~0.00~0~E
        //changeAccVolWt = _Value.split("~")[1]
        if (Status == "E") {
            if ($("#txtAccPieces").val() == "") {
                errmsg = "Please enter Pieces.</br>";
                $.alert(errmsg);
                return;
            }
            pieces = $("#txtAccPieces").val();


            $("#txtAccLength").val('').attr("disabled", "disabled");
            $("#txtAccWidth").val('').attr("disabled", "disabled");
            $("#txtAccHeight").val('').attr("disabled", "disabled");


            if (changeAccLength == 0)
                $("#txtAccLength").removeAttr("disabled");

            if (changeAccWidth == 0)
                $("#txtAccWidth").removeAttr("disabled");
            if (changeAccHeight == 0)
                $("#txtAccHeight").removeAttr("disabled");



            var Volume =
                ($("#txtAccLength").val() *
                    $("#txtAccWidth").val() *
                    $("#txtAccHeight").val() *
                    $("#txtAccPieces").val()) /
                6000;
            tofixed = Volume.toFixed(2);

            if (isCHGWTRF == "Y") {
                var roundedVal = Math.ceil(tofixed / RoundFactorVal) * RoundFactorVal;
                tofixed = roundedVal.toFixed(2);
                $("#txtAccVolWt").val(tofixed);
            }
            else
                $("#txtAccVolWt").val(tofixed);



        } else if (Status == "D") {
            $("#txtAccLength").val(changeAccLength).attr("disabled", "disabled");
            $("#txtAccWidth").val(changeAccWidth).attr("disabled", "disabled");
            $("#txtAccHeight").val(changeAccHeight).attr("disabled", "disabled");

            //if (changeAccLength == 0)
            //    $("#txtAccLength").removeAttr("disabled");


            //if (changeAccWidth == 0)
            //    $("#txtAccWidth").removeAttr("disabled");

            //if (changeAccHeight == 0)
            //    $("#txtAccHeight").removeAttr("disabled");

            if (changeAccLength == 0) {
                $("#txtAccLength").removeAttr("disabled");
                $("#txtAccLength").val('');
                return;
            }
            if (changeAccWidth == 0) {
                $("#txtAccWidth").removeAttr("disabled");
                $("#txtAccWidth").val('');
                return;
            }
            if (changeAccHeight == 0) {
                $("#txtAccHeight").removeAttr("disabled");
                $("#txtAccHeight").val('');
                return;
            }
            // var Volume = (changeAccLength * changeAccWidth * changeAccHeight * pieces) / 6000; changed by junaid static 1 16032023
            var Volume = (changeAccLength * changeAccWidth * changeAccHeight * 1) / 6000;
            tofixed = Volume.toFixed(2);


            if (isCHGWTRF == "Y") {
                var roundedVal = Math.ceil(tofixed / RoundFactorVal) * RoundFactorVal;

                tofixed = roundedVal.toFixed(2);
                $("#txtAccVolWt").val(tofixed);
            }
            else
                $("#txtAccVolWt").val(tofixed);




        }
    });

    //$("#txtAccLength").keyup(function () {
    //    if ($("#ddlAccCMIN").val() == "0") {
    //        errmsg = "Please select Dimension Type.</br>";
    //        $.alert(errmsg);
    //        return;
    //    }

    //    var Volume =
    //          ($("#txtAccLength").val() * $("#txtAccWidth").val() * $("#txtAccHeight").val() * $("#txtAccPieces").val()) / 6000;
    //    tofixed = Volume.toFixed(2);
    //    $("#txtAccVolWt").val(tofixed);
    //});

    $("#ddlRejCMIN").change(function () {
        _Value = $("option:selected", this).val();
        _Text = $("option:selected", this).text();

        changeAccLength = _Value.split("~")[1];
        changeAccWidth = _Value.split("~")[2];
        changeAccHeight = _Value.split("~")[3];

        Status = _Value.split("~")[5];



        $("#txtRejLength").val("");
        $("#txtRejWidth").val("");
        $("#txtRejHeight").val("");

        $("#txtRejVolWt").val("");

        // 1~0.00~0.00~0.00~0~E
        //changeAccVolWt = _Value.split("~")[1]
        if (Status == "E") {
            if ($("#txtRejsubmitPcs").val() == "") {
                errmsg = "Please enter Pieces.</br>";
                $.alert(errmsg);
                return;
            }
            pieces = $("#txtRejsubmitPcs").val();

            $("#txtRejLength").removeAttr("disabled");
            $("#txtRejWidth").removeAttr("disabled");
            $("#txtRejHeight").removeAttr("disabled");

            var Volume =
                ($("#txtRejLength").val() *
                    $("#txtRejWidth").val() *
                    $("#txtRejHeight").val() *
                    $("#txtRejsubmitPcs").val()) /
                6000;
            tofixed = Volume.toFixed(2);
            $("#txtRejVolWt").val(tofixed);
        } else if (Status == "D") {
            $("#txtRejLength").val(changeAccLength).attr("disabled", "disabled");
            $("#txtRejWidth").val(changeAccWidth).attr("disabled", "disabled");
            $("#txtRejHeight").val(changeAccHeight).attr("disabled", "disabled");

            var Volume = (changeAccLength * changeAccWidth * changeAccHeight) / 6000;
            tofixed = Volume.toFixed(2);
            $("#txtRejVolWt").val(tofixed);
        }
    });

    //$("#addLocation")
    //  .on("click", ".btnAdd", function () {
    //      var itemIndex = 1;
    //      itemIndex = $(this).closest("tr").index();

    //      var tr =
    //        '<tr data-row=" + itemIndex +  "><td><input type="text"  id= "txtLocationCode' +
    //        parseInt(itemIndex + 1) + '"' +
    //        'class="form-control pnlTextBox" ></input</td><td><input onkeyup="NumberOnly(event);" type="text"  id= "pieces' +
    //       parseInt(itemIndex + 1) + '"' +
    //        "  class='form-control pnlTextBox text-right'" +
    //        ");></input></td><td><input type='button' style='margin-bottom: 5px;' value='Add' class='btnAdd form-control ButtonColor'></input></td></tr>";

    //      $(this).closest("table").append(tr);
    //      $(this).attr("value", "Delete");
    //      $(this).toggleClass("btnDelete").toggleClass("btnAdd");
    //  })
    //  .on("click", ".btnDelete", function () {
    //      $(this).closest("tr").remove();
    //  });

    var $input;
    var formElements = new Array();
    $("#addButton").click(function () {
        var firstTextBox = parseInt($("#Pieces1").val());
        $("#TextBoxesGroup")
            .find("input")
            .each(function (i, input) {
                $input = $(input);
                // $input.css("background-color", $input.val() ? "#fff" : "#FFB6C1");
                formElements.push($input.val());
            });
        // if ($input.val() == "") {
        //   $input.css("background-color", $input.val() ? "#fff" : "#FFB6C1");
        //   // return;
        // } else {
        dynamicTrCreate();
        //}
    });

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

    GetLocationsFromMaster();
});

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


function IsNumericWithDecimal(e) {
    e.target.value = e.target.value.replace(/[^0-9\.]/g, '');
    return false;
}

function CalculateVol() {

    var Volume;
    if (calculateByStatus == "D") {
        Volume =
            ($("#txtAccLength").val() *
                $("#txtAccWidth").val() *
                $("#txtAccHeight").val() *
                // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
                1) /
            6000;
    } else {
        Volume =
            ($("#txtAccLength").val() *
                $("#txtAccWidth").val() *
                $("#txtAccHeight").val() *
                $("#txtAccPieces").val()) /
            6000;
    }

    tofixed = Volume.toFixed(2);

    if (isCHGWTRF == "Y") {

        var roundedVal = Math.ceil(tofixed / RoundFactorVal) * RoundFactorVal;
        tofixed = roundedVal.toFixed(2);
        $("#txtAccVolWt").val(tofixed);
    }
    else
        $("#txtAccVolWt").val(tofixed);

    var GrWtForShow = $("#txtAccPieces").val() * $("#txtGrWtShow").val() / $("#txtPcsShow").val();

    $("#txtAccGrWt").val(GrWtForShow.toFixed(2));
}

function CalculateVolForRej() {
    var Volume =
        ($("#txtRejLength").val() *
            $("#txtRejWidth").val() *
            $("#txtRejHeight").val() *
            $("#txtRejsubmitPcs").val()) /
        6000;
    tofixed = Volume.toFixed(2);
    $("#txtRejVolWt").val(tofixed);

    var GrWtForShow = $("#txtRejsubmitPcs").val() * $("#txtGrWtShow").val() / $("#txtPcsShow").val();

    $("#txtRejsubmitGrWt").val(GrWtForShow.toFixed(2));

}

function dynamicTrCreate() {
    newTextBoxDiv = $(document.createElement("tr")).attr(
        "id",
        "TextBoxDiv" + counter
    );

    newTextBoxDiv.after().html(
        '<td><input  class="textpackges text-left form-control pnlTextBox"   name="locationCode' +
        parseInt(counter + 1) +
        '" id="txtLocationCode' +
        parseInt(counter + 1) +
        '" type="text" /></td>' +
        //'<td><select name="textpackges' + parseInt(counter + 1) + '" id="ddlUOM' + parseInt(counter + 1) + '"><option value="CMT">CM</option><option value="INH">IN</option></select></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right form-control pnlTextBox"  name="pieces' +
        parseInt(counter + 1) +
        '" id="pieces' +
        parseInt(counter + 1) +
        '"  type="text" /></td>' +
        '<td style="display:none;"><input  class="textpackges text-right form-control pnlTextBox"  value="-1"  type="text" /></td>' +
        '<td><div onclick="removeRow(' +
        parseInt(counter) +
        ');"  id="btnAdd"  class="" style="margin-bottom: 2px;"><span class="glyphicon glyphicon-minus" ></span></div></td>'
    );

    newTextBoxDiv.appendTo("#TextBoxesGroup");
    counter++;

    $(".textpackges").autocomplete({ source: locationList });
}

function removeRow(counter) {
    //if (counter == 1) {
    //    // alert("No more textbox to remove");
    //    return false;
    //}

    // counter--;

    $("#TextBoxDiv" + counter).remove();
    inputRowsforDim = "";
}

function calLocationRows(idCounter) {
    var locationCode = $("#txtLocationCode" + idCounter).val();
    var Pieces = $("#pieces" + idCounter).val();

    //inputRowsforLocation +=
    //  '<Location LocationRowID = "-1" LocationCode="' +
    //  locationCode +
    //  '" Pieces="' +
    //  Pieces +
    //  '" />';

    var TableData = new Array();
    inputRowsforLocation = "";

    $("#TextBoxesGroup tr").each(function (row, tr) {
        TableData[row] = {
            ItemNum: $(tr).find("td:eq(0) input").val(),
            Itemname: $(tr).find("td:eq(1) input").val(),
            Itemname: $(tr).find("td:eq(2) input").val(),
        };
        if (
            $(tr).find("td:eq(0) input").val() != "" &&
            $(tr).find("td:eq(1) input").val() != ""
        ) {
            inputRowsforLocation +=
                '<Location LocationRowID = "' +
                $(tr).find("td:eq(2) input").val() +
                '" LocationCode="' +
                $(tr).find("td:eq(0) input").val() +
                '" Pieces="' +
                $(tr).find("td:eq(1) input").val() +
                '" />';
        }
    });
    SaveLocation();
    //  inputRowsforLocation +='<Location LocationRowID = "-1" LocationCode="' + locationCode + '" Pieces="' + Pieces +'" />';
    //  TableData = JSON.stringify(TableData);
    //  console.log(inputRowsforLocation);
    //console.log(TableData);
}

function exitModal() {
    modal.style.display = "none";
}

function GetAWBDetails() {
    if ($("#txtAWBNo").val() == "") {
        return;
    }
    clearALL();
    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";
    //  $("#hdMessage").text(Message);
    $("#ddlAccCMIN").empty();
    $("#ddlRejCMIN").empty();
    //$("#TextBoxesGroup").html('');
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetAWBDetailsV",
            data: JSON.stringify({
                strAWBNo: $("#txtAWBNo").val(),
                strAirportCity: AirportCity,
                strUserId: UserId, strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                $("#TextBoxesGroup").html("");
                counter = 0;
                Isdata = false;

                var xmlDoc = $.parseXML(Result);
                console.log("Search AWB Call");
                console.log(xmlDoc);
                _xmlDocTable = xmlDoc;
                _xmlDocTableDynamic = xmlDoc;
                $(xmlDoc)
                    .find("Table1")
                    .each(function (index) {
                        AWBRowID = $(this).find("AWBRowID").text();
                        AWBNo = $(this).find("AWBNo").text();
                        DeclaredPieces = $(this).find("DeclaredPieces").text();
                        DeclaredWeight = $(this).find("DeclaredWeight").text();
                        DeclaredChWeight = $(this).find("DeclaredChWeight").text();
                        Commodity = $(this).find("Commodity").text();
                        RejectedVolWeight = $(this).find("RejectedVolWeight").text();

                        ReceivedPieces = $(this).find("ReceivedPieces").text();
                        ReceivedWeight = $(this).find("ReceivedWeight").text();
                        ReceivedVolWeight = $(this).find("ReceivedVolWeight").text();

                        DeclaredPieces = $(this).find("DeclaredPieces").text();
                        DeclaredWeight = $(this).find("DeclaredWeight").text();
                        DeclaredVolWeight = $(this).find("DeclaredChWeight").text();

                        RejectedPieces = $(this).find("RejectedPieces").text();
                        RejectedWeight = $(this).find("RejectedWeight").text();
                        RejectedVolWeight = $(this).find("RejectedVolWeight").text();

                        NetPieces = $(this).find("NetPieces").text();
                        NetWeight = $(this).find("NetWeight").text();
                        NetVolWeight = $(this).find("NetVolWeight").text();
                        SHC = $(this).find("SHC").text();
                        SHCSpanHtml(SHC);

                        $("#txtCommodity").val(Commodity);
                        $("#txtPcsShow").val(DeclaredPieces);
                        $("#txtGrWtShow").val(DeclaredWeight);
                        // $("#txtAccGrWt").val(DeclaredWeight);
                        // $("#txtRejsubmitGrWt").val(DeclaredWeight);
                        $("#txtChWtShow").val(DeclaredChWeight);

                        $("#txtACCPcs").val(ReceivedPieces);
                        $("#txtACCGrWt").val(ReceivedWeight);
                        $("#txtACCChWt").val(ReceivedVolWeight);

                        $("#txtRejPcs").val(RejectedPieces);
                        $("#txtRejGrWt").val(RejectedWeight);
                        $("#txtRejChWt").val(RejectedVolWeight);

                        $("#txtPackagingPCSRecv").val(NetPieces);
                        $("#txtPackagingGrossWeightRecv").val(NetWeight);
                        $("#txtPackagingChargeableWeightRecv").val(NetVolWeight);

                        $("#txtPackagingPCSExp").val(DeclaredPieces);
                        $("#txtPackagingGrossWeightExp").val(DeclaredWeight);
                        $("#txtPackagingChargeableWeightExp").val(DeclaredVolWeight);

                        $("#txtPackagingPCSRecv").val(ReceivedPieces);
                        $("#txtPackagingGrossWeightRecv").val(ReceivedWeight);
                        $("#txtPackagingChargeableWeightRecv").val(ReceivedVolWeight);

                        IsTDGDone = $(this).find("IsTDGDone").text();
                        if (IsTDGDone == "Y") {
                            $("#btnSubmit").attr("disabled", "disabled");
                        } else {
                            $("#btnSubmit").removeAttr("disabled", "disabled");
                        }

                        Status = $(this).find("Status").text();

                        $("#SatusMsg").text(Status);
                    });

                UOMlist = [];

                $(xmlDoc).find("Table").each(function (index) {
                    var Value;
                    var Text;
                    Value = $(this).find("Value").text();
                    Text = $(this).find("Text").text();

                    UOMlist.push({
                        "uomid": Value,
                        "uomname": Text,
                    });

                    if (index == 0) {
                        var newOption = $("<option></option>");
                        newOption.val("0").text("Select");
                        newOption.appendTo("#ddlAccCMIN");
                    }
                    var newOption = $("<option></option>");
                    newOption.val(Value).text(Text);
                    newOption.appendTo("#ddlAccCMIN");

                    //var Value;
                    //var Text;
                    //Value = $(this).find('Value').text();
                    //Text = $(this).find('Text').text();
                    if (index == 0) {
                        var newOption = $("<option></option>");
                        newOption.val("0").text("Select");
                        newOption.appendTo("#ddlRejCMIN");
                    }
                    var newOption = $("<option></option>");
                    newOption.val(Value).text(Text);
                    newOption.appendTo("#ddlRejCMIN");
                });

                var LOC_CODE = "";
                $(xmlDoc)
                    .find("Table2")
                    .each(function (index) {
                        $("#TextBoxDiv1m").hide();
                        LocationRowID = $(this).find("LocationRowID").text();
                        pcs = $(this).find("pcs").text();
                        LOC_CODE = $(this).find("LOC_CODE").text();
                        Isdata = true;
                        //$("#TextBoxesGroup ").html('');

                        // $("#TextBoxesGroup").find("tr:gt(0)").remove();

                        var dimentiontable = document.getElementById("dimentiontable");

                        newTextBoxDiv = $(document.createElement("tr")).attr(
                            "id",
                            "TextBoxDiv" + counter
                        );

                        newTextBoxDiv.after().html(
                            '<td><input value="' +
                            LOC_CODE +
                            '" class="textpackges text-left form-control pnlTextBox"   name="locationCode' +
                            parseInt(counter + 1) +
                            '" id="txtLocationCode' +
                            parseInt(counter + 1) +
                            '" type="text" /></td>' +
                            //'<td><select name="textpackges' + parseInt(counter + 1) + '" id="ddlUOM' + parseInt(counter + 1) + '"><option value="CMT">CM</option><option value="INH">IN</option></select></td>' +
                            '<td><input value="' +
                            pcs +
                            '" onkeyup="NumberOnly(event);" class="textpackges text-right form-control pnlTextBox"  name="pieces' +
                            parseInt(counter + 1) +
                            '" id="pieces' +
                            parseInt(counter + 1) +
                            '"  type="text" /></td>' +
                            '<td style="display:none;"><input value="' +
                            LocationRowID +
                            '"  class="textpackges text-right form-control pnlTextBox"   type="hidden" /></td>' +
                            '<td><div onclick="removeRow(' +
                            parseInt(counter) +
                            ');" id="btnAdd"  ><span class="glyphicon glyphicon-minus"></span></div></td>'
                        );

                        if (counter == index) {

                            newTextBoxDiv.appendTo("#TextBoxesGroup");
                            counter++;
                        }



                        //  $('<tr id="Trdynamic" class="valp"></tr>').html('<td><input id="txtLocationCode0" value="' + LOC_CODE + '" class="loc_input form-control pnlTextBox" type="text" maxlength="20"></td><td><input value="' + pcs + '" id="pieces0" onkeyup="NumberOnly(event);" class="pieces_input form-control pnlTextBox text-right"  type="text" maxlength="20"></td><td><input type="button" id="addBtnForLocation" style="margin-bottom: 5px;" value="Delete" class="btnAdd form-control ButtonColor" /></td><td style="display:none"><input type="hidden" value="' + LocationRowID + '"</td>').appendTo('#addLocation');

                        //$("#TextBoxesGroup td").each(function () {
                        //    var tdText = $(this).text();

                        //    $("#TextBoxesGroup td")
                        //        .filter(function () {
                        //            return tdText == $(this).text();
                        //        })
                        //        .not(":first")
                        //        .remove();

                        //});
                    });



                /* newTextBoxDiv.find('input').autocomplete(locationList);*/

                if (Isdata == false) {
                    newTextBoxDiv = $(document.createElement("tr")).attr(
                        "id",
                        "TextBoxDiv" + counter
                    );

                    newTextBoxDiv
                        .after()
                        .html(
                            '<td><input class="textpackges text-left form-control pnlTextBox" id="txtLocationCode0" type="text" /></td>' +
                            '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right form-control pnlTextBox" id="pieces0" type="text" /></td>' +
                            '<td style="display:none;"><input value="-1" class="textpackges text-right form-control pnlTextBox" id="" type="text" /></td>' +
                            '<td><div  id="btnAdd" ></div></td>'
                        );

                    newTextBoxDiv.appendTo("#TextBoxesGroup");
                }

                if (LOC_CODE == "") {
                    $("#TextBoxDiv1m").show();
                    var dimentiontable = document.getElementById("dimentiontable");

                    for (var x = 2; x < dimentiontable.rows.length;) {
                        if (dimentiontable.rows[x].cells[2].innerHTML) {
                            //    if (x > 2) {
                            dimentiontable.deleteRow(x);
                            //  }
                        } else {
                            x += 2;
                        }
                    }
                    $("#TextBoxDiv1m").show();
                }

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        if (Status == "E") {
                            // $("#hdMessage").text(Message);

                            errmsg = Message + "</br>";
                            $.alert(errmsg);
                            return;
                        }
                    });

                $(".textpackges").autocomplete({ source: locationList });
            },
            error: function (msg) {
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

function SaveAcceptance() {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccPieces").val() == "") {
        errmsg = "Please enter Pieces.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccGrWt").val() == "") {
        errmsg = "Please enter Gr. Wt.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#ddlAccCMIN").val() == "0") {
        errmsg = "Please select Dimension Type.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccLength").val() == "") {
        errmsg = "Please enter Length.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccWidth").val() == "") {
        errmsg = "Please enter Width.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccHeight").val() == "") {
        errmsg = "Please enter Height.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccLength").val() == 0) {
        errmsg = "Please enter Length.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccWidth").val() == 0) {
        errmsg = "Please enter Width.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtAccHeight").val() == 0) {
        errmsg = "Please enter Height.</br>";
        $.alert(errmsg);
        return;
    }

    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";
    // var strDimentionType = $("#ddlAccCMIN").val().toString() + "~" + $("#txtAccVolWt").val().toString();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "SaveAcceptanceV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                intPieces: $("#txtAccPieces").val(),
                decGrossWeight: $("#txtAccGrWt").val(),
                strDimentionType: $("#ddlAccCMIN").val(),
                decLength: $("#txtAccLength").val(),
                decWidth: $("#txtAccWidth").val(),
                decHeight: $("#txtAccHeight").val(),
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                //console.log("save console");
                // console.log(xmlDoc);
                _xmlDocTable = xmlDoc;
                GetAWBDetails();

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        //  $("#hdMessage").text(Message);

                        errmsg = Message + "</br>";
                        $.alert(errmsg);
                        return;
                    });
            },
            error: function (msg) {
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


function GetLocationsFromMaster() {


    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";
    // var strDimentionType = $("#ddlAccCMIN").val().toString() + "~" + $("#txtAccVolWt").val().toString();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetLocationsFromMaster",
            data: JSON.stringify({
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                //console.log("save console");
                console.log(xmlDoc);
                _xmlDocTable = xmlDoc;
                locationList = [];
                $(xmlDoc).find('Table').each(function () {

                    var ID = $(this).find('ID').text();
                    var Name = $(this).find('Name').text();

                    locationList.push({ 'label': Name });

                });

                if (locationList.length > 0) {
                    $("#txtLocationCode0").autocomplete({
                        minLength: 0,
                        source: locationList,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtLocationCode0").focus();
                            $("#txtLocationCode0").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtLocationCode0").val(ui.item.label);


                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtLocationCode0").focus(function () {
                        $(this).autocomplete("search", $(this).val());
                    });
                }
                //$(xmlDoc)
                //    .find("StatusMessage")
                //    .each(function (index) {
                //        Status = $(this).find("Status").text();
                //        Message = $(this).find("Message").text();

                //        //  $("#hdMessage").text(Message);

                //        errmsg = Message + "</br>";
                //        $.alert(errmsg);
                //        return;
                //    });
            },
            error: function (msg) {
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

function CompleteAcceptance() {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    //if ($("#txtAccGrWt").val() == "") {
    //    errmsg = "Please enter Gr. Wt.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    //if ($("#ddlAccCMIN").val() == "0") {
    //    errmsg = "Please select Dimension Type.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "CompleteAcceptanceV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                // console.log("save console");
                // console.log(xmlDoc);
                _xmlDocTable = xmlDoc;

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        // $("#hdMessage").text(Message);

                        errmsg = Message + "</br>";
                        $.alert(errmsg);
                        return;
                    });
            },
            error: function (msg) {
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

function beforeCompleteAcceptance() {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }


    if (
        confirm(
            "Are you sure you want to complete Acceptance? This action cannot be revoked."
        )
    ) {
        SaveCompleteDetails();
    } else { }
}

function SaveCompleteDetails() {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    strAction = "";

    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "CompleteV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strAction: strAction,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                // console.log("save console");
                // console.log(xmlDoc);
                _xmlDocTable = xmlDoc;

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        if (Status == "A") {
                            if (confirm(Message)) {
                                SaveCompleteDetailsWithActionButton();
                            } else { }
                        } else if (Status == "E" || Status == "S") {
                            //  $("#hdMessage").text(Message);

                            errmsg = Message + "</br>";
                            $.alert(errmsg);
                            return;
                        }

                        //$("#hdMessage").text(Message);

                        //errmsg = Message + "</br>";
                        //$.alert(errmsg);
                        //return;
                    });
            },
            error: function (msg) {
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

function SaveCompleteDetailsWithActionButton() {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    strAction = "A";

    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "CompleteV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strAction: strAction,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                // console.log("save console");
                // console.log(xmlDoc);
                _xmlDocTable = xmlDoc;

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();
                        GetAWBDetails();
                        // $("#hdMessage").text(Message);
                        errmsg = Message + "</br>";
                        $.alert(errmsg);
                        return;
                    });
            },
            error: function (msg) {
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

function RejectAcceptance() {
    if ($("#txtRejsubmitPcs").val() == "") {
        errmsg = "Please enter Pieces.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtRejsubmitGrWt").val() == "") {
        errmsg = "Please enter Gr. Wt.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#ddlRejCMIN").val() == "0") {
        errmsg = "Please select Dimension Type.</br>";
        $.alert(errmsg);
        return;
    }

    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "RejectAcceptanceV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                intPieces: $("#txtRejsubmitPcs").val(),
                decGrossWeight: $("#txtRejsubmitGrWt").val(),
                strDimentionType: $("#ddlRejCMIN").val(),
                decLength: $("#txtRejLength").val(),
                decWidth: $("#txtRejWidth").val(),
                decHeight: $("#txtRejHeight").val(),
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log("save rejection");
                console.log(xmlDoc);
                _xmlDocTable = xmlDoc;
                GetAWBDetails();
                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        // $("#hdMessage").text(Message);

                        errmsg = Message + "</br>";
                        $.alert(errmsg);
                        return;
                    });
            },
            error: function (msg) {
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

function GetHistoryForAcceptance(hist) {


    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    $("#divAcceptPoPUp").html("");
    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetAcceptanceRejectionHistoryV",
            data: JSON.stringify({
                strAWBNo: $("#txtAWBNo").val(),
                strAction: hist,
                strAirportCity: AirportCity,
                strUserId: UserId, strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                console.log("rejected data");
                console.log(xmlDoc);
                var Status;

                html = "";

                html =
                    "<table id='tblDimentionAcceptance' border='1' style='padding:20px;width: 100%; background-color: white;border: 2px solid black;'>";
                html += "<thead><tr>";

                html += "<th style='background-color:#bcd233;'>NOP</th>";
                html += "<th style='background-color:#bcd233;'>Gr.Wt.</th>";
                html += "<th style='background-color:#bcd233;'>Length</th>";
                html += "<th style='background-color:#bcd233;'>Width</th>";
                html += "<th style='background-color:#bcd233;'>Height</th>";
                html += "<th style='background-color:#bcd233;'>Vol. Wt.</th>";
                html += "<th style='background-color:#bcd233;'>UOM</th>";
                html += "<th style='background-color:#bcd233;'></th>";
                html += "<th style='background-color:#bcd233;'></th>";
                // html += "<th style='background-color:#bcd233;'>Action</th>";

                html += "</tr></thead>";
                html += "<tbody>";
                flagAcc = '';
                $(xmlDoc)
                    .find("Table")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        flagAcc = '1';
                        var RowId;
                        var NOP;
                        var WEIGHT;
                        var Length;
                        var Width;
                        var Height;
                        var Volume;
                        var UOM;
                        var UOMID;
                        var dimType;

                        RowId = $(this).find("DimRowId").text();
                        NOP = $(this).find("NOP").text();
                        WEIGHT = $(this).find("Weight").text();
                        Length = $(this).find("Length").text();
                        Width = $(this).find("Width").text();
                        Height = $(this).find("Height").text();
                        Volume = $(this).find("VolumeWeight").text();
                        UOM = $(this).find("DTM_DimType1").text();
                        dimType = $(this).find("DimType").text();

                        var splitVal = dimType.toString().split('~');//5~135.00~110.00~0.00~1~D
                        UOMID = splitVal[0].toString();//DimType


                        scalDetailTableForAcceptance(RowId, NOP, WEIGHT, Length, Width, Height, Volume, UOM, UOMID, index);

                        // $('#tblDimentionAcceptance tbody').find('select').each(function (i) {
                        //     var newOption;
                        //     var newOption1;
                        //     $(_xmlDocTableDynamic).find("Table").each(function (index) {

                        //         var Value;
                        //         var Text;

                        //         Value = $(this).find("Value").text();
                        //         Text = $(this).find("Text").text();


                        //         // if (Text == UOM)
                        //         //     newOption = '<option value="' + Value + '" selected>' + Text + '</option>';
                        //         // else
                        //             newOption = '<option value="' + Value + '">' + Text + '</option>';

                        //         //  newOption.val(Value).text(Text);
                        //         newOption1 += newOption;
                        //     });


                        //     //    newOption1.appendTo($(this));
                        //     $(this).html(newOption1)
                        // });

                    });


                $(xmlDoc).find("StatusMessage").each(function (index) {
                    Status = $(this).find("Status").text();
                    Message = $(this).find("Message").text();

                });


                if (Status == "E") {
                    html = "";
                } else {
                    html += "</tbody></table>";

                    if (hist == "A") {
                        $(".modal-title").html("Acceptance History");
                    } else {
                        $(".modal-title").html("Rejection History");
                    }

                    $("#divAcceptPoPUp").html(html);
                    // modal.style.display = "block";
                    // $('#acceptanceModal').modal('toggle');
                    if (flagAcc == '1') {
                        $('#acceptanceModal').modal('toggle');
                    } else {
                        $.alert("Data not found for acceptance.");
                    }
                }


                $('#tblDimentionAcceptance tbody').find('td#fnPencil').click(function (i) {

                    // alert('You clicked row ' + ($(this).index()));
                    var trID = $(this).parent().index();
                    //commented by shruti to always disable volumentric weight
                    // $("#tblDimentionAcceptance tbody tr").find("input[type=text]").attr('disabled', 'disabled');
                    // $("#tblDimentionAcceptance tbody tr").eq(trID).find("input[type=text]").removeAttr('disabled');

                    //commented by shruti to always disable volumentric weight

                    // if (isCHGWTDSBL == "Y") {
                    //     $("#tblDimentionAcceptance tbody tr").find("input[id!=textVol]").attr('disabled', 'disabled');
                    //     $("#tblDimentionAcceptance tbody tr").eq(trID).find("input[id!=textVol]").removeAttr('disabled');
                    // }
                    // else {
                    //     $("#tblDimentionAcceptance tbody tr").find("input[type=text]").attr('disabled', 'disabled');
                    //     $("#tblDimentionAcceptance tbody tr").eq(trID).find("input[type=text]").removeAttr('disabled');
                    // }

                    $("#tblDimentionAcceptance tbody tr").find("select").attr('disabled', 'disabled');
                    $("#tblDimentionAcceptance tbody tr").eq(trID).find("select").removeAttr('disabled');


                    $(this).hide();
                    $(this).next().show();


                });

                $(xmlDoc)
                    .find("Table")
                    .each(function (index) {
                        var UOMselected = $(this).find("DTM_DimType1").text();
                        var ddID = "ddlAccCMINDynamic" + index.toString();
                        var ele = document.getElementById(ddID);
                        UOMlist.forEach(function (b) {
                            if (UOMselected == b['uomname'])
                                ele.innerHTML += '<option selected value="' + b['uomid'] + '">' + b['uomname'] + '</option>';
                            else
                                ele.innerHTML += '<option value="' + b['uomid'] + '">' + b['uomname'] + '</option>';
                        })
                    });



                //                 $('#tblDimentionAcceptance tbody').find('select').each(function (i) {
                //                     var newOption;
                //                     var newOption1;
                //                     $(_xmlDocTableDynamic).find("Table").each(function (index) {

                //                         var Value;
                //                         var Text;

                //                         Value = $(this).find("Value").text();
                //                         Text = $(this).find("Text").text();


                //                         if (Text == UOM)
                //                             newOption = '<option value="' + Value + '" selected>' + Text + '</option>';
                // else
                //                         newOption = '<option value="' + Value + '">' + Text + '</option>';

                //                         //  newOption.val(Value).text(Text);
                //                         newOption1 += newOption;
                //                     });


                //                     //    newOption1.appendTo($(this));
                //                     $(this).html(newOption1)
                //                 });


            },
            error: function (msg) {
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


function GetHistoryForRejection(hist) {
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    $("#divAcceptPoPUp").html("");
    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetAcceptanceRejectionHistoryV",
            data: JSON.stringify({
                strAWBNo: $("#txtAWBNo").val(),
                strAction: hist,
                strAirportCity: AirportCity,
                strUserId: UserId, strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                console.log("rejected data");
                console.log(xmlDoc);
                var Status;

                html = "";

                html =
                    "<table id='tblDimentionRejection' border='1' style='padding:20px;width: 100%; background-color: white;border: 2px solid black;'>";
                html += "<thead><tr>";

                html += "<th style='background-color:#bcd233;'>NOP</th>";
                html += "<th style='background-color:#bcd233;'>Gr.Wt.</th>";
                html += "<th style='background-color:#bcd233;'>Length</th>";
                html += "<th style='background-color:#bcd233;'>Width</th>";
                html += "<th style='background-color:#bcd233;'>Height</th>";
                html += "<th style='background-color:#bcd233;'>Vol. Wt.</th>";
                //html += "<th style='background-color:#bcd233;'>Edit</th>";
                html += "<th style='background-color:#bcd233;'>Delete</th>";
                // html += "<th style='background-color:#bcd233;'>Action</th>";

                html += "</tr></thead>";
                html += "<tbody>";

                flagRej = '';

                $(xmlDoc).find("Table").each(function (index) {

                    flagRej = '1';
                    var RowId;
                    var NOP;
                    var WEIGHT;
                    var Length;
                    var Width;
                    var Height;
                    var Volume;

                    RowId = $(this).find("DimRowId").text();
                    NOP = $(this).find("NOP").text();
                    WEIGHT = $(this).find("Weight").text();
                    Length = $(this).find("Length").text();
                    Width = $(this).find("Width").text();
                    Height = $(this).find("Height").text();
                    Volume = $(this).find("VolumeWeight").text();

                    scalDetailTableForRejection(RowId, NOP, WEIGHT, Length, Width, Height, Volume);
                });

                $(xmlDoc).find("StatusMessage").each(function (index) {
                    Status = $(this).find("Status").text();
                    Message = $(this).find("Message").text();

                });

                if (Status == "E") {
                    html = "";
                } else {
                    html += "</tbody></table>";

                    if (hist == "A") {
                        $(".modal-title").html("Acceptance History");
                    } else {
                        $(".modal-title").html("Rejection History");
                    }

                    $("#divRejectionPoPUp").html(html);
                    //modal.style.display = "block";
                    if (flagRej == '1') {
                        $('#rejectionModal').modal('toggle');
                    } else {
                        $.alert("Data not found for rejection.");
                    }

                }
            },
            error: function (msg) {
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
var _selectIndex = 0
function scalDetailTableForAcceptance(RowId, NOP, WEIGHT, Length, Width, Height, Volume, UOM, UOMID, valIndex) {

    _selectIndex = valIndex;
    // textBoxID = "txt" + _selectIndex.toString();
    html += "<tr " + _selectIndex + ">";
    html += "<td style='padding: 2px;display:none;' align='right'><input id='' class='form-control' type='text' value='" + RowId + "' disabled></td>";
    html += "<td style='padding: 2px;' align='right'><input id='txtAccPiecesMP" + _selectIndex + "' class='form-control' type='text' value='" + NOP + "' disabled='disabled'></td>";
    html += "<td style='padding: 2px;' align='right'><input id='' class='form-control' type='text' value='" + WEIGHT + "' disabled='disabled'></td>";
    html += "<td style='padding: 2px;' align='right'><input id='txtAccLengthMP" + _selectIndex + "' onchange='CalculateVolModal(" + _selectIndex + ")' class='form-control' type='text' value='" + Length + "' disabled='disabled'></td>";
    html += "<td style='padding: 2px;' align='right'><input id='txtAccWidthMP" + _selectIndex + "' onchange='CalculateVolModal(" + _selectIndex + ")'  class='form-control' type='text' value='" + Width + "' disabled='disabled'></td>";
    html += "<td style='padding: 2px;' align='right'><input id='txtAccHeightMP" + _selectIndex + "' onchange='CalculateVolModal(" + _selectIndex + ")'  class='form-control' type='text' value='" + Height + "' disabled='disabled'></td>";
    html += "<td style='padding: 2px;' align='right'><input id='textVol" + _selectIndex + "' class='form-control' type='text' value='" + Volume + "' disabled='disabled'></td>";

    html += "<td style='padding: 2px;' align='right'> <select class='form-control pnlTextBox' id='ddlAccCMINDynamic" + _selectIndex + "'  onchange='getValues(" + _selectIndex + ")' disabled='disabled'>></select></td>";

    //  html += "<td contenteditable='false' style='padding: 2px;' align='center'><button onclick="deleteAcceptanceDimention(\'' + RowId + '\',\'' + NOP + '\',\'' + WEIGHT + '\',\'' + Length + '\',\'' + Width + '\',\'' + Height + '\',\'' + Volume + '\')" type='button' style='background-color:#bcd233;color:black;' id='addButton' class='btn'><span class='glyphicon glyphicon-pencil'></span></button></td>";
    //html += '<td onclick="editAcceptanceDimention(\'' + RowId + '\',\'' + NOP + '\',\'' + WEIGHT + '\',\'' + Length + '\',\'' + Width + '\',\'' + Height + '\',\'' + Volume + '\',this)" style="padding: 2px;" align="center" id="pencil"><span  class="glyphicon glyphicon-pencil"></span></td>';

    html += '<td id="fnPencil"  style="padding: 2px;" align="center" id="pencil"><span  class="glyphicon glyphicon-pencil"></span></td>';
    html += '<td id="fnSaveFile" onclick="SaveDimentionGrigValue(this);hideShow(\'' + 'S' + '\');" style="padding: 2px;display:none;" align="center" id="file-save"><span  class="glyphicon glyphicon-save-file"></span></td>';
    html += '<td onclick="deleteAcceptanceDimention(\'' + RowId + '\',\'' + NOP + '\',\'' + WEIGHT + '\',\'' + Length + '\',\'' + Width + '\',\'' + Height + '\',\'' + Volume + '\')" style="padding: 2px;" align="center"><i class="glyphicon glyphicon-trash"></i></td>';

    html += "</tr>";
    //_selectIndex = _selectIndex + 1;

}

function CalculateVolModal(triiii) {

    var ctrlNameLT = "#txtAccLengthMP" + triiii.toString();
    var ctrlNameWT = "#txtAccWidthMP" + triiii.toString();
    var ctrlNameHT = "#txtAccHeightMP" + triiii.toString();
    var ctrlNamePCS = "#txtAccPiecesMP" + triiii.toString();
    var ctrlNameVolWt = "#textVol" + triiii.toString();
    var Volume;

    if (calculateByStatusMP == "D") {
        Volume =
            ($(ctrlNameLT).val() *
                $(ctrlNameWT).val() *
                $(ctrlNameHT).val() *
                // $(ctrlNamePCS).val()) /  calculate static 1 change by junaid 16032023
                1) /
            6000;
    } else {
        Volume =
            ($(ctrlNameLT).val() *
                $(ctrlNameWT).val() *
                $(ctrlNameHT).val() *
                $(ctrlNamePCS).val()) /

            6000;
    }
    tofixed = Volume.toFixed(2);

    if (isCHGWTRF == "Y") {
        var roundedVal = Math.ceil(tofixed / RoundFactorVal) * RoundFactorVal;
        tofixed = roundedVal.toFixed(2);
        $(ctrlNameVolWt).val(tofixed);
    }
    else
        $(ctrlNameVolWt).val(tofixed);
}


function getValues(triiii) {
    var ctrlName = "#ddlAccCMINDynamic" + triiii.toString();

    var ctrlNameLT = "#txtAccLengthMP" + triiii.toString();
    var ctrlNameWT = "#txtAccWidthMP" + triiii.toString();
    var ctrlNameHT = "#txtAccHeightMP" + triiii.toString();
    var ctrlNamePCS = "#txtAccPiecesMP" + triiii.toString();

    var ctrlNameVolWt = "#textVol" + triiii.toString();

    _Value = $("option:selected", ctrlName).val();
    _Text = $("option:selected", ctrlName).text();
    //    // var trID = $(this).index();
    //     alert(_Value);
    //     alert(_Text);


    var changeAccLengthMP = _Value.split("~")[1];
    var changeAccWidthMP = _Value.split("~")[2];
    var changeAccHeightMP = _Value.split("~")[3];

    var StatusMP = _Value.split("~")[5];
    calculateByStatusMP = _Value.split("~")[5];
    $(ctrlNameLT).val("");
    $(ctrlNameWT).val("");
    $(ctrlNameHT).val("");

    $(ctrlNameLT).removeAttr("disabled");
    $(ctrlNameWT).removeAttr("disabled");
    $(ctrlNameHT).removeAttr("disabled");


    $(ctrlNameVolWt).attr("disabled", "disabled");

    // 1~0.00~0.00~0.00~0~E
    //changeAccVolWt = _Value.split("~")[1]
    if (StatusMP == "E") {
        // if ($("#txtAccPieces").val() == "") {
        //     errmsg = "Please enter Pieces.</br>";
        //     $.alert(errmsg);
        //     return;
        // }
        var piecesMP = $(ctrlNamePCS).val();


        $(ctrlNameLT).val(changeAccLengthMP).attr("disabled", "disabled");
        $(ctrlNameWT).val(changeAccWidthMP).attr("disabled", "disabled");
        $(ctrlNameHT).val(changeAccHeightMP).attr("disabled", "disabled");


        if (changeAccLengthMP == 0)
            $(ctrlNameLT).removeAttr("disabled");
        if (changeAccWidthMP == 0)
            $(ctrlNameWT).removeAttr("disabled");
        if (changeAccHeightMP == 0)
            $(ctrlNameHT).removeAttr("disabled");

        // var Volume =
        //     ($(ctrlNameLT).val() *
        //         $(ctrlNameWT).val() *
        //         $(ctrlNameHT).val() *
        //         $(ctrlNamePCS).val()) /
        //     6000;
        var Volume = (changeAccLengthMP * changeAccWidthMP * changeAccHeightMP * piecesMP) / 6000;
        tofixed = Volume.toFixed(2);

        if (isCHGWTRF == "Y") {
            var roundedVal = Math.ceil(tofixed / RoundFactorVal) * RoundFactorVal;
            $(ctrlNameVolWt).val(roundedVal);
        }
        else
            $(ctrlNameVolWt).val(tofixed);



    } else if (StatusMP == "D") {



        $(ctrlNameLT).val(changeAccLengthMP).attr("disabled", "disabled");
        $(ctrlNameWT).val(changeAccWidthMP).attr("disabled", "disabled");
        $(ctrlNameHT).val(changeAccHeightMP).attr("disabled", "disabled");

        var piecesMP = $(ctrlNamePCS).val();

        if (changeAccLengthMP == 0)
            $(ctrlNameLT).removeAttr("disabled");
        if (changeAccWidthMP == 0)
            $(ctrlNameWT).removeAttr("disabled");
        if (changeAccHeightMP == 0)
            $(ctrlNameHT).removeAttr("disabled");


        var Volume = (changeAccLengthMP * changeAccWidthMP * changeAccHeightMP * piecesMP) / 6000;
        tofixed = Volume.toFixed(2);


        if (isCHGWTRF == "Y") {
            var roundedVal = Math.ceil(tofixed / RoundFactorVal) * RoundFactorVal;
            $(ctrlNameVolWt).val(roundedVal);
        }
        else
            $(ctrlNameVolWt).val(tofixed);
    }
}




function scalDetailTableForRejection(RowId, NOP, WEIGHT, Length, Width, Height, Volume) {
    html += "<tr>";
    html += "<td  style='padding: 2px;' align='right'>" + NOP + "</td>";
    html += "<td  style='padding: 2px;' align='right'>" + WEIGHT + "</td>";
    html += "<td  style='padding: 2px;' align='right'>" + Length + "</td>";
    html += "<td  style='padding: 2px;' align='right'>" + Width + "</td>";
    html += "<td  style='padding: 2px;' align='right'>" + Height + "</td>";
    html += "<td  style='padding: 2px;' align='right'>" + Volume + "</td>";
    //html += "<td contenteditable='false' style='padding: 2px;' align='center'><button type='button' style='background-color:#bcd233;color:black;' id='addButton' class='btn'><span class='glyphicon glyphicon-pencil'></span></button></td>";
    html += '<td  style="padding: 2px;" align="center" onclick="deleteRejectionDimention(\'' + RowId + '\')"><span class="glyphicon glyphicon-trash"></span></td>';


    //   html +=
    //     "<td  onclick='CargoAcceptance_Edit_AcceptedListRow(" +
    //     RowId +
    //     ")' align='center'><input type='button' id='btnLocate' class='form-control ButtonColor' value='Edit'/></td>";

    html += "</tr>";
}

//function editAcceptanceDimention(parm) {
//    $('#tblDimentionAcceptance tbody').find('td#fnPencil').click(function (i) {

//        // alert('You clicked row ' + ($(this).index()));
//        var trID = $(this).parent().index();
//        $("#tblDimentionAcceptance tbody tr").find("input[type=text]").attr('disabled', 'disabled');
//        $("#tblDimentionAcceptance tbody tr").eq(trID).find("input[type=text]").removeAttr('disabled');

//        //$("#tblDimentionAcceptance tbody tr").eq(trID).find("span").show('.glyphicon-save-file');
//        // $("#tblDimentionAcceptance tbody tr").eq(trID).find("span").hide('.glyphicon-pencil');


//    });
//    //var index = $('table tr').index(tr);
//    //var trID = parm.rowIndex;

//    //$("#tblDimentionAcceptance tbody tr").find("input[type=text]").attr('disabled', 'disabled');
//    //$("#tblDimentionAcceptance tbody tr").eq(trID).find("input[type=text]").removeAttr('disabled');

//    //$("#tblDimentionAcceptance tbody tr").eq(1).find("input[type=text]");

//}

function hideShow(prm) {


    if (prm == 'P') {
        $("#fnPencil").hide();
        $("#fnSaveFile").show();
    } else {
        $("#fnPencil").show();
        $("#fnSaveFile").hide();
    }
}

function SaveDimentionGrigValue() {


    $('#tblDimentionAcceptance tbody').find('tr').click(function () {
        var trID = $(this).index();
        var dimArray = [];
        //  $("#tblDimentionAcceptance tbody tr").find("input[type=text]").attr('disabled', 'disabled');
        $("#tblDimentionAcceptance tbody tr").eq(trID).find("input[type=text]").each(function () {

            dimArray.push(this.value);

        });

        var UOMValue = $("#tblDimentionAcceptance tbody tr").eq(trID).find("select").val();// $(this).attr("id");

        a = dimArray[0];
        console.log(
            "intAWBRowId: " + AWBRowID,
            "intPartAcceptRowId: " + dimArray[0],
            "strActionFlag: " + 'I',
            "intPieces: " + dimArray[1],
            "decGrossWeight: " + dimArray[2],
            "strDimentionType:" + UOMValue,
            "decLength: " + dimArray[3],
            "decWidth: " + dimArray[4],
            "decHeight: " + dimArray[5],
            "strAirportCity: " + AirportCity,
            "strUserId: " + UserId)

        $("#acceptanceModal").modal("toggle");
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UpdateAcceptanceV",
            data: JSON.stringify({

                "intAWBRowId": AWBRowID,
                "intPartAcceptRowId": dimArray[0],
                "strActionFlag": 'I',
                "intPieces": dimArray[1],
                "decGrossWeight": dimArray[2],
                "strDimentionType": UOMValue,
                "decLength": dimArray[3],
                "decWidth": dimArray[4],
                "decHeight": dimArray[5],
                "strAirportCity": AirportCity,
                "strUserId": UserId,
                "strVal": deviceUUID


            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var str = response.d;
                var xmlDoc = $.parseXML(response.d);

                $(xmlDoc).find("StatusMessage").each(function (index) {
                    Status = $(this).find("Status").text();
                    Message = $(this).find("Message").text();
                    $.alert(Message);
                });

                GetAWBDetails();

            },
            error: function (msg) {
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
            }
        });
        return true;



    });

}


function deleteAcceptanceDimention(RowId, NOP, WEIGHT, Length, Width, Height, Volume) {
    $("#tblDimentionAcceptance tbody tr").find("input[type=text]").attr('disabled', 'disabled');
    console.log(
        "intAWBRowId: " + AWBRowID,
        "intPartAcceptRowId: " + RowId,
        "strActionFlag: " + 'D',
        "intPieces: " + NOP,
        "decGrossWeight: " + WEIGHT,
        "strDimentionType: " + Volume,
        "decLength: " + Length,
        "decWidth: " + Width,
        "decHeight: " + Height,
        "strAirportCity: " + AirportCity,
        "strUserId: " + UserId)
    if (confirm("Are you sure you want to delete this record?") == true) {
        $("#acceptanceModal").modal("toggle");
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "UpdateAcceptanceV",
            data: JSON.stringify({

                intAWBRowId: AWBRowID,
                intPartAcceptRowId: RowId,
                strActionFlag: 'D',
                intPieces: NOP,
                decGrossWeight: WEIGHT,
                strDimentionType: '',
                decLength: Length,
                decWidth: Width,
                decHeight: Height,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var str = response.d;
                var xmlDoc = $.parseXML(response.d);

                $(xmlDoc).find("StatusMessage").each(function (index) {
                    Status = $(this).find("Status").text();
                    Message = $(this).find("Message").text();
                    $.alert(Message);
                });

                GetAWBDetails();

            },
            error: function (msg) {
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
            }
        });
        return true;
    } else {
        return false;
    }

}


function deleteRejectionDimention(RowId) {
    if (confirm("Are you sure you want to delete this record?") == true) {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "DeleteRejectionV",
            data: JSON.stringify({
                intAWBRowId: AWBRowID,
                intPartRejectedRowId: RowId,
                strAirportCity: AirportCity,
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var str = response.d;
                var xmlDoc = $.parseXML(response.d);
                $('#rejectionModal').modal('hide');
                $(xmlDoc).find("StatusMessage").each(function (index) {
                    Status = $(this).find("Status").text();
                    Message = $(this).find("Message").text();
                    $.alert(Message);
                });

                GetAWBDetails();

            },
            error: function (msg) {
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
            }
        });
        return true;
    } else {
        return false;
    }


    // tblDimention

}

function CargoAcceptance_Edit_AcceptedListRow(RowId) {
    var inputxml = "";

    var connectionStatus = navigator.onLine ? "online" : "offline";

    var errmsg = "";

    inputxml =
        "<Root><RowId>" +
        RowId +
        "</RowId><UserId>" +
        UserId +
        "</UserId><AirportCity>" +
        AirportCity +
        "</AirportCity></Root>";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "CargoAcceptance_Delete_AcceptedListRow",
            data: JSON.stringify({
                InputXML: inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $("body").mLoading("hide");
                var str = response.d;
                // console.log(response.d);
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);
                    _xmlDocTable = xmlDoc;
                    $(xmlDoc)
                        .find("Table")
                        .each(function (index) {
                            Status = $(this).find("Status").text();
                            StrMessage = $(this).find("msg").text();
                            if (Status == "E") {
                                $("body").mLoading("hide");
                                $.alert(StrMessage);
                            } else if (Status == "S") {
                                $("body").mLoading("hide");
                                $.alert(StrMessage);
                            } else {
                                $("body").mLoading("hide");
                                $.alert(StrMessage);
                            }
                        });
                }
            },
            error: function (msg) {
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

function SaveLocation() {

    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }
    if (inputRowsforLocation == "") {
        errmsg = "Please enter Location and Pieces.</br>";
        $.alert(errmsg);
        return;
    }
    //var $input;
    //var formElements = new Array();
    //var firstTextBox = parseInt($("#Pieces1").val())
    //$('#TextBoxesGroup').find('input').each(function (i, input) {
    //    $input = $(input);
    //    $input.css('background-color', $input.val() ? '#fff' : '#FFB6C1');
    //    formElements.push($input.val());
    //    return;
    //});
    //if ($input.val() == '') {

    //    $input.css('background-color', $input.val() ? '#fff' : '#FFB6C1');
    //    return;
    //}

    //if (num == 1) {
    //    errmsg = "Please enter Location and Pieces.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

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
                strUserId: UserId,
                strVal: deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                //console.log("save location");
                //console.log("Location", xmlDoc);
                _xmlDocTable = xmlDoc;

                $(xmlDoc)
                    .find("StatusMessage")
                    .each(function (index) {
                        Status = $(this).find("Status").text();
                        Message = $(this).find("Message").text();

                        //  $("#hdMessage").text(Message);
                        GetAWBDetails();
                        // inputRowsforLocation = "";
                        errmsg = Message + "</br>";
                        $.alert(errmsg);
                        return;
                    });
            },
            error: function (msg) {
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

function clearALL() {
    $("#txtAccPieces").val("");
    $("#txtAccGrWt").val("");
    $("#txtRejsubmitPcs").val("");
    $("#txtRejsubmitGrWt").val("");

    $("#txtAccLength").removeAttr("disabled");
    $("#txtAccWidth").removeAttr("disabled");
    $("#txtAccHeight").removeAttr("disabled");
    $("#txtRejLength").removeAttr("disabled");
    $("#txtRejWidth").removeAttr("disabled");
    $("#txtRejHeight").removeAttr("disabled");
    //   $("#txtAccVolWt").removeAttr("disabled");
    //   $("#txtRejVolWt").removeAttr("disabled");


    $("#txtAccLength").val("");
    $("#txtAccWidth").val("");
    $("#txtAccHeight").val("");
    $("#txtRejLength").val("");
    $("#txtRejWidth").val("");
    $("#txtRejHeight").val("");
    $("#txtAccVolWt").val("");
    $("#txtRejVolWt").val("");
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function ClearFields() {
    $("input[type=text]").val("");
    $("input[type=number]").val("");
    $("#TextBoxDiv").empty();
    $("#SatusMsg").text('');
    $("#txtAWBNo").focus();
    $("#ddlAccCMIN").val("");
    // var newOption = $("<option></option>");
    // newOption.val("0").text("Select");
    // newOption.appendTo("#ddlRejCMIN");
}





