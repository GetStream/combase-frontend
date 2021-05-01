import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrevious } from 'react-use';

const defaultSelected = [];
const defaultGetter = ({ node }) => node?._id;
export const useBulkSelect = (items, enabled, getValue = defaultGetter) => {
    const [selected, setSelected] = useState(defaultSelected);
    const allSelected = selected?.length && selected?.length === items?.length;
    const indeterminate = Boolean(selected?.length) && selected?.length !== items?.length;
    const prevEnabled = usePrevious();

    useEffect(() => {
        if (!prevEnabled !== enabled && !enabled) {
            setSelected([]);
        }
    }, [enabled]);

    const onChange = useCallback(() => {
        setSelected(() => (!allSelected ? items.map(getValue) : []));
    }, [allSelected, items]);

    const selectableListItemProps = useMemo(
        () => ({
            selectable: enabled,
            isSelected: value => allSelected || selected?.includes(value),
            onSelect: value =>
                setSelected(prev => {
                    if (prev?.includes(value)) {
                        const newValue = [...prev];
                        const idx = newValue.findIndex(existing => existing === value);
                        newValue.splice(idx, 1);
                        return newValue;
                    } else {
                        const newValue = [...prev, value];
                        return newValue;
                    }
                }),
        }),
        [allSelected, enabled, selected]
    );

    return [selectableListItemProps, { indeterminate, onChange, value: allSelected }, selected, setSelected];
};
