import { orange400 } from 'constants/color';
import { FlagTriangleRight, Nut, User2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cls } from 'utils/cls';

interface GuageDetailProps {
  compCnt: number;
  maxCnt: number;
  unit: number[];
}

const GuageDetail = ({ compCnt, unit, maxCnt }: GuageDetailProps) => {
  const [compUserWidth, setCompUserWidth] = useState(0);
  const [nutWidth, setNutWidth] = useState(0);
  const compUserRef = useRef<HTMLDivElement | null>(null);
  const nutRef = useRef<HTMLDivElement | null>(null);
  const compRate: number = maxCnt > 0 ? (compCnt / maxCnt) * 100 : 0;

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
    <div className={cls('my-8 w-full h-[120px]')}>
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
            // 마지막 요소인 참여자수 제외
            if (index >= unit.length - 1) {
              return null;
            }

            const itemRate: number = maxCnt > 0 ? (item / maxCnt) * 100 : 0;
            return (
              <div style={{ paddingLeft: `calc(${itemRate}% - ${nutWidth}px)` }}>
                <div
                  ref={nutRef}
                  className={cls(
                    'absolute top-4 text-orange-600 inline-flex flex-col items-center'
                  )}
                >
                  {item}
                  <div className={cls('animate-bounce')}>
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

export default GuageDetail;
