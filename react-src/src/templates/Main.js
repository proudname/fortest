import React, {Component} from 'react';
import $ from "jquery";
import {NavLink} from "react-router-dom";
import {Icon} from "react-materialize";


export default class Main extends Component {


    constructor(props) {
        super(props);
        let data = this.getData();
        this.state = {
            data: data
        }
    }

    //Получаем данные по апи. В этом шаблоне и в других всё практически индентично
    getData() {
        return $.ajax({
            url: 'http://127.0.0.1:8000/api/list',
            method: 'POST',
            async: false,
            type: 'json'
        }).responseJSON;
    }

    ordersHeader() {
        let data = this.state.data;
        return <tr> {Object.entries(data.orders[0]).map((k) =>
            <th> {k[0]} </th>
        )}
            <th colSpan={3}>
                <div>Операции</div>
            </th>
        </tr>;
    }


    ordersBody() {
        let th = this;
        let data = this.state.data;
        return data.orders.map(function (el) {
            return <tr> {Object.entries(el).map((k, prop) =>
                <td> {k[1]} </td>
            )}
                <td>
                    <NavLink to={'/remove/' + el.id} onClick={th.removeOrder(el.id)}><Icon>remove</Icon></NavLink>
                </td>
                <td><NavLink to={'/show/' + el.id}><Icon>search</Icon></NavLink></td>
                <td><NavLink to={'/update/' + el.id}><Icon>update</Icon></NavLink></td>


            </tr>;
        });


    }



    removeOrder(id) {

    }


    render() {
        return <table id='list'>
            <thead>
            {this.ordersHeader()}
            </thead>
            <tbody>
            {$.each(this.ordersBody(), (i, el) => el)}
            </tbody>
        </table>
    }
}