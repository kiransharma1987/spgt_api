const db = require("../models");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const {nakshatras: Nakshatras, gothras: Gothras, seve: Seve} = db;

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




exports.submitSeveBooking = async (req, res) => {
    try {
        console.log("am here 21");
        Seve.create({
            username: req.body.username,
            mobile: req.body.mobile,
            nakshatra: req.body.nakshatra,
            gothra: req.body.gothra,
            type: req.body.type,
            amount: req.body.amount
        }).then(seve =>{
            console.log("Am seve here");
            console.log("Am seve here ${seve}");
        })
            .catch(err => {
            console.log("am here 29");
                res.status(500).send({ message: err.message });
            });
        res.status(200).send({
            submit: "Success"
        });
    } catch (err) {
        res.status(500).send({message: err.message}); // Handle error
    }
};
