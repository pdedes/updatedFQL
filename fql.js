// Place your code here:

// Adds properties of obj2 into obj1
function merge(obj1, obj2) { 
    var returnObj = {};
    var args = [].slice.call(arguments, 0);
    var argLen = args.length;

    for(var i = 0; i < argLen; i++) {
        for (var key in args[i]) {
            returnObj[key] = args[i][key];
        }
    }

    return returnObj;

}

var FQL = function(data) {
    this.obj = data;
    this.storage = data; // original
    //this.length = data.length;
};

FQL.prototype.exec = function(){
    return this.obj;
}

FQL.prototype.count = function(){
    return this.obj.length;
}

FQL.prototype.limit = function(number){
    this.obj = this.obj.slice(0,number);
    return this;

    //var dummy = this.obj;
    //console.log(this.obj);
    //debugger;
    //var elements = dummy.splice(0, number);
    //this.obj = elements;
}

FQL.prototype.where = function (condition) {

    //iterate over the movieTable
    //compare the movie to the filter
    //update this.obj with results with the return of the comparison
    //This requires you to mutate this.obj

    var results = [];

    this.obj.forEach(function(movie) {
        var count = 0;
        for (var key in condition) {
            filter = condition[key];
            if(movie[key] === filter) {
                count++;
            } else if (typeof filter === 'function' && filter(movie[key])) {
                count++;
            }
        }
        if (count === Object.keys(condition).length) { results.push(movie); }
    });

    this.obj = results;
    return this;

    // var movies = this.obj;
    // debugger;
    // var holder = movies.forEach(movie, function existsInMovies (condition) {
    //     return movie.name === condition.name;
    // });

    // this.obj = holder;

    // return this;
}

FQL.prototype.select = function(columns){
    var results = []

    this.obj.forEach(function(movie) {
        debugger;

        var tempRow = columns.map(function (column) {
            var selectedObj = {};
            selectedObj[column] = movie[column];
            return selectedObj;
        })

        results.push(tempRow);
    });

    this.obj = results;
    return this;
}

FQL.prototype.order = function(attribute){

}

FQL.prototype.left_join = function(){

}

