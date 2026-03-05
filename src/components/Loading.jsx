import { useEffect, useState } from "react";

export default function Loading() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* Spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-DEFAULT border-t-transparent dark:border-accent-dark mb-4" />

      {/* Message */}
      <p className="text-lg font-medium">Waking up the server...</p>

      {/* Countdown */}
      <p className="text-sm text-gray-500 mt-2">
        {timeLeft > 0
          ? `Please wait... ${timeLeft}s`
          : "Almost ready..."}
      </p>
    </div>
  );
}
