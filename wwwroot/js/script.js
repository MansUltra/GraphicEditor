 // RGB шапка и футер страницы
 var headerH = document.getElementsByTagName("header")[0];
 var footerF = document.getElementsByTagName("footer")[0];
 var curC = new Array(250,0,0); // array with color value;

 var id; // for Timer


 function MoveColor()
 {
  if (curC[1] != 250 && curC[0] == 250 && curC[2] == 0) {
     curC[1] += 5;
     headerH.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
     footerF.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
   }

   if (curC[0] != 0 && curC[1] == 250 && curC[2] == 0) {
      curC[0] -= 5;
      headerH.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
         footerF.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
    }

     if (curC[2] != 250 && curC[1] == 250 && curC[0] == 0) {
        curC[2] += 5;
        headerH.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
             footerF.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
      }

        if (curC[1] != 0 && curC[2] == 250 && curC[0] == 0) {
           curC[1] -= 5;
           headerH.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
               footerF.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
         }

           if (curC[0] != 250 && curC[2] == 250 && curC[1] == 0) {
              curC[0] += 5;
              headerH.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
                   footerF.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
            }

              if (curC[2] != 0 && curC[0] == 250 && curC[1] == 0) {
                 curC[2] -= 5;
                 headerH.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
                     footerF.style.backgroundColor   = "rgb(" + curC[0] + ", " + curC[1] + ", " + curC[2] +")";
               }

 }












 // Холст и рисование
 var canvasC = document.getElementById("mycanvas");

var cWidth = canvasC.width;
var cHeight = canvasC.height;
var cBgColor = canvasC.style.backgroundColor;
 var lineWeight = 5;
 var curScale = 1.0;
 var savePoints = new Array();

 // canvasC.style.position = "absolute";
 // canvasC.style.left = "0%";
 // canvasC.style.top = "0%"
 // canvasC.style.scale = "2";

 var canvRect = canvasC.getBoundingClientRect();
 var context = canvasC.getContext('2d');
 savePoints.push(context.getImageData(0,0,cWidth,cHeight));
 var isDraw = false;
 var startX;
 var startY;
 var isMouseDown = new Array();

function changeToStartContex() {
  context.lineJoin = "round";
  context.lineMitter = 0;
    context.lineWidth = lineWeight;
    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.strokeStyle = palleteColor;
}


  var curCord = document.getElementById("cords");
  var curZoom = document.getElementById("curzoom");

  context.fillStyle = "white";
  context.fillRect(0,0,cWidth,cHeight);

  var curTool = "marker";
  var prevTool;
  function redrawCanv(){context.putImageData(savePoints[savePoints.length - 1],0,0);}

 canvasC.addEventListener("mousedown", function(e){
      if(savePoints.length == 10) // максимальное количество возвратов
      {
        savePoints.shift();
      }
    
      savePoints.push(context.getImageData(0,0,cWidth,cHeight));

      // Правильный просчет точки рисования !!!
      startX  = (e.pageX + this.parentNode.scrollLeft - this.parentNode.offsetLeft)/ curScale;
      startY  = (e.pageY + this.parentNode.scrollTop - this.parentNode.offsetTop)/ curScale ;

      isDraw = true;
      context.beginPath();

      // Инструметт стёрка на пр. кнопку мыши
      if(e.button == 2)
      {
        prevTool = curTool;
        curTool = "eraser";
      }

      // if (curTool == "marker")
      // {
      //   context.moveTo(startX-0.5,startY-0.5);
      //   context.lineTo(startX,startY);
      //   context.stroke();
      // }
      if(curTool == "pencil")
      {
        context.lineWidth = 1;
        context.moveTo(startX-0.5,startY-0.5);
        context.lineTo(startX,startY);
        context.stroke();
        context.lineWidth = lineWeight;
      }

});


canvasC.addEventListener("mousemove",function(e)
{
  // Правильный просчет точки рисования !!!
var curX = (e.pageX - this.parentNode.offsetLeft + this.parentNode.scrollLeft)/ curScale;
var curY = (e.pageY - this.parentNode.offsetTop + this.parentNode.scrollTop)/  curScale;

curCord.innerHTML = "x="+curX+ " " + "y="+curY;

  if(isDraw){
    // alert(curTool);
      switch (curTool) {
        case "marker":
            redrawCanv(); // Очищаем от лишнего
            context.lineTo(curX,curY);
            context.stroke();
          break;

        case "rectangle":
            redrawCanv(); // Очищаем от лишнего
            context.lineJoin = "miter";
            context.beginPath();

            context.rect(startX,startY,curX - startX,curY - startY);

            context.stroke();
            context.fill();
            context.lineJoin = "round";
          break;
        case "eraser":
            redrawCanv(); // Очищаем от лишнего
            context.lineTo(curX,curY);
            var help = context.strokeStyle;
            context.strokeStyle = cBgColor;
            context.stroke();
            context.strokeStyle = help;
        break;
        case "line":
            redrawCanv(); // Очищаем от лишнего
            context.beginPath();
            context.moveTo(startX,startY);
            context.lineTo(curX,curY);
            context.stroke();
        break;
        case "ellipse":
            redrawCanv(); // Очищаем от лишнего
            context.beginPath();

            context.save(); // сохраняем контекст рисования

            context.translate(startX,startY); //  Перемещаем Центр координат

            // Радиус минимальное из расстояний от точки старта
            var tempRadius = Math.min(Math.abs(curX - startX),Math.abs(curY - startY));

            // Применяем вытягивание по оси с макс. отклонением
            context.scale(Math.abs(curX - startX)/tempRadius,Math.abs(curY - startY)/tempRadius);

            context.arc(0,0,tempRadius,0,Math.PI * 2);

            context.restore();

            context.stroke();
            context.fill();

        break;
        case "pencil":
            redrawCanv(); // Очищаем от лишнего
            context.lineWidth = 1;
            context.lineTo(curX-0.5,curY-0.5);
            context.stroke();
            context.lineWidth = lineWeight;
        break;
        default: break;
    }
  }
});

canvasC.addEventListener("mouseup",function(e)
{
  isDraw = false;
  if(curTool == "eraser") curTool = prevTool;
});

canvasC.addEventListener("mouseover",function(e)
{
  isDraw = false;
  if(curTool == "eraser") curTool = prevTool;
});















// Обработка Панели Цветов
// Для цвета обводки
var cltable = document.getElementById("colortable");
var palleteColor;
// Для цвета заливки
var exCltable = document.getElementById("excolortable");
var exPalleteColor;


cltable.addEventListener("click",function(e)
{
  // Находим нужную радио кнопку и выбираем цветовую панель
    document.getElementById("colorCustomInput").checked = true;
context.strokeStyle = palleteColor;
});

// Для цвета заливки
exCltable.addEventListener("click",function(e)
{
  // Находим нужную радио кнопку и выбираем цветовую панель
    document.getElementById("exColorCustomInput").checked = true;
context.fillStyle = exPalleteColor;
});

cltable.addEventListener("change",function(e)
{
// За цветовой панелью в html док. идёт <div> который мы хотим изменить путём задания bgColor
document.getElementById("underpallete").style.backgroundColor = this.value;
palleteColor = this.value;
context.strokeStyle = palleteColor;
});

exCltable.addEventListener("change",function(e)
{
// За цветовой панелью в html док. идёт <div> который мы хотим изменить путём задания bgColor
document.getElementById("exunderpallete").style.backgroundColor = this.value;
exPalleteColor = this.value;
context.fillStyle = exPalleteColor;
});


function changeColor(e)
{
  if(e.value != "custom")
  {
    context.strokeStyle = e.value;
  }
}
function changeExColor(e)
{
  if(e.value != "custom")
  {
      context.fillStyle = e.value;
  }
}














// Панель инструментов
var exCrPanelPos = 0;

function changetool(e)
{
curTool = e.value;
}


// Изменение толщины обводки
document.getElementById("lineWeight").addEventListener("input",function(e)
{
  context.lineWidth = lineWeight = this.value;
  this.title = "Line weight "+ lineWeight + " px";
});

document.getElementById("lineWeight").addEventListener("change",function(e)
{
  context.lineWidth = lineWeight = this.value;
  this.title = "Line weight "+ lineWeight + " px";
});


// Функции появления/исчезания доп. панелей цветов
document.getElementById("rectangle").addEventListener("mouseover",function(e)
{
  if(exCrPanelPos != 0)
  {
  this.insertAdjacentElement("beforeend", document.getElementById("extracolorpanel"));
  document.getElementById("extracolorpanel").style.left = "50.5%";
  exCrPanelPos =0;}

  document.getElementById("helparea1").style.display = "block";
  document.getElementById("extracolorpanel").style.display = "block";
});
document.getElementById("ellipse").addEventListener("mouseover",function(e)
{
  if(exCrPanelPos != 1)
  {
  this.insertAdjacentElement("beforeend", document.getElementById("extracolorpanel"));
  document.getElementById("extracolorpanel").style.left = "54%";
  exCrPanelPos = 1;}
  document.getElementById("helparea2").style.display = "block";
  document.getElementById("extracolorpanel").style.display = "block";
});

document.getElementById("rectangle").addEventListener("mouseout",function(e)
{
  document.getElementById("extracolorpanel").style.display = "none";
  document.getElementById("helparea1").style.display = "none";

});
document.getElementById("ellipse").addEventListener("mouseout",function(e)
{
  document.getElementById("extracolorpanel").style.display = "none";
  document.getElementById("helparea2").style.display = "none";

});

function step_back()
{
  if(savePoints.length)
  {
    context.putImageData(savePoints[savePoints.length - 1],0,0);
    savePoints.pop();
  }
}

function zoom_plus()
{
  var x;
  if(curScale < 0.5)
  {
      x = (curScale*100 - 95)/2;
      curScale+=0.05;
  }
  else
  {
    if(curScale < 1)
    {
      x = (curScale*100 -90)/2;
      curScale+=0.1;
    }
    else
    {
      if (curScale < 4)
      {
        x = (curScale*100 - 75)/2;
        curScale+=0.25;
      }
      else
      {
        if(curScale < 10)
        {
          x = (curScale*100 - 50)/2;
          curScale+=0.5;
        }
        else return;
      }
    }

  }
  canvasC.style.translate = x+"% "+x+"%";
  canvasC.style.scale = curScale;
  curZoom.innerHTML = curScale * 100 +"%";
}


function zoom_minus()
{
  var x;
  if(curScale > 4)
  {
      x = (curScale*100 - 150)/2;
      curScale-=0.5;
  }
  else
  {
    if(curScale > 1)
    {
      x = (curScale*100 -125)/2;
      curScale-=0.25;
    }
    else
    {
      if (curScale > 0.5)
      {
        x = (curScale*100 - 110)/2;
        curScale-=0.1;
      }
      else
      {
        if(curScale > 0.1)
        {
          x = (curScale*100 - 105)/2;
          curScale-=0.05;
        }
        else return;
      }
    }

  }
  canvasC.style.translate = x+"% "+x+"%";
  canvasC.style.scale = curScale;
  curZoom.innerHTML = curScale * 100 +"%";
}



document.getElementById("return_button").addEventListener("mouseup", step_back);

document.getElementById("zoom_plus").addEventListener("mouseup", zoom_plus);

document.getElementById("zoom_minus").addEventListener("mouseup", zoom_minus);





// Menu

function ShowHTMLElement(element) {
    element.style.display = "block";
}
function HideHTMLElement(element) {
    element.style.display = "none";
}

// Blocking window
var modal_window = document.getElementById("modal_window");
// Modal windows
var logout_window = document.getElementById("logout_window");
var login_window = document.getElementById("login_window");
var register_window = document.getElementById("register_window");

// Saving and uploading image from canvas

document.getElementById("gallery").addEventListener("mouseup", function (e) {

    sendRequestWithCanvas(true);
});
function operateReq(req)
{
   
    document.getElementById("to_gallery").click();
}
function operateReq2(req)
{
    if (req.responseText == "nonath")
    {
        alert("Вы не можете сохранить рисунок не авторизовавшись");
    }
   
}

function sendRequestWithCanvas(moveToGallery=false,name = "") {
    var req = new XMLHttpRequest();
    req.open('POST', '/Home/SaveCanvState');

    var form = new FormData();
    form.append("image", canvasC.toDataURL());
    form.append("bgColor", cBgColor);
    form.append("imgName", name);

    req.onreadystatechange = function (e) {

        if (req.readyState == 4) {
           
            if (name == "") {
                if (moveToGallery)
                    operateReq(req);
            }
            else
            {
                operateReq2(req);
            }
        }
    }

            
    req.send(form);

}


document.getElementById("clearcanvas").addEventListener("mouseup",function(e)
{
  if(confirm("Очистить холст?"))
  {
    if(cBgColor == "rgba(0, 0, 0, 0)")
    context.clearRect(0,0,cWidth,cHeight);
    else
    {
      var temp = context.fillStyle;
      context.fillStyle = cBgColor;
      context.fillRect(0,0,cWidth,cHeight);
      context.fillStyle = temp;
    }
  }
});
var form_window = document.getElementById("dowload_or_save_on_server");
var nameOfImg
document.getElementById("saveproject").addEventListener("mouseup",function(e)
{
    nameOfImg = prompt("Назовите своё изображение");
  if(!nameOfImg){
    this.firstChild.download = "";
      this.firstChild.href = "";
      alert("название не введено!");
    return;
    }
    ShowHTMLElement(modal_window);
    ShowHTMLElement(form_window);

});
document.getElementById("ok_btn").onclick = function (e) {
    if (document.getElementById("download_picture").checked) {
        this.firstChild.download = nameOfImg + ".png";
        this.firstChild.href = canvasC.toDataURL("image/png");
        this.firstChild.click();
    }
    if (document.getElementById("save_on_server").checked) {
        sendRequestWithCanvas(false,nameOfImg);
    }
    HideHTMLElement(modal_window);
    HideHTMLElement(form_window);
};

    




// Window for new projects

var start_img= new Image();

document.getElementById("newproject").addEventListener("mouseup",function(e)
{
    ShowHTMLElement(modal_window);
    ShowHTMLElement(document.getElementById("creating_window"))

  var temp = document.getElementById("extracolorpanel");
  modal_window.insertAdjacentElement("beforeend", temp);
  temp.style.left = "55%";
  temp.style.top = "30%";
  temp.style.display = "block";
  exCrPanelPos = 10;
});

function create_cancel()
{
    HideHTMLElement(modal_window);
    HideHTMLElement(document.getElementById("creating_window"));

  var temp = document.getElementById("extracolorpanel");
  temp.style.display = "none";
  temp.style.top = "9%";
  temp.style.left = "50.5%";
  document.getElementById("for_file_input").value = "";
}

document.getElementById("create_cancel").addEventListener("mouseup",create_cancel);
document.getElementById("create_new").addEventListener("mouseup",function(e)
 {
  var sStyle = context.strokeStyle;
  var fStyle = context.fillStyle;

  var width = document.getElementById("new_width");
  var height = document.getElementById("new_height");

    canvasC.style.backgroundColor = cBgColor = context.fillStyle;
    if (context.fillStyle == "rgba(0, 0, 0, 0)")
  {
      canvasC.style.backgroundImage = "url('../images/bgAlpha.jpg')";
  }
  else {
      canvasC.style.backgroundImage = "";
  }

    if (start_img.src != "" && (width.value == "" || height.value == ""))
  {
    width.value = start_img.width;
    height.value = start_img.height;
  }
  else if(width.value =="" || height.value =="")
  {
    width.value = 800;
    height.value = 600;
  }

  if(width.value > 1600 || width.value < 10)
  canvasC.width = cWidth;
  else canvasC.width = cWidth = width.value;
  if(height.value > 1600 || height.value < 10)
  canvasC.height = cHeight;
  else canvasC.height = cHeight = height.value;

  context.lineWidth = lineWeight;
  context.strokeStyle = sStyle;
  context.fillStyle = fStyle;
  savePoints = [];
  context.lineJoin = "round";
  context.fillRect(0,0,canvasC.width,canvasC.height);


  if(start_img)
  context.drawImage(start_img,0,0);

  width.value = "";
  height.value = "";
  create_cancel();
});

document.getElementById("for_file_input").addEventListener("change",function(e)
{
if(this.value[this.value.length - 1] == "g")
 {
   var reader = new FileReader();
    reader.onload = function(event){
    start_img.src = event.target.result;
    }
        reader.readAsDataURL(e.target.files[0]);
}
});








// Авторизация

var isAuth;
document.getElementById("auth").addEventListener("mouseup", function (e) {
    sendRequestWithCanvas();
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
document.getElementById("cancel3").onclick = function (e)
{
    HideHTMLElement(modal_window);
    HideHTMLElement(register_window);
}
document.getElementById("to_register").onclick = function (e) {
    HideHTMLElement(login_window);
    ShowHTMLElement(register_window);
}  
document.getElementById("to_login").onclick = function (e)
{
    HideHTMLElement(register_window);
    ShowHTMLElement(login_window);
}


// обработка клавиш
var isCtrl = false;
addEventListener("keydown",function(e)
{
  switch (e.keyCode) {
    case 17: isCtrl = true;
      break;
      case 90:
      if(isCtrl)step_back();
      break;
      case 38: zoom_plus();
      break;
      case 40: zoom_minus();
      break;
    default:
  }
});
addEventListener("keyup",function(e)
{
  if(e.keyCode == 17) isCtrl = false;
});

// canvasC.addEventListener("wheel",function(e)
// {
//   if(isCtrl)
//   {
//     if(e.value > 0)zoom_plus();
//     else zoom_minus();
//   }
// });






// Функции загрузки выгрузки страницы
function loadAnimation()
{
    isAuth = document.getElementById("auth_check").checked;

    if (isAuth == null) isAuth = false;
   
  // Настройка по умолчанию
  document.getElementById("colorCustom").firstChild.checked = true;
  document.getElementById("excolorAlpha").firstChild.checked = true;
  document.getElementById("marker").firstChild.checked = true;
  document.getElementById("lineWeight").value = 5;
  // Получаем цвет выбранный в палитре в пред. раз
  document.getElementById("underpallete").style.backgroundColor = palleteColor = document.getElementById("colortable").value;
  document.getElementById("exunderpallete").style.backgroundColor = exPalleteColor = document.getElementById("excolortable").value;
  // Отключаю контекстное меню
  document.oncontextmenu = function (){return false};
  // Загружаемое фото
    document.getElementById("for_file_input").value = "";
  // Текущее фото
    var on_load_image = new Image();
    var cur_proj = document.getElementById("saved_canv")
    if(cur_proj!= null)
    {
        on_load_image.src = cur_proj.src;
        cHeight = canvasC.height = on_load_image.height;
        cWidth = canvasC.width = on_load_image.width;
       
        context.drawImage(on_load_image, 0, 0);
        if (canvasC.style.backgroundImage != "")
        {
            //console.log("|"+ canvasC.style.backgroundImage+"|");
            cBgColor = "rgba(0, 0, 0, 0)";
        }
        else
            cBgColor = canvasC.style.backgroundColor;
        
        
    }
  // Устанавливаем нужный контекст
    changeToStartContex();
  // RGB interval color animatian
    id = setInterval("MoveColor()", 50);

    if (document.getElementById("cur_error") != null)
        alert(document.getElementById("cur_error").innerHTML);
}

function unloadAnimation()
{
 clearInterval(id);
}
