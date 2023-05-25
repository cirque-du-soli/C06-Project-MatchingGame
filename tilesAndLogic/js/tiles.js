$("#testButton").click(function () {
    $(".tile").animate({



    });
});

/////////////////////////////////////////////
//////////////////CUSTOM FUNCTIONS:

//SHUFFLE 
function shuffleCards(cardUrls) {
    let randIndex;
    let curIndex = cardUrls.length
    let temp;

    // cycle through all items in the array
    while (curIndex > 0) {

        // Pick a random element.
        randIndex = Math.floor(Math.random() * curIndex);
        curIndex--;

        // random element swaps places with current element
        temp = cardUrls[curIndex];
        cardUrls[curIndex] = cardUrls[randIndex];
        cardUrls[randIndex] = temp;
    }

    return cardUrls;
}

//COMPARE CARDS 
function compareCards(cards) {

    console.log("card1");
    console.log(cards[0]);

    console.log("card2");
    console.log(cards[1]);

    if ($(cards[0]).attr("src") == $(cards[1]).attr("src")) {
        return true;
    } else {
        return false;
    }
}

//GAME OVER
function gameOver(guesses) {

    //TODO make this more dramatic
    console.log("You won after " + guesses + " guesses!");

    //TODO show newgame button

}; //END: fn gameOver

/////////////////////////////////////////////
////////////// START: //////////////////
// document ready TODO

// INITIAL SETUP

// how many pairs in the game
let curTotalPairs = 2; //BONUS: this could be decided by user
let curTotalCards = 2 * curTotalPairs;

// get array of img urls (will be files from folder)
let allImageUrls = new Array();
let maxImages = 10;
let urlString = "";

for (let i = 1; i <= maxImages; i++) {
    urlString = "https://picsum.photos/seed/" + i + "/240/320";
    allImageUrls.push(urlString);
}

console.log("allImageUrls");
console.log(allImageUrls);


////////////////////////////////////////////////////
// New Game button is clicked: //TODO add listener!!!

// generate random indexes
let randomIndexes = [];
let randomIndex;

// create array of random indexes (to choose images)
for (i = 0; i < curTotalPairs; i++) {

    // choose a unique random index
    do {
        randomIndex = Math.floor(Math.random() * allImageUrls.length);
        console.log(randomIndex); //TODO remove
        console.log("randomIndex"); //TODO remove
    } while (randomIndexes.indexOf(randomIndex) >= 0); // while random index is already in array

    // add unique i to array
    randomIndexes.push(randomIndex);

    console.log("randomIndexes"); //TODO remove
    console.log(randomIndexes); //TODO remove
}

// create array of card face images -- two of each image
let curFaceImages = [];
let rImage;

for (let j in randomIndexes) {

    //url at the random index
    rImage = allImageUrls[randomIndexes[j]];

    console.log("rImage"); //TODO remove
    console.log(rImage); //TODO remove


    // add to array twice
    curFaceImages.push(rImage);
    curFaceImages.push(rImage);

    console.log(curFaceImages); //TODO remove
    console.log("curFaceImages"); //TODO remove

}

// randomly shuffle the array of current images 
let shuffledFaceImages = shuffleCards(curFaceImages);
console.log(shuffledFaceImages);

// place images into their tiles
for (let i in shuffledFaceImages) {
    $("#face" + i).attr("src", shuffledFaceImages[i]);

}

///////////////////////////////////////////////////////////////
///////////////////////// DONE SHUFFLING //////////////////////

let numShown;
let isMatch;
let guesses = 0;
let twoCards = [];
let timer;

// instruct user to click a tile //TODO

// Every time user clicks on a tile:
$(".cardToFlip").on("click", function () { // refer to the div with the .cardToFlip class
    console.log("clicked a tile");

    // add .showCard class to div 
    $(this).addClass("showCard");


    // counds shown cards
    numShown = $(".showCard").length;
    console.log("numShown");
    console.log(numShown);

    if (numShown >= 2) { //when 2 are shown

        //array of the img elements that are descendants of elems w/ .showCard class
        twoCards = $(".showCard").find(".cardFace").find("img");
        console.log("twoCards");
        console.log(twoCards);

        // compare the cards
        isMatch = compareCards(twoCards);

        // check if it"s a match
        if (!isMatch) {// not a match
            //TODO: indicate MISS to user
            console.log("NOT MATCH: removed class showCard")
            // DELAY
            timer = setTimeout(function () {

                //remove .showCard class
                $(".showCard").removeClass("showCard");

            }, 2000); //END: TIMER



        } else { // it"s a match!

            console.log("IT'S A MATCH!!!")

            //lock the cards in shown state
            $(".showCard").addClass("lockCard");
            console.log("added .lockCard")

            //remove .showCard class
            $(".showCard").removeClass("showCard");
            console.log("removed .showCard")

            // Check if unshown tiles remain
            if ($(".cardToFlip").length == $(".lockCard").length) { //if all cards are locked

                // GAME OVER 
                gameOver(guesses);

            } else {
                // NEXT ROUND

            }//END:check GameOver

        }//END: check if match
      
    }//END: check 2 shown

}); //END: on card click
