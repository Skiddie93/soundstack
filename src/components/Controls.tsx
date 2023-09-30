import { useState, useEffect, ChangeEvent } from "react";
import {
  BsFillPlayFill,
  BsSkipBackwardFill,
  BsSkipForwardFill,
  BsFillPauseFill,
} from "react-icons/bs";
import RangeInput from "./RangeInput";
import { getLocalStorage, setLocalStorage } from "./../utils/useLocalStorage";

interface Props {
  handleMoveTrack: (direction: "next" | "prev") => void;
  playerRef: any;
  audioIsLoaded: boolean;
  currentTrack: any;
}

const Controls = ({
  handleMoveTrack,
  playerRef,
  audioIsLoaded,
  currentTrack,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(getLocalStorage("volume") || '50');
  const [isPlaying, setIsPlaying] = useState(false);

  const duration = playerRef.current?.duration || "0";

  const handlePlayPause = () => {
    if (audioIsLoaded && playerRef.current) {
      isPlaying ? playerRef.current.play() : playerRef.current.pause();
    } else if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handleScrollTrack = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioIsLoaded && playerRef.current) {
      const time = parseFloat(e.currentTarget.value);
      setCurrentTime(time);
      playerRef.current.currentTime = time;
    }
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = e.currentTarget.value;
    setVolume(volume);
    setLocalStorage("volume", volume);
    playerRef.current.volume = +volume / 100;
  };

  useEffect(() => {
    setCurrentTime(0);
  }, [currentTrack]);

  useEffect(() => {
    handlePlayPause();
    if (audioIsLoaded) {
      playerRef.current.volume = +volume / 100;
    }
  }, [isPlaying, audioIsLoaded]);

  let trackTimer: ReturnType<typeof setInterval>;
  useEffect(() => {
    // interval checks and sets current duration and is cleared on unmount
    if (playerRef.current) {
      trackTimer = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.currentTime.toFixed(4);
          setCurrentTime(currentTime);
        }
      }, 10);
    }

    return () => {
      clearInterval(trackTimer);
    };
  }, []);

  return (
    <div className="controls">
      <div className="navigation">
        <div className="buttons">
          <p
            className="nav-btn"
            onClick={() => {
              handleMoveTrack("prev");
            }}
          >
            <BsSkipBackwardFill />
          </p>
          <p className="nav-btn" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </p>
          <p
            className="nav-btn"
            onClick={() => {
              handleMoveTrack("next");
            }}
          >
            <BsSkipForwardFill />
          </p>
        </div>

        <RangeInput
          className="volume"
          onChange={handleVolume}
          max={100}
          value={+volume}
          step={1}
        />
      </div>
      <div className="timeline">
        <RangeInput
          onChange={handleScrollTrack}
          value={currentTime}
          max={duration}
        />
      </div>
    </div>
  );
};

export default Controls;
