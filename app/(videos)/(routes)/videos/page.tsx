import Video from "next-video";
import PythonTutorial from "https://qkkh860lhbovjaqg.public.blob.vercel-storage.com/videos/python_1-4EAf9UhPufiyYiBmSuI1JjY6n9aWAO-AkhYQl1tmzVkDfXFgdyEFVwuTI6Upv.mp4";

function VideosPage() {
  return (
    <div className="flex-1 flex">
      <div className="flex-3">
        <Video src={PythonTutorial} />
      </div>
      <div className="flex-1">
        <p>播放列表</p>
      </div>
    </div>
  );
}

export default VideosPage;
