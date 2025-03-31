import { cn } from "@/lib/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  const self = rotationClass[rotate];

  return (
    <div className={cn("group [perspective:1000px]", className)} {...props}>
      <div
        className={cn(
          "relative h-full rounded-xl transition-all duration-500 [transform-style:preserve-3d]",
          self[0],
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
          />
          <div className="absolute bottom-3 left-3 right-3 text-base font-bold text-white line-clamp-2 bg-black/30 p-1 rounded backdrop-blur-sm">{title}</div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-xl bg-black/80 p-3 text-slate-200 [backface-visibility:hidden]",
            self[1],
          )}
        >
          <div className="flex min-h-full flex-col gap-1">
            <h1 className="text-base font-bold text-white">{subtitle}</h1>
            <p className="mt-1 border-t border-t-gray-200 py-2 text-xs font-medium leading-normal text-gray-100 overflow-y-auto max-h-[80%]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
