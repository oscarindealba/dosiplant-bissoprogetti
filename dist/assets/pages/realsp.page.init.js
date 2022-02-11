const API_CONSUMOS = "http://localhost:8081/api/consumos/";
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


let datTabl1, datTabl2, datTabla = {};
let filtSelect = document.getElementById('multiSelect');

filtSelect.addEventListener('change', function() {

    const fechaFiltro = document.getElementById("picker_date_real").value;
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
    //console.log(turnos);

    getAPIConsumos(turnos, fechaFiltro);

})



//-----------------------FUNCIONES --------------------------------------
const creaTablaRealSP = () => {
    const valEncabezado = `
    
    <tr>                                        
        <th scope="col">Marca de tiempo</th>
        <th scope="col">Núm Batch</th>
        <th scope="col">Formula</th>
        <th scope="col">Núm de silo</th>
        <th scope="col">SetPoint</th>
        <th scope="col">Peso real</th>
        
    </tr>

`;

    var tbProd = document.querySelector('.tablealsp');
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
            <td>${datTabl1[i].numbatch}</td>
            <td>${datTabl1[i].formula}</td>
            <td>${datTabl1[i].numsilo}</td>
            <td>${datTabl1[i].setpoint}</td>
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

        //---------------------------CREACION DE TABLAS-------------

        graficarDesv(datTabl1);
        console.log(datTabl1);
        creaTablaRealSP();
        //console.log(datTabl2);
        //-------------------------FIN DE CREACION DE TABLAS--------

    });
};







//----------------------- FIN de FUNCIONES --------------------------------------


//--------------------LLAMADA DE FUCNIONES------------------------------




var rowMenu = [{
        label: "<i class='fas fa-user'></i> Change Name",
        action: function(e, row) {
            row.update({ name: "Steve Bobberson" });
        }
    },
    {
        label: "<i class='fas fa-check-square'></i> Select Row",
        action: function(e, row) {
            row.select();
        }
    },
    {
        separator: true,
    },
    {
        label: "Admin Functions",
        menu: [{
                label: "<i class='fas fa-trash'></i> Delete Row",
                action: function(e, row) {
                    row.delete();
                }
            },
            {
                label: "<i class='fas fa-ban'></i> Disabled Option",
                disabled: true,
            },
        ]
    }
]

//define column header menu as column visibility toggle
var headerMenu = function() {
    var menu = [];
    var columns = this.getColumns();

    for (let column of columns) {

        //create checkbox element using font awesome icons
        let icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");

        //build label
        let label = document.createElement("span");
        let title = document.createElement("span");

        title.textContent = " " + column.getDefinition().title;

        label.appendChild(icon);
        label.appendChild(title);

        //create menu item
        menu.push({
            label: label,
            action: function(e) {
                //prevent menu closing
                e.stopPropagation();

                //toggle current column visibility
                column.toggle();

                //change menu item icon
                if (column.isVisible()) {
                    icon.classList.remove("fa-square");
                    icon.classList.add("fa-check-square");
                } else {
                    icon.classList.remove("fa-check-square");
                    icon.classList.add("fa-square");
                }
            }
        });
    }

    return menu;
};

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