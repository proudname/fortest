import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Icon } from 'react-materialize';

export default class  Header extends Component {

    render() {
        return <div><Navbar right>

            <NavLink to='/'><Icon>list</Icon></NavLink>
            <NavLink to='/add'><Icon>add</Icon></NavLink>
            </Navbar>
                </div>
    }

}