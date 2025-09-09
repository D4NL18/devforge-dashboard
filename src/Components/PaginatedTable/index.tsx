import styles from "./index.module.scss";
import { useState } from "react";
import { Pencil, Trash2, ArrowDown, ArrowUp } from "lucide-react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number;
  edit?: boolean;
  onEdit?: (item: T) => void;
  delete?: boolean;
  onDelete?: (item: T) => void;
  inOut?: boolean;
};

function PaginatedTable<T>({
  columns,
  data,
  rowsPerPage = 10,
  edit = false,
  onEdit,
  delete: del = false,
  onDelete,
  inOut = false,
}: TableProps<T>) {
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
              {edit && <th>Ações</th>}
              {del && <th></th>}
              {inOut && <th>Tipo</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (edit ? 1 : 0) + (del ? 1 : 0) + (inOut ? 1 : 0)} className={styles.empty}>
                  Nenhum dado encontrado.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={idx}>
                  {columns.map(col => (
                    <td key={String(col.key)}>{String(item[col.key])}</td>
                  ))}

                  {edit && (
                    <td>
                      <button onClick={() => onEdit?.(item)} className={styles.iconButton}>
                        <Pencil size={18} />
                      </button>
                    </td>
                  )}

                  {del && (
                    <td>
                      <button onClick={() => onDelete?.(item)} className={styles.iconButton}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}

                  {inOut && (
                    <td>
                      {String((item as any).type) === "in" ? (
                        <ArrowUp size={18} color="green" />
                      ) : (
                        <ArrowDown size={18} color="red" />
                      )}
                    </td>
                  )}
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
