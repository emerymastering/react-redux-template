import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectToken,
  selectMySpace,
} from "../store/user/selectors";
import { deleteStory } from "../store/user/thunks";

export function MySpace() {
  const space = useSelector(selectMySpace);
  const profile = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  console.log("myspace", space);
  console.log("myprofile", profile);
  console.log("token", token);

  return (
    <div>
      <h2>Hello {profile.name}!</h2>
      <div>
        {space.stories &&
          space.stories.map((story) => (
            <div key={story.id}>
              <h2>{story.name} </h2>
              <p>{story.content}</p>
              <img src={story.imageUrl} height="100px"></img>
              <button onClick={() => dispatch(deleteStory(story.id))}>
                Delete Story
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
