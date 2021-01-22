export function pageMakerLogger() {
    var logger = console || {log:function(){} };
    function init(){

    }
    
    function getResult() {
        return pageMakers.map( pageMaker => pageMaker.getResult() );
    }

    function drawLine(context){
        pageMakers.map( pageMaker => pageMaker.drawLine());
    }


    return {
        init,
        getResult,
        drawLine
    }
}
