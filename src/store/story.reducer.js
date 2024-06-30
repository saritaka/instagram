export const SET_STORIES = "SET_STORIES";
export const UPDATE_STORY = "UPDATE_STORY";
export const ADD_STORY = "ADD_STORY";
export const REMOVE_STORY = "REMOVE_STORY";

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
    case UPDATE_STORY:
      return {
        ...state,
        stories: state.stories.map((story) =>
          story._id === cmd.story._id ? cmd.story : story
        ),
      };

    case ADD_STORY:
      return {
        ...state,
        stories: [...state.stories, cmd.story],
      };

    case REMOVE_STORY:
      return {
        ...state,
        lastStories: [...state.stories],
        stories: state.stories.filter((story) => story._id !== cmd.storyId),
      };

    default:
      // console.log("default story reducer");
      console.log("State:", initialState);
      return state;
  }
}
