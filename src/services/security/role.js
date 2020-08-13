import instance from '../instance';
import { role as urls } from '../../config/services';

export const save = (data) =>
    instance.post(urls.save, data);

export const list = () =>
    instance.get(urls.list);

export const remove = (data) =>
    instance.delete(urls.delete, { data });