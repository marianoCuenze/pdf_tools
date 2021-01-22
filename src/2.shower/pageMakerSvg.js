export function getPageMakerSvg() {
    let pdfPageObj;
    let finalPageItems = [] //secuence of str like <line ... /> , <path ... /> and so on
    
    function init(_pdfPageObj){
        pdfPageObj = _pdfPageObj;
    }

    function getResult() {
        return  '<svg>' +
                finalPageItems.join('') +
                '</svg>';
     }

    function drawLine(context, ){
        finalPageItems
    }


    return {
        init,
        getResult,
        drawLine
    }
}
