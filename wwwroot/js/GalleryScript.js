

var modal_window = document.getElementById("modal_window");
var picture_view = document.getElementById("picture_view");
var img_view = document.getElementById("cur_img_view");

var isAuth = document.getElementById("auth_check").checked;
if (isAuth == null) isAuth = false;
var img_name ="";

function ShowHTMLElement(element) {
    element.style.display = "block";
}
function HideHTMLElement(element) {
    element.style.display = "none";
}
function pictureView(el)
{
    ShowHTMLElement(modal_window);
    ShowHTMLElement(picture_view);
    img_name = document.getElementById("h_" + el.id).innerHTML;
    img_view.src = el.src;
}
document.getElementById("cancel").onclick = function (e) {
    HideHTMLElement(modal_window);
    HideHTMLElement(picture_view);
}

document.getElementById("delete").onclick = function (e)
{
    if (confirm("Хотите удалить картинку?"))
    {
        HideHTMLElement(picture_view);
        var req = new XMLHttpRequest();
        req.open('POST', '/Home/DeleteImg');

        var form = new FormData();
        form.append("imgName", img_name);

        req.onreadystatechange = function (e) {

            if (req.readyState == 4) {
                HideHTMLElement(modal_window);
                window.location.reload();
            }
        }

        req.send(form);
    }
}

document.getElementById("go_edit").onclick = function (e) {
    if (confirm("Текущий проект пропадёт. Продолжить?"))
    {
        HideHTMLElement(picture_view);
        var req = new XMLHttpRequest();
        req.open('POST', '/Home/EditImg');

        var form = new FormData();
        form.append("imgName", img_name);

        req.onreadystatechange = function (e) {

            if (req.readyState == 4) {
                HideHTMLElement(modal_window);
                document.getElementById("go_home").click();
            }
        }

        req.send(form);
    }
}