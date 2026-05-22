const Student = require('../models/Student');

// @desc    Save new student data
// @route   POST /api/student
// @access  Public
const createStudent = async (req, res) => {
    try {
        const { name, class: studentClass, targetExam, languageKnown } = req.body;

        const student = await Student.create({
            name,
            class: studentClass,
            targetExam,
            languageKnown,
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all students
// @route   GET /api/student
// @access  Private (Admin only)
const getStudents = async (req, res) => {
    try {
        const students = await Student.find({}).sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createStudent,
    getStudents,
};
