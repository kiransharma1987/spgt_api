module.exports = (sequelize, Sequelize) => {
    const Subscription_seve_data = sequelize.define("subscription_seve_data", {
        name: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        }
    });
    return Subscription_seve_data;
};