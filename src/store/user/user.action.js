import { USER_REDUCER_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => createAction(USER_REDUCER_TYPES.SET_CURRENT_USER, user);
