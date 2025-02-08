const songs = [
    { title: "A vida É Desafio", src: "Musica/A vida É Desafio   Nada Como Um Dia Após O Outro Dia (Chora Agora)-7c280b9f3f7fce91bedd21a9ebdd9ced.mp3" },
    { title: "Da ponte pra cá", src: "Musica/Da ponte pra cá   Nada Como Um Dia Após O Outro Dia (Ri Depois)-731b6d884eabdb384ce661c28a979dd8.mp3" },
    { title: "Estilo Cachorro", src: "Musica/Estilo Cachorro   Nada Como Um Dia Após O Outro Dia (Ri Depois)-a045fd392d5bb6f9b9d97f47b1df1254.mp3" },
    { title: "Eu sou 157", src: "Musica/Eu sou 157   Nada Como Um Dia Após O Outro Dia (Chora Agora)-7c588ddf875c8af0655b539025375991.mp3" },
    { title: "Negro Drama", src: "Musica/Negro Drama   Nada Como Um Dia Após O Outro Dia (Chora Agora)-7b1bd59979c4a6cfe4ce245b813d85d9.mp3" },
    { title: "Pipa Soul", src: "Musica/PIPA SOUL   Outskirts Tribe   (Official Clip)-3d38706dee850b2e1fa0291a1478f09f.mp3" },
    { title: "Capítulo 4 Versículo 3", src: "Musica/Racionais   Sobrevivendo no Inferno    Capítulo 4 Versículo 3-feab0788f7f243c2aa333765d7dc8bdb.mp3" },
    { title: "Diário de um Detento", src: "Musica/Racionais   Sobrevivendo no Inferno   Diário de um Detento-f386b57bac4692bc0e9245c7873abcba.mp3" },
    { title: "Nosso Plano", src: "Musica/Tribo da Periferia   Nosso Plano (Official Music Video)-b5a8462ca5936823cde752f1c1145708.mp3" },
    { title: "Unpredictable", src: "Musica/Tribo da Periferia   Unpredictable (Official Music Video)-f942eb5ee76cf84293fe480337ac0e8d.mp3" },
    { title: "Vida Loka", src: "Musica/Vida Loka Parte 2   Nada Como Um Dia Após O Outro Dia (Ri Depois)-038638d8da9e301cd269443df26cedf4.mp3" },
    { title: "", src: "" },
    
];

let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songList = document.getElementById('songList').getElementsByTagName('li');
const playlist = document.getElementById('playlist');
const togglePlaylistBtn = document.getElementById('togglePlaylist');
const speedUpBtn = document.getElementById('speedUpBtn');
const songTitleElement = document.getElementById('song-title'); // Elemento para exibir o título da música
const progressBar = document.getElementById('progressBar');
const timer = document.getElementById('timer');

// Elementos para controle de volume
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-control input[type="range"]');
let isMuted = false;

// Função para carregar a música selecionada
function loadSong(index) {
    Array.from(songList).forEach(songItem => {
        songItem.classList.remove('active-song');
    });

    currentSongIndex = index; 
    audioPlayer.src = songs[index].src;
    audioPlayer.play();
    playPauseBtn.textContent = '⏸ ';
    isPlaying = true;
    songTitleElement.textContent = songs[index].title; // Atualiza o título da música
    songList[index].classList.add('active-song');

    // Atualiza a letra da música
    lyricsElement.innerHTML = `<p>${lyricsData[songs[index].title] || "Letra não disponível."}</p>`;
}

// Função para reproduzir ou pausar a música
function playPauseSong() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

// Função para ir para a música anterior
function prevSong() {
    currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs.length - 1;
    loadSong(currentSongIndex);
}

// Função para ir para a próxima música
function nextSong() {
    currentSongIndex = (currentSongIndex < songs.length - 1) ? currentSongIndex + 1 : 0;
    loadSong(currentSongIndex);
}

// Função para alternar a visualização da playlist
function togglePlaylist() {
    playlist.classList.toggle('show');
}

// Função para atualizar a barra de progresso e o timer
audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
    progressBar.style.setProperty('--progress', `${progress}%`);

    // Atualiza o timer
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');

    timer.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
});

// Função para ajustar o tempo da música com a barra de progresso
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

// Controle de velocidade (acelera ao pressionar e desacelera ao soltar)
speedUpBtn.addEventListener('mousedown', function() {
    audioPlayer.playbackRate = 2.0;
});

speedUpBtn.addEventListener('mouseup', function() {
    audioPlayer.playbackRate = 1.0;
});

speedUpBtn.addEventListener('touchstart', function() {
    audioPlayer.playbackRate = 2.0;
});

speedUpBtn.addEventListener('touchend', function() {
    audioPlayer.playbackRate = 1.0;
});

// Controle de volume
audioPlayer.volume = volumeSlider.value / 100;

volumeBtn.addEventListener('click', () => {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
        volumeBtn.textContent = '🔇'; // Ícone de mudo
    } else {
        audioPlayer.volume = volumeSlider.value / 100;
        volumeBtn.textContent = '🔊'; // Ícone de volume
    }
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;

    if (volumeSlider.value == 0) {
        volumeBtn.textContent = '🔇'; // Ícone de mudo
    } else {
        volumeBtn.textContent = '🔊'; // Ícone de volume
    }
});

// Adiciona eventos aos controles
audioPlayer.addEventListener('ended', nextSong);
playPauseBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
togglePlaylistBtn.addEventListener('click', togglePlaylist);

Array.from(songList).forEach((songItem, index) => {
    songItem.addEventListener('click', () => {
        loadSong(index);
    });
});

// Botão para música aleatória
document.getElementById("randomBtn").addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    loadSong(randomIndex);
});

// Carrega a primeira música ao iniciar
loadSong(currentSongIndex);

// Oculta a letra ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const lyricsContainer = document.getElementById('lyrics');
    lyricsContainer.style.display = 'none'; // Oculta a letra
});

// Botão para exibir/ocultar a letra
document.getElementById('toggleLyrics').addEventListener('click', function() {
    const lyricsContainer = document.getElementById('lyrics');
    const playlistContainer = document.getElementById('playlist');

    // Alterna a visibilidade da letra e esconde a playlist
    if (lyricsContainer.style.display === 'none' || lyricsContainer.style.display === '') {
        lyricsContainer.style.display = 'block'; // Exibe a letra
        playlistContainer.style.display = 'none'; // Esconde a playlist
    } else {
        lyricsContainer.style.display = 'none'; // Esconde a letra
    }
});

// Alternar visibilidade da playlist e letra
togglePlaylistBtn.addEventListener('click', function() {
    const playlistContainer = document.getElementById('playlist');
    const lyricsContainer = document.getElementById('lyrics');

    if (playlistContainer.style.display === "none" || playlistContainer.style.display === '') {
        playlistContainer.style.display = "block"; // Exibe a playlist
        lyricsContainer.style.display = "none"; // Esconde a letra
    } else {
        playlistContainer.style.display = "none"; // Esconde a playlist
    }
});
