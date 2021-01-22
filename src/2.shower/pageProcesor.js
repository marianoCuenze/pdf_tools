function getNewPdfPageGraphicContext(){
    return {
        current_point: {x:0, y:0},  // CHECK for valid default
        CMT: [ 1,  0,//0
               0,  1,//0
               0,  0,//1
            ],
        
        fill_color: 0xffffff,       
        flatness: 10,               //in device pixels, CHECK for valid default
        line_cap_style: 0,          //int, only: 0, 1, 2 (0:Butt end/1:Round end/2:Projecting square end)
        line_dash_pattern: {
            arr:   [],              //0 to 2 items, NO MORE
            phase: 0
        },
        line_join_style: 0,         //int, only: 0, 1, 2 (0:Miter/1:Round/2:Bevel)
        line_width: 1,
        miter_limit: 2.0,           // CHECK for valid default
        stroke_color: 0x000000
        //TEXT:
        /*character spacing
        horizontal scaling
        leading
        text font
        text matrix
        text rise
        text size
        text rendering mode
        word spacing*/
    }
}

function scaleToByte(num) {
    Math.min(0xFF, Math.max(0, num * 0xFF ))
}

function normalizedGreyToRGB(normalized_grey){
    const grey = scaleToByte(normalized_grey);
    return grey<<16+grey<<8+grey;
}

function normalizedCMYKToRGB(normalized_cyan, normalized_magenta, normalized_yellow, normalized_black) {
    const red   = scaleToByte ( (1 - normalized_cyan)    * ( 1 - normalized_black) );
    const green = scaleToByte ( (1 - normalized_magenta) * ( 1 - normalized_black) );
    const blue  = scaleToByte ( (1 - normalized_yellow)  * ( 1 - normalized_black) );
    return red<<16+green<<8+blue;
}

function normalizedRGBToRGB(normalized_red, normalized_green, normalized_blue) {
    const red   = scaleToByte ( normalized_red );
    const green = scaleToByte ( normalized_green );
    const blue  = scaleToByte ( normalized_blue );
    return red<<16+green<<8+blue;
}
function getNewPageProcesor(){
    let contextQueue = []
    let currentContext = getNewPdfPageGraphicContext()
    let pageMaker;
    
    const instructions = {
        // context queue
         'q' : (_) => { contextQueue.push(currentContext);},
         'Q' : (_) => { currentContext = contextQueue.pop();},
        // context props
        'cm' : (p) => { /* currentContext.CMT = p * currentContext.CMT */},
         'd' : (p) => { currentContext.dash.arr = p[0]; currentContext.dash.phase = p[1]},
         'i' : (p) => { currentContext.flatness = p[0];},
         'j' : (p) => { currentContext.line_join_style = p[0];},
         'J' : (p) => { currentContext.line_cap_style = p[0];},
         'M' : (p) => { currentContext.miter_limit = p[0];},
         'w' : (p) => { currentContext.line_width = p[0];},
         'w' : (p) => { currentContext.line_width = p[0];},
        // context color
         'g' : (p) => { currentContext.fill_color   = normalizedGreyToRGB(p[0]);},
         'G' : (p) => { currentContext.stroke_color = normalizedGreyToRGB(p[0]);},

         'k' : (p) => { currentContext.fill_color   = normalizedCMYKToRGB(p[0], p[1], p[2], p[3]);},
         'K' : (p) => { currentContext.stroke_color = normalizedCMYKToRGB(p[0], p[1], p[2], p[3]);},

        'rg' : (p) => { currentContext.fill_color   = normalizedRGBToRGB(p[0], p[1], p[2], p[3]);},
        'RG' : (p) => { currentContext.stroke_color = normalizedRGBToRGB(p[0], p[1], p[2], p[3]);},
        // graphics
         'm' : (p) => { currentContext.current_point = {x:p[0], y:p[1]};},
         'l' : (p) => { var tmp; pageMaker.drawLine ( currentContext.current_point , tmp = {x:p[0], y:p[1]} ); currentContext.current_point = tmp;},
    } 
    function processInstruction(i){
        iCode = i[0]
        instructions[iCode](i.slice(1));
    }
    function setPageMaker(maker){
        pageMaker = maker;
    }
    return {
        setPageMaker,
        processInstruction
    }
}

/*
class PdfPageGraphicContext{

}*/

