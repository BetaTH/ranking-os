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
  isLoadingData: boolean;
  setListOptions: (newState: { [key: string]: string[] }) => void;
  setTableData: (newState: { [key: string]: string }[]) => void;
  setNumPage: (newState: number) => void;
  setIsModalVisible: (newState: boolean) => void;
  setIsLoadingMoreTableData: (newState: boolean) => void;
  setIsLoadingData: (newState: boolean) => void;
}
const initialValues = {
  listOptions: {},
  tableData: [],
  numPage: 0,
  isModalVisible: false,
  isLoadingMoreTableData: false,
  isLoadingData: true,
  setListOptions: () => {},
  setTableData: () => {},
  setNumPage: () => {},
  setIsModalVisible: () => {},
  setIsLoadingMoreTableData: () => {},
  setIsLoadingData: () => {},
};

export const TablePageContext = createContext<ITablePageContext>(initialValues);

export const TablePageContextProvider = ({
  children,
}: ITablePageContextProps) => {
  const effecOnlyRun = useRef(false);

  const [isLoadingData, setIsLoadingData] = useState(
    initialValues.isLoadingData
  );

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
      api.get("/list-options").then((res) => setListOptions(res.data));
      api.get("/os").then((res) => {
        setTableData(res.data);
        setIsLoadingData(false);
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
    isLoadingData,
    setListOptions,
    setTableData,
    setNumPage,
    setIsModalVisible,
    setIsLoadingMoreTableData,
    setIsLoadingData,
  };

  return (
    <TablePageContext.Provider value={value}>
      {children}
    </TablePageContext.Provider>
  );
};
