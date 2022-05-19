function startGame() {

    document.getElementById('modalStartGame').addEventListener( 'click', closeStartModal);
    
    function closeStartModal() {
        document.querySelector('.layerStartModal').classList.add('layerOff');
    }
}

startGame();