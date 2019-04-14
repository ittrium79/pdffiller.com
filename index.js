var params = {
    lines:[
        {
            background:'#00F',
            updateTime:2000,
            elements:[{
                background:'#0FF',
                width:25
            },
            {
                background:'#00F',
                width:50                
            },
            {
                background:'#FF0',
                width:25                
            },
            ]

        },
        {
            background:'#F0F',
            updateTime:4000,
            elements:[{
                background:'#F0F',
                width:25
            },
            {
                background:'#00F',
                width:25                
            },
            {
                background:'#F0F',
                width:25                
            },
            {
                background:'#00F',
                width:25                
            },
            ]

        },
        {
            background:'#0F0',
            updateTime:7000,
            elements:[{
                background:'#FFF',
                width:50
            },
            {
                background:'#00F',
                width:25                
            },
            {
                background:'#0FF',
                width:25                
            },
            ]

        }
    ]
}

// Генератор случайного цвета в формате rgb(0,0,0)
function randomColor(){
    var r = Math.floor((Math.random() * 256));
    var g = Math.floor((Math.random() * 256));
    var b = Math.floor((Math.random() * 256));
    return 'rgb('+r+', '+g+', '+b+')';
}

// Установка таймера при создании каждой линии
function setRandomColorInterval(lineId, updateTime){
    setTimeout(function changeLineColor() {
          document.getElementById(lineId).style.backgroundColor = randomColor();
          var elements = document.getElementById(lineId).childNodes;
          if (elements.length > 0) {
              for (var i=0; i<elements.length; i++ ){
                  elements[i].style.backgroundColor = randomColor();
              }
          }
          setTimeout(changeLineColor, updateTime);
    }, updateTime);
    
}

// Создание элемента стиля (задать один раз высоту для всех элементов класса .line)
function createStyleElement(styleId, height){
    var style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = '.line {height:' +height+'px;}';
    document.head.appendChild(style);
}

// Пересчет высоты при изменении размера окна (для всех элементов класса .line)
function resizeStyleElement(styleId, height){
    document.getElementById(styleId).innerHTML = '.line {height:' +height+'px;}';
}

// Создание элемента DIV из params.lines.elements с начальными параметрами
function createElement(element){

    var newElement = document.createElement("DIV");
    newElement.style.backgroundColor = element.background;
    newElement.style.width = element.width+'%';
    newElement.className = "element";
    
    return newElement;
}

// Создание линии, элемент DIV из params.lines с начальными параметрами
// Запуск таймера для изменения цвета
function createLine(line, index){

    var newLine = document.createElement("DIV");
    newLine.className = "line";
    newLine.id = "line_"+index;
    newLine.style.backgroundColor = line.background;

    if (typeof line.elements !== 'undefined' && line.elements.length > 0){
        for (var i=0; i<line.elements.length; i++){
           newLine.appendChild(createElement(line.elements[i]));
        }
    }

    document.body.appendChild(newLine);
    setRandomColorInterval(newLine.id, line.updateTime);

    return newLine;
}

var height;

if (typeof params.lines !== 'undefined' && params.lines.length > 0) {
    
    height = window.innerHeight / params.lines.length;
    createStyleElement('lineHeight', height);

    for (var i=0; i<params.lines.length; i++){
       createLine(params.lines[i], i);
    }

} else {
    alert ('Нет элементов типа "Lines"');
}

window.onresize = function(event) {
    if (typeof params.lines !== 'undefined' && params.lines.length > 0) {
    
        height = window.innerHeight / params.lines.length;
        resizeStyleElement('lineHeight', height);
    
    } else {
        alert ('Нет элементов типа "Lines"');
    }
};