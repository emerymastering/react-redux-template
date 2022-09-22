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
    <div className="space">
      <h2>{space.title}</h2>
      <p>{space.description}</p>
    </div>
  );
}
