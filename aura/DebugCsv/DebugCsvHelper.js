({
    //
    // Glossário
    //  
    // getLineValuesArray
    // commaIndexSplits: um array com os índices de onde deve ser feito o split correto
    // lastIndexPreviousSplit: índice de término do valor de coluna já analizado
    // startIndexNextSplit: índice de início do próximo valor de coluna a ser analizado
    //  
    // filterCsvText
    // lineSplits: um array com o valor de cada linha do csv
    // lineSplits[lineIndex]: linha do csv em formato de texto
    // columnSplitsByLine: um mapa com o array de valores de cada coluna, a partir da linha
    // columnSplitsByLine[lineIndex]: um array de valores de cada coluna da linha
    // substringIndexes: matriz com os índices de início e fim de cada valor de cada coluna da linha. Ex: [[0,21], [22, 74], ...]
    // positions[0]: índice de início do valor da coluna na linha
    // ṕositions[1]: índice de término do valor da coluna na linha
    //
    
    filterCsvText : function(textCsv) 
    {
     	//
     	//  Helper
     	//  

        const helperBundle = {
            getLineValuesArray : (lineCsv) => {
                try 
            	{
                    let commaIndexSplits = [];
        
                    let lastIndexPreviousSplit = 0;
                    let startIndexNextSplit = 0;
        
                    do 
                    {
                        if (lastIndexPreviousSplit == 0) 
            			{
                            startIndexNextSplit = lastIndexPreviousSplit;
                        }
                        else 
            			{
                            startIndexNextSplit = lastIndexPreviousSplit + 1;
                        }
        
                        let noNext = false;
        
                        if (lineCsv[startIndexNextSplit] == '"') 
            			{
                            lastIndexPreviousSplit = (lineCsv.substring(startIndexNextSplit + 1).indexOf('",') + 2) + startIndexNextSplit;
        
                            noNext = (lastIndexPreviousSplit == startIndexNextSplit + 1);
                        }
                        else 
            			{
                            lastIndexPreviousSplit = (lineCsv.substring(startIndexNextSplit + 1).indexOf(',') + 1) + startIndexNextSplit;
        
                            noNext = (lastIndexPreviousSplit == startIndexNextSplit);
                        }
        
                        if (noNext) 
            			{
                            lastIndexPreviousSplit = lineCsv.length;
        
                            commaIndexSplits.push([startIndexNextSplit, lastIndexPreviousSplit]);
                            break;
                        }
        
                        commaIndexSplits.push([startIndexNextSplit, lastIndexPreviousSplit]);
                    }
                    while (true);
                    return commaIndexSplits;
                }
                catch (e) 
            	{
                    console.log(e.message); return [];
                }
            }
        }
        
        //
        // Código
        //
        
        let lineSplits = textCsv.replaceAll('\r', '').split('\n');
        let columnSplitsByLine = {};
        
        for(let lineIndex in lineSplits)
        {
            columnSplitsByLine[lineIndex] = [];
            
            let substringIndexes = helperBundle.getLineValuesArray(lineSplits[lineIndex]);
            for (let positions of substringIndexes)
            {
                columnSplitsByLine[lineIndex].push( lineSplits[lineIndex].substring(Number(positions[0]), Number(positions[1])) );
            }
        }
        
        console.log(JSON.parse(JSON.stringify(columnSplitsByLine)));
    }
})