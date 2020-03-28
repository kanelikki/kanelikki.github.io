var fetchedData;

function changed(value){
    if(value=="Others") value = null;
    domFetcher.fetchAll(getRegionData(value), value);
}
function getRegionData(value){
    if(value=="Others") value = null;
    let infectionData = getData("confirmed", value);
    let deathData = getData("deaths", value);
    let curedData = getData("recovered", value);
    
    let allData = getSum(infectionData, deathData, curedData);

    return {
        Infections: extractData(infectionData),
        Deaths: extractData(deathData),
        Recovers : extractData(curedData),
        Total: extractData(allData)
    };
    function getData(type, region){
        var filteredData = fetchedData[type];
        if(region!="All") filteredData = filteredData.filter(data => data.healthCareDistrict == region);
        let returnData = filteredData.map(data=>{ return {x:data.date, y:1}; });
    
        return returnData;
    }
    
    function getSum(infections, deaths, cures){
        function reverseToMinus(dataMap) { return dataMap.map(data=>{ let x = data.x; let y = -data.y; return {x, y}; }); }
    
        var infectionInfo = infections;
        var curesInfo = reverseToMinus(cures);
        var deathsInfo = reverseToMinus(deaths);
        return infectionInfo.concat(curesInfo).concat(deathsInfo);
    }
    function extractData(dataInput){
        if(!dataInput) return [];
        var sum = 0;
        var datePosition = null; //just ++ for same date
        let result = dataInput.sort((a, b) => new Date(a.x)-new Date(b.x)) //some sorts went wrong.
            .reduce((acc, data)=>{
                sum += data.y;
                let dataDate = new Date(data.x);
                if(datePosition - dataDate == 0){
                    acc[acc.length-1].y = sum;
                }
                else{
                    acc.push({x: dataDate, y: sum});
                    datePosition = dataDate;
                }
                return acc;
            },[]);
        let lastData = result[result.length-1];
        if(lastData){
            result.push({x:new Date(), y: lastData.y});
        }
        return result;
    }
}