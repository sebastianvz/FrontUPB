import instance from '../instance';
import { practices } from '../../config/services';

export const save = (data) =>
    instance.post(practices.save, data);
    // instance.get('./auth.json');