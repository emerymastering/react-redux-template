import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneSpace } from "../store/space/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectSpaces } from "../store/space/selectors";
import Carousel from "better-react-carousel";

export function Space() {
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
          <div style={{ maxWidth: 600 }}>
            <Carousel cols={1} rows={1} gap={1} showDots loop>
              {space.stories &&
                space.stories.map((story) => (
                  <Carousel.Item key={story.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxHeight: 500,
                        alignContent: "spaceAround",
                      }}
                    >
                      <h2>{story.name} </h2>
                      <p>{story.content}</p>
                      <img
                        src={story.imageUrl}
                        height="300px"
                        // className="center"
                        alt=""
                      ></img>
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}
