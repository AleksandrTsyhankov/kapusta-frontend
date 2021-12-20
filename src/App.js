import { Suspense } from "react";
import { Switch } from "react-router-dom";
import "./App.module.css";
import HomeViews from "./views/HomeViews/HomeViews";
import Container from "./Сomponents/Container/Container";
import Header from "./Сomponents/Header/Header";
import Login from "./Сomponents/Login/Login";
import PrivateRoute from "./Сomponents/PrivatRoute/PrivatRoute";
import PublicRoute from "./Сomponents/PublicRoute/PublicRoute";
import Registration from "./Сomponents/Registration/Registration.js";

import InputPanel from "./Сomponents/InputPanel/InputPanel";

function App() {
  return (
    <div>
      <Container>
        <Suspense fallback={<h1>LOADING...</h1>}>
          <Header />

          <InputPanel />
          <Switch>
            {/* <PublicRoute component={WellcomePage} exact path="/" /> */}
            {/* <PublicRoute
              component={Login}
              exact
              path="/"
              restricted
              redirectTo="/homeview"
            />
            <PublicRoute
              component={Registration}
              exact
              path="/registration"
              restricted
              redirectTo="/login"
            />
            <PrivateRoute
              component={HomeViews}
              exact
              path="/homeview"
              redirectTo="/"
            /> */}

            {/* <Route>
              <NotFoundView />
            </Route> */}
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
