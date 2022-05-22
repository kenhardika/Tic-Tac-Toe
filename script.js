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
    
   
    vsAIBtn.onclick=()=>{ 
        clearState();
        const players = gameModes("X","O", "AI");
        // playerX.playerName();
        // playerX.playWith();
        players.playGame();
    };
    vsHumanBtn.onclick=()=> {
        clearState();
        const players = gameModes("X","O", "Human");
        // playerX.playerName();
        // playerX.playWith();
        players.playGame();
    };

    //game modes using factory

    const gameModes = (playerX, playerO, mode) => {
        //const playerName =() => {console.log(`Your name is ${playerX}`);}
        //const playWith  = () => {console.log(`You will play against ${playerY} with ${mode}`);}
        const chooseState = () => {
            let xTurns = true;
            const gridLayout = document.querySelectorAll('.grid');
                for (let i=0; i<gridLayout.length; i++){
                    gridLayout[i].addEventListener('mouseover', ()=>{} );
                    gridLayout[i].addEventListener('click', boxClicked );         
                }
            function boxClicked(e){
                console.log('clicked '+ e.target.className);
                if (!e.target.innerText) {
                    if(boardArray.length >= 9) {
                        return console.log(boardArray.length + ' board array full')
                    }              
                    else if(!xTurns) {
                        boardArray.push(playerO);
                        e.target.innerText=playerO;
                        xTurns = true;
                    }
                    else{
                        boardArray.push(playerX);
                        e.target.innerText=playerX;
                        xTurns = false;
                    }
                }
                console.log(boardArray);
                return
            }
        }

        const playGame = () => {
            chooseState();
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
            chooseState    
        }

    }



    function clearState() {
            boardArray.length = 0;
            document.querySelectorAll('.grid').forEach((grid)=>{grid.innerText=""});
            console.log('Board is Empty, Go Ahead');
        }

    const boardLayout = () => {
      const boardLay = document.querySelector('.boardGame');
    
        for ( let i=1; i<=9; i++) {
                const gridBoard = document.createElement('div');
                gridBoard.className=`grid ${i}`;
                boardLay.append(gridBoard);                }
            }
    
   // function chooseState() {
        // const gridLayout = document.querySelectorAll('.grid');
        // for (let i=0; i<gridLayout.length; i++){
        //    gridLayout[i].addEventListener('mouseover', ()=>{} );
        //    gridLayout[i].addEventListener('click', boxClicked );         
        // }
        
        // function boxClicked(e){
        //     console.log('clicked '+ e.target.className);
        //     if (!e.target.innerText){
        //         boardArray.push('X');
        //         e.target.innerText="X";
        //         console.log(e);
        //     }
    
        //     console.log(boardArray);
        //     return
        // }
    
    //}
   
    boardLayout();

    return {
        gameModes: gameModes,
        boardLayout: boardLayout
    }
}



window.onload = () => {
startGame();
}