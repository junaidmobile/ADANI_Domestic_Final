document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("menubutton", onMenuKeyDown, false);

var ClientName = window.localStorage.getItem("ClientName");



$(function () {
    $('#spnClientName').val(ClientName);
});

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
    document.addEventListener("backbutton", onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);

    //if (window.localStorage.getItem("RoleExpVehicleTracking") == '0')
    //    $("#divVehicleTracking").css("display", "none");
    //if (window.localStorage.getItem("RoleExpVehicleTracking") == '0')
    //    $("#divVehicleTracking").css("display", "none");
})();

function onBackKeyDown() {
    window.location.href = "GalaxyHome.html";
}

function RedirectPage(pagename) {
    if (pagename == "OUTB_Acceptance.html") window.location.href = pagename;
    if (pagename == "OUTB_Unitization.html") window.location.href = pagename;
    if (pagename == "OUTB_Binning.html") window.location.href = pagename;
    if (pagename == "OUTB_AirsideRelease.html") window.location.href = pagename;
    if (pagename == "OUTB_OffloadULDShipment.html") window.location.href = pagename;
    if (pagename == "OUTB_Query.html") window.location.href = pagename;
    if (pagename == "OUTB_AdditionalService.html") window.location.href = pagename;
    if (pagename == "EXP_Checklist.html") window.location.href = pagename;

}
