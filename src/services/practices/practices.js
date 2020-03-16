import instance from '../instance';
import { practices } from '../../config/services';

export const save = (data) =>
    instance.post(practices.save, data);
    // instance.get('./auth.json');

export const update = (data) =>
    instance.put(practices.save, data);

export const getById = id =>
    instance.get(`${practices.getById}${id}`);