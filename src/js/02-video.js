import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
console.log(iframe);
const player = new Player(iframe);
console.log(player);

function throttleTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}
player.on('timeupdate', throttle(throttleTime, 1000));
const timeVideo = JSON.parse(localStorage.getItem('videoplayer-current-time'));
if (timeVideo) {
  player.setCurrentTime(timeVideo.seconds);
}
console.log(timeVideo);
