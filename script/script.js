const speedGame = document.getElementById('select').value // Define a atualização do ObjFall alterando a velocidade do jogo
const tableWidth = 10 // Numero de colunas 
const tableHeight = 20 // Numeros de Linhas
const tableNumPixel = tableWidth * tableHeight // Numero de Pixels
var mainPixelY = 0 // Coluna onde o obj vai ser rederizado
var mainPixelX = String (Math.floor(Math.random() * 8 + 1)) // Linha onde o obj vai ser renderizado
var mainPixel = Number(mainPixelY + mainPixelX) // Pixel referencia para renderização
 // Randomizar o obj que vai ser renderizado
var objCount = -1
var objFalling = true
var saveObjArray = [] 
const mapTableArray = [] // Define quais pixel faz parte do obj
// Array de objetos que podem aparecer aleatoriamente
const objPixelArray = [{'a':0, 'b':1, 'c':2, 'd':tableWidth + 1}, {'a':0, 'b':1, 'c':tableWidth, 'd':tableWidth + 1}, {'a':0, 'b':1, 'c':2, 'd':tableWidth},
{'a':0, 'b':1, 'c':tableWidth + 1, 'd':tableWidth + 2}, {'a':0, 'b':1, 'c':2, 'd':3}]



function start (){
setInterval(renderGame, 50) // Renderiza o Jogo
setInterval(objCalculate, 50)// Calcula a posição do obj
setInterval(objFall, 1000)
setInterval(objMap, 500)
dropNew();
}

function objCalculate (){
    for (let i = 0; i < tableNumPixel; i++){
        mapTableArray[i] = 0
     }
     
} 

function objFall (){   
    if (pixelIndexA < 190 && pixelIndexB < 190 && pixelIndexC < 190 && pixelIndexD  < 190 && objFalling == true){
    mainPixelY++
    mainPixel = Number(mainPixelY + mainPixelX)  
    } else {
        objFalling = false
    }
}

function objMap (){    
pixelIndexA = mainPixel + objPixelArray[random]['a']
pixelIndexB = mainPixel + objPixelArray[random]['b']
pixelIndexC = mainPixel + objPixelArray[random]['c']
pixelIndexD = mainPixel + objPixelArray[random]['d']
 if (objFalling === false) {
    objCount = objCount+1
    saveObjArray[objCount] = {'a': pixelIndexA, 'b': pixelIndexB, 'c': pixelIndexC, 'd': pixelIndexD}
    pixelIndexA = 0, pixelIndexB = 0, pixelIndexC = 0, pixelIndexD = 0, mainPixelY = 0
    dropNew ()
 } else {  }
}

function dropNew () {
    random = Math.floor(Math.random() * 5)
    mainPixelX = String (Math.floor(Math.random() * 8 + 1))
    objFalling = true
}
function obj (){
    mapTableArray[mainPixel + objPixelArray[random]['a']] = 1
    mapTableArray[mainPixel + objPixelArray[random]['b']] = 1
    mapTableArray[mainPixel + objPixelArray[random]['c']] = 1
    mapTableArray[mainPixel + objPixelArray[random]['d']] = 1
    for (let i = 0; i < objCount; i++){
    mapTableArray[saveObjArray[i]['a']] = 1
    mapTableArray[saveObjArray[i]['b']] = 1
    mapTableArray[saveObjArray[i]['c']] = 1
    mapTableArray[saveObjArray[i]['d']] = 1
    }
}

function objSave (){

}

function renderGame (){
    obj()
    let render = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < tableHeight; row++){
        render += '<tr>'
        for (let column = 0; column < tableWidth; column++){
           pixelIndex = column + (tableWidth * row)
           if (mapTableArray[pixelIndex] == 1){
                render += '<td style="background-color:#0F0;">'
                render += `<div class="mapPixel" style="color:#000;">${mapTableArray[pixelIndex]}</div>`
                render += `<div class="ij">${row}i ${column}j</div>`
                render += '</td>'
        } else {  
            render += '<td>'
            render += `<div class="ij">${row}i ${column}j</div>`
            render += `<div class="mapPixel">${mapTableArray[pixelIndex]}</div>`
            render += '</td>'
        }}
        render += '</tr>' 
    }
    render += '</table>'
    render += '<table id="nextObj" cellpadding=0 cellspacing=0>'
    for (let rowNext = 0; rowNext < 6; rowNext++){
        render += '<tr>'
        for (let columnNext = 0; columnNext < 6; columnNext++){
            mainNext = 5
            render += '<td style="background-color:#0F0;">'
            render += '</td>'
        }   }
        render  += '</tr>'
        render += '</table><br>'
    document.querySelector('#render').innerHTML = render
   
}

function debug () {
    console.log(
        `
        Obj pixels (${mapTableArray[mainPixel + objPixelArray[random]['a']]}, ${mapTableArray[mainPixel + objPixelArray[random]['b']]}, ${mapTableArray[mainPixel + objPixelArray[random]['c']]}, ${mapTableArray[mainPixel + objPixelArray[random]['d']]})
        Obj Num: ${random}
        Pixel referencia ${mainPixel}
        Velocidade: ${speedGame}ms
        PixelY: ${mainPixelY}
        Objeto caindo: ${objFalling}
        Numero de objetos: ${objCount}
        Obj salvo: ${saveObjArray[objCount]['a']}
        `
        
             
         

    );
}

start()