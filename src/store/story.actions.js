import { storyService } from "../services/story.service.local";
import { SET_STORIES } from "./story.reducer";
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { store } from "./store";

export async function loadStories() {
  store.dispatch({ type: LOADING_START });
  try {
    const stories = await storyService.query();
    store.dispatch({ type: SET_STORIES, stories });
  } catch (err) {
    console.log("Had issues loading stories", err);
    throw err;
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}
