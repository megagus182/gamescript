import axios from "axios";
import { updateNotifications } from "../reducers/user";
import { store } from "../store";
import config from "../../config";

const API = `${config.BACKEND_URL}/`;

export const deleteFromNotifications = (notiId) => {
  const { id, notifications } = store.getState().user;
  return async function (dispatch) {
    const newNotifications = notifications.filter((el) => el.id !== notiId);
    try {
      await axios.put(API + `user/${id}`, {
        notifications: newNotifications,
      });
      dispatch(updateNotifications(newNotifications));
    } catch (error) {
      return;
    }
  };
};

export const clearNotifications = () => {
  return async function (dispatch) {
    const { id } = store.getState().user;
    try {
      await axios.put(API + `user/${id}`, {
        notifications: [],
      });
      dispatch(updateNotifications([]));
    } catch (error) {
      return;
    }
  };
};