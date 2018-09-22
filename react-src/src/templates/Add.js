import React, { Component } from 'react';
import $ from "jquery";
import {NavLink} from "react-router-dom";
import {Button} from "react-materialize";


export default class Add extends Component {


    componentDidMount() {

        $.get('http://127.0.0.1:8000/api/add', function (data) {
           $('#form').html(data.form.content);
        });

        $('#form').on('submit', function (e) {
            e.preventDefault();
            let th = $(this);
            $.ajax({
                url: 'http://127.0.0.1:8000/api/add',
                method: 'POST',
                data: $(th).serialize(),
                success: function (data) {
                        alert("Успешно добавлено");

                }
            })
        })
    }


    render() {
        return <div>
            <form id="form">

            </form>

            <NavLink to={'/'}> <Button>Вернуться на главную </Button></NavLink>
        </div>
    }
}