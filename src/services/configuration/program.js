import instance from '../instance';
import { program as urls } from '../../config/services';

export const save = (data) =>
    instance.post(urls.save, data);

export const remove = (dto) =>
    instance.delete(urls.delete, dto);