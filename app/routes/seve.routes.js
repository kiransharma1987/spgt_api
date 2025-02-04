const { verifySignUp } = require("../middleware");
const controller = require("../controllers/seve.controller");
const { fetch_nakshatras,submitSeveBooking,  viewAllSeves, getSankastaDates, subscribeSeve } = require("../controllers/seve.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const fetchNakshatrasWrapper = (req, res) => {
        return fetch_nakshatras(req, res);
    };

    app.get("/api/auth/seve", fetchNakshatrasWrapper);
    app.post("/api/seve/submit", submitSeveBooking);
    app.get("/api/seve/view_all_seves", viewAllSeves);
    app.post("/api/seve/subscribeSeve", subscribeSeve); 
    // app.get("/api/seve/get-sankasta-dates", getSankastaDates);  
};
