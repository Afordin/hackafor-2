import { Nav } from "./Nav";


export const Header = () => {
  

  return (
    <article className="relative flex flex-col w-full h-full min-h-[100vh]">
        <Nav />
        <div className="flex flex-col items-center justify-center font-bold w-full h-full ">
          <h1 className="text-[200px]">Hackafor</h1>
          <h2 className="text-[48px] mt-[-70px]">
            Una hackaton de programación
          </h2>
        </div>

    </article>
  );
};
