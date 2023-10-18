import { useEffect, useState, useRef } from "react";
import Controls from "./Controls";
import Audio from "./Audio";
import { IoMdAdd } from "react-icons/io";
import isVisible from "@/utils/useIsVisible";
import StackListContext from "@/components/StackListContext";
interface Props {
  album: Record<any, any>;
}

const Player = ({ album }: Props) => {
  const albumImage = album.images[0].url;
  const tracks = album.tracks;
  const [currentTrack, setCurrentTrack] = useState(tracks.items[0]);
  const [audioIsLoaded, setAudioIsLoaded] = useState(false);

  const playerRef = useRef<HTMLAudioElement | null>(null);
  const albumLink = album.external_urls.spotify;
  const albumName = album.name;

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
        nextTrackIndex >= 0
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

  const tracksClass = (trackId: any, preview: any) => {
    const base = "track-wrapper ";
    const isActive = trackId == currentTrack.id ? "active" : "";
    const hasPreview = preview ? "" : "disabled ";
    return base + hasPreview + isActive;
  };

  return (
    <div className="player">
      <p className="album-title">
        {albumName}{" "}
        <span>
          <a href={albumLink} target="_blank" className="spotify-link">
            <img src="img/icons/spotify.svg" alt="" />
          </a>
        </span>
      </p>
      <div className="player-top">
        <div className="img-wrapper">
          <img src={albumImage} alt="" />
        </div>
        <div className="tracks-container">
          <div className="tracks">
            {tracks.items.map((track: any) => {
              return (
                <div
                  className={tracksClass(track.id, track.preview_url)}
                  onClick={(e) => {
                    if (track.preview_url) handleTrackChange(e);
                  }}
                  id={track.id}
                  key={track.id}
                >
                  <div className="track" key={track.name}>
                    <p>
                      {track.name}
                      <span>No preview</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="player-bottom">
        <div className="track-name">
          {currentTrack.name}
          <PlayerContext album={album} />
        </div>
        <Controls
          handleMoveTrack={handleMoveTrack}
          audioIsLoaded={audioIsLoaded}
          playerRef={playerRef}
          currentTrack={currentTrack}
        />
        <Audio
          currentTrack={currentTrack}
          handleMoveTrack={handleMoveTrack}
          playerRef={playerRef}
          setAudioIsLoaded={setAudioIsLoaded}
        />
      </div>
    </div>
  );
};

const PlayerContext = ({ album }: any) => {
  const visibility = isVisible();
  return (
    <div className="p-context">
      <IoMdAdd
        data-ignore="true"
        onMouseDown={() => {
          visibility.setVisible(true);
        }}
      />
      {visibility.visible && (
        <StackListContext
          contextMenuRef={visibility.element}
          albumData={album}
        />
      )}
    </div>
  );
};

export default Player;
