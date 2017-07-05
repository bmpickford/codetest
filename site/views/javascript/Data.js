var data;

//Constructor for data
function Data(data){
    this.data = data;
}

//Gets all the original data
Data.prototype.getAllData = function(){
    return this.data;
}

//Splits the data so it is split into the two types
Data.prototype.getTypeData = function(){
    return formatTypeData(this.data);
}

//Gets the two different types for data (raffle/lottery)
Data.prototype.getTypes = function(){
    return getTypes(this.data);
}



////////////////// HELPER FUNCTIONS ////////////////////
function formatTypeData(data){
    var types = getTypes(data);
    var typeData = [];
    types.forEach(function(item){
        var a = {'name': item, 'tickets':[]};
        for(var i = 0; i < data.length; i++){
            if(data[i].type === item){
                a.tickets.push(data[i]);
            }
        }
        typeData.push(a);
    });
    return typeData;
}

function getTypes(data){
    var types = [];
    for(var i = 0; i < data.length; i++){
        var index = types.indexOf(data[i].type);
        if(index && index <= 0){
           types.push(data[i].type);
        }
    }
    return types;
}