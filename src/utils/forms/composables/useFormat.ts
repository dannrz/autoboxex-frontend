export const useFormat = () => {
    const formatPrice = (value: number) => {
        return '$' + new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }

    return {
        formatPrice,
    }
}