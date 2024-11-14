module.exports = (sequelize, Sequelize) => {
    const Submitted_Seves = sequelize.define("submitted_seves", {
        name: {
            type: Sequelize.STRING
        },
        mobile: {
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
        }
    });
    return Submitted_Seves;
};