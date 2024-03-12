import { useEffect, useState } from "react";

interface PropsAudio {
  currentTrack: Record<string, any>;
  playerRef: React.RefObject<any>;
  handleMoveTrack: (direction: "next" | "prev") => void;
  setAudioIsLoaded: (isLoaded: boolean) => void;
}

const Audio = ({
  currentTrack,
  playerRef,
  handleMoveTrack,
  setAudioIsLoaded,
}: PropsAudio) => {
  const [currentTrackURL, setCurentTrackURL] = useState(
    currentTrack.preview_url
  );

  useEffect(() => {
    setCurentTrackURL(currentTrack.preview_url);
    setAudioIsLoaded(false);
  }, [currentTrack]);

  const handleLoaded = () => {
    setAudioIsLoaded(true);
  };

  const Track = ({ track }: { track: string }) => {
    return (
      <>
        <audio
          onLoadedData={handleLoaded}
          onEnded={() => handleMoveTrack("next")}
          ref={playerRef}
        >
          <source src={track || ""} type="audio/mp3" />
        </audio>
      </>
    );
  };

  return <Track track={currentTrackURL} />;
};

export default Audio;
