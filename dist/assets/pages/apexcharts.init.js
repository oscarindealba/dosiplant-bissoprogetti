const API_CONSUMOSTURNO = `http://localhost:8081/api/consumos/turno/`;
const API_CONSUMO = `http://localhost:8081/api/consumos/`;
let datSilos, datAgregados, datQuimicos, datTurnos, consumos = {};

const getAPIturnos = () => {
    axios.get(API_CONSUMOSTURNO).then(res => {
        datTurnos = res.data;
        datSilos = datTurnos[0];
        datAgregados = datTurnos[1];
        datQuimicos = datTurnos[2];
        resSum = datTurnos[3];
        grafica1();
        graficaConsumos();
    });

};

const getAPIConsReal = () => {
    axios.get(API_CONSUMO).then(res => {
        let datConsReal = res.data;
        let consumos = datConsReal[1];
        graficarDesv(consumos);

    });

};

const getAPIOperacion = () => {
    axios.get(API_CONSUMO).then(res => {
        let datOperecaion = res.data;
        let operacion = datOperecaion[1];

        graficarOperecion(operacion);

    });

};

var options = {
    series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    colors: ['#008ffb'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: [3],
    },
    title: {
        text: 'Product Trends by Month',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
};


var chart = new ApexCharts(document.querySelector("#apex_line1"), options);
chart.render();


//line-2

var ts2 = 1484418600000;
var dates = [];
var spikes = [5, -5, 3, -3, 8, -8]
for (var i = 0; i < 120; i++) {
    ts2 = ts2 + 86400000;
    var innerArr = [ts2, dataSeries[1][i].value];
    dates.push(innerArr)
}
var options = {
    series: [{
        name: 'XYZ MOTORS',
        data: dates
    }],
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom',
            show: true
        }

    },
    stroke: {
        width: [3],
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },

    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    yaxis: {
        labels: {
            formatter: function(val) {
                return (val / 1000000).toFixed(0);
            },
        },
        title: {
            text: 'Price'
        },
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function(val) {
                return (val / 1000000).toFixed(0)
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#apex_line2"), options);
chart.render();

const graficarDesv = (arg) => {


    let tolerancia = 30;
    for (let j = 1; j <= 5; j++) {
        let serieSilo1 = [];
        let serieBatch1 = [];
        let serieTolPos = [];
        let serieTolNeg = [];
        for (let k = 0; k <= arg.length - 1; k++) {
            if (arg[k].numsilo === j) {

                serieSilo1.push(arg[k].porcentaje.toFixed(1) - tolerancia);
                serieBatch1.push(arg[k].numbatch);
                serieTolPos.push(-1 * tolerancia);
                serieTolNeg.push(2 * tolerancia);
            };
        };
        console.log(serieSilo1);
        var optionsSilo1 = {
            chart: {
                height: 360,
                type: 'area',
                stacked: true,
                toolbar: {
                    show: true,
                    autoSelected: 'zoom'
                },
            },
            colors: ['#a5c2f1', '#2a77f4', '#15c201'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: [3, 3, 5],
                dashArray: [1, 1, 8],
                lineCap: 'round'
            },
            grid: {
                borderColor: "#45404a2e",
                padding: {
                    left: 0,
                    right: 0
                },
                strokeDashArray: 4,
            },
            markers: {
                size: 0,
                hover: {
                    size: 0
                }
            },
            series: [{
                name: 'Tolerancia Max',
                data: serieTolPos,
            }, {
                name: 'Tolerancia Min',
                data: serieTolNeg,
            }, {
                name: 'Valor real',
                data: serieSilo1,
            }],

            xaxis: {

                categories: serieBatch1,
                axisBorder: {
                    show: true,
                    color: '#45404a2e',
                },
                axisTicks: {
                    show: true,
                    color: '#45404a2e',
                },
            },

            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.3,
                    stops: [0, 90, 100]
                }
            },

            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            },
        };
        let temp = j;
        if (serieSilo1.length == 0) {
            temp = 0;
        }

        var chart = new ApexCharts(
            document.querySelector(`#desvsilo${(temp)}`),
            optionsSilo1
        );
        chart.render();
    };



};

const graficarOperecion = (arg) => {
    let serieS = [];
    let delta = [];
    let operacion = [];
    let dattotal = []
    let elapse = 10;
    for (let i = 0; i <= arg.length - 1; i++) {
        serieS.push(Date.parse(new Date(arg[i].createdAt)));
        serieS.sort(function(a, b) {
            return a - b;
        });
        //let s2 = Date.parse(new Date(arg[i - 1].createdAt));
        //console.log(s2);
        //let transc = s1 - s2;
        // console.log(transc);
    };
    for (let i = 1; i <= arg.length - 1; i++) {
        delta.push((serieS[i] - serieS[i - 1]) / 60000);
    };

    for (let i = 1; i <= arg.length - 1; i++) {
        if (delta[i] > elapse) {
            operacion.push(0);
        } else {
            operacion.push(1);
        };
    };
    for (let i = 1; i <= arg.length - 1; i++) {
        dattotal.push([serieS[i], operacion[i]]);

    }

    var options = {
        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#999',
                label: {
                    show: true,
                    text: 'Operando',
                    style: {
                        color: "#fff",
                        background: '#03d87f'
                    }
                }
            }],
            xaxis: [{
                x: new Date('14 Nov 2012').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Rally',
                    style: {
                        color: "#fff",
                        background: '#ffb822'
                    }
                },
            }]
        },
        chart: {
            type: 'area',
            height: 350,
        },
        stroke: {
            width: [3],
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            data: dattotal

        }, ],
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            min: dattotal[0],
            tickAmount: 6,
            axisBorder: {
                show: true,
                color: '#bec7e0',
            },
            axisTicks: {
                show: true,
                color: '#bec7e0',
            },
        },
        colors: ['#008ffb'],
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.4,
                stops: [0, 100]
            }
        },
    }

    var chart = new ApexCharts(
        document.querySelector("#apex_area2"),
        options
    );

    chart.render();


};


//Area-2


//colunm-1
const grafica1 = () => {
    let silos = [0, 0, 0];
    let agregados = [0, 0, 0];
    let quimicos = [0, 0, 0];


    if (datSilos.length < 3) {
        for (i = 0; i < datSilos.length; i++) {
            silos[datSilos[i].turno - 1] = datSilos[i].silos;
        };
    } else {
        silos = [datSilos[0].silos, datSilos[1].silos, datSilos[2].silos];
    };


    if (datAgregados.length < 3) {
        for (i = 0; i < datAgregados.length; i++) {
            agregados[datAgregados[i].turno - 1] = datAgregados[i].agregados;
        };
    } else {
        agregados = [datAgregados[0].agregados, datAgregados[1].agregados, datAgregados[2].agregados];
    };


    if (datQuimicos.length < 3) {
        for (i = 0; i < datQuimicos.length; i++) {
            quimicos[datQuimicos[i].turno - 1] = datQuimicos[i].quimicos;
        };

    } else {
        quimicos = [datQuimicos[0].quimicos, datQuimicos[1].quimicos, datQuimicos[2].quimicos];
    };


    var options = {
        chart: {
            height: 396,
            type: 'bar',
            toolbar: {
                show: true
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '80%',
            },
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ["rgba(42, 118, 244, .18)", '#2a76f4', "rgba(251, 182, 36, .6)"],
        series: [{
            name: 'Silos',
            data: silos
        }, {
            name: 'Quimicos',
            data: quimicos
        }, {
            name: 'Agregados',
            data: agregados
        }],
        xaxis: {
            categories: ['Turno 1', 'Turno 2', 'Turno 3'],
            axisBorder: {
                show: true,
                color: '#bec7e0',
            },
            axisTicks: {
                show: true,
                color: '#bec7e0',
            },
        },
        legend: {
            offsetY: 6,
        },
        yaxis: {
            title: {
                text: 'Kg (Kilogramos)'
            }
        },
        fill: {
            opacity: 1

        },
        // legend: {
        //     floating: true
        // },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2
            },
            borderColor: '#f1f3fa'
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return "Acumulado: " + val + " Kg"
                }
            }
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#apex_column1"),
        options
    );

    chart.render();
};

//apex-column-2


var options = {
    chart: {
        height: 380,
        type: 'bar',
        toolbar: {
            show: false
        },
    },
    plotOptions: {
        bar: {
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function(val) {
            return val + "%";
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },
    colors: ["#2a76f4"],
    series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        labels: {
            offsetY: -18,

        },
        axisBorder: {
            show: true,
            color: '#28365f',
        },
        axisTicks: {
            show: true,
            color: '#28365f',
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: true,
            offsetY: -35,

        }
    },
    fill: {
        gradient: {
            enabled: false,
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
        },
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: function(val) {
                return val + "%";
            }
        }

    },
    title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 350,
        align: 'center',
        style: {
            color: '#8997bd'
        }
    },
    grid: {
        row: {
            colors: ['#afb7d21a', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.2
        },
        borderColor: '#f1f3fa'
    }
}

var chart = new ApexCharts(
    document.querySelector("#apex_column2"),
    options
);

chart.render();


// apex-bar-1

var options = {
    chart: {
        height: 380,
        type: 'bar',
        toolbar: {
            show: false
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    colors: ["#2a76f4"],
    yaxis: {
        axisBorder: {
            show: true,
            color: '#bec7e0',
        },
        axisTicks: {
            show: true,
            color: '#bec7e0',
        },
    },
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
    },
    states: {
        hover: {
            filter: 'none'
        }
    },
    grid: {
        borderColor: '#f1f3fa'
    }
}

var chart = new ApexCharts(
    document.querySelector("#apex_bar"),
    options
);

chart.render();

//Mixed-2


var options = {
    chart: {
        height: 380,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0, 0, 3]
    },
    series: [{
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    }, {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    }, {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58]
    }],
    colors: ["rgba(42, 118, 244, .18)", '#2a76f4', "rgba(251, 182, 36, .6)"],
    xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        axisBorder: {
            show: true,
            color: '#bec7e0',
        },
        axisTicks: {
            show: true,
            color: '#bec7e0',
        },
    },
    yaxis: [{
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#20016c'
            },
            labels: {
                style: {
                    color: '#20016c',
                }
            },
            title: {
                text: "Income (thousand crores)"
            },
        },

        {
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#77d0ba'
            },
            labels: {
                style: {
                    color: '#77d0ba',
                },
                offsetX: 10
            },
            title: {
                text: "Operating Cashflow (thousand crores)",
            },
        },
        {
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#fa5c7c'
            },
            labels: {
                style: {
                    color: '#fa5c7c',
                }
            },
            title: {
                text: "Revenue (thousand crores)"
            }
        },

    ],
    tooltip: {
        followCursor: true,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y + " thousand crores"
                }
                return y;
            }
        }
    },
    grid: {
        borderColor: '#f1f3fa'
    },
    legend: {
        offsetY: 6,
    },
    responsive: [{
        breakpoint: 600,
        options: {
            yaxis: {
                show: false
            },
            legend: {
                show: false
            }
        }
    }]
}

var chart = new ApexCharts(
    document.querySelector("#apex_mixed"),
    options
);

chart.render();

//apex-bubble2

/*
// this function will generate output in this format
// data = [
  [timestamp, 23],
  [timestamp, 33],
  [timestamp, 12]
  ...
]
*/
function generateData1(baseval1, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        //var x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([baseval1, y, z]);
        baseval1 += 86400000;
        i++;
    }
    return series;
}


var options2 = {
    chart: {
        height: 380,
        type: 'bubble',
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    series: [{
            name: 'Product 1',
            data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'Product 2',
            data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'Product 3',
            data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'Product 4',
            data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        }
    ],
    fill: {
        type: 'gradient',
    },
    colors: ["#727cf5", "#0acf97", "#fa5c7c", "#39afd1"],
    xaxis: {
        tickAmount: 12,
        type: 'datetime',

        labels: {
            rotate: 0,
        },
        axisBorder: {
            show: true,
            color: '#bec7e0',
        },
        axisTicks: {
            show: true,
            color: '#bec7e0',
        },
    },
    yaxis: {
        max: 70
    },
    legend: {
        offsetY: 6,
    },
    grid: {
        borderColor: '#f1f3fa'
    }
}

var chart = new ApexCharts(
    document.querySelector("#apex_bubble"),
    options2
);

chart.render();

// Candlestick

var options = {
    chart: {
        height: 320,
        type: 'candlestick',
        toolbar: {
            show: false,
        },
    },
    series: [{
        data: [{
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
                x: new Date(1538780400000),
                y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
                x: new Date(1538782200000),
                y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
                x: new Date(1538784000000),
                y: [6635.65, 6651, 6629.67, 6638.24]
            },
            {
                x: new Date(1538785800000),
                y: [6638.24, 6640, 6620, 6624.47]
            },
            {
                x: new Date(1538787600000),
                y: [6624.53, 6636.03, 6621.68, 6624.31]
            },
            {
                x: new Date(1538789400000),
                y: [6624.61, 6632.2, 6617, 6626.02]
            },
            {
                x: new Date(1538791200000),
                y: [6627, 6627.62, 6584.22, 6603.02]
            },
            {
                x: new Date(1538793000000),
                y: [6605, 6608.03, 6598.95, 6604.01]
            },
            {
                x: new Date(1538794800000),
                y: [6604.5, 6614.4, 6602.26, 6608.02]
            },
            {
                x: new Date(1538796600000),
                y: [6608.02, 6610.68, 6601.99, 6608.91]
            },
            {
                x: new Date(1538798400000),
                y: [6608.91, 6618.99, 6608.01, 6612]
            },
            {
                x: new Date(1538800200000),
                y: [6612, 6615.13, 6605.09, 6612]
            },
            {
                x: new Date(1538802000000),
                y: [6612, 6624.12, 6608.43, 6622.95]
            },
            {
                x: new Date(1538803800000),
                y: [6623.91, 6623.91, 6615, 6615.67]
            },
            {
                x: new Date(1538805600000),
                y: [6618.69, 6618.74, 6610, 6610.4]
            },
            {
                x: new Date(1538807400000),
                y: [6611, 6622.78, 6610.4, 6614.9]
            },
            {
                x: new Date(1538809200000),
                y: [6614.9, 6626.2, 6613.33, 6623.45]
            },
            {
                x: new Date(1538811000000),
                y: [6623.48, 6627, 6618.38, 6620.35]
            },
            {
                x: new Date(1538812800000),
                y: [6619.43, 6620.35, 6610.05, 6615.53]
            },
            {
                x: new Date(1538814600000),
                y: [6615.53, 6617.93, 6610, 6615.19]
            },
            {
                x: new Date(1538816400000),
                y: [6615.19, 6621.6, 6608.2, 6620]
            },
            {
                x: new Date(1538818200000),
                y: [6619.54, 6625.17, 6614.15, 6620]
            },
            {
                x: new Date(1538820000000),
                y: [6620.33, 6634.15, 6617.24, 6624.61]
            },
            {
                x: new Date(1538821800000),
                y: [6625.95, 6626, 6611.66, 6617.58]
            },
            {
                x: new Date(1538823600000),
                y: [6619, 6625.97, 6595.27, 6598.86]
            },
            {
                x: new Date(1538825400000),
                y: [6598.86, 6598.88, 6570, 6587.16]
            },
            {
                x: new Date(1538827200000),
                y: [6588.86, 6600, 6580, 6593.4]
            },
            {
                x: new Date(1538829000000),
                y: [6593.99, 6598.89, 6585, 6587.81]
            },
            {
                x: new Date(1538830800000),
                y: [6587.81, 6592.73, 6567.14, 6578]
            },
            {
                x: new Date(1538832600000),
                y: [6578.35, 6581.72, 6567.39, 6579]
            },
            {
                x: new Date(1538834400000),
                y: [6579.38, 6580.92, 6566.77, 6575.96]
            },
            {
                x: new Date(1538836200000),
                y: [6575.96, 6589, 6571.77, 6588.92]
            },
            {
                x: new Date(1538838000000),
                y: [6588.92, 6594, 6577.55, 6589.22]
            },
            {
                x: new Date(1538839800000),
                y: [6589.3, 6598.89, 6589.1, 6596.08]
            },
            {
                x: new Date(1538841600000),
                y: [6597.5, 6600, 6588.39, 6596.25]
            },
            {
                x: new Date(1538843400000),
                y: [6598.03, 6600, 6588.73, 6595.97]
            },
            {
                x: new Date(1538845200000),
                y: [6595.97, 6602.01, 6588.17, 6602]
            },
            {
                x: new Date(1538847000000),
                y: [6602, 6607, 6596.51, 6599.95]
            },
            {
                x: new Date(1538848800000),
                y: [6600.63, 6601.21, 6590.39, 6591.02]
            },
            {
                x: new Date(1538850600000),
                y: [6591.02, 6603.08, 6591, 6591]
            },
            {
                x: new Date(1538852400000),
                y: [6591, 6601.32, 6585, 6592]
            },
            {
                x: new Date(1538854200000),
                y: [6593.13, 6596.01, 6590, 6593.34]
            },
            {
                x: new Date(1538856000000),
                y: [6593.34, 6604.76, 6582.63, 6593.86]
            },
            {
                x: new Date(1538857800000),
                y: [6593.86, 6604.28, 6586.57, 6600.01]
            },
            {
                x: new Date(1538859600000),
                y: [6601.81, 6603.21, 6592.78, 6596.25]
            },
            {
                x: new Date(1538861400000),
                y: [6596.25, 6604.2, 6590, 6602.99]
            },
            {
                x: new Date(1538863200000),
                y: [6602.99, 6606, 6584.99, 6587.81]
            },
            {
                x: new Date(1538865000000),
                y: [6587.81, 6595, 6583.27, 6591.96]
            },
            {
                x: new Date(1538866800000),
                y: [6591.97, 6596.07, 6585, 6588.39]
            },
            {
                x: new Date(1538868600000),
                y: [6587.6, 6598.21, 6587.6, 6594.27]
            },
            {
                x: new Date(1538870400000),
                y: [6596.44, 6601, 6590, 6596.55]
            },
            {
                x: new Date(1538872200000),
                y: [6598.91, 6605, 6596.61, 6600.02]
            },
            {
                x: new Date(1538874000000),
                y: [6600.55, 6605, 6589.14, 6593.01]
            },
            {
                x: new Date(1538875800000),
                y: [6593.15, 6605, 6592, 6603.06]
            },
            {
                x: new Date(1538877600000),
                y: [6603.07, 6604.5, 6599.09, 6603.89]
            },
            {
                x: new Date(1538879400000),
                y: [6604.44, 6604.44, 6600, 6603.5]
            },
            {
                x: new Date(1538881200000),
                y: [6603.5, 6603.99, 6597.5, 6603.86]
            },
            {
                x: new Date(1538883000000),
                y: [6603.85, 6605, 6600, 6604.07]
            },
            {
                x: new Date(1538884800000),
                y: [6604.98, 6606, 6604.07, 6606]
            },
        ]
    }],

    xaxis: {
        type: 'datetime',
        axisBorder: {
            show: true,
            color: '#bec7e0',
        },
        axisTicks: {
            show: true,
            color: '#bec7e0',
        },
    },
    yaxis: {
        labels: {
            formatter: function(value) {
                return "$" + value;
            }
        },
        tooltip: {
            enabled: true
        }
    },
    grid: {
        strokeDashArray: 4,
    },
}

var chart = new ApexCharts(
    document.querySelector("#apex_candlestick"),
    options
);

chart.render();

// Treemap

var options = {
    series: [{
        data: [{
                x: 'New Delhi',
                y: 218
            },
            {
                x: 'Kolkata',
                y: 149
            },
            {
                x: 'Mumbai',
                y: 184
            },
            {
                x: 'Ahmedabad',
                y: 55
            },
            {
                x: 'Bangaluru',
                y: 84
            },
            {
                x: 'Pune',
                y: 31
            },
            {
                x: 'Chennai',
                y: 70
            },
            {
                x: 'Jaipur',
                y: 30
            },
            {
                x: 'Surat',
                y: 44
            },
            {
                x: 'Hyderabad',
                y: 68
            },
            {
                x: 'Lucknow',
                y: 28
            },
            {
                x: 'Indore',
                y: 19
            },
            {
                x: 'Kanpur',
                y: 29
            }
        ]
    }],
    legend: {
        show: false
    },
    chart: {
        height: 350,
        type: 'treemap',
        toolbar: {
            show: false,
        },
    },

};

var chart = new ApexCharts(document.querySelector("#treemap_1"), options);
chart.render();

var options = {
    series: [{
        data: [{
                x: 'New Delhi',
                y: 218
            },
            {
                x: 'Kolkata',
                y: 149
            },
            {
                x: 'Mumbai',
                y: 184
            },
            {
                x: 'Ahmedabad',
                y: 55
            },
            {
                x: 'Bangaluru',
                y: 84
            },
            {
                x: 'Pune',
                y: 31
            },
            {
                x: 'Chennai',
                y: 70
            },
            {
                x: 'Jaipur',
                y: 30
            },
            {
                x: 'Surat',
                y: 44
            },
            {
                x: 'Hyderabad',
                y: 68
            },
            {
                x: 'Lucknow',
                y: 28
            },
            {
                x: 'Indore',
                y: 19
            },
            {
                x: 'Kanpur',
                y: 29
            }
        ]
    }],
    legend: {
        show: false
    },
    chart: {
        height: 350,
        type: 'treemap',
        toolbar: {
            show: false,
        },
    },

    colors: [
        '#3B93A5',
        '#F7B844',
        '#ADD8C7',
        '#EC3C65',
        '#CDD7B6',
        '#C1F666',
        '#D43F97',
        '#1E5D8C',
        '#421243',
        '#7F94B0',
        '#EF6537',
        '#C0ADDB'
    ],
    plotOptions: {
        treemap: {
            distributed: true,
            enableShades: false
        }
    }
};

var chart = new ApexCharts(document.querySelector("#treemap_2"), options);
chart.render();

// Polar Area

var options = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
        type: 'polarArea',
        width: 380,
    },
    stroke: {
        colors: ['#fff']
    },
    fill: {
        opacity: 0.8
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#polar_Area_1"), options);
chart.render();

var options = {
    series: [42, 47, 52, 58, 65],
    chart: {
        width: 380,
        type: 'polarArea'
    },
    labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
    fill: {
        opacity: 1
    },
    stroke: {
        width: 1,
        colors: undefined
    },
    yaxis: {
        show: false
    },
    legend: {
        position: 'bottom'
    },
    plotOptions: {
        polarArea: {
            rings: {
                strokeWidth: 0
            }
        }
    },
    theme: {
        monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
        }
    }
};

var chart = new ApexCharts(document.querySelector("#polar_Area_2"), options);
chart.render();

//
// Pie Charts
//


var options = {
    chart: {
        height: 320,
        type: 'pie',
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [50, 50, 50],
    labels: ["Series 1", "Series 2", "Series 3"],
    colors: ["#d9e6fd", "#4a8af6", "#fbc659"],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 6
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }]
}

var chart = new ApexCharts(
    document.querySelector("#apex_pie1"),
    options
);

chart.render();

//apex-pie2
const graficaConsumos = () => {

    var options = {
        chart: {
            height: 290,
            type: 'donut',
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [resSum[0].consumo, resSum[1].consumo, resSum[2].consumo, resSum[3].consumo, resSum[4].consumo, 0, 0],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: 6
        },
        labels: ["Silo 1", "Silo 2", "Silo 3", "Silo 4", "Silo 5", "Silo 6", "Silo 7"],
        colors: ["#d9e6fd", "#4a8af6", "#fbc659", "#11e6fd", "#4a8a06", "#fb265a", "#f8265a"],
        responsive: [{
            breakpoint: 650,
            options: {
                chart: {
                    height: 200
                },
                legend: {
                    show: false
                },
            }
        }],
        fill: {
            type: 'gradient'
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#apex_pie2-1"),
        options
    );

    chart.render();

}

//apex-pie2

var options = {
    chart: {
        height: 290,
        type: 'donut',
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [50, 20],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 6
    },
    labels: ["Carga Aq", "Carga Quimica 2"],
    colors: ["#fb265a", "#11e6fd"],
    responsive: [{
        breakpoint: 650,
        options: {
            chart: {
                height: 200
            },
            legend: {
                show: false
            },
        }
    }],
    fill: {
        type: 'gradient'
    }
}

var chart = new ApexCharts(
    document.querySelector("#apex_pie2-2"),
    options
);

chart.render();


//apex-pie2

var options = {
    chart: {
        height: 290,
        type: 'donut',
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [50, 20],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 6
    },
    labels: ["Carga Aq", "Carga Quimica 2"],
    colors: ["#d9e6fd", "#4a8af6"],
    responsive: [{
        breakpoint: 650,
        options: {
            chart: {
                height: 200
            },
            legend: {
                show: false
            },
        }
    }],
    fill: {
        type: 'gradient'
    }
}

var chart = new ApexCharts(
    document.querySelector("#apex_pie2-3"),
    options
);

chart.render();

//apex-pie3

var options = {
    chart: {
        height: 320,
        type: 'donut',
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [50, 50, 50],
    colors: ["#a3cae0", "#232f5b", "#f06a6c"],
    labels: ["Comedy", "Action", "SciFi"],
    dataLabels: {
        dropShadow: {
            blur: 3,
            opacity: 0.8
        }
    },
    fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
            enabled: true,
            style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
        },
    },
    states: {
        hover: {
            enabled: false
        }
    },
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 6
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }]
}

var chart = new ApexCharts(
    document.querySelector("#apex_pie3"),
    options
);

chart.render();



// Apex Radialbar Charts

// Apex-radialbar1


var options = {
    chart: {
        height: 320,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
            },
            track: {
                background: '#b9c1d4',
                opacity: 0.5,
            },
            dataLabels: {
                name: {
                    fontSize: '18px',
                },
                value: {
                    fontSize: '16px',
                    color: '#8997bd',
                },
            }
        },
    },
    colors: ["#4a8af6"],
    series: [70],
    labels: ['CRICKET'],

}

var chart = new ApexCharts(
    document.querySelector("#apex_radialbar1"),
    options
);

chart.render();



//Apex-radialbar2

var options = {
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            track: {
                background: '#b9c1d4',
                opacity: 0.5,
            },
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                    color: '#8997bd',
                },
                total: {
                    show: true,
                    label: 'Total',
                    color: '#8997bd',
                    formatter: function(w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249
                    }
                }
            }
        }
    },
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],

}

var chart = new ApexCharts(
    document.querySelector("#apex_radialbar2"),
    options
);

chart.render();



//Apex-radialbar3

var options = {
    chart: {
        height: 380,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            track: {
                background: '#b9c1d4',
                opacity: 0.3,
            },
            dataLabels: {
                name: {
                    fontSize: '16px',
                    color: '#8997bd',
                    offsetY: 120
                },
                value: {
                    offsetY: 76,
                    fontSize: '22px',
                    color: '#8997bd',
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        }
    },
    fill: {
        gradient: {
            enabled: true,
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
    colors: ["#4a8af6"],
    series: [67],
    labels: ['Median Ratio'],
    responsive: [{
        breakpoint: 380,
        options: {
            chart: {
                height: 280
            }
        }
    }]
}

var chart = new ApexCharts(
    document.querySelector("#apex_radialbar3"),
    options
);

chart.render();

//
// Sparkline
//


Apex.grid = {
    padding: {
        right: 0,
        left: 0
    }
}

Apex.dataLabels = {
    enabled: false
}

var randomizeArray = function(arg) {
    var array = arg.slice();
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// data for the sparklines that appear below header area
var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

// the default colorPalette for this dashboard
//var colorPalette = ['#01BFD6', '#5564BE', '#F7A600', '#EDCD24', '#F74F58'];
var colorPalette = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0']

var spark1 = {
    chart: {
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    stroke: {
        width: 2,
        curve: 'straight'
    },
    fill: {
        opacity: 0.2,
    },
    series: [{
        name: 'Metrica Sales ',
        data: randomizeArray(sparklineData)
    }],
    yaxis: {
        min: 0
    },
    colors: ['#f93b7a'],
    title: {
        text: '$424,652',
        offsetX: 20,
        style: {
            fontSize: '24px',
            color: '#8997bd',
            fontWeight: '500',
        }
    },
    subtitle: {
        text: 'Sales',
        offsetX: 20,
        style: {
            fontSize: '14px',
            color: '#8997bd',
        }
    }
}
new ApexCharts(document.querySelector("#spark1"), spark1).render();

var spark2 = {
    chart: {
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    stroke: {
        width: 2,
        curve: 'stepline'
    },
    fill: {
        opacity: 0.2,
    },
    series: [{
        name: 'Metrica Expenses ',
        data: randomizeArray(sparklineData)
    }],
    yaxis: {
        min: 0
    },
    colors: ['#fbb624'],
    title: {
        text: '$235,312',
        offsetX: 20,
        style: {
            fontSize: '24px',
            color: '#8997bd',
            fontWeight: '500',
        }
    },
    subtitle: {
        text: 'Expenses',
        offsetX: 20,
        style: {
            fontSize: '14px',
            color: '#8997bd',
        }
    }
}

new ApexCharts(document.querySelector("#spark2"), spark2).render();

var spark3 = {
    chart: {
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    fill: {
        opacity: 0.2,
    },
    series: [{
        name: 'Net Profits ',
        data: randomizeArray(sparklineData)
    }],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    yaxis: {
        min: 0
    },
    colors: ['#0acf97'],
    title: {
        text: '$135,965',
        offsetX: 20,
        style: {
            fontSize: '24px',
            color: '#8997bd',
            fontWeight: '500',
        }
    },
    subtitle: {
        text: 'Profits',
        offsetX: 20,
        style: {
            fontSize: '14px',
            color: '#8997bd',
        }
    }
}

new ApexCharts(document.querySelector("#spark3"), spark3).render();