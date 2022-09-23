import styled from "styled-components";
import { useEffect } from "react";
import { selectSpaces } from "../store/space/selectors";
import { fetchSpaces } from "../store/space/thunks";
import { useDispatch, useSelector } from "react-redux";
import Space from "../components/Space";

export function Homepage() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpaces);

  //   console.log("selector spaces", space);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);

  return (
    <Container>
      <div className="title">
        <h2>List of Spaces</h2>
        <div className="space">
          <div>
            {!spaces.length
              ? "Loading"
              : spaces.map((space) => {
                  return (
                    <Space
                      key={space.id}
                      id={space.id}
                      title={space.title}
                      description={space.description}
                      backgroundColor={space.backgroundColor}
                      color={space.color}
                      showLink={true}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
`;
