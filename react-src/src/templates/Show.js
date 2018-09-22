import React, { Component } from 'react';
import $ from "jquery";
import { Button, Collection, CollectionItem } from "react-materialize";
import { NavLink } from "react-router-dom";


export default class Show extends Component {

    renderOrder() {
        let id = this.props.match.params.id;
        let data = $.ajax({
            url: 'http://127.0.0.1:8000/api/show/'+ id,
            method: 'POST',
            async: false,
            type: 'json'
        }).responseJSON;

        return Object.entries(data.order).map(el =>
            <CollectionItem>{el[0]} : {el[1]}</CollectionItem>
        )
    }


    render() {
        return <div>
            <Collection>
                {this.renderOrder()}
            </Collection>

            <NavLink to={'/'}> <Button>Вернуться на главную </Button></NavLink>
        </div>
    }
}