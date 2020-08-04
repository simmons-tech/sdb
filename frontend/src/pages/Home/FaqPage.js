import React, { Component } from "react";
import BasePage from '../BasePage';

function Question(props) {
    return (
        <div>
            <b>{props.title}</b><br/>
            {props.children}<br/>
        </div>

    );
}

class FaqPage extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false}
    }

    render() {
        return (
                <BasePage loading={this.state.loading} header="FAQ" {... this.props}>
                    <Question title="Hey! There are a lot of things that are missing from this version of the DB!">
                        Hey! There are a lot of things that are missing from this version of the DB!
                    Unfortunately, due to the circumstances of this semester, life at Simmons will be a little different
                    from what some of you may be used to. In order to get the new DB up and running in time for the
                    fall, we had to cut out some of the functionality of the old DB. But don't worry! Everything that
                    you used to know and love will be up and ready by the time that life returns back to normal. In the
                    meantime, everything that will be necessary for the fall is accessible in this new-and-improved
                    design.
                    </Question>

                    <Question title="Where did everything go?">
                        The new DB splits Simmons-related info and links into a few different views. The view you are in
                        right now, the home view, allows you to access various parts of your profile, check your packages,
                        adjust your guest list, and more. If you click on the Home button in the top left, the sidebar will
                        adjust to show you several other views, such as links to the Simmons House Gov and the directory.
                    </Question>

                </BasePage>
            )
    }
}

export default FaqPage;