const queryMiddleware = async (req, Model) => {
    try {
        const { fields, populate, sort, pagination, filters } = req.query;

        const sorting = sort ? getSorting(sort) : {};
        const populating = populate ? getPopulate(populate) : null;

        const records = await Model
            .find(filters)
            .select(fields?.join(" "))
            .sort(sorting)
            .skip(pagination?.start)
            .limit(pagination?.limit)
            .populate(populating);

        const collectionName = Model.collection.collectionName.slice(0, -1);
        return { data: records, success: true, error: "", message: `${collectionName} records fetched successfully.` };
    } catch (error) {
        return { data: null, success: false, error: `Error: ${error.message}`, message: "" };
    }
};

const getSorting = (sort) => {
    if (!sort) return {};

    if (!Array.isArray(sort)) {
        return { [sort]: "asc" };
    }

    return sort.reduce((acc, obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        acc[key] = value;
        return acc;
    }, {});
};

const getPopulate = (populate) => {
    if (!populate) return null;

    if (!Array.isArray(populate)) {
        return populate;
    }

    return populate.map((item) => {
        if (typeof item === "string") {
            return item;
        } else {
            const [path, options] = Object.entries(item)[0];

            if (options?.fields) {
                options.select = options.fields;
                delete options.fields;
            }
            // if (options?.filter) {
            //     options.match = {};

            //     Object.entries(options.filter).forEach(([key, value]) => {
            //         const operator = key.replace(/\[.*?\]/g, '');
            //         options.match[operator] = value;
            //     });

            //     delete options.filter;
            // }
            if (options?.sort) {
                options.options = { sort: options.sort };
                delete options.sort;
            }
            if (options?.pagination) {
                options.options = options.options || {};
                if (options.pagination.start) {
                    options.options.skip = options.pagination.start;
                    delete options.pagination.start;
                }
                if (options.pagination.limit) {
                    options.options.limit = options.pagination.limit;
                    delete options.pagination.limit;
                }

                delete options.pagination;
            }

            return {
                path,
                ...options
            };
        }
    });
};

module.exports = queryMiddleware;
