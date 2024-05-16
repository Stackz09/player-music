const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img")

const music = new Audio()

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
    path: "img/imagem 5.jpg",
    displayName: "Ruja o Leão",
    cover: "img/musica5.m4a",
    artist: "Talita Catanzaro",
  },
  {
    path: "img/imagem111.jpeg",
    displayName: "tua presença vale mais",
    cover: "img/musica111.m4a",
    artist: "Mateus Brito",
  },
  {
    path: "img/imagem 7.jpg",
    displayName: "Pode morar aqui",
    cover: "img/musica7.mp3",
    artist: "Theo Rubia",
  },
  {
    path: "img/imagem 8.jpg",
    displayName: "yeshua",
    cover: "img/musica8.mp3",
    artist: "José Augusto",
  },
  {
    path: "img/imagem 9.jpg",
    displayName: "1000 graus",
    cover: "img/musica9.mp3",
    artist: "Renascer Prise",
  },
  {
    path: "img/imagem 10.jpg",
    displayName: "Me ajude a melhorar (ao vivo)",
    cover: "img/musica 10.mp3",
    artist: "Eli Soares",
  },
  {
    path: "img/imagem 11.avif",
    displayName: "É tudo sobre você",
    cover: "img/musica11.mp3",
    artist: "Morada",
  },
  {
    path: "img/imagem 12.jpg",
    displayName: "Único",
    cover: "img/musica 12.mp3",
    artist: "Marco telles ",
  },
  {
    path: "img/imagem 13.jpg",
    displayName: "Até que o senhor venha",
    cover: "img/musica13.mp3",
    artist: "Davi Fernandes + Kaleb & Josh ",
  },
  {
    path: "img/imagem 14.jpg",
    displayName: "Eu tenho você",
    cover: "img/musica14.mp3",
    artist: "Marcelo Markes ",
  },
]

let musicIndex = 0
let isPlaying = false

function toggleplay() {
  if (isPlaying) {
    pauseMusic()
  } else {
    playMusic()
  }
}

function playMusic() {
  isPlaying = true
  //change play button icon
  playBtn.classList.replace("fa-play", "fa-pause")
  //Set button hover title
  playBtn.setAttribute("title", "Pause")
  music.play()
}

function pauseMusic() {
  isPlaying = false
  //change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play")
  //Set button hover title
  playBtn.setAttribute("title", "Play")
  music.pause()
}

function loadMusic(song) {
  music.src = song.cover
  title.textContent = song.displayName
  artist.textContent = song.artist // Correção feita aqui
  image.src = song.path
  background.src = song.path // Ou background.src = song.cover; se preferir
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length
  loadMusic(songs[musicIndex])
  playMusic()
}

function updateProgessBar() {
  const { duration, currentTime } = music
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0")
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth
  const clickX = e.offsetX
  music.currentTime = (clickX / width) * music.duration
}

playBtn.addEventListener("click", toggleplay)
prevBtn.addEventListener("click", () => changeMusic(-1))
nextBtn.addEventListener("click", () => changeMusic(1))
music.addEventListener("ended", () => changeMusic(1))
music.addEventListener("timeupdate", updateProgessBar)
playerProgress.addEventListener("click", setProgressBar)

loadMusic(songs[musicIndex])
