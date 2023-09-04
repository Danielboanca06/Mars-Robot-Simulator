interface GridCell {
  cell: JSX.Element;
}

const gridCells: GridCell = {
  cell: (
    <div className="flex flex-row w-[150px] h-[30px] md:w-[350px] md:h-[70px] lg:w-[450px] lg:h-[90px] bg-transparent relative z-0">
      <div className="w-full h-full border-2 border-slate-200 relative"></div>
      <div className="w-full h-full border-2 border-slate-200 relative"></div>
      <div className="w-full h-full border-2 border-slate-200 relative"></div>
      <div className="w-full h-full border-2 border-slate-200 relative"></div>
      <div className="w-full h-full border-2 border-slate-200 relative"></div>
    </div>
  ),
};

export default function GridCells() {
  const renderCells = (count: number): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    for (let i = 0; i < count; i++) {
      cells.push(
        <div key={i}>{gridCells.cell}</div>
      );
    }
    return cells;
  };

  return (
    <div>
      {renderCells(5)}
    </div>
  );
}
