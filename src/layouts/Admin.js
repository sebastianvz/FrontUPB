import React, { useState, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
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
import { useMenu } from '../components/Layout';



const getComponent = (x) => {
  return (routes.find(e => e.path === x.path) || { component: '' }).component;
};


const variables = new GlobalVariables();

const useStyles = makeStyles(styles);

var ps;

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
  const [menus, setMenus] = useState([]);
  const _menus = useMenu();

  // // ref for main panel div
  const mainPanel = React.createRef();

  useEffect(() => {
    console.log('_menus', _menus);
    _menus && _menus.filter(e => e.collapse).forEach(e => {
      e.views.forEach(x => {
        x.component = getComponent(x)
      });
    });
    setMenus(_menus);
  }, [_menus]);

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

    React.useEffect(() => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = mainPanel.current && new PerfectScrollbar(mainPanel.current, {
          suppressScrollX: true,
          suppressScrollY: false
        });
        document.body.style.overflow = "hidden";
      }
      window.addEventListener("resize", resizeFunction);
    
      // Specify how to clean up after this effect:
      return function cleanup() {
        if (navigator.platform.indexOf("Win") > -1) {
          ps && ps.destroy();
        }
        window.removeEventListener("resize", resizeFunction);
      };
    });

    const resizeFunction = () => {
      if (window.innerWidth >= 960) {
        setMobileOpen(false);
      }
    };

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

  const getActiveRoute = routes => {
    let activeRoute = "Bienvenido al sistema de gestión del laboratorio de simulación";
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


  let userControllers = localStorage.getItem("arrayControllers");
  // let arrayUserPermmision = userPermmision.split(",");
  let arrayuserControllers = userControllers && userControllers.split(",");
  let clonedRoutes = userControllers && routes.filter(x => arrayuserControllers.includes(x.name));

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };

 // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
 
  const { isAuthenticated } = useAuthenticated(); 

  return (
    <>
      {isAuthenticated ? (
        <div className={classes.wrapper}>
          <Sidebar
            routes={menus}
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
            <div className={classes.content}>
              <div className={classes.container}>
                <Routes />
              </div>
            </div>
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
