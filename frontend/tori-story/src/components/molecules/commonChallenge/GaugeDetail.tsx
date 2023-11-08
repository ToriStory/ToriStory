import { orange400 } from 'constants/color';
import { useAtomValue } from 'jotai';
import { FlagTriangleRight, Nut, User2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { compCntAtom } from 'stores/challengeStore';
import { cls } from 'utils/cls';

interface GaugeDetailProps {
  maxCnt: number;
  unit: number[];
}

const GaugeDetail = ({ unit, maxCnt }: GaugeDetailProps) => {
  const [compUserWidth, setCompUserWidth] = useState(0);
  const [nutWidth, setNutWidth] = useState(0);
  const compUserRef = useRef<HTMLDivElement | null>(null);
  const compCnt = useAtomValue(compCntAtom);
  const nutRef = useRef<HTMLDivElement | null>(null);
  const compRate: number = maxCnt > 0 ? Math.min((compCnt / maxCnt) * 100, 100) : 0;

  useEffect(() => {
    if (compUserRef.current) {
      const width = compUserRef.current.offsetWidth;
      setCompUserWidth(width);
    }
    if (nutRef.current) {
      const width = nutRef.current.offsetWidth;
      setNutWidth(width);
    }
  }, []);

  return (
    <div className={cls('my-8 w-full h-auto')}>
      <div
        style={{
          paddingLeft: `calc(${compRate}% - ${compUserWidth}px)`,
        }}
      >
        <div ref={compUserRef} className={cls('inline-flex flex-col items-center')}>
          <p className={cls('text-orange-400')}>{compCnt}</p>
          <User2 size={20} color={orange400} viewBox='0 0 24 20' />
        </div>
      </div>
      <div className={cls('w-full relative')}>
        <div className={cls('absolute bottom-0 right-0')}>
          <FlagTriangleRight size={20} color={orange400} viewBox='0 0 24 20' />
        </div>
        <div className={cls('absolute w-full h-4 border-2 rounded-2xl border-orange-400 z-30')} />
        <div
          className={cls(`absolute h-4 rounded-2xl bg-orange-100 } z-20`)}
          style={{
            width: `${compRate}%`,
          }}
        />
        <div>
          {unit?.map((item: number, index: number) => {
            const itemRate: number = maxCnt > 0 ? (item / maxCnt) * 100 : 0;
            return (
              <div key={index} style={{ paddingLeft: `calc(${itemRate}% - ${nutWidth}px)` }}>
                <div
                  ref={nutRef}
                  className={cls(
                    'absolute top-4 text-orange-600 inline-flex flex-col items-center'
                  )}
                >
                  {item}
                  <div>
                    <Nut
                      size={18}
                      viewBox='0 0 24 24'
                      className='transform rotate-45'
                      style={{ opacity: `${Math.max(itemRate, 20)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GaugeDetail;
