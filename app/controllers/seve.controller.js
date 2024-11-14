const db = require("../models");
const {nakshatras: Nakshatras, gothras: Gothras, rashis: Rashis, submitted_seves: Submitted_Seves, seves: Seves} = db;

exports.fetch_nakshatras = async (req, res) => {
    try {
        const nakshatras = await Nakshatras.findAll(); // Fetch all nakshatras
        const gothras = await Gothras.findAll(); // Fetch all Gothras
        const rashis = await Rashis.findAll(); // Fetch all Rashis
        const seves = await Seves.findAll(); // Fetch all Seves
        res.status(200).send({
            nakshatras: nakshatras,
            gothras: gothras,
            rashis: rashis,
            seves: seves
        });
    } catch (err) {
        res.status(500).send({message: err.message}); // Handle error
    }
};

exports.submitSeveBooking = (req, res) => {
    // Save Submitted_Seves to Database
    Submitted_Seves.create({
        name: req.body.name,
        mobile: req.body.mobile,
        nakshatra: req.body.nakshatra,
        gothra: req.body.gothra,
        rashi: req.body.rashi,
        seve: req.body.seve,
        amount: req.body.amount
    })
        .then(submitted_seve => {
            res.send({
                status: 1,
                message: "Seve added successfully !"
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
