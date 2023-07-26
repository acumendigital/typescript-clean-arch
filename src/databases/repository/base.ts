import { convertToObjectId, nilObjectId } from "@src/helpers";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

mongoose.plugin(mongoosePaginate);
mongoose.plugin(mongooseAggregatePaginate);

export class Base {
	protected Model: mongoose.Model<any>;

	constructor(model: mongoose.Model<any>) {
		this.Model = model;
	}

	async find(query = {}, select = "", sort = null, populate = null) {
		query = { ...query, deleted: false };

		sort = sort || {
			createdAt: -1,
		};

		populate = populate || "";

		const res = await this.Model.find(query).select(select).sort(sort).populate(populate);

		return res;
	}

	async findOne(query = {}, select = "", populate = null, sort = null) {
		query = { ...query, deleted: false };

		populate = populate || "";

		sort = sort || {
			createdAt: 1,
		};

		const res = await this.Model.findOne(query).select(select).populate(populate).sort(sort);

		return res;
	}

	async findById(id, select = "") {
		const query = {
			_id: convertToObjectId(id),
			deleted: false,
		};

		return this.findOne(query, select);
	}

	async paginate(
		query = {},
		pagination: { count?: number; page?: number; sort?: any } = {},
		populate: string[] | null = null,
		select: string | null = null,
	) {
		query = { ...query, deleted: false };
		let { count = 15, page = 1, sort = { createdAt: -1 } } = pagination;

		const options: any = {
			limit: count,
			page: page,
			sort: sort,
		};

		if (populate) {
			options.populate = populate;
		}

		if (select) {
			options.select = select;
		}

		// @ts-ignore
		const res = await this.Model.paginate(query, options);

		return res;
	}

	async paginateAggregate(pipeline = [], pagination: { count?: number; page?: number; sort?: any } = {}) {
		let { count = 15, page = 1, sort = { createdAt: -1 } } = pagination;

		// @ts-ignore
		const res = await this.Model.aggregatePaginate(this.Model.aggregate(pipeline), {
			limit: count,
			page: page,
			sort: sort,
		});

		return res;
	}

	async aggregate(pipeline = []) {
		const res = await this.Model.aggregate(pipeline);
		return res;
	}

	async delete(query = {}) {
		query = { ...query, deleted: false };
		const res = await this.Model.updateMany(query, {
			$set: {
				deleted: true,
			},
		});

		return res;
	}

	async baseCreate(data) {
		return this.Model.create({
			...data,
			deleted: false,
		});
	}

	async findOneAndUpdate(query = {}, data) {
		query = { ...query, deleted: false };
		const res = await this.Model.findOneAndUpdate(
			query,
			{
				$set: data,
			},
			{
				new: true,
			},
		);

		return res;
	}

	async baseUpdate(query = {}, data) {
		query = { ...query, deleted: false };
		const res = await this.Model.updateMany(query, {
			$set: data,
		});
		return res;
	}

	getHiddenFields() {
		const schema = this.Model.schema.obj;
		const fields = Object.keys(schema);
		const res = [];

		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];
			if (schema[field].select === false) {
				res.push(field);
			}
		}

		return res;
	}

	processData(data, exclude = []) {
		const schema = this.Model.schema.obj;
		const fields = Object.keys(schema);
		const res = {};

		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];
			if (exclude.indexOf(field) === -1) {
				if (data[field] !== undefined && data[field] !== null) {
					res[field] = data[field];
				} else {
					if (schema[field].default !== undefined) {
						res[field] = schema[field].default;
					} else {
						if (schema[field].type === String) {
							res[field] = "";
						} else if (schema[field].type === Number) {
							res[field] = 0;
						} else if (schema[field].type === Boolean) {
							res[field] = false;
						} else if (schema[field].type === Date) {
							res[field] = null;
						} else if (schema[field].type === Array) {
							res[field] = [];
						} else if (schema[field].type === Object) {
							res[field] = {};
						} else if (schema[field].type === mongoose.Schema.Types.ObjectId) {
							res[field] = nilObjectId();
						} else {
							res[field] = null;
						}
					}
				}
			}
		}

		return res;
	}

	async countDocuments(query = {}) {
		query = { ...query, deleted: false };
		return await this.Model.countDocuments(query);
	}

	async bulkWrite(operations) {
		return await this.Model.bulkWrite(operations);
	}

	getModel() {
		return this.Model;
	}

	getModelName() {
		return this.Model.collection.name;
	}
}
export default Base;
