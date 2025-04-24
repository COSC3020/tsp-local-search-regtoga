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

    var getting_better_counter = 0;
    while (getting_better_counter < 2 ** (distance_matrix.length/2)){
        
        for (var i = 0; i < og_route.length - 1; i++) {
            for (var j = i + 1; j < og_route.length; j++) {
                og_route = two_opt_swap(og_route, i, j);
        
                var time_of_route = route_time(og_route, distance_matrix);

                if (time_of_route < cbt) {
                    cbt = time_of_route;
                    cbr = og_route;
                    getting_better_counter = 0;
                }
            }
        }
        getting_better_counter += 1;
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

matrix = [
    [0, 10, 11, 14, 10, 12, 12, 13, 18, 20, 12, 17, 19, 15, 11, 19],
    [10, 0, 14, 15, 14, 13, 13, 14, 17, 15, 11, 12, 13, 12, 13, 13],
    [11, 14, 0, 12, 11, 18, 12, 16, 17, 14, 18, 11, 13, 20, 15, 10],
    [14, 15, 12, 0, 16, 11, 10, 10, 17, 12, 14, 14, 20, 20, 19, 18],
    [10, 14, 11, 16, 0, 11, 10, 14, 20, 18, 14, 15, 12, 19, 12, 16],
    [12, 13, 18, 11, 11, 0, 10, 15, 14, 13, 15, 14, 13, 11, 18, 16],
    [12, 13, 12, 10, 10, 10, 0, 11, 15, 16, 19, 19, 20, 10, 17, 14],
    [13, 14, 16, 10, 14, 15, 11, 0, 16, 20, 11, 11, 12, 10, 16, 19],
    [18, 17, 17, 17, 20, 14, 15, 16, 0, 13, 17, 18, 10, 18, 16, 11],
    [20, 15, 14, 12, 18, 13, 16, 20, 13, 0, 14, 14, 16, 11, 18, 12],
    [12, 11, 18, 14, 14, 15, 19, 11, 17, 14, 0, 10, 10, 16, 14, 17],
    [17, 12, 11, 14, 15, 14, 19, 11, 18, 14, 10, 0, 11, 12, 10, 18],
    [19, 13, 13, 20, 12, 13, 20, 12, 10, 16, 10, 11, 0, 17, 19, 16],
    [15, 12, 20, 20, 19, 11, 10, 10, 18, 11, 16, 12, 17, 0, 18, 12],
    [11, 13, 15, 19, 12, 18, 17, 16, 16, 18, 14, 10, 19, 18, 0, 13],
    [19, 13, 10, 18, 16, 16, 14, 19, 11, 12, 17, 18, 16, 12, 13, 0]
]

console.log(tsp_ls(matrix));