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
    const vsAIBtn = document.getElementById('vsAIBtn');
    const vsHumanBtn = document.getElementById('vsHumanBtn');
    vsAIBtn.onclick=()=>{ 
        gameModes.vsAI();
    };
    vsHumanBtn.onclick=()=> {
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
    const boardLayout = () => {
      const boardLay = document.querySelector('.boardGame');
        
      for ( let i=0; i<3; i++) {
          for(let j=0; j<3;j++){
            const gridBoard = document.createElement('div');
            //const para = document.createElement('p');
            gridBoard.className=`grid ${i}-${j}`;
            //gridBoard.style.border="solid 1px black";
           // gridBoard.append(para);
            boardLay.append(gridBoard);
            }
        }
    }

    return {
        gameModes: gameModes,
        boardLayout: boardLayout
    }
}



window.onload = () => {
startGame();
}