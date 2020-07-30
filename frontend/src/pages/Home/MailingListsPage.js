import React, { Component } from "react";
import { Table } from 'reactstrap';
import BasePage from '../BasePage';

class MailingListsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false}
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Mailing Lists" {... this.props} >
                <Table striped>
                    <thead><tr><th>List</th>
                        <th>Description</th>
                        <th>Who&#39;s on the list</th>
                    </tr></thead>
                    <tbody><tr>
                        <td>sponge-talk@mit.edu</td>
                        <td>dorm spam</td>
                        <td>everyone</td>
                    </tr>
                    <tr>
                        <td>simmons-announce@mit.edu</td>
                        <td>moderated list for Simmons-wide announcements</td>
                        <td>everyone</td>
                    </tr>
                    <tr>
                        <td>simmons-events@mit.edu</td>
                        <td>moderated list for Simmons-wide events</td>
                        <td>everyone</td>
                    </tr>
                    <tr>
                        <td>simmons-official@mit.edu</td>
                        <td>moderated list for official Simmons announcements</td>
                        <td>everyone</td>
                    </tr>
                    <tr>
                        <td>sim-desk@mit.edu</td>
                        <td>contact Simmons desk</td>
                        <td>desk workers</td>
                    </tr>
                    <tr>
                        <td>simmons-athletics@mit.edu</td>
                        <td>contact the athletic chairs</td>
                        <td>athletic chairs</td>
                    </tr>
                    <tr>
                        <td>simmons-chair@mit.edu</td>
                        <td>contact the housing chair</td>
                        <td>housing chair</td>
                    </tr>
                    <tr>
                        <td>simmons-cpw-volunteers@mit.edu</td>
                        <td>cpw planning</td>
                        <td>frosh chairs, cpw volunteers</td>
                    </tr>
                    <tr>
                        <td>simmons-eelab-chair@mit.edu</td>
                        <td>contact the EE lab chair</td>
                        <td>EE lab chair</td>
                    </tr>
                    <tr>
                        <td>simmons-entertainment@mit.edu</td>
                        <td>contact the entertainment chair</td>
                        <td>entertainment chair</td>
                    </tr>
                    <tr>
                        <td>simmons-exec@mit.edu</td>
                        <td>contact Simmons exec officers</td>
                        <td>president, house chair, treasurer, secretary</td>
                    </tr>
                    <tr>
                        <td>simmons-facilities@mit.edu</td>
                        <td>contact facilities chair</td>
                        <td>facilities chair</td>
                    </tr>
                    <tr>
                        <td>simmons-frosh-chair@mit.edu</td>
                        <td>contact the frosh chairs</td>
                        <td>frosh chairs</td>
                    </tr>
                    <tr>
                        <td>simmons-gras@mit.edu</td>
                        <td>contact all GRAs</td>
                        <td>GRAs</td>
                    </tr>
                    <tr>
                        <td>simmons-house-manager@mit.edu</td>
                        <td>contact the house manager</td>
                        <td>house manager</td>
                    </tr>
                    <tr>
                        <td>simmons-houseteam@mit.edu</td>
                        <td>contact the house team</td>
                        <td>HoH, associate HoH, house manager, area director, GRAs</td>
                    </tr>
                    <tr>
                        <td>simmons-i3@mit.edu</td>
                        <td>for i3-related questions</td>
                        <td>publicity chair</td>
                    </tr>
                    <tr>
                        <td>simmons-library@mit.edu</td>
                        <td>contact the library chair</td>
                        <td>library chair</td>
                    </tr>
                    <tr>
                        <td>simmons-lounge-chair@mit.edu</td>
                        <td>contact the lounge chairs</td>
                        <td>lounge chairs</td>
                    </tr>
                    <tr>
                        <td>simmons-medlinks@mit.edu</td>
                        <td>contact Simmons Medlinks</td>
                        <td>Medlinks</td>
                    </tr>
                    <tr>
                        <td>simmons-publicity@mit.edu</td>
                        <td>contact the publicity chair</td>
                        <td>publicity chair</td>
                    </tr>
                    <tr>
                        <td>simmons-officers@mit.edu</td>
                        <td>contact all student officers</td>
                        <td>all student officers</td>
                    </tr>
                    <tr>
                        <td>simmons-president@mit.edu</td>
                        <td>contact the president</td>
                        <td>president </td>
                    </tr>
                    <tr>
                        <td>simmons-reservations@mit.edu</td>
                        <td>reserve a common room</td>
                        <td>reservations chair</td>
                    </tr>
                    <tr>
                        <td>simmons-rooming@mit.edu</td>
                        <td>contact the rooming chairs</td>
                        <td>rooming chairs</td>
                    </tr>
                    <tr>
                        <td>simmons-ror@mit.edu</td>
                        <td>RoR access list</td>
                        <td>people with RoR access</td>
                    </tr>
                    <tr>
                        <td>simmons-scholars@mit.edu</td>
                        <td>contact the residential scholars</td>
                        <td>residential scholars</td>
                    </tr>
                    <tr>
                        <td>simmons-secretary@mit.edu</td>
                        <td>contact the secretary</td>
                        <td>secretary</td>
                    </tr>
                    <tr>
                        <td>simmons-social@mit.edu</td>
                        <td>contact the social chairs</td>
                        <td>social chairs</td>
                    </tr>
                    <tr>
                        <td>simmons-tech@mit.edu</td>
                        <td>for tech questions, DB issues, etc</td>
                        <td>tech chairs</td>
                    </tr>
                    <tr>
                        <td>simmons-tours@mit.edu</td>
                        <td>Simmons tour guides</td>
                        <td>tour guides</td>
                    </tr>
                    <tr>
                        <td>simmons-treasurer@mit.edu</td>
                        <td>contact the treasurer</td>
                        <td>treasurer</td>
                    </tr>
                    <tr>
                        <td>simmons-workshop-chair@mit.edu</td>
                        <td>contact the woodshop chair</td>
                        <td>woodshop chair</td>
                    </tr>
                    <tr>
                        <td>help-its-too-heavy@mit.edu</td>
                        <td>for help moving furniture</td>
                        <td>Sims who volunteered to help :)</td>
                    </tr>
                    </tbody>
                </Table>
            </BasePage>
        )
    }
}

export default MailingListsPage;