import { Member, Team, Task } from ".prisma/client";
import { useTranslation } from "react-i18next";
import { Link } from "remix";

type UserBladeProps = {
  user: Member & {
    tasks?: Task[];
    team?: (Team & {
      members: (Member & {
        tasks: Task[];
      })[];
    })[];
  };
} & React.HTMLAttributes<HTMLDivElement>;

export default function UserBlade({ user, ...props }: UserBladeProps) {
  let { t: translationFn } = useTranslation("common");
  const { passwordHash, team, tasks, ...rest } = user;
  return (
    <div {...props}>
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {rest.name}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {Object.keys(rest).map((key, index) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-500">
                {translationFn(key)}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {key === "teamId" ? (
                  <Link
                    to={`../../teams/${rest[key]}`}
                    className="whitespace-nowrap text-xm text-blue-500 font-medium"
                  >
                    {rest[key]}
                  </Link>
                ) : (
                  translationFn(
                    `${
                      // @ts-ignore
                      rest[key]
                    }`
                  )
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
