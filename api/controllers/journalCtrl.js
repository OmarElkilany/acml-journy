const mongoose = require('mongoose');
const Journal = mongoose.model('Journal');
const User = mongoose.model('User');

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
    addFilters = function (filters) {
        if (filters.length > 0) {
            return { $and: filters };
        }
        return {};
    }

    var filters = [];

    if (req.body.tags && req.body.tags.length > 0) {
        filters.push({ tags: { "$all": req.body.tags } });
    }
    if (req.body.title) {
        filters.push({ title: { $regex: '^' + req.body.title } });
    }
    if (req.body.user_id) {
        filters.push({ creator: req.body.user_id });
    }

    if (req.body.creator) {
        User.find(
            { email: { $regex: '[' + req.body.creator + '^@]+@[^\.]+\..+' } },
            (err, users) => {
                if (err) {
                    return res.status(500).json({ err: err });
                    //TODO: Handle error
                }
                filters.push({ creator: { "$in": users } });

                Journal.paginate(
                    addFilters(filters),
                    {
                        page: req.body.page,
                        limit: req.body.pageLimit
                    },
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ err: err });
                            //TODO: Handle error
                        }
                        return res.status(200).json({ data: result });
                    }
                )
            }
        );
    }
    else {


        Journal.paginate(
            addFilters(filters),
            {
                page: req.body.page,
                limit: req.body.pageLimit
            },
            (err, result) => {
                if (err) {
                    return res.status(500).json({ err: err });
                    //TODO: Handle error
                }
                return res.status(200).json({ data: result });
            }
        )
    }
}
