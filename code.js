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

    for (var i = 0; i < og_route.length; i++){
        for (var j = 0; j < og_route.length; j++){
            var route = two_opt_swap(og_route, i, j);

            var time_of_route = route_time(route, distance_matrix);
            if (time_of_route < cbt){
                cbt = time_of_route
                cbr = route;
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
function two_opt_swap(og_route, i, k){
    var temp = og_route[i];
    og_route[i] = og_route[k];
    og_route[k] = temp;

    return og_route;
}

dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
//console.log(tsp_ls(dm));