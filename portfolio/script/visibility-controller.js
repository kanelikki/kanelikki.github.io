(function(){
    const globalStatus = {
        False:0,
        True:1,
        Partial:2
    }
    window.addEventListener("load",function(){
        const thumbsByCategory = Object.groupBy([...document.querySelectorAll(".thumbs")], t => t.dataset.category);
        const headsByCategory = [...document.querySelectorAll(".article-topic")].reduce((a,b)=>{
            a[b.dataset.topic] = b;
            return a;
        }, {})
        const categories = Object.keys(thumbsByCategory);
        const visibilities = categories.reduce((a,b)=>{
            a[b] = false;
            return a;
        }, {});
        let mainCheckBox;
        let checkBoxStatus = globalStatus.False;
        const toggles = createToggles();
        if(!/(iPhone|iPad|Android)/.test(navigator.userAgent)) {
            showAll();
        }
        else hideAll();
        updateGlobalMarkVisibility();
        function createToggles() {
            let res = {};
            mainCheckBox = createToggleEach(
                document.querySelector(".header-topic"),
                toggleVisibilityAll, "preview-toggle-global");
            for(let k of categories) {
                res[k] = createToggleEach(
                    headsByCategory[k],
                    e=>toggleVisibility(e, k),
                `preview-toggle-${k}`);
            }
            return res;
            function createToggleEach(appendTarget, ev, id) {
                const toggle = document.createElement("input");
                const toggleLabel = document.createElement("label");
                toggle.type="checkbox";
                toggle.addEventListener("change", ev)
                toggle.id=id;
                toggleLabel.title="show/hide embeds";
                toggleLabel.for=id;
                toggleLabel.textContent="Preview"
                toggleLabel.appendChild(toggle);
                appendTarget.appendChild(toggleLabel);
                return toggle;
            }
        }
        function showAll(){
            for(const k of categories) {
                showCategory(k);
            }
        }
        function hideAll(){
            for(const k of categories) {
                hideCategory(k);
            }
        }
        function showCategory(category){
            const target = thumbsByCategory[category];
            if(!target) return;
            for(const thumb of target) {
                thumb.removeAttribute("hidden");
            }
            markVisibility(category, true);
        }
        function hideCategory(category){
            const target = thumbsByCategory[category];
            if(!target) return;
            for(const thumb of target) {
                thumb.setAttribute("hidden", "");
            }
            markVisibility(category, false);
        }
        function markVisibility(category, visibility) {
            toggles[category].checked = visibility;
            visibilities[category] = visibility;
        }
        function toggleVisibility(e, category) {
            if(e.target.checked) showCategory(category);
            else hideCategory(category);
            updateGlobalMarkVisibility();
        }
        function toggleVisibilityAll(e) {
            if(e.target.checked) {
                showAll();
            }
            else {
                hideAll();
            }
            updateGlobalMarkVisibility();
        }
        function updateGlobalMarkVisibility() {
            const visibilityArray = Object.values(visibilities);
            const visibilityScore = visibilityArray.reduce((a,b) => a+b, 0);
            const hasAny = visibilityScore > 0;
            const newStatus = hasAny + (hasAny && (visibilityScore < visibilityArray.length));
            if(checkBoxStatus === newStatus) return;
            checkBoxStatus = newStatus;
            switch(newStatus) {
                case globalStatus.False:
                    mainCheckBox.indeterminate = false;
                    mainCheckBox.removeAttribute("checked");
                    break;
                case globalStatus.True:
                    mainCheckBox.indeterminate = false;
                    mainCheckBox.setAttribute("checked","");
                    break;
                case globalStatus.Partial:
                    mainCheckBox.indeterminate = true;
                    break;
                default:
                    throw newStatus;
                    break;
            }
        }
    });
})();