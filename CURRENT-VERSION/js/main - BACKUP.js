/////////////////////////////////////////////
////////////////// SETUP:

let numShown;
let isMatch;
let guesses = 0;
let bestScore;
let twoCards = [];
let timer;
let allImageUrls = new Array();
let maxImages = 20;
let urlString = "";
let curTotalPairs;
let curTotalCards;
let timerRunning = false;

/////////////////////////////////////////////
////////////////// LISTENERS:

// when page loads:
$(document).ready(initialSetup);

// Every time user clicks on a tile:
$(".cardToFlip").on("click", {"thisCard" : this}, userChoice); //END: on card click

//New Game Button is clicked:
$("#newGameBtn").click(newGameSetup);


/////////////////////////////////////////////
////////////////// FUNCTIONS:

// INITIAL SETUP
function initialSetup() { //to be executed on page load

    //creates button elements
    createDashboard();

    // how many pairs in the game
    curTotalPairs = 6; //BONUS: this could be decided by user
    curTotalCards = 2 * curTotalPairs;

    // get array of img urls (will be files from folder)


    for (let i = 1; i <= maxImages; i++) {
        urlString = "https://picsum.photos/seed/" + i + "/240/320";
        allImageUrls.push(urlString);
    }

    console.log("allImageUrls");
    console.log(allImageUrls);

    //set up new game
    newGameSetup();

    return allImageUrls;

}; //END: fn initialSetup

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
}; //END: fn shuffleCards

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
}; //END: fn compareCards

//GAME OVER
function gameOver(guesses) {

    // display Game Over text
    $("#subHeaderContent").text("Game Over: You won after " + guesses + " guesses!");

    // see if best score should be updated
    checkBestScore(guesses);

    //show newgame button
    $("#newGameBtn").css('visibility', 'visible');

}; //END: fn gameOver


// update best score
function checkBestScore(guesses) {

    //check if current score is lower (or if it's the first)
    if (guesses < bestScore || isNaN(bestScore)) {
        
        //set new best
        bestScore = guesses;

        // set elem to show new best
        $("#bestScore").text(bestScore);

    }

}; //END: fn checkBestScore

// NEW GAME:
function newGameSetup() {

    //show newgame button
    $("#newGameBtn").css('visibility', 'hidden');

    // un-flip all cards
    $(".showCard").removeClass("showCard");
    $(".lockCard").removeClass("lockCard");

    //reset guesses
    guesses = 0;

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

    // set subheader text
    $("#subHeaderContent").text("Pick a card, any card...");

}; //END: fn newGameSetup


// USER MAKES CHOICE
function userChoice(clickedCard) {
     // refer to the div with the .cardToFlip class
        console.log("clicked a tile");

        console.log("clickedCard");
        console.log(clickedCard);

        console.log("*******NARROW DOWN***********");
        console.log(clickedCard.currentTarget);
        
        if (timerRunning) {
            console.log("timer: ABORT");
            return;
        } else if ($(".showCard").length >= 2) {
            console.log("too many cards: ABORT");
            return;                             
        } else if ($(clickedCard.currentTarget).hasClass("showCard")) {
            console.log("clicked shown card: ABORT");
            return;
        } else if ($(clickedCard.currentTarget).hasClass("lockCard")) {
            console.log("clicked locked card: ABORT");
            return;
        }

        // reset subheader text
        $("#subHeaderContent").text("Pick a card, any card...");
        
        // add .showCard class to div 
        $(this).addClass("showCard");
    
    
        // counts shown cards
        numShown = $(".showCard").length;
        console.log("numShown");
        console.log(numShown);
    
        if (numShown >= 2) { //when 2 are shown
    
            // increase guesses and update element
            guesses++;
            $("#numGuesses").text(guesses);

            //array of the img elements that are descendants of elems w/ .showCard class
            twoCards = $(".showCard").find(".cardFace").find("img");
            console.log("twoCards");
            console.log(twoCards);
    
            // compare the cards
            isMatch = compareCards(twoCards);
    
            // check if it"s a match
            if (!isMatch) {// not a match

                // indicate MISS to user
                $("#subHeaderContent").text("Missed! Try Again.");
                
                //indicate timer has started
                timerRunning = true;

                // DELAY: for readability
                timer = setTimeout(function () {
    
                    //remove .showCard class
                    $(".showCard").removeClass("showCard");

                    //indicate timer has stopped
                    timerRunning = false;
    
                }, 1300); //END: TIMER

            } else { // it"s a match!
    
                // indicate HIT to user
                $("#subHeaderContent").text("It's A Match!!");
    
                //lock the cards in shown state
                $(".showCard").addClass("lockCard");
                console.log("added .lockCard")
    
                //remove .showCard class
                $(".showCard").removeClass("showCard");
                console.log("removed .showCard")
    
                // Check if unshown tiles remain
                if ($(".cardToFlip").length == $(".lockCard").length) { //if all cards are locked
    
                    // cancel timer so that the text doesn't change
                    clearTimeout(timer);

                    // GAME OVER 
                    gameOver(guesses);
    
                } //END:check GameOver
    
            }//END: check if match
    
        }//END: check 2 shown
    
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Dashboard stuff (switch to jquery?)


function createDashboard(){
    let dashboard = document.getElementById("dashboard");

    // result
    let result = document.createElement("div");
    result.setAttribute("id", "result");
    dashboard.appendChild(result);

    // instruction
    let instruction = document.createElement("div");
    instruction.setAttribute("id", "instruction");
    instruction.innerHTML = "<h3 style='text-align: center;'>Instructions</h3>" +
                            "<ul>" +
                                "<li>Flip over two cards.</li>" + 
                                "<li>If the two cards have the same picture, then continue flip two cards. If pictures are different, you lost!</li>" +
                            "</ul>";
    dashboard.appendChild(instruction);
  
    // button
    let rtButton=document.createElement("button");
    rtButton.setAttribute("id", "rtButton");
    rtButton.style.display="none";
    dashboard.appendChild(rtButton);
    $("#rtButton").css({ width: "100%", "padding": "20px"});
    $("#rtButton").value = "Play Again";
}

/**
 * 
 * @param {boolean} isSame : a flag indicating the two tiles selected have the same image
 * @param {boolean} isGameOver : a flag indicating the game is over
 */
function setResult(isSame, isGameOver){
    //get result
    let result=document.getElementById("result");

    // indicate the player failed
    if (!isSame) {
        result.innerHTML = "You failed!";
    } else if (isGameOver) {
        result.innerHTML = "You completed the puzzle in " + count + " steps!";
    }    
}
