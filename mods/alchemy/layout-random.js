const randomLayout = (function(){
/**
 * Graphology Random Layout
 * =========================
 *
 * Simple layout giving uniform random positions to the nodes.
 */
var resolveDefaults = layoutDefaults;

/**
 * Default options.
 */
var DEFAULTS = {
  dimensions: ['x', 'y'],
  ratio: [1, 1], //manually added D:<
  center: 0.5,
  rng: Math.random,
  scale: 1
};

/**
 * Abstract function running the layout.
 *
 * @param  {Graph}    graph          - Target  graph.
 * @param  {object}   [options]      - Options:
 * @param  {array}      [dimensions] - List of dimensions of the layout.
 * @param  {number}     [center]     - Center of the layout.
 * @param  {function}   [rng]        - Custom RNG function to be used.
 * @param  {number}     [scale]      - Scale of the layout.
 * @return {object}                  - The positions by node.
 */
function genericRandomLayout(assign, graph, options) {

  options = resolveDefaults(options, DEFAULTS);

  var dimensions = options.dimensions;

  if (!Array.isArray(dimensions) || dimensions.length < 1)
    throw new Error('graphology-layout/random: given dimensions are invalid.');

  var d = dimensions.length;
  var center = options.center;
  var rng = options.rng;
  var ratio = options.ratio;
  var scale = options.scale;

  var offset = (center - 0.5) * scale;

  function assignPosition(target) {
    for (var i = 0; i < d; i++) {
      target[dimensions[i]] = rng() * scale * ratio[i] + offset;
    }

    return target;
  }

  if (!assign) {
    var positions = {};

    graph.forEachNode(function (node) {
      positions[node] = assignPosition({});
    });

    return positions;
  }

  graph.updateEachNodeAttributes(
    function (_, attr) {
      assignPosition(attr);
      return attr;
    },
    {
      attributes: dimensions
    }
  );
}

var randomLayout = genericRandomLayout.bind(null, false);
randomLayout.assign = genericRandomLayout.bind(null, true);

return randomLayout;
})();