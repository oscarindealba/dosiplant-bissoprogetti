const xhr = new XMLHttpRequest();
let datTabla = {};
let totalProd = 0;
const now = new Date();




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
let ahora = formatter.format(now);
const API_REPORTES = `http://localhost:8081/api/reportes/`;

function onRequestHandler() {

    if (this.readyState === 4 && this.status === 200) {
        const numreg = 1000;
        const { reporte1: datosTabla } = JSON.parse(this.response);
        datTabla = datosTabla;

        var table = new Tabulator("#datatable-3", {
            layout: "fitDataFill",
            height: "580px",

            //pagination: "local",
            paginationSize: 120,
            addRowPos: "top",
            responsiveLayout: "collapse",
            autoColumns: false,
            resizableRows: false,
            initialSort: [
                { column: "createdAt", dir: "desc" },
            ],
            rowContextMenu: rowMenu,
            // columns: [
            //     { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: false },
            //     { title: "Time", field: "createdAt", width: 150, headerMenu: headerMenu },
            //     { title: "# de batch", field: "numbatch", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Formula", field: "formula", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 1", field: "Silo_1", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 2", field: "Silo_2", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 3", field: "Silo_3", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 4", field: "Silo_4", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 5", field: "Silo_5", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 6", field: "Silo_6", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Silo 7", field: "Silo_7", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Carga quimica AQ", field: "Carga_quimica_AQ", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Carga quimica 2", field: "Carga_quimica_2", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "TP_2", field: "TP_2", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "TP_4", field: "TP_4", hozAlign: "center", headerMenu: headerMenu },
            //     { title: "Total bachada", field: "TotalBatch", hozAlign: "center", headerMenu: headerMenu },

            // ],
            data: datosTabla,
        });

    }









};

const crearTablaHTML = () => {

    var tablaReporte1 = document.querySelector('.tabla-1');
    var tblBody = document.createElement("tbody");
    tablaReporte1.appendChild(tblBody);
    const valEncabezado = `
    
                                    <tr>                                        
                                        <th scope="col">Marca de tiempo</th>
                                        <th scope="col">Formula</th>
                                        <th scope="col">Num Batch</th>
                                        <th scope="col">Silo 1</th>
                                        <th scope="col">Silo 2</th>
                                        <th scope="col">Silo 3</th>
                                        <th scope="col">Silo 4</th>
                                        <th scope="col">Silo 5</th>
                                        <th scope="col">Silo 6</th>
                                        <th scope="col">Silo 7</th>
                                        <th scope="col">C. Quim AQ</th>
                                        <th scope="col">C. Quim A2</th>
                                        <th scope="col">TP 2</th>
                                        <th scope="col">TP 4</th>
                                        <th scope="col">Total B</th>
                                    </tr>
                              
                                `;
    const encabezado = document.createElement('thead');

    encabezado.innerHTML = valEncabezado;
    tablaReporte1.append(encabezado);
    asindIDEnc = document.querySelector('thead');
    asindIDEnc.setAttribute('id', 'EstiloEnc');


    for (i = 0; i <= datTabla.length; i++) {
        let timestamp = Date.parse(datTabla[i].createdAt);
        const valRenglones = `
        
                 
            <td>${formatter.format(timestamp)}</td>
            <td>${datTabla[i].formula}</td>
            <td>${datTabla[i].numbatch}</td>
            <td>${datTabla[i].Silo_1}</td>
            <td>${datTabla[i].Silo_2}</td>
            <td>${datTabla[i].Silo_3}</td>
            <td>${datTabla[i].Silo_4}</td>
            <td>${datTabla[i].Silo_5}</td>
            <td>${datTabla[i].Silo_6}</td>
            <td>${datTabla[i].Silo_7}</td>
            <td>${datTabla[i].Carga_quimica_2}</td>
            <td>${datTabla[i].Carga_quimica_AQ}</td>
            <td>${datTabla[i].TP_2}</td>
            <td>${datTabla[i].TP_4}</td>
            <td>${datTabla[i].TotalBatch}</td>             
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


    return tablaReporte1;

};

const getTotalProd = () => {
    let totalProd = 0;
    for (i = 0; i <= datTabla.length - 1; i++) {
        totalProd = totalProd + datTabla[i].TotalBatch;
    }
    totalProd = totalProd / 1000;
    var refTotalP = document.querySelector('.prodTotal');
    var parrafo = document.createElement("p");
    parrafo.classList.add('text-success');
    var valpProdT = `${totalProd} Ton`;
    parrafo.innerHTML = valpProdT;
    refTotalP.appendChild(parrafo);
    return refTotalP;

};

const dispalert = (arg) => {
    var hoy = new Date();
    var hora = hoy.getHours();
    var tab = document.querySelector('thead');
    var cuerpo = document.querySelector('tbody');
    if (tab) {
        tab.remove();
        cuerpo.remove();
    }
    fechaFiltro = document.getElementById("picker_date").value;
    if (!fechaFiltro) {
        executeExample('errorType');
    } else {

        axios.get(API_REPORTES, {
            params: {
                fechaFiltro: fechaFiltro,
                selTurno: arg
            }
        }).then(res => {
            //console.log(res.data.reporte1);
            datTabla = res.data.reporte1;
            crearTablaHTML();
            getTotalProd();

        });
    };

};


const filtroFecha = () => {
    ('.picker_date').datepicker({ dateFormat: "yyyy-MM-dd" });
    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
    console.log(output);
    return output;
};

//function actualizar() { location.reload(true); };

// document.getElementById("picker_date").addEventListener('click', function() {
//     var tablaReporte1 = document.querySelector('.tabla-1');
//     tablaReporte1.parentNode.removeChild(tablaReporte1);
//     return false;
// });



// document.getElementById("picker_date").addEventListener('change', function() {
//     var tab = document.querySelector('thead');
//     var cuerpo = document.querySelector('tbody');
//     if (tab) {
//         tab.remove();
//         cuerpo.remove();
//     }
//     fechaFiltro = document.getElementById("picker_date").value;
//     //let date = new Date();
//     //let output = formatter.format(fechaFiltro);


//     axios.get(API_REPORTES, {
//         params: {
//             fechaFiltro: fechaFiltro
//         }
//     }).then(res => {
//         //console.log(res.data.reporte1);
//         datTabla = res.data.reporte1;
//         crearTablaHTML();
//         getTotalProd();

//     });

// });

//const datos = xhr.addEventListener("load", onRequestHandler);
//xhr.open("GET", API_REPORTES);
//xhr.send();



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