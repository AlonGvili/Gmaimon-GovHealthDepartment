import React from "react";
import { TicketWithTask } from "~/components/OrderBlade";

const RowCheckbox = React.forwardRef<TicketWithTask>(
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
        className="rounded text-brand border border-coolGray-300 focus:outline-none focus:ring-0" />
    );
  }
);
