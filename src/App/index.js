import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../routes/login";
import AdminLayout from "./layout/AdminLayout";
import { withRouter } from "react-router-dom";

const App = () => {
  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        component={route.component}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  return (
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            {menu}
            <Route path="/" component={AdminLayout} />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
};

export default withRouter(App);
