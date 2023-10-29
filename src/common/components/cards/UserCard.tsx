import Emoji from "@/common/utils/emoji";

type Props = {
  className?: string;
  size: "s" | "m" | "l";
  user: User;
};

export default function UserCard({ className, user, size }: Props) {
  return (
    <div
      className={`${className} ${size === "s" && "text-header-1 p-1"} ${
        size === "m" && "text-subtitle p-1.5"
      } ${
        size === "l" && "text-title p-2"
      } w-max h-fit flex items-center font-light rounded-full bg-peach font-sans-serif text-orange-black`}
    >
      <div
        className={`${size === "s" && "w-12 h-12"} ${
          size === "m" && "w-16 h-16"
        } ${
          size === "l" && "w-20 h-20"
        } flex items-center justify-center rounded-full`}
        style={{ backgroundColor: user.color }}
      >
        {Emoji[user.emoji as keyof typeof Emoji]}
      </div>
      <p className="pl-3 pr-4">{user.name}</p>
    </div>
  );
}
