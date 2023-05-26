let count;

// window.addEventListener('load', createDashboard); //onload event listener

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
  
    // button
    let rtButton=document.createElement("button");
    rtButton.setAttribute("id", "rtButton");
    rtButton.style.display="none";
    rtButton.setAttribute("onclick", newGameSetup);
    dashboard.appendChild(rtButton);
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



























/**
 * 
 * @param {boolean} isGameOver: a flag indicating the game is over 
 */
function retry(isGameOver){
    if(isGameOver){
        let rtButton=document.getElementById("rtButton");
        rtButton.setAttribute("type", "button");
        rtButton.setAttribute("onclick", "newGame()");
        rtButton.value="Play Again";
        rtButton.style.display="inline";    
    }
}