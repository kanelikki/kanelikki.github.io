//models
const minimumDate = new Date("2020/2/26");
const maximumDate =  new Date();
const ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
        line: {
            tension: 0.25
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
            ticks:{
                min: minimumDate,
                max: maximumDate,
                beginAtZero: true
                
            },
            scaleLabel: {
                labelString: 'Date'
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
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
        let lastData = data[data.length-1];
        let currentValue = (lastData)?lastData.y:0;
        data.push({x: maximumDate, y: currentValue});

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
        this.fetchName(type, region, currentValue);
    },
    fetchName:function(type, region, currentData){
        Label.innerText = region;
        let currentNumber = currentData?currentData:"0";
        Info[type].Label.innerText = currentNumber;
    }
};
