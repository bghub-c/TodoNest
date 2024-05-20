import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes
import { CheckSquareOffset, X, XCircle, CheckCircle } from "@phosphor-icons/react";

const SlideInNotifications = ({ isCompleted }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const generateNotificationText = (isCompleted) => {
    return isCompleted ? "Task is marked as incomplete" : "Task is marked as complete";
  };

  return (
    <div className=" flex items-center justify-center">
      <button
        onClick={() => {
          setNotifications((pv) => [{ id: Math.random(), text: generateNotificationText(isCompleted) }, ...pv]);
        }}
        className=""
      >
        {isCompleted ? (
          <CheckCircle size={32} weight="duotone" className="hover:scale-105 transition-all" />
        ) : (
          <XCircle size={32} weight="duotone" className="hover:scale-105 transition-all" />
        )}
      </button>
      <div className="flex flex-col gap-1 w-72 fixed bottom-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} isComplete={isCompleted} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NOTIFICATION_TTL = 2500;

const Notification = ({ text, id, removeNotif, isComplete }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={` text-black p-2 flex items-start rounded gap-2 text-sm font-medium shadow-lg bg-black/20 backdrop-blur-xl pointer-events-auto`}
    >
      <CheckSquareOffset size={20} weight="duotone" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className={`ml-auto mt-0.5`}>
        <X size={20} weight="bold" />
      </button>
    </motion.div>
  );
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeNotif: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
};
SlideInNotifications.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
};
export default SlideInNotifications;
