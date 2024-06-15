export const formatSecondsToMinute = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formatedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formatedMinutes}:${formattedSeconds}`;
};


export const isExist = (songs, track) => {
  return songs.some(song => song.url === track.url);
}
