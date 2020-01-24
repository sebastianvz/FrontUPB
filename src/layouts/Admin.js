import React, { useState, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import axios from "axios";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";


import PageNotFound404 from '../views/Pages/ErrorPage';

import { GUEST, LOGGED } from '../config/constants';
import { useAuthenticated } from '../components/Auth';


// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "../components/core/Navbars/AdminNavbar.js";
import Sidebar from "../components/core/Sidebar/Sidebar.js";
import FixedPlugin from "../components/core/FixedPlugin/FixedPlugin.js";

import routes from "../config/routes";

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

import GlobalVariables from "../variables/globalVariables.js";

const variables = new GlobalVariables();
const baseUrl = variables.Url;

var ps;

const useStyles = makeStyles(styles);

const Routes = () => {
  const { isAuthenticated } = useAuthenticated();
  console.log('isAuthenticated', isAuthenticated);
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.index}
            exact={route.exact ? route.exact : false}
            path={route.path}
            render={
              props =>
                route.when === undefined ||
                  route.when === null ||
                  (isAuthenticated === false && route.when === GUEST) ||
                  (isAuthenticated === true && route.when === LOGGED) ? (
                    React.createElement(route.component, props, null)
                  ) : (
                    <Redirect to="/login" />
                  )
            }
          />
        ))}
        <Route component={PageNotFound404} />
      </Switch>
    </Suspense>
  );
};


const Dashboard = props => {
  const { ...rest } = props;
  // // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const [image, setImage] = useState(require("assets/img/sidebar-2.jpg"));
  const [color, setColor] = useState("red");
  const [bgColor, setBgColor] = useState("black");
  // // const [hasImage, setHasImage] = useState(true);
  const [fixedClasses, setFixedClasses] = useState("dropdown");
  const [logo, setLogo] = useState(require("assets/img/escudo-3.png"));
  // // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
  // // ref for main panel div
  const mainPanel = React.createRef();
  // // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  // useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  //   window.addEventListener("resize", resizeFunction);

  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener("resize", resizeFunction);
  //   };
  // });
  // // functions for changeing the states from components
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleBgColorClick = bgColor => {
    switch (bgColor) {
      case "white":
        setLogo(require("assets/img/logo.svg"));
        break;
      default:
        setLogo(require("assets/img/logo-white.svg"));
        break;
    }
    setBgColor(bgColor);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const getRoute = () => {
  //   return window.location.pathname !== "/admin/full-screen-maps";
  // };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  // let auth = localStorage.getItem("auth");

  // const URL = baseUrl + "Master/GetDocuments";
  // axios
  //   .get(URL, {
  //     headers: {
  //       Authorization: "Bearer " + auth
  //     }
  //   })
  //   .then(function (response) { })
  //   .catch(function (error) {
  //     props.history.replace("/auth");
  //   });

  // if (localStorage.getItem("auth") === null) {
  //   props.history.replace("/auth");
  // }

  // let userPermmision = localStorage.getItem("arrayPermmision");
  let userControllers = localStorage.getItem("arrayControllers");
  // let arrayUserPermmision = userPermmision.split(",");
  let arrayuserControllers = userControllers && userControllers.split(",");
  let clonedRoutes = userControllers && routes.filter(x => arrayuserControllers.includes(x.name));
  // let PermmisionRoutes = clonedRoutes.map(x => x.views.filter(y => arrayUserPermmision.includes(y.name)))

  // for (let i = 0; i < clonedRoutes.length; i++) {
  //   clonedRoutes[i].views = [...PermmisionRoutes[i]];
  // }

  // const getRoutes = routes => {
  //   return routes.map((prop, key) => {
  //     if (prop.collapse) {
  //       return getRoutes(prop.views);
  //     }
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  // const resizeFunction = () => {
  //   if (window.innerWidth >= 960) {
  //     setMobileOpen(false);
  //   }
  // };

  const { isAuthenticated } = useAuthenticated();

  return (
    <>
      {isAuthenticated ? (
        <div className={classes.wrapper}>
          <Sidebar
            routes={routes}
            logoText={"SisLab"}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            bgColor={bgColor}
            miniActive={miniActive}
            {...rest}
          />
          <div className={mainPanelClasses} ref={mainPanel}>
            <AdminNavbar
              sidebarMinimize={sidebarMinimize.bind(this)}
              miniActive={miniActive}
              brandText={getActiveRoute(routes)}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            <Routes />
            {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {/* {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>
                  <Switch>
                    {getRoutes(clonedRoutes)}
                    <Redirect from="/admin" to={`/admin/${arrayUserPermmision[0].toLowerCase()}`} />
                  </Switch>
                </div>
              </div>
            ) : (
                <div className={classes.map}>
                  <Switch>
                    {getRoutes(clonedRoutes)}
                    <Redirect from="/admin" to={`/admin/${arrayUserPermmision[0].toLowerCase()}`} />
                  </Switch>
                </div>
              )} */}
            <FixedPlugin
              handleImageClick={handleImageClick}
              handleColorClick={handleColorClick}
              handleBgColorClick={handleBgColorClick}
              color={color}
              bgColor={bgColor}
              bgImage={image}
              handleFixedClick={handleFixedClick}
              fixedClasses={fixedClasses}
              sidebarMinimize={sidebarMinimize.bind(this)}
              miniActive={miniActive}
            />
          </div>
        </div>
      ) : <Routes />}
    </>
  );
}

Dashboard.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Dashboard);
