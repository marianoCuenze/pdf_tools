export function pageMakerCompose() {
    let pageMakers = []
    
    function init(){
        for (let i in arguments)
            pageMakers.push(arguments[i])
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
