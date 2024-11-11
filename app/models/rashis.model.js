module.exports = (sequelize, Sequelize) => {
    const Rashis = sequelize.define("rashis", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Rashis;
};
