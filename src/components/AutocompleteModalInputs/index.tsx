import { useEffect, useRef } from "react";
import { propsAC } from "../../interfaces/os-interfaces";
import styles from "./styles.module.scss";

export function AutocompleteModalInputs(props: propsAC) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isACVisible: { [key: string]: boolean } = {
    operador: false,
    zona: false,
    tipoOS: false,
    equipe: false,
    transporte: false,
    taxa: false,
    correcao: false,
  };

  function setACstate(e: HTMLDivElement, value: string) {
    props.inputEl.value = String(value);
    props.setIsACvisible(isACVisible);
    props.setSearch("");
    props.inputEl.style.border = "0.1rem solid #ffffff";
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e: Event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target as HTMLDivElement)) {
      props.setIsACvisible(isACVisible);
    }
  };

  return (
    <div ref={wrapperRef} className={styles.conteiner}>
      {props.values
        ?.filter(
          (name: string) => name.indexOf(props.search.toLowerCase()) > -1
        )
        .map((value: string, id: number) => {
          return (
            <div
              id={value as string}
              key={id}
              tabIndex={0}
              className={styles.row}
              onClick={(e) => {
                setACstate(e.target as HTMLDivElement, value as string);
              }}
            >
              <span className={styles.item}>{value}</span>
            </div>
          );
        })}
    </div>
  );
}
