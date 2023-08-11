import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import useVideo from "../utils/useVideo";

const VideoContainer = () => {
  const menuOpen = useSelector((store) => store.app.isMenuOpen);
  const videos = useVideo();

  return (
    <>
      {!videos ? (
        <>
          <Shimmer />
        </>
      ) : menuOpen ? (
        <div className="grid grid-cols-4 grid-flow-row gap-4 justify-items-center">
          {videos.map((video) => (
            <Link to={"/watch?v=" + video.id} key={video.id}>
              <div className="">
                <VideoCard info={video} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 grid-flow-row gap-4 justify-items-center">
          {videos.map((video) => (
            <Link to={"/watch?v=" + video.id} key={video.id}>
              <div className="">
                <VideoCard info={video} />
              </div>
            </Link>
          ))}
        </div>
      )}
      ;
    </>
  );
};

export default VideoContainer;
