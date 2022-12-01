import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";


const Navigation = (props) => {
  const [signedIn, setsignedIn] = useState(true);

  const { appState, logout } = useAppContext();

  const logOutFunction = () => {
    logout();
  };

  useEffect(() => {
    if (!appState || !appState.user) {
      setsignedIn(false);
    }
  }, [appState]);

  return (
    <>
      <Navbar  bg="dark" variant="dark" className="justify-content-center" style={{alignText:'center', boxShadow:'0 0 20px'}}>
        <Nav id="navBar" >
          
          <Nav.Item style={{padding:'5px', margin:'5px', }}>
            <Nav.Link
              href="/profile"
              onClick={() => props.setCurrSection("profile")}
              id={props.currSection === "profile" ? "selectedPage" : "nav-link"}
              className='nopadding'
              
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{padding:'5px', margin:'5px', }}>
            <Nav.Link
              onClick={() => props.setCurrSection("home")}
              id={props.currSection === "home" ? "selectedPage" : "nav-link"}
              href="/"
              className='nopadding'
            >
              <img
              
              src="logo-no-background.png"
              alt="company logo"
              width="150px"
              
            />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{padding:'5px', margin:'5px', }}>
            {!signedIn && (
              <Nav.Link
                href="/login"
                onClick={() => props.setCurrSection("login")}
                id={props.currSection === "login" ? "selectedPage" : "nav-link"}
                className='nopadding'
              >
                Login
              </Nav.Link>
            )}

            {signedIn && <Nav.Link  className='nopadding' onClick={logOutFunction}>Logout</Nav.Link>}
          </Nav.Item>
        </Nav>
      </Navbar>
      
    </>
  );
};

export default Navigation;
