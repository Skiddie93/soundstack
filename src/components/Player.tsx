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

  const nextValidTrackId = (currentId: number, direction: boolean = true) => {
    const [...sortedCopy] = tracks.items;

    const splitLeft: Record<string, any>[] = sortedCopy.slice(0, currentId);
    const splitRight: Record<string, any>[] = sortedCopy.slice(
      currentId,
      sortedCopy.length
    );

    const reorderQueue = direction
      ? [...splitRight, ...splitLeft]
      : [...splitLeft.reverse(), ...splitRight.reverse()];

    const firstValidTrack = reorderQueue.find(
      (track: Record<string, any>) => track.preview_url
    );

    const validTrackId: string = firstValidTrack?.id || reorderQueue[0]?.id;

    const index = tracks.items.findIndex(
      (item: any) => item.id == validTrackId
    );

    return index;
  };

  useEffect(() => {
    setCurrentTrack(tracks.items[nextValidTrackId(0)]);
  }, [album]);

  const handleMoveTrack = (direction: "next" | "prev") => {
    const currentTrackIndex = tracks.items.findIndex(
      (track: Record<any, any>) => track.id == currentTrack.id
    );

    const albumTracksTotal = tracks.items.length;

    if (direction == "next") {
      const nextTrackIndex = (currentTrackIndex + 1) % albumTracksTotal;

      console.log(tracks.items[nextTrackIndex].preview_url);

      if (tracks.items[nextTrackIndex].preview_url) {
        setCurrentTrack(tracks.items[nextTrackIndex]);
      } else {
        const firsValidId = nextValidTrackId(nextTrackIndex);
        setCurrentTrack(tracks.items[firsValidId]);
      }
    } else {
      let nextTrackIndex = (currentTrackIndex - 1) % albumTracksTotal;
      nextTrackIndex =
        nextTrackIndex >= 0 ? nextTrackIndex : albumTracksTotal - 1;
      if (tracks.items[nextTrackIndex].preview_url) {
        setCurrentTrack(tracks.items[nextTrackIndex]);
      } else {
        const firsValidId = nextValidTrackId(nextTrackIndex + 1, false);
        setCurrentTrack(tracks.items[firsValidId]);
      }
    }
  };

  const handleTrackChange: any = (event: any) => {
    const newTrackId = event.currentTarget.id;
    const newTrack = tracks.items.find(
      (track: Record<any, any>) => track.id == newTrackId
    );
    setCurrentTrack(newTrack);
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
            <img src="/img/icons/spotify.svg" alt="" />
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
                  <div className="track" key={track.id}>
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
          <PlayerContextMenu album={album} />
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

const PlayerContextMenu = ({ album }: any) => {
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
