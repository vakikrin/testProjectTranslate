var string = "Nice to meet you";
string = textProcessing(string);
var http = "https://translate.yandex.net/api/v1.5/tr.json/translate";
var param = "?key=trnsl.1.1.20171103T161051Z.51ff315582b6108f.96c81d587d92297dc9b3c086b75d1a7bb6675968" +
    "&text=" + string +"&lang=en-ru";
document.writeln(http+"?"+param);

function textProcessing(string) {
    string = string.replace(/ /g, "%20")
    return string;
}

function CreateRequest()
{
    var Request = false;

    if (window.XMLHttpRequest)
    {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        //Internet explorer
        try
        {
            Request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (CatchException)
        {
            Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request)
    {
        alert("Невозможно создать XMLHttpRequest");
    }

    return Request;
}

function SendRequest(r_method, r_path, r_args, r_handler)
{
    //Создаём запрос
    var Request = CreateRequest();

    //Проверяем существование запроса еще раз
    if (!Request)
    {
        return;
    }

    //Назначаем пользовательский обработчик
    Request.onreadystatechange = function()
    {
        //Если обмен данными завершен
        if (Request.readyState == 4)
        {
            //Передаем управление обработчику пользователя
            r_handler(Request);
        }
    }

    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() == "get" && r_args.length > 0)
        r_path += "?" + r_args;

    //Инициализируем соединение
    Request.open(r_method, r_path, true);

    if (r_method.toLowerCase() == "post")
    {
        //Если это POST-запрос

        //Устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else
    {
        //Если это GET-запрос

        //Посылаем нуль-запрос
        Request.send(null);
    }
}
    //Создаем функцию обработчик
    var Handler = function(Request)
    {
         document.documentElement.innerHTML = Request.responseText;
    }

    //Отправляем запрос
    SendRequest("POST",http+param,"",Handler);

