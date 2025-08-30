// backend/utils/userGamification.js

class UserGamification {
    constructor(user) {
        this.user = user;
        this.user.reports_submitted = this.user.reports_submitted || 0;
        this.user.validated_reports = this.user.validated_reports || 0;
        this.user.points = this.user.points || 0;
        this.user.badges = this.user.badges || [];
        this.user.user_type = this.user.user_type || "Coastal Community";
    }

    submitReport(validated = false) {
        this.user.reports_submitted += 1;
        this.user.points += this.basePoints();

        if (validated) {
            this.user.validated_reports += 1;
            this.user.points += this.validationBonus();
        }

        this.checkBadges();
    }

    basePoints() {
        switch (this.user.user_type) {
            case "Coastal Community": return 10;
            case "Conservation NGO": return 15;
            case "Government Forestry Department": return 20;
            case "Researcher": return 12;
            default: return 10;
        }
    }

    validationBonus() {
        switch (this.user.user_type) {
            case "Coastal Community": return 20;
            case "Conservation NGO": return 25;
            case "Government Forestry Department": return 30;
            case "Researcher": return 22;
            default: return 20;
        }
    }

    checkBadges() {
        const u = this.user;
        if (u.reports_submitted >= 10 && !u.badges.includes("Explorer")) u.badges.push("Explorer");
        if (u.validated_reports >= 5 && !u.badges.includes("Guardian")) u.badges.push("Guardian");
        if (u.points >= 100 && !u.badges.includes("Champion")) u.badges.push("Champion");

        if (u.user_type === "Government Forestry Department" && u.validated_reports >= 10 && !u.badges.includes("Steward")) u.badges.push("Steward");
        if (u.user_type === "Researcher" && u.reports_submitted >= 20 && !u.badges.includes("Data Pioneer")) u.badges.push("Data Pioneer");
    }

    getSummary() {
        return {
            user_id: this.user._id,
            user_type: this.user.user_type,
            reports_submitted: this.user.reports_submitted,
            validated_reports: this.user.validated_reports,
            points: this.user.points,
            badges: this.user.badges,
        };
    }
}

module.exports = UserGamification;
