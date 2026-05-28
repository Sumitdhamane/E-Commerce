interface DashboardCardProps {

  title: string;

  value: number | string;
}

const DashboardCard = ({
  title,
  value,
}: DashboardCardProps) => {

  return (

    <div
      className="
        bg-slate-900
        p-6
        rounded-2xl
        shadow-lg
      "
    >

      <h2
        className="
          text-slate-400
          text-lg
          mb-4
        "
      >
        {title}
      </h2>

      <h1
        className="
          text-white
          text-4xl
          font-bold
        "
      >
        {value}
      </h1>

    </div>

  );
};

export default DashboardCard;