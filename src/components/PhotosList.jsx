import {
    useAddPhotoMutation,
    useFetchPhotosQuery,
} from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skelton from "./Skelton";

function PhotosList({ album }) {
    const { data, error, isFetching } = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    };

    let content;
    if (isFetching) {
        content = <Skelton className="h-20 w-20" times={3} />;
    } else if (error) {
        content = <div>Error fetching photos</div>;
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />;
        });
    }
    return <>
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Photos of {album.title}</h3>
            <Button loading={results.isLoading} onClick={handleAddPhoto}>+ Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center m-2">
            {content}
        </div>
    </>;
}

export default PhotosList;