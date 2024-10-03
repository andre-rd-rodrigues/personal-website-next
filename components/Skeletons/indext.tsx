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
      <div className="my-12 h-10 w-10 rounded-full bg-gray-800"></div>

      {/* Main Title */}
      <div className="mb-4 h-24 rounded-xl bg-gray-800"></div>

      {/* Image */}
      <div className="mt-4 h-64 rounded-xl bg-gray-800"></div>

      {/* Title */}
      <div className="mt-24 h-10 w-60 rounded-xl bg-gray-800 px-5"></div>

      {/* Text */}
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>
      <div className="mt-4 h-96 rounded-xl bg-gray-800 px-5"></div>
    </motion.div>
  );
};

const PostCard = () => {
  return (
    <motion.div
      variants={fadeInVariant}
      exit="hidden"
      className="w-full max-w-full animate-pulse px-6 md:w-[700px]"
    >
      {/* Image */}
      <div className="mt-4 h-40 rounded-xl bg-gray-800"></div>
      {/* Main Title */}
      <div className="mt-4 h-16 rounded-xl bg-gray-800"></div>
      {/* Text */}
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>
      <div className="mt-4 h-5 rounded-xl bg-gray-800 px-5"></div>

      {/* Button */}
      <div className="flex justify-end">
        <div className="mt-4 h-12 w-36 rounded-full bg-gray-800 px-5"></div>
      </div>
    </motion.div>
  );
};

const BlogMainArticleCard = () => {
  return (
    <div className="animate-pulse">
      <div className="group/card border-1 relative flex h-full w-full flex-wrap gap-10 rounded-lg p-8 md:flex-nowrap md:p-12">
        <div className="w-1/2">
          <div className="mb-3 h-4 w-full rounded bg-gray-800"></div>
          <div className="mb-7 h-16 w-full rounded bg-gray-800"></div>
          <div className="mt-7 h-4 w-full rounded bg-gray-800"></div>
          <div className="mt-3 h-3 w-full rounded bg-gray-800"></div>
          <div className="mt-3 h-3 w-full rounded bg-gray-800"></div>
          <div className="flex justify-end">
            <div className="mt-4 h-12 w-36 rounded-full bg-gray-800 px-5"></div>
          </div>
        </div>

        <div className="relative min-h-48 w-1/2 rounded-md bg-gray-800 sm:min-h-full"></div>
      </div>
    </div>
  );
};

const Skeleton = {
  Post,
  PostCard,
  MainPost: BlogMainArticleCard,
};

export default Skeleton;
