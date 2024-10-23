import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const SkeletonCard = () => {
  return <div className="shadow drop-shadow-md bg-white rounded-2xl p-5">
    <div className="flex justify-between">
      <section className="flex gap-x-5 items-center">
        <Skeleton circle width={50} height={50} />
        <div className="">
          <Skeleton width={100} height={20} />
          <Skeleton width={150} height={15} />
        </div>
      </section>
      <div className="text-xl ">
        <Skeleton width={24} height={24} />
      </div>
    </div>
    <div className="mt-2">
      <Skeleton width={200} height={20} className="mb-2" />
      <Skeleton width={150} height={15} />
    </div>
    <div className="flex justify-between items-center mt-4">
      <Skeleton width={100} height={20} />
      <Skeleton width={80} height={20} />
    </div>
    <div className="flex justify-between mt-3">
      <Skeleton width={100} height={20} />
      <Skeleton width={100} height={20} />
    </div>
  </div>
}

export default SkeletonCard;