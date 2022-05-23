const chooseState = () => {
            
    const gridLayout = document.querySelectorAll('.grid');
        for (let i=0; i<gridLayout.length; i++){
            gridLayout[i].addEventListener('mouseover', ()=>{} );
            gridLayout[i].addEventListener('click', boxClicked );         
        }
    const boxClicked = (e)=>{
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

        function checkGame(){
            checkWin(0,3,6).checkHor();
            checkWin(0,1,2).checkVert();
            checkWin(0).checkDiag1();
            checkWin(2).checkDiag2();
            checkWin().checkDraw();
        }
        console.log(boardArray);
        return
    }
    
 //false means no winner yet
    const checkWin = (num1,num2,num3)=> {
        let statusGame = false;
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
                        setTimeout(matchDoneState, 3000);
                        }
                    else if ( boardArray[num] == playerO && boardArray[num+3] == playerO && boardArray[num+6] == playerO){
                        console.log(`PLAYER ${playerO} WIN!`);
                        statusGame = true;
                        setTimeout(matchDoneState, 3000);
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
                        setTimeout(matchDoneState, 3000);
                        }
                    else if ( boardArray[num] == playerO && boardArray[num+4] == playerO && boardArray[num+8] == playerO){
                        console.log(`PLAYER ${playerO} WIN!`);
                        statusGame = true;
                        setTimeout(matchDoneState, 3000);
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
                        setTimeout(matchDoneState, 3000);
                        }
                    else if ( boardArray[num] == playerO && boardArray[num+2] == playerO && boardArray[num+4] == playerO){
                        console.log(`PLAYER ${playerO} WIN!`);
                        statusGame = true;
                        setTimeout(matchDoneState, 3000);
                        }
                    else{}
                }
                return                  
            }

            function checkDraw() { 
                if ( boardArray.filter(x => x =='X').length == 5 && statusGame == false) {  //LMAO IT WORKS 
                    console.log("IT'S A DRAW");
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
            statusGame
        }         
    }

    const matchDoneState = () => {
        clearState();
        checkWin().statusGame = false;
    }
}