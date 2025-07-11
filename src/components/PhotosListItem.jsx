import { GoSync, GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
    const [removePhoto, results] = useRemovePhotoMutation();

    const handleRemovePhoto = () => {
        removePhoto(photo);
    };

    return <div onClick={handleRemovePhoto} className="relative cursor-pointer">
        <img className="h-20 w-20 rounded-2xl" src={photo.url} alt="random" />
        <div className="absolute inset-0 flex justify-center items-center hover:bg-gray-400 opacity-0 hover:opacity-80 rounded-2xl">
            {
                results.isLoading
                    ? <GoSync className="animate-spin" />
                    : <GoTrashcan className="h-8 w-8 text-white" />
            }
        </div>
    </div>;
}

export default PhotosListItem;