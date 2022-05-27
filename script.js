function startGame() {
    document.getElementById('modalStartGame').addEventListener( 'click', closeStartModal);   
    
    function closeStartModal() {  
       function layerOffAnimation() {
                document.querySelector('.layerModal').style.opacity="0";
        }
        function layerOffDisplay() {
            document.querySelector('.layerStartModal').classList.add('layerOff')
        }

    function layerOffButton(){
        document.getElementById('vsAIBtn').style.display='none';
        document.getElementById('vsHumanBtn').style.display='none';
    }

        layerOffButton();
        layerOffAnimation();
        setTimeout(layerOffDisplay, 500);       
        layerChooseVs();
        setTimeout(usernameInput, 500); 
    }
}

function usernameInput(){
    const layerModal = document.querySelector('.inputMod');
    document.addEventListener('submit', submitUser);
  
    layerModal.style.display='flex'; //overlay juga kena flex
    
    function submitUser(e){
        e.preventDefault();
        const username = document.getElementById('inputUsername').value; 
        
        function layerOffAnimation() {
            document.querySelector('.inputModal').style.opacity='0';
            document.querySelector('.inputMod').style.opacity='0';     
        }

        function layerOffDisplay() {
            document.querySelector('.inputMod').className='layerOff';
            document.querySelector('.inputModal').className='layerOff';
        }

        setTimeout(layerOffAnimation, 100);
        setTimeout(layerOffDisplay, 500);

        mainMenu(username);            
    } 
}

function layerChooseVs() {
    const contentLayer = document.querySelector('.contentLayerGame');
    const divs = document.createElement('div');
    const para = document.createElement('p');
    const paraBtnClass = document.createElement('div')
    const modeAIBtn = document.createElement('button');
    const modeHumanBtn = document.createElement('button');

    paraBtnClass.className='layerChooseButton';
    modeAIBtn.id="modeAIBtn";
    modeAIBtn.textContent='AI Mode';
    modeHumanBtn.id="modeHumanBtn";
    modeHumanBtn.textContent='Human Mode';

    paraBtnClass.appendChild(modeAIBtn);
    paraBtnClass.appendChild(modeHumanBtn);

    para.className='layerChooseVs';
    divs.className="layerChooseDivs";
    para.innerText="Choose Your Opponent";
    
    
    para.appendChild(paraBtnClass);
    divs.appendChild(para);
    contentLayer.appendChild(divs);
    //contentLayer.appendChild(paraBtnClass);
}

function mainMenu(username) {

    //button default for gameModes, masih pabalatak
    let boardArray = ["not", "empty"];
    let playExecuted = false;
    const vsAIBtn = document.getElementById('vsAIBtn');
    const vsHumanBtn = document.getElementById('vsHumanBtn');
    const modeAIBtn = document.getElementById('modeAIBtn');
    const modeHumanBtn = document.getElementById('modeHumanBtn');
    
    function animateOff() {
        function layerOffAnimation() {
            document.querySelector('.layerChooseVs').style.opacity='0';
            document.querySelector('.contentLayerDetails p').style.opacity='0';
            if(document.querySelector('.displayResult') !== null){
                document.querySelector('.displayResult').style.opacity="0";
            }
            
        }
    
        function layerOff() {
            document.querySelector('.layerChooseDivs').style.display='none';
            document.querySelector('.contentLayerDetails p').className='layerOff';
            if(document.querySelector('.displayResult')!== null){
                document.querySelector('.displayResult').style.display='none';
            }
        }   
        setTimeout(layerOffAnimation, 1);
        setTimeout(layerOff, 500);            
    }
    
    const welcomeUsername = () => {
        const playerUser = document.querySelector('.playerSection');
        playerUser.textContent = `Welcome to the game ${username}`;
    }
    welcomeUsername();

    function layerOnButton(){
        document.getElementById('vsAIBtn').style.display='';
        document.getElementById('vsHumanBtn').style.display='';
    }
    
    function changeTextBtn(AI,human){
        document.getElementById('vsHumanBtn').textContent=human;
        document.getElementById('vsAIBtn').textContent=AI;
    }

    function onclickBtnState(){
        clearState(); //clear the boxes
        matchScoreX = []; // reset the score
        matchScoreO = [];
        animateOff();
        layerOnButton();
    }
    //let modeVS = '';
    
    vsAIBtn.onclick=()=>{ 
        onclickBtnState();
        changeTextBtn('Restart', 'Versus Human');
        const players = gameModes("X","O", true, username);
        players.playGame('AI');
       // modeVS = 'AI';
    };

    vsHumanBtn.onclick=()=> {
        onclickBtnState();
        changeTextBtn('Versus AI', 'Restart');
        const players = gameModes("X","O", true, username);
        players.playGame('Human');
      //  modeVS = 'Human';
    };
    
    modeAIBtn.onclick=()=>{
        onclickBtnState();
        changeTextBtn('Restart', 'Versus Human');
        const players = gameModes("X","O", true, username);
        players.playGame('AI');
     //   modeVS = 'AI';
    }
    modeHumanBtn.onclick=()=>{
        onclickBtnState();
        //changeTextBtn('Versus AI', 'Restart');
        const players = gameModes("X","O", true, username);
        players.playGame('Human');
        //modeVS = 'Human';
    }

    //how about using prototype to insert these stuff hmm
    
    //game modes using factory
    const gameModes = (playerX, playerO, xTurns, username) => {
        const playGame = (modeVS) => {
            if (modeVS == 'Human'){
                 if (playExecuted == false){
                    console.log('Choose mode to Human');
                    gridListener();//this is the vital part, enable the grid boxes to process the game
                    playExecuted = true;
                 }
                //toggle button changes 
                vsAIBtn.classList.remove('btnActive');
                vsHumanBtn.classList.add('btnActive');
                changeTextBtn('Versus AI', 'Restart');
            }
            else if (modeVS =='AI') {
                 if (playExecuted == false){
                    console.log('Choose mode to AI');
                    gridListener();
                    playExecuted = true;
                }
                //toggle button changes
                vsHumanBtn.classList.remove('btnActive');
                vsAIBtn.classList.add('btnActive');
                changeTextBtn("Restart", "Versus Human");
            }

            //Username show while playing
            const playerName = () => {
                const playerUser = document.querySelector('.playerSection');
                playerUser.textContent = `${username} is playing against ${modeVS} right now`;
            }
            playerName();
        
             //box clicked functions
            function boxClicked(e, modeVS){
            //this is works well
                if(document.querySelector('#vsAIBtn').textContent=='Restart') {
                    modeVS = 'AI';
                } 
                else if(document.querySelector('#vsHumanBtn').textContent=='Restart'){
                    modeVS = 'Human';
                }

            // check if is it the first move by checking the array, if its first move then X turns first.
                if(boardArray.length == 0) {
                    xTurns = true;
                    boardArray = ['0','1','2','3','4','5','6','7','8'];
                   
                }
                //check if the box already filled
                if (!e.target.innerText) {
                    //check if it is the "X" turns
                    if(!xTurns) {
                        //if (mode =='AI') {
                            //console.log('mode AI ON, AI CHOOSE State');
                            //let randomNum = Math.floor(Math.random() * 10);
                            //console.log(randomNum + 'ini random number dari AI');
                            //console.log(e.target); //e target harus sesuai dengan splice nanti
    
                           // boardArray.splice(randomNum, 1, playerO);
                            
                            //e.target.innerText = playerO;
                            //xTurns = true;
                        //}
                        if (modeVS == 'Human') {
                            console.log(this.dataset.array);
                            boardArray.splice(this.dataset.array, 1, playerO);
                            e.target.innerText = playerO;
                            xTurns = true;
                        }
                    }
                    else{
                        //console.log(this.dataset.array);
                        boardArray.splice(this.dataset.array, 1, playerX);
                        e.target.innerText=playerX;
                        xTurns = false;
                        
                        if(boardArray.filter(x => x =='X').length <= 4){
                            if(modeVS == "AI"){

                                let filtteredArray = boardArray.filter( x=> x!='X' && x!='O');
                                function shuffleArray(array) {
                                    let currentIndex = array.length;
                                    let randomIndex;

                                    while (currentIndex!=0){
                                        randomIndex = Math.floor(Math.random()* currentIndex);
                                        currentIndex--;
                                        
                                        [array[currentIndex], array[randomIndex]] = [
                                            array[randomIndex], array[currentIndex]];
                                    }
                                    return array;
                                }
                                shuffleArray(filtteredArray);                    
                                //console.log(filtteredArray[0]);
                                boardArray.splice(filtteredArray[0], 1, playerO);
                                //console.log(e.target.dataset.array);
                                const AIchecks = document.querySelector(`.grid-${filtteredArray[0]}`);
                                AIchecks.textContent=`${playerO}`;
                                // document.querySelector('dataset=2');
                                xTurns = true;
                            }
                        }    
                    }            
                }

                //check the game result per click
                function checkGame() {
                    checkWin(0,3,6).checkHor();
                    checkWin(0,1,2).checkVert();
                    checkWin(0).checkDiag1();
                    checkWin(2).checkDiag2();
                    checkWin().checkDraw();
                }

                checkGame();
                console.log(boardArray);
                return
            }
            //declare grid to be listener
            function gridListener() {
                const gridLayout = document.querySelectorAll('.boardGame div');
                for (let i=0; i<gridLayout.length; i++){
                    gridLayout[i].addEventListener('mouseover', ()=>{} );
                    gridLayout[i].addEventListener('click', boxClicked );         
                }
            }
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

        return {
            playGame,     
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
        //displayRes.style.opacity='0';
        contentLayerDet.textContent='';
        contentLayerDet.append(capDisplay);
        contentLayerDet.append(displayRes);  

    }

    const matchWin = (player) =>{
        //create layer cover up whole content/body to congratulate you for winning the 5 rounds match while resetting the game like mainmenu()
        const layerMenu = document.querySelector('.layerMenu');
        const ovrl = document.createElement('div');
        const congratsDis = document.createElement('div');

        ovrl.className='overlay';
        ovrl.style.display='flex';
        congratsDis.className='congratsDisplay';
        congratsDis.innerText=`Congratulations ${player}! You Won the Match`
        
        layerMenu.append(ovrl);
        ovrl.appendChild(congratsDis);
        ovrl.onclick = () => { 
            
            const layerOffAnimation = () => {
                congratsDis.style.opacity='0';
                ovrl.style.opacity='0';
            }
            const displayOff = () => {
            ovrl.style.display='';
            ovrl.className='layerOff'; 

            }
            
            setTimeout(layerOffAnimation, 500);
            setTimeout(displayOff, 1000);
        };

        const resetMatchScore = () => { //reset match after 5 wins
            matchScoreX = [];
            matchScoreO = [];
            //document.querySelector('.contentLayerDetails').textContent='';
            setTimeout( ()=>{
                            document.querySelector('.displayResult').style.opacity='0';
                            document.querySelector('.displayCaption').style.opacity='0';},10)
            setTimeout( ()=>{document.querySelector('.contentLayerDetails').textContent='';},300)
        }


        setTimeout(resetMatchScore, 1900);
    }

    let matchScoreX = [];
    let matchScoreO = [];

    function matchStatus(result, winner) {
        const contentMenu = document.querySelector('.contentMenu');
       
        const overlay = document.createElement('div');
        const resultNotice = document.createElement('p');

        overlay.className="overlay";
        overlay.style.display='flex';
        resultNotice.innerText=`Round ${result}! ${winner}!`;
        resultNotice.className="resultNotice";

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
        
        if(matchScoreX.length <= 4 && matchScoreO.length <= 4 ) { //Oke gud enuf
            
            let displayOffAnimate = () => {
                resultNotice.style.opacity='0';
                overlay.style.opacity='0'
            }

            let displayOff =() => {
                overlay.style.display='';
                overlay.className="layerOff";
            }   

            overlay.appendChild(resultNotice);
            contentMenu.append(overlay);
            setTimeout(displayOffAnimate, 2500);
            setTimeout(displayOff, 3000);
        } 
        else if( matchScoreX.length === 5 ) { //matchScore must be first
            matchWin(`${username}`);
        }
        else if (matchScoreO.length === 5) {
            matchWin('OTHER HUMAN'); // ini kalo yg menang AI hrs ada parameter lagi
        }
        
    }

    
    function clearState() {
            boardArray.length = 0;
            document.querySelectorAll('.boardGame div').forEach((grid)=>{grid.innerText=""});
            console.log('Board is Empty, Go Ahead');
    }

    const boardLayout = () => {
      const boardLay = document.querySelector('.boardGame');
        for ( let i=0; i<9; i++) {
                const gridBoard = document.createElement('div');
                gridBoard.className=`grid-${i}`;
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