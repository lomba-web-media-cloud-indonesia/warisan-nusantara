import clsx from "clsx";

type HeadingProps = {
    title: string;
    align?: "left" | "center" | "right";
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "accent";
    className?: string;
};

export default function Heading({
    title,
    align = "center",
    size = "md",
    variant = "primary",
    className,
}: HeadingProps) {
    const alignClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    const colorClass = {
        primary: "text-[var(--color-primary)]",
        secondary: "text-[var(--color-secondary)]",
        accent: "text-[var(--color-accent)]",
    };

    const sizeClass = {
        sm: "text-2xl md:text-3xl",
        md: "text-3xl md:text-4xl",
        lg: "text-4xl md:text-5xl",
    };
    return(
        <div className={clsx(alignClass[align], className)}>
            <h1 className={clsx("font-heading font-semibold leading-tight", sizeClass[size], colorClass[variant])}>
                {title}
            </h1>
        </div>
    )
}
