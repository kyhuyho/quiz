/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";
import "../../styles/Dropdown.scss";
import { useState, useEffect } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Dropdown = ({ name, control, setValue, dataDropdown, dropdownLabel }) => {
  const [label, setLabel] = useState(dropdownLabel);
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name,
    defaultValue: "",
  });
  const handleClickDropdownItem = (event) => {
    setValue(name, event.target.dataset.value);
    setLabel(event.target.textContent);
    setShow(false);
  };
  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);
  return (
    <div className="dropdown" ref={nodeRef}>
      <div className="dropdown-select" onClick={() => setShow(!show)}>
        <div>{label}</div>
        <span>{show ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</span>
      </div>
      {show && (
        <div className="dropdown-list">
          {dataDropdown &&
            dataDropdown.length > 0 &&
            dataDropdown.map((role) => (
              <div
                key={role.id}
                className="dropdown-item"
                data-value={role.value}
                onClick={handleClickDropdownItem}
              >
                {role.text}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
