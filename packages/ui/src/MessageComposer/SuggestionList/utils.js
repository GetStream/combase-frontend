export const scrollToItem = (container, item) => {
	if (!item) return;

	const itemWidth = parseInt(getComputedStyle(item).getPropertyValue('width'), 10);

	const containerWidth = parseInt(getComputedStyle(container).getPropertyValue('width'), 10) - itemWidth;

	const actualScrollLeft = container.scrollLeft;
	const itemOffsetLeft = item.offsetLeft;
	const itemOffsetWidth = item.offsetWidth;

	if (itemOffsetLeft < actualScrollLeft + containerWidth && actualScrollLeft < (itemOffsetLeft - itemOffsetWidth)) {
		return;
	}

	// eslint-disable-next-line
	container.scrollLeft = itemOffsetLeft;
};