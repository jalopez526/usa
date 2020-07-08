import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import Avatar1 from "../../../../../assets/images/avatar.jpg";

class NavRight extends Component {
  state = {
    listOpen: false,
  };

  onClick() {
    document.location.href = "/login";
  }

  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <img
                  src={Avatar1}
                  width="50px"
                  className="img-radius"
                  alt="User Profile"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <span>Usuario</span>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="dud-logout"
                    title="Logout"
                    onClick={() => this.onClick()}
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <a
                      href={DEMO.BLANK_LINK}
                      className="dropdown-item"
                      onClick={() => this.onClick()}
                    >
                      <i className="feather icon-log-out" /> Cerrar sesión
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
    );
  }
}

export default NavRight;
