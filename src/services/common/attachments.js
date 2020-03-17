import { attachment } from "../../config/services";
import instance from '../instance';


export const saveTemp = files => instance.post(attachment.saveTemp, files);