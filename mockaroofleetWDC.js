(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var cols = [{
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
        var tableSchema = {
            id: "Mockaroo_Fleet_Data",
            alias: "MockarooFleetData",
            columns: cols
        };
    
        schemaCallback([tableSchema]);

    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://my.api.mockaroo.com/users.json?key=171ff1e0", function(resp) {
            var feat = resp,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
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
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Mockaroo Fleet data API";
            tableau.submit();
        });
    });
})();