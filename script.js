function startGame() {

    document.getElementById('modalStartGame').addEventListener( 'click', closeStartModal);
    
    function closeStartModal() {  
       function layerOffAnimation() {
            console.log('layer Offing');
            document.querySelector('.layerModal').style.opacity="0";
        }
        function layerOffDisplay() {
            document.querySelector('.layerStartModal').classList.add('layerOff')
        }
        layerOffAnimation();
        setTimeout(layerOffDisplay, 500);
    }
}

startGame();