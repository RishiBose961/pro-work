import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { LoadingImage } from "@/components/Loading/LoadingImage";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";


const IndividualProject = ({ id }: { id: string }) => {
  const { base_url } = CheckEnvironment();
  const {
    isPending,
    error,
    isError,
    data: singlepostData,
  } = useQuery({
    queryKey: ["singlepostDatas", id],
    queryFn: async () => {
      return await fetch(`${base_url}/api/${id}`).then((res) => res.json());
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <span>Loading...</span>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square flex justify-center">
          <LoadingImage
            src={singlepostData?.imageurl}
            alt={singlepostData?.title}
            className="w-48 h-48 rounded-xl lg:object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
          <Badge className="mb-4">{singlepostData?.type}</Badge>
            <h1 className="text-3xl font-bold mb-2">{singlepostData?.title}</h1>
            <p className="text-lg mb-4">{singlepostData?.about}</p>
          </div>
          {/* <Button className="w-full md:w-auto" disabled={!product.inStock}>
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default IndividualProject;
