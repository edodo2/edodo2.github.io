function disableScroll(event) {
    event.preventDefault();
}

document.addEventListener('touchmove', disableScroll, { passive: false });
document.addEventListener("dblclick", function (e) { e.preventDefault(); }, { passive: false });