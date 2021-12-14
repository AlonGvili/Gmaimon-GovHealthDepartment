import React from "react";

const RowCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <input
        {...rest}
        type="checkbox"
        ref={resolvedRef}
        className="rounded text-emerald-500 border border-coolGray-300 focus:outline-none focus:ring-0" />
    );
  }
);
export {RowCheckbox}