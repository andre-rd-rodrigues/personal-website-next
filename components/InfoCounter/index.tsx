import { useInView } from 'react-intersection-observer';
import { CountUp } from 'use-count-up';

const InfoCounter = ({ label, end }: { label: string; end: number }) => {
  const [counterRef, counterInView] = useInView();

  return (
    <div>
      <p ref={counterRef} className="text-8xl font-thin text-purple-500">
        {'+'} <CountUp isCounting={counterInView} end={end} duration={3} />
      </p>
      <p className="mt-3">{label}</p>
    </div>
  );
};

export default InfoCounter;
