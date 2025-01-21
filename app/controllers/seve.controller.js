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

exports.submitSeveBooking = async (req, res) => {
    try {
        // Step 1: Create the entry in the database
        const submitted_seve = await Submitted_Seves.create({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            nakshatra: req.body.nakshatra,
            gothra: req.body.gothra,
            rashi: req.body.rashi,
            seve: req.body.seve,
            amount: req.body.amount,
            scheduled_date: req.body.scheduled_date
        });

        // Step 2: Generate the billNum
        const newSeveId = submitted_seve.id;
        const updatedAtTime = submitted_seve.updatedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const today = new Date();
        const formattedDate = (today.getMonth() + 1).toString().padStart(2, '0') + today.getFullYear().toString().slice(2);
        const billNum = 'SM-' + formattedDate + newSeveId;

        // Step 3: Update the record with the billNum
        await Submitted_Seves.update(
            { bill_num: billNum },
            { where: { id: newSeveId } }
        );

        // Step 4: Respond to the client
        res.send({
            status: 1,
            message: "Seve added successfully !",
            bill_num: billNum,
            name: submitted_seve.name,
            mobile: submitted_seve.mobile,
            email: submitted_seve.email,
            nakshatra: submitted_seve.nakshatra,
            gothra: submitted_seve.gothra,
            rashi: submitted_seve.rashi,
            seve: submitted_seve.seve,
            amount: submitted_seve.amount,
            scheduled_date: submitted_seve.scheduled_date,
            updated_at_time: updatedAtTime
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.viewAllSeves = async (req, res) => {
    try {
        console.log('Am here in new view  all')
        const seves = await Submitted_Seves.findAll(); // Fetch all seves
    
        res.status(200).send({
            seves: seves
        });
    } catch (err) {
        res.status(500).send({message: err.message}); // Handle error
    }
};

