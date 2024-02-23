export const ItemCount = ({ count, handleCount }) => {
  return (
    <div className="itemCount">
      <button className="border w-[40px]" onClick={() => handleCount("minus")}>
        -
      </button>
      <span className="m-3">{count}</span>
      <button className="border w-[40px]" onClick={() => handleCount("plus")}>
        +
      </button>
    </div>
  );
};
