import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import {
  BsFillPlayFill,
  BsSkipBackwardFill,
  BsSkipForwardFill,
  BsFillPauseFill,
} from "react-icons/bs";

interface Props {
  handleMoveTrack: (direction: "next" | "prev") => void;
  playerRef: any;
  audioIsLoaded: boolean;
}

const Controls = ({ handleMoveTrack, playerRef, audioIsLoaded }: Props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioIsLoaded) {
      console.log('lodaded');
      if (playerRef.current) {
        isPlaying ? playerRef.current.play() : playerRef.current.pause();
      }
    } else {
      console.log('notLOaded');
      
      if (playerRef.current) playerRef.current.pause();
    }
  };

  const handleScrollTrack = (e: ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const time = parseInt(e.currentTarget.value);
      setCurrentTime(time);
      playerRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    handlePlayPause();
  }, [isPlaying, audioIsLoaded]);

  let trackTimer: ReturnType<typeof setInterval>;

  useEffect(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration);
      trackTimer = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.currentTime.toFixed(2);
          setCurrentTime(currentTime);
        }
      }, 100);
    }

    return () => {
      clearInterval(trackTimer);
    };
  }, []);

  return (
    <div className="controls">
      <div className="navigation">
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
        <input
          onChange={handleScrollTrack}
          value={currentTime}
          max="30"
          type="range"
        />
      </div>
    </div>
  );
};

export default Controls;
