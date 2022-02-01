import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  Link,
  useInRouterContext,
} from "react-router-dom";
import { bool } from "prop-types";

import { Button } from "../reusable-components/Buttons";

import user from "../../reducers/user";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: green;
  transform: ${({ open }) =>
    open ? "translateX(0)" : "translateX(-100%)"};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: black;
    }
  }
`;

const HamburgerContent = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  console.log(user.username);

  const Logout = () => {
    dispatch(user.actions.setInitialState());
    navigate("/login");
  };

  return (
    <>
      <StyledMenu open={open}>
        {!user.username && (
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <span role="img" aria-label="about us">
              &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
            </span>
            Login
          </Link>
        )}

        {user.username && (
          <>
            <Link
              to={{
                pathname: `/userprofile`,
              }}
            >
              <span role="img" aria-label="about us">
                &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
              </span>
              Profile
            </Link>
            <Link
              to={{
                pathname: "/tasks",
              }}
            >
              <span role="img" aria-label="about us">
                &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
              </span>
              Tasks
            </Link>{" "}
            <Link
              to={{
                pathname: "/eco-facts",
              }}
            >
              <span role="img" aria-label="about us">
                &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
              </span>
              Ecofacts
            </Link>
            <Button text="Logout" onClick={Logout} />
          </>
        )}
      </StyledMenu>
    </>
  );
};
HamburgerContent.propTypes = {
  open: bool.isRequired,
};
export default HamburgerContent;
