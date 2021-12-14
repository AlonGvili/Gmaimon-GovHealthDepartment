import { Member } from ".prisma/client";
import { TFunction, useTranslation } from "react-i18next";
import React from "react";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: Member;
}

function Title({ user, t }: UserProps & { t: TFunction }) {
  return (
    <div className="ml-6">
      <h3 className="text-base leading-6 font-medium text-gray-700">
        {user?.name}
      </h3>
      <p className="text-xs text-gray-500">{t(`${user && user.role}`)}</p>
    </div>
  );
}

export default function User({ children, ...props }: UserProps) {
  let { t } = useTranslation();
  return (
    <div {...props} className="bg-gray-100 pr-12 py-4 rounded-lg mb-6">
      {children || <Title {...props} t={t} />}
    </div>
  );
}

User.Title = Title;
