import { useEffect, useState } from "react";

const Audio = ({
  currentTrack,
  playerRef,
  handleMoveTrack,
  setAudioIsLoaded,
}: any) => {
  const [currentTrackURL, setCurentTrackURL] = useState(
    currentTrack.preview_url
  );

  useEffect(() => {
    setCurentTrackURL(currentTrack.preview_url);
    setAudioIsLoaded(false);
  }, [currentTrack]);

  const handleLoaded = () => {
    setAudioIsLoaded(true)
  };

  const Track = ({ track }: any) => {
    return (
      <>
        <audio
          onLoadedData={handleLoaded}
          onEnded={() => handleMoveTrack("next")}
          ref={playerRef}
          controls
        >
          <source src={track || ""} type="audio/mp3" />
        </audio>
      </>
    );
  };

  return <Track track={currentTrackURL} />;
};

export default Audio;
