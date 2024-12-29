

interface TitlePage{
    title: string
}
const TitlePage = ({title}:TitlePage) => {
  return (
    <div>
        <p className=" font-mono font-bold text-xl p-2">{title}</p>
    </div>
  )
}

export default TitlePage