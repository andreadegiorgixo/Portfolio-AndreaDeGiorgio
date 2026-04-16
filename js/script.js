const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canUseCustomCursor) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
    const hoverTargets = "a, button, input, textarea, select, label, [role='button']";

    const showCursor = () => cursor.classList.add("is-visible");
    const hideCursor = () => cursor.classList.remove("is-visible");
    const enableHoverState = () => cursor.classList.add("is-hovering");
    const disableHoverState = () => cursor.classList.remove("is-hovering");

    document.addEventListener("mousemove", (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        showCursor();
    });

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseover", (event) => {
        if (event.target.closest(hoverTargets)) {
            enableHoverState();
        }
    });
    document.addEventListener("mouseout", (event) => {
        if (event.target.closest(hoverTargets)) {
            disableHoverState();
        }
    });
}
