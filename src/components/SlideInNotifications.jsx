import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { CheckSquareOffset, X, XCircle, CheckCircle } from "@phosphor-icons/react";
import { isCompleteTask } from '../Global_state-redux/TaskActions';

const NOTIFICATION_TTL = 3000; // Time-to-live for notifications in milliseconds

const SlideInNotifications = ({ initialIsCompleted, taskId, dispatch }) => {
  const [notifications, setNotifications] = useState([]);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const generateNotificationText = (isCompleted) => {
    return isCompleted ? "Task is marked as complete" : "Task is marked as incomplete";
  };

  const handleNotificationClick = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    dispatch(isCompleteTask({ id: taskId, isCompleted: newCompletedStatus }));

    setNotifications((prev) => [
      { id: Math.random(), text: generateNotificationText(newCompletedStatus) },
      ...prev,
    ]);
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={handleNotificationClick} className={`transition-all ${isCompleted?"text-green-500":"text-red-500"}`}>
        {isCompleted ? (
          <CheckCircle size={32} weight="duotone" className="hover:scale-110 duration-700 transition-all" />
        ) : (
          <XCircle size={32} weight="duotone" className="hover:scale-110 duration-700 transition-all" />
        )}
      </button>
      <div className="flex flex-col gap-1 w-72 fixed bottom-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Notification = ({ text, id, removeNotif }) => {
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
      className="text-white p-2 flex items-start rounded gap-2 text-sm font-medium shadow-lg bg-black/20 backdrop-blur-xl pointer-events-auto"
    >
      <CheckSquareOffset size={20} weight="duotone" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <X size={20} weight="bold" />
      </button>
    </motion.div>
  );
};

SlideInNotifications.propTypes = {
  initialIsCompleted: PropTypes.bool.isRequired,
  taskId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeNotif: PropTypes.func.isRequired,
};

export default SlideInNotifications;