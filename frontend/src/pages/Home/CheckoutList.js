import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Nav, NavItem, NavLink, Row, Col, Button, Label, FormGroup} from 'reactstrap';
import classnames from 'classnames';
import axios from "../../axiosInstance";
import StripedTable from "../../components/StripedTable";

class CheckoutList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true, 
            instruction: "",  
            page_load: false, 
            item_selected: false, 
            categories: [], 
            page_items: [],
            page_pk: [],
            pk: false,
            users: [], 
            searched_user: false,
            selected_user: false,
            display_name: "",
            username:"",
        };
    }

    async componentDidMount() {
        axios
            .get('/api/deskitems/categories/')
            .then(res => {
                this.setState({
                    loading: false,
                    instruction: "Select a category of item to checkout",
                    categories: [...res.data.categories]
                })
            })
    }

    handlePageChange = (page) => {
        // requests the backend each time to update the list information
        axios
            .post('/api/deskitems/items_in_category/',{
                category: page+1
            })
            .then(res => {
                this.setState({
                    loading: false,
                    page_load: page + "",
                    page_items: res.data.map(item => 
                        [
                            item.item,
                            item.location,
                            item.num_available,
                            item.quantity
                        ]
                    ),
                    page_pk: res.data.map(item => item.pk)
                })
            })
    }



    handleBackItem = () => {
        // used to return to this page after 
        this.setState({
            item_selected: false,
            searched_user: false,
            selected_user: false,
            num_available: false,
            pk: false,
            page_pk: [],
            users: [],
            username: "",
            display_name: "",
        });
    }


    handleBackCheckout = () => {
        // used to return to this page after 
        this.setState({
            selected_user: false,
            username: "",
            display_name: "",
        });
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Item Checkout">
                <Jumbotron>
                        <h3>Select a category of item to checkout</h3>
                        <div>
                            <Nav tabs>
                                {this.state.categories.map((name,index) => (
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.page_load === index+'' })}
                                            onClick={() => this.handlePageChange(index)}
                                        >
                                            {name}
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>

                            {(this.state.page_load) ? 
                                (this.state.page_items.length) ? 
                                    <StripedTable
                                        rows = {this.state.page_items}
                                        headers = {["Name", "Location","Avaliable", "Total Quantity"]}
                                    />
                                :
                                    <h4>There are no results for this type of item</h4>
                            :
                                <div></div>                        
                            }
                        </div>
                </Jumbotron>
            </BasePage>
        );
    }
}

export default CheckoutList;