const API_CONSUMOS = "http://localhost:8081/api/consumos/";
const API_CONSUMOSTURNO = `http://localhost:8081/api/consumos/turno/`;

let datTabl1, datTabl2, datTabla = {};
let datSilos, datAgregados, datQuimicos, datTurnos, consumos = {};
options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Mexico_City'
};

let formatter = new Intl.DateTimeFormat('es-Es', options);
let filtSelect = document.getElementById('multiSelect');
filtSelect.addEventListener('change', function() {
    const fechaFiltro = document.getElementById("picker_date_prod").value;
    let turnos = [0, 0, 0];
    if (filtSelect.options[0].selected) {
        turnos[0] = 1;
    };
    if (filtSelect.options[1].selected) {
        turnos[1] = 2;
    };
    if (filtSelect.options[2].selected) {
        turnos[2] = 3;
    };

    var tab = document.querySelector('thead');
    var cuerpo = document.querySelector('tbody');
    if (tab) {
        tab.remove();
        cuerpo.remove();
    }
    getAPIConsumos(turnos, fechaFiltro);



})


//-----------------------FUNCIONES --------------------------------------
const creaTablaProd = () => {
    const valEncabezado = `
    
    <tr>                                        
        <th scope="col">Marca de tiempo</th>
        <th scope="col">Formula</th>
        <th scope="col">Núm Batch</th>
        <th scope="col">Núm de silo</th>
        <th scope="col">Número de orden</th>
        <th scope="col">Grupo ingrediente</th>
        <th scope="col">Peso real</th>
    </tr>

`;

    var tbProd = document.querySelector('.tablprod');
    var tblBody = document.createElement("tbody");
    tbProd.appendChild(tblBody);
    const encabezado = document.createElement('thead');
    encabezado.innerHTML = valEncabezado;
    tbProd.append(encabezado);
    asindIDEnc = document.querySelector('thead');
    asindIDEnc.setAttribute('id', 'EstiloEnc');

    for (i = 0; i <= datTabl1.length; i++) {
        let timestamp = Date.parse(datTabl1[i].createdAt);
        const valRenglones = `       
            <td>${formatter.format(timestamp)}</td>
            <td>${datTabl1[i].formula}</td>
            <td>${datTabl1[i].numbatch}</td>
            <td>${datTabl1[i].numsilo}</td>
            <td>${datTabl1[i].numorden}</td>
            <td>${datTabl1[i].gruposilo}</td>
            <td>${datTabl1[i].real}</td>
                    
`;
        const renglon = document.createElement('tr');
        if (i % 2 == 0) {
            renglon.classList.add('table-primary');
        } else {
            renglon.classList.add('table-success');
        };
        renglon.innerHTML = valRenglones;
        tblBody.appendChild(renglon);
        var asingEstilo1 = document.querySelectorAll('.table-primary');
        var asingEstilo2 = document.querySelectorAll('.table-success');
        for (j = 0; j < asingEstilo1.length; j++) {
            asingEstilo1[j].setAttribute('id', 'Estilo');
        };

        for (k = 0; k < asingEstilo2.length; k++) {
            asingEstilo2[k].setAttribute('id', 'Estilo2');
        };

    };

};
const getAPIConsumos = (turnos, fechaFiltro) => {

    axios.get(API_CONSUMOS, {
        params: {
            fechaFiltro: fechaFiltro,
            turnos: turnos
        }
    }).then(res => {
        datTabla = res.data;
        datTabl2 = datTabla[0];
        datTabl1 = datTabla[1];
        datSilos = datTabla[2];
        datAgregados = datTabla[3];
        datQuimicos = datTabla[4];
        resSum = datTabla[0];




        //---------------------------CREACION DE TABLAS-------------

        $(document).ready(function() {


        });
        graficaAditivos();
        graficaBarras();
        // graficarOperecion(datTabl1);
        creaTablaCons(datTabl2);
        creaTablaProd();


        //-------------------------FIN DE CREACION DE TABLAS--------

    });
};

// const getAPIturnos = (turnos, fechaFiltro) => {

//     axios.get(API_CONSUMOSTURNO, {
//         params: {
//             fechaFiltro: fechaFiltro,
//             turnos: turnos
//         }
//     }).then(res => {
//         datTurnos = res.data;
//         datSilos = datTurnos[2];
//         datAgregados = datTurnos[3];
//         datQuimicos = datTurnos[4];
//         resSum = datTurnos[0];

//     });

// };

const creaTablaCons = (dato) => {
    graficaConsumos();
    console.log(dato);
    var table2 = new Tabulator("#datatable-2", {
        layout: "fitColumns",
        height: "287px",
        responsiveLayout: "collapse",
        autoColumns: false,
        data: dato,
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: true },
            { title: "Numero de  Silo", field: "silo", width: 150, hozAlign: "center", },
            { title: "Consumo real en Kg", field: "consumo", hozAlign: "center", sorter: "number", width: 250 },
        ],

        // autoColumns:true,
    });

}


var tabledata3 = [
    { id: 1, aditivo: "Carga AQ", peso: 0, },
    { id: 2, aditivo: "Carga Quimica 2", peso: 0 },
    { id: 3, aditivo: "TP 2", peso: 0 },
    { id: 4, aditivo: "TP 4", peso: 0 },

];
var table = new Tabulator("#datatable-1", {
    data: tabledata3, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    height: "387px",
    autoColumns: false,
    responsiveLayout: "collapse", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    //paginate the data
    paginationSize: 10, //allow 7 rows per page of data
    movableColumns: true, //allow column order to be changed
    resizableRows: true, //allow row order to be changed
    initialSort: [ //set the initial sort order of the data
        { column: "name", dir: "asc" },
    ],
    columns: [ //define the table columns
        { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: true },
        { title: "Aditivo", field: "aditivo", width: 250, hozAlign: "center" },
        { title: "Peso Kg", field: "peso", hozAlign: "center", width: 250, }


    ],
});

//graficas


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
                x: new Date('14:00:00').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Turno 2',
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


const graficaBarras = () => {
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
        series: [datTabl2[0].consumo, datTabl2[1].consumo, datTabl2[2].consumo, datTabl2[3].consumo, datTabl2[4].consumo],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 9,
            offsetY: 6
        },
        labels: ["Silo 1", "Silo 2", "Silo 3", "Silo 4", "Silo 5"],
        colors: ["#10e6fd", "#4a8af6", "#fbc659", "#11e6fd", "#4a8a06", "#fb265a", "#f8265a"],
        responsive: [{
            breakpoint: 650,
            options: {
                chart: {
                    height: 200
                },
                legend: {
                    show: true
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

};

const graficaAditivos = () => {
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
};