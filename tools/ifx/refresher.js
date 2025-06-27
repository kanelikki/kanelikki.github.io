const Refresher = (function () {
    let dirty = false;
    window.addEventListener("load", function () {
        window.addEventListener("beforeunload", function (e) {
            if (!dirty) return;
            e.preventDefault();
        });
    });
    return {
        markAsDirty: function () {
            dirty = true;
        }
    }
})();