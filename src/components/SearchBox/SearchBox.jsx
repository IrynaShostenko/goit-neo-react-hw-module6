import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../redux/filtersSlice";
import { selectFilter } from "../../../redux/selectors";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectFilter);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        placeholder="Search by name…"
      />
    </div>
  );
};

export default SearchBox;
