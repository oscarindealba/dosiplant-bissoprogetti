const API_USERS = "http://localhost:8081/api/consumos/";
const xhr = new XMLHttpRequest();



function onRequestHandler() {

    if (this.readyState === 4 && this.status === 200) {

        const datosTabla = JSON.parse(this.response);
        const datTabl2 = datosTabla[0];
        const datTabl1 = datosTabla[1];
        console.log(datTabl2);


        var table = new Tabulator("#datatable-3", {
            layout: "fitDataFill",
            height: "350px",
            pagination: "local",
            paginationSize: 10,
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
                { title: "Formula", field: "formula", hozAlign: "center", headerMenu: headerMenu },
                { title: "Numero de silo", field: "numsilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Tipo", field: "gruposilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Peso Agregado", field: "setpoint", hozAlign: "center", headerMenu: headerMenu },
            ],
            data: datTabl1,
        });

        var table2 = new Tabulator("#datatable-2", {
            layout: "fitColumns",
            height: "350px",
            responsiveLayout: "collapse",
            autoColumns: false,
            data: datTabl2,
            columns: [
                { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: true },
                { title: "Numero de  Silo", field: "silo", width: 150, hozAlign: "center", },
                { title: "Consumo en Kg", field: "consumo", hozAlign: "center", sorter: "number", width: 150 },


            ],

            // autoColumns:true,
        });


    }

    document.getElementById("download-csv").addEventListener("click", function() {
        table.download("csv", "data.csv");
    });
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



//funcion para generar datos en .csv 
document.getElementById("download-csv").addEventListener("click", function() {
    table.download("csv", "data.csv");
});

//funcion para generar datos en .json
document.getElementById("download-json").addEventListener("click", function() {
    table.download("json", "data.json");
});

//funcion para generar datos en .xlsx
document.getElementById("download-xlsx").addEventListener("click", function() {
    table.download("xlsx", "data.xlsx", { sheetName: "Reporte" });
});

//funcion para generar datos en .pdf 
document.getElementById("download-pdf").addEventListener("click", function() {
    table.download("pdf", "data.pdf", {
        orientation: "portrait", //set page orientation to portrait
        title: "Reporte de producción", //add title to report
    });
});

//funcion para generar datos en .htmle
document.getElementById("download-html").addEventListener("click", function() {
    table.download("html", "data.html", { style: true });
});