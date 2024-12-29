import Meteors from "@/components/ui/meteors";

const skills = [
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "Reactjs / Expo",
  },
  {
    id: 3,
    name: "TailWindCSS",
  },
  {
    id: 4,
    name: "Node.js",
  },
  {
    id: 5,
    name: "TypeScript",
  },
  {
    id: 6,
    name: "ReCharts",
  },
  {
    id: 7,
    name: "Git",
  },
  {
    id: 8,
    name: "MongoDB / PostgreSQL"
  },
];

const Work = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-8 gap-3">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="relative flex h-20 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
        >
          <Meteors number={30} />
          <span
            className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b
           from-black to-gray-300/80 bg-clip-text text-center
           leading-none text-transparent text-xl uppercase font-bold dark:from-white dark:to-slate-900/10"
          >
            {skill.name}
          </span>
          {/* <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 text-center">
            {skill.description}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default Work;
