import { useEffect, useState } from "react";

const LoadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 40); // 5000ms / 100 = 50ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-8 bg-gray-200 rounded relative">
      <div
        className="h-8 bg-blue-600 rounded"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        {progress}%
      </div>
    </div>
  );
};

export default LoadingProgressBar;
