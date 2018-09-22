import React, { Component } from 'react';
import $ from "jquery";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-materialize';


export default class Remove extends Component {

    removeOrder() {
        let id = this.props.match.params.id;
        let order = $.ajax({
            url: "http://127.0.0.1:8000/api/remove/"+id,
            method: 'POST',
            async: false,
            type: 'json'
        }).responseJSON;
        return order.response == 1 ? 'Успешно удалено' : order.message;
    }


    render() {
        return <div>
            <div>
            {this.removeOrder()}
            </div>
            <NavLink to={'/'}> <Button>Вернуться на главную </Button></NavLink>

        </div>
    }
}