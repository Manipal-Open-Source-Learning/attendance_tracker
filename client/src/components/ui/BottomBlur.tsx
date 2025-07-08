type BlurLayer = {
    zIndex: number;
    blur: number;
    start: number;
    mid1: number;
    mid2: number;
    end: number;
};

const layers: BlurLayer[] = [
    { zIndex: 1, blur: 0.0546875, start: 0, mid1: 12.5, mid2: 25, end: 37.5 },
    { zIndex: 2, blur: 0.08203125, start: 6.25, mid1: 18.75, mid2: 31.25, end: 43.75 }, // avg(1,2)
    { zIndex: 3, blur: 0.109375, start: 12.5, mid1: 25, mid2: 37.5, end: 50 },
    { zIndex: 4, blur: 0.1640625, start: 18.75, mid1: 31.25, mid2: 43.75, end: 56.25 }, // avg(3,4)
    { zIndex: 5, blur: 0.21875, start: 25, mid1: 37.5, mid2: 50, end: 62.5 },
    { zIndex: 6, blur: 0.328125, start: 31.25, mid1: 43.75, mid2: 56.25, end: 68.75 }, // avg(5,6)
    { zIndex: 7, blur: 0.4375, start: 37.5, mid1: 50, mid2: 62.5, end: 75 },
    { zIndex: 8, blur: 0.65625, start: 43.75, mid1: 56.25, mid2: 68.75, end: 81.25 }, // avg(7,8)
    { zIndex: 9, blur: 0.875, start: 50, mid1: 62.5, mid2: 75, end: 87.5 },
    { zIndex: 10, blur: 1.3125, start: 56.25, mid1: 68.75, mid2: 81.25, end: 93.75 }, // avg(9,10)
    { zIndex: 11, blur: 1.75, start: 62.5, mid1: 75, mid2: 87.5, end: 100 },
    { zIndex: 12, blur: 2.625, start: 68.75, mid1: 81.25, mid2: 93.75, end: 100 }, // avg(11,12)
    { zIndex: 13, blur: 3.5, start: 75, mid1: 87.5, mid2: 100, end: 100 },
    { zIndex: 14, blur: 5.25, start: 81.25, mid1: 93.75, mid2: 100, end: 100 }, // avg(13,14)
    { zIndex: 15, blur: 7, start: 87.5, mid1: 100, mid2: 100, end: 100 },
    { zIndex: 16, blur: 7, start: 93.75, mid1: 100, mid2: 100, end: 100 }, // copy of last for symmetry
];

const BottomBlur = () => {
    return (
        <div className="fixed left-0 right-0 bottom-0 h-20 flex-none pointer-events-none z-10">
            <div className="absolute inset-0 overflow-hidden">
                {layers.map(({ zIndex, blur, start, mid1, mid2, end }) => (
                    <div
                        key={zIndex}
                        style={{
                            opacity: 1,
                            position: 'absolute',
                            inset: 0,
                            zIndex,
                            borderRadius: 0,
                            pointerEvents: 'none',
                            backdropFilter: `blur(${blur}px)`,
                            WebkitBackdropFilter: `blur(${blur}px)`,
                            willChange: 'auto',
                            maskImage: `linear-gradient(
            rgba(0, 0, 0, 0) ${start}%,
            rgb(0, 0, 0) ${mid1}%,
            rgb(0, 0, 0) ${mid2}%,
            rgba(0, 0, 0, 0) ${end}%
          )`
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default BottomBlur;