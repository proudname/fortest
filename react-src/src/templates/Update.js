import React, { Component } from 'react';
import $ from "jquery";
import {NavLink} from "react-router-dom";
import {Button} from "react-materialize";


export default class Update extends Component {
    componentDidMount() {
        //Когда компонент смонтирован, получаем форму
        let id = this.props.match.params.id;
        $.get('http://127.0.0.1:8000/api/update/'+id, function (data) {
            $('#form').html(data.form.content);
        });


        //При отправке отправляем данные в апи на php
        $('#form').on('submit', function (e) {
            e.preventDefault();
            let th = $(this);
            $.ajax({
                url: 'http://127.0.0.1:8000/api/update/'+id,
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