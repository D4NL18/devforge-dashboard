import styles from "./index.module.scss";
import { useState } from "react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number;
};

function PaginatedTable<T>({ columns, data, rowsPerPage = 10 }: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(p => p + 1);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={String(col.key)}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  Nenhum dado encontrado.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={idx}>
                  {columns.map(col => (
                    <td key={String(col.key)}>{String(item[col.key])}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            ◀
          </button>
          <span>Página {currentPage + 1} de {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default PaginatedTable;
