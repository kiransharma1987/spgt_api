const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");
const {nakshatras: Nakshatras, gothras: Gothras, rashis: Rashis, submitted_seves: Submitted_Seves, seves: Seves , subscription_seve_data: Subscription_seve_data} = db;



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
            booked_date:req.body.scheduled_date,
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
            updated_at_time: updatedAtTime,
            type : submitted_seve.type,
        });
    } catch (err) {
        res.status(500).send({ status: 2, message: err.message });
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


// Function to generate bill number
const generateBillNum = async () => {
    const todayDate = new Date();
    const formattedDate = (todayDate.getMonth() + 1).toString().padStart(2, '0') + todayDate.getFullYear().toString().slice(2);
    const latestEntry = await Submitted_Seves.findOne({ order: [['id', 'DESC']] });
    const newSeveId = latestEntry ? latestEntry.id + 1 : 1;
    return 'SM-' + formattedDate + newSeveId;
};

exports.subscribeSeve = async (req, res) => {
    try {
        const requiredFields = ["name", "mobile", "email", "nakshatra", "gothra", "rashi", "amount", "seve"];
        const type = "Yearly";
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ status: 3, message: `${field} is required` });
            }
        }

        const today = moment().format("YYYY-MM-DD");
        const seveName = req.body.seve;
        const numberOfTotalSeves = 12;
        const perSeveAmount = req.body.amount/numberOfTotalSeves;

        const subscriptions = await Subscription_seve_data.findAll({
            where: {
                date: {
                    [Op.gte]: today
                },
                name: seveName
            },
            limit: numberOfTotalSeves,
            order: [['date', 'ASC']] // Sorting by date in ascending order
        });

        if (subscriptions.length === 0) {
            return res.status(200).json({ status: 4, message: "No subscriptions found" });
        }

        // Generate billNum
        const billNum = await generateBillNum();
        

        // Insert selected 12 entries into submitted_seves
        const submittedEntries = subscriptions.map(subscription => ({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            nakshatra: req.body.nakshatra,
            gothra: req.body.gothra,
            rashi: req.body.rashi,
            seve: subscription.name,
            amount: perSeveAmount,
            booked_date:req.body.scheduled_date,
            scheduled_date: subscription.date,
            bill_num: billNum,
            type: type
        }));
        const scheduledDate = submittedEntries[0].scheduled_date;
        const savedRows = await Submitted_Seves.bulkCreate(submittedEntries);
        const updatedAtTime = savedRows[0].updatedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const latestDate = subscriptions[numberOfTotalSeves-1].date;

        return res.status(200).json({ 
            status: 1, 
            data: subscriptions, 
            bill_num: billNum,
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            nakshatra: req.body.nakshatra,
            gothra: req.body.gothra,
            rashi: req.body.rashi,
            seve: req.body.seve,
            amount: req.body.amount,
            scheduled_date: scheduledDate,
            updated_at_time: updatedAtTime,
            booked_date:req.body.scheduled_date,
            start_date:scheduledDate,
            end_date:latestDate,
            type : type,
            message: "Entries inserted into submitted_seves successfully" });
    } catch (error) {
        console.error("Error fetching or inserting subscriptions:", error);
        return res.status(500).json({ status: 2, message: "Internal Server Error" });
    }
};