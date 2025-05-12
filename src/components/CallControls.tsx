
import { useVideoCall } from "@/contexts/VideoCallContext";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Filter
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CallControls = () => {
  const { 
    isCameraOn, 
    isMicOn, 
    toggleCamera, 
    toggleMic, 
    isCallActive, 
    startCall, 
    endCall,
    currentFilter,
    setFilter,
    availableFilters
  } = useVideoCall();

  return (
    <div className="flex items-center justify-center gap-3 p-4">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleCamera} 
        className={`rounded-full ${!isCameraOn ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
      >
        {isCameraOn ? (
          <Camera className="h-5 w-5" />
        ) : (
          <CameraOff className="h-5 w-5" />
        )}
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleMic}
        className={`rounded-full ${!isMicOn ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
      >
        {isMicOn ? (
          <Mic className="h-5 w-5" />
        ) : (
          <MicOff className="h-5 w-5" />
        )}
      </Button>

      <Button 
        variant={isCallActive ? "destructive" : "default"} 
        onClick={isCallActive ? endCall : startCall}
        className="rounded-full px-8"
      >
        {isCallActive ? "End Call" : "Start Call"}
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">
                Apply filters to your video
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {availableFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={currentFilter === filter ? "default" : "outline"}
                  className="text-xs capitalize"
                  onClick={() => setFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CallControls;
