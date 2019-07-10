
// src/app/pages/Index.js
import React, { Component } from 'react';
import {  Navs } from './index';

import { Jumbotron } from 'react-bootstrap';
import 'firebase/database';

import Cards from 'react-credit-cards';
import './scss/card.scss';


class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: {
                number: {
                    value: ""
                },
                name: {
                    value: ""
                },
                expiry: {
                    value: ""
                },
                cvc: {
                    value: ""
                },
            },
            focused: ""
        };
        this.onNumberChange = this.onNumberChange.bind(this);
        this.OnChange = this.OnChange.bind(this);
    }
    OnChange(e) {
        let val = new String(e.currentTarget.value);
        
        switch (val.length) {
            case 4:
                val = val + "-";
                break;
            case 9:
                val = val + "-";
                break;
            case 14:
                val = val + "-";
                break;
            default:

        }
        this.setState({
            input: {
                ...this.state.input,
                number: {
                    value: val
                }
            }
        })
    }
    onNumberChange(e) {
        if (e.keyCode == 46 || e.keyCode == 8)
            return true;
        let val = new String(e.currentTarget.value);
        if (val.length > 19)
            return false;
      
        return true;
    }
    render() {
        let { input, focused } = this.state;

        return (<div>
            <Navs></Navs>
            <Jumbotron style={{ height:91+"vh",marginBottom:0}}>

                <Cards
                    number={input.number.value}
                    name={input.name.value}
                    expiry={input.expiry.value}
                    cvc={input.cvc.value}
                    focused={focused}
                />
                <form>
                    <div className="form-group">
                        <input type="tel" name="number" className="form-control" placeholder="Card Number" pattern="[\d| ]{16,22}" required="" value={input.number.value} onKeyUp={(e) => this.onNumberChange(e)}
                            onChange={(e) => this.OnChange(e)} />
                        <small>E.g.: 49..., 51..., 36..., 37...</small></div><div className="form-group"><input type="text" name="name" className="form-control" placeholder="Name" required="" /></div><div className="row"><div className="col-6"><input type="tel" name="expiry" className="form-control" placeholder="Valid Thru" pattern="\d\d/\d\d" required="" /></div><div className="col-6"><input type="tel" name="cvc" className="form-control" placeholder="CVC" pattern="\d{3,4}" required="" /></div></div><input type="hidden" name="issuer" value="" /><div className="form-actions"><button className="btn btn-primary btn-block">PAY</button></div></form>
                            </Jumbotron>    


            </div>)
    }
}

export default index;