/* eslint-disable react/prop-types */
const Table = ({ children }) => {
  return (
    <table className="table w-100 table table-hover table-bordered">
      {children}
    </table>
  );
};

export default Table;
