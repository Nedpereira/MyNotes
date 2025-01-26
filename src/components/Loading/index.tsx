import { Star } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin">
        <Star className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  );
};

export default Loading;