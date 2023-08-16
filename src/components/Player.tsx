import { useEffect, useState, useRef } from "react";
import Controls from "./Controls";
import Audio from "./Audio";
interface Props {
  album: Record<any, any>;
}

const Player = ({ album }: Props) => {
  const albumImage = album.images[0].url;
  const tracks = album.tracks;
  const [currentTrack, setCurrentTrack] = useState(tracks.items[0]);
  const [audioIsLoaded, setAudioIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setCurrentTrack(tracks.items[0]);
  }, [album]);

  const handleMoveTrack = (direction: "next" | "prev") => {
    if (audioIsLoaded) {
      const currentTrackIndex = tracks.items.findIndex(
        (track: Record<any, any>) => track.id == currentTrack.id
      );

      const albumTracksTotal = tracks.items.length;

      if (direction == "next") {
        const nextTrackIndex = (currentTrackIndex + 1) % albumTracksTotal;
        setCurrentTrack(tracks.items[nextTrackIndex]);
      } else {
        const nextTrackIndex = (currentTrackIndex - 1) % albumTracksTotal;
        nextTrackIndex > 0
          ? setCurrentTrack(tracks.items[nextTrackIndex])
          : setCurrentTrack(tracks.items[albumTracksTotal - 1]);
      }
    }
  };

  const handleTrackChange: any = (event: any, key: any) => {
    if (audioIsLoaded) {
      const newTrackId = event.currentTarget.id;
      const newTrack = tracks.items.find(
        (track: Record<any, any>) => track.id == newTrackId
      );
      setCurrentTrack(newTrack);
    }
  };

  return (
    <div className="player">
      <div className="img-wrapper">
        <img src={albumImage} alt="" />
      </div>
      <p>{currentTrack.name}</p>
      <Controls
        handleMoveTrack={handleMoveTrack}
        audioIsLoaded={audioIsLoaded}
        playerRef={playerRef}
      />
      <Audio
        currentTrack={currentTrack}
        handleMoveTrack={handleMoveTrack}
        playerRef={playerRef}
        setAudioIsLoaded={setAudioIsLoaded}
      />
      <div className="tracks">
        {tracks.items.map((track: any) => {
          return (
            <div
              className="track-wrapper"
              onClick={handleTrackChange}
              id={track.id}
              key={track.id}
            >
              {track.preview_url ? (
                <div className="track" key={track.name}>
                  <p>{track.name}</p>
                </div>
              ) : (
                <div className="track">
                  No Preview <p>{track.name}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Player;
