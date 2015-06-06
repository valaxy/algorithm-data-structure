define(function (require) {
	// linked
	require('../linked/linked-node')
	require('../linked/linked')

	// linear-list
	require('../linear-list/array-list')
	require('../linear-list/linked-list')
	require('../linear-list/list')
	require('../linear-list/queue')

	// tree
	require('../tree/ordered/ordered-node')
	require('../tree/ordered/linked-ordered-node')
	require('../tree/ordered/array-ordered-node')

	require('../tree/fix/fix-node')
	require('../tree/fix/binary-node')


	//require('./tree/array-node')
	//require('src/struct-node')

	//require('./binary-node-walk')
	//
	//require('./binary-search-tree')
})