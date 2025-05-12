
import { useRef, useEffect } from "react";
import { useVideoCall } from "@/contexts/VideoCallContext";

interface VideoContainerProps {
  stream: MediaStream | null;
  isSelf: boolean;
  muted?: boolean;
}

const VideoContainer = ({ stream, isSelf, muted = false }: VideoContainerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentFilter } = useVideoCall();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`relative h-full w-full rounded-lg overflow-hidden ${isSelf ? 'bg-muted animate-scale-in' : 'bg-card'}`}>
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          className={`h-full w-full object-cover ${isSelf ? `filter-${currentFilter}` : ''}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">No video</p>
        </div>
      )}
      {isSelf && (
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-xs text-white rounded">
          You
        </div>
      )}
      {!isSelf && (
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-xs text-white rounded">
          Remote User
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
