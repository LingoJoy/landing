import { useEffect, useRef } from "react";

export function useHorizontalScroll() {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return;

                e.preventDefault();
                const delta = e.deltaY * 3;

                el.scrollTo({
                    left: el.scrollLeft + delta,
                    behavior: "smooth",
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);

    return elRef;
}
