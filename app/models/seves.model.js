module.exports = (sequelize, Sequelize) => {
    const Seves = sequelize.define("seves", {
        name: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    });
    return Seves;
};