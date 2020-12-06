// RGB шапка и футер страницы
var headerH = document.getElementsByTagName("header")[0];
var footerF = document.getElementsByTagName("footer")[0];
var curC = new Array(250, 0, 0); // array with color value;

var id; // for Timer


function MoveColor() {
    if (curC[1] != 250 && curC[0] == 250 && curC[2] == 0) {
        curC[1] += 5;
        headerH.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
        footerF.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
    }

    if (curC[0] != 0 && curC[1] == 250 && curC[2] == 0) {
        curC[0] -= 5;
        headerH.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
        footerF.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
    }

    if (curC[2] != 250 && curC[1] == 250 && curC[0] == 0) {
        curC[2] += 5;
        headerH.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
        footerF.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
    }

    if (curC[1] != 0 && curC[2] == 250 && curC[0] == 0) {
        curC[1] -= 5;
        headerH.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
        footerF.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
    }

    if (curC[0] != 250 && curC[2] == 250 && curC[1] == 0) {
        curC[0] += 5;
        headerH.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
        footerF.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
    }

    if (curC[2] != 0 && curC[0] == 250 && curC[1] == 0) {
        curC[2] -= 5;
        headerH.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
        footerF.style.backgroundColor = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] + ")";
    }

}

function ShowHTMLElement(element) {
    element.style.display = "block";
}
function HideHTMLElement(element) {
    element.style.display = "none";
}

var curError = "";

// Blocking window
var modal_window = document.getElementById("modal_window");
// Modal windows
var logout_window = document.getElementById("logout_window");
var login_window = document.getElementById("login_window");
var register_window = document.getElementById("register_window");


var isAuth;
document.getElementById("auth").addEventListener("mouseup", function (e) {
    if (isAuth) {
        ShowHTMLElement(modal_window);
        ShowHTMLElement(logout_window);
    }
    else {
        ShowHTMLElement(modal_window);
        ShowHTMLElement(login_window);
    }
});
document.getElementById("cancel2").onclick = function (e) {
    HideHTMLElement(modal_window);
    HideHTMLElement(logout_window);
}
document.getElementById("cancel1").onclick = function (e) {
    HideHTMLElement(modal_window);
    HideHTMLElement(login_window);
}
document.getElementById("cancel3").onclick = function (e) {
    HideHTMLElement(modal_window);
    HideHTMLElement(register_window);
}
document.getElementById("to_register").onclick = function (e) {
    HideHTMLElement(login_window);
    ShowHTMLElement(register_window);
}
document.getElementById("to_login").onclick = function (e) {
    HideHTMLElement(register_window);
    ShowHTMLElement(login_window);
}


function loadAnimation() {

    isAuth = document.getElementById("auth_check").checked;
    if (isAuth == null) isAuth = false;
    // Отключаю контекстное меню
    document.oncontextmenu = function () { return false };
   // RGB interval color animatian
    id = setInterval("MoveColor()", 50);

    if (document.getElementById("cur_error") != null)
        alert(document.getElementById("cur_error").innerHTML);
}

function unloadAnimation() {
    clearInterval(id);
}