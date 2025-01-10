import { useEffect, useRef, useState } from "react";

export function useScaleText(padding: number) {
    const [scale, setScale] = useState(1);

    const boxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!boxRef.current || !textRef.current) return;

        const boxWidth = boxRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        if (textWidth + padding > boxWidth)
            setScale((boxWidth - padding) / textWidth);
    }, [textRef, boxRef, padding]);

    return { scale, boxRef, textRef };
}
