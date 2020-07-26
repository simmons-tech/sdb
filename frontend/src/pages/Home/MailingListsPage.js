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
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/aprils-test-list"><strong>Aprils-test-list</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/athletics"><strong>athletics</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/cheese-please"><strong>Cheese-please</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <td><a href="https://simmons.mit.edu/mailman/listinfo/cheese-please"><strong>Cheese-please</strong></a></td>
                    <td><em>[no description available]</em></td>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/cheese-please"><strong>Cheese-please</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/gra4w"><strong>Gra4w</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/grt-comments"><strong>grt-comments</strong></a></td>
                        <td>This is the list where people send their comments for GRT interview feedback!</td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-7bang"><strong>Lounge-7bang</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-adventuretime"><strong>Lounge-adventuretime</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-bellacrisis"><strong>Lounge-bellacrisis</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-bgaphl"><strong>Lounge-bgaphl</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-bikepack"><strong>Lounge-bikepack</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-breadbox"><strong>Lounge-breadbox</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-cakke"><strong>Lounge-cakke</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-deltachai"><strong>Lounge-deltachai</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-flush"><strong>Lounge-flush</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-gargolapatrol7c"><strong>Lounge-gargolapatrol7c</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-glutencult"><strong>Lounge-glutencult</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-icy"><strong>Lounge-icy</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-mindcraft"><strong>Lounge-mindcraft</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-modakfellows"><strong>Lounge-modakfellows</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-mt"><strong>Lounge-mt</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-ochochi"><strong>Lounge-ochochi</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-peppers"><strong>Lounge-peppers</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-poc"><strong>Lounge-poc</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-redacted"><strong>Lounge-redacted</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-secretham"><strong>Lounge-secretham</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-soccoc"><strong>Lounge-soccoc</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-tacocat"><strong>Lounge-tacocat</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-tbd"><strong>Lounge-tbd</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-test"><strong>Lounge-test</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-thibbbbbb"><strong>Lounge-thibbbbbb</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/lounge-thicccc"><strong>Lounge-thicccc</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/mailman"><strong>Mailman</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/raccooncello"><strong>Raccooncello</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/simjapanese"><strong>simjapanese</strong></a></td>
                        <td>A list to help everyone studying Japanese in Simmons or anyone who just wants to shoot the breeze in Japanese.</td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/storage"><strong>Storage</strong></a></td>
                        <td>keepers of the storage room</td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/terrace-approve"><strong>Terrace-approve</strong></a></td>
                        <td>people who can approve terrace events.</td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/terrace-info"><strong>Terrace-info</strong></a></td>
                        <td>People interested in 8th floor terrace events</td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/test-with-capitals"><strong>Test-with-capitals</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    <tr>
                        <td><a href="https://simmons.mit.edu/mailman/listinfo/whitneys-favorite-frosh"><strong>Whitneys-favorite-frosh</strong></a></td>
                        <td><em>[no description available]</em></td>
                    </tr>
                    </tbody>
                </Table>
            </BasePage>
        )
    }
}

export default MailingListsPage;