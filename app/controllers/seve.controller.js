const db = require("../models");
const config = require("../config/auth.config");
const {nakshatras: Nakshatras, gothras: Gothras} = db;

exports.fetch_nakshatras = async (req, res) => {
    try {
        const nakshatras = await Nakshatras.findAll(); // Fetch all nakshatras
        const gothras = await Gothras.findAll(); // Fetch all nakshatras
        res.status(200).send({
            nakshatras: nakshatras,
            gothras: gothras
        });
    } catch (err) {
        res.status(500).send({message: err.message}); // Handle error
    }
};
