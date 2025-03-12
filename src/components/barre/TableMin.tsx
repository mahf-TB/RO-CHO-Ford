import { useEffect, useRef } from "react";

type RowsTableProps = {
  i: number;
  j: number;
  lambdaI: number;
  lambdaJ: number;
  vArc: number;
};

const TableMin = () => {
  const tableBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
    
      <div ref={tableBodyRef} className="w-full overflow-y-auto flex-grow">
        <section className="container mx-auto p-6 font-sans">
          <div className="w-full overflow-hidden ">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-lg font-semibold  text-left text-violet-50 bg-violet-500   border-b-2 border-black">
                    <th className="px-4 py-2 border border-black text-center">
                      i
                    </th>
                    <th className="px-4 py-2 border border-black text-center">
                      j
                    </th>
                    <th className="px-4 py-2 border border-black text-center">
                      λ<sub>j</sub> - λ<sub>i</sub>
                    </th>
                    <th className="px-4 py-2 border border-black text-center">
                      V(X<sub>j</sub> , X<sub>i</sub>)
                    </th>
                    <th className="px-4 py-2 border border-black text-center">
                      λ<sub>i</sub>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RowsTable
                      key={index}
                      i={index + 1}
                      j={index + 2}
                      lambdaI={0}
                      lambdaJ={Infinity}
                      vArc={0}
                    />
                  ))}
                  <tr>
                    <td colSpan={5} className="h-[80vh] bg-violet-50"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TableMin;

export const RowsTable: React.FC<RowsTableProps> = ({
  i,
  j,
  lambdaI,
  lambdaJ,
  vArc,
}) => {
  return (
    <tr className="text-gray-700 text-base">
      <td className="px-4 py-2  border border-black text-center">{i}</td>
      <td className="px-4 py-2  border border-black text-center">{j}</td>
      <td className="px-4 py-2  border border-black">
        <div className="flex items-center gap-2">
          <span>
            λ<sub>{j}</sub> - λ<sub>{i}</sub>
          </span>
          =
          <span>
            {lambdaJ} - {lambdaI}
          </span>
          = <span>{lambdaJ - lambdaI}</span>
        </div>
      </td>
      <td className="px-4 py-2 border border-black text-center">{vArc}</td>
      <td className="px-4 py-2 border border-black">
        <div className="flex items-center gap-2 ">
          <span>
            λ<sub>{j}</sub>
          </span>
          =
          <span>
            λ<sub>{i}</sub> + V(X<sub>{j}</sub>, X<sub>{i}</sub>)
          </span>
          =
          <span>
            {lambdaI} + {vArc}
          </span>
          = 
          <span>{lambdaI + vArc}</span>
        </div>
      </td>
    </tr>
  );
};
