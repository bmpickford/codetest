var $modal;

// Construcotr for modal
function Modal(title){
    this.$modal = $("#modal");
    $("#modal-title").text(title);
}

Modal.prototype.closeModal = function(){
    this.$modal.hide();
}

Modal.prototype.openModal = function(){
    this.$modal.show();
}

// Sets the input fields for the modal being used
Modal.prototype.setData = function(data){
    $("#modal-table").empty();
    data.forEach(function(items){
        for(var item in items){
            $label = $("<h4>");
            $input = $("<textarea>");
            
            //All ifs testing for exceptions cases, otherwise using textarea for best display
            if(item === "key"){
                continue;
            }
            
            if(item === "price"){
                items[item] = formatPrice(items[item]);
            }
            
            if(item === "game_increment"){
                items[item] = formatGameIncrement(items[item]);
            }
            
            if(item === "number_sets"){
                items[item] = formatNumberSets(items[item]);
            }
            
            if(item === "combinations"){
                items[item] = formatCombinations(items[item]);
            }
            
            if(item === "prize_pool"){
                items[item] = items[item].amount + " " + items[item].currency;
            }
            
            if(item === "jackpot_image" || item === "icon_url" || item === "icon_white_url"){
                $input = $("<img>");
                if(items[item].image_url){
                    $input.attr("src", items[item].image_url);
                } else {
                    $input.attr("src", items[item]);
                }
            }
            
            if(item === "play_url" || item === "terms_and_conditions_url"){
                $input = $("<a>");
                $input.attr('href', items[item]).text('Click to go to site');
            }
            
            if(item === "offers"){
                items[item] = items[item][0].name;
            }
            
            if(item === "prize"){
                var i = items[item];
                items[item] = i.name.toUpperCase() + ": " + i.description + ". Valued at " + i.value.amount;
                $input.append($("<h6>").text(i.name)).append($("<p>").text(i.description));
            }
            
            if(item === "game_offers"){
                $input = $("<div>");
                items[item].forEach(function(game, i){
                    $game = $("<a>").css('display','block');
                    $game.text(game.name).attr('href', '#');
                    $game.data('json', JSON.stringify(game));
                    $game.on('click', function(){
                        var data = JSON.parse($(this).data("json"));
                        var modal = new Modal(data.name);
                        modal.setData([data]);
                        modal.openModal();
                    });
                    $input.append($game);
                });
                
            }
            
            $label.text(item.toUpperCase());
            $input.val(items[item]);
            

            var $div = $("<div>").append($label).append($input).addClass('info-component');

            $("#modal-table").append($div);
        }
        $("#modal-table").append($("<div>").addClass('clear bottom-border'));
    });
}

function formatPrice(data){
    return data["amount"];
}

function formatGameIncrement(data){
    return JSON.stringify(data);
}

function formatNumberSets(data){
    data = data[0];
    return data['first'] + ':' + data['last'] + '. With count: ' + data['sets'][0].count
}

function formatCombinations(data){
    if(data && data.length > 0){
        return JSON.stringify(data);
    }
    return null;
}