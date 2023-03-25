import axios from "axios";
import * as helper from '../services/serviceHelper';

const endpoint = `https://localhost:50001/api/lookups`;

const getTypes = (types) =>{
    const config = {
        method: 'POST',
        url: `${endpoint}`,
        data: types,
        crossdomain: true,
        headers: { 'Content-Type' : 'application/json'}
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
}

const getLookUp = (tableName) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/?tableName=${tableName}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export { getTypes, getLookUp };