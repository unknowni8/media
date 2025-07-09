import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pause } from "../../utilities/common_utils";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");
  await pause(1000);
  return response.data;
});


export { fetchUsers };
