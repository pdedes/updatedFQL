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
        var selectedObj = {};
        
        //["id", "name"] <-- array of columns
        // Get to every key in the movie row object
        // Then check to see if the columns array contains the asme keys
        // Use [].indexOf(key) to push that element to the temp object
        Object.keys(movie).forEach(function(key) {
            if(columns.indexOf(key) !== -1) {
                selectedObj[key] = movie[key];
            }
        });

        results.push(selectedObj);
        // var tempRow = columns.map(function (column) {
        //     selectedObj[column] = movie[column];
        //     return selectedObj;
        // })
    });

    this.obj = results;
    return this;
}

FQL.prototype.order = function(attribute){

    // var attr = eval(attribute);

    this.obj.sort(function(a, b) {
        // We are providing sort with a way to make a mathematical comparison
        return a[attribute] - b[attribute];
        // if (a.attribute > b.attribute) { return 1; }
        // else if (a.attribute < b.attribute) { return -1; }
        // else { return 0; }
    });

    return this;
}

FQL.prototype.left_join = function(joinTable, joinFunc){
    //joinTable is the table being joined to
    //joinFunc takes two parameters and acts as the SQL joing equality setting 
    var results = [];

    //loop through every movie
    this.obj.forEach(function(movie) {
        var tempObj = {};

        //loop through ever left-joined element
        //use a combo of loop/joinFunc to loop through roles and join
        var tempObj = joinTable.filter(joinFunc(movie, joinTable));
        
        //do the final merge on the returned tempObj and movie row
        merge(movie, tempObj);
        results.push(results);
    });

    this.obj = results;
    return this;
}


















