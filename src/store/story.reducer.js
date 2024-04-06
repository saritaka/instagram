import { storyService } from "../services/story.service.local";

export const SET_STORIES = "SET_STORIES";

const initialState = {
  stories: null,
};

export function storyReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_STORIES:
      //   console.log("in story reducer, the stories are: ", cmd.stories);
      return {
        ...state,
        stories: cmd.stories,
      };

    default:
      console.log("default story reducer");
      return state;
  }
}
