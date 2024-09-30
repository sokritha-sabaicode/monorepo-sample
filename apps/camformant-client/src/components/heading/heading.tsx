import Link from "next/link";

interface Props {
  title: string;
  subTitle?: string;
  link?: string;
}

export const Heading: React.FC<Props> = ({ title, subTitle, link }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-y-1">
        <span className="text-lg text-secondary font-semibold">{title}</span>
        {subTitle && <span className="text-xs text-secondary">{subTitle}</span>}
      </div>
      {link && (
        <Link href={link} className="text-md text-primary">
          Search more
        </Link>
      )}
    </div>
  );
};
