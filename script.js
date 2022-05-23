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
    const vsAIBtn = document.getElementById('vsAIBtn');
    const vsHumanBtn = document.getElementById('vsHumanBtn');
    let playExecuted = false;
    


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
        const chooseState = () => {
            
            const gridLayout = document.querySelectorAll('.grid');
                for (let i=0; i<gridLayout.length; i++){
                    gridLayout[i].addEventListener('mouseover', ()=>{} );
                    gridLayout[i].addEventListener('click', boxClicked );         
                }
            function boxClicked(e){
                console.log('clicked '+ e.target.className + " " + xTurns);
                console.log(this.dataset.array); //tinggal pushnya benerin
                // check if is it the first move by checking the array, if its first move then X turns first.
                if(boardArray.length == 0) {
                    xTurns = true;
                    boardArray = ['','','','','','','','',''];
                }
                //check if the box already filled
                if (!e.target.innerText) {
                    //check if the array is full or the board is already full
                    // if(boardArray.length >= 100) {
                    //     return console.log(boardArray.length + ' board array full')
                    // }
                    //check if it is the "X" turns
                    if(!xTurns) {
                        console.log(this.dataset.array);
                        //let idxArray = this.dataset.array;
                        boardArray.splice(this.dataset.array, 1, playerO);
                        e.target.innerText=playerO;
                        xTurns = true;
                    }
                    else{
                        console.log(this.dataset.array);
                        //let idxArray = this.dataset.array;
                        boardArray.splice(this.dataset.array, 1, playerX);
                        e.target.innerText=playerX;
                        xTurns = false;
                    }
                }
                //DO CHECK WIN FUNCTIONS
                //IF WIN GAME START AGAIN FROM CLEAR
                
                const checkWin = (num1,num2,num3)=> {
                    let statusGame = false; //false means no winner yet
                    const nums = [num1, num2, num3];
                        function checkHor(){
                            for(const num of nums){
                                if ( boardArray[num] == playerX && boardArray[num+1]== playerX && boardArray[num+2]== playerX ){
                                    console.log(`PLAYER ${playerX} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else if ( boardArray[num] == playerO && boardArray[num+1] == playerO && boardArray[num+2] == playerO){
                                    console.log(`PLAYER ${playerO} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else{}
                            }
                            return
                        }       
                    
                        function checkVert(){
                            for(const num of nums){
                                if ( boardArray[num] == playerX && boardArray[num+3]== playerX && boardArray[num+6]== playerX ){
                                    console.log(`PLAYER ${playerX} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else if ( boardArray[num] == playerO && boardArray[num+3] == playerO && boardArray[num+6] == playerO){
                                    console.log(`PLAYER ${playerO} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else{}
                            }
                            return                  
                        }

                        function checkDiag1(){
                            for(const num of nums){
                                if ( boardArray[num] == playerX && boardArray[num+4]== playerX && boardArray[num+8]== playerX ){
                                    console.log(`PLAYER ${playerX} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else if ( boardArray[num] == playerO && boardArray[num+4] == playerO && boardArray[num+8] == playerO){
                                    console.log(`PLAYER ${playerO} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else{}
                            }
                            return                  
                        }

                        function checkDiag2(){
                            for(const num of nums){
                                if ( boardArray[num] == playerX && boardArray[num+2]== playerX && boardArray[num+4]== playerX ){
                                    console.log(`PLAYER ${playerX} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else if ( boardArray[num] == playerO && boardArray[num+2] == playerO && boardArray[num+4] == playerO){
                                    console.log(`PLAYER ${playerO} WIN!`);
                                    statusGame = true;
                                    setTimeout(clearState, 3000);
                                    }
                                else{}
                            }
                            return                  
                        }

                        function checkDraw() { // need more case for draw
                            if(!statusGame) {
                                console.log("GAME IS DRAW");
                            }
                            return 
                        }

                    return {
                        checkHor,
                        checkVert,
                        checkDiag1,
                        checkDiag2, 
                        checkDraw
                    }
                
                }
                checkWin(0,3,6).checkHor();
                checkWin(0,1,2).checkVert();
                checkWin(0).checkDiag1();
                checkWin(2).checkDiag2();
                //checkWin().checkDraw(); ----case fort draw need to be added
                
                // checkHor(0);
                // checkHor(3);
                // checkHor(6);

                // function checkHor(num1, num2, num3) {
                //     const nums = [num1, num2, num3];
                //         for(const num of nums){
                //                 if ( boardArray[num] == playerX && boardArray[num+1]== playerX && boardArray[num+2]== playerX ){
                //                     alert(`PLAYER ${playerX} WIN!`);
                //                     }
                //                 else if ( boardArray[num] == playerO && boardArray[num+1] == playerO && boardArray[num+2] == playerO)
                //                     {
                //                     alert(`PLAYER ${playerO} WIN!`);
                //                     }
                //                 else{}
                //         }
                //     return 
                // }
                // checkHor(0,3,6);

                // function checkHor(n) {
                //     if ( boardArray[n] == playerX && boardArray[n+1]== playerX && boardArray[n+2]== playerX ){
                //         alert(`PLAYER ${playerX} WIN!`);
                //         }
                //     else if ( boardArray[n] == playerO && boardArray[n+1] == playerO && boardArray[n+2] == playerO)
                //         {
                //         alert(`PLAYER ${playerO} WIN!`);
                //         }
                //     else{}
                //     }
                console.log(boardArray);
                return
            }
        }

        const playGame = () => {
            console.log('PlayGame')
            if (playExecuted == false){
                chooseState();
                playExecuted = true;
            } else {

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
                boardLay.append(gridBoard);                }
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