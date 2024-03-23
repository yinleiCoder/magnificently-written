import Video from "next-video";
// import PythonTutorial from "https://qkkh860lhbovjaqg.public.blob.vercel-storage.com/videos/python_1-4EAf9UhPufiyYiBmSuI1JjY6n9aWAO-AkhYQl1tmzVkDfXFgdyEFVwuTI6Upv.mp4";
import PythonTutorial from "@/videos/python_1.mp4";

interface VideoIdPageProps {
  params: {
    videoId: string;
  };
}

function VideoIdPage({ params }: VideoIdPageProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-3">
        <Video src={PythonTutorial} className="w-full h-[80vh]" />
      </div>
      <div className="w-[300px] bg-red-300">
        <p>{params.videoId}</p>
        <p>播放列表</p>
      </div>
    </div>
  );
}

export default VideoIdPage;
