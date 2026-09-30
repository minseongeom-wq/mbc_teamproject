import { useEffect, useRef, useState } from 'react';
import { asset } from './asset.js';
import './con2.css';

// Figma coordinates remain together so the layered artwork scales uniformly.
function Art({ file, x, y, w, h, angle = 0, flip = false, crop, alt = '' }) {
    return (
        <div
            className="splatoon-con2__art"
            style={{
                left: x,
                top: y,
                width: w,
                height: h,
                transform: `rotate(${angle}deg) scaleY(${flip ? -1 : 1})`,
            }}
        >
            <img
                src={asset(file)}
                alt={alt}
                style={
                    crop ??
                    (file.endsWith('.svg')
                        ? undefined
                        : { width: '100%', height: '100%', objectFit: 'cover' })
                }
            />
        </div>
    );
}

const weapons = [
    {
        id: 'shooter',
        name: '슈터',
        x: 96.404,
        y: 1110.427,
        h: 157,
        angle: 2.55,
        file: '7cbdf.png',
        art: [13, 21, 142, 80, 0],
        crop: { width: '108.7%', height: '192.31%', left: '-4.35%', top: '-47.12%' },
    },
    {
        id: 'roller',
        name: '롤러',
        x: 317.65,
        y: 1110.713,
        h: 157,
        angle: -2.74,
        file: '87eae.png',
        art: [22.543, 5.24, 125.83, 118.623, 10.24],
    },
    {
        id: 'charger',
        name: '차저',
        x: 574.008,
        y: 1095.704,
        h: 172,
        angle: -2.74,
        file: '6188c.png',
        art: [-0.812, 38.586, 176.797, 57.017, -22.44],
        crop: { width: '100%', height: '310.08%', left: 0, top: '-110.85%' },
    },
    {
        id: 'slosher',
        name: '슬로셔',
        x: 831.008,
        y: 1094.704,
        h: 172,
        angle: -2.74,
        file: '6871d.png',
        art: [36.901, 8.098, 99, 114, 16.53],
        crop: { width: '123.65%', height: '160.26%', left: '-15.63%', top: '-26.82%' },
    },
    {
        id: 'splatling',
        name: '스피너',
        x: 1094.673,
        y: 1088.743,
        h: 172,
        angle: 7.67,
        file: 'f87bc.png',
        art: [5, 1, 159, 119, 0],
        crop: { width: '100%', height: '133.68%', left: 0, top: '-16.84%' },
    },
    {
        id: 'dualies',
        name: '머누버',
        x: 1357.652,
        y: 1081.329,
        h: 172,
        angle: 2.49,
        file: '96b81.png',
        art: [16.232, -6.096, 138.289, 144.575, 20.89],
        crop: { width: '123.95%', height: '118.56%', left: '-9.97%', top: '-7.19%' },
    },
    {
        id: 'stringer',
        name: '스트링거',
        x: 1606.709,
        y: 1053.661,
        h: 172,
        angle: -6.16,
        file: 'ad161.png',
        art: [10.405, 23.113, 148.991, 131.388, -44.89],
        crop: { width: '101.88%', height: '100%', left: '-1.88%', top: 0 },
    },
];
const panels = [
    ['6c7b4.svg', 6.58, 138.818, 352.901, 167.205, -177.51, true],
    ['7b2eb.svg', 370.31, 114.745, 338.497, 175.084, -177.51, true],
    ['a0599.svg', -4.208, 280.117, 360.416, 135.767, -177.51, true],
    ['bdbb7.svg', 361.41, 274.429, 345.06, 165.279, -2.49, false],
    ['4ab08.svg', 4.1, 396.5, 344.672, 207, 0, false],
    ['67c20.svg', 363.1, 429, 321, 203, 180, true],
];
function StatLabel({ label, x, y, size, angle, value = false }) {
    const className = `splatoon-con2__stat${value ? ' splatoon-con2__stat--value' : ''}`;

    if (label === 'True damage') {
        return (
            <div className="splatoon-con2__true-damage" style={{ left: x - 7.3, top: y }}>
                <p
                    className={className}
                    style={{ fontSize: size, transform: `rotate(${angle}deg) scaleX(.85)` }}
                >
                    {label}
                </p>
            </div>
        );
    }

    return (
        <p
            className={className}
            style={{
                left: x,
                top: y,
                fontSize: size,
                transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
        >
            {label}
        </p>
    );
}

const shooterStats = [
    ['Damge', 206.64, 156.82, 48, -5.36],
    ['Range', 545.14, 135, 48, -4.1],
    ['True damage', 206.5, 421, 40, 5.2],
    ['Charge', 539.09, 284.11, 40, -3.91],
    ['Difficulty', 222.68, 301, 40, -3.91],
    ['Role', 533.43, 449, 40, 1.96],
    ['ALL-rounder', 526.4, 510.49, 40, 1.96, true],
    ['LOW', 541.93, 349, 40, 1.96, true],
    ['36', 206.83, 229.36, 36, 2, true],
    ['3', 201.36, 498.45, 36, 2, true],
    ['11.56', 541.86, 205.3, 36, 2, true],
];

function ShooterDetails() {
    return (
        <>
            <Art file="e1aa7.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            <div className="splatoon-con2__shooter-paint-projectile" aria-hidden="true" />
            <div className="splatoon-con2__shooter-paint">
                <Art
                    file="42855.png"
                    x={650}
                    y={0}
                    w={620}
                    h={690}
                    angle={-2.89}
                    crop={{ width: '185%', height: '135.88%', left: 0, top: '-22.53%' }}
                />
            </div>
            {panels.map(([file, x, y, w, h, angle, flip]) => (
                <Art key={file} {...{ file, x, y, w, h, angle, flip }} />
            ))}
            {shooterStats.map(([label, x, y, size, angle, value]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle, value }} />
            ))}
            <Art
                file="6ce8c.png"
                x={266}
                y={349}
                w={72}
                h={57}
                crop={{ width: '360.97%', height: '190.35%', left: '-14.68%', top: '-41.65%' }}
                alt="난이도 낮음"
            />
            <div className="splatoon-con2__shooter-character-reveal">
                <Art
                    file="b1bca.png"
                    x={415.919}
                    y={-131.94}
                    w={825.997}
                    h={721.483}
                    angle={9.31}
                    alt="스플랫 슈터로 보라색 잉크를 발사하는 캐릭터"
                />
            </div>
        </>
    );
}

const rollerStats = [
    ['Damge', 206.64, 156.82, 48, -5.36],
    ['Range', 545.14, 135, 48, -4.1],
    ['True damage', 206.5, 421, 40, 5.2],
    ['Charge', 539.09, 284.11, 40, -3.91],
    ['Difficulty', 222.68, 301, 40, -3.91],
    ['Role', 533.43, 449, 40, 1.96],
    ['ATTACKER', 526.4, 511, 40, 1.96, true],
    ['MIDDLE', 542.43, 348.11, 40, 1.96, true],
    ['35~150', 207.33, 228, 36, 2, true],
    ['1', 201.36, 498.56, 36, 2, true],
    ['7.7', 542.36, 205.9, 36, 2, true],
];

function RollerDetails() {
    return (
        <>
            <Art file="b9edd.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            <div className="splatoon-con2__roller-paint">
                <Art
                    file="69621.png"
                    x={539.726}
                    y={30.39}
                    w={708.844}
                    h={696.947}
                    angle={-1.29}
                    crop={{ width: '187.49%', height: '169.74%', left: '-49.39%', top: '-56.39%' }}
                />
            </div>
            {panels.map(([file, x, y, w, h, angle, flip]) => (
                <Art key={file} {...{ file, x, y, w, h, angle, flip }} />
            ))}
            {rollerStats.slice(0, 6).map(([label, x, y, size, angle]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle }} />
            ))}
            <Art
                file="31c8e.png"
                x={629.523}
                y={-34.835}
                w={628.077}
                h={631.102}
                angle={-5.36}
                crop={{ width: '102.57%', height: '102.08%', left: '-1.12%', top: '-2.08%' }}
                alt="Splat Roller"
            />
            {rollerStats.slice(6).map(([label, x, y, size, angle]) => (
                <p
                    key={label}
                    className="splatoon-con2__stat splatoon-con2__stat--value"
                    style={{
                        left: x,
                        top: y,
                        fontSize: size,
                        transform: 'translateX(-50%) rotate(' + angle + 'deg)',
                    }}
                >
                    {label}
                </p>
            ))}
            <Art
                file="6ce8c.png"
                x={266}
                y={349}
                w={72}
                h={57}
                crop={{ width: '358.96%', height: '189.69%', left: '-127.73%', top: '-42.91%' }}
                alt="Normal"
            />
        </>
    );
}

const chargerStats = [
    ...rollerStats.slice(0, 6),
    ['DEFENCER', 525.9, 511.38, 40, 1.96, true],
    ['HIGH', 541.93, 348.86, 40, 1.96, true],
    ['160', 209.35, 230, 36, 2, true],
    ['1', 201.36, 498.56, 36, 2, true],
    ['25.75', 541.86, 205.09, 36, 2, true],
];

function ChargerDetails() {
    const panel = (index) => {
        const [file, x, y, w, h, angle, flip] = panels[index];
        return <Art key={file} {...{ file, x, y, w, h, angle, flip }} />;
    };
    return (
        <>
            <Art file="45d87.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            {[0, 2, 4, 5].map(panel)}
            <div className="splatoon-con2__charger-paint">
                <Art
                    file="dceb1.png"
                    x={650}
                    y={24}
                    w={606}
                    h={696}
                    angle={-0.34}
                    crop={{ width: '211.78%', height: '182.39%', left: '-53.69%', top: '-50.75%' }}
                />
            </div>
            {[1, 3].map(panel)}
            <Art
                file="6a993.png"
                x={370.599}
                y={43.934}
                w={968.891}
                h={497.228}
                angle={-43.31}
                crop={{ width: '116.16%', height: '114.78%', left: '-8.18%', top: '-8.48%' }}
                alt="스플랫 차저를 조준하는 캐릭터"
            />
            {chargerStats.map(([label, x, y, size, angle, value]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle, value }} />
            ))}
            <Art
                file="6ce8c.png"
                x={265}
                y={349}
                w={72}
                h={53}
                crop={{ width: '358.96%', height: '204.01%', left: '-242.77%', top: '-48.98%' }}
                alt="난이도 높음"
            />
        </>
    );
}

const slosherStats = [
    ['Damge', 206.64, 156.82, 48, -5.36],
    ['Range', 545.14, 135, 48, -4.1],
    ['True damage', 206.5, 421, 40, 5.2],
    ['Charge', 539.09, 284.11, 40, -3.91],
    ['Difficulty', 222.68, 301, 40, -3.91],
    ['Role', 533.43, 449, 40, 1.96],
    ['ATTACKER', 526.4, 511, 40, 1.96, true],
    ['LOW', 541.93, 349, 40, 1.96, true],
    ['70 / 50', 201.86, 228.74, 36, 2, true],
    ['2', 200.86, 498.42, 36, 2, true],
    ['14.24', 541.86, 205.2, 36, 2, true],
];

function SlosherDetails() {
    return (
        <>
            <Art file="e934a.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            <div className="splatoon-con2__slosher-paint">
                <Art
                    file="e184f.png"
                    x={456.171}
                    y={20.807}
                    w={797.215}
                    h={709.083}
                    angle={-0.87}
                    crop={{ width: '181.91%', height: '153.28%', left: '-32.85%', top: '-47.42%' }}
                />
            </div>
            {panels.map(([file, x, y, w, h, angle, flip]) => (
                <Art key={file} {...{ file, x, y, w, h, angle, flip }} />
            ))}
            <Art
                file="c2b50.png"
                x={576.855}
                y={24.559}
                w={666.22}
                h={649.959}
                angle={1.28}
                crop={{ width: '108.47%', height: '111.18%', left: '-4.35%', top: '-1.52%' }}
                alt="버킷 슬로셔를 든 캐릭터"
            />
            {slosherStats.map(([label, x, y, size, angle, value]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle, value }} />
            ))}
            <Art
                file="6ce8c.png"
                x={265}
                y={349}
                w={72}
                h={57}
                crop={{ width: '358.96%', height: '189.69%', left: '-127.73%', top: '-42.91%' }}
                alt="난이도 낮음"
            />
        </>
    );
}

const splatlingStats = [
    ['Damge', 206.64, 156.82, 48, -5.36],
    ['Range', 545.14, 135, 48, -4.1],
    ['True damage', 206.5, 421, 40, 5.2],
    ['Charge', 539.09, 284.11, 40, -3.91],
    ['Difficulty', 222.68, 301, 40, -3.91],
    ['Role', 533.43, 449, 40, 1.96],
    ['DEFENCER', 525.9, 511.38, 40, 1.96, true],
    ['HIGH', 541.93, 348.86, 40, 1.96, true],
    ['30', 202.36, 230.03, 36, 2, true],
    ['4', 201.36, 498.42, 36, 2, true],
    ['19.01', 542.36, 205.3, 36, 2, true],
];

function SplatlingDetails() {
    return (
        <>
            <Art file="70d4b.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            <div className="splatoon-con2__splatling-paint">
                <Art
                    file="94b3e.png"
                    x={615.877}
                    y={29.255}
                    w={632.662}
                    h={678.45}
                    angle={-0.85}
                    crop={{ width: '160.91%', height: '150.05%', left: '-43.23%', top: '-34.05%' }}
                />
            </div>
            {panels.map(([file, x, y, w, h, angle, flip]) => (
                <Art key={file} {...{ file, x, y, w, h, angle, flip }} />
            ))}
            {splatlingStats.map(([label, x, y, size, angle, value]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle, value }} />
            ))}
            <Art
                file="6ce8c.png"
                x={265}
                y={349}
                w={72}
                h={53}
                crop={{ width: '358.96%', height: '204.01%', left: '-242.77%', top: '-48.98%' }}
                alt="난이도 높음"
            />
            <Art
                file="434b5.png"
                x={622.913}
                y={-21.493}
                w={644.496}
                h={626.959}
                angle={-3.77}
                crop={{ width: '106.63%', height: '109.62%', left: '-4.34%', top: '-6.82%' }}
                alt="배럴 스피너를 든 캐릭터"
            />
        </>
    );
}

const dualiesStats = [
    ['Damge', 206.64, 156.82, 48, -5.36],
    ['Range', 545.14, 135, 48, -4.1],
    ['True damage', 206.5, 421, 40, 5.2],
    ['Charge', 539.09, 284.11, 40, -3.91],
    ['Difficulty', 222.68, 301, 40, -3.91],
    ['Role', 533.43, 449, 40, 1.96],
    ['ALL-rounder', 526.4, 510.49, 40, 1.96, true],
    ['LOW', 541.93, 349, 40, 1.96, true],
    ['30', 202.36, 230.03, 36, 2, true],
    ['4', 201.36, 498.42, 36, 2, true],
    ['10.89', 541.86, 205.16, 36, 2, true],
];

function DualiesDetails() {
    return (
        <>
            <Art file="fd54f.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            <div className="splatoon-con2__dualies-paint">
                <Art
                    file="7f459.png"
                    x={492}
                    y={18}
                    w={759}
                    h={957}
                    crop={{ width: '165.22%', height: '131.03%', left: '-24.64%', top: '-31.03%' }}
                />
            </div>
            {panels.map(([file, x, y, w, h, angle, flip]) => (
                <Art key={file} {...{ file, x, y, w, h, angle, flip }} />
            ))}
            {dualiesStats.map(([label, x, y, size, angle, value]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle, value }} />
            ))}
            <Art
                file="6ce8c.png"
                x={265}
                y={349}
                w={72}
                h={57}
                crop={{ width: '358.96%', height: '189.69%', left: '-127.73%', top: '-42.91%' }}
                alt="난이도 낮음"
            />
            <Art
                file="8ab95.png"
                x={666.193}
                y={73.652}
                w={596.443}
                h={509.706}
                angle={16.18}
                crop={{ width: '119.77%', height: '102.58%', left: '-12.09%', top: 0 }}
                alt="스플랫 머누버를 든 캐릭터"
            />
        </>
    );
}

const stringerStats = [
    ['Damge', 206.64, 156.82, 48, -5.36],
    ['Range', 545.14, 135, 48, -4.1],
    ['True damage', 206.5, 421, 40, 5.2],
    ['Charge', 539.09, 284.11, 40, -3.91],
    ['Difficulty', 222.68, 301, 40, -3.91],
    ['Role', 533.43, 449, 40, 1.96],
    ['DEFENCER', 525.9, 511.38, 40, 1.96, true],
    ['HIGH', 541.93, 348.86, 40, 1.96, true],
    ['105', 202.36, 229.76, 36, 2, true],
    ['1 / 3', 201.36, 497.72, 36, 2, true],
    ['23.73', 541.86, 205.13, 36, 2, true],
];

function StringerDetails() {
    const panel = (index) => {
        const [file, x, y, w, h, angle, flip] = panels[index];
        return <Art key={file} {...{ file, x, y, w, h, angle, flip }} />;
    };

    return (
        <>
            <Art file="1d25d.svg" x={-19} y={-12.677} w={1282} h={746.73} />
            {[0, 2, 4].map(panel)}
            <div className="splatoon-con2__stringer-paint">
                <Art
                    file="69621.png"
                    x={490.546}
                    y={22.476}
                    w={751.574}
                    h={706.966}
                    angle={178.58}
                    crop={{ width: '176.83%', height: '167.33%', left: '-50.56%', top: '-42.56%' }}
                />
            </div>
            {[1, 3, 5].map(panel)}
            {stringerStats.slice(0, 6).map(([label, x, y, size, angle]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle }} />
            ))}
            <Art
                file="72dc0.png"
                x={562.958}
                y={23.882}
                w={714.325}
                h={559.454}
                angle={-0.39}
                crop={{ width: '126.89%', height: '111.8%', left: '-14.45%', top: '-5.15%' }}
                alt="트라이 스트링거를 든 캐릭터"
            />
            {stringerStats.slice(6).map(([label, x, y, size, angle, value]) => (
                <StatLabel key={label} {...{ label, x, y, size, angle, value }} />
            ))}
            <Art
                file="6ce8c.png"
                x={265}
                y={349}
                w={72}
                h={53}
                crop={{ width: '358.96%', height: '204.01%', left: '-242.77%', top: '-48.98%' }}
                alt="난이도 높음"
            />
        </>
    );
}

export default function Con2() {
    const container = useRef(null);
    const title = useRef(null);
    const [scale, setScale] = useState(1);
    const [isTitleRevealed, setIsTitleRevealed] = useState(false);
    // Additional weapon panels can be registered here when their designs arrive.
    const [selectedWeapon, setSelectedWeapon] = useState('shooter');
    const isShooter = selectedWeapon === 'shooter';
    const isRoller = selectedWeapon === 'roller';
    const isCharger = selectedWeapon === 'charger';
    const isSlosher = selectedWeapon === 'slosher';
    const isSplatling = selectedWeapon === 'splatling';
    const isDualies = selectedWeapon === 'dualies';
    const isStringer = selectedWeapon === 'stringer';
    const hasAlternateLayout =
        isShooter || isRoller || isCharger || isSlosher || isSplatling || isDualies || isStringer;
    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
        observer.observe(container.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const target = title.current;
        if (!target) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setIsTitleRevealed(true);
                observer.disconnect();
            },
            { threshold: 0.2 }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, []);
    const startWeaponInk = (event) => {
        const button = event.currentTarget;
        button.classList.remove('is-ink-returning');
        button.dataset.inkComplete = 'false';
    };
    const stopWeaponInk = (event) => {
        const button = event.currentTarget;
        const isComplete = button.dataset.inkComplete === 'true';
        delete button.dataset.inkComplete;
        if (!isComplete) return;
        button.classList.add('is-ink-returning');
    };
    const finishWeaponInk = (event) => {
        if (event.animationName !== 'splatoon-con2-weapon-ink-fill') return;
        const button = event.currentTarget;
        const pseudoElement = event.nativeEvent.pseudoElement;
        if (pseudoElement === '::before' && button.matches(':hover'))
            button.dataset.inkComplete = 'true';
        if (pseudoElement === '::after' && button.classList.contains('is-ink-returning'))
            button.classList.remove('is-ink-returning');
    };
    return (
        <section
            id="con2"
            ref={container}
            className={`splatoon-con2 splatoon-con2--${selectedWeapon}${isTitleRevealed ? ' is-entered' : ''}`}
            aria-labelledby="splatoon-con2-title"
        >
            <div className="splatoon-con2__stage" style={{ transform: `scale(${scale})` }}>
                <div className="splatoon-con2__background">
                    <img src={asset('222a5.png')} alt="" />
                </div>
                <div className="splatoon-con2__inner">
                    <h2
                        ref={title}
                        id="splatoon-con2-title"
                        className={`splatoon-con2__title splatoon-title-splat${isTitleRevealed ? ' is-revealed' : ''}`}
                    >
                        색칠하는 방식을 선택해
                        <br />
                        나만의 무기를 골라보자!
                    </h2>
                    <div
                        id="weapon-details"
                        role="region"
                        aria-labelledby="weapon-name"
                        aria-live="polite"
                    >
                        <div className="splatoon-con2__name">
                            <h3 id="weapon-name">
                                {isStringer
                                    ? '스트링거'
                                    : isDualies
                                      ? '스플랫 머누버'
                                      : isSplatling
                                        ? '배럴 스피너'
                                        : isSlosher
                                          ? '버킷 슬로셔'
                                          : isCharger
                                            ? '스플랫 차저'
                                            : isRoller
                                              ? '스플랫 롤러'
                                              : '스플랫 슈터'}
                            </h3>
                            <p>
                                {isStringer
                                    ? 'Tri-Stringer'
                                    : isDualies
                                      ? 'Splat Dualies'
                                      : isSplatling
                                        ? 'Heavy Splatling'
                                        : isSlosher
                                          ? 'Slosher'
                                          : isCharger
                                            ? 'Splat Charger'
                                            : isRoller
                                              ? 'Splat Roller'
                                              : 'Splattershot'}
                            </p>
                        </div>
                        <div className="splatoon-con2__details">
                            {isStringer ? (
                                <StringerDetails />
                            ) : isDualies ? (
                                <DualiesDetails />
                            ) : isSplatling ? (
                                <SplatlingDetails />
                            ) : isSlosher ? (
                                <SlosherDetails />
                            ) : isCharger ? (
                                <ChargerDetails />
                            ) : isRoller ? (
                                <RollerDetails />
                            ) : (
                                <ShooterDetails />
                            )}
                        </div>
                    </div>
                    <Art
                        file={hasAlternateLayout ? 'a6a61.svg' : '61118.svg'}
                        x={hasAlternateLayout ? 44 : 36}
                        y={hasAlternateLayout ? 969.956 : 977.456}
                        w={hasAlternateLayout ? 1843 : 1840}
                        h={hasAlternateLayout ? 327.031 : 327.042}
                    />
                    <Art
                        file="55c2f.png"
                        x={hasAlternateLayout ? 1776.981 : 1516.677}
                        y={isShooter ? 978.981 : hasAlternateLayout ? 985.981 : 1014.677}
                        w={hasAlternateLayout ? 92.594 : 48.772}
                        h={hasAlternateLayout ? 92.594 : 48.772}
                        angle={-9.46}
                    />
                    <div role="group" aria-label="무기 선택">
                        {weapons.map(({ id, name, x, y, h, angle, file, art, crop }) => (
                            <button
                                key={id}
                                type="button"
                                className={`splatoon-con2__weapon splatoon-con2__weapon--${id}`}
                                style={{
                                    left: x,
                                    top: hasAlternateLayout ? y - 7.5 : y,
                                    height: h,
                                    transform: `rotate(${angle}deg)`,
                                }}
                                aria-label={name}
                                aria-pressed={selectedWeapon === id}
                                aria-controls="weapon-details"
                                onMouseEnter={startWeaponInk}
                                onMouseLeave={stopWeaponInk}
                                onAnimationEnd={finishWeaponInk}
                                onClick={() => setSelectedWeapon(id)}
                            >
                                <Art
                                    file={file}
                                    x={hasAlternateLayout && id === 'slosher' ? 35 : art[0]}
                                    y={hasAlternateLayout && id === 'slosher' ? 6 : art[1]}
                                    w={art[2]}
                                    h={art[3]}
                                    angle={hasAlternateLayout && id === 'slosher' ? 0 : art[4]}
                                    crop={crop}
                                />
                                <Art
                                    file="2e1a4.png"
                                    x={56}
                                    y={
                                        hasAlternateLayout
                                            ? h === 157
                                                ? 105
                                                : 120
                                            : h === 157
                                              ? 102
                                              : 117
                                    }
                                    w={58}
                                    h={42}
                                    crop={{
                                        width: '209.42%',
                                        height: '289.86%',
                                        left: '-57.07%',
                                        top: '-103.62%',
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
