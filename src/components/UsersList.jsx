import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useThunk } from "../hooks/useThunk";
import { addUser, fetchUsers } from "../store";
import Skelton from "./Skelton";
import Button from "./Button";
import UsersListItem from "./UsersListItem";

function UserList() {
    const { data } = useSelector((state) => state.users);
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <Skelton times={5} className="h-10 w-full" />
    } else if (loadingUsersError) {
        content = <div>Error fetching users data...</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;
        });
    }

    return <div className="container mx-auto">
        <div className="flex justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button
                primary
                rounded
                loading={isCreatingUser}
                onClick={handleUserAdd}
            >
                + Add User
            </Button>
            {creatingUserError && 'Error creating user...'}
        </div>
        {content}
    </div>;
}

export default UserList;
