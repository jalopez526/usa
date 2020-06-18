import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import windowSize from "react-window-size";
import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import "./app.scss";

class AdminLayout extends Component {
  componentWillMount() {
    if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024) {
      this.props.onComponentWillMount();
    }
  }

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <Aux>
        <Navigation />
        <NavBar />
        <div
          className="pcoded-main-container"
          onClick={() => this.mobileOutClickHandler}
        >
          <div className="pcoded-wrapper">
            <div className="pcoded-content">
              <div className="pcoded-inner-content">
                <Breadcrumb />
                <div className="main-body">
                  <div className="page-wrapper">
                    <Suspense fallback={<Loader />}>
                      <Switch>{menu}</Switch>
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(mapDispatchToProps)(windowSize(AdminLayout));
