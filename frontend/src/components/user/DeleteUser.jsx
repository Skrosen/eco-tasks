import { Button } from "../reusable-components/Buttons";
import { API_URL } from "../../utils/urls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../../reducers/user";
import { ui } from "../../reducers/ui";

const DeleteUser = (props) => {
  let deletedTasks = false;
  const { setMode } = props;
  const signedInUser = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUserProfile = async () => {
    dispatch(ui.actions.setLoading(false));
    const options = {
      method: "DELETE",
      headers: {
        Authorization: signedInUser.accessToken,
      },
    };
    await fetch(
      API_URL(`tasks/${signedInUser.userId}/checked-tasks`),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          deletedTasks = true;
        }
        dispatch(ui.actions.setLoading(false));
      });

    if (deletedTasks) {
      await fetch(API_URL(`user/${signedInUser.userId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(user.actions.setInitialState());
            navigate("/login");
          }
        });
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete account?</p>
      <Button
        type="button"
        text={"Yes, delete my account"}
        onClick={deleteUserProfile}
      />
      <Button
        type="button"
        text={"No, keep account"}
        onClick={() => {
          setMode("form");
        }}
      />
    </div>
  );
};

export default DeleteUser;
