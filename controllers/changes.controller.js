const changes = [];

function postEvents(req, res) {
  const { event, data } = req.body;
  const at = new Date().toLocaleString();
  changes.push({ event, at, data });
  console.log(`Received event: ${event}`, at, data);
  res.status(200).send('Event received');
}

function getChanges(req, res) {
  const userId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filteredChanges = changes.filter((change) => change.data.id == userId);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedChanges = filteredChanges.slice(startIndex, endIndex);

  res.status(200).json({
    page,
    limit,
    total: filteredChanges.length,
    totalPages: Math.ceil(filteredChanges.length / limit),
    changes: paginatedChanges,
  });
}

module.exports = {
  postEvents,
  getChanges,
};
