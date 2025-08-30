module.exports.analyze = (photoUrl) => {
    // Fake AI validation logic for hackathon demo
    // Later can connect to real ML model
    if (photoUrl.includes("mangrove")) return 0.9;
    return 0.4;
};
