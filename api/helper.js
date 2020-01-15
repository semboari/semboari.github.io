const helper = {};

helper.GroupBy = (data, key) =>
	data.reduce((agg, item) => {
		const group = key(item);
		agg[group] = [ ...(agg[group] || []), item ];
		return agg;
	}, {});

module.exports = helper;
