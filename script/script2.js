const tableWidth = 10 // Numero de colunas 
const tableHeight = 20 // Numeros de Linhas
const tableNumPixel = tableWidth * tableHeight // Numero de Pixels
const mapPixelArray = []
const objColor = []
var gameSpeed = document.getElementById('select').value
var   collisionArray = []
var gamePoint = 000000000000000000
var rowCollunm = [{}]
//const objArray = [{0: 0, 1: 1, 2: 2, 3: tableWidth + 1, 'color': '#F65'}, {0: 0, 1: 1, 2: 2, 3: 3, 'color': '#F65'}, {0: 0, 1: 1, 2: tableWidth + 1, 3: tableWidth + 2, 'color': '#F65'}, {0: 0, 1: 1, 2: tableWidth, 3: tableWidth + 1, 'color': '#F65'}]
const objPropT = {
    pixel: {
        0: 0, 
        1: 1, 
        2: 2, 
        3: tableWidth + 1
    },
    roll: {
        0: {
           0:  1 - tableWidth,
           2: -1 + tableWidth,
           3:  1 - tableWidth 
        },
        1: {
            0: -1 + tableWidth,
            2:  1 - tableWidth,
            3: -1 - tableWidth,
        },
        2: {
            0:  1 + tableWidth,
            2: -1 - tableWidth,
            3: -1 + tableWidth

        },
        3: {
            0: -1 - tableWidth,
            2:  1 + tableWidth,
            3:  1 + tableWidth 
        }
    },
    color: '#0DA'
    
}
const objPropL = {
    pixel: {
        0: 0, 
        1: 1, 
        2: 2, 
        3: tableWidth + 2
    },
    roll: {
        0: {
           0:  1 - tableWidth,
           2: -1 + tableWidth,
           3:  1 - tableWidth 
        },
        1: {
            0: -1 + tableWidth,
            2:  1 - tableWidth,
            3: -1 - tableWidth,
        },
        2: {
            0:  1 + tableWidth,
            2: -1 - tableWidth,
            3: -1 + tableWidth

        },
        3: {
            0: -1 - tableWidth,
            2:  1 + tableWidth,
            3:  1 + tableWidth 
        }
    },
    color: '#FFF'
    
}
const arrayPixelHigh = [190,191,192,193,170,171,172,181]
const objPixel = []
const fallObjPixelsArray = []
const fallObjColor = []
var objStopped = false
var debug = false
///////////////////////
var   random = 0 ///// Variaveis a serem colocadas em objMount
var   mo = 0    /////
////////////////////
function start (){
    mapTable()
    objMount()
    objColorMap()
    setInterval(render, gameSpeed)
    setInterval(objFall, gameSpeed)
    setInterval(debugConsole, 500)
    setInterval(gamePointed, 10000)
}
function objColorMap (){
    for (let i = 0; i < tableNumPixel; i++){
        objColor[i] = 'rgb(29, 161, 242)'
    }
}
function mapTable (){
    for (let i = 0; i < tableNumPixel; i++){
        mapPixelArray[i] = 0
        collisionArray[i] = 0
    }
}
function objMount (){
    for (let i = 0; i < 4; i++){
        fallObjPixelsArray[i] = objPropT.pixel[i]
        fallObjColor[i] = objPropT.color
        //fallObjPixelsArray['color'] = objArray[random]['color']
    }
    mo = 0
} 
function objFall (){
    if (collisionArray[fallObjPixelsArray[0] + tableWidth] == 0 && collisionArray[fallObjPixelsArray[1] + tableWidth] == 0 && collisionArray[fallObjPixelsArray[2] + tableWidth] == 0 && collisionArray[fallObjPixelsArray[3]  + tableWidth] == 0){
        for (let i = 0; i < 4; i++){
            fallObjPixelsArray[i] = fallObjPixelsArray[i] + tableWidth    
        }
    } else {
        console.log('parou')
        objStopped = true
        objSave()
    }
}
function objToLeft () {
    for (let i = 0; i < 4; i++){
        fallObjPixelsArray[i] = fallObjPixelsArray[i] - 1   
    }
}
function objToRight () {
    for (let i = 0; i < 4; i++){
        fallObjPixelsArray[i] = fallObjPixelsArray[i] + 1   
    }
}
function objToDown () {
    for (let i = 0; i < 4; i++){
        fallObjPixelsArray[i] = fallObjPixelsArray[i] + tableWidth   
    }
}
function objRoll () {   
    if (mo <= 2){
        fallObjPixelsArray[0] = fallObjPixelsArray[0] + objPropT.roll[mo][0]
        fallObjPixelsArray[2] = fallObjPixelsArray[2] + objPropT.roll[mo][2]
        fallObjPixelsArray[3] = fallObjPixelsArray[3] + objPropT.roll[mo][3]
        mo = mo +1} else {
        fallObjPixelsArray[0] = fallObjPixelsArray[0] + objPropT.roll[mo][0]
        fallObjPixelsArray[2] = fallObjPixelsArray[2] + objPropT.roll[mo][2]
        fallObjPixelsArray[3] = fallObjPixelsArray[3] + objPropT.roll[mo][3]
        mo = 0
        }
}
function objSave (){
    if(objStopped == true){
        for (let i = 0; i < fallObjPixelsArray.length; i++){
            arrayPixelHigh[arrayPixelHigh.length] = fallObjPixelsArray[i]
            objColor[fallObjPixelsArray[i]] = objPropT.color
            console.log(fallObjPixelsArray[i], objColor[fallObjPixelsArray[i]])
        }
        objStopped == false
        objMount ()
    } else {
        console.log('objeto Salvo com sucesso')
    }
    
}
function objSaved (){
    mapTable()
    for (let i = 0; i <= arrayPixelHigh.length; i++){
    mapPixelArray[arrayPixelHigh[i]] = 1
    mapPixelArray[fallObjPixelsArray[i]] = 1
    objColor[fallObjPixelsArray[i]] = objPropT.color
    collisionArray[arrayPixelHigh[i]] = 1
    }
}
function gamePointed (){
    for (let row = 0; row < tableHeight; row++){
        for (let colunm = 0; colunm < tableWidth; colunm++){
            rowCollunm.row[colunm] = mapPixelArray[row*colunm]
            console.log(rowCollunm.row[colunm])
        }
    }
   
}
function pointRender () {
    document.getElementById('pontos').innerHTML = gamePoint
}
function render (){
objSaved()
  let html = '<table cellpadding=0 cellspacing=0>'
   for (let row = 0; row < tableHeight; row++){
        html += '<tr>'
       for (let colunm = 0; colunm < tableWidth; colunm++){
            let pixelIndex = colunm + (row * tableWidth)
            if (mapPixelArray[pixelIndex] == 1){
            html += `<td class="mapPixel" style="background-color:${objColor[pixelIndex]}; border:1px solid #333; width:38px; heigh:38px;">`
            if(debug == true){
            html += `${row}${colunm}`
            }
            html += '</td>'} else {
            html += '<td class="mapPixel" style="border:1px solid #111; width:38px; heigh:38px;">'
            if(debug == true){
            html +=  mapPixelArray[pixelIndex]
            }
            html += '</td>'}
       }
       html += '</tr>'
   }
   document.querySelector('#render').innerHTML = html
} 
function changeGameSpeed(){
    gameSpeed = document.getElementById('select').value
}
start()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function debugIO(){
    if (debug == false){
        document.getElementById('console').style.display = "block"
        document.getElementById('debugButtons').style.display = "block"
        document.getElementById('x').style.backgroundColor = '#1F7'
        debug = true
    } else {
        document.getElementById('console').style.display = "none"
        document.getElementById('debugButtons').style.display = "none"
        document.getElementById('x').style.backgroundColor = '#F17'
        debug = false
    }
}
function clean (){
    for(let i = 0; i < arrayPixelHigh.length; i++)
    arrayPixelHigh[i] = null
} 
function debugConsole (){
    
    let html = `Objeto caindo: ${fallObjPixelsArray} <br><br>
    Lista de pixels em High: ${arrayPixelHigh} <br><br>
    GameSpeed: ${gameSpeed}
    `
    document.querySelector('#console').innerHTML = html
    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
