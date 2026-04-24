import { motion } from "framer-motion";

export default function Splash() {
  return (
    <div className="splash">

      <motion.div
        className="splashLogo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        📱
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Estudio Pro
      </motion.h1>

    </div>
  );
}