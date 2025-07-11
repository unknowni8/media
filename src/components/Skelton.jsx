import classNames from "classnames";

function Skelton({ times, className }) {
  const outerDiv = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    className,
  );
  const innerDiv = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200", "via-white", "to-gray-200"
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerDiv}>
          <div className={innerDiv} />
        </div>
      );
    });

  return boxes;
}

export default Skelton;
