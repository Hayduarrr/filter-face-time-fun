
import { VideoCallProvider } from "@/contexts/VideoCallContext";
import VideoCallLayout from "@/components/VideoCallLayout";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary/20 backdrop-blur-sm p-4 shadow-sm">
        <div className="container">
          <h1 className="text-xl font-bold text-primary-foreground">FaceTime Clone</h1>
        </div>
      </header>
      
      <main className="flex-1 container py-4">
        <div className="h-[calc(100vh-8rem)]">
          <VideoCallProvider>
            <VideoCallLayout />
          </VideoCallProvider>
        </div>
      </main>
    </div>
  );
};

export default Index;
