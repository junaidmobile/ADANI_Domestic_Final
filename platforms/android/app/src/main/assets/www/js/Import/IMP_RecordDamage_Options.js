var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("MU_CITY_C");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var AWB_Number = localStorage.getItem('AWB_Number');
var HAWB_Number = localStorage.getItem('HAWB_Number');
var Flight_Seq_No = localStorage.getItem('Flight_Seq_No');
var IMPAWBROWID = localStorage.getItem('IMPSHIPROWID');
var IMPSHIPROWID = localStorage.getItem('IMPSHIPROWID');
var imageUplaodID = localStorage.getItem('imageUplaodID');

var imgDataForSave = '';
var increamentVal = 1;
var _xmlDocTable;
var i = 1;
var AIRLINE_PREFIX;
var AWB_NUMBER;
var SEQUENCE_NUMBER = '';
var BOOKED_FLIGHT_SEQUENCE_NUMBER;

var IMPSHIPROWID;
var ImagesXmlGen = '';
var _DamageDataXML2, _ShipTotalPcsXML2, _PackagingXML3, _OuterPackingXML4, _InnerPackingXML5, _IsSufficientXML6;
var _DamageObserContainersXML7, _SpaceForMissingXML8, _SpaceForMissingXML9, _DamageRemarkedXML10, _DispositionXML11;
$(function () {


    GetImportDamageRecordDetails();

    document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);

    $('#txtIndividualWt').keyup(function () {
        var val = $(this).val();
        if (isNaN(val)) {
            val = val.replace(/[^0-9\.]/g, '');
            if (val.split('.').length > 2)
                val = val.replace(/\.+$/, "");
        }
        $(this).val(val);
    });

    $('#txtPckgsRCV').keyup(function () {
        var val = $(this).val();
        if (isNaN(val)) {
            val = val.replace(/[^0-9\.]/g, '');
            if (val.split('.').length > 2)
                val = val.replace(/\.+$/, "");
        }
        $(this).val(val);
    });

    $(".next").click(function () {

        var typeofDisvalues = '';
        if (increamentVal == 1) {

            $('#divTypeofdiscrepancy').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    typeofDisvalues = $(this).attr('id');
                    // console.log(typeofDisvalues)
                    //if ($('#txtPckgsEXP').val() == "" ) {
                    //    $('#emMsg').text('Please enter damage Pcs.').css('color', 'red');
                    //    $('#txtPckgsEXP').focus();
                    //    //alert('Please enter damage Pcs. and Wt.');
                    //    return;
                    //} else if ($('#txtPckgsRCV').val() == "") {
                    //    $('#emMsg').text('Please enter damage Wt.').css('color', 'red');
                    //    $('#txtPckgsRCV').focus();
                    //} else {
                    //    $('#emMsg').text('');
                    //}
                });
            });

        }

        if (increamentVal == 2) {

            $('#divTypeofdiscrepancy').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    typeofDisvalues = $(this).attr('id');
                    //  console.log(typeofDisvalues)
                });
            });
            if ($('#txtPckgsEXP').val() == "") {
                $('#emMsg').text('Please enter damage Pcs.').css('color', 'red');
                $('#txtPckgsEXP').focus();
                //alert('Please enter damage Pcs. and Wt.');
                return;
            }
            if ($('#txtPckgsRCV').val() == "") {
                $('#emMsg').text('Please enter damage Wt.').css('color', 'red');
                $('#txtPckgsRCV').focus();
                return;
            } else {
                $('#emMsg').text('');
            }
            //if ($('#txtPckgsEXP').val() == "" || $('#txtPckgsRCV').val() == "") {
            //    $('#emMsg').text('Please enter damage Pcs. and Wt.').css('color', 'red');
            //    //alert('Please enter damage Pcs. and Wt.');
            //    return;
            //} else {
            //    $('#emMsg').text('');
            //}
            _DamageDataXML2 = '<Imh_RowID>' + IMPAWBROWID + '</Imh_RowID><AWB_NUMBER>' + AWB_Number + '</AWB_NUMBER>' +
                '<BOOKED_FLIGHT_SEQUENCE_NUMBER>' + Flight_Seq_No + '</BOOKED_FLIGHT_SEQUENCE_NUMBER><UserID>' + UserID + '</UserID>' +
                '<TYPE_DISCREPANCY>' + typeofDisvalues + '</TYPE_DISCREPANCY>';

            _ShipTotalPcsXML2 = '<INDI_WT_DAMAGE>0</INDI_WT_DAMAGE>' +
                '<IND_WT_PER_DOCUMENT>' + $('#txtIndividualWt').val() + '</IND_WT_PER_DOCUMENT>' +
                '<IND_WT_ACTUAL_CHECK>' + $('#txtIndividualActualWt').val() + '</IND_WT_ACTUAL_CHECK>' +
                '<IND_WT_DIFFERENCE>' + $('#diffrent').text() + '</IND_WT_DIFFERENCE>' +
                '<TOT_PCS_ACTUAL_CHECK>' + $('#txtPckgsEXP').val() + '</TOT_PCS_ACTUAL_CHECK>' +
                '<TOT_WT_ACTUAL_CHECK>' + $('#txtPckgsRCV').val() + '</TOT_WT_ACTUAL_CHECK>' +
                '<TOT_WT_DIFFERENCE>' + $('#lblWtRec').text() + '</TOT_WT_DIFFERENCE>' +
                '<TOT_PCS_DIFFERENCE>' + $('#lblNPR').text() + '</TOT_PCS_DIFFERENCE>' +
                '<TOT_PCS_SHIPED_AWB>' + $('#lblNPX').text() + '</TOT_PCS_SHIPED_AWB>' +
                '<TOT_WT_SHIPED_AWB>' + $('#lblWtExp').text() + '</TOT_WT_SHIPED_AWB>' +
                '<IND_Pcs_ACTUAL_CHECK>' + $('#txtIndividualActualWt').val() + '</IND_Pcs_ACTUAL_CHECK>' +
                '<IND_Pcs_PER_DOCUMENT>' + $('#txtIndividualWt').val() + '</IND_Pcs_PER_DOCUMENT>';
            //console.log(_DamageDataXML2)
            //console.log(_ShipTotalPcsXML2)
        }

        if (increamentVal == 3) {
            var Materialvalues = [];

            $('#divChkMaterial').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Materialvalues.push($(this).attr('id'));
                });
            });
            var MaterialVal = Materialvalues.join(",");

            var Typevalues = [];
            $('#divType').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Typevalues.push($(this).attr('id'));
                });
            });
            var TypelVal = Typevalues.join(",");

            var MarkanLabelvalues = [];
            $('#divMarkanLabel').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    MarkanLabelvalues.push($(this).attr('id'));
                });
            });
            var MarkanLabelVal = MarkanLabelvalues.join(",");

            var OuterPackingvalues = [];
            $('#divOuterPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    OuterPackingvalues.push($(this).attr('id'));
                });
            });
            var OuterPackingVal = OuterPackingvalues.join(",");

            _PackagingXML3 = '<PACK_CONTAINER_MATERIAL>' + MaterialVal + '</PACK_CONTAINER_MATERIAL><PACK_CONTAINER_TYPE>' + TypelVal + '</PACK_CONTAINER_TYPE>' +
                '<PACK_MARKS_LABELS>' + MarkanLabelVal + '</PACK_MARKS_LABELS>';
            // console.log(_PackagingXML3)
        }

        if (increamentVal == 4) {

            var OuterPackingvalues = [];
            $('#divOuterPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    OuterPackingvalues.push($(this).attr('id'));
                });
            });
            var OuterPackingVal = OuterPackingvalues.join(",");

            _OuterPackingXML4 = '<PACK_OUTER_PACKING>' + OuterPackingVal + '</PACK_OUTER_PACKING>';
            // console.log(_OuterPackingXML4)
        }

        if (increamentVal == 5) {
            var InnerPackingvalues = [];
            $('#divInnerPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    InnerPackingvalues.push($(this).attr('id'));
                });
            });
            var InnerPackingVal = InnerPackingvalues.join(",");
            _InnerPackingXML5 = '<PACK_INNER_PACKING>' + InnerPackingVal + '</PACK_INNER_PACKING>';
            //  console.log(_InnerPackingXML5)

        }

        if (increamentVal == 6) {
            var DetalofDamageObservedvalues = [];
            var DetalofDamageObservedvaluesoftextbox = [];
            var isPackRadiovalues = [];

            $('#isPackRadio').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {

                    /* var id = $(this).attr('id');*/
                    isPackRadiovalues.push($(this).attr('id'));
                });
            });

            //$('#divDetalofDamageObserved').each(function () {
            //    $(this).find("input[type='checkbox']:checked").each(function () {
            //        /* var id = $(this).attr('id');*/
            //        InnerPackingvalues.push($(this).attr('id'));
            //    });
            //});

            var course_arr = [];
            var allBoxVal;
            //$('#divDetalofDamageObserved').each(function () {
            //    $(this).find("input[type*='number']").each(function () {
            //        if ($(this).val() != "") {
            //            course_arr.push($(this).attr('id') + '~' + $(this).val());
            //        } else {
            //            //  alert('please enter pieces');

            //        }
            //    });

            //});

            $('#divDetalofDamageObserved').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    course_arr.push($(this).attr('id'));
                });
            });



            //$('#divDetalofDamageObserved').each(function () {
            //    $(this).find("input[type='checkbox']:checked").each(function () {

            //        $(this).find("input[type*='number']").each(function () {
            //            if ($(this).val() != "") {
            //                course_arr.push($(this).attr('id') + '~' + $(this).val());
            //            } else {
            //                alert('please enter pieces');
            //                return;
            //            }

            //        });
            //    });
            //});

            var DetalofDamageObservedVal = course_arr.join(",");

            console.log(DetalofDamageObservedVal)
            _IsSufficientXML6 = '<PACK_IS_SUFFICIENT>' + isPackRadiovalues + '</PACK_IS_SUFFICIENT><DAMAGE_CONTAINER>' + DetalofDamageObservedVal + '</DAMAGE_CONTAINER>';
            //   console.log(_IsSufficientXML6)
        }

        if (increamentVal == 6) {
            $('#divDetalofDamageObserved input:checkbox').each(function () {
                if (this.checked) {
                    if ($(this).closest("tr").find('.checkontext').val() == '') {

                    }
                }
            });

        }

        if (increamentVal == 7) {
            var Containersvalues = [];

            $('#divContainers').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Containersvalues.push($(this).attr('id'));
                });
                //$(this).find("input[type*='number']").each(function () {
                //    if ($(this).val() != "") {
                //        Containersvalues.push($(this).attr('id') + '~' + $(this).val());
                //    }
                //});
            });
            var ContainersVal = Containersvalues.join(",");
            console.log(ContainersVal)
            var DamageDiscoveredvalues = [];

            $('#divDamageDiscovered').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DamageDiscoveredvalues.push($(this).attr('id'));
                });
            });
            var DamageDiscoveredVal = DamageDiscoveredvalues.join(",");

            _DamageObserContainersXML7 = '<DAMAGE_CONTAINERS>' + ContainersVal + '</DAMAGE_CONTAINERS>' +
                '<DAMAGE_DISCOVERED>' + DamageDiscoveredVal + '</DAMAGE_DISCOVERED>';
            // console.log(_DamageObserContainersXML7)
        }

        if (increamentVal == 8) {
            var Spacemissingvalues = [];

            $('#divrbtSpacemissing').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Spacemissingvalues.push($(this).attr('id'));
                });
            });


            var Inviocevalues = [];

            $('#divrbtInvioce').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Inviocevalues.push($(this).attr('id'));
                });
            });


            var WeatherConditionvalues = [];

            $('#divWeatherCondition').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    WeatherConditionvalues.push($(this).attr('id'));
                });
            });
            var WeatherConditionVal = WeatherConditionvalues.join(",");

            var DamageApparentlycausedbyvalues = [];

            $('#divTheDamageApparentlycausedby').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DamageApparentlycausedbyvalues.push($(this).attr('id'));
                });
            });
            var DamageApparentlycausedbyVal = DamageApparentlycausedbyvalues.join(",");
            _SpaceForMissingXML8 = '<DAMAGE_SPACE_MISSING>' + Spacemissingvalues + '</DAMAGE_SPACE_MISSING><DAMAGE_VERIFIED_INVOICE>' + Inviocevalues + '</DAMAGE_VERIFIED_INVOICE><WEATHER_CONDATION>' + WeatherConditionVal + '</WEATHER_CONDATION><DAMAGE_APPARENT_CAUSE>' + DamageApparentlycausedbyVal + '</DAMAGE_APPARENT_CAUSE>';
            //  console.log(_SpaceForMissingXML8)
        }

        if (increamentVal == 9) {
            if ($('#txtAreaRemarkincase').val().trim() == '') {
                $('#emMsgRem').text('Please enter remark.').css('color', 'red');
                $('#txtAreaRemarkincase').focus();
                $('#txtAreaRemarkincase').val('');
                //alert('Please enter damage Pcs. and Wt.');
                return;
            } else {
                $('#emMsgRm').text('');
            }
            var Evidancevalues = [];

            $('#divrbtEvidance').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Evidancevalues.push($(this).attr('id'));
                });
            });

            var SalvageActionvalues = [];

            $('#divSalvageAction').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    SalvageActionvalues.push($(this).attr('id'));
                });
            });

            var SalvageActionVal = SalvageActionvalues.join(",");

            _DamageRemarkedXML10 = '<DAMAGE_REMARKED>' + $('#txtExactWording').val() + '</DAMAGE_REMARKED><DAMAGE_EVIDENCE_PILFERAGE>' + Evidancevalues + '</DAMAGE_EVIDENCE_PILFERAGE><REMARKS>' + $('#txtAreaRemarkincase').val() + '</REMARKS><ACTION_SALVAGE>' + SalvageActionVal + '</ACTION_SALVAGE>';
            //  console.log(_DamageRemarkedXML10)
        }


        //Show previous button

        $('.pre').show();

        //Find the element that's currently showing
        $showing = $('.content .first.visible').first();

        //Find the next element
        $next = $showing.next();

        //Change which div is showing
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        //If there's no more elements, hide the NEXT button
        if (!$next.next().length) {
            // $(this).hide();
        }
        if (increamentVal == 9) {
            $(this).hide();
        }
        i++;
        increamentVal = i;
        //  console.log(increamentVal);
    });

    $(".pre").click(function () {
        $('.next').show();
        $('#emMsgRem').text('');
        $('#onlyimageCount').text('');
        $('#emMsg').text('');
        $("#cameraTakePicture").removeAttr('disabled');
        // imageDataForArray = [];
        // ImagesXmlGen = '';
        //$('#divImages').empty();
        $showing = $('.content .first.visible').first();
        $next = $showing.prev();
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        if (!$next.prev().length) {
            // $(this).hide();
        }
        i--;
        increamentVal = i;
        if (increamentVal == 0) {
            window.location.href = 'IMP_RecordDamage.html';
            return
        }

        $('#divDetalofDamageObserved input:checkbox').each(function () {
            if (this.checked) {
                $(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', '1px solid #ccc');

            }
        });

        $('#divContainers input:checkbox').each(function () {
            if (this.checked) {
                $(this).closest("tr").find('.checkontextContainer').removeAttr("disabled").css('border', '1px solid #ccc');
            }
        });
    });

    $('#btnRecordDamage').click(function () {
        /*  AllImages(imageDataForArray);*/
        //if (increamentVal == 11) {
        //  AllImages(imageDataForArray);
        var Dispositionvalues = [];

        $('#divDisposition').each(function () {
            $(this).find("input[type='checkbox']:checked").each(function () {
                /* var id = $(this).attr('id');*/
                Dispositionvalues.push($(this).attr('id'));
            });
        });

        var Disposition = Dispositionvalues.join(",");

        //_DispositionXML11 = '<ACTION_DISPOSITION>' + Disposition + '</ACTION_DISPOSITION><GHARepresent>' + $('#txtGHARepresentative').val() + '</GHARepresent><AirlineRepresent>' + $('#txtAirlineRepresentative').val() + '</AirlineRepresent>' +
        //    '<SecurityRepresent>' + $('#txtSecurityRepresentative').val() + '</SecurityRepresent><ProblemSeqId>' + SEQUENCE_NUMBER + '</ProblemSeqId>' + ImagesXmlGen + '';
        _DispositionXML11 = '<ACTION_DISPOSITION>' + Disposition + '</ACTION_DISPOSITION>';
        if (ImagesXmlGen == '') {
            ImagesXmlGen = '<DamageRecordImage></DamageRecordImage>';
        }

        var finalXML = '<Root>' + _DamageDataXML2 + _ShipTotalPcsXML2 + _PackagingXML3 + _OuterPackingXML4 + _InnerPackingXML5 + _IsSufficientXML6 +
            _DamageObserContainersXML7 + _SpaceForMissingXML8 + _DamageRemarkedXML10 + _DispositionXML11 + '</Root>';
        // console.log(finalXML);
        SaveImportDamageRecordDetails(finalXML);

        $('#txtAreaRemark').val($('#txtAreaRemarkincase').val())
        $('#myModal').modal('toggle');
        // }
    });



});// JavaScript source code
var imageDataForArray = new Array();
function cameraTakePicture() {

    navigator.camera.getPicture(onSuccess, onFail, {
        //quality: 100,
        //encodingType: Camera.EncodingType.JPEG,
        ////allowEdit: true,
        ////correctOrientation: true,
        //targetWidth: 250,
        //targetHeight: 250,
        //destinationType: Camera.DestinationType.DATA_URL
        destinationType: Camera.DestinationType.DATA_URL, //DATA_URL , FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true,
        correctOrientation: true //Corrects Android orientation quirks
    });

    //var options = {
    //    quality: 50,
    //    destinationType: Camera.DestinationType.DATA_URL,
    //    sourceType: Camera.PictureSourceType.CAMERA,
    //    mediaType: Camera.MediaType.CAMERA,
    //    encodingType: Camera.EncodingType.JPEG,
    //    saveToPhotoAlbum: true
    //};
    //navigator.camera.getPicture(onSuccess, onFail, options);
}


function onSuccess(imageData) {
    //var image = document.getElementById('myImage');
    var data = "data:image/jpeg;base64," + imageData;
    imgDataForSave = imageData;
    //$('#myImage').attr('src', data);
    //$('#myImage').css('display', 'block');
    // console.log(imgData);
    imageDataForArray.push(imgDataForSave);
    htmlImages = '';
    // $("#onlyimageCount").text(imageDataForArray.length);
    //for (var i = 0; i < imageDataForArray.length; i++) {
    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
    htmlImages += '</div>';

    $('#divImages').append(htmlImages);
    if (imageDataForArray.length == 10) {
        $("#cameraTakePicture").attr('disabled', 'disabled');
    }
    console.log(imageDataForArray);

}






//if (imageDataForArray.length == 1) {
//    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
//    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
//    htmlImages += '</div>';
//}
//if (imageDataForArray.length == 2) {
//    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
//    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
//    htmlImages += '</div>';
//}
//if (imageDataForArray.length == 3) {
//    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
//    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
//    htmlImages += '</div>';
//}




function onFail(message) {
    //  alert('Failed because: ' + message);
}


function AllImages(imageDataForArray) {
    // ImagesXmlGen = "<DamageRecordImage>";
    for (var n = 0; n < imageDataForArray.length; n++) {
        ImagesXmlGen += "<DamageRecordImage><images>" + imageDataForArray[n] + "</images></DamageRecordImage>";
    }
    // ImagesXmlGen += "</DamageRecordImage>";
    //  console.log(ImagesXmlGen);
    return ImagesXmlGen;

}

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



function backPrevPage() {
    localStorage.removeItem('AWB_Number');
    localStorage.removeItem('HAWB_Number');
    localStorage.removeItem('Flight_Seq_No');
    localStorage.removeItem('allIDs');
    window.location.href = 'IMP_RecordDamage.html'
}

function calculateDiff() {
    var T_Pcs = parseInt($('#lblNPX').text());
    var D_Pcs = parseInt($('#txtPckgsEXP').val());

    if ($('#txtPckgsEXP').val() == '') {
        $('#lblNPR').text('');
        return;
    }

    if (T_Pcs < D_Pcs) {
        $('#emMsg').text('Damage pcs cannot be greater than Shipment Rcvd pcs.').css('color', 'red');
        $('#txtPckgsEXP').val('');

        $('#lblNPR').text('');
        return;
    } else {

        $('#emMsg').text('');
        DiffPcs = T_Pcs - D_Pcs

        if (!isNaN(DiffPcs)) {
            $('#lblNPR').text(parseInt(DiffPcs));
        }
    }



}

function lettersOnlyGHA(inputtxt) {

    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        $('#txtGHARepresentative').val('');
        return false;
    }
}
function lettersOnlyAirLine(inputtxt) {

    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        $('#txtAirlineRepresentative').val('');
        return false;
    }
}

function lettersOnlySecurity(inputtxt) {

    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        $('#txtSecurityRepresentative').val('');
        return false;
    }
}


function calculateDiffWt() {

    var T_Wt = parseFloat($('#lblWtExp').text());
    var D_Wt = parseFloat($('#txtPckgsRCV').val());

    if ($('#txtPckgsRCV').val() == '') {
        $('#lblWtRec').text('');
        return;
    }



    if (T_Wt < D_Wt) {
        $('#emMsg').text('Damage Wt. cannot be greater than Shipment Rcvd Wt.').css('color', 'red');
        $('#txtPckgsRCV').val('');

        $('#lblWtRec').text('');

        return;
    } else {
        $('#emMsg').text('');
        DiffWt = T_Wt - D_Wt;
        if (!isNaN(parseFloat(DiffWt))) {
            $('#lblWtRec').text(parseFloat(DiffWt).toFixed(2));
        }

    }
}

function calculateDiffWtActual() {

    var A_wt = parseFloat($('#txtIndividualWt').val());
    var Ac_wt = parseFloat($('#txtIndividualActualWt').val());

    var T_Wt = parseFloat($('#lblWtExp').text());

    if (parseFloat(T_Wt) < parseFloat(A_wt)) {
        $('#emMsg').text('As per document cannot be greater than Total Wt.').css('color', 'red');

        $('#diffrent').text('');
        $('#txtIndividualWt').val('');
        return;
    } else {
        $('#emMsg').text('');
    }

    if (parseFloat(T_Wt) < parseFloat(Ac_wt)) {
        $('#emMsg').text('As per actual Wt. check cannot be greater than Total Wt.').css('color', 'red');

        $('#diffrent').text('');
        $('#txtIndividualActualWt').val('');
        return;
    } else {
        $('#emMsg').text('');
    }

    if ($('#txtIndividualActualWt').val() == '') {
        $('#diffrent').text('');
        return;
    } else {
        $('#emMsg').text('');
    }

    if ($('#txtIndividualWt').val() == '') {
        $('#diffrent').text('');
        return;
    } else {
        $('#emMsg').text('');
    }

    if (parseInt(A_wt) < parseInt(Ac_wt)) {
        $('#emMsg').text('Actual Wt. cannot be greater than Total Wt.').css('color', 'red');

        $('#diffrent').text('');
        $('#txtIndividualActualWt').val('');

        return;
    } else {
        $('#emMsg').text('');
        DiffWt_Awt = A_wt - Ac_wt;
        if (!isNaN(parseFloat(DiffWt_Awt))) {
            $('#diffrent').text(parseFloat(DiffWt_Awt).toFixed(2));
        }
    }
}

function GetImportDamageRecordDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    //var valuesOfAll = allIDs.split(',');


    //IMPAWBROWID = valuesOfAll[0];
    //IMPSHIPROWID = valuesOfAll[1];
    //M_indi = valuesOfAll[2];

    // console.log(BOOKED_FLIGHT_SEQUENCE_NUMBER + '/' + IMPAWBROWID + '/' + IMPSHIPROWID)

    //InputXML = '<Root><AWBId>' + IMPAWBROWID + '</AWBId><SHIPId>' + IMPSHIPROWID + '</SHIPId><FlightSeqNo>' + Flight_Seq_No + '</FlightSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "GetImportDamageRecordDetails",
            data: JSON.stringify({
                'strAWBNo': IMPAWBROWID,
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

                });

                if (SEQUENCE_NUMBER != '') {
                    $.alert('Damage details are already captured, hence cannot proceed.');
                    $('.alert_btn').click(function () {
                        //if (M_indi != 'H') {

                        //    localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());
                        //    window.location.href = 'IMP_RecordDamage.html';
                        //    return
                        //} else {
                        //    localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());
                        //    window.location.href = 'IMP_RecordDamage.html';
                        //    return
                        //}
                        /* localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());*/
                        window.location.href = 'IMP_RecordDamage.html';
                        return

                    });
                }

                $(xmlDoc).find('Table').each(function (index) {

                    AIRLINE_PREFIX = $(this).find('AIRLINE_PREFIX').text();
                    AWB_NUMBER = $(this).find('AWB_NUMBER').text();

                    $('#lblAWBNoForShow').text($(this).find('AWB').text());

                    //$('#txtOrigin').val($(this).find('ORIGIN').text());
                    //$('#txtDestination').val($(this).find('DESTINATION').text());
                    //$('#txPointofLoading').val($(this).find('ORIGIN').text());
                    //$('#txtContentasperAWB').val($(this).find('DESCRIPTION').text());
                    //$('#txPointofUnloading').val($(this).find('OFFLOAD_POINT').text());

                    $('#txtOrigin').text($(this).find('Origin').text());
                    $('#txtDestination').text($(this).find('Dest').text());
                    $('#txFlightNo').text($(this).find('FLIGHTNO').text() + ' / ' + $(this).find('FLIGHTDATE').text());
                    $('#txPointofLoading').text($(this).find('Origin').text());
                    $('#txtContentasperAWB').text('NA');
                    $('#txPointofUnloading').text($(this).find('Dest').text());

                    $('#lblNPX').text($(this).find('NPX').text());
                    $('#lblWtExp').text($(this).find('WT_EXP').text());
                    // $('#lblNPR').text($(this).find('NPR').text());
                    // $('#lblWtRec').text($(this).find('WtRec').text());

                });


                html = '';
                $(xmlDoc).find('Table2').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();

                    html += '<div class="col-xs-6 col-form-label">';
                    html += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '" >';
                    html += '</label>';
                    html += '</div>';

                });
                html1 = '';
                $(xmlDoc).find('Table3').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html1 += '<div class="col-xs-6 col-form-label">';
                    html1 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html1 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html1 += '</label>';
                    html1 += '</div>';

                });

                html2 = '';
                $(xmlDoc).find('Table4').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html2 += '<div class="col-xs-12 col-form-label">';
                    html2 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html2 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html2 += '</label>';
                    html2 += '</div>';

                });


                html3 = '';
                $(xmlDoc).find('Table5').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html3 += '<div class="col-xs-12 col-form-label">';
                    html3 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html3 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html3 += '</label>';
                    html3 += '</div>';

                });

                html4 = '';
                $(xmlDoc).find('Table6').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html4 += '<div class="col-xs-12 col-form-label ">';
                    html4 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html4 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html4 += '</label>';
                    html4 += '</div>';

                });

                html5 = '';
                $(xmlDoc).find('Table7').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()


                    html5 += '<tr>';
                    html5 += '<td><label class="checkbox-inline"><input onchange="onChangeCheckonText();"  type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">' + REFERENCE_DESCRIPTION + '</label></td>';
                    html5 += '<td><input disabled="disabled" type="number" id="' + REFERENCE_DATA_IDENTIFIER + '" class="form-control checkontext"></td>';
                    html5 += '</tr>';


                });

                html6 = '';
                $(xmlDoc).find('Table8').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html6 += '<div class="col-xs-6 col-form-label">';
                    html6 += '<label class="checkbox-inline">';
                    html6 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html6 += '</label>';
                    html6 += '</div>';

                });

                html7 = '';
                $(xmlDoc).find('Table8').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    //html7 += '<div class="col-xs-6 col-form-label">';
                    //html7 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    //html7 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    //html7 += '</label>';
                    //html7 += '</div>';
                    html7 += '<tr>';
                    html7 += '<td style="white-space: nowrap;"><label class="checkbox-inline"><input onchange="onChangeCheckonTextContainer();"  type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">' + REFERENCE_DESCRIPTION + '</label></td>';
                    html7 += '<td style="white-space: nowrap;"><input disabled="disabled" type="number" id="' + REFERENCE_DATA_IDENTIFIER + '" class="form-control checkontextContainer"></td>';
                    html7 += '</tr>';

                });

                html8 = '';
                $(xmlDoc).find('Table9').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html8 += '<div class="col-xs-12 col-form-label">';
                    html8 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html8 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html8 += '</label>';
                    html8 += '</div>';

                });

                html9 = '';
                $(xmlDoc).find('Table10').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html9 += '<div class="col-xs-12 col-form-label">';
                    html9 += '<label  class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html9 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html9 += '</label>';
                    html9 += '</div>';

                });


                html10 = '';
                $(xmlDoc).find('Table11').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()
                    html10 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html10 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html10 += '</label></br>';

                });

                html11 = '';
                $(xmlDoc).find('Table13').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()
                    html11 += '<label style="padding-left: 20px;" class="radio-inline"> <input type="radio" name="typeofDis" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DATA_IDENTIFIER + '" >' + REFERENCE_DESCRIPTION + ' </label><br>';

                });

                html12 = '';
                $(xmlDoc).find('Table14').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html12 += '<label class="checkbox-inline"> <input type="checkbox" name="wether" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DESCRIPTION + '">' + REFERENCE_DESCRIPTION + ' </label></br>';
                });

                html13 = '';
                $(xmlDoc).find('Table12').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html13 += '<label class="checkbox-inline"> <input type="checkbox" name="wether" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DESCRIPTION + '">' + REFERENCE_DESCRIPTION + ' </label></br>';
                });

                $(xmlDoc).find('Table16').each(function (index) {

                    FLIGHT_AIRLINE = $(this).find('FLIGHT_AIRLINE').text()
                    FLIGHT_NUMBER_I800 = $(this).find('FLIGHT_NUMBER_I800').text()
                    SCHEDULED_ARRIVAL_DATETIME = $(this).find('SCHEDULED_ARRIVAL_DATETIME').text()

                    // $('#txFlightNo').val($(this).find('FLIGHT_AIRLINE').text() + '-' + $(this).find('FLIGHT_NUMBER_I800').text() + ' / ' + $(this).find('SCHEDULED_ARRIVAL_DATETIME').text());
                    $('#txFlightNo').text($(this).find('FLIGHT_AIRLINE').text() + '-' + $(this).find('FLIGHT_NUMBER_I800').text() + ' / ' + $(this).find('SCHEDULED_ARRIVAL_DATETIME').text());
                });



                $('#divChkMaterial').append(html);
                $('#divType').append(html1);
                $('#divMarkanLabel').append(html2);
                $('#divOuterPacking').append(html3);
                $('#divInnerPacking').append(html4);
                $('#divDetalofDamageObserved').append(html5);
                $('#divDetalofDamageObservedB').append(html6);
                $('#divContainers').append(html7);
                $('#divDamageDiscovered').append(html8);
                $('#divTheDamageApparentlycausedby').append(html9);
                $('#divSalvageAction').append(html10);
                $('#divTypeofdiscrepancy').append(html11);
                $('#divWeatherCondition').append(html12);
                $('#divDisposition').append(html13);
                // $('#divSalvageAction').append(html10);

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

function onChangeCheckonText() {

    $('#divDetalofDamageObserved input:checkbox').each(function () {
        //if (this.checked)
        //    $(this).closest("tr").find('.checkontext').removeAttr("disabled");
        //else
        //    $(this).closest("tr").find('.checkontext').prop("disabled", true);
        if (this.checked) {
            //  $(this).closest("tr").find('.checkontext').removeAttr("disabled");
            $(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', 'thin solid red').focus();
            return true;
        }
        else {
            // $(this).closest("tr").find('.checkontext').prop("disabled", true);
            $(this).closest("tr").find('.checkontext').prop("disabled", true).css('border', '1px solid #ccc');
            //$(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', 'thin solid red');
        }
    });
}

function onChangeCheckonTextContainer() {

    $('#divContainers input:checkbox').each(function () {
        //    if (this.checked)
        //        $(this).closest("tr").find('.checkontextContainer').removeAttr("disabled");
        //    else
        //        $(this).closest("tr").find('.checkontextContainer').prop("disabled", true);
        if (this.checked) {
            //  $(this).closest("tr").find('.checkontext').removeAttr("disabled");
            $(this).closest("tr").find('.checkontextContainer').removeAttr("disabled").css('border', 'thin solid red').focus();

        }
        else {
            // $(this).closest("tr").find('.checkontext').prop("disabled", true);
            $(this).closest("tr").find('.checkontextContainer').prop("disabled", true).css('border', '1px solid #ccc');
            //$(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', 'thin solid red');
        }
    });


}

function exitFromPage() {
    localStorage.removeItem('AWB_Number');
    localStorage.removeItem('HAWB_Number');
    localStorage.removeItem('Flight_Seq_No');
    localStorage.removeItem('allIDs');
    window.location.href = 'IMP_Dashboard.html'
}

function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtAWBNo').focus();
    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();
    $('#txtLocationShow').val('');
    $('#txtAreaRemark').val('');
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
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});



function SaveImportDamageRecordDetails(finalXML) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    // InputXML = '<Root><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "SaveImportDamageRecordDetails",
            data: JSON.stringify({
                'InputXML': finalXML,
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
                //console.log(xmlDoc)
                $('#ddlHAWB').empty();



                $(xmlDoc).find('Table1').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage);
                        $('#txtAWBNo').val('');
                        $('#txtAWBNo').focus();


                        return;
                    } else {
                        if (imageDataForArray.length > 0) {
                            for (var i = 0; i < imageDataForArray.length; i++) {
                                ImportManifestUloadDocV(imageDataForArray[i], [i + 1]);
                            }
                        }
                        $.alert(StrMessage);
                        $('.alert_btn').click(function () {
                            localStorage.removeItem('AWB_Number');
                            localStorage.removeItem('HAWB_Number');
                            localStorage.removeItem('Flight_Seq_No');
                            localStorage.removeItem('allIDs');

                            window.location.href = 'IMP_RecordDamage.html';
                            return
                        });

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


var validateDecimalNumber = function (e) {
    var t = e.value;
    e.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;

}



function ImportManifestUloadDocV(imgDt, ival) {
    str = deviceUUID.replace('/', '');
    InputXML = '<Root><FlightSeqNo>' + Flight_Seq_No + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AWBId>' + imageUplaodID + '</AWBId><HAWBId></HAWBId><UserId>' + UserID + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    // imageData = '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';
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    // InputXML = '<Root><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "ImportManifestUloadDocV ",
            data: JSON.stringify({
                'InputXML': InputXML,
                'strImgData': imgDt,
                'strFileName': AWB_Number + '_' + ival + '' + '.png',
                'strUserId': UserId,
                'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //beforeSend: function doStuff() {
            //    $('body').mLoading({
            //        text: "Loading..",
            //    });
            //},
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');
                //console.log(xmlDoc)
                $('#ddlHAWB').empty();


                $(xmlDoc).find('Table1').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage);
                        $('#txtAWBNo').val('');
                        $('#txtAWBNo').focus();
                        return;
                    } else {
                        $.alert(StrMessage);
                        $('.alert_btn').click(function () {
                            localStorage.removeItem('AWB_Number');
                            localStorage.removeItem('HAWB_Number');
                            localStorage.removeItem('Flight_Seq_No');
                            localStorage.removeItem('allIDs');
                            window.location.href = 'IMP_RecordDamage.html';
                            return
                        });
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