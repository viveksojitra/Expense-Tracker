const Record = require('../models/transactionModel');

// Controller to render the main page with records
const defaultController = async (req, res) => {
    try {
        const records = await Record.find();
        let singleRecord = null;

        if (req.query.id) {
            singleRecord = await Record.findById(req.query.id);
        }

        res.render('index', { records, singleRecord });
    } catch (err) {
        console.error('Error fetching records:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Controller to add a new record
const addRecordController = async (req, res) => {
    try {
        const { type, category, amount, description, date } = req.body;

        const newRecord = new Record({
            type,
            category,
            amount,
            description,
            date
        });

        await newRecord.save();
        console.log("Record added:", newRecord);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding record:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Controller to update a specific record
const updateRecordController = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, category, amount, description, date } = req.body;

        const updatedRecord = await Record.findByIdAndUpdate(
            id,
            { type, category, amount, description, date },
            { new: true }
        );

        if (updatedRecord) {
            console.log('Record updated:', updatedRecord);
            res.redirect('/');
        } else {
            res.status(404).send('Record not found');
        }
    } catch (err) {
        console.error('Error updating record:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Controller to delete a specific record
const deleteRecordController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Record.findByIdAndDelete(id);
        if (deletedRecord) {
            console.log('Record deleted:', deletedRecord);
            res.redirect('/');
        } else {
            res.status(404).send('Record not found');
        }
    } catch (err) {
        console.error('Error deleting record:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    defaultController,
    addRecordController,
    updateRecordController,
    deleteRecordController
};
