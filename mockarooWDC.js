(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var fleet_data_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "gender",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "first_name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "last_name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "email",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "car_maker",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "car_model",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "start_date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "end_date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "ATN",
            dataType: tableau.dataTypeEnum.float
        }]
        var fleetData = {
            id: "Mockaroo_Fleet_Data",
            alias: "MockarooFleetData",
            columns: fleet_data_cols
        };
        var store_data_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "product_name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "shop",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "quantity",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "sales",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "profit",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "purchase_date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "ship_date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "arrival_date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "ship_mode",
            dataType: tableau.dataTypeEnum.string
        }]
        var storeData = {
            id: "Mockaroo_Store_Data",
            alias: "MockarooStoreData",
            columns: store_data_cols
        };
    
        schemaCallback([fleetData, storeData]);

    };

    myConnector.getData = function(table, doneCallback) {
        var apiCallString = JSON.parse(tableau.connectionData)
        apiCall= "https://my.api.mockaroo.com/"+ apiCallString + "?key=171ff1e0"

        $.getJSON(apiCall, function(resp) {
            var feat = resp,
                tableData = [];

            var i = 0;

            if (table.tableInfo.id == "Mockaroo_Fleet_Data") {
                for (i = 0, len = feat.length; i < len; i++) {
                    tableData.push({
                        "id": feat[i].id,
                        "gender": feat[i].gender,
                        "first_name": feat[i].first_name,
                        "last_name": feat[i].last_name,
                        "email": feat[i].email,
                        "car_maker": feat[i]["car maker"],
                        "car_model": feat[i]["car model"],
                        "start_date": feat[i]["start date"],
                        "end_date": feat[i]["end date"],
                        "ATN": feat[i].ATN
                    });
                }
            };
    
            if (table.tableInfo.id == "Mockaroo_Store_Data") {
                for (i = 0, len = feat.length; i < len; i++) {
                    tableData.push({
                        "id": feat[i].id,
                        "product_name": feat[i].product_name,
                        "shop":feat[i].shop,
                        "quantity": feat[i].quantity,
                        "sales": feat[i].sales,
                        "profit": feat[i].profit,
                        "purchase_date": feat[i].purchase_date,
                        "ship_date": feat[i].ship_date,
                        "arrival_date": feat[i].arrival_date,
                        "ship_mode":feat[i].ship_mode
                    });
                }
            };    

    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            var apiCallString = "fleet_data.json";
            tableau.connectionData = JSON.stringify(apiCallString);
            tableau.connectionName = "Mockaroo Fleet data API";
            tableau.submit();
        });
        $("#submitButton1").click(function () {
            var apiCallString = "store_data.json";
            tableau.connectionData = JSON.stringify(apiCallString);
            tableau.connectionName = "Mockaroo Store data API";
            tableau.submit();
        });
    });
})();