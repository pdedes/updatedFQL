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

FQL.prototype.order = function(attribute){

}

FQL.prototype.left_join = function(){


}

FQL.prototype.select = function(columns){

    console.log(columns);
    //debugger;
    // basic version takes only a key
    // for the column that you want to return

    // advanced version takes an array of columns
    // returns the rows that match each column in columns array

    // this.obj is storing current array of data from table
    // we want the columns from the selected array, which means we need the key  

    var results = [];
    var dummyObject = {};
    var length = this.obj.length;
    // loop through rows

    for (var i = 0; i < length; i++){


        // loop through arguments in columns array
        //debugger;

        for (var j = 0; j < columns.length; j++){
            // go to column and put those values in new object

            //console.log(key);
            //console.log(dummyObject);

            console.log("value of j: " + j);
            console.log("columns[j] should be key: " + columns[j]);
            console.log("dummyObject is: " + dummyObject);

            // columns[j] is the key of the current row
            // this.storage[i] (is the row in the main table)
            // [columns[j]] is the value stored at the key
            var attribute = columns[j];
            var storage = this.storage[i];
            console.log("this is this.storage[i]: " + this.storage[i]);
            console.log("this is storage: " + storage);
            dummyObject[attribute] = storage[attribute];               
                
            // old dummy object
            //{  
             // columns[j] : this.storage[i].columns[j] 
             //              };

            // builds object
        }

        // puts object (the row) in array in correct order
        results[i] = dummyObject;

        // technically loop should overwrite old keys, but lets be safe
        dummyObject = {};

    }
debugger;
    // update working copy of data by replacing with results array
    this.obj = results;
    return this;


}

// FQL.prototype.where = function (condition) {
//     var results = [];

//     // Cycling through the condition filters
//     for (var key in condition) {

//         // entering movie table
//         for (var i = 0; i < this.obj.length; i++) {

//             // looping individual row (this.obj[i] is row)
//             // Omri informs us that this is an unnecessary loop, 
//             // since we can dial straight to the object attributes
//             for (var key2 in this.obj[i]){

//                 // need number of properties in condition
//                 // conditions.length (get length of object)
//                 // loop through object's properties
//                 // access original object and compare appropriate key for condition

//                 // condition(year) compare with this.obj[i].key (we want year, not the value of year)
//                 // condition(rank) compare with

//                 // check for string equality
//                 if (condition[key] === this.obj[i][key2]) {
//                     //if true, push to stack
//                     results.push(this.obj[i]);

//                     // else if not string, check if function
//                 } else if ((typeof condition[key] === 'function') && (key === key2)){
//                     // if function and meets condition
//                     var movieRow = this.obj[i];
//                     var filter = condition[key]; 
//                     debugger;
//                     console.log(condition[key]);
//                     console.log(condition[key](movieRow[key2]));
//                     console.log("This is key: " + key);
//                     console.log("This is key2: " + key2);

//                     if (filter(movieRow[key2])){
//                         console.log("This ran successfully " + filter(movieRow[key2]));
//                         // push to stack
//                         results.push(this.obj[i]);
//                     }
//                 }
//             }
//         }
//     }

//     this.obj = results;
//     return this;
// }



FQL.prototype.where = function (condition) {
    var results = [];
    var counter = 0;

    // Cycling through the condition filters
    for (var key in condition) {
        // entering movie table


        for (var i = 0; i < this.obj.length; i++) {
           

                    var filter = condition[key]; 
                    var movieRow = this.obj[i];

                // check for string equality
                if (filter === this.obj[i][key]) {
                    //if true, push to stack
                    results[counter].push(this.obj[i]);

                    // else if not string, check if function
                    } else if ((typeof filter === 'function') && (filter(movieRow[key]) )) {
                    // if function and meets condition
                    //var movieRow = this.obj[i];
//                    var filter = condition[key]; 


                    //if (filter(movieRow[key2])){
                      //  console.log("This ran successfully " + filter(movieRow[key2]));
                        // push to stack
                        results[counter].push(this.obj[i]);
                    }
                
                }
        //end of for loop with i
        counter++;
        }
    
    //
    //return the interserction of the two arrays
    for (var k = 0; k < counter; k++)
    {
        if results[k]
    }


    this.obj = results;
    return this;
}

