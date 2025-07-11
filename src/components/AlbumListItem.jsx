import { GoTrashcan } from "react-icons/go";

import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

function AlbumListItem({ album }) {
    const [removeAlbum, result] = useRemoveAlbumMutation();
    const handleAlbumDelete = () => {
        removeAlbum(album);
    };
    const header = (<div className="flex gap-2 items-center">
        <Button
            className="flex items-center w-8 p-0"
            onClick={handleAlbumDelete}
            loading={result.isLoading}
        >
            <GoTrashcan />
        </Button>
        {album.title}
    </div>);
    return <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album}/>
    </ExpandablePanel>;
}

export default AlbumListItem;