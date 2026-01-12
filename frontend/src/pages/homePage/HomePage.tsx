import { useGetJobsQuery } from "../../store";

export const HomePage = () => {
  const { data } = useGetJobsQuery();
  console.log(data);

  return (
    <div>
      {data?.result.map((item) => (
        <p>{item.title}</p>
      ))}
    </div>
  );
};
