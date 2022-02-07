const API_CONSUMOS = "http://localhost:8081/api/consumos/";

let datTabl1, datTabl2, datTabla = {};


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
const getAPIConsumos = () => {

    axios.get(API_CONSUMOS).then(res => {
        //console.log(res.data.reporte1);
        datTabla = res.data;
        datTabl2 = datTabla[0];
        datTabl1 = datTabla[1];
        //console.log(datTabl1);
        // creaTablaConsumo();

        //---------------------------CREACION DE TABLAS-------------

        creaTablaCons(datTabl2);
        creaTablaProd();
        //console.log(datTabl2);
        //-------------------------FIN DE CREACION DE TABLAS--------

    });
};

const creaTablaCons = (dato) => {
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