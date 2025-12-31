console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio(); 
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgessBar');
let gif = document.getElementById('gif');
let sultan = document.getElementById('sultan');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Shopping list", filepath: "../audio/WhatsApp Audio 2025-07-15 at 16.25.48_cf250c03.mp3", coverPath: "../s_image/download (2).jpg" },
    { songName: "Main Rahun", filepath: "../audio/WhatsApp Audio 2025-07-16 at 17.24.29_022afd7f.mp3", coverPath: "../s_image/download (4).jpg" },
    { songName: "Koi Mil Gaya", filepath: "../audio/WhatsApp Audio 2025-07-16 at 17.24.25_c8653d81.mp3", coverPath: "../s_image/download (3).jpg" },
    { songName: "Yaara", filepath: "../audio/WhatsApp Audio 2025-07-16 at 17.24.27_c0f611f9.mp3", coverPath: "../s_image/download (5).jpg" },
    { songName: "Ranjheya Ve", filepath: "../audio/WhatsApp Audio 2025-07-16 at 17.24.29_1dffe91f.mp3", coverPath: "../s_image/download (6).jpg" },
    { songName: "Dark Aria", filepath: "../audio/WhatsApp Audio 2025-07-16 at 21.07.08_e3126a36.mp3", coverPath: "../s_image/download (7).jpg" },
];

// Update song item display
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

// Master play/pause control
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Time update listener
audioElement.addEventListener('timeupdate', () => {   //every time audio playback change
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all song play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Individual song item play/pause controls
Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);         // retreive the id of clicked button

        if (songIndex === clickedIndex && !audioElement.paused) {    //compare the clicked song with currectly playing song
            // Pause current song
            audioElement.pause();        //pauses audio
            makeAllPlays();             //reset all play buttons
            e.target.classList.remove('fa-pause-circle');           //change clic kbutton to play
            e.target.classList.add('fa-play-circle');            
            masterplay.classList.remove('fa-pause-circle');          //main play button to play icon
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity = 0;                             // hide playing gif
        } else {
            // Play new or paused song
            songIndex = clickedIndex;         //update current song
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');    //change click button to pause icon
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filepath;  //laod selected song
            sultan.innerText = songs[songIndex].songName;  //display song title
            audioElement.currentTime = 0;   //reset play time
            audioElement.play();        //aduio play
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
    });
});

// Next song button
document.getElementById("next").addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filepath;  //load new song to 
    sultan.innerText = songs[songIndex].songName;  //song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');   //chaneg play icon to pause
    masterplay.classList.add('fa-pause-circle');
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});

// Previous song button
document.getElementById("previus").addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    sultan.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});




















