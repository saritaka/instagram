import { storyService } from "../services/story.service.local";
import { SET_STORIES, UPDATE_STORY, ADD_STORY } from "./story.reducer";
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { store } from "./store";

export async function loadStories() {
  store.dispatch({ type: LOADING_START });
  try {
    const stories = await storyService.query();
    // const stories = utilService.loadFromStorage(STORAGE_KEY);
    store.dispatch({ type: SET_STORIES, stories });
  } catch (err) {
    console.log("Had issues loading stories", err);
    throw err;
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

export async function updateStory(story) {
  try {
    const type = story._id ? UPDATE_STORY : ADD_STORY;
    const savedStory = await storyService.save(story);
    store.dispatch({ type, story: savedStory });
  } catch (err) {
    console.log("Had issues saving stories", err);
    throw err;
  }
}
