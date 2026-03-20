import React, { CSSProperties, ElementType, ComponentPropsWithoutRef } from "react";

type TicketShapeProps<T extends ElementType> = {
    as?: T;
    children: React.ReactNode;
    cornerSize?: string;
    className?: string;
    style?: CSSProperties;
} & ComponentPropsWithoutRef<T>;

export function TicketShape<T extends ElementType = "div">({
    children,
    cornerSize = "20px",
    className = "",
    style = {},
    as,
    ...props
}: TicketShapeProps<T>) {
    const Component = as || "div";

    return (
        <Component
            className={`ticket-corner ${className}`}
            style={
                {
                    "--corner-size": cornerSize,
                    ...style,
                } as CSSProperties
            }
            {...props}
        >
            {children}
        </Component>
    );
}
