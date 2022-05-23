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
        mainMenu();
    }
}

function mainMenu() {
    //button default for gameModes, masih pabalatak
    let boardArray = ["not", "empty"];
    let playExecuted = false;
    const vsAIBtn = document.getElementById('vsAIBtn');
    const vsHumanBtn = document.getElementById('vsHumanBtn');
    
    
    vsAIBtn.onclick=()=>{ 
        clearState();
        const players = gameModes("X","O", "AI", true);
        players.playGame();
    };

    vsHumanBtn.onclick=()=> {
        clearState();
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
                //DO CHECK WIN FUNCTIONS
                //IF WIN GAME START AGAIN FROM CLEAR

                checkGame();
                console.log(boardArray);
                return
            }
            
            function checkGame() {
                checkWin(0,3,6).checkHor();
                checkWin(0,1,2).checkVert();
                checkWin(0).checkDiag1();
                checkWin(2).checkDiag2();
                //if(boardArray.filter(x => x =='X').length == 5 && checkWin().statusGame == false){ 
                checkWin().checkDraw();
                //}
                // if (boardArray.filter(x => x =='X').length == 5) {
                //     setTimeout(checkWin().checkDraw, 3100);
                // }
                // CHECK THE X 5s, then wait 2scs, check the statusGame
                
            }

            // function checkDrawState() {
            //     if(boardArray.filter(x => x =='X').length == 5 && checkWin().statusGame == false){ 
            //         checkWin().checkDraw();
            //     }
            // }

         //false means no winner yet
         let statusGame = false;
            const checkWin = (num1, num2, num3)=> {
                const nums = [num1, num2, num3];
                    function checkHor(){
                        for(const num of nums){
                            if ( boardArray[num] == playerX && boardArray[num+1]== playerX && boardArray[num+2]== playerX ){
                                statusGame = true;
                                console.log(`PLAYER ${playerX} WIN! + ${statusGame}` );
                                setTimeout(clearState, 3000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+1] == playerO && boardArray[num+2] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                setTimeout(clearState, 3000);
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
                                setTimeout(matchDoneState, 3000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+3] == playerO && boardArray[num+6] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                setTimeout(matchDoneState, 3000);
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
                                setTimeout(matchDoneState, 3000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+4] == playerO && boardArray[num+8] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                setTimeout(matchDoneState, 3000);
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
                                setTimeout(matchDoneState, 3000);
                                }
                            else if ( boardArray[num] == playerO && boardArray[num+2] == playerO && boardArray[num+4] == playerO){
                                statusGame = true;
                                console.log(`PLAYER ${playerO} WIN!`);
                                setTimeout(matchDoneState, 3000);
                                }
                            else{}
                        }
                        return                  
                    }

                    function checkDraw() { 
                       if (boardArray.filter(x => x =='X').length == 5 && statusGame == false) {  //LMAO IT WORKS 
                            console.log("IT'S A DRAW"+ statusGame);
                            //statusGame = false;
                            setTimeout(matchDoneState, 3000);
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