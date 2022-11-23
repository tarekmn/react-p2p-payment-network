import Nav from "react-bootstrap/Nav";
import { useEffect } from "react";

const Navigation = (props) => {
  return (
    <>
      <Nav id="navBar" className="justify-content-end">
        <Nav.Item>
          <Nav.Link
            onClick={() => props.setCurrSection("home")}
            id={props.currSection === "home" ? "selectedPage" : "nav-link"}
            href="/"
          >
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/profile"
            onClick={() => props.setCurrSection("profile")}
            id={props.currSection === "profile" ? "selectedPage" : "nav-link"}
          >
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/login"
            onClick={() => props.setCurrSection("login")}
            id={props.currSection === "login" ? "selectedPage" : "nav-link"}
          >
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Navigation;
