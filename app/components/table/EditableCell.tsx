import React from "react";

export const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  update, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    update(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="text-xs text-coolGray-500 border border-none focus:border-coolGray-200 rounded p-1"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
