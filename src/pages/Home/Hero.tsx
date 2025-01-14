import BlurIn from "@/components/ui/blur-in";
import HyperText from "@/components/ui/hyper-text";
import { GithubIcon, Linkedin, X, Youtube } from "lucide-react";
import { AnimatedText } from "./AnimatedText";
import { LoadingImage } from "@/components/Loading/LoadingImage";

const Hero = () => {
  return (
    <div>
      <div className=" grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 flex justify-center items-center text-center py-12">
          <LoadingImage
            src="https://firebasestorage.googleapis.com/v0/b/rishibose1901-f5ff6.appspot.com/o/Screenshot_20240420-165308_WhatsApp.jpg?alt=media&token=f8390c2f-3f16-4225-abfc-e2aa81fb89c3"
            alt="Demo image"
            className=" w-56 h-56 rounded-full"
          />
        </div>
        <div className="col-span-2 px-6 py-12 text-left">
          <BlurIn
            word="  Hi,I'm Rishi Bose"
            className="text-3xl lg:text-7xl font-extrabold text-left
            leading-tight transition-all duration-200 ease-in-out hover:scale-[103%] "
          />

          <HyperText className=" text-xl mt-2">
            A web Developer, Native App Developer MERN Developer
          </HyperText>
          <p className="mt-2 text-md">
            A web developer job is to create websites. While their primary role
            is to ensure the website is visually appealing and easy to navigate,
            many web developers are also responsible for the website performance
            and capacity
          </p>
          <div className=" grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            <AnimatedText
              textitle={"Linkdin"}
              img={<Linkedin />}
              url={
                "https://www.linkedin.com/in/rishi-bose%F0%9F%98%87-4934ba252/"
              }
            />
            <AnimatedText
              textitle={"GitHub"}
              img={<GithubIcon />}
              url={"https://github.com/RishiBose961"}
            />
            <AnimatedText
              textitle={"Twitter"}
              img={<X />}
              url={"https://x.com/IamRishi31"}
            />
            <AnimatedText
              textitle={"Youtube"}
              img={<Youtube />}
              url={"https://www.youtube.com/@darkillerlivegaming"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
