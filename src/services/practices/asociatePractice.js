import instance from '../instance';
import { asociatePractices } from '../../config/services';

export const list = (data) =>
    instance.get(`${asociatePractices.list}${data}`);

export const save = (data) =>
    instance.post(asociatePractices.save, data);