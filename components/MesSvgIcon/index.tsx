import React from 'react';
import '../../public/iconfont/iconfont.css';

const MesSvgIcon = ({ name, className, ...props }: { name: string; className?: string; props?: React.HTMLAttributes<HTMLElement> }) => {
    return (
        <i
            className={`iconfont icon-${name} ${className || ''}`}
            {...props}
        />
    );
};

export default MesSvgIcon;