import { Title } from "../styled";
import { Link } from "react-router-dom";
import { LinkWord } from "../styled";
import styled from "styled-components";
import { useEffect } from "react";
import { selectSpaces } from "../store/space/selectors";
import { fetchSpaces } from "../store/space/thunks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function Homepage() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpaces);
  const navigate = useNavigate();

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
              : spaces.map((space) => (
                  <div
                    key={space.id}
                    style={{ backgroundColor: `${space.backgroundColor}` }}
                  >
                    <h2 style={{ color: `${space.color}` }}>{space.title}</h2>
                    <p style={{ color: `${space.color}` }}>
                      {space.description}
                    </p>
                    <Link to={`/spaces/${space.id}`}>
                      <button>Visit Space</button>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
`;
