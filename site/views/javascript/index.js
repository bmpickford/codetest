$( document ).ready(function() {
    var data;
    
    // Server URL
    var URL = "http://localhost:8080";
    
    var $grid = $("#js-grid");
    var $raffles = $("#raffles");
    var $lotteries = $("#lotteries");
    
    // JQUERY request to localhost server
    var request = $.ajax({ url: URL, method: 'GET' });
    
    // Execute on request completion
    request.done(function(result) {
        console.log('Successfully retrieved data');
        data = result.result;
        
        var _grid = new Grid($grid);
        var _data = new Data(data);
        var typeData = _data.getTypeData();
    });
    
    // Execute on request fail
    request.fail(function(result) {
        console.log("Failed to retrieve data, make sure server is running on: " + URL);
    });
    
    // Lottery button listener
    $lotteries.on('click', function(){
        var fields = getLotteryFields();
        var lotteryGrid = new Grid($grid);
        var _data = new Data(data);
        
        var lotteryData = $.grep(data, function(n, i){
                return n.type === "lottery_ticket";
            });
        
        lotteryGrid.setData(lotteryData, fields);
    });
    
    // Raffle button listener
    $raffles.on('click', function(){
        var fields = getRaffleFields();
        var raffleGrid = new Grid($grid);
        var _data = new Data(data);
        
        var raffleData = $.grep(data, function(n, i){
                return n.type === "raffle_ticket";
            });
        
        raffleGrid.setData(raffleData, fields);
    });
    
    // Button listener for closing modal
    $("#modal-close").on('click', function(){
        $("#modal").hide();
    });
});
