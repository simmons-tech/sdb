import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Nav, NavItem, NavLink, Row, Col, Button, Label, FormGroup} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { CustomInputForm } from '../../components/CustomFormikInputs'
import classnames from 'classnames';
import axios from "../../axiosInstance";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";

class DeskCheckout extends Component {
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
            pk:false,
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
                console.log(res)
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

    handleItemSelection = (item) => {
        if(item[2] <= 0){
            this.setState({
                instruction: "There are no avaliable copies of this item to be checked out"
            })
            return;
        } else {
            let pk_index = this.state.page_items.findIndex(e => e === item);
            this.setState({
                item_selected: item[0],
                num_available: item[2],
                pk: this.state.page_pk[pk_index],
                instruction: "Checking out " + item[0]
            })
        }

    }

    onUserQuery = (values, callback) => {
        axios.get("/api/users/advanced_search/", {params: values}).then(res => {
            this.setState({
                loading: false,
                users: res.data.map(user =>
                    [
                        user.last_name,
                        user.first_name,
                        user.title,
                        user.username,
                        (user.room) ? user.room.number : null,
                        user.year
                    ]
                ),
                searched_user: true,
                selected_user: false,
            });
        });
        callback();
    }

    handleUserSelect = (row) => {
        // checks out item to user
        this.setState({
            display_name: row[1] + " " + row[0],
            username: row[3],
            selected_user: true,
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

    handleCheckOut = (value) => {
        if(value.quantity < 1){
            this.handleBackCheckout();
            return;
        }

        axios
            .post('/api/deskitems/'+ this.state.pk + '/checkout/',{
                desk_worker: {username:this.props.user.username},
                resident:{username: this.state.username},
                hours_loaned: value.hours,
                num_checked_out: value.quantity
            })
            .then(res => {
                // resets state
                this.setState({
                    loading: false, 
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
                })
            })
    }


    render() {
        return (
            <BasePage loading={this.state.loading} header="Item Checkout">
                <Jumbotron>
                    <h4> {this.state.instruction}</h4>
                    {(this.state.item_selected) ?
                        <Row>
                            <Col>
                                <Button onClick = {this.handleBackItem}>Back</Button>
                                <UserSearch noWrapper={true} onQuery={this.onUserQuery} {...this.props} />
                            </Col>
                            {(this.state.searched_user) ? 
                                <Col>
                                    {(this.state.selected_user) ? 
                                        <div>
                                            <h4>Checkout {this.state.item_selected} to {this.state.display_name} </h4>
                                            <Formik
                                                initialValues={{
                                                    quantity: 1,
                                                    hours: 24,
                                                }}
                                                onSubmit={(values, {resetForm}) => {
                                                    this.handleCheckOut(values);
                                                    resetForm({
                                                        quantity: 1,
                                                        hours: 24,
                                                    });
                                                }}
                                                >
                                                <Form className='p'>
                                                    <FormGroup row>
                                                        <Label for="quantity" sm={2}>Quantity</Label>
                                                        <Col>
                                                            <Field type="select" name="quantity" component={CustomInputForm}>
                                                            {[...Array(this.state.num_available + 1).keys()].slice(1).map(index => (
                                                                <option key = {index} value={index}>{index}</option>
                                                            ))}
                                                            </Field>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label for="hours" sm={2}>Hours (default 24)</Label>
                                                        <Col sm={10}>
                                                            <Field type="number" name="hours" component={CustomInputForm} />
                                                        </Col>
                                                    </FormGroup>
                                                    
                                                    
                                                    <Button type="submit">Confirm</Button>
                                                </Form>
                                            </Formik>
            
                                            
                                            <Button color="danger" onCLick={this.handleBackCheckout}>Back To Search</Button>
                                        </div>
                                    :
                                        <div>
                                            <h4>Select a User</h4>
                                            <InteractiveUserTable
                                                rows={this.state.users}
                                                headers={["Last", "First", "Title", "Username", "Room", "Year"]}
                                                handleOnClick = {this.handleUserSelect}
                                            />
                                        </div>   
                                    }
                                </Col>
                            :
                                <div></div>
                            }
                            
                            
                        </Row>
                        
                    :
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
                                    <InteractiveUserTable
                                        rows = {this.state.page_items}
                                        headers = {["Name", "Location","Avaliable", "Total Quantity"]}
                                        handleOnClick = {this.handleItemSelection}
                                    />
                                :
                                    <h4>There are no results for this type of item</h4>
                            :
                                <div></div>                        
                            }
                        </div>
                    }
                    
                </Jumbotron>
            </BasePage>
        );
    }
}

export default DeskCheckout;