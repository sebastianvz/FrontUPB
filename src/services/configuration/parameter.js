import instance from '../instance';
import { parameter as urls } from '../../config/services';

export const list = () =>
    instance.get(urls.list);

export const save = (data) =>
    instance.post(urls.save, data);

export const remove = (data) =>
    instance.delete(urls.delete, { data });