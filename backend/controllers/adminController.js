const Note = require('../models/Note');
const PYQ = require('../models/PYQ');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
    try {
        const totalNotes = await Note.countDocuments({});
        const totalPYQs = await PYQ.countDocuments({});
        const totalSubjects = 6; // Chemistry, Physics, Hindi, History, Geography, Civics
        const totalUploads = totalNotes + totalPYQs;

        // Fetch recent uploads (latest 5 notes and 5 pyqs)
        const [recentNotes, recentPyqs] = await Promise.all([
            Note.find({}).sort({ uploadedAt: -1 }).limit(5),
            PYQ.find({}).sort({ uploadedAt: -1 }).limit(5)
        ]);

        // Standardize and merge
        const mergedUploads = [
            ...recentNotes.map(note => ({
                _id: note._id,
                title: note.title,
                type: 'Note',
                subject: note.subject,
                uploadedAt: note.uploadedAt,
            })),
            ...recentPyqs.map(pyq => ({
                _id: pyq._id,
                title: pyq.title,
                type: 'PYQ',
                subject: pyq.subject,
                class: pyq.class,
                year: pyq.year,
                uploadedAt: pyq.uploadedAt,
            }))
        ];

        // Sort by date descending and take top 5
        const recentUploads = mergedUploads
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
            .slice(0, 5);

        // Generate 6-month activity stats
        const monthlyStats = [];
        const now = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = d.toLocaleString('default', { month: 'short' });
            monthlyStats.push({
                month: `${monthName} ${d.getFullYear().toString().slice(-2)}`,
                monthIndex: d.getMonth(),
                year: d.getFullYear(),
                notes: 0,
                pyqs: 0,
                total: 0
            });
        }

        const startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        
        const [allNotes6Months, allPyqs6Months] = await Promise.all([
            Note.find({ uploadedAt: { $gte: startDate } }),
            PYQ.find({ uploadedAt: { $gte: startDate } })
        ]);

        allNotes6Months.forEach(note => {
            const date = new Date(note.uploadedAt);
            const bucket = monthlyStats.find(b => b.monthIndex === date.getMonth() && b.year === date.getFullYear());
            if (bucket) {
                bucket.notes++;
                bucket.total++;
            }
        });

        allPyqs6Months.forEach(pyq => {
            const date = new Date(pyq.uploadedAt);
            const bucket = monthlyStats.find(b => b.monthIndex === date.getMonth() && b.year === date.getFullYear());
            if (bucket) {
                bucket.pyqs++;
                bucket.total++;
            }
        });

        res.status(200).json({
            stats: {
                totalNotes,
                totalPYQs,
                totalSubjects,
                totalUploads,
            },
            recentUploads,
            monthlyStats,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getDashboardStats,
};
