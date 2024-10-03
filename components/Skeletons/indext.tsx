import { fadeInVariant } from '@/motion/motionVariants';
import { motion } from 'framer-motion';

const Post = () => {
  return (
    <motion.div
      variants={fadeInVariant}
      exit="hidden"
      className="mx-0 animate-pulse sm:mx-32"
    >
      {/* Arrow */}
      <div className="my-12 h-10 w-10 rounded-full bg-gray-200"></div>

      {/* Main Title */}
      <div className="mb-4 h-24 rounded-xl bg-gray-200"></div>

      {/* Image */}
      <div className="mt-4 h-64 rounded-xl bg-gray-200"></div>

      {/* Title */}
      <div className="mt-24 h-10 w-60 rounded-xl bg-gray-200 px-5"></div>

      {/* Text */}
      <div className="mt-4 h-5 rounded-xl bg-gray-200 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-200 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-200 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-200 px-5"></div>
      <div className="mt-4 h-96 rounded-xl bg-gray-200 px-5"></div>
    </motion.div>
  );
};

const PostCard = () => {
  return <div>Skeletons</div>;
};

const Skeleton = {
  Post,
  PostCard,
};

export default Skeleton;
