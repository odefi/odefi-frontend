import React, { Fragment } from 'react';
import PreSale from './controllers/PreSale'
import Trade from './controllers/Trade'
import Market from './controllers/Market'
import Provide from './controllers/Provide'
import Stake from './controllers/Stake'
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/scss/bootstrap.scss'
import './assets/scss/style.scss';

const routes = [
    {
        path: '/:ref?',
        exact: true,
        main: ({ location, match }) => <PreSale match={match} />
    },
    {
        path: '/presale/:ref?',
        exact: false,
        main: ({ location, match }) => <PreSale match={match} />
    },
    {
        path: '/trade',
        exact: false,
        main: ({ location, match }) => <Trade match={match} />
    },
    {
        path: '/market',
        exact: false,
        main: ({ location, match }) => <Market match={match} />
    },
    {
        path: '/provide',
        exact: false,
        main: ({ location, match }) => <Provide match={match} />
    },
    {
        path: '/stake',
        exact: false,
        main: ({ location, match }) => <Stake match={match} />
    },
];

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Router>
                    {routes.map((route, index) => {
                        return <Route key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main} />
                    })}
                </Router>
            </Fragment>
        )
    }
}


export default App
