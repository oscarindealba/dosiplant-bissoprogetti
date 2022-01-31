const API_USERS = "http://localhost:8081/api/reportes/";
const xhr = new XMLHttpRequest();
let datTabla = {};
let totalProd = 0;



function onRequestHandler() {

    if (this.readyState === 4 && this.status === 200) {
        const numreg = 1000;
        const { reporte1: datosTabla } = JSON.parse(this.response);
        datTabla = datosTabla;

        var table = new Tabulator("#datatable-3", {
            layout: "fitDataFill",
            height: "2680px",

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






    //funcion para generar datos en .xlsx
    // document.getElementById("download-xlsx").addEventListener("click", function() {
    //     table.download("xlsx", "data.xlsx", { sheetName: "Reporte" });
    // });

    // document.getElementById("download-pdf").addEventListener("click", function() {
    //     const urlBtn = document.documentURI;


    //     if (urlBtn === "http://localhost:8081/realvssp") {
    //         console.log(urlBtn);
    //         table3.download("pdf", "realvsSP.pdf", {
    //             orientation: "portrait",
    //             title: "Reporte de Real Vs SetPoint",
    //         });
    //     }

    //     if (urlBtn === "http://localhost:8081/produccion") {
    //         console.log(urlBtn);
    //         table.download("pdf", "repProd.pdf", {
    //             orientation: "portrait",
    //             title: "Reporte de producción",
    //             format: 'letter',
    //         });
    //     }


    // });
};


const crearTablaHTML = () => {
    var tablaReporte1 = document.querySelector('.tabla-1');
    var tblBody = document.createElement("tbody");
    tablaReporte1.appendChild(tblBody);

    const valEncabezado = `
    <thead>
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
                                </thead>
                                `;


    const encabezado = document.createElement('thead');

    encabezado.innerHTML = valEncabezado;
    tablaReporte1.append(encabezado);
    var a = document.createAttribute("Estilo");

    for (i = 0; i <= datTabla.length; i++) {
        totalProd = totalProd + datTabla[i].TotalBatch;


        const valRenglones = `
        
        <tr>
         
            <th scope="row">${datTabla[i].createdAt}</td>
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

        </tr>
        
        
`;
        const renglon = document.createElement('tr');

        if (i % 2 == 0) {
            renglon.classList.add("table-primary");


        };
        document.getElementsByTagName('table')[0].setAttribute('id', 'Estilo');

        renglon.innerHTML = valRenglones;
        tablaReporte1.append(renglon);
        tblBody.appendChild(renglon);
    }
    return div;

};

const getTotalProd = () => {

    return totalProd;
    s

}

const datos = xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", API_USERS);
xhr.send();


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