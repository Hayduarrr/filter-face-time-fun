
import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { toast } from 'sonner';

interface VideoCallContextType {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isCameraOn: boolean;
  isMicOn: boolean;
  currentFilter: string;
  isCallActive: boolean;
  availableFilters: string[];
  toggleCamera: () => void;
  toggleMic: () => void;
  setFilter: (filter: string) => void;
  startCall: () => void;
  endCall: () => void;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

export const VideoCallContext = createContext<VideoCallContextType>({
  localStream: null,
  remoteStream: null,
  isCameraOn: true,
  isMicOn: true,
  currentFilter: 'none',
  isCallActive: false,
  availableFilters: [],
  toggleCamera: () => {},
  toggleMic: () => {},
  setFilter: () => {},
  startCall: () => {},
  endCall: () => {},
  connectionStatus: 'disconnected'
});

interface VideoCallProviderProps {
  children: ReactNode;
}

export const VideoCallProvider = ({ children }: VideoCallProviderProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [currentFilter, setCurrentFilter] = useState<string>('none');
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  
  const availableFilters = ['none', 'sepia', 'grayscale', 'invert', 'hue-rotate', 'brightness', 'contrast', 'blur'];

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  
  // Initialize local stream
  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Create a mock remote stream for demo purposes
        const mockRemoteStream = new MediaStream();
        setRemoteStream(mockRemoteStream);
        
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access camera or microphone');
      }
    };

    initLocalStream();

    // Cleanup
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  const setFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  const startCall = () => {
    // In a real app, this would set up WebRTC connection
    setConnectionStatus('connecting');
    
    // Mock connection setup with timeout
    setTimeout(() => {
      setIsCallActive(true);
      setConnectionStatus('connected');
      toast.success('Call connected successfully');
      
      // Mock remote user's stream by cloning the local stream (for demo purposes only)
      if (localStream) {
        const mockRemoteStream = localStream.clone();
        setRemoteStream(mockRemoteStream);
      }
    }, 2000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setConnectionStatus('disconnected');
    toast.info('Call ended');
    
    // Clear the remote stream
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
  };

  return (
    <VideoCallContext.Provider value={{
      localStream,
      remoteStream,
      isCameraOn,
      isMicOn,
      currentFilter,
      isCallActive,
      availableFilters,
      toggleCamera,
      toggleMic,
      setFilter,
      startCall,
      endCall,
      connectionStatus
    }}>
      {children}
    </VideoCallContext.Provider>
  );
};

export const useVideoCall = () => React.useContext(VideoCallContext);
