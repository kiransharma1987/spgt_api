module.exports = (sequelize, Sequelize) => {
    const Seve = sequelize.define("seve", {
        username: {
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
        type: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        }
    });
    return Seve;
};