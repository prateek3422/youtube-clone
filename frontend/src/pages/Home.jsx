
import { Loader, VideoCard } from "../components";
import getAllVudeo from "../hooks/react-query/query/videos/getAllVudeo.jsx";

const Home = () => {
  // const [query, setQuery] = useState("jjk");
  // console.log(video);

  const {data:video, isLoading,} = getAllVudeo()

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="container mx-auto">
        <div className="main  w-full">
          <div className="grid  grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            {video?.docs?.map((vid) => (
              <li key={vid._id} className="list-none">
                <VideoCard {...vid} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
