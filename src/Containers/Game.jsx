import React from "react";
import { Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./Home/Home";
import Level1 from "./Level1/Level1";
import Level2 from "./Level2/Level2";
import Level3 from "./Level3/Level3";
import Level4 from "./Level4/Level4";
import Level5 from "./Level5/Level5";
import Level6 from "./Level6/Level6";
import SignIn from "./Auth/Signin";
import SignUp from "./Auth/Signup";
import CreateLevel from "./CreateLevel/createLevel";
import CustomLevel from "./CreateLevel/CustomLevel/customLevel";
import { connect } from "react-redux";
import { signOut } from "../Store/actions/authActions";
import Tutorial from "./Tutorial/tutorial";

const game = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <Nav.Link href="/" onClick={props.signOut}>
      Log Out
    </Nav.Link>
  ) : (
    <>
      <Nav.Link href="/Signin">Sign In</Nav.Link>
      <Nav.Link href="/Signup">Sign Up</Nav.Link>
    </>
  );
  const creator = profile.ta ? (
    <Nav.Link href="/CreateLevel">Create Level</Nav.Link>
  ) : (
    <></>
  );

  const score = profile.score ? (profile.score) : (<a class="text-danger">User must be logged in for their score to be saved !</a>)

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Git Game</Navbar.Brand>

        <Navbar.Collapse>
          <Nav className="mr-auto navbar-right">
            <Nav className="mr-auto navbar-right">
              {links}
              {creator}
            </Nav>
            <Nav.Link href="/Tutorial">Tutorial</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text> Score: {score}</Navbar.Text>
      </Navbar>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/Level1" exact render={() => <Level1 />} />
      <Route path="/Level2" exact render={() => <Level2 />} />
      <Route path="/Level3" exact render={() => <Level3 />} />
      <Route path="/Level4" exact render={() => <Level4 />} />
      <Route path="/Level5" exact render={() => <Level5 />} />
      <Route path="/Level6" exact render={() => <Level6 />} />
      <Route path="/Signin" exact render={() => <SignIn />} />
      <Route path="/Signup" exact render={() => <SignUp />} />
      <Route path="/CreateLevel" exact render={() => <CreateLevel />} />
      <Route path="/Tutorial" exact render={() => <Tutorial />} />
      <Route
        path="/CreateLevel/CustomLevel"
        render={props => <CustomLevel {...props} />}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(game);
