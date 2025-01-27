import * as types from "./types";

export default function Stat({ data }: types.StatProps) {
  const { title, description, icon } = data;
  return (
    <div>
      {icon}
      <h3 className="mb-2 text-2xl font-bold dark:text-white">{title}</h3>
      <p className="font-light text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
