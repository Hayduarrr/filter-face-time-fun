
import { useEffect } from "react";
import VideoContainer from "./VideoContainer";
import CallControls from "./CallControls";
import { useVideoCall } from "@/contexts/VideoCallContext";
import { Badge } from "@/components/ui/badge";

const VideoCallLayout = () => {
  const { localStream, remoteStream, isCallActive, connectionStatus } = useVideoCall();

  return (
    <div className="flex flex-col h-full bg-gradient-call animate-fade-in">
      <div className="flex-1 p-4">
        <div className="relative h-full flex flex-col md:flex-row gap-4">
          {/* Connection Status */}
          <div className="absolute top-4 right-4 z-10">
            {connectionStatus === 'connecting' && (
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-200 animate-pulse-light">
                Connecting...
              </Badge>
            )}
            {connectionStatus === 'connected' && (
              <Badge variant="outline" className="bg-green-500/20 text-green-200">
                Connected
              </Badge>
            )}
          </div>
          
          {/* Main Video (Remote or Self) */}
          <div className="flex-1 relative rounded-lg overflow-hidden border border-border/40 shadow-lg">
            {isCallActive && remoteStream ? (
              <VideoContainer stream={remoteStream} isSelf={false} />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted/30 backdrop-blur-sm rounded-lg">
                <div className="text-center p-6">
                  <h2 className="text-xl font-bold mb-2">Video Call</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {connectionStatus === 'disconnected' 
                      ? 'Start a call to connect with someone' 
                      : 'Establishing connection...'}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Self Video (Picture-in-Picture) */}
          <div className={`${isCallActive ? 'absolute bottom-8 right-8 w-1/4 h-1/4 md:w-1/3 md:h-1/3' : 'flex-1'} 
                         rounded-lg overflow-hidden border border-border/40 shadow-lg transition-all`}>
            <VideoContainer stream={localStream} isSelf={true} muted={true} />
          </div>
        </div>
      </div>
      
      <div className="p-4 backdrop-blur-sm bg-black/20 border-t border-border/40">
        <CallControls />
      </div>
    </div>
  );
};

export default VideoCallLayout;
