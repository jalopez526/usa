import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import windowSize from "react-window-size";

import Aux from "../../../../../hoc/_Aux";
import NavGroup from "./NavGroup";
import * as actionTypes from "../../../../../store/actions";

class NavContent extends Component {
  state = {
    scrollWidth: 0,
    prevDisable: true,
    nextDisable: false,
  };

  scrollPrevHandler = () => {
    const wrapperWidth = document.getElementById("sidenav-wrapper").clientWidth;

    let scrollWidth = this.state.scrollWidth - wrapperWidth;
    if (scrollWidth < 0) {
      this.setState({ scrollWidth: 0, prevDisable: true, nextDisable: false });
    } else {
      this.setState({ scrollWidth: scrollWidth, prevDisable: false });
    }
  };

  scrollNextHandler = () => {
    const wrapperWidth = document.getElementById("sidenav-wrapper").clientWidth;
    const contentWidth = document.getElementById("sidenav-horizontal")
      .clientWidth;

    let scrollWidth = this.state.scrollWidth + (wrapperWidth - 80);
    if (scrollWidth > contentWidth - wrapperWidth) {
      scrollWidth = contentWidth - wrapperWidth + 80;
      this.setState({
        scrollWidth: scrollWidth,
        prevDisable: false,
        nextDisable: true,
      });
    } else {
      this.setState({ scrollWidth: scrollWidth, prevDisable: false });
    }
  };

  render() {
    const navItems = this.props.navigation.map((item) => {
      switch (item.type) {
        case "group":
          return <NavGroup key={item.id} group={item} />;
        default:
          return false;
      }
    });

    let mainContent = (
      <div className="navbar-content datta-scroll">
        <PerfectScrollbar>
          <ul className="nav pcoded-inner-navbar">{navItems}</ul>
        </PerfectScrollbar>
      </div>
    );

    return <Aux>{mainContent}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    collapseMenu: state.collapseMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNavContentLeave: () => dispatch({ type: actionTypes.NAV_CONTENT_LEAVE }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(windowSize(NavContent))
);
