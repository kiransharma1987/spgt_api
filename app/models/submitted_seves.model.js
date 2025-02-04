module.exports = (sequelize, Sequelize) => {
    const Submitted_Seves = sequelize.define("submitted_seves", {
        name: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        gothra: {
            type: Sequelize.STRING
        },
        nakshatra: {
            type: Sequelize.STRING
        },
        rashi: {
            type: Sequelize.STRING
        },
        seve: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        scheduled_date: {
            type: Sequelize.STRING
        },
        bill_num: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    });
    return Submitted_Seves;
};