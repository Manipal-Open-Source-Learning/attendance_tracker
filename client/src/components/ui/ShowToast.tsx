import { useEffect, useRef, useState, useCallback, type JSX, type ReactNode } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { CircleCheckIcon, AlertCircleIcon, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

const iconMap: Record<ToastType, JSX.Element> = {
  success: <CircleCheckIcon className="text-green-600" />,
  error: <AlertCircleIcon className="text-red-600" />,
  info: <InfoIcon className="text-blue-500" />,
  warning: <TriangleAlertIcon className="text-yellow-400" />,
};

const bgMap: Record<ToastType, string> = {
  success: 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0) 80%)',
  error: 'linear-gradient(135deg, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0) 80%)',
  info: 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 80%)',
  warning: 'linear-gradient(135deg, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0) 80%)',
};

interface CustomToastProps {
  t: string | number;
  type: ToastType;
  duration: number;
  children: ReactNode;
}

const CustomToast = ({ t, type, duration, children }: CustomToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingTime = useRef<number>(duration);
  const startTimestamp = useRef<number>(Date.now());

  const startTimer = useCallback(() => {
    if (duration === Infinity) return;

    startTimestamp.current = Date.now();
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => toast.dismiss(t), 300);
    }, remainingTime.current);
  }, [t, duration]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimestamp.current;
      remainingTime.current -= elapsed;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [startTimer]);

  return (
    <motion.div
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      className="relative h-auto min-h-14 w-[360px] flex items-center px-5 py-3 rounded-lg gap-2 group"
      style={{
        backgroundImage: bgMap[type],
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay',
      }}
      initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10,
        filter: isVisible ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
    >
      <XIcon
        className="absolute top-2 right-2 p-1 rounded hover:bg-white/0 transition w-6 h-6 text-white/70 group-hover:text-accent duration-300 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toast.dismiss(t);
        }}
      />
      {iconMap[type]}
      <div className="text-white font-satoshi font-medium text-sm">{children}</div>
    </motion.div>
  );
};

const ShowToast = ({
  type = "info",
  duration = 4000,
  children,
}: {
  type?: ToastType;
  duration?: number;
  children: ReactNode;
}) => {
  toast.custom((t) => (
    <CustomToast t={t} type={type} duration={duration}>
      {children}
    </CustomToast>
  ));
};

export default ShowToast;
