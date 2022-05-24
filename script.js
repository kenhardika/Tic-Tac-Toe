function startGame() {
    document.getElementById('modalStartGame').addEventListener( 'click', closeStartModal);   
    
    function closeStartModal() {  
       function layerOffAnimation() {
                document.querySelector('.layerModal').style.opacity="0";
        }
        function layerOffDisplay() {
            document.querySelector('.layerStartModal').classList.add('layerOff')
        }
        layerOffAnimation();
        setTimeout(layerOffDisplay, 500);
        layerChooseVs();
        mainMenu();
    }
}

function layerChooseVs() {
    const contentLayer = document.querySelector('.contentLayerGame');
    const divs = document.createElement('div');
    divs.className="layerChooseVs";
    divs.innerText="Choose Your Opponent";
    contentLayer.appendChild(divs);
}

function mainMenu() {
    //button default for gameModes, masih pabalatak
    let boardArray = ["not", "empty"];
    let playExecuted = false;
    const vsAIBtn = document.getElementById('vsAIBtn');
    const vsHumanBtn = document.getElementById('vsHumanBtn');
    
    
    vsAIBtn.onclick=()=>{ 
        clearState(); //clear the boxes
        matchScoreX = []; // reset the score
        matchScoreO = [];
        document.querySelector('.layerChooseVs').classList.add('layerOff'); // remove the choose opponent layer
        document.querySelector('.contentLayerDetails').textContent='';// clear the display under the layer board
        const players = gameModes("X","O", "AI", true);
        players.playGame();
    };

    vsHumanBtn.onclick=()=> {
        clearState();
        matchScoreX = [];
        matchScoreO = [];
        document.querySelector('.layerChooseVs').classList.add('layerOff');
        document.querySelector('.contentLayerDetails').textContent='';
        const players = gameModes("X","O", "Human", true);
        players.playGame();
    };

    //game modes using factory
    const gameModes = (playerX, playerO, mode, xTurns) => {
        console.log(xTurns + ' iniXturns')
        const playGame = () => {
            console.log('PlayGame')
            // I use this line so the chooseState function will not run twice if I call it again. Any solution?
            if (playExecuted == false){
                chooseState();
                playExecuted = true;
            }
            if (mode=='Human'){
                //chooseState();

                //toggle button changes 
                vsAIBtn.classList.remove('btnActive');
                vsHumanBtn.classList.add('btnActive');
                console.log(`Youre playing against ${mode}`);
            //  gridLayout.forEach((grid)=>{grid.innerText=""})
            }
            else{
                //toggle button changes
                vsHumanBtn.classList.remove('btnActive');
                vsAIBtn.classList.add('btnActive');
                console.log(`Youre playing against ${mode}`);
            }
        }
        

        
        //try to change chooseState into closed function closure
        const chooseState = () => {

            const gridLayout = document.querySelectorAll('.grid');
                for (let i=0; i<gridLayout.length; i++){
                    gridLayout[i].addEventListener('mouseover', ()=>{} );
                    gridLayout[i].addEventListener('click', boxClicked );         
                }
            function boxClicked(e){
                console.log('clicked '+ e.target.className + " " + xTurns);
                console.log(this.dataset.array); 
                // check if is it the first move by checking the array, if its first move then X turns first.
                if(boardArray.length == 0) {
                    xTurns = true;
                    boardArray = ['','','','','','','','',''];
                }
                //check if the box already filled
                if (!e.target.innerText) {
                    //check if it is the "X" turns
                    if(!xTurns) {
                        console.log(this.dataset.array);
                      
                        boardArray.splice(this.dataset.array, 1, playerO);
                        e.target.innerText=playerO;
                        xTurns = true;
                    }
                    else{
                        console.log(this.dataset.array);
                 
                        boardArray.splice(this.dataset.array, 1, playerX);
                        e.target.innerText=playerX;
                        xTurns = false;
                    }
                }

                checkGame();
                console.log(boardArray);
                return
            }
            
            function checkGame() {
                checkWin(0,3,6).checkHor();
                checkWin(0,1,2).checkVert();
                checkWin(0).checkDiag1();
                checkWin(2).checkDiag2();
                checkWin().checkDraw();
            }

         
         let statusGame = false; //false means no winner yet
            const checkWin = (num1, num2, num3)=> {
                const nums = [num1, num2, num3];
                    function checkHor(){
                        for(const num of nums){
                            if ( boardArray[num] == playerX && boardArray[num+1]== playerX && boardArray[num+2]== playerX ){
                                statusGame = true;
                                console.log(`PLAYER ${playerX} WIN! + ${statusGame}` );
                                matchStatus("WIN", `${playerX}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+1] == playerO && boardArray[num+2] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                matchStatus("WIN", `${playerO}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else{}
                        }
                        return
                    }       
                
                    function checkVert(){
                        for(const num of nums){
                            if ( boardArray[num] == playerX && boardArray[num+3]== playerX && boardArray[num+6]== playerX ){
                                statusGame = true;
                                console.log(`PLAYER ${playerX} WIN!`);
                                matchStatus("WIN", `${playerX}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+3] == playerO && boardArray[num+6] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                matchStatus("WIN", `${playerO}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else{}
                        }
                        return                  
                    }

                    function checkDiag1(){
                        for(const num of nums){
                            if ( boardArray[num] == playerX && boardArray[num+4]== playerX && boardArray[num+8]== playerX ){
                                statusGame = true;
                                console.log(`PLAYER ${playerX} WIN!`);
                                matchStatus("WIN", `${playerX}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+4] == playerO && boardArray[num+8] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                matchStatus("WIN", `${playerO}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else{}
                        }
                        return                  
                    }

                    function checkDiag2(){
                        for(const num of nums){
                            if ( boardArray[num] == playerX && boardArray[num+2]== playerX && boardArray[num+4]== playerX ){
                                statusGame = true;
                                console.log(`PLAYER ${playerX} WIN!`);
                                matchStatus("WIN", `${playerX}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+2] == playerO && boardArray[num+4] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                matchStatus("WIN", `${playerO}`);
                                setTimeout(matchDoneState, 2000);
                                }
                            else{}
                        }
                        return                  
                    }

                    function checkDraw() { 
                       if (boardArray.filter(x => x =='X').length == 5 && statusGame == false) {  //LMAO IT WORKS 
                            console.log("IT'S A DRAW"+ statusGame);
                            matchStatus("DRAW", "");
                            //statusGame = false;
                            setTimeout(matchDoneState, 2000);
                        }
                        return 
                    }
                    
                return {
                    checkHor,
                    checkVert,
                    checkDiag1,
                    checkDiag2, 
                    checkDraw, 
                   // statusGame
                }         
            }

            const matchDoneState = () => {
                clearState();
                statusGame = false;
            }
        
        
        }



       
        return {
            playGame,
            chooseState,     
        }
    }
    
    function showScore() {
        const contentLayerDet = document.querySelector('.contentLayerDetails');
        const displayRes = document.createElement('p');
        const capDisplay = document.createElement('p');
        capDisplay.classList = 'displayCaption'; 
        displayRes.className = 'displayResult';
        capDisplay.innerText = 'X - O'
        displayRes.innerText = `${matchScoreX.length} - ${matchScoreO.length}`;
        contentLayerDet.textContent='';
        contentLayerDet.append(capDisplay);
        contentLayerDet.append(displayRes);
        
        //careful it only works if there is only one child node inside contentLayerDet
        // if(contentLayerDet.childNodes.length !== 1) { // if there is already old score, it will remove the old score and update the new one
        //     //console.log(contentLayerDet.childNodes[0]);
        //   contentLayerDet.removeChild(contentLayerDet.childNodes[0]);
        // }
    }

    const matchWin = () =>{
        //create layer cover up whole content/body to congratulate you for winning the 5 rounds match while resetting the game like mainmenu()
        const resetMatchScore = () => { //reset match after 5 wins
            matchScoreX = [];
            matchScoreO = [];
            document.querySelector('.contentLayerDetails').textContent='';
        }

        setTimeout(resetMatchScore, 3000);
    }

    let matchScoreX = [];
    let matchScoreO = [];

    function matchStatus(result, winner) {
        const contentMenu = document.querySelector('.contentMenu');
       
        const overlay = document.createElement('div');
        const resultNotice = document.createElement('p');

        overlay.className="overlay";
        resultNotice.innerText=`Round ${result}! ${winner}!`;
        resultNotice.className="resultNotice";
        
        let displayOff =() => {
            overlay.className="layerOff";
        }
        
        overlay.appendChild(resultNotice);
        contentMenu.append(overlay);
        
        const matchScore = (score) => {    
            if (score == 'X'){
                matchScoreX.push('X');
                // console.log(matchScoreX.filter(x => x =='X').length);
            }
            else if(score == 'O')
            {
                matchScoreO.push('O')
                // console.log(matchScoreO.filter(o => o =='O').length);
            }
        }
        matchScore(winner);
        console.log("Skor adalah X: "+ matchScoreX.length + ' dan O: ' + matchScoreO.length);
       // console.log(displayRes.childNodes[0] == null)
        showScore();
        
        if( matchScoreX.length === 5 || matchScoreO === 5 ) {
            matchWin();
        }
        setTimeout( displayOff, 3000);
    }

    
    function clearState() {
            boardArray.length = 0;
            document.querySelectorAll('.grid').forEach((grid)=>{grid.innerText=""});
            console.log('Board is Empty, Go Ahead');
    }

    const boardLayout = () => {
      const boardLay = document.querySelector('.boardGame');
        for ( let i=0; i<9; i++) {
                const gridBoard = document.createElement('div');
                gridBoard.className=`grid ${i}`;
                gridBoard.dataset.array = `${i}`;
                boardLay.append(gridBoard);                
        }
    }

    boardLayout();
    return {
        gameModes: gameModes,
        boardLayout: boardLayout
    }
}



window.onload = () => {
startGame();
}