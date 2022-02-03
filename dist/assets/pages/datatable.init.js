const API_USERS = "http://localhost:8081/api/consumos/";
const xhr = new XMLHttpRequest();



function onRequestHandler() {
    var tabledata3 = [
        { id: 1, aditivo: "Carga AQ", peso: 12, },
        { id: 2, aditivo: "Carga Quimica 2", peso: 1 },

    ];


    var table = new Tabulator("#datatable-1", {
        data: tabledata3, //load row data from array
        layout: "fitColumns", //fit columns to width of table
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
            { title: "Aditivo", field: "aditivo", width: 250 },
            { title: "Peso", field: "peso" }


        ],
    });




    if (this.readyState === 4 && this.status === 200) {

        const datosTabla = JSON.parse(this.response);
        const datTabl2 = datosTabla[0];
        const datTabl1 = datosTabla[1];



        var table = new Tabulator("#datatable-3", {
            layout: "fitDataFill",
            height: "550px",
            pagination: "local",
            paginationSize: 12,
            addRowPos: "top",
            responsiveLayout: "collapse",
            movableColumns: true,
            resizableRows: false,
            initialSort: [
                { column: "createdAt", dir: "desc" },
            ],
            rowContextMenu: rowMenu,
            columns: [
                // { title: "ID", field: "id", sorter: "number", headerMenu: headerMenu }, //add menu to this column header
                { title: "Marca de tiempo", field: "createdAt", headerMenu: headerMenu },
                { title: "Numero de batch", field: "numbatch", hozAlign: "center", headerMenu: headerMenu },
                { title: "Formula", field: "formula", hozAlign: "center", headerMenu: headerMenu },
                { title: "Numero de silo", field: "numsilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Tipo", field: "gruposilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Peso Real", field: "setpoint", hozAlign: "center", headerMenu: headerMenu },
            ],
            data: datTabl1,
        });



        var table2 = new Tabulator("#datatable-2", {
            layout: "fitColumns",
            height: "287px",
            responsiveLayout: "collapse",
            autoColumns: false,
            data: datTabl2,
            columns: [
                { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: true },
                { title: "Numero de  Silo", field: "silo", width: 150, hozAlign: "center", },
                { title: "Consumo real en Kg", field: "consumo", hozAlign: "center", sorter: "number", width: 250 },


            ],

            // autoColumns:true,
        });

        var table3 = new Tabulator("#datatable-4", {
            layout: "fitDataFill",
            height: "650px",
            pagination: "local",
            paginationSize: 12,
            addRowPos: "top",
            responsiveLayout: "collapse",
            movableColumns: true,
            resizableRows: false,
            initialSort: [
                { column: "createdAt", dir: "desc" },
            ],
            rowContextMenu: rowMenu,
            columns: [
                // { title: "ID", field: "id", sorter: "number", headerMenu: headerMenu }, //add menu to this column header
                { title: "Marca de tiempo", field: "createdAt", headerMenu: headerMenu },
                { title: "Numero de batch", field: "numbatch", hozAlign: "center", headerMenu: headerMenu },
                // { title: "Formula", field: "formula", hozAlign: "center", headerMenu: headerMenu },
                { title: "Numero de silo", field: "numsilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Set Point", field: "setpoint", hozAlign: "center", headerMenu: headerMenu },
                { title: "Real", field: "real", hozAlign: "center", headerMenu: headerMenu },
            ],
            data: datTabl1,
        });


    };

    var modulo = (() => {
        const name = 'Hola Gustavo';

        return {
            greet() {
                return name;
            }
        }
    })();




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