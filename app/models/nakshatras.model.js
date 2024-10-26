module.exports = (sequelize, Sequelize) => {
    const Nakshatras = sequelize.define("nakshatras", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Nakshatras;
};
