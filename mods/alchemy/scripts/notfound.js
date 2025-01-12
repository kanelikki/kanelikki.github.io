//This finds currently nonexistent item in your encyclopedia, by combination history.

const progress = workspace.__vue__.$store.getters.totalProgressElements;
const all = workspace.__vue__.$store.getters.elementsIds;
const notFound = all.filter(a=>progress.indexOf(a)<0);