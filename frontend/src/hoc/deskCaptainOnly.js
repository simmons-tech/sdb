import React from "react";
import withAuthentication from "./withAuthentication";
import * as ROUTES from '../constants/routes';

export default function deskCaptainOnly(PageComponent) {

    return withAuthentication(class extends React.Component {

        componentDidMount() {
            if (!this.props.isDeskCaptain) {
                // TODO: make a "authentication error" page to go to
                this.props.history.push(ROUTES.ABOUT);
            }
        };

        componentDidUpdate(nextProps) {
            if (!this.props.isDeskCaptain) {
                this.props.history.push(ROUTES.ABOUT);
            }
        };

        render() {
            return <PageComponent {...this.props} />;
        }
    })
}