const { response, request } = require('express');






const triggerGet = async(req, res = response) => {
    res.json(res);
};




module.exports = {
    triggerGet
}