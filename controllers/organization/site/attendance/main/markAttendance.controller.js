const Attendance = require("@/models/organization/site/attendance/main/attendance.model");
const Calendar = require("@/models/organization/site/attendance/main/calendar.model");
const Labour = require("@/models/organization/site/attendance/labour/labour.model");
const moment = require("moment");

const MarkAttendanceController = async (req, res) => {
    const { organization, site } = req.query;
    const { date, labours } = req.body;

    try {
        const selectedDate = moment(date, "DD-MM-YYYY");

        if (!selectedDate.isValid()) return res.status(200).json({ success: false, error: "Selected date is invalid.", message: "" });
        if (selectedDate.isAfter(moment(), "day")) return res.status(200).json({ success: false, error: "Selected date is in the future.", message: "" });

        const calendar = await Calendar.findOneAndUpdate(
            { organization: organization, site: site, date: date },
            { $setOnInsert: { createdBy: req.user._id }, $set: { date: date } },
            { new: true, upsert: true }
        );

        let totalAmountToPay = 0;
        let totalPresent = 0;
        let totalAbsent = 0;

        const attendancePromises = labours.map(async (labour) => {
            if (labour?._id) {
                const labourId = labour._id;
                const labourAvailability = labour?.availability || 0;
                const labourOvertime = labour?.overtime || 0;
                const labourOvertimePayment = labour?.overtimePayment || 0;

                const getLabour = await Labour.findOne({ _id: labourId, organization: organization, site: site }).select("dailyHours payment");

                const getLabourId = getLabour?._id;
                const getLabourDailyHours = getLabour.dailyHours;
                const getLabourPayment = getLabour.payment;
                const labourWorkingHour = labour?.workingHour || getLabourDailyHours;

                if (getLabourId) {
                    if (getLabourDailyHours >= labourWorkingHour) {
                        const workingHour = labourAvailability == 1 ? labourWorkingHour : labourAvailability == 2 ? (getLabourDailyHours / 2) : 0;
                        const totalDailyPayment = workingHour > 0 ? (getLabourPayment / getLabourDailyHours) * workingHour : 0;
                        const totalOvertimePayment = labourOvertimePayment * labourOvertime;
                        const totalPayment = totalDailyPayment + totalOvertimePayment;

                        totalAmountToPay += totalPayment;
                        if (labourAvailability == 1 || labourAvailability == 2) {
                            totalPresent += 1;
                        }
                        else {
                            totalAbsent += 1;
                        }

                        return Attendance.findOneAndUpdate(
                            { organization: organization, site: site, calendar: calendar._id, labour: labourId },
                            {
                                availability: labourAvailability,
                                workingHour: workingHour,
                                overtime: labourOvertime,
                                overtimePayment: labourOvertimePayment,
                                totalPayment: totalPayment
                            },
                            { new: true, upsert: true }
                        );
                    }
                }
            }
        });

        await Promise.all(attendancePromises);

        await Calendar.findOneAndUpdate(
            { organization: organization, site: site, _id: calendar },
            {
                totalAmountToPay: totalAmountToPay,
                totalPresent: totalPresent,
                totalAbsent: totalAbsent
            }
        );

        return res.status(201).json({ success: true, error: "", message: "Attendance Marked successfully." });
    } catch (error) {
        return res.status(500).json({ attendance: null, exist: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = MarkAttendanceController;