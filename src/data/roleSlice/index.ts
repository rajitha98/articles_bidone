import { createSlice } from "@reduxjs/toolkit";

export type RoleTypes = "editor" | "reader";

export interface RoleState {
  role: RoleTypes;
}

const initialState: RoleState = {
  role: "reader",
};

export const RoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    changeRole: (state, actions) => {
      state.role = actions.payload ?? "reader";
    },
  },
});

export const { actions: RoleAction, reducer: RoleReducer } = RoleSlice;
