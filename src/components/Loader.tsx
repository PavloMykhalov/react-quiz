import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Oval
        color="black"
        secondaryColor="gray"
        height={50}
        width={50}
        wrapperClass="mx-auto"
      />
    </div>
  );
}