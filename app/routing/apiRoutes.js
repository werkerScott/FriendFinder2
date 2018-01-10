// ===============================================================================
// LOAD DATA
// We are linking our routes to "data" sources.
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits the survey form and thus submits data to the server.
  // when a user submits form data (a JSON object)
  // the submitted data is evaulated against the friendsArray to find the closest match
  // when the match is found a dialog is displayed showing the match
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Our "server" will respond to requests and let users know who is the closest match
    // req.body is available since we're using the body-parser middleware
	var userData = req.body;

    var bestMatch;
   	var difference;

    var matchFound = false; // boolean for match found
    var bestDifference = 0; // variable for best difference in scores

    bestMatch = friendsData[0]; // initial

    console.log(userData);
    console.log(Object.getOwnPropertyNames(userData));
    // console.log(userData.scores);
    // console.log(userData.scores[]);

    // loop through friendsData object (5)
    for (var i = 0; i < friendsData.length; i++) {

        // reset difference counter in scores for current loop
        var difference = 0;

        // loop through each question for user and friendsData (10)
        for (var j = 0; j < userData.scores.length; j++) {

            // add difference between each answer to difference counter
            difference += Math.abs(userData.scores[j] - friendsData[i].scores[j]);

        }
        // initialization handler - this runs once
        if (!matchFound) {
            // set best difference as current difference
            bestDifference = difference;

            // set best match as current friendsData
            bestMatch = friendsData[i];

            // set match found boolean to true
            matchFound = true;

        // check to see if current item is better match then current best match
        } else {
            // if current difference is less...
            if (difference < bestDifference) {

                // set best difference as current difference
                bestDifference = difference;

                // set best match as current friendData
                bestMatch = friendsData[i];
        	}
    	}
    }


    // // we have looped through all the data and can return result
    res.json(bestMatch);

  });

};
