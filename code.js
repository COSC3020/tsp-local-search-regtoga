function tsp_ls(distance_matrix) {
    //make initial og_route
    var og_route = [];
    for (var i = 0; i < distance_matrix.length; i++){
        og_route.push(i);
    }

    //initialize current best time
    cbt = route_time(og_route, distance_matrix);
    //current best route
    cbr = og_route;

    for (var h = 0; h < og_route.length; h++){
        for (var i = 0; i < og_route.length - 1; i++) {
            for (var j = i + 1; j < og_route.length; j++) {
                og_route = two_opt_swap(og_route, i, j);
        
                var time_of_route = route_time(og_route, distance_matrix);

                if (time_of_route < cbt) {
                    cbt = time_of_route;
                    cbr = og_route;
                }
            }
        }
    }
    return cbt;
}

function route_time(og_route, distance_matrix){
    //function finds the time a certain og_route takes.
    var time = 0;
    var whereiwas = null;
    var whereigo = null;

    for (var i = 0; i < og_route.length; i++){
        if (whereiwas == null){
            whereiwas = og_route[i];
            continue;
        }

        whereigo = og_route[i];

        time += distance_matrix[whereiwas][whereigo];

        whereiwas = whereigo;
    } 

    return time;
}


//2optSwap(og_route, i, k)
//  cities 1 to i-1 stay in the order they are
//  cities i to k are reversed
//  cities k + 1 to n stay in the order they are


//For example, if I call the above function with og_route A--B--C--D--E--F, $i=2$,
//$k=4$, the resulting og_route is A--B--E--D--C--F.
//previous attempt only swaped them and not the whole slice.
function two_opt_swap(route, i, k) {
    // Create a copy of the route
    var new_route = route.slice();
    while (i < k) {
        var temp = new_route[i];
        new_route[i] = new_route[k];
        new_route[k] = temp;
        i += 1;
        k -= 1;
    }
    return new_route;
}