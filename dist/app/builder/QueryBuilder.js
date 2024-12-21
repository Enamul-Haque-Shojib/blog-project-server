"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    //http://localhost:5000/api/v1/students?searchTerm=jack&email=jack121@example.com
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        console.log(queryObj);
        const excludeFields = ['search', 'sortBy', 'sortOrder'];
        excludeFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find({ author: queryObj.filter });
        return this;
    }
    sortBy() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    sortOrder() {
        const sortField = 'createdAt';
        const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1;
        this.modelQuery = this.modelQuery.sort({ [sortField]: sortOrder });
        return this;
    }
}
exports.default = QueryBuilder;
