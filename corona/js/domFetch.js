let Charts = {
    Infections: null,
    Deaths: null,
    Recovers : null,
    Total: null
};
const timeFormat = 'MM.YYYY';
const Canvases = {
    Infections: null,
    Deaths: null,
    Recovers : null,
    Total: null
}
window.onload = function(){
    Canvases.Total = document.getElementById("total-chart").getContext("2d");
    Canvases.Infections = document.getElementById("infection-chart").getContext("2d");
    Canvases.Deaths = document.getElementById("death-chart").getContext("2d");
    Canvases.Recovers = document.getElementById("recover-chart").getContext("2d");
}
const domFetcher = {
    fetchAll:function(data, region){
        this.fetch("Total", data.Total, region);
        this.fetch("Infections", data.Infections, region);
        this.fetch("Deaths", data.Deaths, region);
        this.fetch("Recovers", data.Recovers, region);
    },
    fetch:function(type, data, region){
        let ctx = Canvases[type];
        if(Charts[type]) Charts[type].destroy();
        Charts[type] = new Chart(ctx, {
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
            options: {
                responsive: true,
                maintainAspectRatio: true,
                elements: {
                    line: {
                        tension: 0
                    }
                },
                title:{
                    display: true,
                    text: region+", "+type
                },
                scales:{
                    xAxes: [{
                        type:"time",
                        time:{
                            parser: timeFormat,
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
            }
        });
    }
};