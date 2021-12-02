import { Building, Classroom, School } from ".prisma/client";
import SchoolForm from "./SchoolForm";

type TableProps =
  | { inputType: "school"; props: School }
  | { inputType: "building"; props: Building }
  | { inputType: "classrom"; props: Classroom };

export default function DynamicForm({ inputType, props }: TableProps) {
  return inputType === "school" ? (
    <SchoolForm {...props} />
  ) : inputType === "building" ? (
    <BuildingForm {...props} />
  ) : (
    <ClassroomForm {...props} />
  );
}
