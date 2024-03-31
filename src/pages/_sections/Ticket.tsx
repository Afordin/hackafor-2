import 'atropos/css';

import { FC } from 'react';
import { Atropos } from 'atropos/react';

interface TicketProps {
  avatar?: string;
  name?: string;
  number?: number;
  username?: string;
}

export const Ticket: FC<TicketProps> = ({
  name = 'tpicj aforcita',
  number = 0,
  username = 'afor_digital',
  avatar = 'https://www.figma.com/file/oB8OIzcBcSUIBXDmmp46mb/image/553aae256d49bfd7691b401b30ec005149d24fd6'
}) => {
  return (
    <section>
      <div className="container mx-auto my-20">
        <h3 className="text-[30px] text-center">Descarga tu ticket y compártelo en redes sociales</h3>
        <div className="w-full mx-auto mt-15">
          <Atropos
            shadowScale={1.1}
            innerClassName="rounded-2xl"
            className="w-[720px] bg-transparent mx-auto h-[310px] rounded-2xl shadow-[0_0px_90px_-10px_#c138b830] hover:shadow-none"
          >
            <div className="ticket-bg flex h-full rounded-2xl border-2 border-[#171717]">
              <div className="flex flex-col justify-between p-[30px] pb-[17px] w-full rounded-2xl bg-cBlack">
                <div className="flex gap-5">
                  <img
                    className="w-27 aspect-square rounded-full p-[0.1rem] bg-gradient-to-rb from-[#FC1C37] to-[#AD40E1]"
                    src={avatar}
                    alt={`Avatar de ${name}`}
                  />
                  <div className="flex flex-col gap-1 justify-center">
                    <h3 data-atropos-offset="5" className={`font-bold text-[35px]`}>
                      {name}
                    </h3>
                    <span data-atropos-offset="3" className={`flex gap-1 items-center`}>
                      <span className="i-bi-discord w-6 aspect-square " />
                      <p className="font-bold text-lg">@{username}</p>
                    </span>
                  </div>
                </div>
                <div data-atropos-offset="3" className="flex justify-between items-end">
                  <div className="flex gap-1 items-end gap-2">
                    <p className="flex flex-col items-center text-[28px] leading-tight">
                      <span className="font-100">NOV</span>
                      <span className="font-bold">20</span>
                    </p>
                    <div>{/* what circles suposed to be? ?? */}</div>
                  </div>
                  <p className="text-[28px] leading-none">#{number.toString().padStart(5, '0')}</p>
                </div>
              </div>

              <div className="w-80 h-full flex items-center justify-center bg-gradient-to-rb from-[#FC1C37] to-[#AD40E1] rounded-2xl rounded-lt-0 rounded-lb-0">
                <img
                  data-atropos-offset="5"
                  className="w-full p-7 invert-100"
                  src="./images/hackafor_year.webp"
                  alt="Hackafor 2024 Announcement Logo"
                />
              </div>
            </div>
          </Atropos>
        </div>
      </div>
    </section>
  );
};
