import { ReactNode, type JSX } from "react";

interface TestimonialCardProps {
  icon: ReactNode;
  content: string;
  name: string;
  position: string;
  company: string;
}

interface WorkingCardProps {
  number: number;
  heading: string;
  content: string;
}

interface FeatureCardProps {
  icon: ReactNode;
  heading: string;
  content: string;
}

type CardProps =
  | ({ type: "Testimonial" } & TestimonialCardProps)
  | ({ type: "Feature" } & FeatureCardProps)
  | ({ type: "Working" } & WorkingCardProps);

export function Card(props: CardProps): JSX.Element {
  if (props.type === "Testimonial") {
    const { icon, content, name, position, company } = props;
    return (
      <div className="rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-5 items-start py-8 px-6">
        <span className="rotate-180 flex items-start size-10">{icon}</span>
        <span className="text-xl">{content}</span>
        <div className="">
          <span className="text-xl font-semibold">{name}</span>
          <div className="flex text-xs font-serif text-gray-500">
            <span>
              {position}
              {", "}
            </span>
            <span>{company}</span>
          </div>
        </div>
      </div>
    );
  }

  if (props.type === "Feature") {
    const { icon, heading, content } = props;

    return (
      <div className="flex flex-col gap-5 rounded-lg p-8 items-start shadow-lg border border-gray-200 ">
        <span className="size-10">{icon}</span>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl ">{heading}</h1>
          <span className="text-[16px] font-normal text-gray-400">{content}</span>
        </div>
      </div>
    );
  }

  if (props.type === "Working") {
    const { number, heading, content } = props;
    return (
      <div className="bg-violet-200 flex flex-col items-start gap-5 rounded-lg p-6 ">
        <div className="text-4xl text-violet-300 font-extrabold">
          {0}
          {number}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl">{heading}</h1>
          <span>{content}</span>
        </div>
      </div>
    );
  }

  return <div></div>;
}
