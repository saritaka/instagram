import { httpService } from "./http.service";
import { utilService } from "./util.service";

const STORAGE_KEY = "story";

export const storyService = {
  query,
  getById,
  save,
  remove,
};

window.cs = storyService;

async function query() {
  return httpService.get(STORAGE_KEY);
}

function getById(storyId) {
  return httpService.get(`story/${storyId}`);
}

async function remove(storyId) {
  return httpService.delete(`story/${storyId}`);
}

async function save(story) {
  var savedStory;
  if (story._id) {
    savedStory = await httpService.put(`story/${story._id}`, story);
  } else {
    savedStory = await httpService.post("story", story);
  }
  return savedStory;
}
