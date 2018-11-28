const mongoose = require('mongoose');
const Journal = mongoose.model('Journal');

module.exports.getJournal = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.journalID)) {
        return res.status(422).json({
            data: null,
            err: 'Journal does not exist',
            msg: null
        });
    }

    Journal.findById(req.params.journalID, function (err, journal) {
        if (err) {
            return next(err);
        }

        if (!journal) {
            return res.status(404).json({
                data: null,
                err: 'Journal not found',
                msg: null
            });
        }

        return res.status(200).json({
            data: journal,
            err: null,
            msg: 'Journal retrieved successfully'
        });
    });
};

module.exports.createJournal = function (req, res, next) {
    var journal = req.body;

    if (!(journal && journal.title &&
        journal.creator && journal.body &&
        Array.isArray(journal.tags) && journal.tags.length)) {
        return res.status(422).json({
            data: null,
            err: 'Journal was incomplete',
            msg: null
        });
    }

    Journal.create(journal, function (err, createdJournal) {
        if (err) {
            return next(err);
        }

        res.status(201).json({
            data: createdJournal._id,
            err: null,
            msg: 'Journal created successfully'
        });
    });
};

module.exports.editJournal = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.journalID)) {
        return res.status(422).json({
            data: null,
            err: 'Journal does not exist',
            msg: null
        });
    }

    var journal = req.body;

    if (!(journal && journal.title &&
        journal.creator && journal.body &&
        Array.isArray(journal.tags) && journal.tags.length)) {
        return res.status(422).json({
            data: null,
            err: 'Journal was incomplete',
            msg: null
        });
    }

    Journal.findOneAndUpdate(
        {
            '_id': req.params.journalID,
            'creator': journal.creator,
        },
        {
            $set: {
                'title': req.body.title,
                'body': req.body.body,
                'tags': req.body.tags
            }
        },
        function (err, editedJournal) {
            if (err) {
                return next(err);
            }

            res.status(201).json({
                data: editedJournal._id,
                err: null,
                msg: 'Journal editted successfully'
            });
        });

};

module.exports.deleteJournal = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.user)) {
        return res.status(422).json({
            data: null,
            err: 'User does not exist',
            msg: null
        });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.journalID)) {
        return res.status(422).json({
            data: null,
            err: 'Journal does not exist',
            msg: null
        });
    }

    Journal.findOneAndRemove(
        {
            '_id': req.params.journalID,
            'creator': req.params.user
        },
        function (error) {
            if (error) {
                return next(error);
            }

            return res.status(202).json({
                data: null,
                err: null,
                msg: 'Journal deleted successfully'
            });
        });

};

module.exports.search = function (req, res, next) {
    Journal.find(
        {
            tags: { "$all": req.body.tags }
        }
    );
}
