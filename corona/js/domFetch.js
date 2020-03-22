//models
const ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
        line: {
            tension: 0
        }
    },
    title:{
        display: false,
    },
    scales:{
        xAxes: [{
            type:"time",
            time:{
                parser: 'MM.YYYY',
                unit: 'week'
            },
            scaleLabel: {
                labelString: 'Date'
            }
        }],
        yAxes: [{
            scaleLabel: {
                labelString: 'value'
            }
        }]
    },
    legend: {
        display: false
    }
};
let Label = null;
const Info = {
    Infections: {
        Canvas: null,
        Chart: null,
        Label: null
    },
    Deaths: {
        Canvas: null,
        Chart: null,
        Label: null
    },
    Recovers : {
        Canvas: null,
        Chart: null,
        Label: null
    },
    Total: {
        Canvas: null,
        Chart: null,
        Label: null
    }
}

//behaviours
window.onload = function(){
    for(let type of Object.entries(Info))
        initialize(type[0]);

    Label = document.getElementById("covid-district");

    function initialize(type){
        let domLabel = type.toLowerCase();
        Info[type].Canvas = document.getElementById(domLabel+"-chart").getContext("2d");
        Info[type].Label = document.getElementById("covid-"+domLabel);
    }
}
const domFetcher = {
    fetchAll:function(data, region){
        this.fetch("Total", data.Total, region);
        this.fetch("Infections", data.Infections, region);
        this.fetch("Deaths", data.Deaths, region);
        this.fetch("Recovers", data.Recovers, region);
    },
    fetch:function(type, data, region){
        let ctx = Info[type].Canvas;
        if(Info[type].Chart) Info[type].Chart.destroy();
        Info[type].Chart = new Chart(ctx, {
            type:'line',
            data:{
                datasets: [
                    {
                        data: data,
                        fill: false,
                        borderColor: 'red'
                    }
                ]
            },
            options: ChartOptions
        });
        this.fetchName(type, region, data[data.length-1]);
    },
    fetchName:function(type, region, currentData){
        Label.innerText = region;
        let currentNumber = currentData?currentData.y:"0";
        Info[type].Label.innerText = currentNumber;
    }
};