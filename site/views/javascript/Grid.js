var $grid;

// Constructor for Grid
// Sets the grid element
function Grid($grid) {
    this.$grid = $grid;
}

Grid.prototype.getGrid = function(){
    return this.$grid;
}

// Sets the grid data for raffles/lottery
Grid.prototype.setData = function(data, dataHeaders){
    this.$grid.jsGrid({
        width: '100%',
        filtering: false,
        editing: false,
        inserting: false,
        sorting: false,
        noDataContent: "No data found",
        
        data: data,
        fields: dataHeaders
    });
}

// Gets fields for lottery data used in grid
function getLotteryFields(){
    return [
        {'name': 'name', 'title': 'Name'},
        {'name': 'autoplayable', 'title': 'Autoplayable'},
        {'name': 'draws', 'title': 'Draws', 
            itemTemplate: function(value, item){
                var $link = $("<a>");
                $link.text("Click me for more info");
                $link.css("color", "blue");
                $link.css("text-decoration", "underline");
                $link.data("json", JSON.stringify(item));
                $link.on('click', function(){
                    var data = JSON.parse($(this).data("json"));
                    var modal = new Modal(data.name);
                    modal.setData(data.draws);
                    modal.openModal();
                });
                return $link;
            }
        },
        {'name': 'game_types', 'title': 'Game Offers', 
            itemTemplate: function(value, item){
                var $link = $("<a>");
                $link.text("Click me for more info");
                $link.css("color", "blue");
                $link.css("text-decoration", "underline");
                $link.data("json", JSON.stringify(item));
                $link.on('click', function(){
                    var data = JSON.parse($(this).data("json"));
                    var modal = new Modal(data.name);
                    modal.setData(data.game_types);
                    modal.openModal();
                });
                return $link;
            }
        },
        {'name': 'days', 'title': 'Days', 
            itemTemplate: function(value, item){
                if(value && value[0] && value[0].name){
                    return value[0].name;
                }
                
            }
        },
        {'name': 'quickpick_sizes', 'title': 'Quickpick Sizes',
            itemTemplate: function(value, item){
                var $text = $("<p>");
                var str = value.toString();
                $text.text(str);
                return $text;
            }
        }
    ]
}

// Gets fields for raffle data used in grid
function getRaffleFields(){
    return [
        {'name': 'name', 'title': 'Name'},
        {'name': 'autoplayable', 'title': 'Autoplayable'},
        {'name': 'draw', 'title': 'Draw', 
            itemTemplate: function(value, item){
                var $link = $("<a>");
                $link.text("Click me for more info");
                $link.css("color", "blue");
                $link.css("text-decoration", "underline");
                $link.data("json", JSON.stringify(item));
                $link.on('click', function(){
                    var data = JSON.parse($(this).data("json"));
                    var modal = new Modal(data.name);
                    modal.setData([data.draw]);
                    modal.openModal();
                });
                return $link;
            }
        },
        {'name': 'lottery', 'title': 'Lottery', 
            itemTemplate: function(value, item){
                var $link = $("<a>");
                $link.text("Click me for more info");
                $link.css("color", "blue");
                $link.css("text-decoration", "underline");
                $link.data("json", JSON.stringify(item));
                $link.on('click', function(){
                    var data = JSON.parse($(this).data("json"));
                    var modal = new Modal(data.name);
                    modal.setData([data.lottery]);
                    modal.openModal();
                });
                return $link;
            }
        },
    ]
}