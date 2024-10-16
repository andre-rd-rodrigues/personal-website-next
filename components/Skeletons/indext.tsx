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
      <div className="my-12 h-10 w-10 rounded-full bg-white opacity-40"></div>

      {/* Main Title */}
      <div className="mb-4 h-24 rounded-xl bg-white opacity-40"></div>

      {/* Image */}
      <div className="mt-4 h-64 rounded-xl bg-white opacity-40"></div>

      {/* Title */}
      <div className="mt-24 h-10 w-60 rounded-xl bg-white px-5 opacity-40"></div>

      {/* Text */}
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>
      <div className="mt-4 h-96 rounded-xl bg-white px-5 opacity-40"></div>
    </motion.div>
  );
};

const PostCard = () => {
  return (
    <motion.div
      variants={fadeInVariant}
      exit="hidden"
      className="animate-pulse"
    >
      {/* Image */}
      <div className="mt-4 h-40 rounded-xl bg-white opacity-40"></div>
      {/* Main Title */}
      <div className="mt-4 h-16 rounded-xl bg-white opacity-40">
        <p className="opacity-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic debitis
          aperiam, rerum exercitationem tempora facilis nisi laudantium iusto
          repudiandae natus. Ipsa repudiandae quos hic voluptate accusantium
          modi quisquam, delectus temporibus.
        </p>
      </div>
      {/* Text */}
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>
      <div className="mt-4 h-5 rounded-xl bg-white px-5 opacity-40"></div>

      {/* Button */}
      <div className="flex justify-end">
        <div className="mt-4 h-12 w-36 rounded-full bg-white px-5 opacity-40"></div>
      </div>
    </motion.div>
  );
};

const BlogMainArticleCard = () => {
  return (
    <div className="animate-pulse">
      <div className="group/card border-1 relative flex h-full w-full flex-wrap gap-10 rounded-lg md:flex-nowrap">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="mb-3 h-4 w-full rounded bg-white opacity-40">
            <p className="opacity-0">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              debitis aperiam, rerum exercitationem tempora facilis nisi
              laudantium iusto repudiandae natus. Ipsa repudiandae quos hic
              voluptate accusantium modi quisquam, delectus temporibus.
            </p>
          </div>
          <div className="mb-7 h-16 w-full rounded bg-white opacity-40"></div>
          <div className="mt-7 h-4 w-full rounded bg-white opacity-40"></div>
          <div className="mt-3 h-3 w-full rounded bg-white opacity-40"></div>
          <div className="mt-3 h-3 w-full rounded bg-white opacity-40"></div>
          <div className="flex justify-end">
            <div className="mt-4 h-12 w-36 rounded-full bg-white px-5 opacity-40"></div>
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-48 w-full rounded-md bg-white opacity-40 md:w-1/2"></div>
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
