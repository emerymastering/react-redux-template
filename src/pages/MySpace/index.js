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
import Button from "react-bootstrap/Button";
import Carousel from "better-react-carousel";

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
  // const displayButtons = profile?.id === space.userId;

  console.log("myspace", space);
  console.log("myprofile", profile);
  console.log("token", token);

  return (
    <div>
      <h2>Hello {profile.name}!</h2>
      <div>
        <Button onClick={() => setEditMode(!editMode)}>
          Edit your profile
        </Button>{" "}
        {editMode && (
          <Card>
            <MySpaceForm closer={setEditMode} />
          </Card>
        )}
        <Button onClick={() => setpostStoryMode(!postStoryMode)}>
          Post a cool story bro
        </Button>
        {postStoryMode && (
          <Card>
            {/* <Button onClick={() => setpostStoryMode(!postStoryMode)}>
              close
            </Button> */}
            <StoryForm closer={setpostStoryMode} />
          </Card>
        )}
        <div style={{ maxWidth: 300 }}>
          <Carousel cols={1} rows={1} gap={1} showDots loop>
            {space.stories &&
              space.stories.map((story) => (
                <Carousel.Item key={story.id}>
                  <div>
                    <h2>{story.name} </h2>
                    <p>{story.content}</p>
                    <img src={story.imageUrl} height="100px" alt="story"></img>
                    <Button onClick={() => dispatch(deleteStory(story.id))}>
                      Delete Story
                    </Button>
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
