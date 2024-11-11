const db = require("../models");
const {nakshatras: Nakshatras, gothras: Gothras,rashis: Rashis, seves: Seves} = db;

exports.fetch_nakshatras = async (req, res) => {
    try {
        const nakshatras = await Nakshatras.findAll(); // Fetch all nakshatras
        const gothras = await Gothras.findAll(); // Fetch all Gothras
        const rashis = await Rashis.findAll(); // Fetch all Rashis
        res.status(200).send({
            nakshatras: nakshatras,
            gothras: gothras,
            rashis: rashis
        });
    } catch (err) {
        res.status(500).send({message: err.message}); // Handle error
    }
};

exports.submitSeveBooking = (req, res) => {
    // Save User to Database
    Seves.create({
        name: req.body.name,
        mobile: req.body.mobile,
        nakshatra: req.body.nakshatra,
        gothra: req.body.gothra,
        rashi: req.body.rashi,
        type: req.body.type,
        amount: req.body.amount
    })
        .then(seve => {
            res.send({ message: "Seve added successfully !" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
