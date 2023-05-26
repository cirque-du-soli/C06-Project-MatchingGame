let count;

window.addEventListener('load', createDashboard); //onload event listener

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