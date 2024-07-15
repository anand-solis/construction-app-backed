
const Attendance = require("@/models/organization/site/attendance/main/attendance.model");
const Calendar = require("@/models/organization/site/attendance/main/calendar.model");
const moment = require("moment");

const GetAttendanceController = async (req, res) => {
    const { organization, site } = req.query;
    const { date } = req.params;

    try {
        const selectedDate = moment(date, "DD-MM-YYYY");

        if (!selectedDate.isValid()) return res.status(200).json({ attendance: null, success: false, error: "Selected date is invalid.", message: "" });
        if (selectedDate.isAfter(moment(), "day")) return res.status(200).json({ attendance: null, success: false, error: "Selected date is in the future.", message: "" });

        const calendar = await Calendar.findOne({ organization: organization, site: site, date: date }).select("_id totalAmountToPay totalPresent totalAbsent");

        if (calendar?._id) {
            const attendance = await Attendance
                .find({ organization: organization, site: site, calendar: calendar._id })
                .select("availability labour workingHour overtime overtimePayment totalPayment")
                .populate({
                    path: "labour",
                    select: ["dailyHours", "payment"],
                    populate: {
                        path: "profile",
                        select: "url"
                    }
                });

            const result = {
                attendance: attendance,
                totalAmountToPay: calendar.totalAmountToPay,
                totalPresent: calendar.totalPresent,
                totalAbsent: calendar.totalAbsent,
            }

            return res.status(200).json({ attendance: result, success: true, error: "", message: "Attendance fetched successfully." });
        }
        else {
            return res.status(200).json({ attendance: null, success: true, error: "", message: "Attendance fetched successfully." });
        }
    } catch (error) {
        return res.status(500).json({ attendance: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAttendanceController;