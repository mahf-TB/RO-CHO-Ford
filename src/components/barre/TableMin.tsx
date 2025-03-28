import useSideStore from "@/store/sideStore";
import { useEffect, useRef } from "react";

type RowsTableProps = {
  i: string;
  j: string;
  lambdaI: number;
  lambdaJ: number;
  vArc: number;
};

const TableMin = () => {
  const { resTable } = useSideStore();
  const tableBodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
    }
  }, [resTable]);

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
                  {resTable.length === 0 ? (
                    <tr>
                      <td colSpan={5} className=" bg-violet-50 ">
                        <div className="flex items-start h-full justify-center text-sm font-bold text-gray-500 my-2">
                          Tableaux est vide...
                        </div>
                      </td>
                    </tr>
                  ) : (
                    resTable.map((item, index) => (
                      <RowsTable
                        key={index}
                        i={item.i}
                        j={item.j}
                        lambdaI={item.lambdaI}
                        lambdaJ={item.lambdaJ}
                        vArc={item.vArc}
                      />
                    ))
                  )}
                  <tr>
                    <td colSpan={5} className="h-[80vh] bg-violet-50 ">
                      <div className="flex items-start h-full justify-center text-sm text-gray-500 mt-5">
                        {resTable.length > 0 &&
                          `Affichage de ${resTable.length} lignes`}
                      </div>
                    </td>
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
        {lambdaJ - lambdaI > vArc ? (
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
            =<span>{lambdaI + vArc}</span>
          </div>
        ) : (
          "Aucun"
        )}
      </td>
    </tr>
  );
};
