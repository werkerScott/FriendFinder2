
    var bestMatch;

    // array of answers from new friend
    var answers = friend.scores.split(",");

    // number of answers in array
    var numAnswers = answers.length;


    if (results) {

        // variable for mysql friends object
        var friends = results;

        // boolean for match found
        var matchFound = false;

        // variable for best difference in scores
        var bestDifference = 0;

        // variable for best match
        bestMatch = friends[0];

        // loop through mysql results
        for (var i = 0; i < friends.length; i++) {

            // difference counter in scores for current loop
            var difference = 0;

            // loop through each question in new friend and current mysql friend results array
            for (var j = 0; j < answers.length; j++) {

                // add difference between each answer to difference counter
                difference += Math.abs(answers[j] - friends[i].friend_results.split(",")[j]);

            }

            // if match found boolean is still false...
            if (!matchFound) {

                // set best difference as current difference
                bestDifference = difference;

                // set best match as current mysql friend result
                bestMatch = friends[i];

                // set match found boolean to true
                matchFound = true;

            // else if match has been found...
            } else {

                // if current difference is less...
                if (difference < bestDifference) {

                    // set best difference as current difference
                    bestDifference = difference;

                    // set best match as current mysql friend
                    bestMatch = friends[i];
                }
            }
        }
    }


