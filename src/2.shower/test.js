const pageInstructions = require ('./pageInstructions')
import { getPageMakerBasic } from "./pageMakerBasic"

var pageProcesor = getNewPageProcesor()
var pageMakerBasic = getPageMakerBasic()
pageMakerBasic.init()
pageProcesor.setPageMaker(pageMakerBasic)
pageProcesor.processInstruction(['q'])
pageProcesor.processInstruction(['cm', 1, 2, 3, 4, 5, 6])
pageProcesor.processInstruction(['d', [1, 2, 3], 4])
pageProcesor.processInstruction(['Q'])