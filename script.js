const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
  {
    path: "img/imagem 1.jpg",
    displayName: "Arde outra vez",
    cover: "img/musica1.mp3",
    artist: "Thalles Roberto",
  },
  {
    path: "img/imagem 2.png",
    displayName: "Colossenses e suas linhas de amor",
    cover: "img/musica2.m4a",
    artist: "Marco Telles",
  },
  {
    path: "img/imagem 3.jpg",
    displayName: "Furioso oceano",
    cover: "img/musica3.m4a",
    artist: "Jhonas Serra",
  },
  {
    path: "img/imagem 4.jpg",
    displayName: "Me leva pra casa",
    cover: "img/musica4.m4a",
    artist: "Israel Subirá",
  },
  {
    path: "img/imagem 5.jpg",
    displayName: "Ruja o Leão",
    cover: "img/musica5.m4a",
    artist: "Talita Catanzaro",
  },
  {
    path: "img/imagem 6.jpg",
    displayName: "vem me buscar",
    cover: "img/musica6.m4a",
    artist: "Jefferson & Suellen ",
  },
]

let musicIndex = 0;
let isPlaying = false;

function toggleplay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true ;
  //change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  //Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  //change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  //Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.cover;
  title.textContent = song.displayName;
  artist.textContent = song.artist; // Correção feita aqui
  image.src = song.path;
  background.src = song.path ;// Ou background.src = song.cover; se preferir
};



function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgessBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEL.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", toggleplay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1))
music.addEventListener("timeupdate", updateProgessBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
