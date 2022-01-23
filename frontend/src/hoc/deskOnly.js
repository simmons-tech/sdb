import React from "react";
import withAuthentication from "./withAuthentication";
import * as ROUTES from '../constants/routes';

export default function deskOnly(PageComponent) {

    return withAuthentication(class extends React.Component {

        componentDidMount() {
            if (!this.props.isDeskWorker) {
                // TODO: make a "authentication error" page to go to
                this.props.history.push(ROUTES.ABOUT);
            }
        };

        componentDidUpdate(nextProps) {
            if (!this.props.isDeskWorker) {
                this.props.history.push(ROUTES.ABOUT);
            }
        };

        render() {
            return <PageComponent {...this.props} />;
        }
    })
}