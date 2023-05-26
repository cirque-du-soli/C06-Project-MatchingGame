//TESTING
// $(document).ready(gameOver);


/////////////////////////////////////////////
////////////////// SETUP:

let numShown;
let isMatch;
let guesses = 0;
let bestScore = 999;
let twoCards = [];
let timer;
let allImageUrls = new Array();
let maxImages = 20;
let urlString = "";
let curTotalPairs;
let curTotalCards;


/////////////////////////////////////////////
////////////////// LISTENERS:

// when page loads:
$(document).ready(initialSetup);

// Every time user clicks on a tile:
$(".cardToFlip").on("click", userChoice); //END: on card click

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
    newGameSetup(allImageUrls);

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

// //GAME OVER
// function gameOver(guesses) {

//     //TODO make this more dramatic
//     console.log("You won after " + guesses + " guesses!");

//     //show newgame button
//     $("#newGameBtn").css('visibility', 'visible');;

// }; //END: fn gameOver

// NEW GAME:
function newGameSetup() {
    // clear results and scores
    guesses = 0;

    $("#numGuesses").html("--");
    $("#result").html("");

    // flip all cards on back
    $(".showCard").removeClass("showCard");
    $(".lockCard").removeClass("lockCard");

    //show newgame button
    $("#newGameBtn").css('visibility', 'hidden');

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

}; //END: fn newGameSetup


// USER MAKES CHOICE
function userChoice() {
    // increment number of moves
    if (!$(this).hasClass("lockCard")) {
        guesses++;
    }
    
    $("#numGuesses").html(Math.floor(guesses/2));

     // refer to the div with the .cardToFlip class
        console.log("clicked a tile");

        // TODO: validate click: not during delay, not 3rd card, not on a shown or locked card
    
        // add .showCard class to div 
        $(this).addClass("showCard");
    
    
        // counts shown cards
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
                // indicate MISS to user
                output("NOT A MATCH!")
                // DELAY
                timer = setTimeout(function () {
    
                    //remove .showCard class
                    $(".showCard").removeClass("showCard");
    
                }, 1000); //END: TIMER

            } else { // it"s a match!
                output("IT'S A MATCH!!!");
    
                //lock the cards in shown state
                $(".showCard").addClass("lockCard");
                console.log("added .lockCard")
    
                //remove .showCard class
                $(".showCard").removeClass("showCard");
                console.log("removed .showCard")
    
                // Check if unshown tiles remain
                if ($(".cardToFlip").length == $(".lockCard").length) { //if all cards are locked
                    // show best record
                    if (Math.floor(guesses/2) < bestScore) {
                        bestScore = Math.floor(guesses/2);
                    }
                    $("#bestScore").html(bestScore);

                    // show result
                    $("#result").html("You won after " + Math.floor(guesses/2) + " guesses!");
                    //show newgame button
                    $("#newGameBtn").css('visibility', 'visible');
                } else {
                    // NEXT ROUND
    
                }//END:check GameOver
    
            }//END: check if match
    
        }//END: check 2 shown
    
}

function output(str) {
    $("#subHeaderContent").html(str);
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
                            "<li>On each turn, you can flip over two cards to reveal their front pictures.</li>" + 
                            "<li>If the two cards have the same front pictures, they will be locked in an open position, and you can continue by flipping the next two cards.</li>" +
                            "<li>If the two cards have different front pictures, they will be flipped back facedown, and you can continue flipping until you find all the matched images.</li>"+
                            "<li>The number of moves you make to find all the matches counts as your score. Aim for a lower number of movements to achieve a better score.</li>"+
                        "</ul>";
    dashboard.appendChild(instruction);
  
    // // button
    // let rtButton=document.createElement("button");
    // rtButton.setAttribute("id", "rtButton");
    // rtButton.setAttribute("onclick", newGameSetup);
    // rtButton.style.display="none";
    // dashboard.appendChild(rtButton);
}

// /**
//  * 
//  * @param {boolean} isSame : a flag indicating the two tiles selected have the same image
//  * @param {boolean} isGameOver : a flag indicating the game is over
//  */
// function setResult(isSame, isGameOver){
//     //get result
//     let result=document.getElementById("result");

//     // indicate the player failed
//     if (!isSame) {
//         result.innerHTML = "You failed!";
//     } else if (isGameOver) {
//         result.innerHTML = "You completed the puzzle in " + moves + " steps!";
//     }    
// }
