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
        const playerX = gameModes("player X", "AI");
        // playerX.playerName();
        // playerX.playWith();
        playerX.playGame();
    };
    vsHumanBtn.onclick=()=> {
        clearState();
        const playerX = gameModes("player X", "Human");
        // playerX.playerName();
        // playerX.playWith();
        playerX.playGame();
    };

    //game modes using factory

    const gameModes = (name, mode) => {
        const playerName =() => {console.log(`Your name is ${name}`);}
        const playWith  = () => { console.log(`You will play against ${mode}`);
                                return mode }
        
        const playGame = () => {
            chooseState();
            if (mode=='Human'){
                //toggle button changes 
                vsAIBtn.classList.remove('btnActive');
                vsHumanBtn.classList.add('btnActive');
                console.log('Youre playing against human');
            //  gridLayout.forEach((grid)=>{grid.innerText=""})
            }
            else{
                //toggle button changes
                vsHumanBtn.classList.remove('btnActive');
                vsAIBtn.classList.add('btnActive');
                console.log('Youre playing against AI');
            }
        }

        return {
            playerName,
            playWith, 
            playGame    
        }

        }


    // const gameModes = (() => {
    //     function vsAI() {
    //         console.log('Versus AI Mode');
    //     }
    //     function vsHuman() {
    //         console.log('Versus Human Mode');
    //     }
    //     return {
    //         vsAI: vsAI,
    //         vsHuman: vsHuman
    //     }
    // }) ();

    function clearState() {
            boardArray =[];
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
    
    function chooseState() {
        const gridLayout = document.querySelectorAll('.grid');
        for (let i=0; i<gridLayout.length; i++){
           gridLayout[i].addEventListener('mouseover', ()=>{} );
           gridLayout[i].addEventListener('click', boxClicked );         
        }
    }

    function boxClicked(e){
        console.log('clicked '+ e.target.className);
        if (!e.target.innerText){
            boardArray.push('X');
            e.target.innerText="X";
        }

        console.log(boardArray);
        return
    }
    boardLayout();
    //chooseState();
    return {
        gameModes: gameModes,
        boardLayout: boardLayout
    }
}



window.onload = () => {
startGame();
}