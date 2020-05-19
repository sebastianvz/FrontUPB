import instance from '../instance';
import { semester as urls } from '../../config/services';

export const save = (data) =>
    instance.post(urls.save, data);

export const remove = (data) =>
    instance.delete(urls.delete, { data });