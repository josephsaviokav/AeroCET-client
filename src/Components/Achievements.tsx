import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import achievement1 from '../../Data/images/achievements/1.jpg';
import achievement2 from '../../Data/images/achievements/2.jpg';
import achievement3 from '../../Data/images/achievements/3.jpeg';

const achievementImages = [achievement1, achievement2, achievement3];

export default function Achievements() {
  const [isActive, setIsActive] = useState(false);
  const teamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  const goTo = () => {
    navigate('/');
  };

  return (
    <div
      onClick={goTo}
      ref={teamRef}
      className={clsx(
        "p-6 w-full lg:m-44 md:my-64 items-center lg:h-[600px] md:h-[700px] sm:h-[700px] flex-1 flex flex-col bg-gray-200 rounded-3xl",
        { 'opacity-0 translate-y-8': !isActive },
        { 'opacity-100 translate-y-0 transition-all duration-700 ease-in-out delay-200': isActive }
      )}
    >
      <h1
        className={clsx(
          "lg:text-4xl text-3xl font-bold text-gray-800 my-12",
          "transition-all duration-500 ease-in-out",
          { 'opacity-0 translate-y-8': !isActive },
          { 'opacity-100 translate-y-0 delay-500': isActive }
        )}
      >
        Achievements
      </h1>

      <div className="flex flex-wrap justify-center gap-6 flex-row">
        {achievementImages.map((image, index) => (
          <div
            key={index}
            className={clsx(
              "flex justify-center items-center",
              "transition-all duration-500 ease-in-out",
              { 'opacity-0 translate-y-8': !isActive },
              { 'opacity-100 translate-y-0': isActive }
            )}
            style={{ transitionDelay: isActive ? `${300 + index * 150}ms` : '0ms' }}
          >
            <div className="w-64 aspect-[3/4] overflow-hidden rounded-xl shadow-lg shrink-0 hover:scale-105 transition-transform duration-300">
              <img
                src={image}
                alt={`Achievement ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
