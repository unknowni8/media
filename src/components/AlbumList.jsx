import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import Skelton from "./Skelton";
import Button from "./Button";
import AlbumListItem from "./AlbumListItem";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skelton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error fetching albums</div>
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />
    });
  }
  return <>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-bold">Albums for {user.name}</h3>
      <Button outline onClick={handleAddAlbum} loading={results.isLoading}
      >
        + Add
      </Button>
    </div>
    <div>
      {content}
    </div>
  </>;
}

export default AlbumsList;