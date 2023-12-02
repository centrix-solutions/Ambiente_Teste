function toggleInfo() {
    var conteudoInfo = document.getElementById('conteudoInfo');

    if (conteudoInfo.style.display === 'none') {
        conteudoInfo.style.display = 'block';
        document.getElementById('seta').innerHTML = '&#9650;';  // Seta para cima
    } else {
        conteudoInfo.style.display = 'none';
        document.getElementById('seta').innerHTML = '&#9660;';  // Seta para baixo
    }
}