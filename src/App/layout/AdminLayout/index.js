import React, { Component, Suspense } from "react";
// import { Switch, Redirect, Route } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../Loader";
import routes from "../../../routes/app";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import "./app.scss";

class AdminLayout extends Component {
  state = {
    componentReady: false,
  };

  componentDidMount() {
    this.setState({
      componentReady: true,
    });
  }

  render() {
    // const { componentReady } = this.state;
    // const accessToken = localStorage.getItem("access_token");
    // if (componentReady && !accessToken) {
    //   return <Redirect to={{ pathname: "/login" }} />;
    // }

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
        {/* {accessToken && <Navigation />} */}
        <Navigation />
        <NavBar />
        <div className="pcoded-main-container">
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

export default connect(mapDispatchToProps)(AdminLayout);
