import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/useThunk";
import { removeUser } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumList";

function UsersListItem({ user }) {
    const [doRemove, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemove(user);
    };

    const header = (
        <>
            <Button className="mr-3" primary loading={isLoading} onClick={handleClick}>
                <GoTrashcan />
            </Button>
            {user.name}
            {error && <div>Error deleting user.</div>}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    );
}

export default UsersListItem;