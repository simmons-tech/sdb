import React, { Component } from "react";
import {Button, Jumbotron, Input } from "reactstrap";
import InteractiveUserTable from "./InteractiveUserTable";
import { CustomInputForm } from '../../../components/CustomFormikInputs'

import axios from '../../../axiosInstance';


class UserPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {values: [], packages:[], pk: []}
    }


    componentDidMount() {
        this.getUserPackages();
    }

    getUserPackages = () =>{
        axios
          .post('/api/packages/user_packages/',{recipient:{username: this.props.user.username}})
          .then(res => {
              console.log(res)
            this.setState({
                pk: res.data.map(item => item.pk),
                values: res.data.map((item) => item.quantity - item.num_picked_up),
                packages: res.data.map((item,ind) => 
                    [
                        item.log_time,
                        item.location,
                        (item.perishable) ? "Yes" : "No",
                        item.quantity - item.num_picked_up,
                        <Input type="select" name={"num" + ind} onChange={event => this.handleDropDown(event, ind)}>
                            {[...Array(item.quantity - item.num_picked_up+1).keys()].reverse().map((num, index) => (
                                <option key={index} value={num}>{num}</option>
                            ))}
                        </Input>
                    ]
                )})
          })
    }

    handlePickUp = () => {
        // handles picking up the packages
        for(let i = 0; i < this.state.values.length; i++){
            axios.post("/api/packages/"+this.state.pk[i] +"/pickup/", {
                num_picked_up: parseInt(this.state.values[i])
            });
        }

        this.getUserPackages();
        this.props.back();
        
    }

    handleOnClick = () =>{
        // handle on click for table. Unused
    }

    handleDropDown = (event, index) =>{
        let temp = [...this.state.values];
        temp[index] = event.target.value;
        this.setState({values: temp});
    }

    render() {
        return (
            <Jumbotron>
                <h4>Packages for {this.props.user.display_name}</h4>
                <Button onClick = {this.props.back}>Back</Button>
                {(this.state.packages.length) ?
                    <div>
                        <InteractiveUserTable 
                            rows = {this.state.packages}
                            headers = {["Checked In", "Bin", "Perishable", "# of Packages", "Pick Up?"]}
                            handleOnClick = {this.handleOnClick}
                        />
                        <Button onClick = {this.handlePickUp}>Pick Up</Button>
                    </div>
                :
                    <h4>{this.props.user.display_name} does not have any packages</h4>
                }
                
            </Jumbotron>
        );
    }
}

export default UserPackage;