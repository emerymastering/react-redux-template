import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  selectUser,
  selectToken,
  selectMySpace,
} from "../../store/user/selectors";
import { deleteStory } from "../../store/user/thunks";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Card from "react-bootstrap/Card";
import StoryForm from "./StoryForm";
import MySpaceForm from "./MySpaceForm";

export function MySpace() {
  const space = useSelector(selectMySpace);
  const profile = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [postStoryMode, setpostStoryMode] = useState(false);

  if (token === null) {
    navigate("/");
  }

  if (space === null) {
    return <Loading />;
  }
  const displayButtons = profile?.id === space.userId;

  console.log("myspace", space);
  console.log("myprofile", profile);
  console.log("token", token);

  return (
    <div>
      <h2>Hello {profile.name}!</h2>
      <div>
        <button onClick={() => setEditMode(!editMode)}>
          Edit your profile
        </button>

        {editMode && (
          <Card>
            <MySpaceForm closer={setEditMode} />
          </Card>
        )}

        <button onClick={() => setpostStoryMode(!postStoryMode)}>
          Post a cool story bro
        </button>

        {postStoryMode && (
          <Card>
            {/* <button onClick={() => setpostStoryMode(!postStoryMode)}>
              close
            </button> */}
            <StoryForm closer={setpostStoryMode} />
          </Card>
        )}
        {space.stories &&
          space.stories.map((story) => (
            <div key={story.id}>
              <h2>{story.name} </h2>
              <p>{story.content}</p>
              <img src={story.imageUrl} height="100px" alt="story"></img>
              <button onClick={() => dispatch(deleteStory(story.id))}>
                Delete Story
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
