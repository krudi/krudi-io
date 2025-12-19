import type { ElementType } from 'react';

type SkeletonCardsProps = {
    count?: number;
    as?: ElementType;
    itemAs?: ElementType;
    wrapperClassName?: string;
    itemClassName?: string;
    disableGrid?: boolean;
};

export default function SkeletonCards({ count = 6, as, itemAs, wrapperClassName, itemClassName }: SkeletonCardsProps) {
    const Wrapper = (as ?? 'div') as ElementType;
    const Item = (itemAs ?? 'div') as ElementType;

    const wrapperClasses = wrapperClassName || undefined;
    const itemClasses = [itemClassName].filter(Boolean).join(' ') || undefined;

    return (
        <Wrapper className={wrapperClasses}>
            {Array.from({ length: count }).map((_, index) => (
                <Item
                    className={itemClasses}
                    key={index}
                >
                    <span className="skeleton-line" />
                    <span className="skeleton-line short" />
                    <span className="skeleton-line" />
                </Item>
            ))}
        </Wrapper>
    );
}
