({
    doDebug : function(component, event, helper) 
    {	   
        const reader = new FileReader();
        reader.onload = (e) => { helper.filterCsvText(e.target.result, helper); };
            
        reader.readAsText(document.getElementById("fileDirectory").files[0]);
    }
})