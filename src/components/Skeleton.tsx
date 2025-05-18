export default function Skeleton({label}: any) {
    return (
      <div className="flex flex-1 justify-center items-center h-screen w-full">
        <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
          <h2 className="text-white text-xl font-semibold text-center mb-4 w-full">
            {label}
          </h2>
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="border-b border-white/30">
                <th className="p-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((d, _) => (
                <tr
                  key={_}
                  className="border-b border-white/20 hover:bg-white/20 transition animate-pulse mb-2"
                >
                  <td className="p-4 bg-white/20 h-6 "></td>
                  <td className="p-4 bg-white/20 h-6 "></td>
                  <td className="p-4 bg-white/20 h-6 "></td>
                  <td className="p-4 bg-white/20 h-6 "></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  