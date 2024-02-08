
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
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);

    //if (window.localStorage.getItem("RoleExpVehicleTracking") == '0')
    //    $("#divVehicleTracking").css("display", "none");
    //if (window.localStorage.getItem("RoleExpVehicleTracking") == '0')
    //    $("#divVehicleTracking").css("display", "none");
}
)();

function onBackKeyDown() {
    window.location.href = 'GalaxyHome.html';
}

function RedirectPage(pagename) {
    
    if (pagename == 'INB_Delivery.html') {
        window.location.href = pagename;
    }
    else if (pagename == 'IMP_FlightCheck.html'){
        window.location.href = pagename;
    }
    else if (pagename == 'INB_Binning.html'){
        window.location.href = pagename;
    }
    else if (pagename == 'INB_Query.html'){
        window.location.href = pagename;
    }
    else if (pagename == 'INB_AddServices.html'){
        window.location.href = pagename;
    }
        



}