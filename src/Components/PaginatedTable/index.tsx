import styles from "./index.module.scss";
import { useState } from "react";
import {
  Pencil,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Column<T> = {
  key: keyof T;
  label: string;
};

export type TableRowBase = {
  bold?: boolean;
  type?: "in" | "out";
};

type TableProps<T extends TableRowBase> = {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number;
  edit?: boolean;
  onEdit?: (row: T) => void;
  delete?: boolean;
  onDelete?: (row: T) => void;
  inOut?: boolean;
};

function PaginatedTable<T extends TableRowBase>({
  columns,
  data,
  rowsPerPage = 10,
  edit,
  onEdit,
  delete: enableDelete,
  onDelete,
  inOut,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.label}</th>
              ))}
              {inOut && <th>Entrada/Saída</th>}
              {edit && <th>Editar</th>}
              {enableDelete && <th>Excluir</th>}
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
                <tr
                  key={idx}
                  className={item.bold ? styles.boldRow : styles.regularRow}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)}>{String(item[col.key])}</td>
                  ))}
                  {inOut && (
                    <td>
                      {item.type === "in" ? (
                        <ArrowUpCircle size={20} className={styles.in} />
                      ) : (
                        <ArrowDownCircle size={20} className={styles.out} />
                      )}
                    </td>
                  )}
                  {edit && (
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => onEdit?.(item)}
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  )}
                  {enableDelete && (
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => onDelete?.(item)}
                      >
                        <Trash2 size={18} />
                      </button>
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
            <ChevronLeft size={20} />
          </button>
          <span>
            Página {currentPage + 1} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default PaginatedTable;
