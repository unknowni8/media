import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "../../utilities/common_utils";

const removeUser = createAsyncThunk("users/remove", async (user) => {
    await axios.delete(`http://localhost:3005/users/${user.id}`);
    await pause(1000);
    return user;
});

export { removeUser };