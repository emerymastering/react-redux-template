import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneSpace } from "../store/space/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectSpaces } from "../store/space/selectors";

export default function Spaces() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOneSpace(id));
  }, [dispatch, id]);

  const space = useSelector(selectSpaces);
  console.log("selector spaces", space);

  return (
    <>
      {space ? (
        <div>
          <div
            className="space"
            style={{ backgroundColor: `${space.backgroundColor}` }}
          >
            <h2 style={{ color: `${space.color}` }}>{space.title}</h2>
            <p style={{ color: `${space.color}` }}>{space.description}</p>
          </div>
          <div>
            {space.stories &&
              space.stories.map((story) => (
                <div key={story.id}>
                  <h2>{story.name} </h2>
                  <p>{story.content}</p>
                  <img src={story.imageUrl} height="100px"></img>
                </div>
              ))}
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}
