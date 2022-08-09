import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { useSocket } from "../../hooks/useSocket";

interface ITablePageContextProps {
  children: ReactNode;
}

interface ITablePageContext {
  listOptions: { [key: string]: string[] };
  tableData: { [key: string]: string }[];
  numPage: number;
  isModalVisible: boolean;
  isLoadingMoreTableData: boolean;
  setListOptions: (newState: { [key: string]: string[] }) => void;
  setTableData: (newState: { [key: string]: string }[]) => void;
  setNumPage: (newState: number) => void;
  setIsModalVisible: (newState: boolean) => void;
  setIsLoadingMoreTableData: (newState: boolean) => void;
}
const initialValues = {
  listOptions: {},
  tableData: [],
  numPage: 0,
  isModalVisible: false,
  isLoadingMoreTableData: false,
  setListOptions: () => {},
  setTableData: () => {},
  setNumPage: () => {},
  setIsModalVisible: () => {},
  setIsLoadingMoreTableData: () => {},
};

export const TablePageContext = createContext<ITablePageContext>(initialValues);

export const TablePageContextProvider = ({
  children,
}: ITablePageContextProps) => {
  const effecOnlyRun = useRef(false);

  const [listOptions, setListOptions] = useState<{ [key: string]: string[] }>(
    initialValues.listOptions
  );
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>(
    initialValues.tableData
  );
  const [numPage, setNumPage] = useState(initialValues.numPage);
  const [isModalVisible, setIsModalVisible] = useState(
    initialValues.isModalVisible
  );

  const [isLoadingMoreTableData, setIsLoadingMoreTableData] = useState(
    initialValues.isLoadingMoreTableData
  );

  useEffect(() => {
    if (effecOnlyRun.current === false) {
      api.get("/getListOptions").then((res) => setListOptions(res.data));
      api.get("/getTableData").then((res) => {
        setTableData(res.data);
      });
    }
    return () => {
      effecOnlyRun.current = true;
    };
  }, []);

  const value = {
    listOptions,
    tableData,
    numPage,
    isModalVisible,
    isLoadingMoreTableData,
    setListOptions,
    setTableData,
    setNumPage,
    setIsModalVisible,
    setIsLoadingMoreTableData,
  };

  return (
    <TablePageContext.Provider value={value}>
      {children}
    </TablePageContext.Provider>
  );
};
