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
        clearArray();
        chooseState();
        gameModes.vsAI();
    };
    vsHumanBtn.onclick=()=> {
        clearArray();
        chooseState();
        gameModes.vsHuman();
    };

    const gameModes = (() => {
        function vsAI() {
            console.log('Versus AI Mode');
        }
        function vsHuman() {
            console.log('Versus Human Mode');
        }
        return {
            vsAI: vsAI,
            vsHuman: vsHuman
        }
    }) ();

    function clearArray() {
        if (!boardArray==null) {
            console.log('Board is not Empty');
            boardArray =[];
            return checkArray()
        }
        else{
            return console.log('Board is Empty, Go Ahead');
        }
    }

    const boardLayout = () => {
      const boardLay = document.querySelector('.boardGame');
    
        for ( let i=0; i<3; i++) {
            for(let j=0; j<3;j++){
                const gridBoard = document.createElement('div');
                gridBoard.className=`grid ${i}-${j}`;
                boardLay.append(gridBoard);
                }
            }
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
        e.target.style.backgroundColor="blue";
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