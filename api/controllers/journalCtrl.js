const mongoose = require('mongoose');
const Journal = mongoose.model('Journal');

module.exports.getJournal = function (req, res, next) {
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

    Journal.create(journal, function (err) {
        if (err) {
            return next(err);
        }

        res.status(201).json({
            data: null,
            err: null,
            msg: 'Journal created successfully'
        });
    });
};

module.exports.editJournal = function (req, res, next) {
    var journal = req.body;
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
        function (err) {
            if (err) {
                return next(err);
            }

            res.status(201).json({
                data: null,
                err: null,
                msg: 'Journal editted successfully'
            });
        });

};

module.exports.deleteJournal = function (req, res, next) {


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
