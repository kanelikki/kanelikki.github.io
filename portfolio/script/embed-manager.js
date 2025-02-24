(function(){
    window.addEventListener("load",function(){
        const modal = document.querySelector("#modal");
        const dialog = modal.querySelector("dialog");
        const modalImg = modal.querySelector("img");
        modal.addEventListener("click", close, false);
        dialog.addEventListener("click", e=>e.stopPropagation(), false);
        window.addEventListener("keyup", closeByKey, false);
        for(const elem of [...document.querySelectorAll(".yt-embed")]) {
            embedVideo(elem);
        }
        for(const elem of [...document.querySelectorAll(".thumbs img")]) {
            initImgPreview(elem);
        }
        /* video */
        function embedVideo(elem) {
            const vid = elem.dataset.vid;
            const vtitle = elem.dataset.title;
            const vlink = `https://www.youtube.com/watch?v=${vid}`;
            const altParagraph = document.createElement("p");
            altParagraph.classList.add("yt-alt");
            altParagraph.textContent = vtitle;
            elem.style.backgroundImage = `url("https://img.youtube.com/vi/${vid}/sddefault.jpg")`;
            elem.appendChild(altParagraph);
            elem.addEventListener("click", ()=>playVid(vid, vtitle, elem), false)
        }
        function playVid(vid, vtitle, velem) {
            const currentVideo = buildVideoElem(vid);
            velem.classList.add("yt-playing");
            velem.appendChild(currentVideo);
            function buildVideoElem(vid){
                const vidElem = document.createElement("iframe");
                vidElem.width="100%";
                vidElem.height="100%";
                vidElem.src = `https://www.youtube.com/embed/${vid}?feature=oembed&autoplay=1&auto_play=1`;
                vidElem.title = vtitle;
                vidElem.setAttribute("allowFullscreen","");
                return vidElem;
            }
        }
        /* image modal */
        function initImgPreview(elem) {
            elem.title = elem.alt;
            const btn = elem.parentElement;
            btn.addEventListener("click", ()=>setPreview(elem));
        }
        function setPreview(elem) {
            if(elem.classList.contains("gif-thumb")) {
                modalImg.src = elem.dataset.gif;
            }
            else {
                modalImg.src = elem.src;
            }
            modalImg.alt = elem.alt;
            openModal();
        }
        function openModal() {
            modal.removeAttribute("hidden");
        }
        function close(e) {
            e.stopPropagation();
            modal.setAttribute("hidden", "");
            modalImg.src="";
        }
        function closeByKey(e) {
            if(e.keyCode === 27 && !modal.hasAttribute("hidden")) {
                close(e);
            }
        }
    });
})();