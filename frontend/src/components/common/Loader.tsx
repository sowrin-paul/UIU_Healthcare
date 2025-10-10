import React from 'react';
import { Heart, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'minimal' | 'branded' | 'pulse';
    text?: string;
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({
    size = 'md',
    variant = 'default',
    text = 'Loading...',
    className = ''
}) => {
    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'sm': return 'w-4 h-4';
            case 'md': return 'w-6 h-6';
            case 'lg': return 'w-8 h-8';
            case 'xl': return 'w-12 h-12';
            default: return 'w-6 h-6';
        }
    };

    const getContainerSize = (size: string) => {
        switch (size) {
            case 'sm': return 'text-sm';
            case 'md': return 'text-base';
            case 'lg': return 'text-lg';
            case 'xl': return 'text-xl';
            default: return 'text-base';
        }
    };

    // Spinning Circle Loader
    const SpinnerLoader = () => (
        <div className={cn(
            "animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#F68B1F]",
            getSizeClasses(size)
        )} />
    );

    // Minimal Dots Loader
    const DotsLoader = () => (
        <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "bg-[#F68B1F] rounded-full",
                        size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-3 h-3' : size === 'xl' ? 'w-4 h-4' : 'w-2 h-2',
                        i === 0 ? 'animate-pulse' : i === 1 ? 'animate-pulse animation-delay-200' : 'animate-pulse animation-delay-400'
                    )}
                />
            ))}
        </div>
    );

    // Branded UIU Loader
    const BrandedLoader = () => (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <div className={cn(
                    "bg-[#F68B1F] rounded-lg flex items-center justify-center animate-pulse",
                    size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : size === 'lg' ? 'w-16 h-16' : 'w-20 h-20'
                )}>
                    <Heart className={cn(
                        "text-white",
                        size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : size === 'lg' ? 'h-8 w-8' : 'h-10 w-10'
                    )} />
                </div>
                <div className={cn(
                    "absolute inset-0 bg-[#F68B1F] rounded-lg animate-ping opacity-20",
                    size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : size === 'lg' ? 'w-16 h-16' : 'w-20 h-20'
                )} />
            </div>
            <div className="text-center">
                <h3 className={cn(
                    "font-semibold text-[#1A1A1A]",
                    getContainerSize(size)
                )}>
                    UIU Healthcare
                </h3>
                <p className="text-[#4B4B4B] text-xs mt-1">Medical Center Portal</p>
            </div>
        </div>
    );

    // Pulse/Heartbeat Loader
    const PulseLoader = () => (
        <div className="flex items-center space-x-2">
            <div className="relative">
                <Heart className={cn(
                    "text-[#F68B1F] animate-pulse",
                    getSizeClasses(size)
                )} />
                <div className="absolute inset-0 animate-ping">
                    <Activity className={cn(
                        "text-[#F68B1F] opacity-20",
                        getSizeClasses(size)
                    )} />
                </div>
            </div>
        </div>
    );

    const renderLoader = () => {
        switch (variant) {
            case 'minimal':
                return <DotsLoader />;
            case 'branded':
                return <BrandedLoader />;
            case 'pulse':
                return <PulseLoader />;
            default:
                return <SpinnerLoader />;
        }
    };

    return (
        <div className={cn(
            "flex flex-col items-center justify-center space-y-3",
            className
        )}>
            {renderLoader()}
            {variant !== 'branded' && text && (
                <p className={cn(
                    "text-[#4B4B4B] font-medium animate-pulse",
                    getContainerSize(size)
                )}>
                    {text}
                </p>
            )}
        </div>
    );
};

// Full Screen Loader
interface FullScreenLoaderProps {
    text?: string;
    showBrand?: boolean;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
    text = "Loading UIU Healthcare...",
    showBrand = true
}) => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E5E5] max-w-sm w-full mx-4">
            <Loader
                variant={showBrand ? "branded" : "default"}
                size="lg"
                text={!showBrand ? text : undefined}
            />
        </div>
    </div>
);

// Inline Loader for buttons and small components
interface InlineLoaderProps {
    className?: string;
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({ className }) => (
    <div className={cn("animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent", className)} />
);

// Page Loading Skeleton
export const PageLoadingSkeleton: React.FC = () => (
    <div className="space-y-6 p-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
            <div className="h-8 bg-[#FDF7F2] rounded-md w-1/3 animate-pulse" />
            <div className="h-4 bg-[#FDF7F2] rounded-md w-1/2 animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                    <div className="h-32 bg-[#FDF7F2] rounded-lg animate-pulse" />
                    <div className="h-4 bg-[#FDF7F2] rounded-md w-3/4 animate-pulse" />
                    <div className="h-4 bg-[#FDF7F2] rounded-md w-1/2 animate-pulse" />
                </div>
            ))}
        </div>

        {/* Table/List Skeleton */}
        <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-[#FDF7F2] rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-[#FDF7F2] rounded-md w-1/4 animate-pulse" />
                        <div className="h-3 bg-[#FDF7F2] rounded-md w-1/2 animate-pulse" />
                    </div>
                    <div className="h-8 w-20 bg-[#FDF7F2] rounded-md animate-pulse" />
                </div>
            ))}
        </div>
    </div>
);

export default Loader;
