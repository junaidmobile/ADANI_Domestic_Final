//var WebServiceUrl = "http://10.22.3.205/GalaxyService/GalaxyService.asmx/";  //LOCAL PC
var WebServiceUrl = "http://10.22.3.222/GalaxyMobAppService/GalaxyService.asmx/";  //Local 


(function () {
    document.addEventListener("deviceready", LoadNavBar, false);
    LoadNavBar();
})();
function ShowHomePage() {
    window.location.href = "GalaxyHome.html";
}
function LoadNavBar() {
    debugger
    $('#myNavbar').load("NavBar.html");
    var UName = window.localStorage.getItem("Uname");
    var userName = UName != null ? UName.toUpperCase() : UName;

    if (userName != null && userName.length > Number(8))
        $('#navhdr').html(userName.substring(0, 8));
    else
        $('#navhdr').html(userName);

    if (window.location.pathname.split("/").pop() == "OUTB_Acceptance.html") {
        $('#navhdrName').html("Cargo Acceptance");
    } 
    // else if (window.location.pathname.split("/").pop() == "OUTB_Unitization.html") {
    //     $('#navhdrName').html("Unitization");
    // }
    else if (window.location.pathname.split("/").pop() == "INB_Delivery.html") {
        $('#navhdrName').html("Final Delivery");
    }
    // else if (window.location.pathname.split("/").pop() == "IMP_FlightCheck.html") {
    //     $('#navhdrName').html("Breakdown");
    // }
    
   
}
function NumberOnly(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    return false;
}
function ChkMaxLength(txt, len) {
    if ($('#' + txt.id).val().length > parseInt(len)) {
        $('#' + txt.id).val($('#' + txt.id).val().substring(0, len));
    }
}


function IsNumericWithDecimal(e){
    e.target.value = e.target.value.replace(/[^0-9\.]/g,'');
    return false;
}


//function scan() {
//    cordova.plugins.barcodeScanner.scan(
//      function (result) {
//          if (result.text != "") {
//              window.location.href = "ExportPassTracker.html";
//              sessionStorage.setItem("ContainerNo", result.text);
//          }
//      },
//      function (error) {
//          alert("Scanning failed: " + error);
//      }
//   );
//}

//navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
//    quality: 100,
//    targetWidth: 500,
//    targetHeight: 500,
//    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//    destinationType: Camera.DestinationType.FILE_URI
//});

