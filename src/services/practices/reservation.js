import instance from '../instance';
import { reservation } from '../../config/services';

export const list = (data) =>
    instance.get(`${reservation.list}${data}`);

export const save = (data) =>
    instance.post(reservation.save, data);

export const remove = (id) =>
    instance.delete(`${reservation.delete}?id=${id}`);

export const changeState = (data) =>
    instance.post(reservation.changeState, data);