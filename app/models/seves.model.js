module.exports = (sequelize, Sequelize) => {
    const Seves = sequelize.define("seves", {
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
        type: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        }
    });
    return Seves;
};