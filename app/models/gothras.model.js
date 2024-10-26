module.exports = (sequelize, Sequelize) => {
    const Gothras = sequelize.define("gothras", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Gothras;
};
