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