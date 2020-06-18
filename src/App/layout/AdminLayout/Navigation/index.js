import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import windowSize from "react-window-size";
import NavLogo from "./NavLogo";
import NavContent from "./NavContent";
import OutsideClick from "./OutsideClick";
import Aux from "./../../../../hoc/_Aux";
import * as actionTypes from "./../../../../store/actions";
import navigation from "../../../../menu-items";

class Navigation extends Component {
  render() {
    let navClass = ["pcoded-navbar"];
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      navClass = [...navClass, "mob-open"];
    } else if (this.props.collapseMenu) {
      navClass = [...navClass, "navbar-collapsed"];
    }

    let navContent = (
      <div className="navbar-wrapper">
        <NavLogo
          collapseMenu={this.props.collapseMenu}
          windowWidth={this.props.windowWidth}
          onToggleNavigation={this.props.onToggleNavigation}
        />
        <NavContent navigation={navigation.items} />
      </div>
    );
    if (this.props.windowWidth < 992) {
      navContent = (
        <OutsideClick>
          <div className="navbar-wrapper">
            <NavLogo
              collapseMenu={this.props.collapseMenu}
              windowWidth={this.props.windowWidth}
              onToggleNavigation={this.props.onToggleNavigation}
            />
            <NavContent navigation={navigation.items} />
          </div>
        </OutsideClick>
      );
    }

    return (
      <Aux>
        <nav className={navClass.join(" ")}>{navContent}</nav>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapseMenu: state.collapseMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(windowSize(Navigation))
);
